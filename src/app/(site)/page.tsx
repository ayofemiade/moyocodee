import Link from "next/link";
import { EnquiryForm } from "@/components/EnquiryForm";
import { cta, founder, hero, problems, problemsClose, process, waysClose } from "@/content/home";
import { services } from "@/content/services";
import s from "./crossed.module.css";

// Short enough to stay on one line at every width, so each strike lands on its words.
const struckLines = ["Unanswered enquiries", "Unchased quotes", "Forgettable websites"];

const section = "mx-auto max-w-6xl px-4 py-20 sm:px-8";
const kicker = "text-xs font-semibold uppercase tracking-[0.25em] text-gold";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-8 lg:pt-10">
        <p className="sr-only">Problems we remove: unanswered enquiries, unchased quotes, forgettable websites.</p>
        <div className="impact text-[2rem] sm:text-5xl lg:text-[3.4rem]" aria-hidden>
          {struckLines.map((line) => (
            <span key={line} className={s.struck}>
              {line}
            </span>
          ))}
        </div>
        <div className={s.reveal}>
          <h1 className="impact mt-6 text-[2.6rem] sm:text-6xl lg:text-[4.6rem]">
            {hero.lineOne}
            <br />
            <span className="text-gold">{hero.lineTwo}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text/70">{hero.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#diagnosis"
              className="bg-gold px-6 py-3 font-semibold uppercase tracking-wide text-ink transition hover:bg-text"
            >
              {hero.primaryCta}
            </a>
            <a
              href="#how"
              className="border border-text/25 px-6 py-3 font-semibold uppercase tracking-wide transition hover:border-text"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      {/* Sound familiar? */}
      <section className="border-t border-text/10" aria-labelledby="problems-title">
        <div className={section}>
          <h2 id="problems-title" className="impact text-5xl sm:text-7xl">
            Sound <span className="text-gold">familiar?</span>
          </h2>
          <ul className="mt-10">
            {problems.map((p) => (
              <li key={p} className={`${s.problemRow} border-b border-text/10 py-5`}>
                <span className={`${s.problem} text-xl font-medium leading-snug sm:text-2xl`}>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-lg font-medium text-gold">{problemsClose}</p>
        </div>
      </section>

      {/* Three ways */}
      <section className="border-t border-text/10" aria-labelledby="ways-title">
        <div className={section}>
          <h2 id="ways-title" className="impact text-5xl sm:text-7xl">
            Three ways we fix it
          </h2>
          <div className="mt-12 grid gap-px bg-text/10 md:grid-cols-3">
            {services.map((svc, i) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group flex flex-col bg-ink p-6 transition hover:bg-[#0f0f0f] sm:p-8"
              >
                <p className="impact text-6xl text-gold">0{i + 1}</p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-text/50">{svc.label}</p>
                <h3 className="impact mt-2 text-3xl">{svc.headline}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-text/70">{svc.whatWeDo}</p>
                <span className="mt-6 text-sm font-semibold uppercase tracking-wide text-text/60 transition group-hover:text-gold">
                  See how →
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-xl font-medium">{waysClose}</p>
        </div>
      </section>

      {/* How we work */}
      <section id="how" className="scroll-mt-6 border-t border-text/10" aria-labelledby="how-title">
        <div className={section}>
          <h2 id="how-title" className="impact text-5xl sm:text-7xl">
            How we <span className="text-gold">work</span>
          </h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.step} className="border-t-2 border-gold pt-5">
                <p className="impact text-5xl text-gold">0{i + 1}</p>
                <h3 className="impact mt-3 text-3xl">{p.step}</h3>
                <p className="mt-2 leading-relaxed text-text/70">{p.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Founder */}
      <section className="border-t border-text/10" aria-labelledby="why-title">
        <div className={`${section} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <p className={kicker}>Why MoyoCode</p>
            <h2 id="why-title" className="impact mt-3 text-5xl sm:text-6xl">
              Problem first.
              <br />
              <span className="text-gold">Tools second.</span>
            </h2>
          </div>
          <figure className="border-l-4 border-gold pl-6 sm:pl-10 lg:col-span-7">
            <blockquote className="text-2xl font-medium leading-snug sm:text-3xl">&ldquo;{founder.note}&rdquo;</blockquote>
            <figcaption className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-text/60">
              <span className="text-gold">{founder.name}</span> · {founder.role}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Call to action */}
      <section id="diagnosis" className="scroll-mt-6 bg-gold text-ink" aria-labelledby="cta-title">
        <div className={`${section} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/70">Free diagnosis</p>
            <h2 id="cta-title" className="impact mt-3 text-5xl sm:text-7xl">
              {cta.question}
            </h2>
            <p className="mt-6 text-lg text-ink/75">{cta.line}</p>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm button={cta.button} />
          </div>
        </div>
      </section>
    </>
  );
}
