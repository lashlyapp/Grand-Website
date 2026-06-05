import { createSupabaseServerClient } from "./supabase/server";
import type { Hotel, Room } from "./types";

export async function getHotels(): Promise<Hotel[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("hotels")
    .select("id, name, slug, booking_base_url")
    .order("id");
  if (error) throw new Error(`Failed to load hotels: ${error.message}`);
  return data ?? [];
}

export async function getRooms(hotelId?: string): Promise<Room[]> {
  const supabase = createSupabaseServerClient();
  let query = supabase
    .from("rooms")
    .select("*")
    .order("hotel_id")
    .order("sort_order");
  if (hotelId) query = query.eq("hotel_id", hotelId);
  const { data, error } = await query;
  if (error) throw new Error(`Failed to load rooms: ${error.message}`);
  return (data ?? []) as Room[];
}

export async function getRoomById(id: string): Promise<Room | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Failed to load room: ${error.message}`);
  return (data as Room) ?? null;
}
