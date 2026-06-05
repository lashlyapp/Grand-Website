import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CG Hotels Admin",
  description: "Manage room content for The Grand and The Cupertino hotels.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-ink/10 bg-white">
          <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-5">
            <Link href="/" className="font-semibold tracking-tight">
              CG Hotels <span className="text-gold">Admin</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm text-ink/70">
              <Link href="/rooms" className="hover:text-ink">
                Rooms
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
      </body>
    </html>
  );
}
