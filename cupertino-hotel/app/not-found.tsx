import { Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ink pt-20">
      <Container className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest2 text-gold">
          404
        </p>
        <h1 className="mt-4 font-serif text-4xl text-white sm:text-5xl">
          This page wandered off
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          The page you&rsquo;re looking for isn&rsquo;t here. Let&rsquo;s get you
          back to a comfortable place.
        </p>
        <div className="mt-8">
          <Button href="/">Return Home</Button>
        </div>
      </Container>
    </section>
  );
}
