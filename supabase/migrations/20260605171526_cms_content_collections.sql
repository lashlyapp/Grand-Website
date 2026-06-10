
-- News / announcements
create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  hotel_id text not null references public.hotels(id) on delete cascade,
  title text not null,
  date_label text not null default '',
  body text not null default '',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Press / "as seen on" mentions
create table public.press_mentions (
  id uuid primary key default gen_random_uuid(),
  hotel_id text not null references public.hotels(id) on delete cascade,
  outlet text not null,
  title text not null default '',
  url text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Careers / job openings
create table public.job_postings (
  id uuid primary key default gen_random_uuid(),
  hotel_id text not null references public.hotels(id) on delete cascade,
  title text not null,
  location text not null default '',
  employment_type text not null default '',
  description text not null default '',
  apply_email text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Guest testimonials
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  hotel_id text not null references public.hotels(id) on delete cascade,
  quote text not null,
  author text not null default '',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Amenities / services
create table public.amenities (
  id uuid primary key default gen_random_uuid(),
  hotel_id text not null references public.hotels(id) on delete cascade,
  title text not null,
  description text not null default '',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Event / meeting spaces
create table public.meeting_rooms (
  id uuid primary key default gen_random_uuid(),
  hotel_id text not null references public.hotels(id) on delete cascade,
  name text not null,
  dimensions text not null default '',
  ceiling text not null default '',
  square_footage text not null default '',
  price text not null default '',
  capacity jsonb not null default '[]'::jsonb,
  accessibility text not null default '',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Nearby attractions (location page)
create table public.attractions (
  id uuid primary key default gen_random_uuid(),
  hotel_id text not null references public.hotels(id) on delete cascade,
  name text not null,
  detail text not null default '',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Gallery photos
create table public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  hotel_id text not null references public.hotels(id) on delete cascade,
  src text not null,
  alt text not null default '',
  span text not null default '',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Packages / special offers
create table public.offers (
  id uuid primary key default gen_random_uuid(),
  hotel_id text not null references public.hotels(id) on delete cascade,
  title text not null,
  subtitle text not null default '',
  body text not null default '',
  image text,
  cta_label text not null default '',
  cta_href text not null default '',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS + updated_at trigger for every collection (public read, admin write).
do $$
declare t text;
begin
  foreach t in array array[
    'news_posts','press_mentions','job_postings','testimonials','amenities',
    'meeting_rooms','attractions','gallery_images','offers'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "public read %1$s" on public.%1$I for select using (true)', t);
    execute format('create policy "admin write %1$s" on public.%1$I for all using (public.is_admin()) with check (public.is_admin())', t);
    execute format('create index %1$s_hotel_sort_idx on public.%1$I (hotel_id, sort_order)', t);
    execute format('create trigger %1$s_set_updated_at before update on public.%1$I for each row execute function public.set_updated_at()', t);
  end loop;
end $$;
