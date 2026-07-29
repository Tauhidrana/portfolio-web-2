import { SiFacebook, SiInstagram, SiDiscord, SiCodeforces, SiCodechef } from "react-icons/si";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import type { RatingScale, SummitEvent } from "@/types";

export const PROFILE = {
  name: "Kazi Tauhid Rana",
  role: "Competitive programmer",
  location: "Rajshahi, Bangladesh",
  email: "tauhidrana00@gmail.com",
  image: "/images/hero-image.JPG",
  logo: "/images/logo.png",

  // The lede. States what he does and where he stands — no adjectives.
  lede: "I solve algorithmic problems for sport, and build software with what the practice teaches me. Currently studying Computer Science & Technology at Rajshahi Polytechnic Institute.",

  status: "Open to internships and collaboration",
};

export const NAV_LINKS = [
  { label: "Profile", href: "#profile" },
  { label: "Work", href: "#work" },
  { label: "Roles", href: "#roles" },
  { label: "Record", href: "#record" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export const SOCIALS = [
  { icon: FaGithub, label: "GitHub", handle: "Tauhidrana", href: "https://github.com/Tauhidrana" },
  { icon: SiCodeforces, label: "Codeforces", handle: "tauhidrana.exe", href: "https://codeforces.com/profile/tauhidrana.exe" },
  { icon: SiCodechef, label: "CodeChef", handle: "tauhid_rana", href: "https://www.codechef.com/users/tauhid_rana" },
  { icon: FaLinkedin, label: "LinkedIn", handle: "tauhidrana00", href: "https://linkedin.com/in/tauhidrana00" },
  { icon: SiFacebook, label: "Facebook", handle: "kazitauhidrana", href: "https://facebook.com/kazitauhidrana" },
  { icon: SiInstagram, label: "Instagram", handle: "tauhidrana.exe", href: "https://instagram.com/tauhidrana.exe" },
  { icon: SiDiscord, label: "Discord", handle: "kazitauhidrana", href: "https://discord.com/shop/kazitauhidrana" },
  { icon: Mail, label: "Email", handle: "tauhidrana00", href: "mailto:tauhidrana00@gmail.com" },
];

/**
 * The rank ladders these ratings are actually measured against.
 * Bands are the real thresholds on each judge — the marker position is
 * derived from them, so nothing here is decorative.
 */
export const RATING_SCALES: RatingScale[] = [
  {
    platform: "Codeforces",
    handle: "tauhidrana.exe",
    href: "https://codeforces.com/profile/tauhidrana.exe",
    current: 1298,
    peak: 1372,
    rank: "Newbie",
    max: 2400,
    bands: [
      { from: 0, to: 1200, label: "Newbie", color: "var(--color-rank-newbie)" },
      { from: 1200, to: 1400, label: "Pupil", color: "var(--color-rank-pupil)" },
      { from: 1400, to: 1600, label: "Spec", color: "var(--color-rank-specialist)" },
      { from: 1600, to: 1900, label: "Expert", color: "var(--color-rank-expert)" },
      { from: 1900, to: 2100, label: "CM", color: "var(--color-rank-cm)" },
      { from: 2100, to: 2400, label: "Master", color: "var(--color-rank-master)" },
    ],
    // Honest, specific, and the most interesting true fact on the page.
    note: "54 points below Pupil at peak.",
  },
  {
    platform: "CodeChef",
    handle: "tauhid_rana",
    href: "https://www.codechef.com/users/tauhid_rana",
    current: 1654,
    peak: 1686,
    rank: "3 star",
    max: 2500,
    bands: [
      { from: 0, to: 1400, label: "1★", color: "var(--color-rank-newbie)" },
      { from: 1400, to: 1600, label: "2★", color: "var(--color-rank-pupil)" },
      { from: 1600, to: 1800, label: "3★", color: "var(--color-rank-specialist)" },
      { from: 1800, to: 2000, label: "4★", color: "var(--color-rank-expert)" },
      { from: 2000, to: 2200, label: "5★", color: "var(--color-rank-cm)" },
      { from: 2200, to: 2500, label: "6★", color: "var(--color-rank-master)" },
    ],
    note: "Crossed into 3 star and held it.",
  },
];

export const FACTS = [
  { value: "200+", label: "Problems solved" },
  { value: "15+", label: "Rated contests" },
  { value: "5th", label: "NHSPC 2026" },
  { value: "2", label: "Products shipped" },
];

export const EDUCATION = {
  institution: "Rajshahi Polytechnic Institute",
  field: "Computer Science & Technology",
  location: "Rajshahi, Bangladesh",
  duration: "2025–2026",
};

export const ABOUT_PARAGRAPHS = [
  "It started with a loop that did not behave the way I expected. Chasing that down pulled me into competitive programming, where I have spent real hours on graph theory, dynamic programming, and the edge cases that quietly break otherwise correct solutions.",
  "Contests are the part I care about most. A rated round is an honest measurement — it tells you where your reasoning holds and where it does not, twice a week, whether or not you like the answer. My rating is modest and climbing, and I can tell you exactly which topics are holding it down.",
  "The building came after. **Takify** started because splitting mess expenses by hand was tedious and error-prone. **ZverT** started because a YouTube playlist is a terrible course structure. Both are live, both were built end to end, and both taught me things a problem set cannot.",
];

export const STACK = [
  { group: "Languages", items: ["C++", "C", "Python"] },
  { group: "Tools", items: ["Git", "Linux", "GDB", "VS Code"] },
  { group: "Judges", items: ["Codeforces", "CodeChef", "LeetCode"] },
];

export const PROJECTS = [
  {
    id: "takify",
    title: "Takify",
    year: "2025",
    tagline: "Shared expense tracking for messes and friend groups",
    problem:
      "Splitting shared costs by hand breaks down as soon as more than three people are involved. Everyone remembers a different number.",
    description:
      "Tracks shared expenses, debts, personal budgets, and settlements in one place, then reduces the whole graph of who-owes-whom to the fewest payments that settle it.",
    tech: ["React", "Node.js", "PostgreSQL", "Chart.js", "Tailwind CSS"],
    href: "https://takify.lovable.app",
  },
  {
    id: "zvert",
    title: "ZverT",
    year: "2026",
    tagline: "YouTube playlists, restructured as courses",
    problem:
      "A playlist has no structure, no progress, and no way to check whether anything stuck. It is a queue, not a curriculum.",
    description:
      "Paste a playlist link and get ordered modules, locked lessons, progress tracking, MCQ quizzes, and a study assistant that answers against the transcript.",
    tech: ["Next.js", "TypeScript", "OpenAI API", "Prisma", "Tailwind CSS"],
    href: "https://zvert.lovable.app",
  },
];

export const ROLES = [
  {
    id: "startup",
    role: "Co-founder",
    org: "ZeroD",
    period: "2023 — Present",
    location: "Rajshahi",
    description:
      "Built Takify and ZverT from ideation through deployment — architecture, implementation, and release. Both are live products, built solo.",
    tags: ["Product", "Full stack"],
  },
  {
    id: "team-leader",
    role: "Team Leader",
    org: "ZeroD CP Team",
    period: "2026 — Present",
    location: "Rajshahi Polytechnic Institute",
    description:
      "Lead a competitive programming team. Curate practice sets, run internal mock contests, and review solutions after each round.",
    tags: ["Leadership", "Contests"],
  },
  {
    id: "campus-hero",
    role: "Campus Hero",
    org: "Programming Hero",
    period: "2026 — Present",
    location: "Rajshahi",
    description:
      "Support students working through the platform's curriculum — answering questions, running local study sessions, and pointing people at the right resources.",
    tags: ["Mentoring", "Community"],
  },
  {
    id: "campus-ambassador",
    role: "Campus Ambassador",
    org: "Shohoj Coding",
    period: "2026 — Present",
    location: "Rajshahi Polytechnic Institute",
    description:
      "Represent Shohoj Coding on campus. Run peer coding sessions and bring students into competitive programming communities.",
    tags: ["Outreach"],
  },
];

/** Awards and certificates share one shape — both are things someone else verified. */
export const RECORD = [
  {
    id: "nhspc-2026",
    kind: "Award",
    title: "National High School Programming Contest 2026",
    issuer: "Bangladesh Computer Council",
    date: "April 2026",
    result: "5th — Regional",
    description: "Placed 5th in the regional round of the national contest.",
    image: "/images/nhspc.jpg",
    href: null,
  },
  {
    id: "olympiad-2024",
    kind: "Award",
    title: "Science Olympiad 2024",
    issuer: "Regional",
    date: "2024",
    result: "2nd",
    description: "Second place in the regional round.",
    image: "/images/olympiad.png",
    href: null,
  },
  {
    id: "nhspc-certificate",
    kind: "Certificate",
    title: "NHSPC 2026 — Certificate of Achievement",
    issuer: "Bangladesh Computer Council",
    date: "April 2026",
    result: null,
    description: "Issued for the 5th place finish.",
    image: "/images/nhspc-certificate.jpeg",
    href: null,
  },
  {
    id: "codechef-stacks-queues",
    kind: "Certificate",
    title: "Stacks and Queues",
    issuer: "CodeChef",
    date: "January 2026",
    result: null,
    description: "Completed every practice problem in the module. ID 31d14d2.",
    image: "/images/code-chef.webp",
    href: "https://www.codechef.com/certificates/verify",
  },
  {
    id: "national-career-conference",
    kind: "Certificate",
    title: "National Career Conference 2026",
    issuer: "Youth Skill Development Institute",
    date: "March 2026",
    result: null,
    description: "Participant — “Future of Work in Bangladesh: Skills That Will Dominate 2030”.",
    image: "/images/ncc.png",
    href: null,
  },
];

export const EVENTS: SummitEvent[] = [
  {
    id: "ai-summit-2026",
    title: "AI Summit Rajshahi 2026",
    date: "May 9, 2026",
    location: "Rajshahi, Bangladesh",
    organizer: "Rajshahi Tech Community × Bangladesh Tech Entrepreneur Society",
    description:
      "A day of panels on where AI is actually being deployed in Bangladesh, and the people building it. Met Abdur Rakib, COO of Programming Hero, and several founders working on applied AI.",
    photos: [
      { src: "/images/summit1.jpg", caption: "AI Summit Rajshahi 2026" },
      { src: "/images/summit2.jpg", caption: "With Abdur Rakib, COO of Programming Hero" },
      { src: "/images/summit3.jpg", caption: "Venue entrance" },
      { src: "/images/summit4.jpg", caption: "Outside the main hall" },
      { src: "/images/summit5.jpg", caption: "Inside the summit hall" },
      { src: "/images/summit6.jpg", caption: "Panel: The Next Era of Growth with AI" },
      { src: "/images/summit7.jpg", caption: "Networking between sessions" },
      { src: "/images/summit8.jpg", caption: "Speaker banners along the walkway" },
    ],
  },
];
