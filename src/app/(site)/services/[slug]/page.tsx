import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceCut, type CutSlug } from "@/components/home/ServiceCuts";
import { process } from "@/content/home";
import { getService, services } from "@/content/services";
import { JsonLd, pageMeta, serviceLd } from "@/lib/seo";
import s from "../../crossed.module.css";

export function generateStaticParams() {
  return services.map((svc) => ({ slug: svc.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const svc = getService((await params).slug);
  return svc ? pageMeta({ title: svc.seoTitle, description: svc.seoDescription, path: `/services/${svc.slug}` }) : {};
}

const container = "mx-auto max-w-6xl px-4 sm:px-8";
const kicker = "text-xs font-semibold uppercase tracking-[0.25em]";

type Tone = "ink" | "gold";
/** Sections after the hero alternate gold, ink, gold… so two gold bands never touch. */
const band = (tone: Tone) => (tone === "gold" ? "band-gold band-cut section-pad" : "section-pad");
const rule = (tone: Tone) => (tone === "gold" ? "border-ink/20" : "border-text/10");
const accent = (tone: Tone) => (tone === "gold" ? "mark" : "text-gold");
const soft = (tone: Tone) => (tone === "gold" ? "text-ink/80" : "text-muted");

function List({ items, tone, cut = false }: { items: string[]; tone: Tone; cut?: boolean }) {
  return (
    <ul className="mt-8">
      {items.map((item) => (
        <li key={item} className={`${cut ? s.problemRow : ""} flex gap-4 border-b py-4 text-xl font-medium ${rule(tone)}`}>
          <span className={tone === "gold" ? "text-ink" : "text-gold"} aria-hidden>
            →
          </span>
          <span className={cut ? s.problem : ""}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ServicePage({ params }: Props) {
  const svc = getService((await params).slug);
  if (!svc) notFound();
  const index = services.indexOf(svc) + 1;
  const others = services.filter((o) => o.slug !== svc.slug);

  const sections: { key: string; render: (tone: Tone) => React.ReactNode }[] = [
    {
      key: "who",
      render: (tone) => (
        <section className={band(tone)} key="who" aria-labelledby="who-title">
          <div className={container}>
            <h2 id="who-title" className="impact text-4xl sm:text-6xl">
              Who it&apos;s <span className={accent(tone)}>for</span>
            </h2>
            <List items={svc.forWho} tone={tone} />
          </div>
        </section>
      ),
    },
    {
      key: "get",
      render: (tone) => (
        <section className={band(tone)} key="get" aria-labelledby="get-title">
          <div className={container}>
            <h2 id="get-title" className="impact text-4xl sm:text-6xl">
              What you <span className={accent(tone)}>get</span>
            </h2>
            <List items={svc.youGet} tone={tone} />
            {svc.examples && (
              <>
                <h3 className="impact mt-14 text-3xl sm:text-4xl">Things we can automate</h3>
                <List items={svc.examples} tone={tone} cut />
              </>
            )}
          </div>
        </section>
      ),
    },
    {
      key: "how",
      render: (tone) => (
        <section className={band(tone)} key="how" aria-labelledby="how-title">
          <div className={container}>
            <h2 id="how-title" className="impact text-4xl sm:text-6xl">
              How a project <span className={accent(tone)}>runs</span>
            </h2>
            <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((p, i) => (
                <li key={p.step} className={`border-t-2 pt-4 ${tone === "gold" ? "border-ink" : "border-gold"}`}>
                  <span className="impact text-4xl">0{i + 1}</span>
                  <h3 className="impact mt-2 text-2xl">{p.step}</h3>
                  <p className={`mt-2 ${soft(tone)}`}>{p.line}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ),
    },
    {
      key: "faq",
      render: (tone) => (
        <section className={band(tone)} key="faq" aria-labelledby="faq-title">
          <div className={container}>
            <h2 id="faq-title" className="impact text-4xl sm:text-6xl">
              Questions people <span className={accent(tone)}>ask</span>
            </h2>
            <div className={`mt-8 border-t ${rule(tone)}`}>
              {svc.faqs.map((f) => (
                <details key={f.q} className={`group border-b py-5 ${rule(tone)}`}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-xl font-semibold">
                    <h3>{f.q}</h3>
                    <span aria-hidden className="impact text-2xl transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className={`mt-3 max-w-3xl text-lg leading-relaxed ${soft(tone)}`}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    {
      key: "cta",
      render: (tone) => (
        <section className={band(tone)} key="cta" aria-labelledby="cta-title">
          <div className={container}>
            <h2 id="cta-title" className="impact max-w-4xl text-4xl sm:text-6xl">
              Not sure this is the <span className={accent(tone)}>right fix?</span>
            </h2>
            <p className={`mt-4 max-w-2xl text-lg ${soft(tone)}`}>
              Tell us the problem first. We&apos;ll recommend the simplest thing that works, even if it isn&apos;t this.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/contact"
                className={`inline-block px-7 py-3.5 font-semibold uppercase tracking-wide transition ${
                  tone === "gold" ? "bg-ink text-gold hover:bg-raised" : "bg-gold text-ink hover:bg-gold-hover"
                }`}
              >
                Get my free diagnosis
              </Link>
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/services/${o.slug}`}
                  className={`border-b-2 pb-0.5 font-semibold transition hover:border-transparent ${
                    tone === "gold" ? "border-ink" : "border-gold"
                  }`}
                >
                  {o.name} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      ),
    },
  ];

  return (
    <article>
      <section className={`${container} pb-20 pt-6 lg:pt-10`}>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: svc.name, path: `/services/${svc.slug}` },
          ]}
        />
        <h1 className="mt-8">
          <span className={`${kicker} block text-gold`}>
            <span aria-hidden="true">0{index} · </span>
            {svc.name}
            <span className="sr-only">: </span>
          </span>
          <span className="impact mt-4 block max-w-4xl text-[2.8rem] text-balance sm:text-7xl lg:text-[5.2rem]">
            {svc.headline}
          </span>
        </h1>

        {/* The page's idea: the cut on this one service, full size. Problem left of it, fix right. */}
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-10 lg:col-span-5">
            <div>
              <h2 className="impact text-3xl text-struck">
                <span className={s.crossed}>The problem</span>
              </h2>
              <p className="mt-4 text-xl leading-snug text-muted">{svc.problem}</p>
            </div>
            <div>
              <h2 className="impact text-3xl text-gold">The fix</h2>
              <p className="mt-4 text-xl leading-snug">{svc.whatWeDo}</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ServiceCut slug={svc.slug as CutSlug} onDark />
          </div>
        </div>
      </section>
      {sections.map((sec, i) => sec.render(i % 2 === 0 ? "gold" : "ink"))}
      <JsonLd data={serviceLd(svc)} />
    </article>
  );
}
