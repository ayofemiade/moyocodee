import { Anton, Inter } from "next/font/google";
import { cta, hero, problems, problemsClose, ways, waysClose } from "@/content/home";
import s from "./b.module.css";

// Short enough to stay on one line at every width, so each strike lands on its word.
const struckLines = ["Unanswered enquiries", "Unchased quotes", "Forgettable websites"];

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter-b" });

export default function ConceptB() {
  return (
    <div
      className={`${s.page} ${anton.variable} ${inter.variable} min-h-screen`}
      style={{ fontFamily: "var(--font-inter-b), system-ui, sans-serif" }}
    >
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-8">
        <span className={`${s.impact} text-2xl`}>
          Moyo<span className="text-[#f2c14e]">Code</span>
        </span>
        <a href="#diagnosis" className="text-sm font-medium text-[#f2c14e]">
          {hero.primaryCta} →
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-8 lg:pt-10">
        <p className="sr-only">Problems we remove:</p>
        <div className={`${s.impact} text-[2rem] sm:text-5xl lg:text-[3.4rem]`} aria-hidden>
          {struckLines.map((line) => (
            <span key={line} className={s.struck}>
              {line}
            </span>
          ))}
        </div>
        <div className={s.reveal}>
          <h1 className={`${s.impact} mt-6 text-[2.6rem] sm:text-6xl lg:text-[4.6rem]`}>
            {hero.lineOne}
            <br />
            <span className="text-[#f2c14e]">{hero.lineTwo}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#f5f3ee]/70">{hero.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#diagnosis"
              className="bg-[#f2c14e] px-6 py-3 font-semibold uppercase tracking-wide text-black transition hover:bg-white"
            >
              {hero.primaryCta}
            </a>
            <a
              href="#how"
              className="border border-white/25 px-6 py-3 font-semibold uppercase tracking-wide transition hover:border-white"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
          <h2 className={`${s.impact} text-5xl sm:text-7xl`}>
            Sound <span className="text-[#f2c14e]">familiar?</span>
          </h2>
          <ul className="mt-10">
            {problems.map((p) => (
              <li key={p} className={`${s.problemRow} border-b border-white/10 py-5`}>
                <span className={`${s.problem} text-xl font-medium leading-snug sm:text-2xl`}>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-lg font-medium text-[#f2c14e]">{problemsClose}</p>
        </div>
      </section>

      {/* Three ways */}
      <section id="how" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
          <h2 className={`${s.impact} text-5xl sm:text-7xl`}>Three ways we fix it</h2>
          <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-3">
            {ways.map((w, i) => (
              <article key={w.key} className="bg-[#050505] p-6 sm:p-8">
                <p className={`${s.impact} text-6xl text-[#f2c14e]`}>0{i + 1}</p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/50">{w.label}</p>
                <h3 className={`${s.impact} mt-2 text-3xl`}>{w.headline}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{w.line}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-xl font-medium">{waysClose}</p>
        </div>
      </section>

      {/* CTA */}
      <section id="diagnosis" className="bg-[#f2c14e] text-black">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
          <h2 className={`${s.impact} max-w-4xl text-5xl sm:text-8xl`}>{cta.question}</h2>
          <p className="mt-6 max-w-xl text-lg text-black/75">{cta.line}</p>
          <a
            href="#"
            className="mt-8 inline-block bg-black px-7 py-3.5 font-semibold uppercase tracking-wide text-[#f2c14e] transition hover:bg-neutral-800"
          >
            {cta.button}
          </a>
        </div>
      </section>
    </div>
  );
}
