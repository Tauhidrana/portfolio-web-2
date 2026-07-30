-- Today's site content, migrated out of src/lib/data.ts.
--
-- Re-runnable: truncates content tables first, so applying it twice leaves the
-- same state rather than duplicating rows. Image URLs point at the site-images
-- bucket and assume scripts/upload-images.ts has already run.

truncate table
  public.about_paragraphs, public.nav_links, public.socials, public.facts,
  public.stack_groups, public.rating_bands, public.rating_scales,
  public.projects, public.roles, public.records,
  public.event_photos, public.events
restart identity cascade;

-- ---------------------------------------------------------------------------
-- Profile and education
-- ---------------------------------------------------------------------------

insert into public.profile (id, name, role, location, email, image_url, logo_url, lede, status)
values (
  1,
  'Kazi Tauhid Rana',
  'Competitive programmer',
  'Rajshahi, Bangladesh',
  'tauhidrana00@gmail.com',
  'https://cgswxxiwkfhzxlnfqniw.supabase.co/storage/v1/object/public/site-images/hero-image.JPG',
  'https://cgswxxiwkfhzxlnfqniw.supabase.co/storage/v1/object/public/site-images/logo.png',
  'I solve algorithmic problems for sport, and build software with what the practice teaches me. Currently studying Computer Science & Technology at Rajshahi Polytechnic Institute.',
  'Open to internships and collaboration'
)
on conflict (id) do update set
  name = excluded.name, role = excluded.role, location = excluded.location,
  email = excluded.email, image_url = excluded.image_url, logo_url = excluded.logo_url,
  lede = excluded.lede, status = excluded.status;

insert into public.education (id, institution, field, location, duration)
values (1, 'Rajshahi Polytechnic Institute', 'Computer Science & Technology', 'Rajshahi, Bangladesh', '2025–2026')
on conflict (id) do update set
  institution = excluded.institution, field = excluded.field,
  location = excluded.location, duration = excluded.duration;

-- ---------------------------------------------------------------------------
-- About
-- ---------------------------------------------------------------------------

insert into public.about_paragraphs (body, sort_order) values
('It started with a loop that did not behave the way I expected. Chasing that down pulled me into competitive programming, where I have spent real hours on graph theory, dynamic programming, and the edge cases that quietly break otherwise correct solutions.', 0),
('Contests are the part I care about most. A rated round is an honest measurement — it tells you where your reasoning holds and where it does not, twice a week, whether or not you like the answer. My rating is modest and climbing, and I can tell you exactly which topics are holding it down.', 1),
('The building came after. **Takify** started because splitting mess expenses by hand was tedious and error-prone. **Zverts** started because a YouTube playlist is a terrible course structure. Both are live, both were built end to end, and both taught me things a problem set cannot.', 2);

-- ---------------------------------------------------------------------------
-- Navigation and socials
-- ---------------------------------------------------------------------------

insert into public.nav_links (label, href, sort_order) values
('Profile', '#profile', 0),
('Work',    '#work',    1),
('Roles',   '#roles',   2),
('Record',  '#record',  3),
('Events',  '#events',  4),
('Contact', '#contact', 5);

insert into public.socials (icon_key, label, handle, href, sort_order) values
('github',     'GitHub',     'Tauhidrana',       'https://github.com/Tauhidrana',                        0),
('codeforces', 'Codeforces', 'tauhidrana.exe',   'https://codeforces.com/profile/tauhidrana.exe',        1),
('codechef',   'CodeChef',   'tauhid_rana',      'https://www.codechef.com/users/tauhid_rana',           2),
('linkedin',   'LinkedIn',   'tauhidrana00',     'https://linkedin.com/in/tauhidrana00',                 3),
('facebook',   'Facebook',   'kazitauhidrana',   'https://facebook.com/kazitauhidrana',                  4),
('instagram',  'Instagram',  'tauhidrana.exe',   'https://instagram.com/tauhidrana.exe',                 5),
('discord',    'Discord',    'kazitauhidrana',   'https://discord.com/shop/kazitauhidrana',              6),
('mail',       'Email',      'tauhidrana00',     'mailto:tauhidrana00@gmail.com',                        7);

-- ---------------------------------------------------------------------------
-- Facts and stack
-- ---------------------------------------------------------------------------

insert into public.facts (value, label, sort_order) values
('600+', 'Problems solved',  0),
('40+',  'Rated contests',   1),
('5th',  'NHSPC 2026',       2),
('2',    'Products shipped', 3);

