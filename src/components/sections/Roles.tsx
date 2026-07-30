import { useContent } from "@/lib/content";
import SectionHeading from "@/components/SectionHeading";
import { useReveal } from "@/lib/useReveal";

export default function Roles() {
  const { roles } = useContent();
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="roles"
      ref={ref}
      className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28"
    >
      <SectionHeading
        label="Roles"
        title="Where the work happens."
        meta={`${roles.length} positions`}
      />

      <div className="mt-14">
        {roles.map((role, i) => (
          <article
            key={role.id}
            data-reveal
            style={{ "--i": i + 1 } as React.CSSProperties}
            className="grid gap-4 border-t border-rule py-8 lg:grid-cols-12 lg:gap-12"
          >
            <div className="lg:col-span-3">
              <p className="num text-xs text-ink-3">{role.period}</p>
              <p className="mt-1 font-mono text-xs text-ink-3">
                {role.location}
              </p>
            </div>

            <div className="lg:col-span-9">
              <h3 className="font-display text-lg font-semibold text-ink">
                {role.role}
                <span className="text-ink-3"> · </span>
                <span className="font-normal text-ink-2">{role.org}</span>
              </h3>

              <p className="prose-serif mt-2 max-w-xl">{role.description}</p>

              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {role.tags.map((tag) => (
                  <li key={tag} className="font-mono text-xs text-ink-3">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
