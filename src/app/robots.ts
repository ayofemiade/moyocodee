import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Design concepts are internal comparison pages, not part of the public site.
    rules: [{ userAgent: "*", allow: "/", disallow: "/concepts" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