insert into public.stack_groups (group_name, items, sort_order) values
('Languages', array['C++', 'C', 'Python'],                    0),
('Tools',     array['Git', 'Linux', 'GDB', 'VS Code'],        1),
('Judges',    array['Codeforces', 'CodeChef', 'LeetCode'],    2);

-- ---------------------------------------------------------------------------
-- Rating ladders. Bands are the real thresholds on each judge -- the marker
-- position is derived from them, so nothing here is decorative.
-- ---------------------------------------------------------------------------

with cf as (
  insert into public.rating_scales
    (platform, handle, href, current_rating, peak_rating, rank, max_rating, note, sort_order)
  values (
    'Codeforces', 'tauhidrana.exe', 'https://codeforces.com/profile/tauhidrana.exe',
    1298, 1372, 'Newbie', 2400, '54 points below Pupil at peak.', 0
  )
  returning id
)
insert into public.rating_bands (scale_id, from_value, to_value, label, color, sort_order)
select cf.id, v.from_value, v.to_value, v.label, v.color, v.sort_order
from cf, (values
  (0,    1200, 'Newbie', 'var(--color-rank-newbie)',     0),
  (1200, 1400, 'Pupil',  'var(--color-rank-pupil)',      1),
  (1400, 1600, 'Spec',   'var(--color-rank-specialist)', 2),
  (1600, 1900, 'Expert', 'var(--color-rank-expert)',     3),
  (1900, 2100, 'CM',     'var(--color-rank-cm)',         4),
  (2100, 2400, 'Master', 'var(--color-rank-master)',     5)
) as v(from_value, to_value, label, color, sort_order);

with cc as (
  insert into public.rating_scales
    (platform, handle, href, current_rating, peak_rating, rank, max_rating, note, sort_order)
  values (
    'CodeChef', 'tauhid_rana', 'https://www.codechef.com/users/tauhid_rana',
    1654, 1686, '3 star', 2500, 'Crossed into 3 star and held it.', 1
  )
  returning id
)
insert into public.rating_bands (scale_id, from_value, to_value, label, color, sort_order)
select cc.id, v.from_value, v.to_value, v.label, v.color, v.sort_order
from cc, (values
  (0,    1400, '1★', 'var(--color-rank-newbie)',     0),
  (1400, 1600, '2★', 'var(--color-rank-pupil)',      1),
  (1600, 1800, '3★', 'var(--color-rank-specialist)', 2),
  (1800, 2000, '4★', 'var(--color-rank-expert)',     3),
  (2000, 2200, '5★', 'var(--color-rank-cm)',         4),
  (2200, 2500, '6★', 'var(--color-rank-master)',     5)
) as v(from_value, to_value, label, color, sort_order);

-- ---------------------------------------------------------------------------
-- Projects
-- ---------------------------------------------------------------------------

insert into public.projects (slug, title, year, tagline, problem, description, tech, href, sort_order) values
(
  'takify', 'Takify', '2025',
  'Shared expense tracking for messes and friend groups',
  'Splitting shared costs by hand breaks down as soon as more than three people are involved. Everyone remembers a different number.',
  'Tracks shared expenses, debts, personal budgets, and settlements in one place, then reduces the whole graph of who-owes-whom to the fewest payments that settle it.',
  array['React', 'Node.js', 'PostgreSQL', 'Chart.js', 'Tailwind CSS'],
  'https://takify.lovable.app', 0
),
(
  'zverts', 'Zverts', '2026',
  'YouTube playlists, restructured as courses',
  'A playlist has no structure, no progress, and no way to check whether anything stuck. It is a queue, not a curriculum.',
  'Paste a playlist link and get ordered modules, locked lessons, progress tracking, MCQ quizzes, and a study assistant that answers against the transcript.',
  array['Next.js', 'TypeScript', 'OpenAI API', 'Prisma', 'Tailwind CSS'],
  'https://zverts.com', 1
);

-- ---------------------------------------------------------------------------
-- Roles
-- ---------------------------------------------------------------------------

