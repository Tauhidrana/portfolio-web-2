import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { EXPERIENCE_DATA } from "@/lib/data";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="relative section-padding">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <span className="text-indigo-400 font-mono text-sm font-medium tracking-widest uppercase">
            05. Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
            <span className="gradient-text">Experience</span> & Timeline
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-linear-to-b from-indigo-500/50 via-white/10 to-transparent" />

          <div className="space-y-8">
            {EXPERIENCE_DATA.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={i + 1}
                data-testid={`experience-${exp.id}`}
                className="relative pl-12 md:pl-16"
              >
                {/* Dot */}
                <div
                  className={`absolute left-0 md:left-2 top-5 w-5 h-5 rounded-full ${exp.dot} border-2 border-[#070711] shadow-lg`}
                />

                <div
                  className={`glass rounded-2xl p-6 border ${exp.border} hover:-translate-y-1 transition-all duration-300 group`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={14} className="text-gray-500" />
                        <span className="text-gray-500 text-xs">
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-xl">
                        {exp.role}
                      </h3>
                      <p className="text-indigo-300 font-medium">{exp.org}</p>
                    </div>
                    <div className="flex flex-col gap-1 text-right shrink-0">
                      <div className="flex items-center gap-1 text-gray-500 text-xs justify-end">
                        <Calendar size={12} />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-xs justify-end">
                        <MapPin size={12} />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/8 text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
