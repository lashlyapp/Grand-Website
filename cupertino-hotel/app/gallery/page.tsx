import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual tour of The Cupertino Hotel — rooms and suites, the heated pool, and our Silicon Valley surroundings across from Apple Park.",
  alternates: { canonical: "/gallery/" },
};

const photos = [
  { src: "/images/hero.jpg", alt: "The Cupertino Hotel", span: "lg:col-span-2 lg:row-span-2" },
  { src: "/images/rooms/executive-suite-king.jpg", alt: "Executive king suite" },
  { src: "/images/rooms/deluxe-room.jpg", alt: "Deluxe guest room" },
  { src: "/images/pool.jpg", alt: "Heated outdoor pool", span: "lg:col-span-2" },
  { src: "/images/lobby.jpg", alt: "Lobby and reception" },
  { src: "/images/rooms/executive-suite-queen.jpg", alt: "Executive two-queen room" },
  { src: "/images/breakfast.jpg", alt: "Breakfast, restaurant & bar" },
  { src: "/images/overview.jpg", alt: "The Cupertino Hotel", span: "lg:col-span-2" },
  { src: "/images/rooms/fireplace-parlor.jpg", alt: "Fireplace parlor suite" },
  { src: "/images/meeting-room.jpg", alt: "Meeting room" },
  { src: "/images/gallery/c-02.jpg", alt: "The Cupertino Hotel interior" },
  { src: "/images/gallery/c-05.jpg", alt: "The Cupertino Hotel grounds", span: "lg:col-span-2" },
  { src: "/images/gallery/c-07.jpg", alt: "The Cupertino Hotel interior" },
  { src: "/images/overview-2.jpg", alt: "The Cupertino Hotel" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Explore"
        title="Gallery"
        intro="Step inside The Cupertino Hotel."
        image="/images/gallery-theme.jpg"
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
