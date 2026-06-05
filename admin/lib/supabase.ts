import { createClient } from "@supabase/supabase-js";

// Read-only client for server components, using the public (anon/publishable)
// key. Table access is governed by RLS: anyone may SELECT; writes require an
// authenticated admin (added in Phase 1 with @supabase/ssr + a session).
export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. Copy admin/.env.example to admin/.env.local.",
    );
  }
  return createClient(url, anonKey, { auth: { persistSession: false } });
}
