import { useSingleton } from "@/admin/useResource";
import { RowForm } from "@/admin/ResourceEditor";
import type { FieldDef, FormValues } from "@/admin/fieldTypes";
import { ErrorNote, Loading, PageHeader, useToast } from "@/admin/ui";

export interface SingletonConfig {
  table: string;
  title: string;
  description?: string;
  fields: FieldDef[];
}

/** The two single-row tables. Same form machinery, no list around it. */
export default function SingletonEditor({ config }: { config: SingletonConfig }) {
  const { table, title, description, fields } = config;
  const { row, loading, error, save, reload } = useSingleton(table);
  const toast = useToast();

  return (
    <div>
      <PageHeader title={title} description={description} />

      {error && <ErrorNote message={error} />}
      {loading && <Loading />}

      {!loading && !error && (
        <div className="mt-6">
          <RowForm
            fields={fields}
            initial={initialFrom(fields, row)}
            submitLabel="Save"
            onCancel={() => void reload()}
            onSave={async (values: FormValues) => {
              await save(values);
              toast("Saved");
            }}
          />
        </div>
      )}
    </div>
  );
}

function initialFrom(
  fields: FieldDef[],
  row: Record<string, unknown> | null,
): FormValues {
  return Object.fromEntries(
    fields.map((f) => [
      f.name,
      row?.[f.name] ?? (f.type === "stringList" ? [] : f.type === "number" ? 0 : ""),
    ]),
  );
}
