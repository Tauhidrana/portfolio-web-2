import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { MapPin, GraduationCap } from "lucide-react";
import { ABOUT_DATA } from "@/lib/data";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

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

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <section id={ABOUT_DATA.section.id} className="relative section-padding">
      {/* Background glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-indigo-600/5 blur-[150px]" />

      <div ref={ref} className="mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <span className="font-mono text-sm font-medium uppercase tracking-widest text-indigo-400">
            {ABOUT_DATA.section.eyebrow}
          </span>

          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
            {ABOUT_DATA.section.title.normal}{" "}
            <span className="gradient-text">
              {ABOUT_DATA.section.title.gradient}
            </span>
          </h2>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left column */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={1}
            className="flex flex-col items-center gap-6 lg:col-span-2 lg:items-start"
          >
            {/* Profile card */}
            <div className="relative w-64 max-w-xs lg:w-full">
              {/* Glow border */}
              <div className="absolute -inset-1 rounded-2xl bg-linear-to-br from-indigo-500 via-purple-500 to-cyan-400 opacity-70 blur-sm" />

              {/* Image wrapper */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={ABOUT_DATA.profile.image}
                  alt={ABOUT_DATA.profile.name}
                  data-testid="about-profile-photo"
                  className="aspect-3/4 w-full object-cover object-top"
                />

                {/* Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#070711]/80 to-transparent" />

                {/* Identity */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-bold text-white">
                    {ABOUT_DATA.profile.name}
                  </p>

                  <p className="font-mono text-xs text-indigo-300">
                    {ABOUT_DATA.profile.role}
                  </p>
                </div>
              </div>

              {/* Availability badge */}
              <div className="absolute -right-3 -top-3 flex items-center gap-1.5 rounded-full border border-green-500/30 bg-[#0d0d1f] px-3 py-1.5 shadow-lg shadow-black/50">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                <span className="text-xs font-medium text-green-400">
                  {ABOUT_DATA.profile.availability}
                </span>
              </div>

              {/* Rating badge */}
              <div className="absolute -bottom-3 -left-3 flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-[#0d0d1f] px-3 py-2 shadow-lg shadow-black/50">
                <span className="font-mono text-xs font-bold text-indigo-400">
                  {ABOUT_DATA.profile.competitiveProgramming.platform}
                </span>

                <span className="text-xs text-white">
                  {ABOUT_DATA.profile.competitiveProgramming.rating}
                </span>
              </div>
            </div>

            {/* Education */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={2}
              className="glass w-full max-w-xs rounded-xl p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <GraduationCap size={15} className="text-indigo-400" />

                <p className="font-mono text-xs uppercase tracking-wide text-gray-500">
                  Education
                </p>
              </div>

              <p className="text-sm font-semibold text-white">
                {ABOUT_DATA.education.institution}
              </p>

              <p className="mt-0.5 text-xs text-indigo-400">
                {ABOUT_DATA.education.field}
              </p>

              <div className="mt-2 flex items-center gap-1">
                <MapPin size={11} className="text-gray-500" />

                <p className="text-xs text-gray-500">
                  {ABOUT_DATA.education.location} ·{" "}
                  {ABOUT_DATA.education.duration}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column */}
          <div className="space-y-5 lg:col-span-3">
            {/* Paragraphs */}
            {ABOUT_DATA.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={i + 3}
                className={`leading-relaxed ${
                  paragraph.type === "highlight"
                    ? "text-xl font-medium text-white"
                    : "text-base text-gray-400"
                }`}
              >
                {paragraph.text}
              </motion.p>
            ))}

            {/* Stats */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={9}
              className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4"
            >
              {ABOUT_DATA.stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    data-testid={`stat-${stat.label
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="glass rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30"
                  >
                    <Icon size={22} className={`mx-auto mb-2 ${stat.color}`} />

                    <p className="text-2xl font-black text-white">
                      {stat.value}
                    </p>

                    <p className="mt-0.5 text-xs leading-snug text-gray-500">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* Quote */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={10}
              className="glass rounded-2xl border-l-2 border-indigo-500 p-5"
            >
              <p className="text-sm italic leading-relaxed text-gray-300">
                {ABOUT_DATA.quote.text}
              </p>

              <p className="mt-3 font-mono text-xs text-indigo-400">
                {ABOUT_DATA.quote.author}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
