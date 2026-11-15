import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { Schematic } from "@/components/Schematic";
import { cta, hero, problems, problemsClose, ways, waysClose } from "@/content/home";
import s from "./c.module.css";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-bp" });

// The bracket/flow styles come from globals.css.
export default function ConceptC() {
  return (
    <div
      className={`${s.page} ${grotesk.variable} ${mono.variable} min-h-screen`}
      style={{ fontFamily: "var(--font-grotesk), system-ui, sans-serif" }}
    >
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-8">
        <span className={`${s.grotesk} text-xl font-semibold`}>
          moyocode<span className="text-[#d9a93f]">_</span>
        </span>
        <a href="#diagnosis" className={`${s.mono} text-xs uppercase tracking-[0.2em] text-[#d9a93f]`}>
          [ {hero.primaryCta} ]
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-6 sm:px-8 lg:grid-cols-12 lg:pt-12">
        <div className="lg:col-span-7">
          <p className={`${s.mono} text-xs uppercase tracking-[0.25em] text-[#d9a93f]`}>
            Problem-solving technology company
          </p>
          <h1 className={`${s.grotesk} mt-5 text-[2.6rem] font-medium leading-[1.02] sm:text-6xl lg:text-[4.2rem]`}>
            {hero.lineOne}
            <br />
            <span className="text-[#d9a93f]">{hero.lineTwo}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#e8e6e1]/70">{hero.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#diagnosis"
              className={`${s.mono} bg-[#d9a93f] px-5 py-3 text-sm uppercase tracking-[0.15em] text-[#0c0f14] transition hover:bg-[#ecc063]`}
            >
              {hero.primaryCta}
            </a>
            <a
              href="#how"
              className={`${s.mono} border border-[#e8e6e1]/30 px-5 py-3 text-sm uppercase tracking-[0.15em] transition hover:border-[#e8e6e1]`}
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md lg:col-span-5">
          <Schematic />
        </div>
      </section>

      {/* Problems */}
      <section className="border-t border-[#d9a93f]/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
          <h2 className={`${s.grotesk} text-4xl font-medium sm:text-5xl`}>Sound familiar?</h2>
          <ul className="mt-10 space-y-3">
            {problems.map((p, i) => (
              <li key={p} className="bracket flex gap-5 border border-[#e8e6e1]/10 p-5">
                <span className={`${s.mono} shrink-0 pt-1 text-xs text-[#d9a93f]`}>P-0{i + 1}</span>
                <p className="text-lg leading-snug sm:text-xl">{p}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-lg text-[#e8e6e1]/80">{problemsClose}</p>
        </div>
      </section>

      {/* Three ways */}
      <section id="how" className="border-t border-[#d9a93f]/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
          <h2 className={`${s.grotesk} text-4xl font-medium sm:text-5xl`}>Three ways we solve it</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ways.map((w, i) => (
              <article key={w.key} className="bracket border border-[#e8e6e1]/10 p-6">
                <p className={`${s.mono} text-xs uppercase tracking-[0.2em] text-[#d9a93f]`}>
                  Module 0{i + 1} · {w.label}
                </p>
                <h3 className={`${s.grotesk} mt-4 text-2xl font-medium leading-tight`}>{w.headline}</h3>
                <p className="mt-3 leading-relaxed text-[#e8e6e1]/70">{w.line}</p>
              </article>
            ))}
          </div>
          <p className={`${s.mono} mt-10 text-sm text-[#e8e6e1]/80`}>{"// "}{waysClose}</p>
        </div>
      </section>

      {/* CTA */}
      <section id="diagnosis" className="border-t border-[#d9a93f]/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8">
          <h2 className={`${s.grotesk} max-w-3xl text-4xl font-medium leading-tight sm:text-6xl`}>{cta.question}</h2>
          <p className="mt-5 max-w-xl text-lg text-[#e8e6e1]/70">{cta.line}</p>
          <div className="bracket mt-8 max-w-2xl border border-[#e8e6e1]/15 p-5">
            <p className={`${s.mono} text-sm text-[#e8e6e1]/50`}>
              Describe the problem<span className={s.cursor} aria-hidden />
            </p>
          </div>
          <Link
            href="/"
            className={`${s.mono} mt-6 inline-block bg-[#d9a93f] px-6 py-3.5 text-sm uppercase tracking-[0.15em] text-[#0c0f14] transition hover:bg-[#ecc063]`}
          >
            {cta.button}
          </Link>
        </div>
      </section>
    </div>
  );
}
