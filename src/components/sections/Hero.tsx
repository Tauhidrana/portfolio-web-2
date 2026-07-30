import { ArrowDownToLine } from "lucide-react";
import { useContent } from "@/lib/content";
import RatingLadder from "@/components/RatingLadder";

export default function Hero() {
  const { profile, ratingScales, facts } = useContent();

  return (
    <section
      id="top"
      className="mx-auto max-w-6xl px-5 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36"
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Thesis */}
        <div className="lg:col-span-5">
          <p className="label">{profile.location}</p>

          <h1 className="mt-5 font-display text-[clamp(2.5rem,7vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-ink">
            Kazi Tauhid
            <br />
            Rana
          </h1>

          <p className="mt-5 font-mono text-sm text-ink-2">{profile.role}</p>

          <p className="prose-serif mt-6 max-w-md">{profile.lede}</p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#work"
              className="border-b border-ink pb-1 font-mono text-xs tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
            >
              See the work
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="border-b border-transparent pb-1 font-mono text-xs tracking-wide text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>

            {/* Hidden until a resume is actually uploaded — a dead link here
                would be worse than no link. */}
            {profile.resume && (
              <a
                href={profile.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 border-b border-transparent pb-1 font-mono text-xs tracking-wide text-ink-2 transition-colors hover:border-accent hover:text-accent"
              >
                Résumé
                <ArrowDownToLine
                  size={12}
                  className="transition-transform group-hover:translate-y-px"
                />
              </a>
            )}
          </div>

          <p className="mt-10 font-mono text-xs text-ink-3">{profile.status}</p>
        </div>

        {/* Where he actually stands, measured against the real ladders */}
        <div className="lg:col-span-7">
          <div className="space-y-12">
            {ratingScales.map((scale) => (
              <RatingLadder key={scale.platform} scale={scale} />
            ))}
          </div>
        </div>
      </div>

      {/* Facts strip */}
      <dl className="mt-20 grid grid-cols-2 border-t border-ink-3/40 sm:grid-cols-4">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="border-b border-r border-rule px-4 py-5 last:border-r-0 sm:border-b-0"
          >
            <dt className="label">{fact.label}</dt>
            <dd className="num mt-2 text-2xl font-medium text-ink">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
