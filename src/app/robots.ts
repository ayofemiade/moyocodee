import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /concepts is noindex (concepts/layout.tsx). It is NOT disallowed here, because a disallow
    // would stop search engines from seeing that noindex.
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
