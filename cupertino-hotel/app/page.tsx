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

// Cupertino's signature: the address itself. These travel facts anchor the
// site's personality on what's unique to this property — being across the
// street from Apple Park, at the center of Silicon Valley.
const locationFacts = [
  { value: "Across the street", label: "Apple Park" },
  { value: "15 min", label: "San Jose Int'l Airport" },
  { value: "15 min", label: "Levi's Stadium" },
  { value: "30–40 min", label: "SF & Oakland airports" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink">
        <Image
          src="/images/hero.png"
          alt="A king suite at The Cupertino Hotel"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        {/* Tint is heaviest at the top (for the header + headline) and fades
            lighter toward the bottom so the hero image opens up. */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/40 to-ink/10" />
        <Container className="relative z-10 pt-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest2 text-gold">
              Across from Apple Park · Cupertino
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-6xl">
              A welcoming haven in the heart of Silicon Valley
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              {site.tagline}. The Cupertino Hotel is easily accessible from all
              major Silicon Valley freeways — directly across the street from
              Apple Park and just 15 minutes from San Jose International Airport.
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
                src="/images/lobby.jpg"
                alt="Inside The Cupertino Hotel"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeading eyebrow="Comfort & Style" title="Value and an unbeatable location in the heart of Silicon Valley">
                <p>
                  Relax in the comfort of the Cupertino Hotel — offering value and
                  an unbeatable location in the heart of Silicon Valley, surrounded
                  by the region&rsquo;s largest high-tech companies, financial
                  institutions, and major universities.
                </p>
                <p className="mt-4">
                  Whether you are here for business or leisure, we take pride in our
                  exemplary guest service, pairing spacious, modern, elegant rooms
                  and suites with a warm welcome — right across the street from
                  Apple Park.
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

      {/* Signature band — Cupertino's defining address (across from Apple Park) */}
      <section className="border-y border-ink/10 bg-cream py-14">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-widest2 text-gold">
            Across from Apple Park
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-center font-serif text-2xl leading-snug text-ink sm:text-3xl">
            No other Silicon Valley address puts you closer to it all.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-ink/10 lg:grid-cols-4">
            {locationFacts.map((f) => (
              <div key={f.label} className="bg-cream px-6 py-8 text-center">
                <dt className="font-serif text-2xl leading-tight text-gold sm:text-3xl">
                  {f.value}
                </dt>
                <dd className="mt-2 text-sm text-ink/70">{f.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Rooms preview */}
      <section className="bg-sand/50 py-20 sm:py-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Accommodations" title="Sleek, modern rooms designed to inspire rest" />
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
          src="/images/pool.jpg"
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
                {site.address.full} — directly across the street from Apple Park,
                at the intersection of Highway 280 and De Anza Boulevard. Just 15
                minutes from San Jose International Airport and Levi&rsquo;s
                Stadium, and moments from the region&rsquo;s leading employers,
                shopping, and dining.
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
