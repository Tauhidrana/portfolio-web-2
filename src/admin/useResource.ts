import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export type Row = Record<string, unknown> & { id: string; sort_order: number };

/** Scopes a child list to its parent row (rating bands, event photos). */
export interface Parent {
  column: string;
  id: string;
}

/**
 * CRUD plus ordering for any of the ordered list tables. Every list page runs
 * on this; the table name and the field config are the only things that differ.
 */
export function useResource<T extends Row>(table: string, parent?: Parent) {
  // Pulled apart so the effect and callbacks depend on stable primitives
  // rather than an object literal that is new on every render.
  const parentColumn = parent?.column;
  const parentId = parent?.id;

  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Identifies which query the rows in state belong to.
   *
   * Every list page renders the same ResourceEditor, so React reuses the
   * component across routes: `table` changes while `rows` still holds the
   * previous table's records. Rendering those against the new page's field
   * config crashes it. Comparing the loaded key against the current one makes
   * that mismatch impossible to observe, rather than relying on an effect
   * winning a race.
   */
  const queryKey = `${table}|${parentColumn ?? ""}|${parentId ?? ""}`;
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  const load = useCallback(async () => {
    let query = supabase.from(table).select("*");
    if (parentColumn && parentId) query = query.eq(parentColumn, parentId);

    const { data, error } = await query.order("sort_order", { ascending: true });

    if (error) setError(error.message);
    else {
      setRows((data ?? []) as T[]);
      setError(null);
    }

    setLoadedKey(`${table}|${parentColumn ?? ""}|${parentId ?? ""}`);
    setLoading(false);
  }, [table, parentColumn, parentId]);

  /** Manual refresh: shows the spinner again. */
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

  const create = useCallback(
    async (values: Record<string, unknown>) => {
      const sort_order = rows.length
        ? Math.max(...rows.map((r) => r.sort_order)) + 1
        : 0;

      const { error } = await supabase.from(table).insert({
        ...values,
        sort_order,
        ...(parentColumn && parentId ? { [parentColumn]: parentId } : {}),
      });

      if (error) throw new Error(error.message);
      await load();
    },
    [table, rows, load, parentColumn, parentId],
  );

  const update = useCallback(
    async (id: string, values: Record<string, unknown>) => {
      const { error } = await supabase.from(table).update(values).eq("id", id);
      if (error) throw new Error(error.message);
      await load();
    },
    [table, load],
  );

  const remove = useCallback(
    async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw new Error(error.message);
      await load();
    },
    [table, load],
  );

  /**
   * Rewrites sort_order for the whole list rather than swapping the two
   * affected rows, so gaps and duplicates left by earlier edits get normalised
   * on the way through.
   *
   * ponytail: one UPDATE per row. Lists here are under ten items; if one ever
   * grows past a few dozen, batch this into a single upsert.
   */
  const move = useCallback(
    async (id: string, direction: -1 | 1) => {
      const index = rows.findIndex((r) => r.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= rows.length) return;

      const reordered = [...rows];
      [reordered[index], reordered[target]] = [reordered[target], reordered[index]];

      const changed = reordered
        .map((row, i) => ({ row, i }))
        .filter(({ row, i }) => row.sort_order !== i);

      setRows(reordered.map((row, i) => ({ ...row, sort_order: i })));

      for (const { row, i } of changed) {
        const { error } = await supabase
          .from(table)
          .update({ sort_order: i })
          .eq("id", row.id);

        if (error) {
          await load();
          throw new Error(error.message);
        }
      }
    },
    [table, rows, load],
  );

  // Rows loaded for a different query are never handed out: the page shows its
  // loading state instead of another table's records.
  const fresh = loadedKey === queryKey;

  return {
    rows: fresh ? rows : [],
    loading: loading || !fresh,
    error: fresh ? error : null,
    create,
    update,
    remove,
    move,
    reload,
  };
}

/**
 * The two single-row tables (profile, education). The id = 1 check constraint
 * guarantees there is exactly one row, so this never has to look one up.
 */
export function useSingleton<T extends Record<string, unknown>>(table: string) {
  const [row, setRow] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (error) setError(error.message);
    else {
      setRow(data as T | null);
      setError(null);
    }

    setLoading(false);
  }, [table]);

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

  const save = useCallback(
    async (values: Record<string, unknown>) => {
      // id is part of the payload, so this updates the existing row rather than
      // inserting a second one -- which the id = 1 check would reject anyway.
      const { error } = await supabase.from(table).upsert({ ...values, id: 1 });

      if (error) throw new Error(error.message);
      await load();
    },
    [table, load],
  );

  return { row, loading, error, save, reload };
}
