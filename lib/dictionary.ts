import "server-only";

import { createAdminClient } from "@/utils/supabase/admin";

type DictionaryRow = {
  key: string;
  value: string | null;
};

function isBlank(value: string | null | undefined): boolean {
  return typeof value !== "string" || value.trim().length === 0;
}

export async function getDictionaryValue(key: string): Promise<string> {
  const values = await getDictionaryValues([key]);
  return values[key] ?? key;
}

export async function getDictionaryValues(
  keys: readonly string[],
): Promise<Record<string, string>> {
  const uniqueKeys = Array.from(new Set(keys.filter(Boolean)));
  if (uniqueKeys.length === 0) return {};

  const supabase = createAdminClient();
  if (!supabase) {
    return Object.fromEntries(uniqueKeys.map((key) => [key, key]));
  }

  const { data, error } = await supabase
    .from("dictionary")
    .select("key, value")
    .in("key", uniqueKeys);

  if (error) {
    console.error("[dictionary]", error.message);
    return Object.fromEntries(uniqueKeys.map((key) => [key, key]));
  }

  const rows = (data ?? []) as DictionaryRow[];
  const valuesByKey = new Map(rows.map((row) => [row.key, row.value]));

  return Object.fromEntries(
    uniqueKeys.map((key) => {
      const value = valuesByKey.get(key);
      return [key, isBlank(value) ? key : value];
    }),
  );
}

export function interpolateDictionaryValue(
  template: string,
  replacements: Record<string, string | number>,
): string {
  return Object.entries(replacements).reduce((result, [name, value]) => {
    return result.replaceAll(`{${name}}`, String(value));
  }, template);
}
