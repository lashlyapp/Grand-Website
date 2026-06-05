import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Button, Container, SectionHeading } from "@/components/ui";
import { attractions, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Location",
  description: `${site.name} is located at ${site.address.full} — minutes from San Jose International Airport and major Silicon Valley freeways.`,
  alternates: { canonical: "/location/" },
};

const distances = [
  { place: "Apple Park", time: "Across the street" },
  { place: "San Jose International Airport (SJC)", time: "~15 minutes" },
  { place: "San Francisco International Airport (SFO)", time: "~45 minutes" },
  { place: "Oakland International Airport (OAK)", time: "30–40 minutes" },
  { place: "Levi's Stadium", time: "~15 minutes" },
];

export default function LocationPage() {
  const mapQuery = encodeURIComponent(site.address.full);
  return (
    <>
      <PageHero
        eyebrow="Find Us"
        title="Location"
        intro="At the center of Silicon Valley, easily reached from every major freeway."
        image="/images/about_1.jpg"
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Getting Here" title="Central, convenient, connected">
                <p>{site.address.full}</p>
                <p className="mt-4">
                  The Cupertino Hotel sits at the intersection of Highway 280 and
                  De Anza Boulevard, in the heart of Silicon Valley and directly
                  across from Apple Park.
                </p>
              </SectionHeading>

              <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
                {distances.map((d) => (
                  <div key={d.place} className="flex items-center justify-between gap-4 py-4">
                    <dt className="text-sm text-ink/80">{d.place}</dt>
                    <dd className="text-sm font-semibold text-gold">{d.time}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
                  external
                >
                  Get Directions
                </Button>
                <Button href={`tel:${site.phone.local}`} variant="ghost">
                  Call the Hotel
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-ink/5">
              <iframe
                title={`Map to ${site.name}`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[420px] w-full border-0"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Nearby attractions & employers */}
      <section className="bg-sand/50 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Proximity at its Best"
            title="Silicon Valley at your doorstep"
          >
            <p>
              In the heart of Silicon Valley, The Cupertino Hotel is minutes from
              Apple Park, Main Street Cupertino, the San Jose Convention Center,
              and Santana Row — and a short drive from Stanford, Santa Cruz, and
              the Monterey Peninsula.
            </p>
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.map((a) => (
              <div
                key={a.name}
                className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-ink/5"
              >
                <h3 className="font-serif text-xl text-ink">{a.name}</h3>
                <p className="mt-2 text-sm text-ink/60">{a.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
