#!/usr/bin/env node
/**
 * Asset extraction helper — The Cupertino Hotel.
 *
 * Downloads media from the current Cupertino Hotel site into ./public/images so
 * the rebuilt site is fully self-hosted. Re-run as you discover more asset URLs
 * (e.g. real room and gallery photos), then commit the results.
 *
 * Usage:  node scripts/extract-assets.mjs
 *
 * Notes:
 * - We save the homepage marketing images under the local filenames the code
 *   already references (e.g. Cupertino's suites.png is saved as suites.jpg).
 * - The site logo is a wordmark we render as an inline SVG (public/images/
 *   logotype.svg) so it reads cleanly on the dark header/footer. We deliberately
 *   do NOT overwrite it with the source logo, which is dark and built for a
 *   light background.
 * - Room and gallery photos: the originals live on the RezTrip/Cendyn booking
 *   CDN and aren't trivially enumerable. The room-*.jpg / gallery-*.jpg files
 *   currently in public/images are generic placeholders — drop real Cupertino
 *   photos in under the same filenames as they become available.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const OUT = join(process.cwd(), "public", "images");
const SRC = "https://www.cupertino-hotel.com/images";

// Key = local filename used by the app, value = source URL on the live site.
const ASSETS = {
  "suites.jpg": `${SRC}/suites.png`,
  "about_1.jpg": `${SRC}/about_1.jpg`,
  "about_2.jpg": `${SRC}/about_2.png`,
  "amenities.jpg": `${SRC}/amenities.png`,
  "services-first.jpg": `${SRC}/services-first.jpg`,
  "services-second.jpg": `${SRC}/services-second.jpg`,
  // No dedicated pool image on the source site — reuse a services photo for the
  // dark "central location" strip until a real pool photo is supplied.
  "heated-pool.jpg": `${SRC}/services-second.jpg`,
};

async function download(name, url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = join(OUT, name);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return buf.length;
}

const entries = Object.entries(ASSETS);
let ok = 0;
for (const [name, url] of entries) {
  try {
    const bytes = await download(name, url);
    console.log(`✓ ${name} (${bytes.toLocaleString()} bytes)`);
    ok++;
  } catch (err) {
    console.error(`✗ ${name}: ${err.message}`);
  }
}
console.log(`\nDone: ${ok}/${entries.length} assets saved to public/images/`);
