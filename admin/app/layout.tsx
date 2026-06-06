import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { getUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "CG Hotels Admin",
  description: "Manage room content for The Grand and The Cupertino hotels.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

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
              <Link href="/settings" className="hover:text-ink">
                Settings
              </Link>
            </nav>
            {user && (
              <div className="ml-auto flex items-center gap-3 text-sm text-ink/60">
                <span>{user.email}</span>
                <form action="/auth/signout" method="post">
                  <button className="text-gold hover:text-gold-dark">
                    Sign out
                  </button>
                </form>
              </div>
            )}
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
      </body>
    </html>
  );
}
