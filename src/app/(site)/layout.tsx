import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/content/site";

// Organization data for search engines. Only confirmed facts; add contact points once published.
const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  slogan: site.tagline,
  description: site.description,
  founder: { "@type": "Person", name: site.founder },
  areaServed: ["NG", "Worldwide"],
  knowsAbout: ["Website design and development", "Custom software", "Business process automation"],
};

// The full site. Concepts under /concepts render without this chrome.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
