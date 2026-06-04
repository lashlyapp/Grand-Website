"use client";

import { useState } from "react";
import { bookingUrl } from "@/lib/booking";

// A modern booking bar that hands the chosen dates off to the RezTrip engine.
// It deliberately does not attempt to show live rates/availability — that stays
// with RezTrip — it just makes the handoff fast and obvious.
export default function BookingBar({ floating = false }: { floating?: boolean }) {
  const today = new Date().toISOString().slice(0, 10);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState(2);

  const href = bookingUrl({
    checkin: checkin || undefined,
    checkout: checkout || undefined,
    adults,
  });

  return (
    <div
      className={`w-full ${
        floating
          ? "rounded-xl bg-white/95 shadow-xl backdrop-blur"
          : "rounded-xl bg-white shadow-md"
      }`}
    >
      <form
        action={href}
        target="_blank"
        rel="noopener noreferrer"
        className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto] lg:items-end"
      >
        <Field label="Check-in">
          <input
            type="date"
            min={today}
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            className="w-full bg-transparent text-ink outline-none"
            aria-label="Check-in date"
          />
        </Field>
        <Field label="Check-out">
          <input
            type="date"
            min={checkin || today}
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            className="w-full bg-transparent text-ink outline-none"
            aria-label="Check-out date"
          />
        </Field>
        <Field label="Guests">
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="w-full bg-transparent text-ink outline-none"
            aria-label="Number of guests"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </Field>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gold-dark"
        >
          Check Availability
        </a>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block rounded-lg border border-ink/15 px-4 py-2">
      <span className="block text-[11px] font-semibold uppercase tracking-widest text-ink/50">
        {label}
      </span>
      <span className="mt-1 block text-sm">{children}</span>
    </label>
  );
}
