import type { Metadata } from "next";

// Internal design-history pages: never in search results. Crawling is allowed (robots.ts)
// so search engines can actually see this noindex.
export const metadata: Metadata = {
  title: { absolute: "Design concepts (internal) | MoyoCode" },
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function ConceptsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
