# CG Hotels — Admin

Internal admin for managing room content across **The Grand Hotel** and **The
Cupertino Hotel**. Lives in the same repo as the two public sites but is a
**separate, independent app** (its own Vercel project, Root Directory = `admin`).

All three apps share one Supabase project, **`cg-hotels-shared`**. The admin
writes room data; both public sites read it.

## Status (phased build)

- **Phase 0 ✅ (this):** Shared Supabase schema (`hotels`, `rooms`, `room_frames`)
  + RLS, seeded from both sites' `content/rooms.ts`. Admin app shell that lists
  all rooms per hotel (read-only).
- **Phase 1:** Supabase Auth (admin allowlist) + room create/edit/reorder, with
  publish that revalidates the public sites.
- **Phase 2:** Update a room's tour video, auto-generate **3 candidate cover
  frames** from it (server-side ffmpeg, range-reading the MyHotelOps CDN), and
  pick one — FB/TikTok/YouTube-style. Manual upload remains as a fallback.
- **Phase 3:** Polish — drag-reorder, audit log, live room preview.

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
