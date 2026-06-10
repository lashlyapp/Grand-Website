import { createSupabaseServerClient } from "./supabase/server";

export async function getUser() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// True only if the signed-in user's email is listed in public.admins. Access
// is keyed by verified email (magic-link sign-in), so invitees are admins
// before their first sign-in. The check runs in the database (is_admin()).
export async function isAdmin(): Promise<boolean> {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.rpc("is_admin");
  return !!data;
}

// Superadmins (role = 'superadmin' in public.admins) can invite and remove
// admins; regular admins only manage content.
export async function isSuperAdmin(): Promise<boolean> {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.rpc("is_superadmin");
  return !!data;
}
