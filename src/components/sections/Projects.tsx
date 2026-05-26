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
      duration: 0.65,
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

  return (
    <section
      id={PROJECTS_DATA.section.id}
      className="relative overflow-hidden section-padding"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            {PROJECTS_DATA.section.eyebrow}
          </span>

          <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
            {PROJECTS_DATA.section.title.normal}{" "}
            <span className="gradient-text">
              {PROJECTS_DATA.section.title.gradient}
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-400">
            {PROJECTS_DATA.section.description}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {PROJECTS_DATA.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={index + 1}
              data-testid={`project-${project.id}`}
              className={`glass group relative overflow-hidden rounded-3xl border border-white/10 transition-all duration-500 hover:-translate-y-3 hover:border-white/20 ${project.theme.border}`}
            >
              {/* Top Gradient Line */}
              <div
                className={`h-1 w-full bg-gradient-to-r ${project.theme.topBar}`}
              />

              {/* Hover Glow */}
              <div
                className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${project.theme.gradFrom} ${project.theme.gradTo}`}
              />

              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-lg ${project.theme.iconBg}`}
                    >
                      {project.emoji}
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-white">
                        {project.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-400">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Live Link */}
                  <a
                    href={
                      project.title === "ZverTs"
                        ? "https://www.zverts.com"
                        : project.links.live
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/10 ${project.theme.iconColor}`}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>

                {/* Description */}
                <p className="mb-7 text-sm leading-relaxed text-gray-300">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-7 space-y-3">
                  {project.features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                      <div
                        key={feature.text}
                        className="flex items-center gap-3"
                      >
                        <Icon
                          size={15}
                          className={project.theme.iconColor}
                        />

                        <span className="text-sm text-gray-300">
                          {feature.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Tech Stack */}
                <div className="mb-7 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${project.theme.badge}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={
                    project.title === "ZverTs"
                      ? "https://www.zverts.com"
                      : project.links.live
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-all hover:text-white"
                >
                  <ExternalLink
                    size={15}
                    className="transition-transform duration-300 group-hover/link:rotate-12"
                  />

                  Visit Live Website
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
