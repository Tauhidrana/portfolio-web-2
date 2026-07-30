import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. Copy them from the Supabase dashboard into .env.",
  );
}

/** Publishable key only — safe in the browser. Writes are gated by RLS. */
export const supabase = createClient(url, key);

export const IMAGE_BUCKET = "site-images";

/**
 * Non-image assets (currently just the resume). Kept out of site-images because
 * the image library renders every object in its bucket as a thumbnail.
 */
export const FILE_BUCKET = "site-files";

/** Public URL for an object in the image bucket. The bucket is world-readable. */
export const publicUrl = (name: string) =>
  supabase.storage.from(IMAGE_BUCKET).getPublicUrl(name).data.publicUrl;
