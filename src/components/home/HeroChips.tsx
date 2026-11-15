"use client";

import { pains } from "@/content/home";
import { usePains } from "./PainContext";
import s from "./home.module.css";

/** "Tap your problem": each chip gets cut and its fix appears. The choice carries into the form. */
export function HeroChips() {
  const ctx = usePains();
  if (!ctx) return null;
  const last = [...pains].reverse().find((p) => ctx.isPicked(p.id));

  return (
    <div className="mt-10">
      <p id="chips-label" className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
        What&apos;s slowing you down? Tap yours.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2.5" aria-labelledby="chips-label">
        {pains.map((p) => {
          const on = ctx.isPicked(p.id);
          return (
            <li key={p.id}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => ctx.toggle(p.id)}
                className={`${s.chip} ${on ? s.chipOn : ""}`}
              >
                <span className={s.chipText}>{p.chip}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p aria-live="polite" className="mt-5 min-h-[1.75rem] text-lg">
        {last && (
          <>
            <span className="font-semibold text-gold">Fix:</span> {last.fix}{" "}
            <a href="#diagnosis" className="font-semibold underline decoration-gold underline-offset-4 hover:text-gold">
              Tell us more →
            </a>
          </>
        )}
      </p>
    </div>
  );
}
