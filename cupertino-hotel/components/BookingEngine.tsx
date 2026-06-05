"use client";

import { useEffect } from "react";
import { ttweb } from "@/content/site";

// Loads and configures the Travel Tripper / Pegasus (RT3) booking engine once,
// then exposes helpers to open the live-rate widget and read live data
// (tonight's rate, recent bookings). The scripts are ~4.6MB of third-party JS,
// so we load them lazily after mount and everything degrades gracefully if the
// engine fails to load (e.g. domain not yet whitelisted) — callers fall back to
// the custom booking drawer.

declare global {
  interface Window {
    TTWeb?: any;
    __ttwebReady?: boolean;
    __ttBooking?: any;
  }
}

let loadPromise: Promise<void> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-src="${src}"]`)) return resolve();
    const el = document.createElement("script");
    el.src = src;
    el.async = false; // preserve execution order
    el.dataset.src = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(el);
  });
}

function loadCss(href: string) {
  if (document.querySelector(`link[data-href="${href}"]`)) return;
  const el = document.createElement("link");
  el.rel = "stylesheet";
  el.href = href;
  el.dataset.href = href;
  document.head.appendChild(el);
}

export function loadBookingEngine(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.__ttwebReady) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadCss(`${ttweb.pluginBase}/css/booking-widget.css`);
  loadPromise = (async () => {
    await loadScript(ttweb.jquery);
    await loadScript(`${ttweb.pluginBase}/rt3api.js`);
    await loadScript(`${ttweb.pluginBase}/jquery.ttweb.js`);
    const TT = window.TTWeb;
    if (!TT?.Config) throw new Error("TTWeb did not initialize");
    TT.Config.configure({
      hotelId: ttweb.hotelId,
      portalId: ttweb.portalId,
      defaultTimezone: ttweb.timezone,
      defaultCurrency: ttweb.currency,
    });
    window.__ttwebReady = true;
    window.dispatchEvent(new Event("ttweb:ready"));
  })();
  return loadPromise;
}

// Dates/guests chosen elsewhere (e.g. the hero booking bar) that should pre-seed
// the live widget when it opens. Dates are YYYY-MM-DD — the same format the
// widget stores internally (its "reztrip" date format).
export type WidgetParams = {
  checkin?: string;
  checkout?: string;
  adults?: number;
};

// Parses a YYYY-MM-DD string as a local Date (avoiding the UTC-midnight
// off-by-one of `new Date("2026-06-18")`). Used only to point the calendar at
// the arrival month.
function localDate(day: string): Date {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Pushes the chosen dates/guests onto an (already built) TTWeb booking widget so
// the slide-out reflects what the user picked. The widget is third-party and
// minified, so every call is feature-detected and the whole thing is wrapped by
// the caller — if any of this drifts, the widget still opens with its defaults.
function applyWidgetParams(booking: any, params: WidgetParams) {
  if (params.checkin && typeof booking.setArrival === "function") {
    booking.setArrival(params.checkin);
  }
  if (params.checkout && typeof booking.setDeparture === "function") {
    booking.setDeparture(params.checkout);
  }
  // Point the calendar at the arrival month so the selected range is visible.
  if (params.checkin) booking.currentMonth = localDate(params.checkin);

  // Syncing the guest count through the widget's own <select> change handler
  // updates the visible dropdown AND re-renders the calendar/footer rate for the
  // new dates (updateAdults calls loadRateCalendarMonth + getRates). When no
  // guest count is supplied we trigger that refresh ourselves.
  if (typeof params.adults === "number" && booking.$adultSelector?.length) {
    booking.$adultSelector.val(String(params.adults)).trigger("change");
  } else {
    if (typeof booking.loadRateCalendarMonth === "function") {
      booking.loadRateCalendarMonth(booking.currentMonth);
    }
    if (typeof booking.getRates === "function") booking.getRates();
  }
}

// Opens the live-rate booking slide-out, pre-seeded with any chosen dates/guests.
// Returns false if the engine isn't available so the caller can fall back to the
// custom drawer.
export function openTtwebWidget(params: WidgetParams = {}): boolean {
  const TT = typeof window !== "undefined" ? window.TTWeb : undefined;
  if (!TT?.Booking) return false;
  try {
    if (!window.__ttBooking) {
      window.__ttBooking = new TT.Booking({
        showRateCalendar: true,
        showOfferCode: true,
        adults: params.adults,
      });
    }
    try {
      applyWidgetParams(window.__ttBooking, params);
    } catch {
      // Seeding failed — still open the widget with its own defaults.
    }
    window.__ttBooking.showWidget();
    return true;
  } catch {
    return false;
  }
}

export function isBookingEngineReady(): boolean {
  return typeof window !== "undefined" && !!window.__ttwebReady;
}

// Collapses the live widget when a pointer press lands outside it. The widget's
// root element carries `.ttweb-booking-widget` (and `.show` while open) and is
// appended to <body>, so anything outside it is page content. We listen on
// pointerdown (not click) so the button press that opens the widget — its click
// fires afterwards — doesn't immediately re-close it.
function onPointerDownOutside(e: PointerEvent) {
  const booking = window.__ttBooking;
  const widget: HTMLElement | undefined = booking?.$widget?.[0];
  if (!widget || !widget.classList.contains("show")) return;
  if (widget.contains(e.target as Node)) return;
  try {
    if (typeof booking.hideWidget === "function") booking.hideWidget();
  } catch {
    // Best-effort; leave the widget open if the API drifts.
  }
}

export default function BookingEngine() {
  useEffect(() => {
    loadBookingEngine().catch((err) =>
      console.warn("Booking engine failed to load; using fallback drawer.", err),
    );
    document.addEventListener("pointerdown", onPointerDownOutside);
    return () => document.removeEventListener("pointerdown", onPointerDownOutside);
  }, []);
  return null;
}
