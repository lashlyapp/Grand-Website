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

const photos = [
  { src: "/images/suites.jpg", alt: "Guest suite", span: "lg:col-span-2 lg:row-span-2" },
  { src: "/images/gallery/gallery-05.jpg", alt: "Guest room" },
  { src: "/images/gallery/gallery-06.jpg", alt: "Guest room interior" },
  { src: "/images/heated-pool.jpg", alt: "Heated outdoor pool", span: "lg:col-span-2" },
  { src: "/images/gallery/gallery-07.jpg", alt: "Hotel interior" },
  { src: "/images/gallery/gallery-08.jpg", alt: "Guest bathroom" },
  { src: "/images/gallery/gallery-09.jpg", alt: "Villa living area" },
  { src: "/images/gallery/gallery-10.jpg", alt: "Guest room with two queen beds", span: "lg:col-span-2" },
  { src: "/images/gallery/gallery-14.jpg", alt: "Hotel grounds" },
  { src: "/images/gallery/gallery-15.jpg", alt: "Hotel detail" },
  { src: "/images/gallery/gallery-16.jpg", alt: "Guest room" },
  { src: "/images/gallery/gallery-17.jpg", alt: "Hotel amenities" },
  { src: "/images/amenities.jpg", alt: "Hotel amenities", span: "lg:col-span-2" },
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
