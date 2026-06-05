import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui";

// Compact hero used at the top of interior pages.
export default function PageHero({
  title,
  eyebrow,
  intro,
  image = "/images/about_1.jpg",
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  image?: string;
}) {
  return (
    <section className="relative flex min-h-[46vh] items-end overflow-hidden bg-ink pt-20">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      <Container className="relative z-10 pb-12">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-white sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            {intro}
          </p>
        )}
      </Container>
    </section>
  );
}
