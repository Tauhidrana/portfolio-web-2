import { ArrowUpRight } from "lucide-react";
import type { RatingScale } from "@/types";

const pct = (value: number, max: number) => `${(value / max) * 100}%`;

/**
 * The page's signature: a rating plotted against the ladder it is actually
 * measured on. Band widths and marker positions are derived from the real
 * thresholds, so the picture cannot flatter the number.
 */
export default function RatingLadder({ scale }: { scale: RatingScale }) {
  const active = scale.bands.find(
    (band) => scale.current >= band.from && scale.current < band.to,
  );

  return (
    <div className="border-t border-rule pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-display text-base font-semibold text-ink">
          {scale.platform}
        </h3>

        <a
          href={scale.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1 font-mono text-xs text-ink-3 transition-colors hover:text-accent"
        >
          {scale.handle}
          <ArrowUpRight
            size={12}
            className="transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
          />
        </a>
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <span
          className="num text-4xl font-bold leading-none text-ink"
          style={{ color: active?.color }}
        >
          {scale.current}
        </span>

        <span
          className="label"
          style={{ color: active?.color, letterSpacing: "0.12em" }}
        >
          {scale.rank}
        </span>

        <span className="num ml-auto text-xs text-ink-3">
          peak {scale.peak}
        </span>
      </div>

      {/* Track */}
      <div className="relative mt-4">
        <div className="flex h-1.5 w-full overflow-hidden">
          {scale.bands.map((band) => (
            <div
              key={band.label}
              title={`${band.label} · ${band.from}–${band.to}`}
              style={{
                width: pct(band.to - band.from, scale.max),
                background: band.color,
                // Only the band he is actually in reads at full strength. The
                // dim level is a token because it has to differ per theme.
                opacity: band === active ? 1 : "var(--band-dim)",
              }}
            />
          ))}
        </div>

        {/* Current — marker above the track */}
        <div
          className="absolute -top-1 h-3.5 w-px bg-ink"
          style={{ left: pct(scale.current, scale.max) }}
          aria-hidden
        />

        {/* Peak — tick below, so it never collides with the current marker */}
        <div
          className="absolute top-1.5 flex flex-col items-center"
          style={{ left: pct(scale.peak, scale.max) }}
          aria-hidden
        >
          <div className="h-2 w-px bg-ink-3" />
          <span className="num mt-0.5 text-[10px] leading-none text-ink-3">
            peak
          </span>
        </div>
      </div>

      {/* Band legend, doubling as the axis */}
      <div className="mt-8 flex w-full">
        {scale.bands.map((band) => (
          <div
            key={band.label}
            className="min-w-0 border-l border-rule pl-1.5"
            style={{ width: pct(band.to - band.from, scale.max) }}
          >
            <div
              className="num text-[9px] leading-tight text-ink-3 sm:text-[10px]"
              style={{ color: band === active ? band.color : undefined }}
            >
              {band.from}
            </div>
            <div className="font-display text-[9px] leading-tight text-ink-3 sm:text-[10px]">
              {band.label}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 font-serif text-sm italic text-ink-2">{scale.note}</p>
    </div>
  );
}
