import { useState, useCallback } from "react";
import { useContent } from "@/lib/content";
import SectionHeading from "@/components/SectionHeading";
import Lightbox from "@/components/Lightbox";
import { useReveal } from "@/lib/useReveal";
import type { Photo } from "@/types";

export default function Events() {
  const { events } = useContent();
  const ref = useReveal<HTMLElement>();
  const [view, setView] = useState<{ photos: Photo[]; index: number } | null>(
    null,
  );

  const step = useCallback(
    (delta: number) =>
      setView((v) =>
        v
          ? { ...v, index: (v.index + delta + v.photos.length) % v.photos.length }
          : v,
      ),
    [],
  );

  const close = useCallback(() => setView(null), []);

  return (
    <section
      id="events"
      ref={ref}
      className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28"
    >
      <SectionHeading
        label="Events"
        title="Rooms worth being in."
        meta={`${events.length} attended`}
      />

      <div className="mt-14">
        {events.map((event, i) => (
          <article
            key={event.id}
            data-reveal
            style={{ "--i": i + 1 } as React.CSSProperties}
            className="border-t border-rule pt-8"
          >
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {event.title}
                </h3>

                <p className="num mt-2 text-xs text-ink-3">{event.date}</p>
                <p className="mt-1 font-mono text-xs text-ink-3">
                  {event.location}
                </p>
                <p className="mt-4 font-mono text-xs leading-relaxed text-ink-3">
                  {event.organizer}
                </p>
              </div>

              <div className="lg:col-span-8">
                <p className="prose-serif max-w-xl">{event.description}</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {event.photos.map((photo, index) => (
                <button
                  key={photo.src}
                  onClick={() => setView({ photos: event.photos, index })}
                  aria-label={photo.caption}
                  className="group relative block overflow-hidden"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    className="aspect-4/3 w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                  <span className="absolute inset-0 bg-ground/30 transition-opacity duration-300 group-hover:opacity-0" />
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>

      {view && (
        <Lightbox
          photos={view.photos}
          index={view.index}
          onClose={close}
          onStep={step}
        />
      )}
    </section>
  );
}
