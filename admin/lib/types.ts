// Shared shapes for the admin. These mirror the `rooms` / `hotels` tables in the
// cg-hotels-shared Supabase project. The public sites read the same tables.

export type Hotel = {
  id: string; // 'grand' | 'cupertino'
  name: string;
  slug: string;
  booking_base_url: string | null;
  disclaimer: string; // site-wide service notice; '' hides the banner
};

export type RoomCategory = "room" | "villa" | "suite";

export type Room = {
  id: string;
  hotel_id: string;
  code: string;
  name: string;
  category: RoomCategory;
  beds: string;
  description: string;
  features: string[];
  accessible: boolean;
  pet_friendly: boolean;
  video_url: string | null;
  cover_image_url: string | null;
  gallery: string[];
  // Nightly "Tonight's Rate" (USD) shown on the public sites; null hides it.
  rate_tonight: number | null;
  sort_order: number;
  published: boolean;
  updated_at: string;
};

// A candidate cover frame captured from a room's tour video.
export type RoomFrame = {
  id: string;
  room_id: string;
  url: string;
  timestamp_seconds: number;
  selected: boolean;
};
