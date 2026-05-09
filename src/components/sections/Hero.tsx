import { motion } from "framer-motion";
import { Mail, Code2, Terminal, ArrowDown } from "lucide-react";
import { SiFacebook, SiInstagram, SiDiscord } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const socials = [
  { icon: FaGithub, href: "https://github.com/Tauhidrana", label: "GitHub" },
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
  { icon: Mail, href: "mailto:tauhidrana00@gmail.com", label: "Email" },
];

const floatingSnippets = [
  { text: "O(n log n)", delay: 0, x: "5%", y: "20%" },
  { text: "solve(n, dp)", delay: 1.5, x: "80%", y: "15%" },
  { text: "#include <bits/stdc++.h>", delay: 0.8, x: "70%", y: "75%" },
  { text: "git push origin main", delay: 2, x: "8%", y: "72%" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px] animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[160px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating code snippets */}
      {floatingSnippets.map((s, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block font-mono text-xs text-indigo-400/30 select-none"
          style={{ left: s.x, top: s.y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            delay: s.delay,
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {s.text}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6"
        >
          <span className="text-white">Kazi </span>
          <span className="gradient-text">Tauhid</span>
          <br />
          <span className="text-white">Rana</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500" />
          <span className="text-gray-300 text-lg md:text-xl font-medium">
            Software Engineer & Competitive Programmer
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I solve problems, build scalable software, and compete in programming
          contests. Currently sharpening algorithms and building products that
          actually matter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#projects"
            data-testid="hero-explore-work"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            <Code2 size={16} />
            Explore My Work
          </a>
          <a
            href="#contact"
            data-testid="hero-get-in-touch"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            <Terminal size={16} />
            Get In Touch
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`social-${s.label.toLowerCase()}`}
              className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-200 hover:-translate-y-1"
              title={s.label}
            >
              <s.icon size={16} />
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs font-medium tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
