"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import BookingDrawer from "./BookingDrawer";

// Params that can pre-seed the booking drawer when it is opened from a specific
// context (e.g. a room card passes its RezTrip room code, the hero booking bar
// passes the chosen dates).
export type BookingParams = {
  room?: string;
  checkin?: string;
  checkout?: string;
  adults?: number;
};

type BookingContextValue = {
  open: boolean;
  params: BookingParams;
  openBooking: (params?: BookingParams) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return ctx;
}

// Holds the booking-drawer state at the app root so any button on any page can
// open the slide-out instead of navigating away to the booking engine. The
// drawer itself is rendered once here.
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState<BookingParams>({});

  const openBooking = useCallback((next?: BookingParams) => {
    setParams(next ?? {});
    setOpen(true);
  }, []);

  const closeBooking = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, params, openBooking, closeBooking }),
    [open, params, openBooking, closeBooking],
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingDrawer />
    </BookingContext.Provider>
  );
}
