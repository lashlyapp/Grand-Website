import { rooms as fallbackRooms, type Room } from "@/content/rooms";

// Reads room content from the shared Supabase project (managed via the admin),
// falling back to the static content/rooms.ts whenever Supabase is unconfigured,
// unreachable, or empty — so the marketing site can never break on a data issue.
//
// Uses Next's fetch against the REST endpoint for first-class ISR: pages are
// cached and revalidated every 5 minutes, and the admin can trigger an instant
// refresh by revalidating the "rooms" tag (see app/api/revalidate).

const HOTEL_ID = "cupertino";

type Row = {
  code: string;
  name: string;
  category: Room["category"];
  beds: string;
  description: string;
  features: string[] | null;
  accessible: boolean | null;
  pet_friendly: boolean | null;
  video_url: string | null;
  cover_image_url: string | null;
  gallery: string[] | null;
};

function mapRow(r: Row): Room {
  return {
    code: r.code,
    name: r.name,
    category: r.category,
    beds: r.beds,
    description: r.description,
    features: r.features ?? [],
    accessible: r.accessible || undefined,
    petFriendly: r.pet_friendly || undefined,
    image: r.cover_image_url || "/images/rooms/deluxe-room.jpg",
    video: r.video_url || undefined,
    gallery: r.gallery && r.gallery.length ? r.gallery : undefined,
  };
}

export async function getRooms(): Promise<Room[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return fallbackRooms;

  try {
    const endpoint =
      `${url}/rest/v1/rooms?hotel_id=eq.${HOTEL_ID}` +
      `&published=eq.true&select=*&order=sort_order`;
    const res = await fetch(endpoint, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 300, tags: ["rooms"] },
    });
    if (!res.ok) return fallbackRooms;
    const rows = (await res.json()) as Row[];
    if (!Array.isArray(rows) || rows.length === 0) return fallbackRooms;
    return rows.map(mapRow);
  } catch {
    return fallbackRooms;
  }
}

// Every Cupertino accommodation is a guest room or suite (no villas).
export async function getGuestRooms(): Promise<Room[]> {
  return getRooms();
}
