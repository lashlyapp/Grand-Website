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

  // Room photos (Cloudinary, Cendyn-hosted) — extracted for self-hosting.
  "rooms/room-01.jpg":
    "https://res.cloudinary.com/traveltripperweb/image/upload/c_fit,h_1200,w_1200/v1551791329/i9g8ketjhzv4go3cpa9v.jpg",
  "rooms/room-02.jpg":
    "https://res.cloudinary.com/traveltripperweb/image/upload/c_fit,h_1200,w_1200/v1551791329/oj5stab3kadhrcl0hxym.jpg",
  "rooms/room-03.jpg":
    "https://res.cloudinary.com/traveltripperweb/image/upload/c_fit,h_1200,w_1200/v1551791330/tkozneepp7o1jgrqyl36.jpg",
  "rooms/room-04.jpg":
    "https://res.cloudinary.com/traveltripperweb/image/upload/c_fit,h_1200,w_1200/v1559045662/exfjectwhfrhhlbnplq3.jpg",
  "rooms/room-05.jpg":
    "https://res.cloudinary.com/traveltripperweb/image/upload/c_fit,h_1200,w_1200/v1559045662/np9biolldkylptpdpvol.jpg",
  "rooms/room-06.jpg":
    "https://res.cloudinary.com/traveltripperweb/image/upload/c_fit,h_1200,w_1200/v1559045663/norpmhrcfep3xdr8yhjf.jpg",
  "rooms/room-07.jpg":
    "https://res.cloudinary.com/traveltripperweb/image/upload/c_fit,h_1200,w_1200/v1568885707/emy99zgizhcn1oioycqf.jpg",
  "rooms/room-08.jpg":
    "https://res.cloudinary.com/traveltripperweb/image/upload/c_fit,h_1200,w_1200/v1568886836/dqw9ugmale2suwr3qr06.jpg",

  // Room stills from the MyHotelOps CDN — these match the per-room tour videos
  // (same source the current site uses) and serve as posters / lead photos.
  "rooms/tour-deluxe-king.jpg":
    "https://cdn.myhotelops.com/cg-hotel-group/grand-hotel/8582.11603.sunnyvale.grand-hotel-sunnyvale.room.deluxe-standard-king.jpg",
  "rooms/tour-deluxe-room.jpg":
    "https://cdn.myhotelops.com/cg-hotel-group/grand-hotel/8582.11603.sunnyvale.grand-hotel-sunnyvale.room.deluxe-standard-room.jpg",
  "rooms/tour-villa-king.jpg":
    "https://cdn.myhotelops.com/cg-hotel-group/grand-hotel/8582.11603.sunnyvale.grand-hotel-sunnyvale.room.villa-1-king.jpg",
  "rooms/tour-villa-queen.jpg":
    "https://cdn.myhotelops.com/cg-hotel-group/grand-hotel/8582.11603.sunnyvale.grand-hotel-sunnyvale.room.villa-2-queen.jpg",

  // Gallery photos (Travel Tripper / Cendyn CDN) — extracted for self-hosting.
  "gallery/gallery-05.jpg":
    "https://cdn.traveltripper.io/site-assets/362_543_22953/media/2019-01-23-024410/large_gallery5-large.jpg",
  "gallery/gallery-06.jpg":
    "https://cdn.traveltripper.io/site-assets/362_543_22953/media/2019-01-23-024409/large_gallery6-large.jpg",
  "gallery/gallery-07.jpg":
    "https://cdn.traveltripper.io/site-assets/362_543_22953/media/2019-01-23-024408/large_gallery7-large.jpg",
  "gallery/gallery-08.jpg":
    "https://cdn.traveltripper.io/site-assets/362_543_22953/media/2019-01-23-024407/large_gallery8-large.jpg",
  "gallery/gallery-09.jpg":
    "https://cdn.traveltripper.io/site-assets/362_543_22953/media/2019-01-23-024406/large_gallery9-large.jpg",
  "gallery/gallery-10.jpg":
    "https://cdn.traveltripper.io/site-assets/362_543_22953/media/2019-01-23-024404/large_gallery10-large.jpg",
  "gallery/gallery-14.jpg":
    "https://cdn.traveltripper.io/site-assets/362_543_22953/media/2019-01-23-024358/large_gallery14-large.jpg",
  "gallery/gallery-15.jpg":
    "https://cdn.traveltripper.io/site-assets/362_543_22953/media/2019-01-23-024357/large_gallery15-large.jpg",
  "gallery/gallery-16.jpg":
    "https://cdn.traveltripper.io/site-assets/362_543_22953/media/2019-01-23-024355/large_gallery16-large.jpg",
  "gallery/gallery-17.jpg":
    "https://cdn.traveltripper.io/site-assets/362_543_22953/media/2019-01-23-024354/large_gallery17-large.jpg",
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
