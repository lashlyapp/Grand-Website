"use client";

import { useEffect, useState } from "react";
import { loadBookingEngine } from "./BookingEngine";

// Live social-proof strip powered by the Travel Tripper (RT3) engine:
//   • "N people booked our hotel in the last 2 days"  → TTWeb.Activity().recentBookings
//   • "Tonight's Rate $X"                              → TTWeb.LiveRate().getCrossOutRate
// Renders only the parts that return data, and nothing at all if the engine is
// unavailable (e.g. domain not whitelisted) — so it never shows a broken state.
const TWO_DAYS_MINUTES = 2 * 24 * 60;

export default function HeroRateTicker() {
  const [bookings, setBookings] = useState<number | null>(null);
  const [rate, setRate] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadBookingEngine()
      .then(() => {
        const TT = window.TTWeb;
        if (!TT) return;

        try {
          new TT.Activity()
            .recentBookings(TWO_DAYS_MINUTES)
            .then((data: any) => {
              const total = data?.totalBookings ?? data?.total ?? null;
              if (!cancelled && typeof total === "number" && total > 0) {
                setBookings(total);
              }
            })
            .catch(() => {});
        } catch {
          /* ignore */
        }

        try {
          new TT.LiveRate()
            .getCrossOutRate()
            .then((resp: any) => {
              const room = resp?.lowestRateRoom;
              if (!cancelled && room?.rateFound && room.discountedRate) {
                setRate(String(room.discountedRate));
              }
            })
            .catch(() => {});
        } catch {
          /* ignore */
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  if (bookings == null && rate == null) return null;

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
