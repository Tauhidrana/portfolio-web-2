import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiC,
  SiCplusplus,
  SiPython,
  SiGit,
  SiLinux,
  SiVscodium,
  SiGithub,
} from "react-icons/si";
import { Terminal, Zap, Code, Layers } from "lucide-react";

const languages = [
  { icon: SiC, name: "C", level: 85, color: "#00599C" },
  { icon: SiCplusplus, name: "C++", level: 88, color: "#00599C" },
  { icon: SiPython, name: "Python", level: 75, color: "#3776AB" },
];

const tools = [
  { icon: SiGit, name: "Git", color: "#F05032" },
  { icon: SiLinux, name: "Linux", color: "#FCC624" },
  { icon: SiVscodium, name: "VS Code", color: "#007ACC" },
  { icon: SiGithub, name: "GitHub", color: "#ffffff" },
  { icon: Terminal, name: "Terminal", color: "#22d3ee" },
];

const cpTools = [
  { name: "CP Templates", desc: "Custom STL + competitive snippets" },
  { name: "CF Predictor", desc: "Rating prediction tool" },
  { name: "Codeforces Visualizer", desc: "Problem heat-mapping" },
  { name: "Online Judges", desc: "CF, CodeChef, LeetCode" },
  { name: "GDB Debugger", desc: "Step-through debugging" },
  { name: "Timing Analysis", desc: "Complexity benchmarking" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" },
  }),
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative section-padding">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <span className="text-indigo-400 font-mono text-sm font-medium tracking-widest uppercase">
            02. Toolbox
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
            Skills & <span className="gradient-text">Stack</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Languages */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={1}
            className="glass rounded-2xl p-7"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                <Code size={18} className="text-indigo-400" />
              </div>
              <h3 className="font-bold text-white text-lg">Languages</h3>
            </div>
            <div className="space-y-6">
              {languages.map((lang, i) => (
                <div
                  key={lang.name}
                  data-testid={`skill-lang-${lang.name.toLowerCase()}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <lang.icon size={18} style={{ color: lang.color }} />
                      <span className="text-gray-300 text-sm font-medium">
                        {lang.name}
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs font-mono">
                      {lang.level}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        inView ? { width: `${lang.level}%` } : { width: 0 }
                      }
                      transition={{
                        delay: 0.3 + i * 0.15,
                        duration: 0.9,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={2}
            className="glass rounded-2xl p-7"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Layers size={18} className="text-cyan-400" />
              </div>
              <h3 className="font-bold text-white text-lg">Tools & Env</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  data-testid={`skill-tool-${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/3 border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-200 group"
                >
                  <tool.icon
                    size={22}
                    style={{ color: tool.color }}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="text-gray-400 text-xs text-center">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CP Tools */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={3}
            className="glass rounded-2xl p-7"
          >
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Zap size={18} className="text-yellow-400" />
              </div>
              <h3 className="font-bold text-white text-lg">CP Arsenal</h3>
            </div>
            <div className="space-y-3">
              {cpTools.map((t) => (
                <div key={t.name} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
