/**
 * Field definitions and the form <-> Postgres value mapping. Separate from
 * fields.tsx so that file exports only components.
 */
export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "url" | "email" | "number" | "stringList" | "select" | "image";
  required?: boolean;
  help?: string;
  placeholder?: string;
  rows?: number;
  min?: number;
  max?: number;
  /** Empty input is stored as NULL rather than an empty string. */
  nullable?: boolean;
  options?: { value: string; label: string; swatch?: string }[];
}

export type FormValues = Record<string, unknown>;

export const INPUT_CLASS =
  "w-full border border-rule bg-panel px-3 py-2 font-mono text-xs text-ink placeholder:text-ink-3 transition-colors focus:border-ink-3 focus:outline-none";

/** Blank values for a fresh row, matching each field's storage type. */
export function emptyValues(fields: FieldDef[]): FormValues {
  return Object.fromEntries(
    fields.map((f) => [
      f.name,
      f.type === "stringList" ? [] : f.type === "number" ? 0 : "",
    ]),
  );
}

/** Turns form state into what Postgres should receive. */
export function toPayload(fields: FieldDef[], values: FormValues): FormValues {
  return Object.fromEntries(
    fields.map((f) => {
      const value = values[f.name];

      if (f.type === "number") return [f.name, Number(value)];
      if (f.type === "stringList") return [f.name, value ?? []];
      if (f.nullable && (value === "" || value == null)) return [f.name, null];

      return [f.name, value];
    }),
  );
}
