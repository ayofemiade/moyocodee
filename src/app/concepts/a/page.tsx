import { Fraunces, Instrument_Sans } from "next/font/google";
import {
  cta,
  fixes,
  hero,
  problems,
  problemsClose,
  ways,
  waysClose,
} from "@/content/home";
import s from "./a.module.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans-a" });

const numerals = ["I", "II", "III"];

export default function ConceptA() {
  return (
    <div
      className={`${s.page} ${fraunces.variable} ${sans.variable} min-h-screen`}
      style={{ fontFamily: "var(--font-sans-a), system-ui, sans-serif" }}
    >
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-8">
        <span className={`${s.display} text-xl`}>
          MoyoCode <span className="text-[#f3eee4]/50">Technologies</span>
        </span>
        <a href="#diagnosis" className="text-sm text-[#e9b949] underline-offset-4 hover:underline">
          {hero.primaryCta}
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 pt-8 sm:px-8 lg:grid-cols-12 lg:pt-16">
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.25em] text-[#e9b949]">
            A problem-solving technology company
          </p>
          <h1 className={`${s.display} mt-5 text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.4rem]`}>
            {hero.lineOne}
            <br />
            <span className={s.italicGold}>{hero.lineTwo}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#f3eee4]/70">{hero.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#diagnosis"
              className="rounded-full bg-[#e9b949] px-6 py-3 font-medium text-[#0b0a08] transition hover:bg-[#f2c96b]"
            >
              {hero.primaryCta}
            </a>
            <a
              href="#how"
              className="rounded-full border border-white/20 px-6 py-3 transition hover:border-white/50"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className={`${s.card} relative rounded-2xl p-6 sm:p-8`} aria-label="Example problems and fixes">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#f3eee4]/50">
              <span>Intake</span>
              <span>What&apos;s slowing you down?</span>
            </div>
            <div className="relative mt-6 h-52">
              {fixes.map((f, i) => (
                <div key={f.problem} className={s.case}>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#f3eee4]/40">
                    Case 00{i + 1} · Problem
                  </p>
                  <p className={`${s.display} mt-2 text-2xl italic sm:text-3xl`}>
                    <span className={s.strike}>{f.problem}</span>
                  </p>
                  <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#e9b949]">Fix</p>
                  <p className={`${s.display} mt-2 text-2xl text-[#e9b949] sm:text-3xl`}>{f.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
          <h2 className={`${s.display} text-4xl sm:text-5xl`}>Sound familiar?</h2>
          <ol className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {problems.map((p, i) => (
              <li key={p} className={`${s.row} flex items-start gap-5 py-5`}>
                <span className="w-8 shrink-0 pt-1 text-sm tabular-nums text-[#f3eee4]/40">
                  0{i + 1}
                </span>
                <p className={`${s.display} flex-1 text-xl italic leading-snug sm:text-2xl`}>
                  &ldquo;{p}&rdquo;
                </p>
                <span className={`${s.tick} mt-2 h-5 w-5 shrink-0 rounded`} aria-hidden />
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl text-lg text-[#f3eee4]/80">{problemsClose}</p>
        </div>
      </section>

      {/* Three ways */}
      <section id="how" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
          <h2 className={`${s.display} text-4xl sm:text-5xl`}>
            Three ways we <span className={s.italicGold}>solve it</span>
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[#e9b949]/30">
            {ways.map((w, i) => (
              <article key={w.key} className="md:px-8 md:first:pl-0 md:last:pr-0">
                <p className={`${s.display} text-3xl text-[#e9b949]`}>{numerals[i]}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.25em] text-[#f3eee4]/50">{w.label}</p>
                <h3 className={`${s.display} mt-2 text-2xl leading-tight`}>{w.headline}</h3>
                <p className="mt-3 leading-relaxed text-[#f3eee4]/70">{w.line}</p>
              </article>
            ))}
          </div>
          <p className={`${s.display} mt-14 text-2xl italic text-[#f3eee4]/90`}>{waysClose}</p>
        </div>
      </section>

      {/* CTA */}
      <section id="diagnosis" className="border-t border-[#e9b949]/30 bg-[#15130f]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
          <h2 className={`${s.display} max-w-3xl text-4xl leading-tight sm:text-6xl`}>{cta.question}</h2>
          <p className="mt-5 max-w-xl text-lg text-[#f3eee4]/70">{cta.line}</p>
          <a
            href="#"
            className="mt-8 inline-block rounded-full bg-[#e9b949] px-7 py-3.5 font-medium text-[#0b0a08] transition hover:bg-[#f2c96b]"
          >
            {cta.button}
          </a>
        </div>
      </section>
    </div>
  );
}
