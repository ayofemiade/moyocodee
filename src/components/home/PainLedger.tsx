"use client";

import { pains } from "@/content/home";
import { usePains } from "./PainContext";
import s from "./home.module.css";

/**
 * "Which of these is you?" as a ruled ledger on the problem side (black).
 * Picking a line cuts it through at the logo's angle and its fix appears in gold.
 * Picks are shared with the enquiry form.
 */
export function PainLedger() {
  const ctx = usePains();
  if (!ctx) return null;
  const n = ctx.picked.length;

  return (
    <>
      <ol className="mt-14 border-t border-text/15">
        {pains.map((p, i) => {
          const on = ctx.isPicked(p.id);
          return (
            <li key={p.id} className="border-b border-text/15">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => ctx.toggle(p.id)}
                className={`${s.ledgerRow} ${on ? s.ledgerOn : ""} group grid w-full cursor-pointer grid-cols-[2.5rem_1fr] items-start gap-x-4 py-7 text-left sm:grid-cols-[4rem_1fr_auto] sm:gap-x-8`}
              >
                <span className="impact pt-1 text-2xl text-muted">0{i + 1}</span>
                <span>
                  <span className={`${s.ledgerQuote} text-2xl font-medium leading-snug sm:text-[2rem]`}>
                    &ldquo;{p.quote}&rdquo;
                  </span>
                  <span className={`${s.ledgerFix} mt-3 block text-lg font-semibold text-gold`}>→ {p.fix}</span>
                </span>
                <span
                  className={`col-start-2 mt-4 w-fit border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition sm:col-start-auto sm:mt-1 ${
                    on ? "border-gold bg-gold text-ink" : "border-text/30 group-hover:border-gold"
                  }`}
                >
                  {on ? "That's me ✓" : "That's me"}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div
        aria-live="polite"
        className="mt-12 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"
      >
        <p className="impact text-3xl sm:text-5xl">
          {n === 0 ? (
            <>
              Every one of these <span className="text-gold">can be fixed.</span>
            </>
          ) : (
            <>
              {n} {n === 1 ? "problem" : "problems"} picked. <span className="text-gold">All fixable.</span>
            </>
          )}
        </p>
        <a
          href="#diagnosis"
          className="bg-gold px-6 py-3.5 font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-hover"
        >
          {n === 0 ? "Tell us yours" : "Tell us about them"}
        </a>
      </div>
    </>
  );
}
