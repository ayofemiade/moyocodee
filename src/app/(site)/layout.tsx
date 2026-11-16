import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd, siteGraph } from "@/lib/seo";

// The full site. Concepts under /concepts render without this chrome.
// Sitewide structured data: Organization + WebSite (see src/lib/seo.tsx for why not LocalBusiness).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <JsonLd data={siteGraph()} />
    </>
  );
}
