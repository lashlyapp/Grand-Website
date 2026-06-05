import { createSupabaseServerClient } from "./supabase/server";

export async function getUser() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// True only if the signed-in user is listed in public.admins. RLS lets a user
// read their own admin row (or none), so a non-admin simply gets back nothing.
export async function isAdmin(): Promise<boolean> {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  const { data } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  return !!data;
}
