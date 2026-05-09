import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import {
  BookOpen,
  Trophy,
  Cpu,
  TrendingUp,
  MapPin,
  GraduationCap,
} from "lucide-react";

const stats = [
  {
    icon: Trophy,
    label: "Problems Solved",
    value: "200+",
    color: "text-yellow-400",
  },
  { icon: Cpu, label: "Projects Built", value: "2+", color: "text-indigo-400" },
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
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      type: "spring",
      stiffness: 80,
    },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative section-padding">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <span className="text-indigo-400 font-mono text-sm font-medium tracking-widest uppercase">
            01. Who Am I
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Photo column */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={1}
            className="lg:col-span-2 flex flex-col items-center lg:items-start gap-6"
          >
            {/* Photo frame */}
            <div className="relative w-64 lg:w-full max-w-xs">
              {/* Outer glow ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 opacity-70 blur-sm" />
              {/* Image wrapper */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="/images/hero-image.JPG"
                  alt="Kazi Tauhid Rana"
                  className="w-full object-cover object-top aspect-[3/4]"
                  data-testid="about-profile-photo"
                />
                {/* Subtle overlay gradient at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#070711]/80 to-transparent" />
                {/* Name badge at bottom */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm">
                    Kazi Tauhid Rana
                  </p>
                  <p className="text-indigo-300 text-xs font-mono">
                    Software Engineer & CP
                  </p>
                </div>
              </div>

              {/* Floating badge: Available */}
              <div className="absolute -top-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d0d1f] border border-green-500/30 shadow-lg shadow-black/50">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-medium">
                  Available
                </span>
              </div>

              {/* Floating badge: CP */}
              <div className="absolute -bottom-3 -left-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0d0d1f] border border-indigo-500/30 shadow-lg shadow-black/50">
                <span className="text-indigo-400 font-mono text-xs font-bold">
                  CF
                </span>
                <span className="text-white text-xs">1068 rated</span>
              </div>
            </div>

            {/* Education card */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={2}
              className="glass rounded-xl p-4 w-full max-w-xs"
            >
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap size={15} className="text-indigo-400" />
                <p className="text-xs text-gray-500 font-mono uppercase tracking-wide">
                  Education
                </p>
              </div>
              <p className="text-white font-semibold text-sm">
                Rajshahi Polytechnic Institute
              </p>
              <p className="text-indigo-400 text-xs mt-0.5">
                Computer Science & Technology
              </p>
              <div className="flex items-center gap-1 mt-2">
                <MapPin size={11} className="text-gray-500" />
                <p className="text-gray-500 text-xs">
                  Rajshahi, Bangladesh · 2025–2026
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Story + stats column */}
          <div className="lg:col-span-3 space-y-5">
            {[
              "Some programmers write code to build things. I write code to solve things — then build them.",
              "It started with a simple question: why does a loop behave the way it does? That curiosity dragged me into competitive programming, where I've spent real hours wrestling with graph theory, dynamic programming, and the kind of edge cases that make you question your own logic. Every problem solved is a small proof that the thinking actually works.",
              "At Rajshahi Polytechnic Institute studying Computer Science and Technology, I'm not just moving through a curriculum. I'm building a foundation — algorithms, systems thinking, problem decomposition — the kind of knowledge that holds up when the problems get harder.",
              "Outside the classroom, I'm on Codeforces and CodeChef grinding rated contests, watching my rating climb, understanding where my thinking breaks. I've also shipped two real products: Takify, a smart shared expense tracker, and ZverT, which transforms YouTube playlists into structured, distraction-free courses.",
              "I'm not trying to collect frameworks or inflate a resume. I'm building toward being an engineer who can look at a hard problem, understand it at a systems level, and build a solution that holds up at scale. The learning never stops — and that's exactly the point.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={i + 3}
                className={`leading-relaxed ${i === 0 ? "text-xl font-medium text-white" : "text-base text-gray-400"}`}
              >
                {text}
              </motion.p>
            ))}

            {/* Stats grid */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={9}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-xl p-4 text-center hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
                  data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <s.icon className={`${s.color} mx-auto mb-2`} size={22} />
                  <p className="text-2xl font-black text-white">{s.value}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Quote */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={10}
              className="glass rounded-2xl p-5 border-l-2 border-indigo-500"
            >
              <p className="text-gray-300 italic text-sm leading-relaxed">
                "The difference between a good programmer and a great one isn't
                the language they know — it's the problems they've chosen to sit
                with."
              </p>
              <p className="text-indigo-400 font-mono text-xs mt-3">
                — Tauhid's working philosophy
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
