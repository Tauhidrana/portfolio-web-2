# Admin Dashboard — Design

Date: 2026-07-30
Status: Approved, ready for implementation planning

## Goal

Move every piece of the portfolio's content out of `src/lib/data.ts` and into Supabase,
and give the site owner a dashboard at `/admin` where he can edit all of it — text,
lists, ordering, and images — without touching code or redeploying.

## Decisions taken

| Decision | Choice | Why |
|---|---|---|
| Data flow | Live fetch on page load | Edits go live on refresh; no deploy hook needed |
| Schema | Normalized tables per entity | Owner's call; real columns and constraints per entity |
| Images | Migrate all 19 to Supabase Storage | Every image becomes replaceable from the dashboard |
| Auth | One admin, public signup disabled | Single editor; nothing to build beyond a login form |
| Routing | `react-router`, path-based | Nested routes, deep links, active nav — not worth hand-rolling |
| Hosting | Vercel | `vercel.json` rewrite handles SPA deep links |

## Current state

- Vite + React 19 SPA, Tailwind 4, no router
- `@supabase/supabase-js` installed; no client file, no migrations, no `supabase/` dir yet
- `.env` holds `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (gitignored)
- All content is 12 exported constants in `src/lib/data.ts` (260 lines)
- 8 section components import those constants directly
- 19 images in `public/images/`, referenced by path string

## Architecture

```
                    ┌──────────────────────────┐
  visitor ────────► │ React SPA                │
                    │  useContent()            │
                    └────────────┬─────────────┘
                                 │ 1 RPC call
                                 ▼
                    ┌──────────────────────────┐
                    │ get_site_content()       │  assembles 14 tables
                    │   → single JSON object   │  into data.ts's shape
                    └────────────┬─────────────┘
                                 │
                    ┌────────────▼─────────────┐
   admin ─────────► │ 14 normalized tables     │ ◄─── RLS: public read,
   /admin           │ + storage: site-images   │      authenticated write
                    └──────────────────────────┘
