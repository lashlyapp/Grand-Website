import type { Metadata } from "next";
import ProsePage from "@/components/Prose";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
  alternates: { canonical: "/privacy-policy/" },
};

export default function PrivacyPage() {
  return (
    <ProsePage title="Privacy Policy" eyebrow="Legal" image="/images/about_1.jpg">
      <p>
        {site.name} respects your privacy. This policy explains, in plain terms,
        what information we collect when you use this website and how we use it.
      </p>
      <h2>Information we collect</h2>
      <p>
        When you contact us or make an enquiry, we may collect your name, email
        address, phone number, and any details you choose to share. Reservations
        are processed through our booking partner; please review their privacy
        practices when booking.
      </p>
      <h2>How we use information</h2>
      <p>
        We use your information to respond to enquiries, process and service
        reservations, and improve our guest experience. We do not sell your
        personal information.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy? Email us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
        {site.phone.tollFree}.
      </p>
      <p className="text-sm text-ink/50">
        This is a general template and should be reviewed by counsel before
        launch to reflect your actual data practices and applicable laws.
      </p>
    </ProsePage>
  );
}
