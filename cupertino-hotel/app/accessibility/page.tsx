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
        We offer ADA-accessible guest rooms, including an accessible two-queen
        room and an accessible king room, and the property is ADA compliant.
        Please contact us before your stay so we can ensure your needs are met.
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
      <h2>Conformance status</h2>
      <p>
        This website aims to conform to <strong>WCAG 2.1 Level AA</strong>.
        &ldquo;Partially conformant&rdquo; means that some parts of the content
        may not yet fully conform; we are actively working toward full
        conformance. This statement was last reviewed in June 2026.
      </p>

      <h2>Ongoing monitoring</h2>
      <p>
        We run automated accessibility checks (axe-core, pa11y, and Lighthouse)
        on every release to catch regressions, and we periodically conduct
        manual reviews. Automated testing has known limits, so we welcome
        feedback from people who use assistive technologies.
      </p>
      <h2>Reporting a barrier &amp; feedback</h2>
      <p>
        If you encounter any difficulty using this site, need help with a
        reservation, or want to report an accessibility barrier, please contact
        us — we treat accessibility issues as a priority:
      </p>
      <ul>
        <li>
          Phone: <a href={`tel:${site.phone.tollFree}`}>{site.phone.tollFree}</a> (toll-free)
          or <a href={`tel:${site.phone.local}`}>{site.phone.local}</a>
        </li>
        <li>
          Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>Mail: {site.address.full}</li>
      </ul>
      <p>
        We aim to respond to accessibility feedback within{" "}
        <strong>3 business days</strong>. If you need information from this site
        in an alternative format, let us know and we will provide it.
      </p>
    </ProsePage>
  );
}