```

Normalized for **writing** (one table per entity, real constraints, per-field forms).
A single SQL function for **reading** (one round trip, shape identical to today's `data.ts`).
Without that function, live-fetch against a normalized schema means 14 requests per page load.

## Schema

All tables live in `public`. Every table has `id`, `created_at`, `updated_at`.
`updated_at` is maintained by a shared `set_updated_at()` trigger.

### Singletons

Pattern: `id int primary key default 1 check (id = 1)` — the row can never be duplicated.

**`profile`** — `name`, `role`, `location`, `email`, `image_url`, `logo_url`, `lede`, `status` (all `text not null`)

**`education`** — `institution`, `field`, `location`, `duration` (all `text not null`)

### Ordered lists

Every list table has `sort_order int not null`. Reordering rewrites `sort_order` for the
affected rows in one transaction.

| Table | Columns (beyond id/timestamps/sort_order) |
|---|---|
| `about_paragraphs` | `body text not null` |
| `nav_links` | `label text not null`, `href text not null` |
| `socials` | `icon_key text not null`, `label text not null`, `handle text not null`, `href text not null` |
| `facts` | `value text not null`, `label text not null` |
| `stack_groups` | `group_name text not null`, `items text[] not null default '{}'` |
| `rating_scales` | `platform`, `handle`, `href`, `rank`, `note` (text), `current_rating`, `peak_rating`, `max_rating` (int) |
| `projects` | `slug text unique not null`, `title`, `year`, `tagline`, `problem`, `description` (text), `tech text[]`, `href text` |
| `roles` | `slug text unique not null`, `role_title`, `org`, `period`, `location`, `description` (text), `tags text[]` |
| `records` | `slug text unique not null`, `kind`, `title`, `issuer`, `date_label`, `description` (text), `result text null`, `image_url text`, `href text null` |
| `events` | `slug text unique not null`, `title`, `date_label`, `location`, `organizer`, `description` (text) |

### Child tables

| Table | Parent | Columns |
|---|---|---|
| `rating_bands` | `rating_scales` (`on delete cascade`) | `from_value int`, `to_value int`, `label text`, `color text`, `sort_order int` |
| `event_photos` | `events` (`on delete cascade`) | `src text not null`, `caption text not null`, `sort_order int` |

### Schema decisions worth stating

- **`text[]` for `tech`, `tags`, `stack_groups.items`.** These are lists of plain strings with
  no attributes of their own. A join table for them would add three tables and buy nothing.
- **`from_value` / `to_value`, not `from` / `to`.** `from` is a SQL reserved word.
- **`current_rating` / `peak_rating` / `max_rating`.** `current` is reserved; the trio is renamed
  together for consistency.
- **`role_title`, not `role`.** Avoids colliding with Postgres role vocabulary in policies.
- **Dates stay `text` as `date_label`.** The site displays `"April 2026"` and `"May 9, 2026"` —
  these are formatted display strings. Storing them as `date` would force a formatting decision
  into code and lose the distinction between a month-precision and a day-precision date.
- **`records.kind`** is constrained: `check (kind in ('Award', 'Certificate'))`.
- **`socials.icon_key`** is a text key (`'github'`, `'codeforces'`, `'codechef'`, `'linkedin'`,
  `'facebook'`, `'instagram'`, `'discord'`, `'mail'`) resolved through a frozen map in
  `src/lib/icons.ts`. React icon components cannot be stored in Postgres. The dashboard renders
  a picker over that map's keys, so only resolvable keys can be selected.
- **`rating_bands.color`** stores the CSS var string as-is (`var(--color-rank-newbie)`). The seven
  rank vars are already defined in `src/index.css:16-22`. The dashboard offers them as a dropdown
  with a color swatch, so arbitrary strings can't be typed in.

## `get_site_content()`

A `security definer` SQL function returning a single `jsonb` object whose keys and nesting match
today's `data.ts` exports exactly:

```json
{
  "profile":   { "name": "...", "image": "...", ... },
  "education": { ... },
  "aboutParagraphs": ["...", "..."],
  "navLinks":  [{ "label": "...", "href": "..." }],
  "socials":   [{ "iconKey": "...", "label": "...", "handle": "...", "href": "..." }],
  "facts":     [{ "value": "...", "label": "..." }],
  "stack":     [{ "group": "...", "items": ["..."] }],
  "ratingScales": [{ "platform": "...", "current": 0, "bands": [{ "from": 0, "to": 0, ... }] }],
  "projects":  [...],
  "roles":     [...],
  "record":    [...],
  "events":    [{ "title": "...", "photos": [{ "src": "...", "caption": "..." }] }]
}
```

Column renames unwind here (`current_rating` → `current`, `from_value` → `from`,
`role_title` → `role`), so the front end sees the names it already uses. Every list is ordered by
`sort_order`. Granted `execute` to `anon` and `authenticated`.

## Public site changes

`src/lib/data.ts` is replaced by `src/lib/content.ts`:

- `ContentProvider` calls the RPC once on mount and holds `{ data, loading, error }`
- `useContent()` returns the typed content object
- `src/types/index.ts` gains interfaces for every content entity; the RPC's return type is
  asserted against them

Each of the 8 section components changes one line — `import { EVENTS } from "@/lib/data"` becomes
`const { events } = useContent()`. Their JSX is untouched.

`App.tsx` wraps `<main>` in `<ContentProvider>` and renders:
- a skeleton while loading
- a plain, honest error state if the fetch fails (live-fetch was chosen, so this path is real
  and must not be a blank page)

## Auth and RLS

- The single admin user is created by hand in the Supabase dashboard. Public signup is disabled
  in project auth settings. No signup UI is built.
- Every content table: `select` policy `using (true)` for `anon` and `authenticated`;
  `insert`/`update`/`delete` policies `using (auth.role() = 'authenticated')`.
- Storage bucket `site-images`: public read, `insert`/`update`/`delete` restricted to
  `authenticated`.
- Login is email + password via `supabase.auth.signInWithPassword`. Session persists in
  localStorage. `onAuthStateChange` drives a route guard that redirects unauthenticated visitors
  from `/admin/*` to `/admin/login`.

Rationale for `auth.role() = 'authenticated'` rather than an allowlist table: signup is off, so
the set of authenticated users is exactly the set of users created by hand in the dashboard.

## Dashboard

`react-router` is the one new runtime dependency. The admin bundle is loaded with `React.lazy`
so visitors to the public site never download it.

```
/admin/login
/admin                    shell: sidebar nav + topbar (admin email, sign out, "View site")
  /profile                singleton form
  /education              singleton form
  /about                  ordered list of paragraphs
  /nav                    ordered list
  /socials                ordered list, icon picker
  /facts                  ordered list
  /stack                  ordered list, string-array field
  /projects               ordered list
  /roles                  ordered list
  /records                ordered list, image picker
  /ratings                nested: scales → bands
  /events                 nested: events → photos
  /images                 Storage browser: upload, copy URL, delete
```

### `<ResourceEditor>`

The single abstraction being built. Driven by a per-table field config:

```ts
{ table: 'projects', label: 'Projects', fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'tech',  type: 'stringList' },
    { name: 'href',  type: 'url' },
] }
```

Handles load, create, update, delete, and reorder for any list table. Eight of the twelve content
pages — `/about`, `/nav`, `/socials`, `/facts`, `/stack`, `/projects`, `/roles`, `/records` — are
~20 lines of config each rather than eight hand-written CRUD screens. It has eight real
implementations at the moment it is written, so it is not speculative flexibility.

`/profile` and `/education` are plain single-record forms; `ResourceEditor` does not cover
singletons. `/ratings` and `/events` get bespoke screens because they edit a parent and its
children together.

### Field types

`text`, `textarea`, `url`, `email`, `number`, `stringList` (chip input backed by `text[]`),
`select` (icon keys, rank colors, `records.kind`), `image` (opens the Storage browser inline
and writes back a public URL).

### Per-page behaviour

Add / edit / delete, move up / move down for ordering, unsaved-changes guard on navigation,
save confirmation toast, and native HTML constraint validation (`required`, `type="url"`,
`type="email"`, `min`/`max`). Delete asks for confirmation.

### Deliberately skipped

| Skipped | Add when |
|---|---|
| `react-hook-form` + `zod` | A field needs validation the browser can't express |
| `dnd-kit` drag-and-drop | A list grows past ~10 items and arrow buttons get tedious |
| Draft / publish workflow | Someone other than the owner starts editing |
| Audit log / revision history | An edit is lost and someone wants it back |
| Multi-user roles and permissions | A second editor exists |

## Migration

1. `scripts/upload-images.ts` — one-time script uploading all 19 files from `public/images/`
   to the `site-images` bucket, printing the resulting public URL for each.
2. `supabase/seed.sql` — inserts today's `data.ts` content, with image paths replaced by the
   Storage URLs from step 1.
3. `public/images/` is deleted once the site renders correctly from Storage.

`src/lib/data.ts` is deleted in the same commit that adds `content.ts`. It remains recoverable
from git history, which the acceptance test depends on.

## Files

```
supabase/migrations/0001_content_schema.sql    tables, constraints, updated_at trigger
supabase/migrations/0002_rls.sql               policies for all tables + storage bucket
supabase/migrations/0003_get_site_content.sql  the read function
supabase/seed.sql                              today's content
scripts/upload-images.ts                       one-time image migration
scripts/verify-content.ts                      acceptance test
vercel.json                                    SPA rewrite for /admin deep links
src/lib/supabase.ts                            client (VITE_SUPABASE_URL + VITE_SUPABASE_PUBLISHABLE_KEY)
src/lib/content.ts                             ContentProvider + useContent (replaces data.ts)
src/lib/icons.ts                               icon_key → component map
src/admin/AdminApp.tsx                         routes, lazy-loaded
src/admin/Login.tsx
src/admin/Layout.tsx                           sidebar + topbar
src/admin/useAuth.ts                           session + route guard
src/admin/useResource.ts                       list CRUD + reorder
src/admin/fields.tsx                           field components
src/admin/ResourceEditor.tsx                   config-driven list editor
src/admin/ImageLibrary.tsx                     Storage browser + picker
src/admin/pages/*.tsx                          13 pages (12 content + images), mostly field config
```

## Verification

**Acceptance test** (`scripts/verify-content.ts`): calls `get_site_content()` and deep-equals the
result against the original `data.ts` values, ignoring image URLs and the non-serializable `icon`
components. If the round trip reproduces the site's content exactly, the schema, the seed, and the
read function are all correct together. This is the one check the implementation must leave behind.

**Manual checks:**
- Public site renders identically to the pre-migration build
- Editing a field in the dashboard and refreshing the site shows the change
- Logged out, `/admin/projects` redirects to login; after login it lands back on the page
- Logged out, a direct `insert` from the browser console is rejected by RLS
- Uploading an image from `/admin/images` and selecting it for a record updates the site
- Deleting an event removes its photos (cascade)
- Hard-refreshing `/admin/projects` on Vercel serves the app, not a 404

## Addendum — theme, dashboard link, resume

Added after the original design was approved.

**Light mode.** Every component already reads the `@theme` tokens, so light mode is
a `:root[data-theme="light"]` block in `index.css` overriding those variables — it
re-themes the public site and the dashboard together, with no component changes.
Rank colours are darkened rather than reused: the dark-mode values are tuned for
`#0a0a0b` and fall below readable contrast on paper white. An inline script in
`index.html` sets `data-theme` from `localStorage` (falling back to
`prefers-color-scheme`) before first paint, so a light-mode visitor never sees a
dark flash. `useTheme()` owns changes from there and keeps the `theme-color` meta
tag in sync. The toggle sits in the site nav, the dashboard topbar, and the login
page.

**Dashboard link.** `useAuth` moved from `src/admin/` to `src/lib/` so the public
nav can use it without importing admin code. The nav renders a Dashboard link only
when a session exists — for an anonymous visitor `getSession()` resolves from
localStorage with no network call.

**Resume.** Placed in the hero action row beside "See the work" and "Get in touch":
that row is already the page's action strip, and the hero is where someone
evaluating him lands first. Stored as `profile.resume_url` + `profile.resume_filename`,
both nullable, with a check constraint keeping them set or cleared together — null
means the link is hidden entirely rather than rendering a dead link. The file lives
in a **separate `site-files` bucket**, because the image library lists every object
in its bucket and would render a PDF as a broken thumbnail in the picker. The admin
page uploads to a fixed `resume.pdf` key so replacing overwrites instead of leaving
orphans, appends a `?v=` timestamp to defeat CDN caching, and validates type
(PDF only) and size (10 MB) before upload.

## Error handling

- **Site fetch fails** — error state with a retry button, not a blank page or a crash
- **Dashboard save fails** — toast surfacing the Postgres error message; form state is preserved
  so nothing typed is lost
- **Image upload fails** — inline error on the upload control; the picker stays open
- **Session expires mid-edit** — the guard redirects to login; unsaved-changes guard fires first
