import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import { useReveal } from "@/lib/useReveal";

export default function Work() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="work"
      ref={ref}
      className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28"
    >
      <SectionHeading
        label="Work"
        title="Two products, both live, both built end to end."
        meta={`${PROJECTS.length} shipped`}
      />

      <div className="mt-14">
        {PROJECTS.map((project, i) => (
          <article
            key={project.id}
            data-reveal
            style={{ "--i": i + 1 } as React.CSSProperties}
            className="group border-t border-rule py-10 first:border-t-0 first:pt-0"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {project.title}
                  </h3>
                  <span className="num text-xs text-ink-3">{project.year}</span>
                </div>

                <p className="mt-2 font-display text-sm text-ink-2">
                  {project.tagline}
                </p>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 border-b border-rule pb-1 font-mono text-xs text-ink-2 transition-colors hover:border-accent hover:text-accent"
                >
                  Open live site
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                  />
                </a>
              </div>

              <div className="lg:col-span-8">
                {/* The problem comes first. It is the reason the thing exists. */}
                <p className="label">The problem</p>
                <p className="prose-serif mt-2 max-w-xl">{project.problem}</p>

                <p className="label mt-7">What it does</p>
                <p className="prose-serif mt-2 max-w-xl">
                  {project.description}
                </p>

                <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
                  {project.tech.map((tech) => (
                    <li key={tech} className="font-mono text-xs text-ink-3">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
