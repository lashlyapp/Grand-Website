#!/usr/bin/env node
/**
 * Asset extraction helper — The Cupertino Hotel.
 *
 * Downloads media from the current Cupertino Hotel site (and its TravelTripper
 * asset CDN) into ./public/images so the rebuilt site is fully self-hosted.
 * Re-run as you discover more asset URLs, then commit the results.
 *
 * Usage:  node scripts/extract-assets.mjs
 *
 * Sources:
 * - https://www.cupertino-hotel.com/images/...           (homepage marketing art)
 * - https://cdn.traveltripper.io/site-assets/362_837_22955 (Cupertino property
 *   photo library — folder id 362_837_22955 is Cupertino's, distinct from the
 *   Grand's 362_543_22953)
 * - res.cloudinary.com/traveltripperweb                  (feature photo)
 *
 * The wordmark is the property's official vector logo, self-hosted as SVG:
 * - logotype.svg / logotype-white.svg — white fill, for the dark header/footer
 * - logotype-black.svg                — black fill, for light backgrounds
 * (sourced from cupertino-hotel.com/images/logotype{,-black}.svg).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const OUT = join(process.cwd(), "public", "images");
const SITE = "https://www.cupertino-hotel.com/images";
const CDN = "https://cdn.traveltripper.io/site-assets/362_837_22955/media";
// MyHotelOps (Cloudflare R2) CDN — the property's real photo/video library.
const MHO =
  "https://cdn.myhotelops.com/cg-hotel-group/cupertino-hotel/8583.11604.cupertino.cupertino-hotel";

// Key = local filename used by the app, value = source URL on the live site.
const ASSETS = {
  // Homepage marketing images.
  "suites.jpg": `${SITE}/suites.png`,
  "about_1.jpg": `${SITE}/about_1.jpg`,
  "about_2.jpg": `${SITE}/about_2.png`,
  "amenities.jpg": `${SITE}/amenities.png`,
  "services-first.jpg": `${SITE}/services-first.jpg`,
  "services-second.jpg": `${SITE}/services-second.jpg`,
  // Page hero banners.
  "rooms-theme.jpg": `${SITE}/rooms-theme.jpg`,
  "gallery-theme.jpg": `${SITE}/gallery-theme.jpg`,
  "heated-pool.jpg": `${SITE}/services-second.jpg`,

  // Cupertino property photo library (real photos) → gallery/c-01..c-09.
  "gallery/c-01.jpg": `${CDN}/2019-01-22-071554/large_services-1.jpg`,
  "gallery/c-02.jpg": `${CDN}/2019-01-22-071714/large_services-2.jpg`,
  "gallery/c-03.jpg": `${CDN}/2019-01-22-071917/large_services-3.jpg`,
  "gallery/c-04.jpg": `${CDN}/2019-01-22-072003/large_services-4.jpg`,
  "gallery/c-05.jpg": `${CDN}/2019-01-22-072055/large_services-5.jpg`,
  "gallery/c-06.jpg": `${CDN}/2019-01-22-072401/large_services-6.jpg`,
  "gallery/c-07.jpg": `${CDN}/2019-01-22-072506/large_services-7.jpg`,
  "gallery/c-08.jpg": `${CDN}/2019-01-22-072608/large_services-8.jpg`,
  "gallery/c-09.jpg": `${CDN}/2019-01-22-072651/large_services-9.jpg`,

  // Feature photo (Cloudinary).
  "feature.jpg":
    "https://res.cloudinary.com/traveltripperweb/image/upload/c_limit,f_auto,h_2500,q_auto,w_2500/v1624043137/kzm6gsf5gtszmdnqpxy9.jpg",

  // --- MyHotelOps poster stills (real Cupertino photography) ---------------
  // The hotel's MyHotelOps account (cg-hotel-group/cupertino-hotel) holds the
  // real room + amenity media. Each tour video has a matching .jpg poster; we
  // self-host the posters here and stream the .mp4 tours directly (see
  // content/rooms.ts). File prefix: 8583.11604.cupertino.cupertino-hotel.
  "hero.jpg": `${MHO}.hero.jpg`,
  "lobby.jpg": `${MHO}.other.lobby-reception.jpg`,
  "overview.jpg": `${MHO}.overview.jpg`,
  "overview-2.jpg": `${MHO}.premium-overview.jpg`,
  "pool.jpg": `${MHO}.amenity.swimming-pool.jpg`,
  "breakfast.jpg": `${MHO}.amenity.breakfast-restaurant-bar.jpg`,
  "meeting-room.jpg": `${MHO}.amenity.meeting-room.jpg`,
  "rooms/deluxe-room.jpg": `${MHO}.room.deluxe-room.jpg`,
  "rooms/executive-suite-king.jpg": `${MHO}.room.executive-suite-king.jpg`,
  "rooms/executive-suite-queen.jpg": `${MHO}.room.executive-suite-queen.jpg`,
  "rooms/fireplace-parlor.jpg": `${MHO}.room.fireplace-parlor.jpg`,
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
