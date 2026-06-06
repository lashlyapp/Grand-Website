"use client";

import { useEffect, useState } from "react";
import { loadBookingEngine } from "./BookingEngine";

// Live social-proof strip powered by the Travel Tripper (RT3) engine:
//   • "N people booked our hotel in the last 2 days"  → TTWeb.Activity().roomsBooked(null, minutes)
//   • "Tonight's Rate $X"                              → TTWeb.LiveRate().getCrossOutRate({ ip_address })
// roomsBooked() takes (roomOrCode, minutes) — minutes is the SECOND argument —
// and getCrossOutRate() rejects unless given the visitor's ip_address, so both
// are called accordingly below. If neither returns usable data the strip renders
// nothing rather than a broken state.
const TWO_DAYS_MINUTES = 2 * 24 * 60;

async function getClientIp(): Promise<string> {
  try {
    const res = await fetch("/api/client-ip");
    const data = await res.json();
    return typeof data?.ip === "string" ? data.ip : "";
  } catch {
    return "";
  }
}

export default function HeroRateTicker() {
  const [bookings, setBookings] = useState<number | null>(null);
  const [lastBooked, setLastBooked] = useState<string | null>(null);
  const [rate, setRate] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadBookingEngine()
      .then(async () => {
        const TT = window.TTWeb;
        if (!TT) return;

        // Recent bookings — roomsBooked(roomOrCode, minutes); minutes is 2nd arg.
        try {
          const data: any = await new TT.Activity().roomsBooked(null, TWO_DAYS_MINUTES);
          const total = data?.totalBookings ?? data?.total ?? null;
          if (!cancelled) {
            if (typeof total === "number" && total > 0) {
              setBookings(total);
            } else if (typeof data?.mostRecentBookedTimeDisplay === "string") {
              // Real social proof for quiet stretches when the 48h count is 0,
              // so the strip stays useful instead of disappearing entirely.
              setLastBooked(data.mostRecentBookedTimeDisplay);
            }
          }
        } catch {
          /* ignore */
        }

        // Tonight's rate — getCrossOutRate requires the visitor's ip_address.
        try {
          const ip = await getClientIp();
          if (ip) {
            const resp: any = await new TT.LiveRate().getCrossOutRate({ ip_address: ip });
            const room = resp?.lowestRateRoom;
            if (!cancelled && room?.rateFound && room.discountedRate) {
              setRate(String(room.discountedRate));
            }
          }
        } catch {
          /* ignore */
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  if (bookings == null && lastBooked == null && rate == null) return null;

  return (
    <div className="inline-flex flex-wrap overflow-hidden rounded-lg shadow-xl">
      {bookings != null && (
        <div className="flex items-center gap-3 bg-white/95 px-5 py-3 backdrop-blur">
          <span className="font-serif text-2xl font-semibold text-ink">{bookings}</span>
          <span className="text-sm text-ink/70">
            People booked our hotel in the last 2 days
          </span>
        </div>
      )}
      {bookings == null && lastBooked != null && (
        <div className="flex items-center gap-3 bg-white/95 px-5 py-3 backdrop-blur">
          <span className="text-sm text-ink/70">
            Last booked <span className="font-semibold text-ink">{lastBooked}</span>
          </span>
        </div>
      )}
      {rate != null && (
        <div className="flex items-center gap-3 bg-ink px-5 py-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/75">
            Tonight&rsquo;s Rate
          </span>
          <span className="font-serif text-2xl font-semibold text-white">${rate}</span>
        </div>
      )}
    </div>
  );
}
