"use client";

import { pains } from "@/content/home";
import { usePains } from "./PainContext";
import s from "./home.module.css";

/** "Sound familiar?" as a conversation: the visitor ticks the frustrations that are theirs. */
export function PainBubbles() {
  const ctx = usePains();
  if (!ctx) return null;
  const n = ctx.picked.length;

  return (
    <>
      <ul className="mt-12 grid gap-4 md:grid-cols-2">
        {pains.map((p, i) => {
          const on = ctx.isPicked(p.id);
          return (
            <li
              key={p.id}
              className={`${s.bubble} ${on ? s.bubbleOn : ""} flex flex-col gap-5 p-6 text-text sm:p-7 ${
                i === pains.length - 1 && pains.length % 2 ? "md:col-span-2 md:w-1/2" : ""
              } ${i % 2 ? "md:translate-y-8" : ""}`}
            >
              <p className="text-xl font-medium leading-snug sm:text-2xl">
                <span className={s.quote}>&ldquo;{p.quote}&rdquo;</span>
              </p>
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => ctx.toggle(p.id)}
                  className={`min-h-11 border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition ${
                    on ? "border-gold bg-gold text-ink" : "border-text/25 hover:border-gold"
                  }`}
                >
                  {on ? "That's me ✓" : "That's me"}
                </button>
                {on && <span className="text-right text-sm text-gold">{p.fix}</span>}
              </div>
            </li>
          );
        })}
      </ul>

      <div
        aria-live="polite"
        className="mt-16 flex flex-col items-start justify-between gap-4 border-t-2 border-ink pt-6 sm:flex-row sm:items-center"
      >
        <p className="impact text-3xl sm:text-4xl">
          {n === 0 ? (
            <>
              Every one of these <span className="mark">can be fixed.</span>
            </>
          ) : (
            <>
              {n} {n === 1 ? "problem" : "problems"} picked. <span className="mark">All fixable.</span>
            </>
          )}
        </p>
        <a
          href="#diagnosis"
          className="bg-ink px-6 py-3 font-semibold uppercase tracking-wide text-gold transition hover:bg-raised"
        >
          {n === 0 ? "Tell us yours" : "Tell us about them"}
        </a>
      </div>
    </>
  );
}
