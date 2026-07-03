import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      // /for-teams duplicated /clubs (same audience, same pitch) — clubs is canonical.
      { source: "/for-teams", destination: "/clubs", permanent: true },
      // The homepage briefly linked /for-clubs (404) — catch any bookmarks.
      { source: "/for-clubs", destination: "/clubs", permanent: true },
    ];
  },
};

export default nextConfig;
