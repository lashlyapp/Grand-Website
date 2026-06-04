# The Grand Hotel — Website Migration & Redesign Proposal

**Prepared:** June 2026
**Property:** The Grand Hotel — 865 W. El Camino Real, Sunnyvale, CA 94087
**Current site:** https://www.svgrandhotel.com
**Current vendor:** Cendyn (formerly Travel Tripper / Pegasus)
**Goal:** Take back control of the website, host it on Vercel (we own the domain),
and revamp the UI/UX — without breaking bookings.

---

## 1. Executive summary

You can absolutely take back control of the website. The marketing site is the
easy part to move, and **the booking flow will *not* break** when you do,
because booking already lives on a separate Cendyn domain, not yours.

The single most important finding from this review:

> **There are two different Cendyn products bundled into what feels like one bill.**
> 1. The **marketing website** (the CMS/hosting being held captive). Easy to replace.
> 2. The **booking engine / reservation system — "RezTrip"** (`svgrandhotel.reztrip.com`).
>    This is a separate, deeper system that connects to OTAs, your channel
>    manager, rate management, and likely your PMS. Harder to replace.

Today, the "Book Now" buttons are just **outbound links** to
`https://svgrandhotel.reztrip.com/search`. So:

- **Rebuilding the marketing site on Vercel breaks nothing in booking.** We
  keep pointing "Book Now" at the existing RezTrip engine. Guests notice no
  change to the reservation step.
- **Fully exiting Cendyn** (replacing RezTrip too) is a *separate, larger*
  decision we can make later. It is not required to escape the website hosting
  lock-in or to reduce part of the bill.

**Decision (confirmed):** We are replacing **only the marketing website** and
**keeping RezTrip** as the booking engine. This is the low-risk path: we rebuild
and redesign the marketing site on Vercel and keep "Book Now" pointing at the
existing RezTrip engine, so the reservation flow is unchanged for guests.

> The rest of this document focuses on that scope. A note on a possible later
> full Cendyn exit (replacing RezTrip too) is kept in §7 for reference only and
> is **out of scope** for this project.

---

## 2. Current-state review

### What the site is
A ~10–12 page brochure/marketing website:

| Page | Path |
|------|------|
| Home | `/` |
| Rooms | `/rooms/` |
| Villas | `/villas/` |
| Gallery | `/gallery/` |
| Package (Vidovich Vineyards) | `/vidovich-vineyards/` |
| Events | `/events/` |
| Location | `/location/` |
| News | `/news/` |
| Contact | `/contacts/` |
| Privacy Policy | `/privacy-policy/` |
| Careers | `/careers/` |
| Accessibility Statement | `/accessibility/` |

- **104 rooms**, 13 room/villa types (Deluxe/Superior King & Queens, Villas,
  Pet Villas, Premier Fireplace Suites, ADA/Handicap variants).
- Amenities: heated pool, continental breakfast, happy hour, Wi-Fi, 24-hr room
  service, fitness, pet-friendly, DoorDash at front desk.
- Parent: **CG Hotel Group**. Contact: 800-786-0827 / 408-720-8500,
  info@cghotelgroup.com.

### How booking actually works
- "Book Now" → `https://svgrandhotel.reztrip.com/search` (RezTrip booking engine).
- Per-room buttons deep-link with a room code, e.g.
  `…/search?selected_room=DK` (codes seen: `DK, SK, DQ, SQ, QH, VK, PK, VH, VQ, PQ, FP, HS`).
- **`reztrip.com` is Cendyn's own domain, not yours** — so it keeps working no
  matter where the marketing site is hosted. This is why migration is low-risk.

### Vendor lock-in risks we must design around
1. **Media is on Cendyn's CDNs.** Images load from `cdn.traveltripper.io`
   (Travel Tripper = Cendyn) and `res.cloudinary.com`. If Cendyn cuts service,
   these images disappear. **The rebuild must download and re-host every image
   onto our own storage/CDN.** This is the biggest "gotcha."
2. **The CMS/templates are Cendyn's.** We cannot export them cleanly; we
   recreate the site (content + design) rather than "transfer" it.
3. **The booking engine is also Cendyn.** Covered above — separate decision.
4. **Possible shared services to verify:** Does Cendyn also handle email (MX
   records), DNS hosting, analytics, or forms? We must confirm before cutover
   so we don't knock out email when we move the website.

### UX/Design assessment (why a revamp is warranted)
The current site is a dated vendor template: limited responsiveness, heavy/slow
imagery, generic layout, weak visual hierarchy, no modern booking widget
(date-picker), and minimal SEO/structured-data investment. A modern rebuild can
materially improve mobile experience, page speed, accessibility (ADA — relevant
for a hotel), and direct-booking conversion.

---

## 3. What breaks if we recreate the site? (Risk table)

| Item | Breaks? | Mitigation |
|------|--------|------------|
| "Book Now" / reservations | **No** | Keep linking to `svgrandhotel.reztrip.com` (+ preserve `selected_room` deep-links) |
| Images / gallery | **Yes, if not handled** | Download all media from Cendyn CDNs, re-host on our own CDN |
| Page URLs / SEO ranking | Risk | Keep identical URL paths; add 301 redirects; re-submit sitemap; preserve metadata + add schema.org Hotel data |
| Email (info@cghotelgroup.com / domain email) | Risk | Only change web DNS records (A/CNAME/ALIAS); **leave MX records untouched** |
| Google Business Profile / OTA listings | No | Independent of website host |
| Contact / careers form submissions | Maybe | Rebuild forms (e.g., serverless function + email or a form service) |
| Analytics history | Partial | Stand up GA4 fresh; historical Cendyn analytics may not export |

