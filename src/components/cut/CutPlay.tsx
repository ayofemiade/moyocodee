"use client";

import { useEffect, useRef } from "react";

/**
 * Plays a before/after cut on a timer once the panel is properly on screen.
 *
 * Why time, not scroll position: on a laptop screen the panel is nearly as tall as the visible
 * area, so a scroll-linked cut always ran while part of the panel was off screen, and fast
 * scrollers skipped it. Here the visitor always gets:
 *   1. the "before", whole and still, for HOLD ms once the panel is ≥ 85% in view (below the header);
 *   2. the 45° cut sweeping across in SWEEP ms;
 *   3. the "after", which stays.
 * When the panel leaves the screen completely it resets, so coming back plays it again.
 *
 * It writes only --p (0 = before, 1 = after), the same variable the CSS clip uses.
 * Server HTML starts on the "before" (--p: 0) so nothing flashes at hydration.
 * No JS / reduced motion: !important rules pin --p to 1, so they see the fix
 * (globals.css for reduced motion, the <noscript> style in app/layout.tsx for no JS).
 */

const HOLD = 900;
const SWEEP = 1400;
const VISIBLE = 0.85;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function CutPlay({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let hold = 0;
    let raf = 0;
    let state: "before" | "waiting" | "playing" | "done" = "before";
    const set = (p: number) => el.style.setProperty("--p", p.toFixed(3));

    const play = () => {
      state = "playing";
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / SWEEP);
        set(ease(t));
        if (t < 1) raf = requestAnimationFrame(tick);
        else state = "done";
      };
      raf = requestAnimationFrame(tick);
    };

    const reset = () => {
      clearTimeout(hold);
      cancelAnimationFrame(raf);
      state = "before";
      set(0);
    };

    // The sticky header covers the top of the screen, so it doesn't count as "in view".
    const header = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) {
          if (state !== "before") reset();
          return;
        }
        const room = e.rootBounds?.height ?? window.innerHeight;
        const enough = e.intersectionRect.height >= Math.min(e.boundingClientRect.height, room) * VISIBLE;
        if (enough && state === "before") {
          state = "waiting";
          hold = window.setTimeout(play, HOLD);
        } else if (!enough && state === "waiting") {
          // Scrolled away again before the cut started: keep the "before" for next time.
          clearTimeout(hold);
          state = "before";
        }
      },
      {
        rootMargin: `-${Math.round(header)}px 0px 0px 0px`,
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
      },
    );

    set(0);
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(hold);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} data-cut className={className} style={{ ["--p" as string]: 0 }} aria-hidden>
      {children}
    </div>
  );
}
