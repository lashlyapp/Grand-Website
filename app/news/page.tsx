import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Container, SectionHeading } from "@/components/ui";
import { pressMentions } from "@/content/site";

export const metadata: Metadata = {
  title: "News",
  description: "The Grand Hotel, Sunnyvale — in the press and in the news.",
  alternates: { canonical: "/news/" },
};

// Grand-specific press coverage. Each item links out to its source — only
// verifiable items belong here (no award claims without a public source).
const community: {
  title: string;
  source: string;
  url?: string;
  body: string;
}[] = [
  {
    title: "Silicon Valley's Grand Hotel announces $25 million addition",
    source: "PR Newswire",
    url: "https://www.prnewswire.com/news-releases/silicon-valleys-grand-hotel-sunnyvale-announces-25-million-dollar-addition-301202135.html",
    body: "A 60,000 sq. ft. Annex across four floors — 51 new rooms, two state-of-the-art meeting spaces, and a new gym — completed June 2021.",
  },
  {
    title: "Grand Hotel Sunnyvale opens new $25m annex",
    source: "Hotel Management Network",
    url: "https://www.hotelmanagement-network.com/news/grand-hotel-sunnyvale-annex/",
    body: "Trade-press coverage of the Annex: floor-to-ceiling windows, advanced meeting spaces, contactless check-in, and 155 rooms in total.",
  },
  {
    title: "Safe housing for healthcare workers and wildfire evacuees",
    source: "Hospitality Net",
    url: "https://www.hospitalitynet.org/announcement/41005724.html",
    body: "Through the pandemic, The Grand housed healthcare workers from local institutions like Kaiser and El Camino, as well as Californians affected by the wildfire crisis.",
  },
  {
    title: "GM Claudio Bono among CHLA's top nominees",
    source: "Hotel Online",
    url: "https://www.hotel-online.com/news/silicon-valleys-grand-hotel-sunnyvale-announces-25-million-dollar-addition",
    body: "A top nominee for the California Hotel & Lodging Association's Outstanding General Manager of the Year 2020, past CREST Award recipient, and President Elect of the Cupertino Chamber of Commerce.",
  },
];

const updates = [
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
        intro="What's new at The Grand Hotel — and where you've seen us."
        image="/images/services-second.jpg"
      />

      {/* As seen on TV */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="As Seen On TV" title="The Grand Hotel in the press" align="center" />
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

      {/* Press coverage */}
      <section className="bg-sand/50 py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="In the News" title="The Grand, covered" />
          <div className="mt-10 max-w-3xl divide-y divide-ink/10">
            {community.map((p) => (
              <article key={p.title} className="py-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                  {p.source}
                </p>
                <h2 className="mt-2 font-serif text-2xl text-ink">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-gold"
                    >
                      {p.title}{" "}
                      <span aria-hidden="true" className="text-base align-middle">
                        ↗
                      </span>
                    </a>
                  ) : (
                    p.title
                  )}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Hotel updates */}
      <section className="py-16 sm:py-24">
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
