import type { Metadata } from "next";
import ProsePage from "@/components/Prose";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: `${site.name} is committed to accessibility for all guests and website visitors.`,
  alternates: { canonical: "/accessibility/" },
};

export default function AccessibilityPage() {
  return (
    <ProsePage title="Accessibility Statement" eyebrow="Welcoming All" image="/images/about_2.jpg">
      <p>
        {site.name} is committed to ensuring that our property and this website
        are accessible to all guests, including people with disabilities.
      </p>
      <h2>Our property</h2>
      <p>
        We offer ADA-accessible guest rooms and villas, including accessible
        two-queen rooms, an accessible king villa, and an accessible premier
        fireplace suite. Please contact us before your stay so we can ensure your
        needs are met.
      </p>
      <h2>This website</h2>
      <p>
        We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1
        Level AA. We continually work to improve the experience for every visitor.
      </p>
      <h2>Need assistance?</h2>
      <p>
        If you encounter any difficulty using this site, or need help with a
        reservation, please call <a href={`tel:${site.phone.tollFree}`}>{site.phone.tollFree}</a>{" "}
        or email <a href={`mailto:${site.email}`}>{site.email}</a>. We are happy
        to assist.
      </p>
    </ProsePage>
  );
}
