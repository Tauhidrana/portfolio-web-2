-- Assembles all 14 content tables into a single JSON object shaped exactly like
-- the old src/lib/data.ts exports, so the site loads in one round trip and the
-- section components keep the field names they already use.
--
-- SECURITY INVOKER on purpose. The tables carry public select policies, so the
-- caller's own permissions are enough -- SECURITY DEFINER would strip RLS from
-- the read path in exchange for nothing.
--
-- Column renames unwind here: current_rating -> current, from_value -> from,
-- role_title -> role, slug -> id, image_url -> image.

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
        'status',   p.status
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

comment on function public.get_site_content is
  'Entire site content as one JSON object, shaped like the original data.ts.';

grant execute on function public.get_site_content() to anon, authenticated;
