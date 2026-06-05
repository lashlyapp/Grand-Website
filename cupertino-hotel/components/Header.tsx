"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, site } from "@/content/site";
import { useBooking } from "@/components/BookingProvider";

export default function Header() {
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-ink/95 shadow-lg backdrop-blur" : "bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-content items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <Image
            src="/images/logotype.svg"
            alt={site.name}
            width={150}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium uppercase tracking-widest transition-colors ${
                  active ? "text-gold" : "text-white/85 hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => openBooking()}
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gold-dark"
          >
            Book Now
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="text-2xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-ink lg:hidden" aria-label="Mobile">
          <div className="mx-auto max-w-content px-5 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-b border-white/10 py-3 text-sm font-medium uppercase tracking-widest text-white/85"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openBooking();
              }}
              className="mt-4 block w-full rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-widest text-white"
            >
              Book Now
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
