import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Service-role client for trusted server-only use (bypasses RLS). No user session. */
export function createAdminClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