insert into public.roles (slug, role_title, org, period, location, description, tags, sort_order) values
(
  'startup', 'Co-founder', 'ZeroD', '2023 — Present', 'Rajshahi',
  'Built Takify and Zverts from ideation through deployment — architecture, implementation, and release. Both are live products, built solo.',
  array['Product', 'Full stack'], 0
),
(
  'team-leader', 'Team Leader', 'ZeroD CP Team', '2026 — Present', 'Rajshahi Polytechnic Institute',
  'Lead a competitive programming team. Curate practice sets, run internal mock contests, and review solutions after each round.',
  array['Leadership', 'Contests'], 1
),
(
  'campus-hero', 'Campus Hero', 'Programming Hero', '2026 — Present', 'Rajshahi',
  'Support students working through the platform''s curriculum — answering questions, running local study sessions, and pointing people at the right resources.',
  array['Mentoring', 'Community'], 2
),
(
  'campus-ambassador', 'Campus Ambassador', 'Shohoj Coding', '2026 — Present', 'Rajshahi Polytechnic Institute',
  'Represent Shohoj Coding on campus. Run peer coding sessions and bring students into competitive programming communities.',
  array['Outreach'], 3
);

-- ---------------------------------------------------------------------------
-- Record
-- ---------------------------------------------------------------------------

insert into public.records (slug, kind, title, issuer, date_label, result, description, image_url, href, sort_order) values
(
  'nhspc-2026', 'Award', 'National High School Programming Contest 2026',
  'Bangladesh Computer Council', 'April 2026', '5th — Regional',
  'Placed 5th in the regional round of the national contest.',
  'https://cgswxxiwkfhzxlnfqniw.supabase.co/storage/v1/object/public/site-images/nhspc.jpg',
  null, 0
),
(
  'olympiad-2024', 'Award', 'Science Olympiad 2024', 'Regional', '2024', '2nd',
  'Second place in the regional round.',
  'https://cgswxxiwkfhzxlnfqniw.supabase.co/storage/v1/object/public/site-images/olympiad.png',
  null, 1
),
(
  'nhspc-certificate', 'Certificate', 'NHSPC 2026 — Certificate of Achievement',
  'Bangladesh Computer Council', 'April 2026', null,
  'Issued for the 5th place finish.',
  'https://cgswxxiwkfhzxlnfqniw.supabase.co/storage/v1/object/public/site-images/nhspc-certificate.jpeg',
  null, 2
),
(
  'codechef-stacks-queues', 'Certificate', 'Stacks and Queues', 'CodeChef', 'January 2026', null,
  'Completed every practice problem in the module. ID 31d14d2.',
  'https://cgswxxiwkfhzxlnfqniw.supabase.co/storage/v1/object/public/site-images/code-chef.webp',
  'https://www.codechef.com/certificates/verify', 3
),
(
  'national-career-conference', 'Certificate', 'National Career Conference 2026',
  'Youth Skill Development Institute', 'March 2026', null,
  'Participant — “Future of Work in Bangladesh: Skills That Will Dominate 2030”.',
  'https://cgswxxiwkfhzxlnfqniw.supabase.co/storage/v1/object/public/site-images/ncc.png',
  null, 4
);

-- ---------------------------------------------------------------------------
-- Events
-- ---------------------------------------------------------------------------

with ev as (
  insert into public.events (slug, title, date_label, location, organizer, description, sort_order)
  values (
    'ai-summit-2026', 'AI Summit Rajshahi 2026', 'May 9, 2026', 'Rajshahi, Bangladesh',
    'Rajshahi Tech Community × Bangladesh Tech Entrepreneur Society',
    'A day of panels on where AI is actually being deployed in Bangladesh, and the people building it. Met Abdur Rakib, COO of Programming Hero, and several founders working on applied AI.',
    0
  )
  returning id
)
insert into public.event_photos (event_id, src, caption, sort_order)
select ev.id,
       'https://cgswxxiwkfhzxlnfqniw.supabase.co/storage/v1/object/public/site-images/' || v.file,
       v.caption, v.sort_order
from ev, (values
  ('summit1.jpg', 'AI Summit Rajshahi 2026',                     0),
  ('summit2.jpg', 'With Abdur Rakib, COO of Programming Hero',   1),
  ('summit3.jpg', 'Venue entrance',                              2),
  ('summit4.jpg', 'Outside the main hall',                       3),
  ('summit5.jpg', 'Inside the summit hall',                      4),
  ('summit6.jpg', 'Panel: The Next Era of Growth with AI',       5),
  ('summit7.jpg', 'Networking between sessions',                 6),
  ('summit8.jpg', 'Speaker banners along the walkway',           7)
) as v(file, caption, sort_order);
