"use client";

import { useBooking, type BookingParams } from "./BookingProvider";

// A button that opens the slide-out booking drawer. Lets server components
// (room cards, page CTAs) trigger the drawer without becoming client components
// themselves.
export default function BookingButton({
  params,
  className,
  children,
}: {
  params?: BookingParams;
  className?: string;
  children: React.ReactNode;
}) {
  const { openBooking } = useBooking();
  return (
    <button type="button" onClick={() => openBooking(params)} className={className}>
      {children}
    </button>
  );
}
