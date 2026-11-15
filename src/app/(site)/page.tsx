import Link from "next/link";
import { EnquiryForm } from "@/components/EnquiryForm";
import { LogoMark } from "@/components/Logo";
import { HeroChips } from "@/components/home/HeroChips";
import { PainBubbles } from "@/components/home/PainBubbles";
import { PainProvider } from "@/components/home/PainContext";
import { ProcessLine } from "@/components/home/ProcessLine";
import { AutomationVisual, SoftwareVisual, WebsiteVisual } from "@/components/home/ServiceVisuals";
import s from "@/components/home/home.module.css";
import { cta, founder, hero, nextSteps, waysClose } from "@/content/home";
import { services } from "@/content/services";

// Short enough to stay on one line at every width, so each cut lands on its words.
const struckLines = ["Unanswered enquiries", "Unchased quotes", "Forgettable websites"];

const visuals = { websites: WebsiteVisual, software: SoftwareVisual, automation: AutomationVisual } as const;

const container = "mx-auto max-w-6xl px-4 sm:px-8";
const kicker = "text-xs font-semibold uppercase tracking-[0.25em] text-gold";
const kickerOnGold = "text-xs font-semibold uppercase tracking-[0.25em] text-ink/80";

export default function Home() {
  return (
    <PainProvider>
      {/* Hero: problems get cut, the promise is visible from the first paint. */}
      <section className="relative overflow-hidden">
        <LogoMark className={`${s.heroMark} hidden lg:block`} tone="flat" />
        <div className={`${container} relative pb-20 pt-8 lg:pt-14`}>
          <p className="sr-only">Problems we remove: unanswered enquiries, unchased quotes, forgettable websites.</p>
          <div aria-hidden className="impact text-[1.9rem] sm:text-5xl lg:text-[3.3rem]">
            {struckLines.map((line) => (
              <span key={line} className={s.struckLine}>
                {line}
                <span className={`cut-bar ${s.struckBar}`} />
              </span>
            ))}
          </div>
          <h1 className="impact mt-6 text-[2.6rem] sm:text-6xl lg:text-[5rem]">
            {hero.lineOne}
            <br />
            <span className="text-gold">{hero.lineTwo}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{hero.intro}</p>
          <HeroChips />
        </div>
      </section>

      {/* Sound familiar? */}
      <section className="band-gold band-cut section-pad" aria-labelledby="problems-title">
        <div className={container}>
          <p className={kickerOnGold}>Sound familiar?</p>
          <h2 id="problems-title" className="impact mt-3 max-w-3xl text-5xl sm:text-7xl">
            Which of these is <span className="mark">you?</span>
          </h2>
          <PainBubbles />
        </div>
      </section>

      {/* Three ways: each service as its own row with its own illustration. */}
      <section className="section-pad" aria-labelledby="ways-title">
        <div className={container}>
          <p className={kicker}>The fix</p>
          <h2 id="ways-title" className="impact mt-3 text-5xl sm:text-7xl">
            Three ways we fix it
          </h2>
          <div className="mt-16 space-y-24">
            {services.map((svc, i) => {
              const Visual = visuals[svc.slug as keyof typeof visuals];
              return (
                <article key={svc.slug} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={i % 2 ? "lg:order-2" : ""}>
                    <p className="impact text-6xl text-gold">0{i + 1}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted">{svc.label}</p>
                    <h3 className="impact mt-2 text-4xl sm:text-5xl">{svc.headline}</h3>
                    <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">{svc.problem}</p>
                    <p className="mt-3 max-w-lg text-lg leading-relaxed">{svc.whatWeDo}</p>
                    <Link
                      href={`/services/${svc.slug}`}
                      className="mt-6 inline-block font-semibold uppercase tracking-wide underline decoration-gold decoration-2 underline-offset-8 transition hover:text-gold"
                    >
                      How it works →
                    </Link>
                  </div>
                  <div className={i % 2 ? "lg:order-1" : ""}>{Visual && <Visual />}</div>
                </article>
              );
            })}
          </div>
          <p className="mt-20 text-xl font-medium">{waysClose}</p>
        </div>
      </section>

      {/* How we work */}
      <section id="how" className="band-gold band-cut section-pad scroll-mt-4" aria-labelledby="how-title">
        <div className={container}>
          <p className={kickerOnGold}>Process</p>
          <h2 id="how-title" className="impact mt-3 text-5xl sm:text-7xl">
            How we <span className="mark">work</span>
          </h2>
          <ProcessLine />
        </div>
      </section>

      {/* Founder: calm, plain, real. */}
      <section className="section-pad" aria-labelledby="why-title">
        <div className={`${container} grid gap-10 lg:grid-cols-12`}>
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
            <figcaption className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-muted">
              <span className="text-gold">{founder.name}</span> · {founder.role}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Call to action */}
      <section id="diagnosis" className="band-gold band-cut scroll-mt-4" aria-labelledby="cta-title">
        <div className={`${container} section-pad grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/80">Free diagnosis</p>
            <h2 id="cta-title" className="impact mt-3 text-5xl sm:text-7xl">
              {cta.question}
            </h2>
            <p className="mt-6 text-lg text-ink/80">{cta.line}</p>
            <ol className="mt-10 space-y-5 border-t-2 border-ink/80 pt-6">
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
            <EnquiryForm button={cta.button} />
          </div>
        </div>
      </section>
    </PainProvider>
  );
}
