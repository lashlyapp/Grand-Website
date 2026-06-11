// DISABLED BY DECISION (2026-06): the Vidovich Vineyards wine package is not
// currently offered, so this page is intentionally NOT linked from any nav,
// footer, or sitemap. It is not an orphan — do not "fix" it by adding links.
// The code is kept so the package can be re-launched later: to re-enable, add
// it back to footerNav in content/site.ts (the sitemap derives from that list).
import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import BookingButton from "@/components/BookingButton";
import { Button, Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Vidovich Vineyards Package",
  description:
    "Pair your stay at The Grand Hotel with a visit to Vidovich Vineyards — a special package for wine lovers in Silicon Valley.",
  alternates: { canonical: "/vidovich-vineyards/" },
};

export default function PackagePage() {
  return (
    <>
      <PageHero
        eyebrow="Special Package"
        title="Vidovich Vineyards"
        intro="Make a weekend of it — pair a stay with a taste of the local vineyards."
        image="/images/about_2.jpg"
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="The Package" title="Stay, sip, and unwind">
                <p>
                  Complement your time at The Grand Hotel with a curated wine
                  experience at Vidovich Vineyards. It&rsquo;s the perfect way to
                  slow down after a week of meetings, or to turn a Silicon Valley
                  visit into a getaway.
                </p>
                <p className="mt-4">
                  Contact our team to learn more about current package details,
                  availability, and seasonal offerings.
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
