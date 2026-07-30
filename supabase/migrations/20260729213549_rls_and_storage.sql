-- Row level security for content tables, plus the image bucket.
--
-- Access model: the portfolio is public, so every content table is readable by
-- anyone. Writes belong to the single admin account, created by hand in the
-- Supabase dashboard with public signup disabled.
--
-- There is deliberately no ownership predicate on the write policies. Content
-- rows are global site content, not per-user records, so there is no user_id to
-- match against -- "signed in" genuinely is the whole authorization rule here.
-- What that leaves exposed is the documented anonymous-sign-in trap: if someone
-- later enables anonymous sign-ins, those users carry the `authenticated` role
-- and would pass a bare role check. is_site_admin() closes that hole.

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) = false;
$$;

comment on function public.is_site_admin is
  'True for a genuinely signed-in user. Excludes anonymous sign-ins, which also
   carry the authenticated role and would otherwise pass a bare role check.';

do $$
declare
  t text;
begin
  foreach t in array array[
    'profile', 'education', 'about_paragraphs', 'nav_links', 'socials', 'facts',
    'stack_groups', 'rating_scales', 'rating_bands', 'projects', 'roles',
    'records', 'events', 'event_photos'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);

    execute format(
      'create policy "Content is publicly readable" on public.%I
         for select to anon, authenticated using (true)', t);

    execute format(
      'create policy "Admin can insert" on public.%I
         for insert to authenticated with check (public.is_site_admin())', t);

    -- UPDATE needs both USING and WITH CHECK: USING decides which rows may be
    -- updated, WITH CHECK validates the row after the update.
    execute format(
      'create policy "Admin can update" on public.%I
         for update to authenticated
         using (public.is_site_admin()) with check (public.is_site_admin())', t);

    execute format(
      'create policy "Admin can delete" on public.%I
         for delete to authenticated using (public.is_site_admin())', t);

    -- Table-level grants. Separate from RLS: RLS filters which rows are visible
    -- once a table is reachable, these decide whether it is reachable at all
    -- through the Data API.
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- Image bucket
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

create policy "Site images are publicly readable"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'site-images');

create policy "Admin can upload site images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-images' and public.is_site_admin());

-- Replacing an existing image is an upsert, which needs UPDATE alongside
-- INSERT and SELECT. Granting only INSERT makes replacement fail silently.
create policy "Admin can replace site images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'site-images' and public.is_site_admin())
  with check (bucket_id = 'site-images' and public.is_site_admin());

create policy "Admin can delete site images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-images' and public.is_site_admin());
