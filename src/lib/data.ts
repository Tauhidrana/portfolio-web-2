import { SiFacebook, SiInstagram, SiDiscord } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Camera, Globe, Mail, Tag } from "lucide-react";
import {
  Code2,
  Terminal,
  Trophy,
  Cpu,
  TrendingUp,
  Zap,
  Code,
  Layers,
  Award,
  Flame,
  Target,
  DollarSign,
  BookOpen,
  Users,
  Sparkles,
} from "lucide-react";
import {
  SiC,
  SiCplusplus,
  SiPython,
  SiGit,
  SiLinux,
  SiVscodium,
  SiGithub,
  SiCodeforces,
  SiCodechef,
} from "react-icons/si";
import type { Section, SkillCategory, SummitData } from "@/types";

export const HERO_DATA = {
  availability: "Available for opportunities",

  name: {
    first: "Kazi",
    middle: "Tauhid",
    last: "Rana",
  },

  role: "Software Engineer & Competitive Programmer",

  description:
    "NHSPC 2026 Regionalist (5th place) | 3★ at CodeChef | Competitive Programmer | Campus Hero at Programming Hero | Campus Ambassador at Shohoj Coding",

  cta: [
    {
      label: "Explore My Work",
      href: "#projects",
      icon: Code2,
      variant: "primary",
      testId: "hero-explore-work",
    },
    {
      label: "Get In Touch",
      href: "#contact",
      icon: Terminal,
      variant: "secondary",
      testId: "hero-get-in-touch",
    },
  ],

  socials: [
    {
      icon: FaGithub,
      href: "https://github.com/Tauhidrana",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/tauhidrana00",
      label: "LinkedIn",
    },
    {
      icon: SiFacebook,
      href: "https://facebook.com/kazitauhidrana",
      label: "Facebook",
    },
    {
      icon: SiInstagram,
      href: "https://instagram.com/tauhidrana.exe",
      label: "Instagram",
    },
    {
      icon: SiDiscord,
      href: "https://discord.com/shop/kazitauhidrana",
      label: "Discord",
    },
    {
      icon: Mail,
      href: "mailto:tauhidrana00@gmail.com",
      label: "Email",
    },
  ],

  floatingSnippets: [
    {
      text: "O(n log n)",
      delay: 0,
      position: { left: "5%", top: "20%" },
    },
    {
      text: "solve(n, dp)",
      delay: 1.5,
      position: { left: "80%", top: "15%" },
    },
    {
      text: "#include <bits/stdc++.h>",
      delay: 0.8,
      position: { left: "70%", top: "75%" },
    },
    {
      text: "git push origin main",
      delay: 2,
      position: { left: "8%", top: "72%" },
    },
  ],
} as const;

export const ABOUT_DATA = {
  section: {
    id: "about",
    eyebrow: "01. Who Am I",
    title: {
      normal: "About",
      gradient: "Me",
    },
  },

  profile: {
    name: "Kazi Tauhid Rana",
    role: "Software Engineer & CP",
    image: "/images/hero-image.JPG",
    availability: "Available",

    competitiveProgramming: {
      platform: "CF",
      rating: "1068 rated",
    },
  },

  education: {
    institution: "Rajshahi Polytechnic Institute",
    field: "Computer Science & Technology",
    location: "Rajshahi, Bangladesh",
    duration: "2025–2026",
  },

  stats: [
    {
      icon: Trophy,
      label: "Problems Solved",
      value: "200+",
      color: "text-yellow-400",
    },
    {
      icon: Cpu,
      label: "Projects Built",
      value: "2+",
      color: "text-indigo-400",
    },
    {
      icon: BookOpen,
      label: "Contests Entered",
      value: "15+",
      color: "text-cyan-400",
    },
    {
      icon: TrendingUp,
      label: "CodeChef Stars",
      value: "3★",
      color: "text-orange-400",
    },
  ],

  paragraphs: [
    {
      type: "highlight",
      text: "Some programmers write code to build things. I write code to solve things — then build them.",
    },

    {
      type: "normal",
      text: "It started with a simple question: why does a loop behave the way it does? That curiosity dragged me into competitive programming, where I've spent real hours wrestling with graph theory, dynamic programming, and the kind of edge cases that make you question your own logic. Every problem solved is a small proof that the thinking actually works.",
    },

    {
      type: "normal",
      text: "At Rajshahi Polytechnic Institute studying Computer Science and Technology, I'm not just moving through a curriculum. I'm building a foundation — algorithms, systems thinking, problem decomposition — the kind of knowledge that holds up when the problems get harder.",
    },

    {
      type: "normal",
      text: "Outside the classroom, I'm on Codeforces and CodeChef grinding rated contests, watching my rating climb, understanding where my thinking breaks. I've also shipped two real products: Takify, a smart shared expense tracker, and ZverT, which transforms YouTube playlists into structured, distraction-free courses.",
    },

    {
      type: "normal",
      text: "I'm not trying to collect frameworks or inflate a resume. I'm building toward being an engineer who can look at a hard problem, understand it at a systems level, and build a solution that holds up at scale. The learning never stops — and that's exactly the point.",
    },
  ],

  quote: {
    text: `"The difference between a good programmer and a great one isn't the language they know — it's the problems they've chosen to sit with."`,
    author: "— My working philosophy",
  },
};

