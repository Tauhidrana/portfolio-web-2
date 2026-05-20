import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Medal, Trophy } from "lucide-react";
import { ACHIEVEMENTS_DATA } from "@/lib/data";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="achievements" className="relative section-padding">
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-yellow-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <span className="text-indigo-400 font-mono text-sm font-medium tracking-widest uppercase">
            06. Awards
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl">
            Recognition earned beyond the screen.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="flex flex-col gap-20 max-w-5xl mx-auto">
          {ACHIEVEMENTS_DATA.map((achieve, index) => (
            <div key={index} className="grid lg:grid-cols-5 gap-8 items-center">
              {/* Photo */}
              <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={1}
                className="lg:col-span-3"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-2xl bg-linear-to-br from-yellow-500 via-orange-500 to-red-500 opacity-40 blur-sm group-hover:opacity-60 transition-opacity duration-300" />
                  <div className="relative rounded-2xl overflow-hidden border border-white/10">
                    <img
                      src={achieve.image}
                      alt={achieve.medal + " - " + achieve.label}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/90 backdrop-blur-sm text-black text-xs font-bold shadow-lg">
                        <Medal size={13} />
                        {achieve.medal}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Info */}
              <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={2}
                className="lg:col-span-2 flex flex-col gap-5"
              >
                <div className="glass rounded-2xl p-6 border border-yellow-500/25">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/15 flex items-center justify-center mb-4">
                    <Trophy size={24} className="text-yellow-400" />
                  </div>

                  <h3 className="text-white font-black text-2xl mb-2">
                    {achieve.label}
                  </h3>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                    <Medal size={13} className="text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-bold">
                      {achieve.medal}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm">{achieve.description}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
