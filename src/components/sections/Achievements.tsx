import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Medal, Trophy } from "lucide-react";

const olympiadImg = "/images/olympiad.png";
const nhspcImg = "/images/NHSPC.png";

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

          {/* ===================== */}
          {/* 1. SCIENCE OLYMPIAD */}
          {/* ===================== */}
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Photo */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={1}
              className="lg:col-span-3"
            >
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 opacity-40 blur-sm group-hover:opacity-60 transition-opacity duration-300" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={olympiadImg}
                    alt="2nd Position - Science Olympiad 2024"
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/90 backdrop-blur-sm text-black text-xs font-bold shadow-lg">
                      <Medal size={13} />
                      2nd Position
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
                  Science Olympiad
                </h3>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                  <Medal size={13} className="text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-bold">
                    2nd Position
                  </span>
                </div>

                <p className="text-gray-400 text-sm">
                  Secured 2nd place at the Science Olympiad 2024, competing
                  across the region.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ===================== */}
          {/* 2. PROGRAMMING CONTEST */}
          {/* ===================== */}
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Photo */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={3}
              className="lg:col-span-3"
            >
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 opacity-40 blur-sm group-hover:opacity-60 transition-opacity duration-300" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={nhspcImg}
                    alt="5th Place - National High School Programming Contest 2026"
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/90 backdrop-blur-sm text-black text-xs font-bold shadow-lg">
                      <Medal size={13} />
                      Regionalist (5th)
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
              custom={4}
              className="lg:col-span-2 flex flex-col gap-5"
            >
              <div className="glass rounded-2xl p-6 border border-indigo-500/25">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/15 flex items-center justify-center mb-4">
                  <Trophy size={24} className="text-indigo-400" />
                </div>

                <h3 className="text-white font-black text-2xl mb-2">
                  Programming Contest
                </h3>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  <Medal size={13} className="text-indigo-400" />
                  <span className="text-indigo-400 text-sm font-bold">
                   Regionalist (5th Place)
                  </span>
                </div>

                <p className="text-gray-400 text-sm">
                  Ranked 5th in National High School Programming Contest 2026,
                  demonstrating strong problem solving and algorithmic thinking.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
