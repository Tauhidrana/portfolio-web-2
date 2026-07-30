import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";

// ---------------------------------------------------------------------------
// Toasts
// ---------------------------------------------------------------------------

type ToastKind = "success" | "error";
type Toast = { id: number; message: string; kind: ToastKind };

const ToastContext = createContext<(message: string, kind?: ToastKind) => void>(
  () => {},
);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, kind: ToastKind = "success") => {
    const id = Date.now() + Math.random();
    setToasts((list) => [...list, { id, message, kind }]);

    // Errors linger: they usually carry a Postgres message worth reading.
    const ttl = kind === "error" ? 8000 : 2500;
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), ttl);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}

      <div
        className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-full max-w-sm flex-col gap-2"
        role="status"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-2.5 border px-3.5 py-3 text-xs shadow-lg backdrop-blur ${
              t.kind === "error"
                ? "border-rank-gm/40 bg-panel/95 text-ink"
                : "border-rule bg-panel/95 text-ink"
            }`}
          >
            {t.kind === "error" ? (
              <CircleAlert size={14} className="mt-px shrink-0 text-rank-gm" />
            ) : (
              <CircleCheck size={14} className="mt-px shrink-0 text-rank-pupil" />
            )}
            <span className="font-mono leading-relaxed break-words">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- a hook belongs beside its provider
export const useToast = () => useContext(ToastContext);

// ---------------------------------------------------------------------------
// Buttons
// ---------------------------------------------------------------------------

type Variant = "primary" | "ghost" | "danger";

const VARIANTS: Record<Variant, string> = {
  primary:
    "border-ink bg-ink text-ground hover:border-accent hover:bg-accent hover:text-white",
  ghost: "border-rule text-ink-2 hover:border-ink-3 hover:text-ink",
  danger: "border-rule text-ink-3 hover:border-rank-gm hover:text-rank-gm",
};

export function Button({
  variant = "ghost",
  busy,
  children,
  className = "",
  disabled,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  busy?: boolean;
}) {
  return (
    <button
      {...rest}
      disabled={disabled || busy}
      className={`inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono text-xs tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${VARIANTS[variant]} ${className}`}
    >
      {busy && <LoaderCircle size={12} className="animate-spin" />}
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Page furniture
// ---------------------------------------------------------------------------

export function PageHeader({
  title,
  description,
  meta,
  action,
}: {
  title: string;
  description?: string;
  meta?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-rule pb-5">
      <div>
        <div className="flex items-baseline gap-3">
          <h1 className="font-display text-xl font-semibold text-ink">{title}</h1>
          {meta && <span className="num text-xs text-ink-3">{meta}</span>}
        </div>
        {description && (
          <p className="mt-1.5 max-w-xl font-mono text-xs leading-relaxed text-ink-3">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function Loading({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 py-10 font-mono text-xs text-ink-3">
      <LoaderCircle size={13} className="animate-spin" />
      {label}…
    </div>
  );
}

export function ErrorNote({ message }: { message: string }) {
  return (
    <div className="my-6 flex items-start gap-2.5 border border-rank-gm/40 bg-panel px-4 py-3">
      <CircleAlert size={14} className="mt-px shrink-0 text-rank-gm" />
      <p className="font-mono text-xs leading-relaxed text-ink-2">{message}</p>
    </div>
  );
}

export function EmptyNote({ children }: { children: ReactNode }) {
  return (
    <p className="border border-dashed border-rule px-4 py-8 text-center font-mono text-xs text-ink-3">
      {children}
    </p>
  );
}
