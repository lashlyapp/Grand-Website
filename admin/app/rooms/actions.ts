"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePublicSites } from "@/lib/revalidate";
import { extractFirstFrame } from "@/lib/frames";
import type { RoomCategory } from "@/lib/types";

const CATEGORIES: RoomCategory[] = ["room", "villa", "suite"];
const BUCKET = "room-media";

// Whenever a room's tour video is set or replaced, the cover automatically
// becomes the video's FIRST frame, so the thumbnail always matches the opening
// shot of the tour. Best-effort: a failure here never blocks the save (the
// previous cover simply stays, and the CoverPicker can regenerate manually).
async function setCoverFromVideoFirstFrame(roomId: string, videoUrl: string) {
  const supabase = createSupabaseServerClient();
  try {
    const buffer = await extractFirstFrame(videoUrl);
    const path = `rooms/${roomId}/cover-first-frame.jpg`;
    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(path, buffer, { contentType: "image/jpeg", upsert: true });
    if (upErr) throw new Error(upErr.message);
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    // Cache-bust so a regenerated frame at the same path shows immediately.
    await supabase
      .from("rooms")
      .update({ cover_image_url: `${data.publicUrl}?v=${Date.now()}` })
      .eq("id", roomId);
  } catch (e) {
    console.error(`Auto cover from video first frame failed (room ${roomId}):`, e);
  }
}

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
  const parsed = parseRoom(formData);
  const { data: prev } = await supabase
    .from("rooms")
    .select("video_url")
    .eq("id", id)
    .maybeSingle();
  const { error } = await supabase.from("rooms").update(parsed).eq("id", id);
  if (error) throw new Error(`Update failed: ${error.message}`);
  // New or changed tour video → cover inherits its first frame.
  if (parsed.video_url && parsed.video_url !== prev?.video_url) {
    await setCoverFromVideoFirstFrame(id, parsed.video_url);
  }
  revalidatePath("/rooms");
  await revalidatePublicSites();
  redirect("/rooms");
}

export async function createRoom(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const hotel_id = String(formData.get("hotel_id") ?? "").trim();
  const parsed = parseRoom(formData);
  const { data: created, error } = await supabase
    .from("rooms")
    .insert({ hotel_id, ...parsed })
    .select("id")
    .single();
  if (error) throw new Error(`Create failed: ${error.message}`);
  // New room with a tour video → cover starts as the video's first frame.
  if (created && parsed.video_url) {
    await setCoverFromVideoFirstFrame(created.id, parsed.video_url);
  }
  revalidatePath("/rooms");
  await revalidatePublicSites();
  redirect("/rooms");
}

export async function deleteRoom(id: string) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("rooms").delete().eq("id", id);
  if (error) throw new Error(`Delete failed: ${error.message}`);
  revalidatePath("/rooms");
  await revalidatePublicSites();
  redirect("/rooms");
}

// Picks one of the generated frames (or any URL) as the room's cover.
export async function selectCover(roomId: string, url: string) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("rooms")
    .update({ cover_image_url: url })
    .eq("id", roomId);
  if (error) throw new Error(`Set cover failed: ${error.message}`);

  await supabase.from("room_frames").update({ selected: false }).eq("room_id", roomId);
  await supabase
    .from("room_frames")
    .update({ selected: true })
    .eq("room_id", roomId)
    .eq("url", url);

  revalidatePath("/rooms");
  revalidatePath(`/rooms/${roomId}/edit`);
  await revalidatePublicSites();
}
