import type { Metadata } from "next";
import ProsePage from "@/components/Prose";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join the team at ${site.name} in Cupertino, California.`,
  alternates: { canonical: "/careers/" },
};

export default function CareersPage() {
  return (
    <ProsePage title="Careers" eyebrow="Join Us" image="/images/services-first.jpg">
      <p>
        At {site.name}, our people are the heart of the guest experience. We are
        always glad to hear from warm, service-minded individuals who take pride
        in hospitality.
      </p>
      <h2>How to apply</h2>
      <p>
        To express interest in joining our team, email your résumé and a short
        note to <a href={`mailto:${site.email}`}>{site.email}</a> or call us at{" "}
        {site.phone.local}. We&rsquo;ll be in touch if there&rsquo;s a fit.
      </p>
      <h2>Equal opportunity</h2>
      <p>
        We are an equal-opportunity employer and welcome applicants of all
        backgrounds.
      </p>
    </ProsePage>
  );
}
