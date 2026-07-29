import { useState, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { RECORD } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import Lightbox from "@/components/Lightbox";
import { useReveal } from "@/lib/useReveal";

const PHOTOS = RECORD.map((item) => ({
  src: item.image,
  caption: `${item.title} — ${item.issuer}`,
}));

export default function Record() {
  const ref = useReveal<HTMLElement>();
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? null : (i + delta + PHOTOS.length) % PHOTOS.length)),
    [],
  );

  const close = useCallback(() => setOpen(null), []);

  return (
    <section
      id="record"
      ref={ref}
      className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28"
    >
      <SectionHeading
        label="Record"
        title="Results and credentials somebody else verified."
        meta={`${RECORD.length} entries`}
      />

      <div className="mt-14">
        {RECORD.map((item, i) => (
          <article
            key={item.id}
            data-reveal
            style={{ "--i": i + 1 } as React.CSSProperties}
            className="border-t border-rule"
          >
            <div className="grid grid-cols-1 gap-5 py-6 sm:grid-cols-12 sm:gap-6">
              <button
                onClick={() => setOpen(i)}
                aria-label={`View ${item.title}`}
                className="group relative block w-full overflow-hidden sm:col-span-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-32 w-full object-cover object-top grayscale transition duration-500 group-hover:grayscale-0 sm:h-24"
                />
                <span className="absolute inset-0 bg-ground/30 transition-opacity duration-300 group-hover:opacity-0" />
              </button>

              <div className="sm:col-span-6">
                <p className="label">
                  {item.kind} · {item.issuer}
                </p>

                <h3 className="mt-2 font-display text-base font-semibold leading-snug text-ink">
                  {item.title}
                </h3>

                <p className="prose-serif mt-1.5 text-[0.95rem]">
                  {item.description}
                </p>
              </div>

              <div className="flex items-start justify-between gap-4 sm:col-span-3 sm:flex-col sm:items-end sm:justify-start sm:gap-2">
                <span className="num text-xs text-ink-3">{item.date}</span>

                {item.result && (
                  <span className="num text-lg font-medium text-ink">
                    {item.result}
                  </span>
                )}

                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-ink-3 transition-colors hover:text-accent"
                  >
                    Verify
                    <ArrowUpRight size={11} />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {open !== null && (
        <Lightbox photos={PHOTOS} index={open} onClose={close} onStep={step} />
      )}
    </section>
  );
}