export const ACHIEVEMENTS_DATA = [
  {
    label: "Science Olympiad",
    image: "/images/olympiad.png",
    medal: "2nd Position",
    description:
      "Secured 2nd place at the Science Olympiad 2024, competing across the region.",
  },
  {
    label: "Programming Contest",
    image: "/images/nhspc.jpg",
    medal: "Regionalist (5th)",
    description:
      " Ranked 5th in National High School Programming Contest 2026, demonstrating strong problem solving and algorithmic thinking.",
  },
];

export const CERTIFICATES_DATA = [
  {
    id: "codechef-stacks-queues",
    title: "Stacks and Queues",
    issuer: "CodeChef",
    date: "13th January 2026",
    description:
      "Completed all practice problems of Stacks and Queues — PRO Certificate of Completion",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20 hover:border-orange-500/50",
    image: "/images/code-chef.webp",
    verifyLink: "https://www.codechef.com/certificates/verify",
    certId: "31d14d2",
  },
  {
    id: "national-career-conference",
    title: "National Career Conference 2026",
    issuer: "Youth Skill Development Institute",
    date: "11th March 2026",
    description:
      'Certificate of Participation — Session: "Future of Work in Bangladesh: Skills That Will Dominate 2030"',
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20 hover:border-indigo-500/50",
    image: "/images/ncc.png",
    verifyLink: "#",
    certId: null,
  },
  {
    id: "nhspc-2026",
    title: "National High School Programming Contest 2026",
    issuer: "Bangladesh Computer Council",
    date: "20th April 2026",
    description:
      "Certificate of Achievement — Ranked 5th in the national programming contest among high school students.",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20 hover:border-green-500/50",
    image: "/images/nhspc-certificate.jpeg",
    verifyLink: "#",
    certId: null,
  },
];

export const SKILLS_DATA: { section: Section; categories: SkillCategory[] } = {
  section: {
    id: "skills",
    eyebrow: "02. Toolbox",
    title: {
      normal: "Skills &",
      gradient: "Stack",
    },
  },

  categories: [
    {
      id: "languages",
      title: "Languages",

      icon: Code,
      iconColor: "text-indigo-400",
      iconBg: "bg-indigo-500/20",

      type: "progress",

      items: [
        {
          icon: SiC,
          name: "C",
          level: 85,
          color: "#00599C",
        },

        {
          icon: SiCplusplus,
          name: "C++",
          level: 88,
          color: "#00599C",
        },

        {
          icon: SiPython,
          name: "Python",
          level: 75,
          color: "#3776AB",
        },
      ],
    },

    {
      id: "tools",
      title: "Tools & Env",

      icon: Layers,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-500/20",

      type: "grid",

      items: [
        {
          icon: SiGit,
          name: "Git",
          color: "#F05032",
        },

        {
          icon: SiLinux,
          name: "Linux",
          color: "#FCC624",
        },

        {
          icon: SiVscodium,
          name: "VS Code",
          color: "#007ACC",
        },

        {
          icon: SiGithub,
          name: "GitHub",
          color: "#ffffff",
        },

        {
          icon: Terminal,
          name: "Terminal",
          color: "#22d3ee",
        },
      ],
    },

    {
      id: "cp",
      title: "CP Arsenal",

      icon: Zap,
      iconColor: "text-yellow-400",
      iconBg: "bg-yellow-500/20",

      type: "list",

      items: [
        {
          name: "CP Templates",
          desc: "Custom STL + competitive snippets",
        },

        {
          name: "CF Predictor",
          desc: "Rating prediction tool",
        },

        {
          name: "Codeforces Visualizer",
          desc: "Problem heat-mapping",
        },

        {
          name: "Online Judges",
          desc: "CF, CodeChef, LeetCode",
        },

        {
          name: "GDB Debugger",
          desc: "Step-through debugging",
        },

        {
          name: "Timing Analysis",
          desc: "Complexity benchmarking",
        },
      ],
    },
  ],
};

