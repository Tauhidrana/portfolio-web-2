import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export default function ThemeToggle({ size = 15 }: { size?: number }) {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      onClick={toggle}
      title={`Switch to ${next} mode`}
      aria-label={`Switch to ${next} mode`}
      className="p-2 text-ink-3 transition-colors hover:text-ink"
    >
      {theme === "dark" ? <Sun size={size} /> : <Moon size={size} />}
    </button>
  );
}
