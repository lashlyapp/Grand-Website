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
- **Phase 2:** Update a room's tour video, auto-generate **3 candidate cover
  frames** from it (server-side ffmpeg, range-reading the MyHotelOps CDN), and
  pick one — FB/TikTok/YouTube-style. Manual upload remains as a fallback.
- **Phase 3:** Polish — drag-reorder, audit log, live room preview, and wiring
  the public sites to read from Supabase (with publish → revalidate).

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
