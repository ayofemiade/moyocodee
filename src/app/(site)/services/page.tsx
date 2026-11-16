import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceCut, type CutSlug } from "@/components/home/ServiceCuts";
import { waysClose } from "@/content/home";
import { services } from "@/content/services";
import { JsonLd, pageMeta, webPageLd } from "@/lib/seo";

/*
 * Services hub: one page that names all three services in plain search language and links to each.
 * Idea: the homepage's "three ways we fix it", as an index. Problem first, then the fix.
 */

// pending (SEO round, 16 Nov 2026): hub description and intro line need founder approval.
const description =
  "Website design and development, custom software and AI automation for businesses. Start with the problem; we recommend the simplest fix.";

export const metadata: Metadata = pageMeta({
  title: "Services: Websites, Software & Automation | MoyoCode",
  description,
  path: "/services",
  absoluteTitle: true,
});

const container = "mx-auto max-w-6xl px-4 sm:px-8";

export default function ServicesPage() {
  return (
    <>
      <section className={`${container} pb-16 pt-6 lg:pt-10`}>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]}
        />
        <h1 className="impact mt-8 max-w-4xl text-5xl text-balance sm:text-7xl lg:text-8xl">
          Websites, software and <span className="text-gold">automation</span>
        </h1>
        {/* pending */}
        <p className="mt-6 max-w-2xl text-xl leading-snug text-muted">
          Three ways we fix a business problem. {waysClose}
        </p>
      </section>

      <section className="band-gold band-cut section-pad" aria-label="Our services">
        <div className={`${container} space-y-24`}>
          {services.map((svc, i) => (
            <article key={svc.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <p className="impact text-6xl">0{i + 1}</p>
                <h2 className="impact mt-4 text-4xl sm:text-5xl">
                  <Link href={`/services/${svc.slug}`} className="transition hover:opacity-70">
                    {svc.name}
                  </Link>
                </h2>
                <p className="mt-3 text-xl font-semibold">{svc.headline}</p>
                <p className="mt-4 text-lg leading-relaxed text-ink/80">{svc.problem}</p>
                <Link
                  href={`/services/${svc.slug}`}
                  className="mt-6 inline-block border-b-2 border-ink pb-1 font-semibold uppercase tracking-wide transition hover:border-transparent"
                >
                  More on {svc.name.toLowerCase()} →
                </Link>
              </div>
              <div className="lg:col-span-7">
                <ServiceCut slug={svc.slug as CutSlug} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad" aria-labelledby="hub-cta">
        <div className={container}>
          <h2 id="hub-cta" className="impact max-w-4xl text-4xl sm:text-6xl">
            Not sure which you <span className="text-gold">need?</span>
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-block bg-gold px-7 py-3.5 font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-hover"
          >
            Get my free diagnosis
          </Link>
        </div>
      </section>
      <JsonLd data={webPageLd("CollectionPage", "/services", "MoyoCode services", description)} />
    </>
  );
}
