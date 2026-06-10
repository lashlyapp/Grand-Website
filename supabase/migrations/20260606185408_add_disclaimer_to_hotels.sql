alter table public.hotels
  add column if not exists disclaimer text not null default '';

comment on column public.hotels.disclaimer is
  'Site-wide service notice shown under the header on each hotel''s public site. Empty string hides the banner. Editable from the admin Settings page.';
