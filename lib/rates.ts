// Live "Tonight's Rate" from the RezTrip booking engine — the same public
// rt3 API the original site queries client-side (rt3api.js,
// getAllAvailableRooms): lowest nightly price per room type for a one-night
// stay starting tonight. Fetched server-side with ISR so pages stay static;
// any failure simply yields no rates (the sites hide the rate row).

const RT3_ENDPOINT = "https://rt3api-prd.ttaws.com/hotels/rooms.json";
const HOTEL_ID = "CASVGH";
const PORTAL_ID = "svgrandhotel";

type RateRow = {
  code?: string;
  min_average_price?: (number | null)[] | null;
  min_discounted_average_price?: (number | null)[] | null;
};

// Tonight's stay in the hotel's timezone: arrival today, departure tomorrow.
function tonightStay(): { arrival: string; departure: string } {
  // en-CA formats as YYYY-MM-DD.
  const arrival = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
  }).format(new Date());
  const d = new Date(`${arrival}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return { arrival, departure: d.toISOString().slice(0, 10) };
}

// Room code -> tonight's rate. `null` means the booking engine returned no
// price for tonight (sold out / closed out) — the sites show
// "Check Availability", matching the original. An empty map (feed down)
// hides the rate row entirely.
export async function getTonightRates(): Promise<Map<string, number | null>> {
  const { arrival, departure } = tonightStay();
  const params = new URLSearchParams({
    rooms: "1",
    hotel_id: HOTEL_ID,
    portal_id: PORTAL_ID,
    locale: "en",
    currency: "USD",
    arrival_date_0: arrival,
    departure_date_0: departure,
    adults_0: "1",
    children_0: "0",
  });

  try {
    const res = await fetch(`${RT3_ENDPOINT}?${params}`, {
      // The dates are part of the URL, so the cache naturally rolls over at
      // midnight (hotel time); within a day, rates refresh every 5 minutes.
      next: { revalidate: 300, tags: ["rates"] },
    });
    if (!res.ok) return new Map();
    const data = (await res.json()) as { rooms?: RateRow[] };

    const rates = new Map<string, number | null>();
    for (const room of data.rooms ?? []) {
      if (!room.code) continue;
      // Same precedence as the original: discounted price, else base price.
      const price =
        room.min_discounted_average_price?.[0] ??
        room.min_average_price?.[0] ??
        null;
      rates.set(room.code, typeof price === "number" ? price : null);
    }
    return rates;
  } catch {
    return new Map();
  }
}
