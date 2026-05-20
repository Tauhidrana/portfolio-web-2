// CompetitiveProgramming.tsx

import { motion, useInView, type Variants } from "framer-motion";

import { useRef, useEffect, useState } from "react";

import { ExternalLink } from "lucide-react";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";
import { CP_DATA } from "@/lib/data";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: (i: number) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

function AnimatedNumber({
  value,
  duration = 1500,
}: {
  value: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;

    const step = value / (duration / 16);

    const timer = setInterval(() => {
      start += step;

      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{display}</span>;
}

function RatingGauge({
  rating,
  max,
  color,
}: {
  rating: number;
  max: number;
  color: string;
}) {
  const pct = Math.min((rating / max) * 100, 100);

  const data = [
    {
      value: pct,
      fill: color,
    },
  ];

  return (
    <div className="h-28 w-28">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
          data={data}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

          <RadialBar
            background={{
              fill: "rgba(255,255,255,0.05)",
            }}
            dataKey="value"
            cornerRadius={10}
          />

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="18"
            fontWeight="700"
          >
            {rating}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function CompetitiveProgramming() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <section id={CP_DATA.section.id} className="relative section-padding">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/5 blur-[150px]" />

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
            {CP_DATA.section.eyebrow}
          </span>

          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
            {CP_DATA.section.title.normal}{" "}
            <span className="gradient-text">
              {CP_DATA.section.title.gradient}
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-gray-400">
            {CP_DATA.section.description}
          </p>
        </motion.div>

        {/* Platform Cards */}
        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          {CP_DATA.platforms.map((platform, index) => {
            const Icon = platform.icon;

            return (
              <motion.div
                key={platform.name}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={index + 1}
                className={`glass group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${platform.theme.border}`}
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${platform.theme.bg}`}
                    >
                      <Icon size={22} className={platform.theme.text} />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {platform.name}
                      </h3>

                      <a
                        href={platform.profile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 text-sm transition-colors hover:opacity-80 ${platform.theme.text}`}
                      >
                        View Profile <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  <div>
                    {"rank" in platform.stats && (
                      <div className="rounded-full border border-gray-500/20 bg-gray-500/10 px-3 py-1 text-xs font-medium capitalize text-gray-400">
                        {platform.stats.rank}
                      </div>
                    )}

                    {"stars" in platform.stats && (
                      <div className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-sm font-bold text-orange-400">
                        {platform.stats.stars}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  {platform.gauge && (
                    <RatingGauge
                      rating={platform.stats.current}
                      max={platform.gauge.max}
                      color={platform.gauge.color}
                    />
                  )}

                  <div className="flex-1 grid-cols-2 gap-4 sm:grid">
                    <div className="glass rounded-xl p-4">
                      <p className="mb-1 text-xs text-gray-500">Current</p>

                      <p className="text-2xl font-black text-white">
                        <AnimatedNumber value={platform.stats.current} />
                      </p>
                    </div>

                    <div className="glass rounded-xl p-4">
                      <p className="mb-1 text-xs text-gray-500">Peak</p>

                      <p className="text-2xl font-black text-indigo-300">
                        <AnimatedNumber value={platform.stats.peak} />
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Achievements */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={3}
          className="glass rounded-2xl p-8"
        >
          <h3 className="mb-6 text-lg font-bold text-white">Highlights</h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CP_DATA.achievements.map((achievement, i) => {
              const Icon = achievement.icon;

              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={fadeUp}
                  custom={i + 4}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/3 p-4 transition-all hover:border-white/10"
                >
                  <Icon
                    size={18}
                    className={`${achievement.color} mt-0.5 shrink-0`}
                  />

                  <p className="text-sm leading-relaxed text-gray-300">
                    {achievement.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Highlights */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 rounded-xl border border-indigo-500/20 bg-linear-to-r from-indigo-500/10 to-cyan-500/10 p-5">
            {CP_DATA.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-8">
                <div className="text-center">
                  <p
                    className={`text-4xl font-black md:text-5xl ${highlight.className}`}
                  >
                    {highlight.value}
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    {highlight.label}
                  </p>
                </div>

                {index !== CP_DATA.highlights.length - 1 && (
                  <div className="hidden h-12 w-px bg-white/10 md:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
