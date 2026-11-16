import { ScrollScene } from "@/components/cut/ScrollScene";
import { chaos, hero } from "@/content/home";
import s from "./hero.module.css";

const frag = [s.f0, s.f1, s.f2, s.f3, s.f4, s.f5, s.f6];

/**
 * Two sides of the cut. The problem side (black) shows a business's everyday mess; the fix side
 * (gold) is clipped by a 45° line. Scrolling moves the line until gold holds the whole screen,
 * and every fragment it passes turns into its fixed version.
 *
 * Accessibility: the fix layer carries the real h1 and copy. The problem layer is decorative
 * (aria-hidden); the illustration is summarised once for screen readers.
 */
export function Hero() {
  return (
    <ScrollScene as="section" mode="pin" initial={0} reducedTo={0} className={s.scene} aria-label="Introduction">
      <div className={s.stage}>
        <div className={`${s.layer} ${s.problem}`} aria-hidden>
          {chaos.map((c, i) => (
            <span key={c.problem} className={`${s.frag} ${frag[i]}`}>
              {c.problem}
            </span>
          ))}
          <p className={s.lineOne}>
            Tell us
            <br />
            the problem.
          </p>
        </div>

        <div className={`${s.layer} ${s.fix}`}>
          <p className="sr-only">
            Illustration: everyday business problems such as missed calls, overdue invoices and unanswered quotes,
            each turning into its fix as the gold line passes over it.
          </p>
          {chaos.map((c, i) => (
            <span key={c.fixed} aria-hidden className={`${s.frag} ${frag[i]}`}>
              {c.fixed}
            </span>
          ))}
          <h1>
            <span className={s.lineOne}>
              Tell us
              <br />
              the problem.
            </span>
            <span className={s.lineTwo}>
              We&apos;ll build
              <br />
              what solves it.
            </span>
          </h1>
          <div className={s.intro}>
            <p>MoyoCode is a problem-solving technology company.</p>
            <a
              href="#diagnosis"
              className="bg-ink px-6 py-3.5 font-semibold uppercase tracking-wide text-gold transition hover:bg-raised"
            >
              {hero.primaryCta}
            </a>
          </div>
        </div>

        <span className={s.blade} aria-hidden />
      </div>
    </ScrollScene>
  );
}
