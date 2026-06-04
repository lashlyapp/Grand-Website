import type { Metadata } from "next";
import BookingBar from "@/components/BookingBar";
import PageHero from "@/components/PageHero";
import RoomCard from "@/components/RoomCard";
import { Container } from "@/components/ui";
import { guestRooms } from "@/content/rooms";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Rooms",
  description:
    "Oversized, well-appointed guest rooms at The Grand Hotel, Sunnyvale — deluxe and superior kings and queens, plus accessible options.",
  alternates: { canonical: "/rooms/" },
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Accommodations"
        title="Rooms"
        intro="Oversized, thoughtfully appointed guest rooms designed for rest and productivity alike."
        image="/images/suites.jpg"
      />
      <Container className="-mt-8 relative z-10">
        <BookingBar />
      </Container>
      <section className="py-16 sm:py-24">
        <Container>
          <h2 className="sr-only">Guest Rooms</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guestRooms.map((room) => (
              <RoomCard key={room.code} room={room} />
            ))}
          </div>
          <p className="mt-10 text-center text-xs text-ink/50">
            {site.roomMediaDisclaimer}
          </p>
        </Container>
      </section>
    </>
  );
}
