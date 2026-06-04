import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "News",
  description: "Updates, offers, and happenings at The Grand Hotel, Sunnyvale.",
  alternates: { canonical: "/news/" },
};

// Placeholder content structured so a light CMS can populate it later.
const posts = [
  {
    title: "Fitness room now open on site",
    date: "Recently",
    body: "Keep your routine going — our on-site fitness room is available to all guests.",
  },
  {
    title: "Happy hour, every evening",
    date: "Ongoing",
    body: "Join us daily from 5:00 to 6:00 pm for complimentary drinks (up to two per guest).",
  },
  {
    title: "DoorDash delivery at the front desk",
    date: "Ongoing",
    body: "Order in and have your meal handed off conveniently at the front desk.",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay in the Loop"
        title="News"
        intro="What's new at The Grand Hotel."
        image="/images/services-second.jpg"
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl divide-y divide-ink/10">
            {posts.map((p) => (
              <article key={p.title} className="py-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                  {p.date}
                </p>
                <h2 className="mt-2 font-serif text-2xl text-ink">{p.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
