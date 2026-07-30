import { useCallback, useEffect, useRef, useState } from "react";
import { Copy, Trash2, Upload, X } from "lucide-react";
import { IMAGE_BUCKET, publicUrl, supabase } from "@/lib/supabase";
import { Button, EmptyNote, ErrorNote, Loading, useToast } from "@/admin/ui";

type StoredImage = { name: string; url: string; size: number };

function useImages() {
  const [images, setImages] = useState<StoredImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase.storage
      .from(IMAGE_BUCKET)
      .list("", { limit: 500, sortBy: { column: "name", order: "asc" } });

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      setImages(
        (data ?? [])
          // Supabase drops a hidden placeholder into empty folders.
          .filter((o) => o.name !== ".emptyFolderPlaceholder")
          .map((o) => ({
            name: o.name,
            url: publicUrl(o.name),
            size: (o.metadata?.size as number | undefined) ?? 0,
          })),
      );
    }

    setLoading(false);
  }, []);

  const reload = useCallback(async () => {
    setLoading(true);
    await load();
  }, [load]);

  // Fetch on mount. load() awaits before it touches state, so nothing is set
  // synchronously here -- the rule cannot see past the await.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  return { images, loading, error, reload };
}

const kb = (bytes: number) => `${Math.max(1, Math.round(bytes / 1024))} KB`;

/**
 * Doubles as the /admin/images page and as the picker opened by image fields.
 * Passing onSelect turns each tile into a choose button.
 */
export default function ImageLibrary({
  onSelect,
}: {
  onSelect?: (url: string) => void;
}) {
  const { images, loading, error, reload } = useImages();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const upload = async (files: FileList) => {
    setUploading(true);
    const taken = new Set(images.map((i) => i.name));

    for (const file of Array.from(files)) {
      // Keep the original filename where possible; it is what makes the
      // library browsable. Only disambiguate on a real collision.
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const name = taken.has(safe) ? `${Date.now()}-${safe}` : safe;
      taken.add(name);

      const { error } = await supabase.storage
        .from(IMAGE_BUCKET)
        .upload(name, file, { cacheControl: "3600", upsert: false });

      if (error) toast(`${file.name}: ${error.message}`, "error");
      else toast(`Uploaded ${name}`);
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
    await reload();
  };

  const remove = async (name: string) => {
    if (!window.confirm(`Delete ${name}? Anything still using it will break.`)) return;

    const { error } = await supabase.storage.from(IMAGE_BUCKET).remove([name]);
    if (error) toast(error.message, "error");
    else {
      toast(`Deleted ${name}`);
      await reload();
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="primary"
          busy={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Upload size={12} />
          Upload images
        </Button>

        <span className="font-mono text-xs text-ink-3">
          {images.length} in bucket
        </span>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => e.target.files?.length && void upload(e.target.files)}
        />
      </div>

      {error && <ErrorNote message={error} />}
      {loading && <Loading label="Loading images" />}

      {!loading && !error && images.length === 0 && (
        <div className="mt-6">
          <EmptyNote>No images yet. Upload one to get started.</EmptyNote>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <figure key={image.name} className="group border border-rule bg-panel">
            <div className="relative aspect-4/3 overflow-hidden bg-ground">
              <img
                src={image.url}
                alt={image.name}
                loading="lazy"
                className="h-full w-full object-cover"
              />

              {onSelect && (
                <button
                  onClick={() => onSelect(image.url)}
                  className="absolute inset-0 flex items-center justify-center bg-ground/70 font-mono text-xs text-ink opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                >
                  Use this image
                </button>
              )}
            </div>

            <figcaption className="flex items-center justify-between gap-2 px-2.5 py-2">
              <div className="min-w-0">
                <p className="truncate font-mono text-[11px] text-ink-2" title={image.name}>
                  {image.name}
                </p>
                <p className="num text-[10px] text-ink-3">{kb(image.size)}</p>
              </div>

              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => {
                    void navigator.clipboard.writeText(image.url);
                    toast("URL copied");
                  }}
                  title="Copy URL"
                  className="p-1 text-ink-3 transition-colors hover:text-ink"
                >
                  <Copy size={12} />
                </button>

                <button
                  onClick={() => void remove(image.name)}
                  title="Delete"
                  className="p-1 text-ink-3 transition-colors hover:text-rank-gm"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function ImagePickerModal({
  onPick,
  onClose,
}: {
  onPick: (url: string) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-ground/90 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Choose an image"
    >
      <div className="w-full max-w-4xl border border-rule bg-ground p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between border-b border-rule pb-4">
          <h2 className="font-display text-base font-semibold text-ink">
            Choose an image
          </h2>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 text-ink-3 transition-colors hover:text-ink"
          >
            <X size={16} />
          </button>
        </div>

        <ImageLibrary
          onSelect={(url) => {
            onPick(url);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
