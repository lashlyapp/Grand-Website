import type { Metadata } from "next";
import BookingBar from "@/components/BookingBar";
import PageHero from "@/components/PageHero";
import RoomCard from "@/components/RoomCard";
import { Container } from "@/components/ui";
import { villas } from "@/content/rooms";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Villas",
  description:
    "Private villas at The Grand Hotel, Sunnyvale — separate bedroom and living room, fireplace, and full kitchen. Pet-friendly and accessible options available.",
  alternates: { canonical: "/villas/" },
};

export default function VillasPage() {
  return (
    <>
      <PageHero
        eyebrow="Accommodations"
        title="Villas"
        intro="A home away from home — private villas with a separate living room, fireplace, and full kitchen."
        image="/images/heated-pool.jpg"
      />
      <Container className="-mt-8 relative z-10">
        <BookingBar />
      </Container>
      <section className="py-16 sm:py-24">
        <Container>
          <h2 className="sr-only">Villas</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {villas.map((room) => (
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
