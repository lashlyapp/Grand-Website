#!/usr/bin/env node
/**
 * Asset extraction helper.
 *
 * Downloads media currently served from the old vendor (Cendyn) CDNs and from
 * the live site into ./public/images so the new site is fully self-hosted and
 * no longer depends on Cendyn. Re-run as you discover more asset URLs (e.g.
 * room photos), then commit the results.
 *
 * Usage:  node scripts/extract-assets.mjs
 *
 * After download, upload the same files to the MyHotelOps Cloudflare account if
 * you prefer to serve them from there; update references accordingly.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const OUT = join(process.cwd(), "public", "images");

// Add/adjust as assets are discovered. Key = local filename, value = source URL.
const ASSETS = {
  "the-grand-logo.png": "https://www.svgrandhotel.com/images/the-grand-logo.png",
  "the-grand-logo-black.png": "https://www.svgrandhotel.com/images/the-grand-logo-black.png",
  "about_1.jpg": "https://www.svgrandhotel.com/images/about_1.jpg",
  "about_2.jpg": "https://www.svgrandhotel.com/images/about_2.jpg",
  "suites.jpg": "https://www.svgrandhotel.com/images/suites.jpg",
  "services-first.jpg": "https://www.svgrandhotel.com/images/services-first.jpg",
  "services-second.jpg": "https://www.svgrandhotel.com/images/services-second.jpg",
  "amenities.jpg": "https://www.svgrandhotel.com/images/amenities.jpg",
  "heated-pool.jpg": "https://www.svgrandhotel.com/images/heated-pool.jpg",
  "CG-white.svg": "https://www.svgrandhotel.com/images/CG-white.svg",
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
