import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";
import { FieldInput } from "@/admin/fields";
import {
  emptyValues,
  toPayload,
  type FieldDef,
  type FormValues,
} from "@/admin/fieldTypes";
import { useResource, type Parent, type Row } from "@/admin/useResource";
import {
  Button,
  EmptyNote,
  ErrorNote,
  Loading,
  PageHeader,
  useToast,
} from "@/admin/ui";

/**
 * Lets a config contribute a button to its own edit form -- used by the rating
 * ladders to pull live numbers from the Codeforces API. It receives the form's
 * working values so it can fill fields in place, leaving the save to the user.
 */
export type FormActions = (ctx: {
  values: FormValues;
  setValues: (updater: (v: FormValues) => FormValues) => void;
}) => ReactNode;

export interface ResourceConfig {
  table: string;
  title: string;
  singular: string;
  description?: string;
  fields: FieldDef[];
  /** How a collapsed row presents itself in the list. */
  summary: (row: Row) => { title: string; subtitle?: string; image?: string };
  /** Scopes the list to one parent row, for the two nested editors. */
  parent?: Parent;
  /** Compact heading, for when this sits inside another editor. */
  nested?: boolean;
  /** Rendered under the form of an expanded row, for parent/child editors. */
  renderChildren?: (row: Row) => ReactNode;
  /** Extra control rendered beside Save/Cancel in this resource's form. */
  formActions?: FormActions;
}

/** Fields that need the full width to be usable. */
const WIDE = new Set(["textarea", "stringList", "image"]);

