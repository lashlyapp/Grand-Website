import PageHero from "@/components/PageHero";
import { Container } from "@/components/ui";

// Simple text-page wrapper for legal/info pages.
export default function ProsePage({
  title,
  eyebrow,
  image,
  children,
}: {
  title: string;
  eyebrow?: string;
  image?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero title={title} eyebrow={eyebrow} image={image} />
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-ink/80 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-ink [&_a]:text-gold [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_strong]:font-semibold [&_strong]:text-ink">
            {children}
          </div>
        </Container>
      </section>
    </>
  );
}
