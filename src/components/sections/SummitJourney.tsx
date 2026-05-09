import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Tag,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Camera,
  Globe,
  Sparkles,
} from "lucide-react";

const  aiSummit1 = "/images/summit1.jpg";
const aiSummit2 = "/images/summit2.jpg";
const aiSummit3 = "/images/summit3.jpg";
const aiSummit4 = "/images/summit4.jpg";
const aiSummit5 = "/images/summit5.jpg";
const aiSummit6 = "/images/summit6.jpg";
const aiSummit7 = "/images/summit7.jpg";
const aiSummit8 = "/images/summit8.jpg";

// ─── DATA ────────────────────────────────────────────────────────────────────
// To add a new event, copy one object from this array and fill in your details.
// Add new photo imports above and include them in the photos array.

// eslint-disable-next-line react-refresh/only-export-components
export const events = [
  {
    id: 1,
    title: "AI Summit Rajshahi 2026",
    shortTitle: "AI Summit",
    category: "AI Conference",
    categoryColor: "emerald",
    date: "May 9, 2026",
    location: "Rajshahi, Bangladesh",
    organizer: "Rajshahi Tech Community × Bangladesh Tech Entrepreneur Society",
    description:
      "Attended AI Summit Rajshahi 2026 to explore the future of artificial intelligence, connect with developers, learn from industry experts, and experience emerging AI technologies. The summit featured a star-studded panel including Abdur Rakib (COO, Programming Hero), Abrar Sami, and leading AI entrepreneurs from Bangladesh.",
    highlight:
      "Met & networked with Abdur Rakib (COO, Programming Hero) and top AI speakers from Bangladesh.",
    tags: [
      "Artificial Intelligence",
      "Networking",
      "Panel Discussion",
      "Tech Community",
    ],
    photos: [
      { src: aiSummit1, caption: "At the AI Summit Rajshahi 2026 backdrop" },
      { src: aiSummit2, caption: "With Abdur Rakib — COO, Programming Hero" },
      { src: aiSummit3, caption: "At the summit venue entrance" },
      { src: aiSummit4, caption: "Outside with a speaker, AI Summit banners" },
      { src: aiSummit5, caption: "Inside the grand summit hall" },
      { src: aiSummit6, caption: "Panel: 'The Next Era of Growth with AI'" },
      { src: aiSummit7, caption: "Networking with fellow attendees" },
      { src: aiSummit8, caption: "Speaker banners at the venue walkway" },
    ],
    featured: true,
  },
  // Add more events here ↓
];

// ─── CATEGORY STYLES ──────────────────────────────────────────────────────────
const categoryStyles: Record<
  string,
  { bg: string; border: string; text: string; dot: string }
