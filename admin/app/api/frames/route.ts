import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/auth";
import { extractFrames } from "@/lib/frames";

// Node runtime (child_process + the static ffmpeg binary). Allow up to a minute
// for the download + extraction.
export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const BUCKET = "room-media";

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const roomId = String(body.roomId ?? "");
  const videoUrl = String(body.videoUrl ?? "");
  if (!roomId || !videoUrl) {
    return NextResponse.json(
      { error: "roomId and videoUrl are required" },
      { status: 400 },
    );
  }

  let frames;
  try {
    frames = await extractFrames(videoUrl, { count: 3 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json(
      { error: `Frame extraction failed: ${message}` },
      { status: 500 },
    );
  }

  const supabase = createSupabaseServerClient();

  // Replace any previous candidates for this room.
  await supabase.from("room_frames").delete().eq("room_id", roomId);

  const saved: { url: string; timestamp_seconds: number }[] = [];
  for (let i = 0; i < frames.length; i++) {
    const path = `rooms/${roomId}/frame-${i}.jpg`;
    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(path, frames[i].buffer, {
        contentType: "image/jpeg",
        upsert: true,
      });
    if (upErr) {
      return NextResponse.json(
        { error: `Upload failed: ${upErr.message}` },
        { status: 500 },
      );
    }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    // Cache-bust so a regenerated frame at the same path shows immediately.
    saved.push({
      url: `${data.publicUrl}?v=${Date.now()}`,
      timestamp_seconds: frames[i].timestampSeconds,
    });
  }

  const { error: insErr } = await supabase.from("room_frames").insert(
    saved.map((f) => ({
      room_id: roomId,
      url: f.url,
      timestamp_seconds: f.timestamp_seconds,
      selected: false,
    })),
  );
  if (insErr) {
    return NextResponse.json(
      { error: `Saving frames failed: ${insErr.message}` },
      { status: 500 },
    );
  }

  return NextResponse.json({ frames: saved });
}
