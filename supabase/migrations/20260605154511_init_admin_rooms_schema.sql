
create extension if not exists "pgcrypto";

-- Hotels (both properties)
create table public.hotels (
  id text primary key,                 -- 'grand' | 'cupertino'
  name text not null,
  slug text not null unique,
  booking_base_url text,
  created_at timestamptz not null default now()
);

-- Admin allowlist, linked to Supabase Auth users
create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid());
$$;

-- Rooms (first admin module)
create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  hotel_id text not null references public.hotels(id) on delete cascade,
  code text not null,                  -- RezTrip deep-link code
  name text not null,
  category text not null check (category in ('room','villa','suite')),
  beds text not null default '',
  description text not null default '',
  features text[] not null default '{}',
  accessible boolean not null default false,
  pet_friendly boolean not null default false,
  video_url text,
  cover_image_url text,
  gallery text[] not null default '{}',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (hotel_id, code)
);
create index rooms_hotel_sort_idx on public.rooms (hotel_id, sort_order);

-- Candidate cover frames captured from a room's video
create table public.room_frames (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  url text not null,
  timestamp_seconds numeric not null default 0,
  selected boolean not null default false,
  created_at timestamptz not null default now()
);
create index room_frames_room_idx on public.room_frames (room_id);

-- updated_at maintenance
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
create trigger rooms_set_updated_at before update on public.rooms
  for each row execute function public.set_updated_at();

-- Row-level security
alter table public.hotels enable row level security;
alter table public.rooms enable row level security;
alter table public.room_frames enable row level security;
alter table public.admins enable row level security;

-- Public (anon) read for the two marketing sites
create policy "public read hotels" on public.hotels for select using (true);
create policy "public read rooms" on public.rooms for select using (true);
create policy "public read room_frames" on public.room_frames for select using (true);

-- Admin-only writes
create policy "admin write hotels" on public.hotels for all using (public.is_admin()) with check (public.is_admin());
create policy "admin write rooms" on public.rooms for all using (public.is_admin()) with check (public.is_admin());
create policy "admin write room_frames" on public.room_frames for all using (public.is_admin()) with check (public.is_admin());
create policy "admins read self" on public.admins for select using (user_id = auth.uid() or public.is_admin());
create policy "admins manage" on public.admins for all using (public.is_admin()) with check (public.is_admin());

-- Storage bucket for generated frames + manual uploads
insert into storage.buckets (id, name, public)
values ('room-media', 'room-media', true)
on conflict (id) do nothing;

create policy "public read room-media" on storage.objects for select
  using (bucket_id = 'room-media');
create policy "admin write room-media" on storage.objects for all
  using (bucket_id = 'room-media' and public.is_admin())
  with check (bucket_id = 'room-media' and public.is_admin());
