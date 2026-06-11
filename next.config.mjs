/** @type {import('next').NextConfig} */
const nextConfig = {
  // Match the existing site's trailing-slash URLs (e.g. /rooms/) to preserve SEO.
  trailingSlash: true,
  images: {
    // WebP only: AVIF was listed first, and its on-demand encode on Vercel is
    // slow enough (seconds per image/size) to visibly delay hero images on
    // first views. WebP encodes near-instantly at a similar size.
    formats: ["image/webp"],
    // Keep optimized derivatives cached for 31 days — the source photos in
    // /public rarely change (and content images use unique URLs).
    minimumCacheTTL: 2678400,
    // Remote hosts are allowed only as a fallback while assets are being
    // migrated. The goal is for all media to live in /public (self-hosted) or
    // on the MyHotelOps Cloudflare account — NOT on Cendyn CDNs.
    remotePatterns: [
      // MyHotelOps (Cloudflare) CDN — the hotel's own media library (tour
      // videos and property photos like the events-page meeting room hero).
      { protocol: "https", hostname: "cdn.myhotelops.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.traveltripper.io" },
      { protocol: "https", hostname: "*.cloudflarestream.com" },
      { protocol: "https", hostname: "videodelivery.net" },
      // Supabase Storage — room cover images generated from tour-video frames.
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  // Long-lived browser caching for the static photo library. Vercel's default
  // for /public is max-age=0 + etag revalidation, which adds a round trip per
  // image on every visit (and caps how long browsers keep optimizer output,
  // since derivatives inherit the larger of this and minimumCacheTTL). The
  // photos change rarely — and usually under a new filename — so a month with
  // stale-while-revalidate is safe.
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2678400, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
