import { HERO_DATA } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const buttonVariants = {
  primary:
    "group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5",

  secondary:
    "flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5",
} as const;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse-glow rounded-full bg-indigo-600/10 blur-[120px]" />

        <div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse-glow rounded-full bg-cyan-500/8 blur-[120px]"
          style={{ animationDelay: "1.5s" }}
        />

        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900/10 blur-[160px]" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating snippets */}
      {HERO_DATA.floatingSnippets.map((snippet) => (
        <motion.div
          key={snippet.text}
          className="absolute hidden select-none font-mono text-xs text-indigo-400/30 lg:block"
          style={snippet.position}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
          }}
          transition={{
            delay: snippet.delay,
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {snippet.text}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-10">
        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
          {HERO_DATA.availability}
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 text-5xl font-black leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-white">{HERO_DATA.name.first} </span>

          <span className="gradient-text">{HERO_DATA.name.middle}</span>

          <br />

          <span className="text-white">{HERO_DATA.name.last}</span>
        </motion.h1>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-6 flex items-center justify-center gap-3"
        >
          <div className="h-px w-12 bg-linear-to-r from-transparent to-indigo-500" />

          <span className="text-lg font-medium text-gray-300 md:text-xl">
            {HERO_DATA.role}
          </span>

          <div className="h-px w-12 bg-linear-to-l from-transparent to-cyan-400" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg"
        >
          {HERO_DATA.description}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {HERO_DATA.cta.map((button) => {
            const Icon = button.icon;

            return (
              <a
                key={button.label}
                href={button.href}
                data-testid={button.testId}
                className={buttonVariants[button.variant]}
              >
                <Icon size={16} />
                {button.label}
              </a>
            );
          })}
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16 flex items-center justify-center gap-4"
        >
          {HERO_DATA.socials.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`social-${social.label.toLowerCase()}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white"
                title={social.label}
              >
                <Icon size={16} />
              </a>
            );
          })}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs font-medium uppercase tracking-widest">
            Scroll
          </span>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
