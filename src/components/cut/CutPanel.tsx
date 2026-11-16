import { ScrollScene } from "./ScrollScene";
import s from "./cut.module.css";

/**
 * Before / after, cut at 45° as the panel scrolls into view.
 * No JS and reduced motion both show the finished "after" state.
 */
export function CutPanel({
  before,
  after,
  label,
  onDark = false,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  /** What the illustration shows, for the caption and screen readers. */
  label: string;
  /** Caption colour for panels sitting on the black (problem) side. */
  onDark?: boolean;
}) {
  return (
    <figure className="w-full">
      <ScrollScene mode="pass" initial={1} reducedTo={1} className={`${s.panel} ${onDark ? s.onDark : ""}`} aria-hidden>
        <div className={s.before}>
          <span className={s.tag}>Before</span>
          {before}
        </div>
        <div className={s.after}>
          <span className={s.tag}>After</span>
          {after}
        </div>
        <span className={s.blade} />
      </ScrollScene>
      <figcaption
        className={`mt-3 text-xs font-semibold uppercase tracking-[0.2em] ${onDark ? "text-muted" : "text-ink/80"}`}
      >
        Illustration · {label}
      </figcaption>
    </figure>
  );
}