export default function ResourceEditor({ config }: { config: ResourceConfig }) {
  const {
    table, title, singular, description, fields, summary, parent, nested,
    renderChildren, formActions,
  } = config;
  const { rows, loading, error, create, update, remove, move } = useResource(table, parent);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const toast = useToast();

  const onDelete = async (row: Row) => {
    const { title: label } = summary(row);
    if (!window.confirm(`Delete “${label}”? This cannot be undone.`)) return;

    try {
      await remove(row.id);
      toast(`Deleted ${singular.toLowerCase()}`);
    } catch (e) {
      toast((e as Error).message, "error");
    }
  };

  const onMove = async (row: Row, direction: -1 | 1) => {
    try {
      await move(row.id, direction);
    } catch (e) {
      toast((e as Error).message, "error");
    }
  };

  return (
    <div>
      {nested ? (
        <div className="flex items-center justify-between gap-4">
          <p className="label">
            {title} · {rows.length}
          </p>

          <Button
            onClick={() => { setAdding(true); setEditing(null); }}
            disabled={adding}
          >
            <Plus size={12} />
            Add {singular.toLowerCase()}
          </Button>
        </div>
      ) : (
        <PageHeader
          title={title}
          description={description}
          meta={loading ? undefined : `${rows.length} ${rows.length === 1 ? "entry" : "entries"}`}
          action={
            <Button
              variant="primary"
              onClick={() => { setAdding(true); setEditing(null); }}
              disabled={adding}
            >
              <Plus size={12} />
              Add {singular.toLowerCase()}
            </Button>
          }
        />
      )}

      {error && <ErrorNote message={error} />}
      {loading && <Loading />}

      {adding && (
        <div className="mt-6 border border-ink-3 bg-panel p-4 sm:p-5">
          <p className="label mb-4">New {singular.toLowerCase()}</p>

          <RowForm
            fields={fields}
            initial={emptyValues(fields)}
            submitLabel={`Create ${singular.toLowerCase()}`}
            actions={formActions}
            onCancel={() => setAdding(false)}
            onSave={async (values) => {
              await create(values);
              setAdding(false);
              toast(`${singular} created`);
            }}
          />
        </div>
      )}

      {!loading && !error && rows.length === 0 && !adding && (
        <div className="mt-6">
          <EmptyNote>No entries yet.</EmptyNote>
        </div>
      )}

      <ul className={nested ? "mt-3" : "mt-6"}>
        {rows.map((row, i) => {
          const info = summary(row);
          const isEditing = editing === row.id;

          return (
            <li key={row.id} className="border-t border-rule last:border-b">
              <div className="flex items-center gap-3 py-3">
                {info.image && (
                  <img
                    src={info.image}
                    alt=""
                    className="h-10 w-12 shrink-0 border border-rule object-cover"
                  />
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm text-ink">{info.title}</p>
                  {info.subtitle && (
                    <p className="truncate font-mono text-[11px] text-ink-3">
                      {info.subtitle}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-0.5">
                  <IconButton
                    label="Move up"
                    disabled={i === 0}
                    onClick={() => void onMove(row, -1)}
                  >
                    <ChevronUp size={14} />
                  </IconButton>

                  <IconButton
                    label="Move down"
                    disabled={i === rows.length - 1}
                    onClick={() => void onMove(row, 1)}
                  >
                    <ChevronDown size={14} />
                  </IconButton>

                  <IconButton
                    label={isEditing ? "Close" : "Edit"}
                    onClick={() => {
                      setEditing(isEditing ? null : row.id);
                      setAdding(false);
                    }}
                  >
                    <Pencil size={13} />
                  </IconButton>

                  <IconButton label="Delete" danger onClick={() => void onDelete(row)}>
                    <Trash2 size={13} />
                  </IconButton>
                </div>
              </div>

              {isEditing && (
                <div className="border-t border-rule bg-panel p-4 sm:p-5">
                  <RowForm
                    fields={fields}
                    initial={pick(fields, row)}
                    submitLabel="Save changes"
                    actions={formActions}
                    onCancel={() => setEditing(null)}
                    onSave={async (values) => {
                      await update(row.id, values);
                      toast("Saved");
                    }}
                  />

                  {renderChildren && (
                    <div className="mt-7 border-t border-rule pt-5">
                      {renderChildren(row)}
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function pick(fields: FieldDef[], row: Row): FormValues {
  return Object.fromEntries(
    fields.map((f) => [f.name, row[f.name] ?? (f.type === "stringList" ? [] : "")]),
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`p-1.5 text-ink-3 transition-colors disabled:opacity-25 ${
        danger ? "hover:text-rank-gm" : "hover:text-ink"
      } disabled:hover:text-ink-3`}
    >
      {children}
    </button>
  );
}

export function RowForm({
  fields,
  initial,
  submitLabel,
  onSave,
  onCancel,
  actions,
}: {
  fields: FieldDef[];
  initial: FormValues;
  submitLabel: string;
  onSave: (values: FormValues) => Promise<void>;
  onCancel: () => void;
  actions?: FormActions;
}) {
  const [values, setValues] = useState<FormValues>(initial);
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  const dirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(initial),
    [values, initial],
  );

  // Catches tab close and reload. In-app navigation is guarded by the confirm
  // on cancel; BrowserRouter has no route-level blocker to hook into.
  useEffect(() => {
    if (!dirty) return;

    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const cancel = () => {
    if (dirty && !window.confirm("Discard unsaved changes?")) return;
    onCancel();
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);

        try {
          await onSave(toPayload(fields, values));
        } catch (err) {
          // Form state is deliberately preserved so nothing typed is lost.
          toast((err as Error).message, "error");
        } finally {
          setBusy(false);
        }
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={WIDE.has(field.type) ? "sm:col-span-2" : undefined}
          >
            <FieldInput
              field={field}
              value={values[field.name]}
              onChange={(value) =>
                setValues((v) => ({ ...v, [field.name]: value }))
              }
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-rule pt-4">
        <Button type="submit" variant="primary" busy={busy}>
          {submitLabel}
        </Button>

        <Button type="button" onClick={cancel}>
          Cancel
        </Button>

        {actions?.({ values, setValues })}

        {dirty && (
          <span className="font-mono text-[11px] text-ink-3">Unsaved changes</span>
        )}
      </div>
    </form>
  );
}
