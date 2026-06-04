"use client";

import { useEffect, useState } from "react";
import { useBooking } from "./BookingProvider";
import { bookingUrl } from "@/lib/booking";
import { rooms } from "@/content/rooms";

function isoDay(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function addDays(day: string, days: number): string {
  const d = new Date(day);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

// In-page slide-out booking panel. Clicking any "Book Now" button opens this
// drawer (rather than jumping straight to a different site); the final
// "Check Availability" hands the chosen dates/guests off to RezTrip, which
// cannot be embedded directly because it sends X-Frame-Options: SAMEORIGIN.
export default function BookingDrawer() {
  const { open, params, closeBooking } = useBooking();

  const today = isoDay(0);
  const [checkin, setCheckin] = useState(today);
  const [checkout, setCheckout] = useState(isoDay(1));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [offer, setOffer] = useState("");

  // Seed the form from whatever context opened the drawer.
  useEffect(() => {
    if (!open) return;
    if (params.checkin) setCheckin(params.checkin);
    if (params.checkout) setCheckout(params.checkout);
    if (params.adults) setAdults(params.adults);
  }, [open, params]);

  // Lock body scroll and close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBooking();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, closeBooking]);

  // Keep check-out strictly after check-in.
  function onCheckinChange(value: string) {
    setCheckin(value);
    if (checkout <= value) setCheckout(addDays(value, 1));
  }

  const selectedRoom = params.room
    ? rooms.find((r) => r.code === params.room)
    : undefined;

  const href = bookingUrl({
    room: params.room,
    checkin,
    checkout,
    adults,
    children: children || undefined,
    offer: offer.trim() || undefined,
  });

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!open}
        onClick={closeBooking}
        className={`fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Your booking"
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-ink px-6 py-5">
          <h2 className="font-serif text-2xl uppercase tracking-widest text-white">
            Your Booking
          </h2>
          <button
            type="button"
            onClick={closeBooking}
            aria-label="Close booking"
            className="text-2xl leading-none text-white/70 transition-colors hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {selectedRoom && (
            <p className="mb-5 rounded-lg bg-gold/10 px-4 py-3 text-sm text-ink">
              Booking{" "}
              <span className="font-semibold">{selectedRoom.name}</span>
            </p>
          )}

          <div className="space-y-4">
            <Field label="Check-in">
              <input
                type="date"
                min={today}
                value={checkin}
                onChange={(e) => onCheckinChange(e.target.value)}
                className="w-full bg-transparent text-ink outline-none"
                aria-label="Check-in date"
              />
            </Field>
            <Field label="Check-out">
              <input
                type="date"
                min={addDays(checkin, 1)}
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
                className="w-full bg-transparent text-ink outline-none"
                aria-label="Check-out date"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Adults">
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full bg-transparent text-ink outline-none"
                  aria-label="Number of adults"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Adult" : "Adults"}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Children">
                <select
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full bg-transparent text-ink outline-none"
                  aria-label="Number of children"
                >
                  {[0, 1, 2, 3].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Child" : "Children"}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Offer code">
              <input
                type="text"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="Optional"
                className="w-full bg-transparent text-ink outline-none placeholder:text-ink/30"
                aria-label="Offer code"
              />
            </Field>
          </div>
        </div>

        <div className="border-t border-ink/10 px-6 py-5">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeBooking}
            className="flex w-full items-center justify-center rounded-lg bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gold-dark"
          >
            Check Availability
          </a>
          <p className="mt-3 text-center text-[11px] uppercase tracking-widest text-ink/40">
            Secure reservations via RezTrip
          </p>
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block rounded-lg border border-ink/15 bg-white px-4 py-2">
      <span className="block text-[11px] font-semibold uppercase tracking-widest text-ink/50">
        {label}
      </span>
      <span className="mt-1 block text-sm">{children}</span>
    </label>
  );
}
