import ffmpegPath from "ffmpeg-static";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const exec = promisify(execFile);
const FF = ffmpegPath as unknown as string;

export type ExtractedFrame = { buffer: Buffer; timestampSeconds: number };

// ffmpeg prints stream metadata (incl. Duration) to stderr and exits non-zero
// when no output file is given — that's expected; we parse the duration out.
async function probeDuration(file: string): Promise<number> {
  try {
    await exec(FF, ["-hide_banner", "-i", file], { maxBuffer: 1 << 24 });
  } catch (e: unknown) {
    const stderr = String((e as { stderr?: unknown })?.stderr ?? "");
    const m = stderr.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
    if (m) return Number(m[1]) * 3600 + Number(m[2]) * 60 + parseFloat(m[3]);
  }
  return 0;
}

// Evenly spaced sample points, padded away from the very start/end so we skip
// intro/outro black frames.
function framePercents(count: number): number[] {
  if (count <= 1) return [0.5];
  const lo = 0.15;
  const hi = 0.85;
  return Array.from(
    { length: count },
    (_, i) => lo + ((hi - lo) * i) / (count - 1),
  );
}

// The video's FIRST frame — used as the automatic cover whenever a room's tour
// video is set or replaced (see setCoverFromVideoFirstFrame in rooms/actions),
// so the thumbnail always matches the opening shot of the tour.
export async function extractFirstFrame(
  videoUrl: string,
  opts: { width?: number } = {},
): Promise<Buffer> {
  const width = opts.width ?? 1600;
  const dir = await mkdtemp(join(tmpdir(), "first-frame-"));
  const videoFile = join(dir, "video.mp4");
  try {
    const res = await fetch(videoUrl);
    if (!res.ok) throw new Error(`Could not fetch video (${res.status})`);
    await writeFile(videoFile, Buffer.from(await res.arrayBuffer()));

    const out = join(dir, "first.jpg");
    await exec(
      FF,
      ["-y", "-i", videoFile, "-frames:v", "1", "-q:v", "3", "-vf", `scale=${width}:-2`, out],
      { maxBuffer: 1 << 24 },
    );
    return await readFile(out);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

// Downloads the video to a temp file, then extracts `count` JPEG frames with the
// bundled static ffmpeg. We fetch the file ourselves (rather than letting ffmpeg
// open the URL) because the CDN has no CORS and ffmpeg's HTTP layer is
// unreliable across runtimes; a full download is simple and robust.
export async function extractFrames(
  videoUrl: string,
  opts: { count?: number; width?: number } = {},
): Promise<ExtractedFrame[]> {
  const count = opts.count ?? 3;
  const width = opts.width ?? 1600;
  const dir = await mkdtemp(join(tmpdir(), "frames-"));
  const videoFile = join(dir, "video.mp4");
  try {
    const res = await fetch(videoUrl);
    if (!res.ok) throw new Error(`Could not fetch video (${res.status})`);
    await writeFile(videoFile, Buffer.from(await res.arrayBuffer()));

    const duration = await probeDuration(videoFile);
    const frames: ExtractedFrame[] = [];
    for (const pct of framePercents(count)) {
      const t = duration > 0 ? Number((duration * pct).toFixed(2)) : pct * 10;
      const out = join(dir, `f-${Math.round(pct * 100)}.jpg`);
      await exec(
        FF,
        [
          "-y",
          "-ss",
          String(t),
          "-i",
          videoFile,
          "-frames:v",
          "1",
          "-q:v",
          "3",
          "-vf",
          `scale=${width}:-2`,
          out,
        ],
        { maxBuffer: 1 << 24 },
      );
      frames.push({ buffer: await readFile(out), timestampSeconds: t });
    }
    return frames;
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
