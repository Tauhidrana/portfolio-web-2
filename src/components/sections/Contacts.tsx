import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { SiFacebook, SiInstagram, SiDiscord, SiCodeforces, SiCodechef } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const socials = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/Tauhidrana", color: "hover:border-gray-400/40 hover:bg-gray-400/5 hover:text-gray-300" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com/in/tauhidrana00", color: "hover:border-blue-400/40 hover:bg-blue-400/5 hover:text-blue-400" },
  { icon: SiFacebook, label: "Facebook", href: "https://facebook.com/kazitauhidrana", color: "hover:border-blue-500/40 hover:bg-blue-500/5 hover:text-blue-500" },
  { icon: SiInstagram, label: "Instagram", href: "https://instagram.com/tauhidrana.exe", color: "hover:border-pink-400/40 hover:bg-pink-400/5 hover:text-pink-400" },
  { icon: SiDiscord, label: "Discord", href: "https://discord.com/shop/kazitauhidrana", color: "hover:border-indigo-400/40 hover:bg-indigo-400/5 hover:text-indigo-400" },
  { icon: SiCodeforces, label: "Codeforces", href: "https://codeforces.com/profile/tauhidrana.exe", color: "hover:border-indigo-300/40 hover:bg-indigo-300/5 hover:text-indigo-300" },
  { icon: SiCodechef, label: "CodeChef", href: "https://codechef.com/users/tauhidrana", color: "hover:border-orange-400/40 hover:bg-orange-400/5 hover:text-orange-400" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative section-padding">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/8 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} custom={0} className="mb-6">
          <span className="text-indigo-400 font-mono text-sm font-medium tracking-widest uppercase">09. Let's Talk</span>
        </motion.div>

        <motion.h2
          initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} custom={1}
          className="text-4xl md:text-6xl font-black mb-6"
        >
          Got a <span className="gradient-text">problem</span> worth<br />
          <span className="text-white">solving?</span>
        </motion.h2>

        <motion.p
          initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} custom={2}
          className="text-gray-400 text-lg max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Whether it's a collaboration, an opportunity, or just wanting to talk algorithms — I'm in. Drop a message and let's build something.
        </motion.p>

        {/* Email CTA */}
        <motion.a
          initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} custom={3}
          href="mailto:tauhidrana00@gmail.com"
          data-testid="contact-email"
          className="inline-flex items-center gap-3 px-8 py-4 mb-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-lg transition-all duration-300 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-1 group"
        >
          <Mail size={20} />
          tauhidrana00@gmail.com
          <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.a>

        {/* Social links */}
        <motion.div
          initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} custom={4}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`contact-social-${s.label.toLowerCase()}`}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/8 bg-white/4 text-gray-400 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${s.color}`}
            >
              <s.icon size={15} />
              {s.label}
            </a>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} custom={5}
          className="border-t border-white/5 pt-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <img src={"/images/logo.png"} alt="Tauhid Logo" className="h-7 w-auto object-contain" />
              <span>Kazi Tauhid Rana</span>
            </div>
            <p>Built with React, Tailwind & Framer Motion · 2025</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Open to opportunities</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