export const CP_DATA = {
  section: {
    id: "cp",

    eyebrow: "03. Arena",

    title: {
      normal: "Competitive",
      gradient: "Programming",
    },

    description:
      "Rated contestant on Codeforces and CodeChef. Stats are fetched live — updated in real time.",
  },

  platforms: [
    {
      name: "Codeforces",

      icon: SiCodeforces,

      profile: "https://codeforces.com/profile/tauhidrana.exe",

      theme: {
        text: "text-indigo-400",
        border: "hover:border-indigo-500/40",
        bg: "bg-indigo-500/20",
      },

      stats: {
        current: 1181,
        peak: 1181,
        rank: "Newbie",
      },
    },

    {
      name: "CodeChef",

      icon: SiCodechef,

      profile: "https://www.codechef.com/users/tauhid_rana",

      theme: {
        text: "text-orange-400",
        border: "hover:border-orange-500/40",
        bg: "bg-orange-500/20",
      },

      stats: {
        current: 1686,
        peak: 1686,
        stars: "3★",
      },

      gauge: {
        max: 3000,
        color: "#f97316",
      },
    },
  ],

  achievements: [
    {
      icon: Target,
      text: "400+ problems solved across platforms",
      color: "text-green-400",
    },

    {
      icon: Award,
      text: "3-Star Coder on CodeChef",
      color: "text-orange-400",
    },

    {
      icon: Flame,
      text: "Active rated contest participant",
      color: "text-red-400",
    },

    {
      icon: TrendingUp,
      text: "Consistent rating growth",
      color: "text-indigo-400",
    },
  ],

  highlights: [
    {
      value: "Regionalist (5th place)",
      label: "NHSPC 2026",
      className: "gradient-text",
    },

    {
      value: "3★",
      label: "CodeChef Rating",
      className: "text-orange-400",
    },

    {
      value: "966",
      label: "CF Rating",
      className: "text-indigo-300",
    },
  ],
};

export const PROJECTS_DATA = {
  section: {
    id: "projects",

    eyebrow: "04. Build Log",

    title: {
      normal: "Featured",
      gradient: "Projects",
    },

    description:
      "Products I've built from scratch — real problems, real solutions.",
  },

  projects: [
    {
      id: "takify",

      title: "Takify",

      emoji: "💸",

      tagline: "Smart Money Management for Groups",

      description:
        "Takify is a smart expense and money management web app designed for friends and mess members. It helps users track shared expenses, debts, personal budgets, and settlements in one place. With clean reports, charts, and smart tracking, Takify makes managing money simple, transparent, and hassle-free.",

      links: {
        live: "https://takify.lovable.app",
      },

      features: [
        {
          icon: Users,
          text: "Shared expense tracking",
        },

        {
          icon: DollarSign,
          text: "Debt & settlement management",
        },

        {
          icon: Sparkles,
          text: "Clean financial reports & charts",
        },
      ],

      tech: ["React", "Node.js", "PostgreSQL", "Chart.js", "Tailwind CSS"],

      theme: {
        gradFrom: "from-indigo-600/20",
        gradTo: "to-purple-600/5",

        border: "hover:border-indigo-500/40",

        badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/20",

        iconBg: "bg-indigo-500/20",

        iconColor: "text-indigo-400",

        topBar: "from-indigo-500 to-purple-500",
      },
    },

    {
      id: "zvert",

      title: "ZverT",

      emoji: "🎓",

      tagline: "Turn YouTube Playlists into Structured Courses",

      description:
        "ZverT turns any YouTube playlist into a structured, distraction-free course. Just paste a playlist link and get organized modules, locked lessons, progress tracking, streaks, XP, gems, reminders, MCQ quizzes, analytics, and an AI study assistant.",

      links: {
        live: "https://zvert.lovable.app",
      },

      features: [
        {
          icon: BookOpen,
          text: "Structured modules & progress tracking",
        },

        {
          icon: Sparkles,
          text: "AI study assistant + MCQ quizzes",
        },

        {
          icon: Users,
          text: "XP, streaks & gamification",
        },
      ],

      tech: ["Next.js", "TypeScript", "OpenAI API", "Prisma", "Tailwind CSS"],

      theme: {
        gradFrom: "from-cyan-600/20",
        gradTo: "to-blue-600/5",

        border: "hover:border-cyan-500/40",

        badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",

        iconBg: "bg-cyan-500/20",

        iconColor: "text-cyan-400",

        topBar: "from-cyan-500 to-blue-500",
      },
    },
  ],
};

