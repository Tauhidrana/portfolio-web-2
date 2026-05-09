import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  ExternalLink,
  ArrowUpRight,
  DollarSign,
  BookOpen,
  Users,
  Sparkles,
} from "lucide-react";

const projects = [
  {
    id: "takify",
    title: "Takify",
    emoji: "💸",
    tagline: "Smart Money Management for Groups",
    description:
      "Takify is a smart expense and money management web app designed for friends and mess members. It helps users track shared expenses, debts, personal budgets, and settlements in one place. With clean reports, charts, and smart tracking, Takify makes managing money simple, transparent, and hassle-free.",
    liveLink: "https://takify.example.com",
    features: [
      { icon: Users, text: "Shared expense tracking" },
      { icon: DollarSign, text: "Debt & settlement management" },
      { icon: Sparkles, text: "Clean financial reports & charts" },
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Chart.js", "Tailwind CSS"],
    color: "indigo",
    gradFrom: "from-indigo-600/20",
    gradTo: "to-purple-600/5",
    border: "hover:border-indigo-500/40",
    badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/20",
    iconBg: "bg-indigo-500/20",
    iconColor: "text-indigo-400",
  },
  {
    id: "zvert",
    title: "ZverT",
    emoji: "🎓",
    tagline: "Turn YouTube Playlists into Structured Courses",
    description:
      "ZverT turns any YouTube playlist into a structured, distraction-free course. Just paste a playlist link and get organized modules, locked lessons, progress tracking, streaks, XP, gems, reminders, MCQ quizzes, analytics, and an AI study assistant. Built for students and skill learners who want a focused learning experience instead of getting lost in YouTube distractions.",
    liveLink: "https://zvert.example.com",
    features: [
      { icon: BookOpen, text: "Structured modules & progress tracking" },
      { icon: Sparkles, text: "AI study assistant + MCQ quizzes" },
      { icon: Users, text: "XP, streaks & gamification" },
    ],
    tech: ["Next.js", "TypeScript", "OpenAI API", "Prisma", "Tailwind CSS"],
    color: "cyan",
    gradFrom: "from-cyan-600/20",
    gradTo: "to-blue-600/5",
    border: "hover:border-cyan-500/40",
    badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.65, ease: "easeOut" },
  }),
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative section-padding">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <span className="text-indigo-400 font-mono text-sm font-medium tracking-widest uppercase">
            04. Build Log
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl">
            Products I've built from scratch — real problems, real solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={i + 1}
              data-testid={`project-${p.id}`}
              className={`relative glass rounded-2xl overflow-hidden group ${p.border} transition-all duration-300 hover:-translate-y-2`}
            >
              {/* Gradient top bar */}
              <div
                className={`h-1 w-full bg-gradient-to-r ${p.gradFrom.replace("/20", "")} ${p.gradTo.replace("/5", "")}`}
              />

              {/* Background glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${p.gradFrom} ${p.gradTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl ${p.iconBg} flex items-center justify-center text-2xl`}
                    >
                      {p.emoji}
                    </div>
                    <div>
                      <h3 className="text-white font-black text-2xl">
                        {p.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{p.tagline}</p>
                    </div>
                  </div>
                  <a
                    href={p.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`project-${p.id}-link`}
                    className={`w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center ${p.iconColor} hover:bg-white/10 transition-all hover:scale-110`}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {p.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {p.features.map((f) => (
                    <div key={f.text} className="flex items-center gap-2.5">
                      <f.icon size={14} className={p.iconColor} />
                      <span className="text-gray-300 text-sm">{f.text}</span>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${p.badge}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={p.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors group/link"
                >
                  <ExternalLink
                    size={14}
                    className="group-hover/link:rotate-12 transition-transform"
                  />
                  View Live Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
