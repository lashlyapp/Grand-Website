import Image from "next/image";
import Link from "next/link";
import BookingBar from "@/components/BookingBar";
import BookingButton from "@/components/BookingButton";
import HeroReviews from "@/components/HeroReviews";
import HeroRateTicker from "@/components/HeroRateTicker";
import RoomCard from "@/components/RoomCard";
import { Button, Container, SectionHeading } from "@/components/ui";
import { amenities, site, testimonials } from "@/content/site";
import { guestRooms } from "@/content/rooms";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink">
        <Image
          src="/images/suites.jpg"
          alt="The Cupertino Hotel, across from Apple Park"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink/80" />
        <Container className="relative z-10 pt-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest2 text-gold">
              Cupertino · Silicon Valley
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-6xl">
              A welcoming haven in the heart of Silicon Valley
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              {site.tagline}. Directly across from Apple Park and minutes from San
              Jose International Airport — value, comfort, and an unbeatable
              location await.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/rooms/">Explore Rooms</Button>
              <Button href="/location/" variant="outline">
                Find Us
              </Button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <HeroReviews />
            <HeroRateTicker />
          </div>

          <div className="mt-6 max-w-4xl">
            <BookingBar floating />
          </div>
        </Container>
      </section>

      {/* Intro / Our hotel */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
              <Image
                src="/images/about_1.jpg"
                alt="Inside The Cupertino Hotel"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeading eyebrow="Our Hotel" title="A welcoming haven for every traveler">
                <p>
                  The Cupertino Hotel is easily accessible from all major Silicon
                  Valley freeways — 15 minutes from San Jose International Airport
                  and only 30 to 40 minutes from both San Francisco and Oakland
                  International Airports.
                </p>
                <p className="mt-4">
                  Whether you are here for business or leisure, our property pairs
                  spacious, modern rooms with warm, attentive service — right
                  across the street from Apple Park.
                </p>
              </SectionHeading>
              <div className="mt-8">
                <Button href="/gallery/" variant="ghost">
                  View Gallery
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Rooms preview */}
      <section className="bg-sand/50 py-20 sm:py-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Stay" title="Rooms & suites for every stay" />
            <Link
              href="/rooms/"
              className="text-sm font-semibold uppercase tracking-widest text-gold hover:text-gold-dark"
            >
              View all rooms →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guestRooms.slice(0, 3).map((room) => (
              <RoomCard key={room.code} room={room} />
            ))}
          </div>
        </Container>
      </section>

      {/* Amenities */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our Services"
            title="Thoughtful amenities, around the clock"
            align="center"
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((a) => (
              <div key={a.title} className="bg-cream p-7">
                <h3 className="font-serif text-xl text-ink">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-sand/50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Testimonials"
            title="What our guests say"
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.author}
                className="flex flex-col rounded-xl bg-white p-8 shadow-sm ring-1 ring-ink/5"
              >
                <blockquote className="font-serif text-xl leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold uppercase tracking-widest text-gold">
                  {t.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Location strip */}
      <section className="relative overflow-hidden bg-ink py-20 sm:py-28">
        <Image
          src="/images/heated-pool.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Central Location"
              title="Perfectly placed in Cupertino"
              light
            >
              <p>
                {site.address.full} — directly across from Apple Park, at the
                intersection of Highway 280 and De Anza Boulevard, moments from the
                region&rsquo;s leading employers, shopping, and dining.
              </p>
            </SectionHeading>
            <div className="mt-8 flex flex-wrap gap-4">
              <BookingButton className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors duration-200 hover:bg-gold-dark">
                Book Your Stay
              </BookingButton>
              <Button href="/location/" variant="outline">
                Directions
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
