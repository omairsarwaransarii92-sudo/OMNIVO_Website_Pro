import type { NextConfig } from "next";

const defaultMediaOrigin =
  process.env.NODE_ENV === "production"
    ? "https://omnivo-website-pro-7pnj.vercel.app"
    : "http://127.0.0.1:8000";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: `${process.env.DJANGO_MEDIA_ORIGIN ?? defaultMediaOrigin}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;