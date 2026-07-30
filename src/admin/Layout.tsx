import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { ExternalLink, LogOut, Menu, X } from "lucide-react";
import { signOut } from "@/lib/useAuth";
import ThemeToggle from "@/components/ThemeToggle";
import { LIST_PAGES } from "@/admin/resources";
import { Button } from "@/admin/ui";

const GROUPS: { label: string; items: { to: string; label: string }[] }[] = [
  {
    label: "Identity",
    items: [
      { to: "profile", label: "Profile" },
      { to: "education", label: "Education" },
      { to: "about", label: "About" },
      { to: "resume", label: "Resume" },
    ],
  },
  {
    label: "Content",
    items: [
      { to: "ratings", label: "Ratings" },
      { to: "facts", label: "Facts" },
      { to: "stack", label: "Stack" },
      { to: "projects", label: "Projects" },
      { to: "roles", label: "Roles" },
      { to: "records", label: "Record" },
      { to: "events", label: "Events" },
    ],
  },
  {
    label: "Site",
    items: [
      { to: "nav", label: "Navigation" },
      { to: "socials", label: "Socials" },
      { to: "images", label: "Images" },
    ],
  },
];

// Fails the build if a nav entry ever points at a list page that was removed.
const KNOWN = new Set([
  "profile", "education", "ratings", "events", "images", "resume",
  ...LIST_PAGES.map((p) => p.path),
]);

export default function Layout({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const leave = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-ground">
      <header className="sticky top-0 z-40 border-b border-rule bg-ground/90 backdrop-blur">
        <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="p-1.5 text-ink-2 transition-colors hover:text-ink lg:hidden"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>

            <span className="font-mono text-xs tracking-[0.14em] text-ink">
              KTR / ADMIN
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden truncate font-mono text-[11px] text-ink-3 sm:block">
              {email}
            </span>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 font-mono text-xs text-ink-3 transition-colors hover:text-accent sm:flex"
            >
              View site
              <ExternalLink size={11} />
            </a>

            <ThemeToggle size={14} />

            <Button onClick={() => void leave()}>
              <LogOut size={12} />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside
          className={`${
            open ? "block" : "hidden"
          } w-full shrink-0 border-b border-rule px-4 py-5 lg:block lg:w-56 lg:border-b-0 lg:border-r lg:px-5 lg:py-8`}
        >
          <nav className="space-y-7">
            {GROUPS.map((group) => (
              <div key={group.label}>
                <p className="label">{group.label}</p>

                <ul className="mt-2.5 space-y-px">
                  {group.items.map((item) => (
                    <li key={item.to}>
                      {/* Absolute, not relative: a relative `to` resolves
                          against the current URL, so navigating from
                          /admin/profile appended the next segment instead of
                          replacing it. */}
                      <NavLink
                        to={`/admin/${item.to}`}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `block border-l-2 py-1.5 pl-3 font-mono text-xs transition-colors ${
                            isActive
                              ? "border-accent text-ink"
                              : "border-transparent text-ink-3 hover:border-rule hover:text-ink-2"
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

if (import.meta.env.DEV) {
  for (const group of GROUPS) {
    for (const item of group.items) {
      if (!KNOWN.has(item.to)) {
        console.warn(`Admin nav points at unknown route: ${item.to}`);
      }
    }
  }
}
