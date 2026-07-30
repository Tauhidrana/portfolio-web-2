import { useState, type ReactNode } from "react";
import { ImageIcon, Plus, X } from "lucide-react";
import { ImagePickerModal } from "@/admin/ImageLibrary";
import { Button } from "@/admin/ui";
import { INPUT_CLASS, type FieldDef } from "@/admin/fieldTypes";

function Label({
  field,
  children,
}: {
  field: FieldDef;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="label block">
        {field.label}
        {field.required && <span className="text-rank-gm"> *</span>}
      </span>

      <div className="mt-2">{children}</div>

      {field.help && (
        <span className="mt-1.5 block font-mono text-[11px] leading-relaxed text-ink-3">
          {field.help}
        </span>
      )}
    </label>
  );
}

export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  if (field.type === "stringList") {
    return (
      <Label field={field}>
        <StringList
          values={(value as string[]) ?? []}
          onChange={onChange}
          placeholder={field.placeholder}
        />
      </Label>
    );
  }

  if (field.type === "image") {
    return (
      <Label field={field}>
        <ImageField
          value={(value as string) ?? ""}
          onChange={onChange}
          required={field.required}
        />
      </Label>
    );
  }

  if (field.type === "select") {
    const active = field.options?.find((o) => o.value === value);

    return (
      <Label field={field}>
        <div className="flex items-center gap-2">
          {active?.swatch && (
            <span
              aria-hidden
              className="h-4 w-4 shrink-0 border border-rule"
              style={{ background: active.swatch }}
            />
          )}

          <select
            value={(value as string) ?? ""}
            required={field.required}
            onChange={(e) => onChange(e.target.value)}
            className={INPUT_CLASS}
          >
            <option value="">Select…</option>
            {field.options?.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </Label>
    );
  }

  if (field.type === "textarea") {
    return (
      <Label field={field}>
        <textarea
          value={(value as string) ?? ""}
          required={field.required}
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${INPUT_CLASS} resize-y leading-relaxed`}
        />
      </Label>
    );
  }

  return (
    <Label field={field}>
      <input
        type={field.type === "number" ? "number" : field.type}
        value={(value as string | number) ?? ""}
        required={field.required}
        placeholder={field.placeholder}
        min={field.min}
        max={field.max}
        onChange={(e) =>
          onChange(field.type === "number" ? e.target.valueAsNumber : e.target.value)
        }
        className={INPUT_CLASS}
      />
    </Label>
  );
}

/**
 * Chip input backing a text[] column. Enter or comma commits the current entry;
 * backspace on an empty box removes the last chip.
 */
function StringList({
  values,
  onChange,
  placeholder,
}: {
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const commit = () => {
    const entry = draft.trim();
    if (!entry || values.includes(entry)) {
      setDraft("");
      return;
    }
    onChange([...values, entry]);
    setDraft("");
  };

  return (
    <div className="border border-rule bg-panel p-2">
      {values.length > 0 && (
        <ul className="mb-2 flex flex-wrap gap-1.5">
          {values.map((entry, i) => (
            <li
              key={entry}
              className="flex items-center gap-1.5 border border-rule px-2 py-1 font-mono text-[11px] text-ink-2"
            >
              {entry}
              <button
                type="button"
                aria-label={`Remove ${entry}`}
                onClick={() => onChange(values.filter((_, j) => j !== i))}
                className="text-ink-3 transition-colors hover:text-rank-gm"
              >
                <X size={11} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-1.5">
        <input
          value={draft}
          placeholder={placeholder ?? "Type and press Enter"}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              commit();
            } else if (e.key === "Backspace" && !draft && values.length) {
              onChange(values.slice(0, -1));
            }
          }}
          className="w-full bg-transparent px-1 py-1 font-mono text-xs text-ink placeholder:text-ink-3 focus:outline-none"
        />

        <button
          type="button"
          onClick={commit}
          aria-label="Add"
          className="shrink-0 border border-rule px-2 text-ink-3 transition-colors hover:border-ink-3 hover:text-ink"
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}

function ImageField({
  value,
  onChange,
  required,
}: {
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
}) {
  const [picking, setPicking] = useState(false);

  return (
    <>
      <div className="flex items-start gap-3">
        <div className="flex h-16 w-20 shrink-0 items-center justify-center border border-rule bg-panel">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon size={16} className="text-ink-3" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <Button type="button" onClick={() => setPicking(true)}>
            {value ? "Replace" : "Choose image"}
          </Button>

          {/* Kept visible and editable: pasting a URL directly is sometimes
              faster than hunting through the library. */}
          <input
            type="url"
            value={value}
            required={required}
            placeholder="https://…"
            onChange={(e) => onChange(e.target.value)}
            className={`${INPUT_CLASS} mt-2`}
          />
        </div>
      </div>

      {picking && (
        <ImagePickerModal onPick={onChange} onClose={() => setPicking(false)} />
      )}
    </>
  );
}
