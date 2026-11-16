import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceCut, type CutSlug } from "@/components/home/ServiceCuts";
import { getService, services } from "@/content/services";
import s from "../../crossed.module.css";

export function generateStaticParams() {
  return services.map((svc) => ({ slug: svc.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const svc = getService((await params).slug);
  return svc
    ? {
        title: `${svc.label}: ${svc.headline}`,
        description: svc.whatWeDo,
        alternates: { canonical: `/services/${svc.slug}` },
      }
    : {};
}

const container = "mx-auto max-w-6xl px-4 sm:px-8";
const kicker = "text-xs font-semibold uppercase tracking-[0.25em]";

type Tone = "ink" | "gold";
/** Sections after the hero alternate gold, ink, gold… so two gold bands never touch. */
const band = (tone: Tone) => (tone === "gold" ? "band-gold band-cut section-pad" : "section-pad");

export default async function ServicePage({ params }: Props) {
  const svc = getService((await params).slug);
  if (!svc) notFound();
  const index = services.indexOf(svc) + 1;

  const sections: { key: string; render: (tone: Tone) => React.ReactNode }[] = [
    {
      key: "get",
      render: (tone) => (
        <section className={band(tone)} key="get">
          <div className={container}>
            <h2 className="impact text-4xl sm:text-6xl">What you get</h2>
            <ul className="mt-8">
              {svc.youGet.map((item) => (
                <li
                  key={item}
                  className={`flex gap-4 border-b py-4 text-xl font-medium ${tone === "gold" ? "border-ink/20" : "border-text/10"}`}
                >
                  <span className={tone === "gold" ? "text-ink" : "text-gold"} aria-hidden>
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ),
    },
    ...(svc.examples
      ? [
          {
            key: "examples",
            render: (tone: Tone) => (
              <section className={band(tone)} key="examples">
                <div className={container}>
                  <h2 className="impact text-4xl sm:text-6xl">
                    Things we can{" "}
                    <span className={tone === "gold" ? "mark" : "text-gold"}>automate</span>
                  </h2>
                  <ul className="mt-8">
                    {svc.examples!.map((ex) => (
                      <li
                        key={ex}
                        className={`${s.problemRow} border-b py-4 ${tone === "gold" ? "border-ink/20" : "border-text/10"}`}
                      >
                        <span className={`${s.problem} text-xl font-medium`}>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ),
          },
        ]
      : []),
    {
      key: "cta",
      render: (tone) => (
        <section className={band(tone)} key="cta">
          <div className={container}>
            <h2 className="impact max-w-4xl text-4xl sm:text-6xl">
              Not sure this is the{" "}
              <span className={tone === "gold" ? "mark" : "text-gold"}>right fix?</span>
            </h2>
            <p className={`mt-4 max-w-2xl text-lg ${tone === "gold" ? "text-ink/80" : "text-muted"}`}>
              Tell us the problem first. We&apos;ll recommend the simplest thing that works, even if it isn&apos;t this.
            </p>
            <Link
              href="/#diagnosis"
              className={`mt-8 inline-block px-7 py-3.5 font-semibold uppercase tracking-wide transition ${
                tone === "gold" ? "bg-ink text-gold hover:bg-raised" : "bg-gold text-ink hover:bg-gold-hover"
              }`}
            >
              Get my free diagnosis
            </Link>
          </div>
        </section>
      ),
    },
  ];

  return (
    <article>
      <section className={`${container} pb-20 pt-6 lg:pt-10`}>
        <p className={`${kicker} text-gold`}>
          0{index} · {svc.label}
        </p>
        <h1 className="impact mt-4 max-w-4xl text-[2.8rem] text-balance sm:text-7xl lg:text-[5.2rem]">{svc.headline}</h1>

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
    </article>
  );
}
