import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { useContent } from "@/lib/content";
import { useAuth } from "@/lib/useAuth";
import ThemeToggle from "@/components/ThemeToggle";

export default function Nav() {
  const { navLinks, profile } = useContent();
  // Costs no request for a visitor: with no stored session this resolves
  // straight from localStorage as null.
  const { session } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = navLinks.map((link) => link.href.slice(1));

    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const current = ids.findLast((id) => {
        const el = document.getElementById(id);
        return el && el.getBoundingClientRect().top <= 120;
      });

      setActive(current ?? "");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navLinks]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-rule bg-ground/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 md:px-10">
        <a
          href="#top"
          className="font-mono text-xs tracking-[0.14em] text-ink transition-colors hover:text-accent"
        >
          KTR
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`px-3 py-2 font-mono text-xs tracking-wide transition-colors ${
                      isActive ? "text-ink" : "text-ink-3 hover:text-ink-2"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={`mailto:${profile.email}`}
            className="hidden font-mono text-xs text-ink-2 transition-colors hover:text-accent md:block"
          >
            {profile.email}
          </a>

          {/* Only the signed-in owner ever sees this. */}
          {session && (
            <a
              href="/admin"
              className="ml-2 hidden items-center gap-1.5 border border-rule px-2.5 py-1.5 font-mono text-xs text-ink-2 transition-colors hover:border-accent hover:text-accent md:flex"
            >
              <LayoutDashboard size={12} />
              Dashboard
            </a>
          )}

          <ThemeToggle />

          <button
            className="p-2 text-ink-2 transition-colors hover:text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-rule bg-ground md:hidden">
          <ul className="px-5 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-rule py-3 font-mono text-xs tracking-wide text-ink-2 last:border-0"
                >
                  {link.label}
                </a>
              </li>
            ))}

            {session && (
              <li>
                <a
                  href="/admin"
                  className="flex items-center gap-2 border-b border-rule py-3 font-mono text-xs tracking-wide text-accent last:border-0"
                >
                  <LayoutDashboard size={12} />
                  Dashboard
                </a>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
