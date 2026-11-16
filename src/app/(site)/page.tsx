import Link from "next/link";
import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Hero } from "@/components/home/Hero";
import { PainLedger } from "@/components/home/PainLedger";
import { PainProvider } from "@/components/home/PainContext";
import { ProcessLine } from "@/components/home/ProcessLine";
import { ServiceCut, type CutSlug } from "@/components/home/ServiceCuts";
import { cta, founder, nextSteps, waysClose } from "@/content/home";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { JsonLd, pageMeta, webPageLd } from "@/lib/seo";

/*
 * Two Sides of the Cut (direction chosen 16 Nov 2026, docs/NEW_CREATIVE_DIRECTION.md).
 * Black is always the problem side, gold is always the fix side:
 *   Hero (both) → Which of these is you? (black) → Three ways we fix it (gold)
 *   → How we work (black) → A letter (gold).
 */

export const metadata: Metadata = pageMeta({
  title: "Website Design, Custom Software & AI Automation | MoyoCode",
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

const container = "mx-auto max-w-6xl px-4 sm:px-8";
const kicker = "text-xs font-semibold uppercase tracking-[0.25em]";

export default function Home() {
  return (
    <PainProvider>
      <Hero />

      {/* Problem side: the visitor picks what's theirs. */}
      <section className="section-pad" aria-labelledby="problems-title">
        <div className={container}>
          <p className={`${kicker} text-gold`}>The problem side</p>
          <h2 id="problems-title" className="impact mt-3 max-w-4xl text-5xl text-balance sm:text-7xl lg:text-8xl">
            Which of these is <span className="text-gold">you?</span>
          </h2>
          <PainLedger />
        </div>
      </section>

      {/* Fix side: each service shown as a before/after the cut passes through. */}
      <section className="band-gold band-cut section-pad" aria-labelledby="ways-title">
        <div className={container}>
          <p className={`${kicker} text-ink/80`}>The fix side</p>
          <h2 id="ways-title" className="impact mt-3 text-5xl sm:text-7xl lg:text-8xl">
            Three ways we <span className="mark">fix it</span>
          </h2>
          <div className="mt-20 space-y-28">
            {services.map((svc, i) => (
              <article key={svc.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <div className={`lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <p className="impact text-7xl">0{i + 1}</p>
                  <p className={`${kicker} mt-5 text-ink/80`}>{svc.label}</p>
                  <h3 className="impact mt-2 text-4xl sm:text-5xl">{svc.headline}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-ink/80">{svc.problem}</p>
                  <p className="mt-3 text-lg font-medium leading-relaxed">{svc.whatWeDo}</p>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="mt-7 inline-block border-b-2 border-ink pb-1 font-semibold uppercase tracking-wide transition hover:border-transparent"
                  >
                    More on {svc.name.toLowerCase()} →
                  </Link>
                </div>
                <div className={`lg:col-span-7 ${i % 2 ? "lg:order-1 lg:col-start-1" : ""}`}>
                  <ServiceCut slug={svc.slug as CutSlug} />
                </div>
              </article>
            ))}
          </div>
          <p className="impact mt-24 text-3xl sm:text-4xl">{waysClose}</p>
        </div>
      </section>

      {/* Problem side again: how the line gets drawn. */}
      <section id="how" className="section-pad" aria-labelledby="how-title">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
              <p className={`${kicker} text-gold`}>Process</p>
              <h2 id="how-title" className="impact mt-3 text-5xl sm:text-7xl lg:text-8xl">
                How we <span className="text-gold">work</span>
              </h2>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ProcessLine />
          </div>
        </div>
      </section>

      {/* Fix side: a letter. The founder's note opens it; the visitor's problem completes it. */}
      <section id="diagnosis" className="band-gold band-cut section-pad" aria-labelledby="cta-title">
        <div className={`${container} grid gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <p className={`${kicker} text-ink/80`}>Free diagnosis</p>
            <h2 id="cta-title" className="impact mt-3 text-5xl sm:text-7xl">
              {cta.question}
            </h2>
            <figure className="mt-10 border-l-4 border-ink pl-6">
              <blockquote className="text-xl font-medium leading-snug">&ldquo;{founder.note}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm font-semibold uppercase tracking-[0.15em]">
                {founder.name} <span className="text-ink/80">· {founder.role}</span>
              </figcaption>
            </figure>
            <ol className="mt-10 space-y-5 border-t-2 border-ink pt-6">
              {nextSteps.map((n, i) => (
                <li key={n.step} className="grid grid-cols-[2.5rem_1fr]">
                  <span className="impact text-3xl">0{i + 1}</span>
                  <span>
                    <span className="block font-bold uppercase tracking-wide">{n.step}</span>
                    <span className="text-ink/80">{n.line}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <p className="mb-5 text-lg text-ink/80">{cta.line}</p>
            <EnquiryForm button={cta.button} />
          </div>
        </div>
      </section>
      <JsonLd data={webPageLd("WebPage", "/", "MoyoCode Technologies", site.description)} />
    </PainProvider>
  );
}
