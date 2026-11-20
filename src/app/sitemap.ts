import type { MetadataRoute } from "next";
import { contentUpdated, services } from "@/content/services";
import { site } from "@/content/site";

// Only canonical, indexable URLs. lastModified is the date the page's content last changed,
// not the build time (a build-time date tells search engines everything changes on every deploy).
export default function sitemap(): MetadataRoute.Sitemap {
  const at = (path: string, lastModified: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    lastModified,
    priority,
  });
  return [
    at("/", contentUpdated, 1),
    at("/services", contentUpdated, 0.8),
    ...services.map((s) => at(`/services/${s.slug}`, contentUpdated, 0.9)),
    at("/work", "2026-11-20", 0.8),
    at("/contact", contentUpdated, 0.7),
    at("/privacy", "2026-11-16", 0.3),
  ];
}
