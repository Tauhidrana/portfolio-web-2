// Skills.tsx
import { SKILLS_DATA } from "@/lib/data";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: (i: number) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: "easeOut",
    },
  }),
};

export default function Skills() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <section id={SKILLS_DATA.section.id} className="relative section-padding">
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-600/5 blur-[130px]" />

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
            {SKILLS_DATA.section.eyebrow}
          </span>

          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
            {SKILLS_DATA.section.title.normal}{" "}
            <span className="gradient-text">
              {SKILLS_DATA.section.title.gradient}
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {SKILLS_DATA.categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={index + 1}
                className="glass rounded-2xl p-7"
              >
                {/* Card Header */}
                <div className="mb-7 flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${category.iconBg}`}
                  >
                    <Icon size={18} className={category.iconColor} />
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Progress */}
                {category.type === "progress" && (
                  <div className="space-y-6">
                    {category.items.map((item, i) => {
                      const ItemIcon = item.icon;

                      return (
                        <div key={item.name}>
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <ItemIcon
                                size={18}
                                style={{ color: item.color }}
                              />

                              <span className="text-sm font-medium text-gray-300">
                                {item.name}
                              </span>
                            </div>

                            <span className="font-mono text-xs text-gray-500">
                              {item.level}%
                            </span>
                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={
                                inView
                                  ? { width: `${item.level}%` }
                                  : { width: 0 }
                              }
                              transition={{
                                delay: 0.3 + i * 0.15,
                                duration: 0.9,
                                ease: "easeOut",
                              }}
                              className="h-full rounded-full bg-linear-to-r from-indigo-500 to-cyan-400"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Grid */}
                {category.type === "grid" && (
                  <div className="grid grid-cols-2 gap-3">
                    {category.items.map((item) => {
                      const ItemIcon = item.icon;

                      return (
                        <div
                          key={item.name}
                          className="group flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/3 p-4 transition-all duration-200 hover:border-indigo-500/30 hover:bg-indigo-500/5"
                        >
                          <ItemIcon
                            size={22}
                            style={{ color: item.color }}
                            className="transition-transform group-hover:scale-110"
                          />

                          <span className="text-center text-xs text-gray-400">
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* List */}
                {category.type === "list" && (
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex items-start gap-3">
                        <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />

                        <div>
                          <p className="text-sm font-medium text-white">
                            {item.name}
                          </p>

                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
