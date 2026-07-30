import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, FileText, Trash2, Upload } from "lucide-react";
import { FILE_BUCKET, supabase } from "@/lib/supabase";
import { Button, EmptyNote, ErrorNote, Loading, PageHeader, useToast } from "@/admin/ui";

/**
 * A fixed object key, so replacing the resume overwrites the old file instead of
 * leaving orphans in the bucket. The original filename is kept in the database
 * for display; the URL carries a version query so a replacement is not served
 * from cache.
 */
const OBJECT_KEY = "resume.pdf";
const MAX_BYTES = 10 * 1024 * 1024;

type Resume = { url: string; filename: string } | null;

export default function ResumePage() {
  const [resume, setResume] = useState<Resume>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("profile")
      .select("resume_url, resume_filename")
      .eq("id", 1)
      .maybeSingle();

    if (error) setError(error.message);
    else {
      setError(null);
      setResume(
        data?.resume_url
          ? { url: data.resume_url, filename: data.resume_filename }
          : null,
      );
    }

    setLoading(false);
  }, []);

  // Fetch on mount. load() awaits before it touches state, so nothing is set
  // synchronously here -- the rule cannot see past the await.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const upload = async (file: File) => {
    // The site links straight at this file, so a wrong type would be a broken
    // link for every visitor. Cheap to check, expensive to miss.
    if (file.type !== "application/pdf") {
      toast("Resume must be a PDF.", "error");
      return;
    }

    if (file.size > MAX_BYTES) {
      toast(`That file is ${Math.round(file.size / 1024 / 1024)} MB. Limit is 10 MB.`, "error");
      return;
    }

    setBusy(true);

    const { error: uploadError } = await supabase.storage
      .from(FILE_BUCKET)
      .upload(OBJECT_KEY, file, { contentType: "application/pdf", upsert: true });

    if (uploadError) {
      toast(uploadError.message, "error");
      setBusy(false);
      return;
    }

    const { publicUrl } = supabase.storage.from(FILE_BUCKET).getPublicUrl(OBJECT_KEY).data;
    const versioned = `${publicUrl}?v=${Date.now()}`;

    const { error: saveError } = await supabase
      .from("profile")
      .update({ resume_url: versioned, resume_filename: file.name })
      .eq("id", 1);

    if (saveError) toast(saveError.message, "error");
    else toast("Resume uploaded");

    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
    await load();
  };

  const remove = async () => {
    if (!window.confirm("Remove the resume? The download link disappears from the site.")) {
      return;
    }

    setBusy(true);

    const { error: storageError } = await supabase.storage
      .from(FILE_BUCKET)
      .remove([OBJECT_KEY]);

    // A missing object is fine -- the goal is that no resume remains. Clearing
    // the columns is what actually takes the link off the site.
    if (storageError) console.warn("Resume file already gone:", storageError.message);

    const { error: saveError } = await supabase
      .from("profile")
      .update({ resume_url: null, resume_filename: null })
      .eq("id", 1);

    if (saveError) toast(saveError.message, "error");
    else toast("Resume removed");

    setBusy(false);
    await load();
  };

  return (
    <div>
      <PageHeader
        title="Resume"
        description="A single PDF, linked from the hero next to “See the work”. Replacing it overwrites the old file; removing it hides the link entirely."
      />

      {error && <ErrorNote message={error} />}
      {loading && <Loading />}

      {!loading && !error && (
        <div className="mt-6">
          {resume ? (
            <div className="flex flex-wrap items-center gap-4 border border-rule bg-panel px-4 py-4">
              <FileText size={20} className="shrink-0 text-ink-3" />

              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm text-ink">
                  {resume.filename}
                </p>

                <a
                  href={resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-flex items-center gap-1 font-mono text-[11px] text-ink-3 transition-colors hover:text-accent"
                >
                  View current file
                  <ExternalLink size={10} />
                </a>
              </div>

              <div className="flex shrink-0 gap-2">
                <Button busy={busy} onClick={() => inputRef.current?.click()}>
                  <Upload size={12} />
                  Replace
                </Button>

                <Button variant="danger" busy={busy} onClick={() => void remove()}>
                  <Trash2 size={12} />
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <>
              <EmptyNote>
                No resume uploaded. The download link is hidden on the site.
              </EmptyNote>

              <div className="mt-4">
                <Button
                  variant="primary"
                  busy={busy}
                  onClick={() => inputRef.current?.click()}
                >
                  <Upload size={12} />
                  Upload resume
                </Button>
              </div>
            </>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void upload(file);
            }}
          />
        </div>
      )}
    </div>
  );
}
