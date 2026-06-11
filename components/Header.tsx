"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, site } from "@/content/site";
import { useBooking } from "@/components/BookingProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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
            src="/images/the-grand-logo.png"
            alt={site.name}
            width={150}
            height={52}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {mainNav.map((item) => {
              const active =
                pathname === item.href ||
                (item.children?.some((c) => pathname === c.href) ?? false);
              const linkCls = `text-sm font-medium uppercase tracking-widest transition-colors ${
                active ? "text-gold" : "text-white/85 hover:text-gold"
              }`;

              if (!item.children) {
                return (
                  <Link key={item.href} href={item.href} className={linkCls}>
                    {item.label}
                  </Link>
                );
              }

              // Dropdown group (e.g. Rooms → Guest Rooms / Villas / Annex).
              // Opens on hover and keyboard focus; the padded wrapper keeps the
              // pointer inside the group while moving down to the menu.
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={`${linkCls} inline-flex items-center gap-1.5`}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <svg
                      width="9"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform group-hover:rotate-180"
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </Link>
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="min-w-44 rounded-xl bg-ink/95 p-2 shadow-xl ring-1 ring-white/10 backdrop-blur">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className={`block rounded-lg px-4 py-2.5 text-sm font-medium uppercase tracking-widest transition-colors ${
                            pathname === c.href
                              ? "text-gold"
                              : "text-white/85 hover:bg-white/5 hover:text-gold"
                          }`}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
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

          <LanguageSwitcher />

          {/* Persistent booking CTA on mobile/tablet (desktop has it in the nav
              above). The header is fixed, so this stays visible at all times. */}
          <button
            type="button"
            onClick={() => openBooking()}
            className="rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gold-dark lg:hidden"
          >
            Book Now
          </button>

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
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-ink lg:hidden" aria-label="Mobile">
          <div className="mx-auto max-w-content px-5 py-4">
            {mainNav.map((item) =>
              item.children ? (
                // Grouped pages render as the parent followed by indented children.
                <div key={item.href} className="border-b border-white/10 py-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                    {item.label}
                  </p>
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block py-2 pl-4 text-sm font-medium uppercase tracking-widest text-white/85"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-b border-white/10 py-3 text-sm font-medium uppercase tracking-widest text-white/85"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
