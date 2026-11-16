import type { NextConfig } from "next";
import { services } from "./src/content/services";

const nextConfig: NextConfig = {
  // Service URLs became descriptive on 16 Nov 2026. Old ones move permanently (308).
  async redirects() {
    return services.map((s) => ({
      source: `/services/${s.oldSlug}`,
      destination: `/services/${s.slug}`,
      permanent: true,
    }));
  },
  // The canonical site is www.moyocode.com. Vercel's own hostnames (production alias and
  // previews) must never be indexed as a duplicate copy.
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.*\.vercel\.app)" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
