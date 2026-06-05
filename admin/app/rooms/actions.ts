"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { RoomCategory } from "@/lib/types";

const CATEGORIES: RoomCategory[] = ["room", "villa", "suite"];

// Textareas hold one value per line (features, gallery).
function lines(v: FormDataEntryValue | null): string[] {
  return String(v ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseRoom(formData: FormData) {
  const category = String(formData.get("category") ?? "room") as RoomCategory;
  return {
    code: String(formData.get("code") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    category: CATEGORIES.includes(category) ? category : "room",
    beds: String(formData.get("beds") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    features: lines(formData.get("features")),
    gallery: lines(formData.get("gallery")),
    video_url: String(formData.get("video_url") ?? "").trim() || null,
    cover_image_url: String(formData.get("cover_image_url") ?? "").trim() || null,
    accessible: formData.get("accessible") === "on",
    pet_friendly: formData.get("pet_friendly") === "on",
    published: formData.get("published") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function updateRoom(id: string, formData: FormData) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("rooms")
    .update(parseRoom(formData))
    .eq("id", id);
  if (error) throw new Error(`Update failed: ${error.message}`);
  revalidatePath("/rooms");
  redirect("/rooms");
}

export async function createRoom(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const hotel_id = String(formData.get("hotel_id") ?? "").trim();
  const { error } = await supabase
    .from("rooms")
    .insert({ hotel_id, ...parseRoom(formData) });
  if (error) throw new Error(`Create failed: ${error.message}`);
  revalidatePath("/rooms");
  redirect("/rooms");
}

export async function deleteRoom(id: string) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("rooms").delete().eq("id", id);
  if (error) throw new Error(`Delete failed: ${error.message}`);
  revalidatePath("/rooms");
  redirect("/rooms");
}
