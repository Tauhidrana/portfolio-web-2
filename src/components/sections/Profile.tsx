import { useContent } from "@/lib/content";
import SectionHeading from "@/components/SectionHeading";
import { useReveal } from "@/lib/useReveal";

/** Renders **bold** spans without pulling in a markdown dependency. */
function Prose({ text }: { text: string }) {
  return (
    <p className="prose-serif">
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? <strong key={i}>{part}</strong> : part,
      )}
    </p>
  );
}

export default function Profile() {
  const { profile, aboutParagraphs, education, stack } = useContent();
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="profile"
      ref={ref}
      className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28"
    >
      <SectionHeading
        label="Profile"
        title="How I got here, and what I am actually good at."
        meta={education.duration}
      />

      <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          <img
            src={profile.image}
            alt={profile.name}
            loading="lazy"
            className="w-full max-w-xs object-cover object-top grayscale transition-[filter] duration-500 hover:grayscale-0"
            style={{ aspectRatio: "3 / 4" }}
          />

          <dl className="mt-8 max-w-xs border-t border-rule">
            <div className="flex justify-between gap-4 border-b border-rule py-3">
              <dt className="label">Institute</dt>
              <dd className="text-right font-display text-xs text-ink">
                {education.institution}
              </dd>
            </div>

            <div className="flex justify-between gap-4 border-b border-rule py-3">
              <dt className="label">Field</dt>
              <dd className="text-right font-display text-xs text-ink">
                {education.field}
              </dd>
            </div>

            <div className="flex justify-between gap-4 py-3">
              <dt className="label">Based in</dt>
              <dd className="text-right font-display text-xs text-ink">
                {education.location}
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-8">
          <div className="max-w-2xl space-y-6">
            {aboutParagraphs.map((text, i) => (
              <div key={i} data-reveal style={{ "--i": i + 2 } as React.CSSProperties}>
                <Prose text={text} />
              </div>
            ))}
          </div>

          {/* Stack — named, not scored. A percentage on a language is a guess. */}
          <div
            className="mt-14 grid gap-8 border-t border-rule pt-8 sm:grid-cols-3"
            data-reveal
            style={{ "--i": 5 } as React.CSSProperties}
          >
            {stack.map((group) => (
              <div key={group.group}>
                <p className="label">{group.group}</p>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="font-mono text-sm text-ink-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