---

## 4. Proposed architecture (Phase 1)

A fast, low-maintenance, fully-owned stack:

- **Framework:** Next.js (App Router) — excellent SEO, image optimization,
  fast. First-class on Vercel.
- **Hosting:** Vercel (Git-connected; every push auto-deploys with preview URLs).
- **Styling:** Tailwind CSS for a clean, modern, responsive design system.
- **Content editing (recommended):** a lightweight headless CMS (e.g. Sanity or
  Contentful) so non-technical staff can edit rooms, rates blurbs, news, and
  gallery without code. *(Alternative: keep content in the repo as
  MDX/JSON — cheaper, but edits require a developer.)*
- **Media:** download all current images, re-host on our CDN (Vercel/Cloudinary
  under *our* account / Supabase Storage). No more Cendyn-owned assets.
- **Booking:** "Book Now" continues to deep-link to RezTrip, with an optional
  modern date-picker widget on our site that hands off dates to RezTrip.
- **Forms:** serverless route for Contact/Careers → email + optional database
  (Supabase) for lead capture.
- **Domain/DNS:** repoint `www` + apex of `svgrandhotel.com` to Vercel; **MX/email
  untouched.**

This stack is essentially free-to-cheap at this traffic level (Vercel Hobby/Pro,
small CMS plan) versus an ongoing captive monthly fee.

---

## 5. DNS cutover plan (zero-downtime)

1. Build and fully QA the new site on a Vercel preview URL.
2. Inventory existing DNS at the registrar (A, CNAME, **MX**, TXT/SPF/DKIM, NS).
3. Add the domain in Vercel; Vercel issues SSL automatically.
4. **Only** update the web records: apex `A`/`ALIAS` and `www` `CNAME` → Vercel.
   Lower TTL ~24h beforehand for a quick rollback window.
5. **Do not touch MX or email-auth (SPF/DKIM/DMARC) records.**
6. Verify SSL, all pages, booking links, forms, and email send/receive.
7. Submit new sitemap to Google Search Console; monitor for 404s/redirects.

> Note: if Cendyn currently *hosts the DNS zone itself*, we first move DNS to a
> registrar/provider we control (e.g. Cloudflare/registrar DNS), re-creating all
> records, before repointing web traffic. We'll confirm where the zone lives.

---

## 6. UI/UX revamp scope

- Modern, photography-forward responsive design; strong mobile experience.
- Clear conversion path: persistent booking bar with date-picker → RezTrip.
- Performance budget: fast LCP, optimized/next-gen images, lazy loading.
- **Accessibility (WCAG 2.1 AA)** — important for a hotel and for ADA exposure.
- SEO: per-page metadata, Open Graph, **schema.org `Hotel`/`LodgingBusiness`**
  structured data, XML sitemap, fast Core Web Vitals.
- Content refresh: rooms with clean cards + amenities, villas, gallery with
  lightbox, events/meetings inquiry, Vidovich Vineyards package, news/blog,
  location with map + directions, contact.
- Optional niceties: multi-photo room galleries, special-offers module,
  reviews/TripAdvisor pull-in, newsletter signup.

---

## 7. Phased plan & rough timeline

**Phase 1 — Reclaim + redesign marketing site (recommended now)**
1. Discovery & asset capture: scrape/download all content + images, confirm DNS
   & email ownership, confirm Cendyn website contract terms/notice period. *(~few days)*
2. Build new Next.js site + content model; migrate content/media. *(~2–3 weeks)*
3. Redesign UI/UX, accessibility, SEO, structured data. *(overlaps build)*
4. QA on preview, stakeholder review.
5. DNS cutover + post-launch monitoring + redirects/sitemap. *(~1 day + watch)*

**Out of scope — replacing the RezTrip booking engine**
- We are **keeping RezTrip**. Noted only for completeness: a full Cendyn exit
  would additionally require a new booking engine/CRS + channel manager +
  PMS/OTA connectivity and rate-parity setup — a much larger project we are
  intentionally not undertaking here.

---

## 8. Cost picture (directional)

| | Today (captive) | Proposed Phase 1 |
|--|--|--|
| Website hosting/CMS | Ongoing captive monthly fee | Vercel (~$0–$20+/mo) + small CMS plan |
| Booking engine (RezTrip) | Part of Cendyn fee | **Unchanged** until/if Phase 2 |
| Media hosting | Cendyn CDN | Our CDN (low/included) |
| Control | Vendor-controlled | **Fully owned, Git-versioned** |

Phase 1 ends the *website* lock-in and the portion of the bill tied to it.
The booking-engine fee only goes away in Phase 2.

---

## 9. Open questions / what I need from you

1. **Email:** Is `svgrandhotel.com` (or CG Hotel Group) email tied to this
   domain's DNS, and who hosts it? (So we protect MX during cutover.)
2. **DNS zone:** Who controls the DNS zone today — your registrar, or Cendyn?
3. **Cendyn contract:** Any notice period / minimum term / early-termination on
   the website portion? Do website and booking engine renew separately?
4. **Content editing:** Do staff need to self-edit content (→ headless CMS), or
   is developer-managed content acceptable (→ cheaper, code-based)?
5. **Booking engine:** Confirmed — keeping RezTrip. (No action needed.)
6. **Brand assets:** Do we have original-resolution logos/photography, or should
   we recover everything from the current site's CDNs?

---

## 10. Recommended next step

Approve **Phase 1**. I'll then scaffold the Next.js + Vercel project in this
repo, capture and re-host all existing content/images, and stand up a redesigned
preview site for your review — with "Book Now" still pointing safely at RezTrip
so nothing in the reservation flow changes.
