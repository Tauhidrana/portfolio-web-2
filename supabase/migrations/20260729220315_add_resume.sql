-- Resume: two nullable columns on profile, plus a bucket to hold the file.
--
-- Separate bucket from site-images on purpose. The image library lists every
-- object in its bucket and renders each as a thumbnail; a PDF sitting in there
-- would show up in the image picker as a broken tile.

alter table public.profile
  add column resume_url      text,
  add column resume_filename text;

comment on column public.profile.resume_url is
  'Public URL of the resume in the site-files bucket. Null means no resume, and
   the site hides the download link entirely.';

-- Both columns are set and cleared together; neither is meaningful alone.
alter table public.profile
  add constraint profile_resume_complete check (
    (resume_url is null and resume_filename is null)
    or (resume_url is not null and resume_filename is not null)
  );

insert into storage.buckets (id, name, public)
values ('site-files', 'site-files', true)
on conflict (id) do nothing;

create policy "Site files are publicly readable"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'site-files');

create policy "Admin can upload site files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-files' and public.is_site_admin());

-- Replacing the resume is an upsert, which needs UPDATE as well as INSERT.
create policy "Admin can replace site files"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'site-files' and public.is_site_admin())
  with check (bucket_id = 'site-files' and public.is_site_admin());

create policy "Admin can delete site files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-files' and public.is_site_admin());

-- ---------------------------------------------------------------------------
-- Republish get_site_content() with resume on the profile object.
-- Everything else is unchanged from the original definition.
-- ---------------------------------------------------------------------------

create or replace function public.get_site_content()
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select jsonb_build_object(

    'profile', (
      select jsonb_build_object(
        'name',     p.name,
        'role',     p.role,
        'location', p.location,
        'email',    p.email,
        'image',    p.image_url,
        'logo',     p.logo_url,
        'lede',     p.lede,
        'status',   p.status,
        'resume',   case
                      when p.resume_url is null then null
                      else jsonb_build_object(
                        'url',      p.resume_url,
                        'filename', p.resume_filename
                      )
                    end
      )
      from public.profile p
      where p.id = 1
    ),

    'education', (
      select jsonb_build_object(
        'institution', e.institution,
        'field',       e.field,
        'location',    e.location,
        'duration',    e.duration
      )
      from public.education e
      where e.id = 1
    ),

    'aboutParagraphs', (
      select coalesce(jsonb_agg(a.body order by a.sort_order), '[]'::jsonb)
      from public.about_paragraphs a
    ),

    'navLinks', (
      select coalesce(jsonb_agg(
        jsonb_build_object('label', n.label, 'href', n.href)
        order by n.sort_order
      ), '[]'::jsonb)
      from public.nav_links n
    ),

    'socials', (
      select coalesce(jsonb_agg(
        jsonb_build_object(
          'iconKey', s.icon_key,
          'label',   s.label,
          'handle',  s.handle,
          'href',    s.href
        )
        order by s.sort_order
      ), '[]'::jsonb)
      from public.socials s
    ),

    'facts', (
      select coalesce(jsonb_agg(
        jsonb_build_object('value', f.value, 'label', f.label)
        order by f.sort_order
      ), '[]'::jsonb)
      from public.facts f
    ),

    'stack', (
      select coalesce(jsonb_agg(
        jsonb_build_object('group', g.group_name, 'items', to_jsonb(g.items))
        order by g.sort_order
      ), '[]'::jsonb)
      from public.stack_groups g
    ),

    'ratingScales', (
      select coalesce(jsonb_agg(
        jsonb_build_object(
          'platform', sc.platform,
          'handle',   sc.handle,
          'href',     sc.href,
          'current',  sc.current_rating,
          'peak',     sc.peak_rating,
          'rank',     sc.rank,
          'max',      sc.max_rating,
          'note',     sc.note,
          'bands', (
            select coalesce(jsonb_agg(
              jsonb_build_object(
                'from',  b.from_value,
                'to',    b.to_value,
                'label', b.label,
                'color', b.color
              )
              order by b.sort_order
            ), '[]'::jsonb)
            from public.rating_bands b
            where b.scale_id = sc.id
          )
        )
        order by sc.sort_order
      ), '[]'::jsonb)
      from public.rating_scales sc
    ),

    'projects', (
      select coalesce(jsonb_agg(
        jsonb_build_object(
          'id',          pr.slug,
          'title',       pr.title,
          'year',        pr.year,
          'tagline',     pr.tagline,
          'problem',     pr.problem,
          'description', pr.description,
          'tech',        to_jsonb(pr.tech),
          'href',        pr.href
        )
        order by pr.sort_order
      ), '[]'::jsonb)
      from public.projects pr
    ),

    'roles', (
      select coalesce(jsonb_agg(
        jsonb_build_object(
          'id',          r.slug,
          'role',        r.role_title,
          'org',         r.org,
          'period',      r.period,
          'location',    r.location,
          'description', r.description,
          'tags',        to_jsonb(r.tags)
        )
        order by r.sort_order
      ), '[]'::jsonb)
      from public.roles r
    ),

    'record', (
      select coalesce(jsonb_agg(
        jsonb_build_object(
          'id',          rc.slug,
          'kind',        rc.kind,
          'title',       rc.title,
          'issuer',      rc.issuer,
          'date',        rc.date_label,
          'result',      rc.result,
          'description', rc.description,
          'image',       rc.image_url,
          'href',        rc.href
        )
        order by rc.sort_order
      ), '[]'::jsonb)
      from public.records rc
    ),

    'events', (
      select coalesce(jsonb_agg(
        jsonb_build_object(
          'id',          ev.slug,
          'title',       ev.title,
          'date',        ev.date_label,
          'location',    ev.location,
          'organizer',   ev.organizer,
          'description', ev.description,
          'photos', (
            select coalesce(jsonb_agg(
              jsonb_build_object('src', ph.src, 'caption', ph.caption)
              order by ph.sort_order
            ), '[]'::jsonb)
            from public.event_photos ph
            where ph.event_id = ev.id
          )
        )
        order by ev.sort_order
      ), '[]'::jsonb)
      from public.events ev
    )
  );
$$;

grant execute on function public.get_site_content() to anon, authenticated;
