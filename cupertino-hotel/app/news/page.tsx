import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Container, SectionHeading } from "@/components/ui";
import { pressMentions } from "@/content/site";

export const metadata: Metadata = {
  title: "News",
  description: "The Cupertino Hotel — in the press and in the news.",
  alternates: { canonical: "/news/" },
};

const updates = [
  {
    title: "Complimentary continental breakfast, daily",
    date: "Ongoing",
    body: "Continental breakfast is served daily — 6:30 to 10:00 am (Mon–Fri) and 7:00 to 10:30 am (Sat & Sun).",
  },
  {
    title: "Happy hour, every evening",
    date: "Ongoing",
    body: "Join us daily from 5:00 to 6:00 pm for complimentary drinks (up to two per guest).",
  },
  {
    title: "Heated pool open daily",
    date: "Ongoing",
    body: "Our heated outdoor pool is open every day from 7:00 am to 10:00 pm.",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay in the Loop"
        title="News"
        intro="What's new at The Cupertino Hotel — and where you've seen us."
        image="/images/services-second.jpg"
      />

      {/* As seen on TV */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="As Seen On TV" title="The Cupertino Hotel in the press" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pressMentions.map((p) => (
              <div
                key={p.outlet}
                className="flex flex-col rounded-xl bg-white p-7 text-center shadow-sm ring-1 ring-ink/5"
              >
                <span className="font-serif text-3xl text-gold">{p.outlet}</span>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.title}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Hotel updates */}
      <section className="bg-sand/50 py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Updates" title="Happening at the hotel" />
          <div className="mt-10 max-w-3xl divide-y divide-ink/10">
            {updates.map((p) => (
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
