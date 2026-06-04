# The Grand Hotel — Website

Marketing website for **The Grand Hotel**, Sunnyvale, CA (Silicon Valley).
Rebuilt to move off the current vendor (Cendyn) onto a self-owned, Vercel-hosted
stack with a modernized UI/UX.

- **Current vendor site:** https://www.svgrandhotel.com
- **Booking engine (kept as-is):** https://svgrandhotel.reztrip.com

> **Scope:** We are replacing the **marketing website only**. The RezTrip booking
> engine is unchanged — every "Book Now" / "Check Rates" button links into it
> exactly as before (room deep-links preserved via `?selected_room=CODE`).

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for the design system
- **Vercel** hosting (Git-connected; pushes auto-deploy with preview URLs)
- Content is **developer-managed** in `content/` (MDX/JSON-style data) — a light
  CMS can be layered on later for specific sections.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Project structure

```
app/            Routes (one folder per page; paths mirror the old site for SEO)
components/      Header, Footer, BookingBar, RoomCard, UI primitives
content/         site.ts (site-wide data) and rooms.ts (rooms/villas + booking codes)
lib/booking.ts   Builds RezTrip booking-engine URLs
public/images/   Self-hosted media (extracted off Cendyn — see below)
scripts/         extract-assets.mjs — re-download media from source
docs/PROPOSAL.md The migration review & plan
```

## Media / getting off Cendyn

All images were extracted from the Cendyn-hosted CDNs and now live in
`public/images/` (self-hosted). To re-pull or add more assets:

```bash
npm run extract-assets
```

Videos remain served from the **MyHotelOps Cloudflare** account (not Cendyn).
Per-room virtual-tour videos stream from `cdn.myhotelops.com`.

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

1. Import this repo into Vercel; it auto-detects Next.js.
2. Add `svgrandhotel.com` as a domain in Vercel (SSL is automatic).
3. In **GoDaddy** DNS, point the apex + `www` records at Vercel.
   **Leave the MX / email records untouched** so hotel email keeps working.
4. Submit the sitemap in Google Search Console and monitor.

See **[`docs/PROPOSAL.md`](docs/PROPOSAL.md)** for the full plan and rationale.
