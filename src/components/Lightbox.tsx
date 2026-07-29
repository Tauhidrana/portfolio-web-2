import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/types";

export default function Lightbox({
  photos,
  index,
  onClose,
  onStep,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const many = photos.length > 1;
  const dialog = useRef<HTMLDivElement>(null);
  // Remember where focus came from so closing returns it to the thumbnail.
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    opener.current = document.activeElement;
    dialog.current?.focus();
    return () => (opener.current as HTMLElement | null)?.focus?.();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "ArrowRight") onStep(1);
    };

    document.addEventListener("keydown", onKey);
    // Stop the page scrolling behind the overlay.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose, onStep]);

  return (
    <div
      ref={dialog}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={photos[index].caption}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-ground/97 p-4 outline-none md:p-10"
      onClick={onClose}
    >
      <img
        src={photos[index].src}
        alt={photos[index].caption}
        className="max-h-[78vh] w-auto max-w-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <div className="mt-4 flex items-baseline gap-4">
        <p className="font-serif text-sm text-ink-2">{photos[index].caption}</p>
        {many && (
          <span className="num text-xs text-ink-3">
            {index + 1}/{photos.length}
          </span>
        )}
      </div>

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 p-2 text-ink-2 transition-colors hover:text-ink md:right-8 md:top-8"
      >
        <X size={22} />
      </button>

      {many && (
        <>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              onStep(-1);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-ink-3 transition-colors hover:text-ink md:left-6"
          >
            <ChevronLeft size={26} />
          </button>

          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              onStep(1);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-ink-3 transition-colors hover:text-ink md:right-6"
          >
            <ChevronRight size={26} />
          </button>
        </>
      )}
    </div>
  );
}