export const EXPERIENCE_DATA = [
  {
    id: "campus-hero",
    role: "Campus Hero",
    org: "Programming Hero",
    type: "Community & Volunteer",
    period: "2026 – Present",
    location: "Rajshahi",
    description:
      "Served as a Campus Hero for Programming Hero, one of Bangladesh's largest online learning platforms. Helped students navigate their programming journey, answered queries, organized local study sessions, and bridged the gap between learners and resources.",
    tags: ["Community", "Mentoring", "EdTech"],
    color: "indigo",
    dot: "bg-indigo-500",
    border: "border-indigo-500/30",
  },
  {
    id: "campus-ambassador",
    role: "Campus Ambassador",
    org: "Shohoj Coding",
    type: "Brand Ambassador",
    period: "2026 – Present",
    location: "Rajshahi",
    description:
      "Represented Shohoj Coding at Rajshahi Polytechnic Institute. Promoted coding culture on campus, organized peer coding sessions, and helped onboard fellow students into competitive programming communities.",
    tags: ["Ambassador", "CP Culture", "Outreach"],
    color: "cyan",
    dot: "bg-cyan-500",
    border: "border-cyan-500/30",
  },
  {
    id: "team-leader",
    role: "Team Leader",
    org: "CP Team — ZeroD",
    type: "Leadership",
    period: "2026 – Present",
    location: "Rajshahi Polytechnic",
    description:
      "Led a competitive programming team at Rajshahi Polytechnic Institute. Coordinated problem-solving sessions, curated practice problem sets, organized internal mock contests, and worked to push team rankings on Codeforces.",
    tags: ["Leadership", "Competitive Programming", "Strategy"],
    color: "purple",
    dot: "bg-purple-500",
    border: "border-purple-500/30",
  },
  {
    id: "startup",
    role: "Co-founder & CEO of ZeroD",
    org: "ZeroD Umb",
    type: "Startup",
    period: "2023 – Present",
    location: "On Site",
    description:
      "Designed and built Takify and ZverT from the ground up — ideation, architecture, development, and deployment. These are real products targeting real problems, built solo as a foundation for future startup work.",
    tags: ["Full Stack", "Product", "Solo Founder"],
    color: "yellow",
    dot: "bg-yellow-500",
    border: "border-yellow-500/30",
  },
];

export const SUMMIT_DATA: SummitData = {
  section: {
    number: "08",
    subtitle: "Real-World Journey",
    title: "Summit",
    titleAccent: "Journey",
    description:
      "Beyond the code — tech summits, AI conferences, and developer meetups I've attended. Documenting my growth in the community, one event at a time.",
  },

  categoryStyles: {
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      dot: "bg-emerald-400",
    },
    indigo: {
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/30",
      text: "text-indigo-400",
      dot: "bg-indigo-400",
    },
    cyan: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      text: "text-cyan-400",
      dot: "bg-cyan-400",
    },
    violet: {
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
      text: "text-violet-400",
      dot: "bg-violet-400",
    },
  },

  stats: [
    {
      icon: Globe,
      label: "Events Attended",
      value: (events) => events.length,
    },
    {
      icon: Camera,
      label: "Memories Captured",
      value: (events) => events.reduce((acc, e) => acc + e.photos.length, 0),
    },
    {
      icon: Tag,
      label: "Event Types",
      value: (events) => new Set(events.map((e) => e.category)).size,
    },
    {
      icon: Users,
      label: "Connections Made",
      value: "∞",
    },
  ],

  events: [
    {
      id: 1,
      title: "AI Summit Rajshahi 2026",
      shortTitle: "AI Summit",
      category: "AI Conference",
      categoryColor: "emerald",
      date: "May 9, 2026",
      location: "Rajshahi, Bangladesh",
      organizer:
        "Rajshahi Tech Community × Bangladesh Tech Entrepreneur Society",
      description:
        "Attended AI Summit Rajshahi 2026 to explore the future of artificial intelligence, connect with developers, learn from industry experts, and experience emerging AI technologies. The summit featured a star-studded panel including Abdur Rakib (COO, Programming Hero), Abrar Sami, and leading AI entrepreneurs from Bangladesh.",
      highlight:
        "Met & networked with Abdur Rakib (COO, Programming Hero) and top AI speakers from Bangladesh.",
      tags: [
        "Artificial Intelligence",
        "Networking",
        "Panel Discussion",
        "Tech Community",
      ],
      featured: true,
      photos: [
        {
          src: "/images/summit1.jpg",
          caption: "At the AI Summit Rajshahi 2026 backdrop",
        },
        {
          src: "/images/summit2.jpg",
          caption: "With Abdur Rakib — COO, Programming Hero",
        },
        { src: "/images/summit3.jpg", caption: "At the summit venue entrance" },
        {
          src: "/images/summit4.jpg",
          caption: "Outside with a speaker, AI Summit banners",
        },
        { src: "/images/summit5.jpg", caption: "Inside the grand summit hall" },
        {
          src: "/images/summit6.jpg",
          caption: "Panel: 'The Next Era of Growth with AI'",
        },
        {
          src: "/images/summit7.jpg",
          caption: "Networking with fellow attendees",
        },
        {
          src: "/images/summit8.jpg",
          caption: "Speaker banners at the venue walkway",
        },
      ],
    },
    // Add more events here ↓
  ],
};
