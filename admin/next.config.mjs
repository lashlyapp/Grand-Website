/** @type {import('next').NextConfig} */
const nextConfig = {
  // Internal admin — no SEO/trailing-slash concerns. Room cover thumbnails are
  // rendered with plain <img> (arbitrary hosts), so no next/image remote config
  // is needed here.
  reactStrictMode: true,
};

export default nextConfig;
