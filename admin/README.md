# CG Hotels — Admin

Internal admin for managing room content across **The Grand Hotel** and **The
Cupertino Hotel**. Lives in the same repo as the two public sites but is a
**separate, independent app** (its own Vercel project, Root Directory = `admin`).

All three apps share one Supabase project, **`cg-hotels-shared`**. The admin
writes room data; both public sites read it.

## Status (phased build)

- **Phase 0 ✅:** Shared Supabase schema (`hotels`, `rooms`, `room_frames`) +
  RLS, seeded from both sites' `content/rooms.ts`.
- **Phase 1 ✅:** Magic-link auth (`@supabase/ssr`) + admin allowlist; every
  route gated by middleware. Room **create / edit / delete** via server actions
  (writes enforced by RLS to admins). List view links into the editor.
- **Phase 2 ✅:** Update a room's tour video, then **capture 3 candidate cover
  frames** from it and pick one (YouTube/TikTok-style) — no separate photo
  upload. Frames are extracted server-side with a bundled static **ffmpeg**
  (`/api/frames`, Node runtime), uploaded to the `room-media` bucket, and listed
  as a picker on the room editor. Manual `cover_image_url` entry remains a
  fallback.
- **Phase 3 (in progress):** ✅ Public sites now read rooms from Supabase (with
  a static `content/rooms.ts` fallback) and revalidate on publish. Remaining
  polish: drag-reorder, audit log, live room preview, near-black frame skipping.

## Public-site integration (Phase 3)

Both marketing sites read rooms from the shared Supabase via a small
`lib/rooms-data.ts` (Next `fetch` against the REST endpoint, ISR `revalidate:
300`, tag `"rooms"`). If Supabase is unconfigured/unreachable/empty they fall
back to the committed `content/rooms.ts`, so a data hiccup can't break a site.

Each site exposes `POST /api/revalidate?secret=...`; the admin calls both after
a change so edits appear immediately. Set on **each public site**:

| Var | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | same shared values |
| `REVALIDATE_SECRET` | a shared secret, also set in the admin |

And on the **admin**: `REVALIDATE_SECRET`, `GRAND_REVALIDATE_URL`,
`CUPERTINO_REVALIDATE_URL` (see `.env.example`).

### Phase 2 notes (frame capture)

- The MyHotelOps CDN has **no CORS**, so browser `<canvas>` capture is
  impossible; extraction runs server-side. The route **downloads the full video
  to `/tmp`** and runs ffmpeg locally (ffmpeg's own HTTP layer is unreliable
  across runtimes). Videos are ~50 MB; budget is `maxDuration = 60s`.
- `ffmpeg-static` (~80 MB binary) is bundled into the `/api/frames` function via
  `outputFileTracingIncludes` in `next.config.mjs`.
- Frames are written to `room-media/rooms/{roomId}/frame-{0..2}.jpg` (upsert),
  1600px wide, JPEG q≈3. Regeneration replaces the previous candidates.

## Auth setup (one-time)

1. **Supabase → Authentication → URL Configuration:** set **Site URL** and add
   to **Redirect URLs**: `http://localhost:3002/auth/callback` (dev) and
   `https://<admin-domain>/auth/callback` (prod).
2. **Add the first admin.** The `admins` table starts empty and RLS blocks
   writes until you're in it. Sign in once (creates your `auth.users` row),
   then run in the Supabase SQL editor:
   ```sql
   insert into public.admins (user_id, email)
   select id, email from auth.users where email = 'you@cghotelgroup.com'
   on conflict (user_id) do nothing;
   ```

## Local development

```bash
cd admin
cp .env.example .env.local       # values are already filled in (public key)
npm install
npm run dev                      # http://localhost:3002
```

## Environment variables

| Var | Where | Notes |
|-----|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | client + server | Project URL (public). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client + server | Publishable key (public; RLS-guarded). |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Needed in Phase 1+ for admin writes / frame extraction. Never expose to the browser. |

## Deploy (Vercel)

Create a new Vercel project pointing at this repo with **Root Directory =
`admin`**, set the env vars above, and add the admin's own domain (e.g.
`admin.<domain>`).

## Data model

`rooms` mirrors the public sites' `Room` shape (`code`, `name`, `category`,
`beds`, `description`, `features[]`, `accessible`, `pet_friendly`, `video_url`,
`cover_image_url`, `gallery[]`, `sort_order`, `published`), keyed by
`hotel_id` (`grand` | `cupertino`). `room_frames` holds the candidate stills
generated from a room's video.

## First admin user

RLS restricts writes to users listed in the `admins` table. Because the table
starts empty, add the first admin out-of-band after they sign up — e.g. via the
Supabase SQL editor / service role:

```sql
insert into public.admins (user_id, email)
select id, email from auth.users where email = 'you@example.com';
```
