-- "Tonight's Rate" displayed on the public sites' room cards and detail
-- modals (matching the original sites' rate callout). Managed per-room via
-- the admin; NULL hides the rate on the sites.
alter table public.rooms
  add column if not exists rate_tonight numeric(10, 2)
  check (rate_tonight is null or rate_tonight >= 0);
