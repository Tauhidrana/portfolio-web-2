import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button, useToast } from "@/admin/ui";
import type { FormValues } from "@/admin/fieldTypes";

/**
 * Fills the rating fields from the official Codeforces API.
 *
 * Called straight from the browser: codeforces.com/api sends
 * access-control-allow-origin:*, so this needs no backend, no key, and no
 * scheduled job. It only fills the form -- saving stays a deliberate act, and
 * `note` and `max` are left alone because they are editorial, not measured.
 */

interface CodeforcesUser {
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
}

/** The API returns ranks lowercase ("pupil"); the site writes them "Pupil". */
const titleCase = (value: string) =>
  value.replace(/\b\w/g, (c) => c.toUpperCase());

export default function CodeforcesSync({
  values,
  setValues,
}: {
  values: FormValues;
  setValues: (updater: (v: FormValues) => FormValues) => void;
}) {
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  const platform = String(values.platform ?? "");
  const handle = String(values.handle ?? "").trim();

  // Only Codeforces has a usable public API. CodeChef killed theirs, and its
  // profile page sends no CORS header, so there is nothing to offer here.
  if (platform.toLowerCase() !== "codeforces") return null;

  const fetchLatest = async () => {
    if (!handle) {
      toast("Enter the handle first.", "error");
      return;
    }

    setBusy(true);

    try {
      const res = await fetch(
        `https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`,
      );
      const body = await res.json();

      if (body.status !== "OK" || !body.result?.length) {
        throw new Error(body.comment ?? `Codeforces returned ${res.status}`);
      }

      const user = body.result[0] as CodeforcesUser;

      // An unrated account has no rating field at all.
      if (typeof user.rating !== "number") {
        toast(`${handle} has no rated contests yet.`, "error");
        return;
      }

      const current = user.rating;
      const peak = user.maxRating ?? user.rating;
      const rank = user.rank ? titleCase(user.rank) : "";

      const before = Number(values.current_rating ?? 0);

      setValues((v) => ({
        ...v,
        current_rating: current,
        peak_rating: peak,
        ...(rank ? { rank } : {}),
      }));

      const delta = current - before;
      toast(
        delta === 0
          ? `Up to date: ${current}${rank ? ` (${rank})` : ""}`
          : `${before} → ${current}${rank ? ` (${rank})` : ""}. Review, then Save.`,
      );
    } catch (e) {
      toast(`Codeforces: ${(e as Error).message}`, "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button type="button" busy={busy} onClick={() => void fetchLatest()}>
      <RefreshCw size={12} />
      Fetch from Codeforces
    </Button>
  );
}
