// Projects.tsx

import { motion, useInView, type Variants } from "framer-motion";

import { useRef } from "react";

import {
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
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
    <section id={PROJECTS_DATA.section.id} className="relative section-padding">
      {/* Background Glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-600/5 blur-[150px]" />

      <div ref={ref} className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <span className="font-mono text-sm font-medium uppercase tracking-widest text-indigo-400">
            {PROJECTS_DATA.section.eyebrow}
          </span>

          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
            {PROJECTS_DATA.section.title.normal}{" "}
            <span className="gradient-text">
              {PROJECTS_DATA.section.title.gradient}
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-gray-400">
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
              className={`glass group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 ${project.theme.border}`}
            >
              {/* Top Gradient Bar */}
              <div
                className={`h-1 w-full bg-linear-to-r ${project.theme.topBar}`}
              />

              {/* Hover Glow */}
              <div
                className={`pointer-events-none absolute inset-0 bg-linear-to-br ${project.theme.gradFrom} ${project.theme.gradTo} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="relative p-8">
                {/* Header */}
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${project.theme.iconBg}`}
                    >
                      {project.emoji}
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-white">
                        {project.title}
                      </h3>

                      <p className="text-sm text-gray-400">{project.tagline}</p>
                    </div>
                  </div>

                  {/* External Link */}
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:scale-110 hover:bg-white/10 ${project.theme.iconColor}`}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>

                {/* Description */}
                <p className="mb-6 text-sm leading-relaxed text-gray-400">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-6 space-y-2">
                  {project.features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                      <div
                        key={feature.text}
                        className="flex items-center gap-2.5"
                      >
                        <Icon size={14} className={project.theme.iconColor} />

                        <span className="text-sm text-gray-300">
                          {feature.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Tech Stack */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${project.theme.badge}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
                >
                  <ExternalLink
                    size={14}
                    className="transition-transform group-hover/link:rotate-12"
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
