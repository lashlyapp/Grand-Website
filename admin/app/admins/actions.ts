"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSuperAdmin } from "@/lib/auth";

// Only company addresses can be invited; superadmins are managed in SQL.
const ALLOWED_DOMAIN = "@cghotelgroup.com";

// Adds an email to the admin list. No invite email is sent — the person signs
// in at /login with their address and receives a magic link. RLS enforces the
// same rules (superadmin only, admin role only, company domain only).
export async function inviteAdmin(formData: FormData) {
  if (!(await isSuperAdmin())) throw new Error("Not authorized");

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!email.endsWith(ALLOWED_DOMAIN)) {
    throw new Error(`Admin access is limited to ${ALLOWED_DOMAIN} addresses.`);
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("admins")
    .insert({ email, role: "admin" });
  if (error) throw new Error(`Invite failed: ${error.message}`);
  revalidatePath("/admins");
}

// Removes an admin. Superadmin rows can't be deleted through the API at all
// (RLS), so the two superadmins can't lock each other (or themselves) out.
export async function removeAdmin(formData: FormData) {
  if (!(await isSuperAdmin())) throw new Error("Not authorized");

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("admins")
    .delete()
    .eq("email", email)
    .eq("role", "admin");
  if (error) throw new Error(`Remove failed: ${error.message}`);
  revalidatePath("/admins");
}
