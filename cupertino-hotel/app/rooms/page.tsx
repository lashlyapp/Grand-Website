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
    "Spacious, modern guest rooms and suites at The Cupertino Hotel — executive and deluxe kings and queens, fireplace and pet-friendly suites, plus accessible options.",
  alternates: { canonical: "/rooms/" },
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Accommodations"
        title="Rooms"
        intro="Sleek, modern rooms and suites in peaceful color tones — designed to inspire rest and relaxation."
        image="/images/rooms-theme.jpg"
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
