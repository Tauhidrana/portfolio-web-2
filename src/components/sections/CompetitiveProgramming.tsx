import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ExternalLink, TrendingUp, Award, Flame, Target } from "lucide-react";
import { SiCodeforces, SiCodechef } from "react-icons/si";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

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
      } else setDisplay(Math.floor(start));
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
  const data = [{ value: pct, fill: color }];
  return (
    <div className="w-28 h-28">
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
            background={{ fill: "rgba(255,255,255,0.05)" }}
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function CompetitiveProgramming() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const cfRating = 1068;
  const cfMax = 1146;
  const cfRank = "Newbie";
  const ccRating = 1622;
  const ccMax = 1622;
  const ccStars = "3★";

  const achievements = [
    {
      icon: Target,
      text: "200+ problems solved across platforms",
      color: "text-green-400",
    },
    { icon: Award, text: "3-Star Coder on CodeChef", color: "text-orange-400" },
    {
      icon: Flame,
      text: "Active rated contest participant",
      color: "text-red-400",
    },
    {
      icon: TrendingUp,
      text: "Consistent rating growth",
      color: "text-indigo-400",
    },
  ];

  return (
    <section id="cp" className="relative section-padding">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <span className="text-indigo-400 font-mono text-sm font-medium tracking-widest uppercase">
            03. Arena
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
            Competitive <span className="gradient-text">Programming</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl">
            Rated contestant on Codeforces and CodeChef. Stats are fetched live
            — updated in real time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* Codeforces Card */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={1}
            className="glass rounded-2xl p-8 hover:border-indigo-500/40 transition-all duration-300 group hover:-translate-y-1"
            data-testid="cp-codeforces-card"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <SiCodeforces size={22} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Codeforces</h3>
                  <a
                    href="https://codeforces.com/profile/tauhidrana00"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 text-sm hover:text-indigo-300 flex items-center gap-1 transition-colors"
                    data-testid="cf-profile-link"
                  >
                    View Profile <ExternalLink size={12} />
                  </a>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-400 text-xs font-medium capitalize">
                  {cfRank}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="glass rounded-xl p-4">
                  <p className="text-gray-500 text-xs mb-1">Current</p>
                  <p className="text-white font-black text-2xl">
                    {<AnimatedNumber value={cfRating} />}
                  </p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-gray-500 text-xs mb-1">Peak</p>
                  <p className="text-indigo-300 font-black text-2xl">
                    {<AnimatedNumber value={cfMax} />}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CodeChef Card */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={2}
            className="glass rounded-2xl p-8 hover:border-orange-500/40 transition-all duration-300 group hover:-translate-y-1"
            data-testid="cp-codechef-card"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <SiCodechef size={22} className="text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">CodeChef</h3>
                  <a
                    href="https://www.codechef.com/users/tauhidrana00"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 text-sm hover:text-orange-300 flex items-center gap-1 transition-colors"
                    data-testid="cc-profile-link"
                  >
                    View Profile <ExternalLink size={12} />
                  </a>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-bold">
                  {ccStars}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <RatingGauge rating={ccRating} max={3000} color="#f97316" />

              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="glass rounded-xl p-4">
                  <p className="text-gray-500 text-xs mb-1">Current</p>
                  <p className="text-white font-black text-2xl">
                    {<AnimatedNumber value={ccRating} />}
                  </p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-gray-500 text-xs mb-1">Highest</p>
                  <p className="text-orange-300 font-black text-2xl">
                    {<AnimatedNumber value={ccMax} />}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={3}
          className="glass rounded-2xl p-8"
        >
          <h3 className="text-white font-bold text-lg mb-6">Highlights</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((a, i) => (
              <motion.div
                key={i}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={i + 4}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-all"
                data-testid={`cp-achievement-${i}`}
              >
                <a.icon
                  size={18}
                  className={`${a.color} flex-shrink-0 mt-0.5`}
                />
                <p className="text-gray-300 text-sm leading-relaxed">
                  {a.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Problems counter */}
          <div className="mt-6 flex items-center justify-center gap-[5rem] p-5 rounded-xl bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20">
            <div className="text-center">
              <p className="text-5xl font-black gradient-text">200+</p>
              <p className="text-gray-400 text-sm mt-1">Problems Solved</p>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-5xl font-black text-orange-400">3★</p>
              <p className="text-gray-400 text-sm mt-1">CodeChef Rating</p>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-5xl font-black text-indigo-300">{cfRating}</p>
              <p className="text-gray-400 text-sm mt-1">CF Rating</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
