/** @type {import('next').NextConfig} */
const nextConfig = {
  // Internal admin — no SEO/trailing-slash concerns. Room cover thumbnails are
  // rendered with plain <img> (arbitrary hosts), so no next/image remote config
  // is needed here.
  reactStrictMode: true,
  experimental: {
    // Make sure the static ffmpeg binary is bundled with the /api/frames
    // serverless function (it's referenced by path, not imported, so Next's
    // file tracing wouldn't include it automatically).
    outputFileTracingIncludes: {
      "/api/frames": ["./node_modules/ffmpeg-static/ffmpeg"],
    },
  },
};

export default nextConfig;
