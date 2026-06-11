"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { selectCover } from "@/app/rooms/actions";

type Frame = { url: string; timestamp_seconds: number };

// Update-video → capture-3-frames → pick-a-cover, à la YouTube/TikTok. The
// frames are generated server-side (ffmpeg) and uploaded to Storage; choosing
// one sets the room's cover_image_url.
export default function CoverPicker({
  roomId,
  videoUrl,
  cover,
  initialFrames,
}: {
  roomId: string;
  videoUrl: string | null;
  cover: string | null;
  initialFrames: Frame[];
}) {
  const router = useRouter();
  const [frames, setFrames] = useState<Frame[]>(initialFrames);
  const [busy, setBusy] = useState(false);
  const [choosing, setChoosing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/frames", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, videoUrl }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to generate frames");
      setFrames(json.frames as Frame[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function choose(url: string) {
    setChoosing(url);
    try {
      await selectCover(roomId, url);
      router.refresh();
    } finally {
      setChoosing(null);
    }
  }

  return (
    <div className="rounded-lg border border-ink/10 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">Cover image</h2>
          <p className="mt-1 text-sm text-ink/60">
            The cover is set automatically to the tour video&rsquo;s first frame
            whenever the video changes. To use a different moment instead,
            capture 3 stills and pick one.
          </p>
        </div>
        <button
          type="button"
          onClick={generate}
          disabled={busy || !videoUrl}
          title={videoUrl ? "" : "Add a tour video URL and save first"}
          className="shrink-0 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink/90 disabled:opacity-50"
        >
          {busy
            ? "Capturing…"
            : frames.length
              ? "Regenerate frames"
              : "Capture 3 frames"}
        </button>
      </div>

      {!videoUrl && (
        <p className="mt-3 text-xs text-ink/50">
          This room has no tour video yet. Add a video URL in the form below and
          save, then capture frames.
        </p>
      )}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {/* Current cover */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-xs uppercase tracking-wide text-ink/40">
          Current
        </span>
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt="Current cover"
            className="h-16 w-28 rounded object-cover ring-1 ring-ink/10"
          />
        ) : (
          <span className="text-sm text-ink/40">none</span>
        )}
      </div>

      {/* Candidate frames */}
      {frames.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-xs uppercase tracking-wide text-ink/40">
            Candidates — click to set as cover
          </p>
          <div className="grid grid-cols-3 gap-3">
            {frames.map((f) => {
              const isCurrent = cover === f.url;
              return (
                <button
                  key={f.url}
                  type="button"
                  onClick={() => choose(f.url)}
                  disabled={choosing !== null}
                  className={`group relative overflow-hidden rounded-lg ring-2 transition ${
                    isCurrent ? "ring-gold" : "ring-transparent hover:ring-ink/20"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.url}
                    alt={`Frame at ${f.timestamp_seconds}s`}
                    className="aspect-video w-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                    {f.timestamp_seconds}s
                  </span>
                  {isCurrent && (
                    <span className="absolute left-1 top-1 rounded bg-gold px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      Cover
                    </span>
                  )}
                  {choosing === f.url && (
                    <span className="absolute inset-0 grid place-items-center bg-white/60 text-xs">
                      Setting…
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
