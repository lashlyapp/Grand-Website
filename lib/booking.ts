import { site } from "@/content/site";

// Builds a RezTrip booking-engine URL. We are intentionally keeping RezTrip as
// the reservation system; the marketing site just links into it. Optional
// params preserve the existing deep-link behavior (e.g. ?selected_room=DK and
// arrival/departure dates from the booking bar).
export function bookingUrl(params?: {
  room?: string;
  checkin?: string; // YYYY-MM-DD
  checkout?: string; // YYYY-MM-DD
  adults?: number;
  children?: number;
  offer?: string;
}): string {
  const url = new URL(site.bookingBaseUrl);
  if (params?.room) url.searchParams.set("selected_room", params.room);
  if (params?.checkin) url.searchParams.set("arrival", params.checkin);
  if (params?.checkout) url.searchParams.set("departure", params.checkout);
  if (params?.adults) url.searchParams.set("adults", String(params.adults));
  if (params?.children) url.searchParams.set("children", String(params.children));
  if (params?.offer) url.searchParams.set("promo", params.offer);
  return url.toString();
}
