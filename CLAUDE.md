# GC Group Website

Monorepo for the CG Hotels group:

- `/` — The Grand hotel public site (Next.js, Vercel project `grand-website`)
- `cupertino-hotel/` — The Cupertino hotel public site (Vercel project `cupertino-website`)
- `admin/` — content admin for both sites (Vercel project `gc-group-admin`)

All three share one Supabase project (`gpazsgmqnrhotwktbggp`): the public sites
read via the REST API with ISR caching, the admin writes via authenticated
sessions. After a save, the admin pings each site's `/api/revalidate` for an
instant refresh.

## Database changes — CI pipeline only

**Never apply schema or data changes directly to Supabase** — not via the MCP
tools (`apply_migration`, `execute_sql` for DDL), not via the dashboard SQL
editor. The only sanctioned path is:

1. Add a migration file: `supabase/migrations/<YYYYMMDDHHMMSS>_<name>.sql`
2. Open a PR; merge to `main`
3. The `supabase-migrations` GitHub Actions workflow applies it via
   `supabase db push`

Read-only queries for debugging are fine.

## Admin access model

- Access is keyed by email in `public.admins` (granted before first sign-in).
- `role` is `admin` (manage content) or `superadmin` (also invite/remove
  admins via the `/admins` page). Superadmin changes happen via migration only.
- No open signup: the login page only sends sign-in codes (6-digit email OTP)
  to listed emails, and invites are restricted to `@cghotelgroup.com`
  (enforced in RLS).
