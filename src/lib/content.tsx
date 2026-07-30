import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import type { SiteContent } from "@/types";

type State =
  | { status: "loading" }
  | { status: "ready"; data: SiteContent }
  | { status: "error"; message: string; kind: "network" | "server" };

const ContentContext = createContext<SiteContent | null>(null);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * PostgREST errors carry a `code`; a request that never reached the server does
 * not. That distinction decides whether retrying is worth anything -- a broken
 * connection may recover, a malformed query never will.
 */
const isNetworkError = (error: { code?: string }) => !error.code;

/**
 * Loads the whole site in one round trip. The get_site_content() function
 * assembles all 14 content tables into the shape the sections already expect,
 * so this is a single request rather than one per table.
 *
 * Children render only once content is ready, which lets useContent() return a
 * non-null value and keeps every section free of loading branches.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ status: "loading" });

  const load = useCallback(async () => {
    // Three attempts with backoff. A dropped connection on a phone or a flaky
    // link usually recovers within a second, and failing the whole page on the
    // first blip is the worst outcome available.
    for (let attempt = 0; ; attempt++) {
      const { data, error } = await supabase.rpc("get_site_content");

      if (!error) {
        setState({ status: "ready", data: data as SiteContent });
        return;
      }

      const network = isNetworkError(error);

      if (!network || attempt >= 2) {
        setState({
          status: "error",
          kind: network ? "network" : "server",
          message: error.message,
        });
        return;
      }

      await sleep(400 * 2 ** attempt);
    }
  }, []);

  const retry = useCallback(() => {
    setState({ status: "loading" });
    void load();
  }, [load]);

  // Fetch on mount. load() awaits before it touches state, so nothing is set
  // synchronously here -- the rule cannot see past the await.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  if (state.status === "loading") return <ContentSkeleton />;

  if (state.status === "error") {
    return (
      <ContentError message={state.message} kind={state.kind} onRetry={retry} />
    );
  }

  return (
    <ContentContext.Provider value={state.data}>
      {children}
    </ContentContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- a hook belongs beside its provider
export function useContent(): SiteContent {
  const content = useContext(ContentContext);

  if (!content) {
    throw new Error("useContent must be used inside <ContentProvider>");
  }

  return content;
}

function ContentSkeleton() {
  return (
    <div
      className="mx-auto flex min-h-screen max-w-6xl items-center px-5 md:px-10"
      role="status"
      aria-live="polite"
    >
      <div className="w-full animate-pulse">
        <div className="h-3 w-24 bg-rule" />
        <div className="mt-6 h-12 w-2/3 max-w-md bg-rule" />
        <div className="mt-4 h-4 w-1/3 max-w-xs bg-rule" />
        <div className="mt-10 h-24 w-full max-w-xl bg-rule" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}

/**
 * Content is fetched at runtime, so an unreachable database is a real state the
 * visitor can land in. Say so plainly rather than showing an empty page.
 */
function ContentError({
  message,
  kind,
  onRetry,
}: {
  message: string;
  kind: "network" | "server";
  onRetry: () => void;
}) {
  // The host is the useful part: "Failed to fetch" alone gives the visitor
  // nothing to check, and this is overwhelmingly an extension or a firewall.
  const host = new URL(import.meta.env.VITE_SUPABASE_URL).host;

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center px-5 md:px-10">
      <div>
        <p className="label">{kind === "network" ? "Offline" : "Error"}</p>

        <h1 className="mt-5 font-display text-2xl font-semibold text-ink">
          {kind === "network"
            ? "Could not reach the content server."
            : "This page could not load its content."}
        </h1>

        {kind === "network" ? (
          <div className="prose-serif mt-4 max-w-md space-y-3">
            <p>
              The request to <span className="font-mono text-sm">{host}</span>{" "}
              never completed, after three attempts. The usual causes are a
              dropped connection, or an ad blocker, privacy extension, or
              firewall blocking that domain.
            </p>
            <p className="text-sm">Try disabling extensions for this site, or open it in a private window.</p>
          </div>
        ) : (
          <p className="prose-serif mt-4 max-w-md">{message}</p>
        )}

        <button
          onClick={onRetry}
          className="mt-8 border-b border-ink pb-1 font-mono text-xs tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
