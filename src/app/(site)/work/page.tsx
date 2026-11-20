import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WorkCase } from "@/components/work/WorkCase";
import { projects, workClose, workIntro } from "@/content/work";
import { abs, JsonLd, pageMeta, webPageLd } from "@/lib/seo";

/*
 * Work (20 Nov 2026, docs/WORK_PAGE_DIRECTION.md, concept A "Live on the fix side").
 * Each project alternates black and gold like the homepage: the client's brief on the black side
 * of a 45° cut, their live site on the other. Real screenshots only; GBC is shown as maintenance,
 * never as our design.
 */

// pending
const description =
  "Websites MoyoCode has designed, built and maintains: a personal brand portfolio, a US real estate developer and a law firm. All live.";

export const metadata: Metadata = pageMeta({
  title: "Our Work: Live Client Websites",
  description,
  path: "/work",
});

const container = "mx-auto max-w-6xl px-4 sm:px-8";

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${abs("/work")}#projects`,
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@type": "WebSite", name: p.name, url: p.url },
  })),
};

export default function WorkPage() {
  return (
    <>
      <section className={`${container} pb-20 pt-6 lg:pb-28 lg:pt-10`}>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]}
        />
        <h1 className="impact mt-8 max-w-4xl text-6xl text-balance sm:text-8xl lg:text-9xl">
          Live sites, <span className="text-gold">not mockups</span>
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-snug text-muted">{workIntro.line}</p>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold uppercase tracking-[0.15em]">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <a href={`#${p.slug}`} className="transition hover:text-gold">
                <span className="text-gold">0{i + 1}</span> {p.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {projects.map((p, i) => {
        const gold = i % 2 === 1;
        return (
          <section
            key={p.slug}
            className={`section-pad ${gold ? "band-gold band-cut" : "border-t border-text/10"}`}
            aria-labelledby={`${p.slug}-title`}
          >
            <div className={container}>
              <WorkCase project={p} index={i} gold={gold} eager={i === 0} />
            </div>
          </section>
        );
      })}

      <section className="band-gold band-cut section-pad" aria-labelledby="work-close">
        <div className={`${container} flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between`}>
          <h2 id="work-close" className="impact max-w-3xl text-5xl text-balance sm:text-7xl">
            {workClose.line}
          </h2>
          <Link
            href="/contact"
            className="shrink-0 bg-ink px-7 py-4 font-semibold uppercase tracking-wide text-gold transition hover:bg-ink/85"
          >
            {workClose.button}
          </Link>
        </div>
      </section>

      <JsonLd data={webPageLd("CollectionPage", "/work", "Our work", description)} />
      <JsonLd data={itemList} />
    </>
  );
}
