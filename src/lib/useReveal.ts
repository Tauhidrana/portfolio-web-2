import { useEffect, useRef } from "react";

/**
 * Reveals every [data-reveal] descendant once the section scrolls into view.
 * One observer per section; children stagger themselves via the --i CSS var.
 * ponytail: replaces framer-motion, which was pulled in for exactly this.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () =>
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
        node.dataset.shown = "";
      });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        show();
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
