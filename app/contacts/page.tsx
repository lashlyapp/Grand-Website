import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { Container, SectionHeading } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} in Sunnyvale, CA. Call ${site.phone.tollFree} or send us a message.`,
  alternates: { canonical: "/contacts/" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Say Hello"
        title="Contact"
        intro="We're here to help with reservations, events, and everything in between."
        image="/images/services-first.jpg"
      />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Reach Us" title="Get in touch" />
              <dl className="mt-8 space-y-6">
                <Detail label="Address">{site.address.full}</Detail>
                <Detail label="Phone">
                  <a href={`tel:${site.phone.tollFree}`} className="hover:text-gold">
                    {site.phone.tollFree}
                  </a>{" "}
                  ·{" "}
                  <a href={`tel:${site.phone.local}`} className="hover:text-gold">
                    {site.phone.local}
                  </a>
                </Detail>
                <Detail label="Email">
                  <a href={`mailto:${site.email}`} className="hover:text-gold">
                    {site.email}
                  </a>
                </Detail>
              </dl>
            </div>
            <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-ink/5">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-widest2 text-gold">
        {label}
      </dt>
      <dd className="mt-1 text-base text-ink/80">{children}</dd>
    </div>
  );
}
