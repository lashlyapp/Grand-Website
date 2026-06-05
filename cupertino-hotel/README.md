# The Cupertino Hotel — Website

Marketing website for **The Cupertino Hotel**, Cupertino, CA — directly across
from Apple Park in the heart of Silicon Valley. A faithful recreation of the
current site (cupertino-hotel.com), rebuilt on a self-owned, Vercel-hosted stack
with a modernized UI/UX. Sister property to The Grand Hotel, Sunnyvale (same
design system, separate deployment).

- **Current vendor site:** https://www.cupertino-hotel.com
- **Booking engine (kept as-is):** https://cupertinohotel.reztrip.com

> **Scope:** We are replacing the **marketing website only**. The RezTrip booking
> engine is unchanged — every "Book Now" / "Check Rates" button links into it
> exactly as before (room deep-links preserved via `?selected_room=CODE`, using
> the real Cupertino room codes: EQ, DK, EK, DQ, QH, FP, DS, PK, PQ, KH).

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for the design system
- **Vercel** hosting (Git-connected; pushes auto-deploy with preview URLs)
- Content is **developer-managed** in `content/` — a light CMS can be layered on
  later for specific sections.

## Local development

This site lives in the `cupertino-hotel/` folder of the shared repo. Run all
commands from inside that folder:

```bash
cd cupertino-hotel
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Project structure

```
app/            Routes (one folder per page; paths mirror the live site for SEO)
components/      Header, Footer, BookingBar, RoomCard, UI primitives
content/         site.ts (site-wide data) and rooms.ts (rooms/suites + booking codes)
lib/booking.ts   Builds RezTrip booking-engine URLs
public/images/   Self-hosted media
scripts/         extract-assets.mjs — re-download media from the live site
```

## Media

Homepage marketing images (hero, about, services, amenities) are pulled from the
live Cupertino site into `public/images/` (self-hosted). To re-pull:

```bash
npm run extract-assets
```

All imagery is **real Cupertino photography**, self-hosted in `public/images/`:

- **Room + amenity posters** (`hero`, `lobby`, `pool`, `breakfast`,
  `meeting-room`, `rooms/deluxe-room`, `rooms/executive-suite-king`,
  `rooms/executive-suite-queen`, `rooms/fireplace-parlor`) come from the hotel's
  **MyHotelOps** account (`cdn.myhotelops.com/cg-hotel-group/cupertino-hotel/`,
  file prefix `8583.11604.cupertino.cupertino-hotel`).
- **Supporting gallery shots** (`gallery/c-01..c-09`) come from the property's
  TravelTripper library (`cdn.traveltripper.io/site-assets/362_837_22955`).

**Virtual-tour videos** stream directly from MyHotelOps (not committed) — the
four room tours (`deluxe-room`, `executive-suite-king`, `executive-suite-queen`,
`fireplace-parlor`) are mapped to the booking rooms in `content/rooms.ts` and
play in the room-detail modal. The hotel wordmark is an inline SVG
(`public/images/logotype.svg`).

## Known placeholders / TODO

- **RT3 `hotelId`** in `content/site.ts` (`ttweb.hotelId`) is a placeholder
  (`CACUPH`) — confirm in the Cendyn portal so the live-rate widget loads. The
  new domain may also need cross-origin whitelisting there.
- **Reviews** in the hero are mocked numbers — swap for a live SerpAPI feed.
- **Social handles** default to the CG Hotel Group accounts — confirm
  Cupertino-specific handles.
- **Room media** uses the four real MyHotelOps room tours/posters mapped to the
  ten booking rooms; the per-room mapping is a best-fit (MyHotelOps groups rooms
  into deluxe / executive-king / executive-queen / fireplace).

## Forms / email

The contact, event-inquiry, and newsletter forms post to serverless routes
(`app/api/*`) that send email via the **Resend** API. Configure these env vars
in Vercel (Project → Settings → Environment Variables):

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | **Yes** (to send) | — | Resend API key |
| `CONTACT_TO_EMAIL` | No | `info@cghotelgroup.com` | Where submissions are delivered |
| `CONTACT_FROM_EMAIL` | No | `onboarding@resend.dev` | Verified sender; use a domain address once verified in Resend |

Until `RESEND_API_KEY` is set, the forms gracefully fall back to a `mailto:`
link so submissions are never lost.

## Deployment & DNS cutover

Because this site lives in a subfolder of the shared repo, create a **dedicated
Vercel project** for it:

1. Import the repo into Vercel as a new project.
2. Set the project's **Root Directory** to `cupertino-hotel`.
3. Add `cupertino-hotel.com` as a domain in Vercel (SSL is automatic).
4. In DNS, point the apex + `www` records at Vercel.
   **Leave the MX / email records untouched** so hotel email keeps working.
5. Submit the sitemap in Google Search Console and monitor.
