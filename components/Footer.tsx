import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import NewsletterForm from "@/components/NewsletterForm";
import { footerNav, mainNav, site } from "@/content/site";

const socialLinks = [
  { label: "Facebook", href: site.social.facebook },
  { label: "Instagram", href: site.social.instagram },
  { label: "Twitter", href: site.social.twitter },
  { label: "YouTube", href: site.social.youtube },
  { label: "TripAdvisor", href: site.social.tripadvisor },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/images/the-grand-logo.png"
              alt={site.name}
              width={160}
              height={56}
              className="h-12 w-auto"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {site.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  {s.label}
                </a>
              ))}
            </div>

            <div className="mt-8 max-w-sm">
              <h3 className="text-xs font-semibold uppercase tracking-widest2 text-gold">
                Newsletter
              </h3>
              <p className="mt-3 text-sm text-white/60">
                Subscribe for news, offers, and seasonal packages.
              </p>
              <div className="mt-4">
                <NewsletterForm />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest2 text-gold">
              Explore
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest2 text-gold">
              Contact
            </h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-white/75">
              <p>{site.address.full}</p>
              <p>
                <a href={`tel:${site.phone.tollFree}`} className="hover:text-gold">
                  {site.phone.tollFree}
                </a>{" "}
                ·{" "}
                <a href={`tel:${site.phone.local}`} className="hover:text-gold">
                  {site.phone.local}
                </a>
              </p>
              <p>Fax: {site.phone.fax}</p>
              <p>
                <a href={`mailto:${site.email}`} className="hover:text-gold">
                  {site.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.name} © {site.copyrightYear} · A {site.parentCompany} property
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
