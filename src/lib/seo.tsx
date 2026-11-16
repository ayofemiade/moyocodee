import type { Metadata } from "next";
import type { Service } from "@/content/services";
import { site } from "@/content/site";

/*
 * SEO helpers: per-page metadata and JSON-LD.
 * Structured data uses only confirmed facts (Google: markup must match visible content).
 * Organization, not LocalBusiness/ProfessionalService: MoyoCode has no published physical address.
 */

export const abs = (path: string) => (path === "/" ? site.url : `${site.url}${path}`);

/** Unique title/description plus matching canonical and social tags for one page. */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_GB",
      url: abs(path),
      title: absoluteTitle ? title : `${title} | MoyoCode`,
      description,
    },
    twitter: { card: "summary_large_image", title: absoluteTitle ? title : `${title} | MoyoCode`, description },
  };
}

const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        alternateName: "MoyoCode",
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/brand/moyocode-logo-512.png`,
          width: 512,
          height: 512,
        },
        slogan: site.tagline,
        description: site.description,
        founder: { "@type": "Person", name: site.founder },
        // sameAs: add official profiles (LinkedIn company page, GitHub org) once the founder confirms them.
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
    ],
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function serviceLd(svc: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(`/services/${svc.slug}`)}#service`,
    name: svc.name,
    serviceType: svc.serviceType,
    description: svc.seoDescription,
    url: abs(`/services/${svc.slug}`),
    provider: { "@id": orgId },
  };
}

export function webPageLd(type: "WebPage" | "ContactPage" | "CollectionPage", path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
  };
}

/** Server-rendered JSON-LD block. `<` is escaped so content can never close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
