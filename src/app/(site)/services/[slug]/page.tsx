import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import s from "../../crossed.module.css";

export function generateStaticParams() {
  return services.map((svc) => ({ slug: svc.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const svc = getService((await params).slug);
  return svc ? { title: `${svc.label}: ${svc.headline}`, description: svc.whatWeDo } : {};
}

const kicker = "text-xs font-semibold uppercase tracking-[0.25em]";

export default async function ServicePage({ params }: Props) {
  const svc = getService((await params).slug);
  if (!svc) notFound();
  const index = services.indexOf(svc) + 1;

  return (
    <article>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-8 lg:pt-10">
        <p className={`${kicker} text-gold`}>
          0{index} · {svc.label}
        </p>
        <h1 className="impact mt-4 max-w-4xl text-[2.8rem] sm:text-7xl lg:text-[5.2rem]">{svc.headline}</h1>

        <div className="mt-14 grid gap-px bg-text/10 md:grid-cols-2">
          <div className="bg-ink p-6 sm:p-8">
            <h2 className="impact text-3xl text-text/40">
              <span className={s.crossed}>The problem</span>
            </h2>
            <p className="mt-4 text-xl leading-snug text-text/80">{svc.problem}</p>
          </div>
          <div className="bg-ink p-6 sm:p-8">
            <h2 className="impact text-3xl text-gold">The fix</h2>
            <p className="mt-4 text-xl leading-snug">{svc.whatWeDo}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-text/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
          <h2 className="impact text-4xl sm:text-6xl">What you get</h2>
          <ul className="mt-8">
            {svc.youGet.map((item) => (
              <li key={item} className="flex gap-4 border-b border-text/10 py-4 text-xl font-medium">
                <span className="text-gold" aria-hidden>
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {svc.examples && (
        <section className="border-t border-text/10">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
            <h2 className="impact text-4xl sm:text-6xl">
              Things we can <span className="text-gold">automate</span>
            </h2>
            <ul className="mt-8">
              {svc.examples.map((ex) => (
                <li key={ex} className={`${s.problemRow} border-b border-text/10 py-4`}>
                  <span className={`${s.problem} text-xl font-medium`}>{ex}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-gold text-ink">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
          <h2 className="impact max-w-4xl text-4xl sm:text-6xl">Not sure this is the right fix?</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink/75">
            Tell us the problem first. We&apos;ll recommend the simplest thing that works, even if it isn&apos;t this.
          </p>
          <Link
            href="/#diagnosis"
            className="mt-8 inline-block bg-ink px-7 py-3.5 font-semibold uppercase tracking-wide text-gold transition hover:bg-neutral-800"
          >
            Get my free diagnosis
          </Link>
        </div>
      </section>
    </article>
  );
}