> = {
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  indigo: {
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    text: "text-indigo-400",
    dot: "bg-indigo-400",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    dot: "bg-cyan-400",
  },
  violet: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-400",
    dot: "bg-violet-400",
  },
};

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: { src: string; caption: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative max-w-5xl w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photos[index].src}
            alt={photos[index].caption}
            className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
          />
          <div className="mt-3 text-center text-gray-300 text-sm font-medium">
            {photos[index].caption}
            <span className="ml-3 text-gray-500 font-mono text-xs">
              {index + 1} / {photos.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 text-gray-400 hover:text-white transition-colors"
            data-testid="lightbox-close"
          >
            <X size={24} />
          </button>
          <button
            onClick={onPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/10 text-white hover:bg-white/10 transition-all"
            data-testid="lightbox-prev"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={onNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/10 text-white hover:bg-white/10 transition-all"
            data-testid="lightbox-next"
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── EVENT CARD ───────────────────────────────────────────────────────────────
function EventCard({
  event,
  index,
}: {
  event: (typeof events)[0];
  index: number;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const style = categoryStyles[event.categoryColor] ?? categoryStyles.indigo;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((p) =>
      p !== null ? (p - 1 + event.photos.length) % event.photos.length : 0,
    );
  const nextPhoto = () =>
    setLightboxIndex((p) => (p !== null ? (p + 1) % event.photos.length : 0));

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
        className="relative"
      >
        {/* Timeline connector */}
        <div className="hidden md:flex absolute -left-[3.25rem] top-0 flex-col items-center h-full">
          <div
            className={`w-4 h-4 rounded-full ${style.dot} shadow-lg ring-4 ring-black mt-1.5 z-10 flex-shrink-0`}
          />
          <div className="flex-1 w-px bg-gradient-to-b from-white/15 to-transparent mt-2" />
        </div>

        {/* Main card */}
        <div className="glass rounded-2xl border border-white/8 hover:border-white/15 transition-all duration-500 overflow-hidden group">
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 ${style.bg} ${style.border} ${style.text} border`}
                >
                  <Tag size={11} />
                  {event.category}
                </div>
                <h3 className="text-white font-black text-2xl md:text-3xl leading-tight">
                  {event.title}
                </h3>
              </div>
              {event.featured && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold flex-shrink-0">
                  <Sparkles size={12} />
                  Featured Memory
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-indigo-400 flex-shrink-0" />
                {event.date}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-indigo-400 flex-shrink-0" />
                {event.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe size={14} className="text-indigo-400 flex-shrink-0" />
                {event.organizer}
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed text-sm">
              {event.description}
            </p>

            {/* Highlight */}
            <div
              className={`mt-4 p-3 rounded-xl ${style.bg} border ${style.border} flex items-start gap-2`}
            >
              <Sparkles
                size={14}
                className={`${style.text} flex-shrink-0 mt-0.5`}
              />
              <p
                className={`${style.text} text-sm font-medium leading-relaxed`}
              >
                {event.highlight}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-gray-400 text-xs hover:text-white hover:border-white/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Photo count badge */}
          <div className="px-6 pb-3 flex items-center gap-2">
            <Camera size={13} className="text-gray-500" />
            <span className="text-gray-500 text-xs font-mono">
              {event.photos.length} photos from this event
            </span>
          </div>

          {/* Photo Gallery Grid */}
          <div className="px-4 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {event.photos.map((photo, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openLightbox(i)}
                  className={`relative overflow-hidden rounded-xl border border-white/8 hover:border-white/25 transition-all duration-300 group/photo ${
                    i === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                  data-testid={`summit-photo-${event.id}-${i}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className={`w-full object-cover group-hover/photo:scale-110 transition-transform duration-500 ${
                      i === 0 ? "h-64" : "h-28"
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <Camera
                      size={18}
                      className="text-white opacity-0 group-hover/photo:opacity-100 transition-opacity duration-200"
                    />
                  </div>
                  {i === 0 && (
                    <div className="absolute bottom-2 left-2">
                      <div
                        className={`px-2 py-0.5 rounded-lg text-xs font-bold ${style.bg} ${style.text} border ${style.border} backdrop-blur-sm`}
                      >
                        Cover Photo
                      </div>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
            <p className="text-center text-gray-600 text-xs mt-2 font-mono">
              Click any photo to view full size
            </p>
          </div>
        </div>
      </motion.div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={event.photos}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </>
  );
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────
const totalPhotos = events.reduce((acc, e) => acc + e.photos.length, 0);
const allCategories = [...new Set(events.map((e) => e.category))].length;

const stats = [
  { icon: Globe, label: "Events Attended", value: events.length },
  { icon: Camera, label: "Memories Captured", value: totalPhotos },
  { icon: Tag, label: "Event Types", value: allCategories },
  { icon: Users, label: "Connections Made", value: "∞" },
];

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export default function SummitJourney() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="summit" className="relative section-padding">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-indigo-400 font-mono text-sm font-medium tracking-widest uppercase">
            08. Real-World Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 text-white">
            Summit <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl leading-relaxed">
            Beyond the code — tech summits, AI conferences, and developer
            meetups I've attended. Documenting my growth in the community, one
            event at a time.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass rounded-2xl p-4 border border-white/8 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <s.icon size={18} className="text-indigo-400" />
              </div>
              <div>
                <div className="text-white font-black text-xl">{s.value}</div>
                <div className="text-gray-500 text-xs">{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Events Timeline */}
        <div className="md:pl-16 space-y-10">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 text-sm font-mono">
            More events coming — the journey continues.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
