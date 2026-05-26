// Projects.tsx

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";

import { PROJECTS_DATA } from "@/lib/data";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: (i: number) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

export default function Projects() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  // Only show ZverTs project
  const zvertsProject = PROJECTS_DATA.projects.find(
    (project) => project.title === "ZverTs" || project.title === "ZverT"
  );

  if (!zvertsProject) return null;

  return (
    <section
      id={PROJECTS_DATA.section.id}
      className="relative overflow-hidden section-padding"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />

      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="mb-16 text-center"
        >
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            {PROJECTS_DATA.section.eyebrow}
          </span>

          <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">
            {PROJECTS_DATA.section.title.normal}{" "}
            <span className="gradient-text">
              {PROJECTS_DATA.section.title.gradient}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-400">
            {PROJECTS_DATA.section.description}
          </p>
        </motion.div>

        {/* Single Project Card */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={1}
          className={`glass group relative overflow-hidden rounded-3xl border border-white/10 transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/30 ${zvertsProject.theme.border}`}
        >
          {/* Top Gradient */}
          <div
            className={`h-1 w-full bg-gradient-to-r ${zvertsProject.theme.topBar}`}
          />

          {/* Hover Glow */}
          <div
            className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${zvertsProject.theme.gradFrom} ${zvertsProject.theme.gradTo}`}
          />

          <div className="relative z-10 p-10 md:p-12">
            {/* Header */}
            <div className="mb-8 flex items-start justify-between gap-5">
              <div className="flex items-center gap-5">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl text-4xl shadow-xl ${zvertsProject.theme.iconBg}`}
                >
                  {zvertsProject.emoji}
                </div>

                <div>
                  <h3 className="text-3xl font-black text-white md:text-4xl">
                    ZverTs
                  </h3>

                  <p className="mt-2 text-base text-gray-400">
                    {zvertsProject.tagline}
                  </p>
                </div>
              </div>

              {/* Live Link Button */}
              <a
                href="https://www.zverts.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/10 ${zvertsProject.theme.iconColor}`}
              >
                <ArrowUpRight size={20} />
              </a>
            </div>

            {/* Description */}
            <p className="mb-8 max-w-4xl text-base leading-relaxed text-gray-300 md:text-lg">
              {zvertsProject.description}
            </p>

            {/* Features */}
            <div className="mb-8 grid gap-4 md:grid-cols-2">
              {zvertsProject.features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.text}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4"
                  >
                    <Icon
                      size={18}
                      className={zvertsProject.theme.iconColor}
                    />

                    <span className="text-sm text-gray-300 md:text-base">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Tech Stack */}
            <div className="mb-10 flex flex-wrap gap-3">
              {zvertsProject.tech.map((tech) => (
                <span
                  key={tech}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur-sm ${zvertsProject.theme.badge}`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://www.zverts.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-3 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:bg-cyan-400/20 hover:text-white"
            >
              <ExternalLink
                size={18}
                className="transition-transform duration-300 group-hover/link:rotate-12"
              />

              Visit ZverTs Live Website
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
