import { useCallback, useState } from "react";

export type Theme = "light" | "dark";

const GROUND: Record<Theme, string> = {
  dark: "#0a0a0b",
  light: "#fbfbf9",
};

/**
 * The initial theme is already on <html> by the time React runs — the inline
 * script in index.html sets it before first paint. This hook reads that value
 * and owns changes from there.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.dataset.theme as Theme) ?? "dark",
  );

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";

      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", GROUND[next]);

      return next;
    });
  }, []);

  return { theme, toggle };
}
