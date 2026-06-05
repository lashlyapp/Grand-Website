import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EventInquiryForm from "@/components/EventInquiryForm";
import { Container, SectionHeading } from "@/components/ui";
import { meetingRooms, salesEmail } from "@/content/site";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Host your next meeting, gathering, or special occasion at The Cupertino Hotel in Silicon Valley. Inquire about our De Anza Room and Conference Parlor.",
  alternates: { canonical: "/events/" },
};

const eventTypes = [
  {
    title: "Corporate Meetings",
    body: "A convenient Silicon Valley setting for offsites, interviews, and team gatherings.",
  },
  {
    title: "Private Celebrations",
    body: "Mark birthdays, reunions, and milestones with comfortable spaces and attentive service.",
  },
  {
    title: "Extended Stays",
    body: "Relocating a team or hosting visiting colleagues? Ask about group and long-stay rates.",
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Gather"
        title="Events"
        intro="Spaces and service for meetings, celebrations, and everything in between."
        image="/images/services-first.jpg"
      />

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What We Host"
            title="Bring your people together"
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {eventTypes.map((e) => (
              <div key={e.title} className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-ink/5">
                <h3 className="font-serif text-2xl text-ink">{e.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{e.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Meeting Rooms */}
      <section className="bg-sand/50 py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Meeting Rooms" title="De Anza Room & Conference Parlor">
            <p>
              We specialize in creating exceptional small meetings and memorable
              events. Our meeting rooms can be staged in a variety of ways for
              business meetings or special occasions, with audio-visual equipment
              available and our sales and food &amp; beverage team on hand to
              customize every detail. To inquire, email{" "}
              <a href={`mailto:${salesEmail}`} className="text-gold hover:underline">
                {salesEmail}
              </a>
              .
            </p>
          </SectionHeading>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {meetingRooms.map((room) => (
              <div
                key={room.name}
                className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-ink/5"
              >
                <h3 className="font-serif text-2xl text-ink">{room.name}</h3>
                <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <Spec label="Dimensions" value={room.dimensions} />
                  <Spec label="Ceiling Height" value={room.ceiling} />
                  <Spec label="Total Area" value={room.squareFootage} />
                  <Spec label="Price" value={room.price} />
                </dl>

                <h4 className="mt-6 text-xs font-semibold uppercase tracking-widest text-ink/50">
                  Maximum Occupancy
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {room.capacity.map((c) => (
                    <li
                      key={c.layout}
                      className="rounded-full bg-sand px-3 py-1 text-xs text-ink/70"
                    >
                      {c.layout}: {c.seats}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-xs leading-relaxed text-ink/55">
                  {room.accessibility}
                </p>
              </div>
            ))}

            {/* Inquiry form */}
            <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-ink/5">
              <h3 className="font-serif text-2xl text-ink">Inquiry Form</h3>
              <p className="mt-2 text-sm text-ink/60">
                Tell us about your event and we&rsquo;ll be in touch to help plan it.
              </p>
              <div className="mt-6">
                <EventInquiryForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-widest text-ink/45">
        {label}
      </dt>
      <dd className="mt-1 text-ink/80">{value}</dd>
    </div>
  );
}
