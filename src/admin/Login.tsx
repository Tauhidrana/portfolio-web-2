import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/admin/ui";
import { INPUT_CLASS } from "@/admin/fieldTypes";
import ThemeToggle from "@/components/ThemeToggle";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }

    // No navigate() here on purpose. The session arrives via onAuthStateChange
    // and LoginRoute performs the redirect, honouring the page that sent us
    // here. Staying busy keeps the button disabled until that swap happens.
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-ground px-5">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm">
        <p className="label">Dashboard</p>

        <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
          Sign in
        </h1>

        <p className="mt-2 font-mono text-xs leading-relaxed text-ink-3">
          Signup is disabled. This is the site owner&rsquo;s account only.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="block">
            <span className="label block">Email</span>
            <input
              type="email"
              value={email}
              required
              autoComplete="username"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              className={`${INPUT_CLASS} mt-2`}
            />
          </label>

          <label className="block">
            <span className="label block">Password</span>
            <input
              type="password"
              value={password}
              required
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className={`${INPUT_CLASS} mt-2`}
            />
          </label>

          {error && (
            <p className="border border-rank-gm/40 bg-panel px-3 py-2 font-mono text-[11px] leading-relaxed text-ink-2">
              {error}
            </p>
          )}

          <Button type="submit" variant="primary" busy={busy} className="w-full justify-center">
            Sign in
          </Button>
        </form>

        <a
          href="/"
          className="mt-8 inline-block font-mono text-xs text-ink-3 transition-colors hover:text-accent"
        >
          ← Back to site
        </a>
      </div>
    </div>
  );
}
