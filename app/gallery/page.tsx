import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual tour of The Grand Hotel, Sunnyvale — rooms, villas, the heated pool, and our Silicon Valley surroundings.",
  alternates: { canonical: "/gallery/" },
};

// Property photos from the hotel's MyHotelOps (Cloudflare) CDN media library.
const MHO =
  "https://cdn.myhotelops.com/cg-hotel-group/grand-hotel/8582.11603.sunnyvale.grand-hotel-sunnyvale";

const photos = [
  { src: `${MHO}.overview.jpg`, alt: "The Grand Hotel — property overview", span: "lg:col-span-2 lg:row-span-2" },
  { src: `${MHO}.other.exteriors-swimming-pool.jpg`, alt: "Hotel exterior and heated swimming pool", span: "lg:col-span-2" },
  { src: `${MHO}.other.lobby-reception.jpg`, alt: "Lobby reception" },
  { src: `${MHO}.amenity.meeting-room.jpg`, alt: "Meeting room" },
  { src: `${MHO}.other.breakfast-bar.jpg`, alt: "Breakfast bar", span: "lg:col-span-2" },
  { src: `${MHO}.other.room-service-robot.jpg`, alt: "Room-service delivery robot", span: "lg:col-span-2" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Explore"
        title="Gallery"
        intro="Step inside The Grand Hotel."
        image="/images/amenities.jpg"
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4">
            {photos.map((p, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl ${p.span ?? ""}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
