import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import BookingButton from "@/components/BookingButton";
import { Button, Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Vidovich Vineyards Package",
  description:
    "Pair your stay at The Cupertino Hotel with a visit to Vidovich Vineyards — a Weekend Wine Tasting Package with unparalleled views of the Bay Area, Apple Park, and the mountains of Cupertino.",
  alternates: { canonical: "/vidovich-vineyards/" },
};

export default function PackagePage() {
  return (
    <>
      <PageHero
        eyebrow="Special Package"
        title="Vidovich Vineyards"
        intro="Come and visit Vidovich Vineyards — make a weekend of it with a taste of the local hills."
        image="/images/about_2.jpg"
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="The Package" title="Stay, sip, and unwind">
                <p>
                  Complement your stay at The Cupertino Hotel with our Weekend
                  Wine Tasting Package at Vidovich Vineyards — taking in
                  unparalleled views of the Bay Area, Apple&rsquo;s &ldquo;spaceship,&rdquo;
                  and the mountains of Cupertino, with wine tasting, parties, and
                  estate rentals.
                </p>
                <p className="mt-4">
                  For package details and availability, contact our team or email
                  the vineyard at{" "}
                  <a href="mailto:info@vidovichvineyards.com" className="text-gold hover:underline">
                    info@vidovichvineyards.com
                  </a>
                  .
                </p>
              </SectionHeading>
              <div className="mt-8 flex flex-wrap gap-4">
                <BookingButton className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors duration-200 hover:bg-gold-dark">
                  Book a Stay
                </BookingButton>
                <Button href="/contacts/" variant="ghost">
                  Ask About the Package
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/images/amenities.jpg"
                alt="Vidovich Vineyards package"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
