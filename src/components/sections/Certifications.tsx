import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";

const codechefCert = "/images/code-chef.webp"
const nccCert = "/images/ncc.png";

const certs = [
  {
    id: "codechef-stacks-queues",
    title: "Stacks and Queues",
    issuer: "CodeChef",
    date: "13th January 2026",
    description:
      "Completed all practice problems of Stacks and Queues — PRO Certificate of Completion",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20 hover:border-orange-500/50",
    image: codechefCert,
    verifyLink: "https://www.codechef.com/certificates/verify",
    certId: "31d14d2",
  },
  {
    id: "national-career-conference",
    title: "National Career Conference 2026",
    issuer: "Youth Skill Development Institute",
    date: "11th March 2026",
    description:
      'Certificate of Participation — Session: "Future of Work in Bangladesh: Skills That Will Dominate 2030"',
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20 hover:border-indigo-500/50",
    image: nccCert,
    verifyLink: "#",
    certId: null,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="certifications" className="relative section-padding">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <span className="text-indigo-400 font-mono text-sm font-medium tracking-widest uppercase">
            07. Credentials
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl">
            Real certificates earned through learning and participation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={i + 1}
              data-testid={`cert-${cert.id}`}
              className={`glass rounded-2xl overflow-hidden border ${cert.border} transition-all duration-300 hover:-translate-y-2 group`}
            >
              {/* Certificate image preview */}
              <div
                className="relative overflow-hidden cursor-zoom-in"
                onClick={() => setLightbox(cert.image)}
                data-testid={`cert-${cert.id}-preview`}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
                    <ZoomIn size={16} />
                    View Certificate
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-white font-bold text-lg leading-snug">
                      {cert.title}
                    </h3>
                    <p className={`${cert.color} text-sm font-semibold mt-0.5`}>
                      {cert.issuer}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${cert.bg} ${cert.color} border ${cert.border} whitespace-nowrap flex-shrink-0`}
                  >
                    {cert.date.split(" ").slice(-1)[0]}
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {cert.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-mono">{cert.date}</span>
                  {cert.certId && (
                    <a
                      href={cert.verifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`cert-${cert.id}-verify`}
                      className={`${cert.color} hover:underline font-medium transition-colors`}
                    >
                      Verify →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          data-testid="cert-lightbox"
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(null)}
            data-testid="cert-lightbox-close"
          >
            <X size={20} />
          </button>
          <img
            src={lightbox}
            alt="Certificate"
            className="max-w-4xl w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
