import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/components/BookingProvider";
import { RoomDetailProvider } from "@/components/RoomDetailProvider";
import { site } from "@/content/site";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Hotel in Cupertino, Silicon Valley`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} | Cupertino, CA`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: ["/images/hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Cupertino, CA`,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

// Structured data so search engines understand this is a lodging business.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone.tollFree,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: site.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.address.geo.lat,
    longitude: site.address.geo.lng,
  },
  petsAllowed: true,
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Heated Pool" },
    { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi" },
    { "@type": "LocationFeatureSpecification", name: "Continental Breakfast" },
    { "@type": "LocationFeatureSpecification", name: "24-Hour Room Service" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BookingProvider>
          <RoomDetailProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </RoomDetailProvider>
        </BookingProvider>
      </body>
    </html>
  );
}
