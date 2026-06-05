/** @type {import('next').NextConfig} */
const nextConfig = {
  // Match the existing site's trailing-slash URLs (e.g. /rooms/) to preserve SEO.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Remote hosts are allowed only as a fallback while assets are being
    // migrated. The goal is for all media to live in /public (self-hosted) or
    // on the MyHotelOps Cloudflare account — NOT on Cendyn CDNs.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.traveltripper.io" },
      { protocol: "https", hostname: "*.cloudflarestream.com" },
      { protocol: "https", hostname: "videodelivery.net" },
    ],
  },
};

export default nextConfig;
