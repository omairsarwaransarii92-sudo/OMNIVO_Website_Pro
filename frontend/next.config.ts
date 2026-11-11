import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: `${process.env.DJANGO_MEDIA_ORIGIN ?? "http://127.0.0.1:8000"}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;