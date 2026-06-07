import type { Metadata } from "next";
import BookingBar from "@/components/BookingBar";
import PageHero from "@/components/PageHero";
import RoomCard from "@/components/RoomCard";
import { Container } from "@/components/ui";
import { getAnnexRooms } from "@/lib/rooms-data";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Annex",
  description:
    "Newly constructed Annex rooms at The Grand Hotel, Sunnyvale — oversized Deluxe King and Deluxe Two Queens rooms with floor-to-ceiling windows, direct gym access, and a spa-style bathroom.",
  alternates: { canonical: "/annex/" },
};

export default async function AnnexPage() {
  const annexRooms = await getAnnexRooms();
  return (
    <>
      <PageHero
        eyebrow="Accommodations"
        title="The Annex"
        intro="Oversized deluxe rooms in our newly constructed Annex — floor-to-ceiling windows, direct gym access, and a spacious soaking tub, in the heart of Silicon Valley."
        image="/images/annex.jpg"
      />
      <Container className="-mt-8 relative z-10">
        <BookingBar />
      </Container>
      <section className="py-16 sm:py-24">
        <Container>
          <h2 className="sr-only">Annex Rooms</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {annexRooms.map((room) => (
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
