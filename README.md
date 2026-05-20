<div align="center">

# Tauhid Rana — Portfolio v2

**Personal developer portfolio** showcasing competitive programming, projects, skills, and real-world journey.

[![Live Site](https://img.shields.io/badge/Live%20Site-tauhidrana.vercel.app-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://tauhidrana.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-93.8%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animations | Framer Motion |
| Icons | Lucide React + React Icons |
| Runtime | Bun |
| Linting | ESLint (type-aware) |
| Deployment | Vercel |

---

## Sections

| # | Section | Description |
|---|---|---|
| 01 | **Hero** | Introduction and CTA |
| 02 | **Skills & Stack** | Languages, tools, and CP arsenal with progress bars |
| 03 | **About** | Background and bio |
| 04 | **Experience** | Work and internship history |
| 05 | **Projects** | Featured builds with tech tags |
| 06 | **Competitive Programming** | CF rating, contest history, problem stats |
| 07 | **Achievements & Certifications** | Awards and verified credentials |
| 08 | **Summit Journey** | Tech conferences and community events with photo gallery |

---

## Getting Started

**Prerequisites:** [Bun](https://bun.sh) installed.

```bash
# Clone
git clone https://github.com/Tauhidrana/portfolio-web-2.git
cd portfolio-web-2

# Install dependencies
bun install

# Start dev server
bun run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Other Commands

```bash
bun run build      # Production build
bun run preview    # Preview production build locally
bun run lint       # Run ESLint
```

---

## Project Structure

```
src/
├── components/
│   ├── sections/          # One file per portfolio section
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── CompetitiveProgramming.tsx
│   │   ├── Achievements.tsx
│   │   ├── Certifications.tsx
│   │   └── SummitJourney.tsx
│   └── ui/                # shadcn/ui components
├── lib/
│   └── data/              # All section data (single source of truth)
├── index.css              # Global styles + Tailwind v4
└── main.tsx
```

---

## Customization

All content lives in `src/lib/data/`. To update any section — projects, skills, summit events — edit the corresponding data object there. No changes needed in the component files.

To add a new summit event, append to `SUMMIT_DATA.events` in the data file and drop the images in `public/images/`.

---

## Deployment

The site auto-deploys to [Vercel](https://vercel.com) on every push to `main`. No configuration needed — Vite's output is detected automatically.

---

<div align="center">

Built by [Tauhid Rana](https://tauhidrana.vercel.app) · Developed with [ZeroD](https://github.com/Tauhidrana)

</div>
