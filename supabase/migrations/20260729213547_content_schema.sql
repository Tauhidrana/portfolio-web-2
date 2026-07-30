-- Portfolio content schema.
--
-- One table per content entity. Column naming departs from the front end in
-- four places because the natural names are SQL reserved words:
-- current/peak/max -> *_rating, from/to -> from_value/to_value, role ->
-- role_title. get_site_content() maps them back, so React never sees these.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function public.set_updated_at is
  'Trigger function: stamps updated_at on every UPDATE.';

-- ---------------------------------------------------------------------------
-- Singletons. The check constraint makes a second row impossible, so the admin
-- form can always upsert against id = 1 without a lookup.
-- ---------------------------------------------------------------------------

create table public.profile (
  id         int primary key default 1 check (id = 1),
  name       text not null,
  role       text not null,
  location   text not null,
  email      text not null,
  image_url  text not null,
  logo_url   text not null,
  lede       text not null,
  status     text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.education (
  id          int primary key default 1 check (id = 1),
  institution text not null,
  field       text not null,
  location    text not null,
  duration    text not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Ordered lists. sort_order drives display order everywhere; the admin swaps
-- values between neighbours to reorder.
-- ---------------------------------------------------------------------------

create table public.about_paragraphs (
  id         uuid primary key default gen_random_uuid(),
  body       text not null,
  sort_order int  not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.nav_links (
  id         uuid primary key default gen_random_uuid(),
  label      text not null,
  href       text not null,
  sort_order int  not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- icon_key resolves through the frozen map in src/lib/icons.ts. React icon
-- components cannot be stored here, so the dashboard offers only keys that map.
create table public.socials (
  id         uuid primary key default gen_random_uuid(),
  icon_key   text not null,
  label      text not null,
  handle     text not null,
  href       text not null,
  sort_order int  not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.facts (
  id         uuid primary key default gen_random_uuid(),
  value      text not null,
  label      text not null,
  sort_order int  not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- items is text[] rather than a child table: they are plain strings with no
-- attributes of their own, so a join table would add a table and buy nothing.
create table public.stack_groups (
  id         uuid primary key default gen_random_uuid(),
  group_name text   not null,
  items      text[] not null default '{}',
  sort_order int    not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.rating_scales (
  id             uuid primary key default gen_random_uuid(),
  platform       text not null,
  handle         text not null,
  href           text not null,
  current_rating int  not null,
  peak_rating    int  not null,
  rank           text not null,
  max_rating     int  not null,
  note           text not null default '',
  sort_order     int  not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  constraint rating_scales_peak_gte_current check (peak_rating >= current_rating),
  constraint rating_scales_max_gt_zero      check (max_rating > 0)
);

-- Real thresholds on each judge, not decoration: the marker position on the
-- ladder is derived from these bounds.
create table public.rating_bands (
  id         uuid primary key default gen_random_uuid(),
  scale_id   uuid not null references public.rating_scales (id) on delete cascade,
  from_value int  not null,
  to_value   int  not null,
  label      text not null,
  color      text not null,
  sort_order int  not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint rating_bands_range check (to_value > from_value)
);

create index rating_bands_scale_id_idx on public.rating_bands (scale_id);

create table public.projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  year        text not null,
  tagline     text not null,
  problem     text not null,
  description text not null,
  tech        text[] not null default '{}',
  href        text not null,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table public.roles (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  role_title  text not null,
  org         text not null,
  period      text not null,
  location    text not null,
  description text not null,
  tags        text[] not null default '{}',
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Awards and certificates share one shape: both are things someone else
-- verified. date_label stays text because the site shows "April 2026" and
-- "May 9, 2026" -- display strings at different precisions, not dates to
-- compute on.
create table public.records (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  kind        text not null check (kind in ('Award', 'Certificate')),
  title       text not null,
  issuer      text not null,
  date_label  text not null,
  result      text,
  description text not null,
  image_url   text not null,
  href        text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table public.events (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  date_label  text not null,
  location    text not null,
  organizer   text not null,
  description text not null,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table public.event_photos (
  id         uuid primary key default gen_random_uuid(),
  event_id   uuid not null references public.events (id) on delete cascade,
  src        text not null,
  caption    text not null,
  sort_order int  not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index event_photos_event_id_idx on public.event_photos (event_id);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------

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
    execute format(
      'create trigger set_updated_at before update on public.%I
         for each row execute function public.set_updated_at()', t
    );
  end loop;
end;
$$;
