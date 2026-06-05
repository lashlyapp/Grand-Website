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

// Opens the live-rate booking slide-out. Returns false if the engine isn't
// available so the caller can fall back to the custom drawer.
export function openTtwebWidget(): boolean {
  const TT = typeof window !== "undefined" ? window.TTWeb : undefined;
  if (!TT?.Booking) return false;
  try {
    if (!window.__ttBooking) {
      window.__ttBooking = new TT.Booking({ showRateCalendar: true, showOfferCode: true });
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

export default function BookingEngine() {
  useEffect(() => {
    loadBookingEngine().catch((err) =>
      console.warn("Booking engine failed to load; using fallback drawer.", err),
    );
  }, []);
  return null;
}
