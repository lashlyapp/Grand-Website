import Image from "next/image";
import Link from "next/link";
import BookingBar from "@/components/BookingBar";
import BookingButton from "@/components/BookingButton";
import HeroReviews from "@/components/HeroReviews";
import HeroRateTicker from "@/components/HeroRateTicker";
import RoomCard from "@/components/RoomCard";
import { Button, Container, SectionHeading } from "@/components/ui";
import { amenities, site, testimonials } from "@/content/site";
import { getGuestRooms } from "@/lib/rooms-data";
import { getDisclaimer } from "@/lib/site-data";
import { GoogleLogo, TripadvisorLogo } from "@/components/BrandLogos";

export default async function HomePage() {
  const guestRooms = await getGuestRooms();
  const disclaimer = (await getDisclaimer()).trim();
  return (
    <>
      {/* Hero — image runs full-bleed to the top of the screen, behind the fixed
          header. The service notice rides as a translucent overlay at the very
          top (inner pages show it as an in-flow band instead). */}
      <section className="relative flex min-h-[88vh] flex-col overflow-hidden bg-ink">
        <Image
          src="/images/hero.jpg"
          alt="A guest room at The Grand Hotel, Sunnyvale"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        {/* This hero photo is bright, so the tint runs darker at the top to keep
            the header + headline legible, then fades lighter toward the bottom. */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/55 to-ink/15" />
        {disclaimer && (
          <aside
            role="region"
            aria-label="Hotel service notice"
            className="relative z-30 w-full border-b border-white/10 bg-ink/40 pb-3 pt-[84px] backdrop-blur-sm"
          >
            <div className="w-full px-5 sm:px-8">
              <p className="text-xs leading-relaxed text-white/80">{disclaimer}</p>
            </div>
          </aside>
        )}
        <Container className="relative z-10 flex flex-1 flex-col justify-center py-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest2 text-gold">
              Sunnyvale · Silicon Valley
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-6xl">
              A grand welcome in the heart of Silicon Valley
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              {site.tagline}. Minutes from San Jose International Airport and every
              major freeway — comfort, style, and genuine hospitality await.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <HeroReviews />
            <HeroRateTicker />
          </div>

          <div className="mt-5 max-w-4xl">
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
                src="/images/our-hotel.jpg"
                alt="A guest working in a room at The Grand Hotel"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeading eyebrow="Our Hotel" title="A welcoming haven for every traveler">
                <p>
                  The Grand Hotel is easily accessible from all major Silicon
                  Valley freeways — 15 minutes from San Jose International Airport
                  and only 30 to 40 minutes from both San Francisco and Oakland
                  International Airports.
                </p>
                <p className="mt-4">
                  Whether you are here for business or leisure, our boutique
                  property pairs modern comfort with warm, attentive service.
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

      {/* Fitness — new gym (photo featured) */}
      <section className="relative overflow-hidden bg-ink py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Fitness"
                title="Train in our brand-new fitness center"
                light
              >
                <p>
                  Our newly built gym is open to all guests and connects directly
                  to the Annex — modern equipment and room to move, so you can keep
                  your routine without leaving the hotel.
                </p>
              </SectionHeading>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl ring-1 ring-white/10">
              <Image
                src={site.gymImage}
                alt="The Grand Hotel's new fitness center"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Amenities */}
      {/* Amenities — continuous marquee. A fixed grid left empty cells on the
          last row; this scrolls instead, pausing on hover/focus and falling back
          to a manual horizontal scroll when reduced motion is requested. */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our Services"
            title="Thoughtful amenities, around the clock"
            align="center"
          />
        </Container>
        <div className="group relative mt-14 overflow-hidden motion-reduce:overflow-x-auto">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent motion-reduce:hidden sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent motion-reduce:hidden sm:w-24" />
          <ul
            aria-label="Hotel amenities"
            className="flex w-max animate-marquee py-4 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none"
            style={{ animationDuration: `${amenities.length * 7}s` }}
          >
            {[...amenities, ...amenities].map((a, i) => {
              // The list is duplicated for the seamless marquee; the second
              // copy is aria-hidden, so keep its toggle out of the tab order.
              const hidden = i >= amenities.length;
              const bullets = a.details && a.details.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink/70">
                  {a.details.map((detail) => (
                    <li key={detail} className="flex gap-2.5">
                      <span
                        aria-hidden
                        className="mt-[0.5em] size-1 shrink-0 rounded-full bg-gold"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              );
              return (
                <li
                  key={i}
                  aria-hidden={hidden}
                  className="mr-5 flex w-72 shrink-0 flex-col rounded-xl bg-white p-7 shadow-sm ring-1 ring-ink/5"
                >
                  <h3 className="font-serif text-xl leading-snug text-ink text-balance">
                    {a.title}
                  </h3>
                  {a.description && (
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      {a.description}
                    </p>
                  )}
                  {bullets &&
                    (a.collapsible ? (
                      <details className="group/more mt-2">
                        <summary
                          tabIndex={hidden ? -1 : undefined}
                          className="cursor-pointer list-none text-sm font-medium text-gold transition-colors hover:text-gold-dark"
                        >
                          <span className="group-open/more:hidden">More</span>
                          <span className="hidden group-open/more:inline">
                            Less
                          </span>
                        </summary>
                        {bullets}
                      </details>
                    ) : (
                      bullets
                    ))}
                </li>
              );
            })}
          </ul>
        </div>
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
                key={t.quote}
                className="flex flex-col rounded-xl bg-white p-8 shadow-sm ring-1 ring-ink/5"
              >
                <blockquote className="flex-1 font-serif text-xl leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  {t.source === "Google" ? <GoogleLogo /> : <TripadvisorLogo />}
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
              title="Perfectly placed in Sunnyvale"
              light
            >
              <p>
                {site.address.full}. At the center of Silicon Valley and moments
                from Apple, Google, LinkedIn, and the region&rsquo;s leading
                employers, theaters, and dining.
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
