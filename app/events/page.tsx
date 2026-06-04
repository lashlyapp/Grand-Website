import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Button, Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Host your next meeting, gathering, or special occasion at The Grand Hotel in Sunnyvale, Silicon Valley.",
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
          <div className="mt-12 text-center">
            <Button href="/contacts/">Inquire About Events</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
