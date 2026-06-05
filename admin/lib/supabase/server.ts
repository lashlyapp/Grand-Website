import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function env() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. Copy admin/.env.example to admin/.env.local.",
    );
  }
  return { url, key };
}

// Cookie-bound server client. Reads use RLS public-read; writes require the
// signed-in admin's session (carried in cookies). Token refresh writes cookies,
// which throws inside a Server Component render — that's expected and harmless
// because the middleware refreshes the session on every request.
export function createSupabaseServerClient() {
  const { url, key } = env();
  const cookieStore = cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Component context — ignore; middleware handles refresh.
        }
      },
    },
  });
}
