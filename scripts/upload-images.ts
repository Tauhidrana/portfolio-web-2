/**
 * One-time migration: pushes public/images/ into the site-images bucket and
 * prints the resulting public URL for each file.
 *
 *   SUPABASE_SECRET_KEY=sb_secret_… bun run scripts/upload-images.ts
 *
 * Needs the secret key, not the publishable one — uploads are gated by RLS to
 * authenticated users, and a script has no session. Never put the secret key in
 * .env alongside the VITE_ vars; those are bundled into the browser build.
 */
import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const url = process.env.VITE_SUPABASE_URL;
const secret =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

if (!url || !secret) {
  console.error(
    "Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running.",
  );
  process.exit(1);
}

const BUCKET = "site-images";
const SOURCE = "public/images";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

const supabase = createClient(url, secret, {
  auth: { persistSession: false },
});

const files = (await readdir(SOURCE)).filter((f) => extname(f).toLowerCase() in MIME);

if (files.length === 0) {
  console.error(`No images found in ${SOURCE}/`);
  process.exit(1);
}

console.log(`Uploading ${files.length} images to ${BUCKET}…\n`);

let failed = 0;

for (const file of files) {
  const body = await readFile(join(SOURCE, file));

  const { error } = await supabase.storage.from(BUCKET).upload(file, body, {
    contentType: MIME[extname(file).toLowerCase()],
    cacheControl: "3600",
    // Re-running the script should refresh the bucket, not error out.
    upsert: true,
  });

  if (error) {
    failed++;
    console.error(`  FAIL  ${file} — ${error.message}`);
    continue;
  }

  const { publicUrl } = supabase.storage.from(BUCKET).getPublicUrl(file).data;
  console.log(`  ok    ${file}\n        ${publicUrl}`);
}

console.log(
  failed
    ? `\nDone with ${failed} failure(s).`
    : "\nAll images uploaded. Apply supabase/seed.sql next.",
);

process.exit(failed ? 1 : 0);
