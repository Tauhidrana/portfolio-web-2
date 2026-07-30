/**
 * Acceptance test for the content migration.
 *
 *   bun run scripts/verify-content.ts
 *
 * Calls get_site_content() and deep-compares the result against what
 * src/lib/data.ts held before the migration. Image URLs are compared by
 * filename only, since they moved from /images/... to a Storage URL.
 *
 * If this passes, the schema, the seed, and the read function are all correct
 * together — the database reproduces the old site exactly.
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.error("Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.");
  process.exit(1);
}

/** Image fields are compared by basename: the host and path legitimately changed. */
const basename = (value: string) => value.split("/").pop() ?? value;

const EXPECTED = {
  profile: {
    name: "Kazi Tauhid Rana",
    role: "Competitive programmer",
    location: "Rajshahi, Bangladesh",
    email: "tauhidrana00@gmail.com",
    image: "hero-image.JPG",
    logo: "logo.png",
    lede: "I solve algorithmic problems for sport, and build software with what the practice teaches me. Currently studying Computer Science & Technology at Rajshahi Polytechnic Institute.",
    status: "Open to internships and collaboration",
  },
  education: {
    institution: "Rajshahi Polytechnic Institute",
    field: "Computer Science & Technology",
    location: "Rajshahi, Bangladesh",
    duration: "2025–2026",
  },
  aboutParagraphs: [
    "It started with a loop that did not behave the way I expected. Chasing that down pulled me into competitive programming, where I have spent real hours on graph theory, dynamic programming, and the edge cases that quietly break otherwise correct solutions.",
    "Contests are the part I care about most. A rated round is an honest measurement — it tells you where your reasoning holds and where it does not, twice a week, whether or not you like the answer. My rating is modest and climbing, and I can tell you exactly which topics are holding it down.",
    "The building came after. **Takify** started because splitting mess expenses by hand was tedious and error-prone. **Zverts** started because a YouTube playlist is a terrible course structure. Both are live, both were built end to end, and both taught me things a problem set cannot.",
  ],
  navLinks: [
    { label: "Profile", href: "#profile" },
    { label: "Work", href: "#work" },
    { label: "Roles", href: "#roles" },
    { label: "Record", href: "#record" },
    { label: "Events", href: "#events" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    { iconKey: "github", label: "GitHub", handle: "Tauhidrana", href: "https://github.com/Tauhidrana" },
    { iconKey: "codeforces", label: "Codeforces", handle: "tauhidrana.exe", href: "https://codeforces.com/profile/tauhidrana.exe" },
    { iconKey: "codechef", label: "CodeChef", handle: "tauhid_rana", href: "https://www.codechef.com/users/tauhid_rana" },
    { iconKey: "linkedin", label: "LinkedIn", handle: "tauhidrana00", href: "https://linkedin.com/in/tauhidrana00" },
    { iconKey: "facebook", label: "Facebook", handle: "kazitauhidrana", href: "https://facebook.com/kazitauhidrana" },
    { iconKey: "instagram", label: "Instagram", handle: "tauhidrana.exe", href: "https://instagram.com/tauhidrana.exe" },
    { iconKey: "discord", label: "Discord", handle: "kazitauhidrana", href: "https://discord.com/shop/kazitauhidrana" },
    { iconKey: "mail", label: "Email", handle: "tauhidrana00", href: "mailto:tauhidrana00@gmail.com" },
  ],
  facts: [
    { value: "600+", label: "Problems solved" },
    { value: "40+", label: "Rated contests" },
    { value: "5th", label: "NHSPC 2026" },
    { value: "2", label: "Products shipped" },
  ],
  stack: [
    { group: "Languages", items: ["C++", "C", "Python"] },
    { group: "Tools", items: ["Git", "Linux", "GDB", "VS Code"] },
    { group: "Judges", items: ["Codeforces", "CodeChef", "LeetCode"] },
  ],
  ratingScales: [
    {
      platform: "Codeforces",
      handle: "tauhidrana.exe",
      href: "https://codeforces.com/profile/tauhidrana.exe",
      current: 1298,
      peak: 1372,
      rank: "Newbie",
      max: 2400,
      note: "54 points below Pupil at peak.",
      bands: [
        { from: 0, to: 1200, label: "Newbie", color: "var(--color-rank-newbie)" },
        { from: 1200, to: 1400, label: "Pupil", color: "var(--color-rank-pupil)" },
        { from: 1400, to: 1600, label: "Spec", color: "var(--color-rank-specialist)" },
        { from: 1600, to: 1900, label: "Expert", color: "var(--color-rank-expert)" },
        { from: 1900, to: 2100, label: "CM", color: "var(--color-rank-cm)" },
        { from: 2100, to: 2400, label: "Master", color: "var(--color-rank-master)" },
      ],
    },
    {
      platform: "CodeChef",
      handle: "tauhid_rana",
      href: "https://www.codechef.com/users/tauhid_rana",
      current: 1654,
      peak: 1686,
      rank: "3 star",
      max: 2500,
      note: "Crossed into 3 star and held it.",
      bands: [
        { from: 0, to: 1400, label: "1★", color: "var(--color-rank-newbie)" },
        { from: 1400, to: 1600, label: "2★", color: "var(--color-rank-pupil)" },
        { from: 1600, to: 1800, label: "3★", color: "var(--color-rank-specialist)" },
        { from: 1800, to: 2000, label: "4★", color: "var(--color-rank-expert)" },
        { from: 2000, to: 2200, label: "5★", color: "var(--color-rank-cm)" },
        { from: 2200, to: 2500, label: "6★", color: "var(--color-rank-master)" },
      ],
    },
  ],
  projects: [
    {
      id: "takify",
      title: "Takify",
      year: "2025",
      tagline: "Shared expense tracking for messes and friend groups",
      problem: "Splitting shared costs by hand breaks down as soon as more than three people are involved. Everyone remembers a different number.",
      description: "Tracks shared expenses, debts, personal budgets, and settlements in one place, then reduces the whole graph of who-owes-whom to the fewest payments that settle it.",
      tech: ["React", "Node.js", "PostgreSQL", "Chart.js", "Tailwind CSS"],
      href: "https://takify.lovable.app",
    },
    {
      id: "zverts",
      title: "Zverts",
      year: "2026",
      tagline: "YouTube playlists, restructured as courses",
      problem: "A playlist has no structure, no progress, and no way to check whether anything stuck. It is a queue, not a curriculum.",
      description: "Paste a playlist link and get ordered modules, locked lessons, progress tracking, MCQ quizzes, and a study assistant that answers against the transcript.",
      tech: ["Next.js", "TypeScript", "OpenAI API", "Prisma", "Tailwind CSS"],
      href: "https://zverts.com",
    },
  ],
  roles: [
    {
      id: "startup", role: "Co-founder", org: "ZeroD", period: "2023 — Present", location: "Rajshahi",
      description: "Built Takify and Zverts from ideation through deployment — architecture, implementation, and release. Both are live products, built solo.",
      tags: ["Product", "Full stack"],
    },
    {
      id: "team-leader", role: "Team Leader", org: "ZeroD CP Team", period: "2026 — Present", location: "Rajshahi Polytechnic Institute",
      description: "Lead a competitive programming team. Curate practice sets, run internal mock contests, and review solutions after each round.",
      tags: ["Leadership", "Contests"],
    },
    {
      id: "campus-hero", role: "Campus Hero", org: "Programming Hero", period: "2026 — Present", location: "Rajshahi",
      description: "Support students working through the platform's curriculum — answering questions, running local study sessions, and pointing people at the right resources.",
      tags: ["Mentoring", "Community"],
    },
    {
      id: "campus-ambassador", role: "Campus Ambassador", org: "Shohoj Coding", period: "2026 — Present", location: "Rajshahi Polytechnic Institute",
      description: "Represent Shohoj Coding on campus. Run peer coding sessions and bring students into competitive programming communities.",
      tags: ["Outreach"],
    },
  ],
  record: [
    {
      id: "nhspc-2026", kind: "Award", title: "National High School Programming Contest 2026",
      issuer: "Bangladesh Computer Council", date: "April 2026", result: "5th — Regional",
      description: "Placed 5th in the regional round of the national contest.",
      image: "nhspc.jpg", href: null,
    },
    {
      id: "olympiad-2024", kind: "Award", title: "Science Olympiad 2024", issuer: "Regional",
      date: "2024", result: "2nd", description: "Second place in the regional round.",
      image: "olympiad.png", href: null,
    },
    {
      id: "nhspc-certificate", kind: "Certificate", title: "NHSPC 2026 — Certificate of Achievement",
      issuer: "Bangladesh Computer Council", date: "April 2026", result: null,
      description: "Issued for the 5th place finish.",
      image: "nhspc-certificate.jpeg", href: null,
    },
    {
      id: "codechef-stacks-queues", kind: "Certificate", title: "Stacks and Queues", issuer: "CodeChef",
      date: "January 2026", result: null,
      description: "Completed every practice problem in the module. ID 31d14d2.",
      image: "code-chef.webp", href: "https://www.codechef.com/certificates/verify",
    },
    {
      id: "national-career-conference", kind: "Certificate", title: "National Career Conference 2026",
      issuer: "Youth Skill Development Institute", date: "March 2026", result: null,
      description: "Participant — “Future of Work in Bangladesh: Skills That Will Dominate 2030”.",
      image: "ncc.png", href: null,
    },
  ],
  events: [
    {
      id: "ai-summit-2026",
      title: "AI Summit Rajshahi 2026",
      date: "May 9, 2026",
      location: "Rajshahi, Bangladesh",
      organizer: "Rajshahi Tech Community × Bangladesh Tech Entrepreneur Society",
      description: "A day of panels on where AI is actually being deployed in Bangladesh, and the people building it. Met Abdur Rakib, COO of Programming Hero, and several founders working on applied AI.",
      photos: [
        { src: "summit1.jpg", caption: "AI Summit Rajshahi 2026" },
        { src: "summit2.jpg", caption: "With Abdur Rakib, COO of Programming Hero" },
        { src: "summit3.jpg", caption: "Venue entrance" },
        { src: "summit4.jpg", caption: "Outside the main hall" },
        { src: "summit5.jpg", caption: "Inside the summit hall" },
        { src: "summit6.jpg", caption: "Panel: The Next Era of Growth with AI" },
        { src: "summit7.jpg", caption: "Networking between sessions" },
        { src: "summit8.jpg", caption: "Speaker banners along the walkway" },
      ],
    },
  ],
};

type Jsonish = Record<string, unknown>;

/** The only parts normalise() needs to know the shape of. */
interface ImageBearing {
  profile?: { image: string; logo: string };
  record?: { image: string }[];
  events?: { photos?: { src: string }[] }[];
}

/** Reduces every image field to its filename so hosts and paths do not matter. */
function normalise(content: Jsonish): Jsonish {
  const c = structuredClone(content) as Jsonish & ImageBearing;

  if (c.profile) {
    c.profile.image = basename(c.profile.image);
    c.profile.logo = basename(c.profile.logo);
  }
  for (const r of c.record ?? []) r.image = basename(r.image);
  for (const e of c.events ?? []) {
    for (const p of e.photos ?? []) p.src = basename(p.src);
  }

  return c;
}

/** Deep comparison that reports the first mismatch by path, not just "false". */
function diff(actual: unknown, expected: unknown, path = ""): string[] {
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual)) return [`${path}: expected an array, got ${typeof actual}`];
    if (actual.length !== expected.length) {
      return [`${path}: expected ${expected.length} items, got ${actual.length}`];
    }
    return expected.flatMap((v, i) => diff(actual[i], v, `${path}[${i}]`));
  }

  if (expected && typeof expected === "object") {
    if (!actual || typeof actual !== "object") {
      return [`${path}: expected an object, got ${actual === null ? "null" : typeof actual}`];
    }
    return Object.entries(expected).flatMap(([k, v]) =>
      diff((actual as Record<string, unknown>)[k], v, path ? `${path}.${k}` : k),
    );
  }

  return actual === expected
    ? []
    : [`${path}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`];
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

const { data, error } = await supabase.rpc("get_site_content");

if (error) {
  console.error(`get_site_content() failed: ${error.message}`);
  process.exit(1);
}

const problems = diff(normalise(data as Jsonish), EXPECTED);

if (problems.length === 0) {
  console.log("PASS — the database reproduces the original site content exactly.");
  process.exit(0);
}

console.error(`FAIL — ${problems.length} mismatch(es):\n`);
for (const p of problems.slice(0, 40)) console.error(`  ${p}`);
if (problems.length > 40) console.error(`  … and ${problems.length - 40} more`);

console.error(
  "\nNote: this compares against the pre-migration snapshot of data.ts. Once you\n" +
    "edit content in the dashboard, differences here are expected — it only proves\n" +
    "the migration was faithful, not that the current content is wrong.",
);

process.exit(1);
