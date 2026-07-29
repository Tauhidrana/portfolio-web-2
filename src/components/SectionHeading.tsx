export default function SectionHeading({
  label,
  title,
  meta,
  intro,
}: {
  label: string;
  title: string;
  meta?: string;
  intro?: string;
}) {
  return (
    <header className="border-t border-ink-3/40 pt-5" data-reveal>
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <span className="label text-ink-2">{label}</span>
        {meta && <span className="label">{meta}</span>}
      </div>

      <h2 className="mt-8 max-w-2xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink md:text-4xl">
        {title}
      </h2>

      {intro && <p className="prose-serif mt-4 max-w-xl">{intro}</p>}
    </header>
  );
}
