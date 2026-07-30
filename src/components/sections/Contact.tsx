import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/lib/content";
import { iconFor } from "@/lib/icons";
import { useReveal } from "@/lib/useReveal";

export default function Contact() {
  const { profile, socials } = useContent();
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="contact"
      ref={ref}
      className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28"
    >
      <div className="border-t border-ink-3/40 pt-5" data-reveal>
        <span className="label text-ink-2">Contact</span>

        <h2 className="mt-8 max-w-2xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink md:text-4xl">
          If you have a problem worth sitting with, send it over.
        </h2>

        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-flex items-baseline gap-2 border-b border-ink pb-1 font-mono text-base text-ink transition-colors hover:border-accent hover:text-accent md:text-lg"
        >
          {profile.email}
          <ArrowUpRight size={15} />
        </a>
      </div>

      <ul
        className="mt-16 grid grid-cols-1 border-t border-rule sm:grid-cols-2 lg:grid-cols-4"
        data-reveal
        style={{ "--i": 1 } as React.CSSProperties}
      >
        {socials.map((social) => {
          const Icon = iconFor(social.iconKey);

          return (
            <li key={social.label} className="border-b border-r border-rule">
              <a
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-4 transition-colors hover:bg-panel"
              >
                <Icon size={15} className="shrink-0 text-ink-3 transition-colors group-hover:text-ink" />

                <span className="min-w-0">
                  <span className="block font-display text-xs text-ink">
                    {social.label}
                  </span>
                  <span className="block truncate font-mono text-[11px] text-ink-3">
                    {social.handle}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <footer className="mt-16 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-ink-3">
          {profile.name} · {profile.location}
        </p>

        <p className="font-mono text-xs text-ink-3">{profile.status}</p>
      </footer>
    </section>
  );
}
