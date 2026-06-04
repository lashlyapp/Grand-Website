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
      <h2>Digital Accessibility Compliance Guidelines and Goals</h2>
      <p>
        We follow the World Wide Web Consortium (W3C) Web Accessibility Initiative
        (WAI) guidelines, which are in line with our philosophy of promoting
        usability for people of all abilities. In accordance with WCAG 2.1
        AA-Level Compliance, our website strives to meet four core principles
        known by the acronym POUR:
      </p>
      <ul>
        <li>
          <strong>Perceivable</strong> — information and interface components are
          presented in ways users can perceive, including text alternatives,
          captions, and sufficient color contrast.
        </li>
        <li>
          <strong>Operable</strong> — interface components and navigation are
          operable, including full keyboard access and enough time to read and
          use content.
        </li>
        <li>
          <strong>Understandable</strong> — information and the operation of the
          interface are clear, readable, and predictable.
        </li>
        <li>
          <strong>Robust</strong> — content is robust enough to be interpreted
          reliably by a wide variety of user agents, including assistive
          technologies.
        </li>
      </ul>
      <p>
        We continually work to improve the experience for every visitor and to
        maintain conformance with these standards.
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
