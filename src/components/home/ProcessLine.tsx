"use client";

import { useEffect, useRef } from "react";
import { process } from "@/content/home";
import s from "./home.module.css";

/**
 * How we work: a gold line fills down through the four steps as you scroll, and each step
 * lights up as the line reaches it. GSAP loads only when this section is near the screen.
 * No pinning and no scroll hijacking. With reduced motion, everything is shown complete.
 */
export function ProcessLine() {
  const root = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !fill.current) return;
    const steps = Array.from(el.querySelectorAll<HTMLLIElement>("li"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      steps.forEach((st) => st.classList.add(s.stepActive));
      return;
    }

    let cleanup = () => {};
    let cancelled = false;
    const start = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.to(fill.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 60%", scrub: 0.4 },
        });
        steps.forEach((st) =>
          ScrollTrigger.create({ trigger: st, start: "top 65%", toggleClass: { targets: st, className: s.stepActive } }),
        );
      }, el);
      cleanup = () => ctx.revert();
    };

    // Load GSAP only when the section gets close.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      cleanup();
    };
  }, []);

  return (
    <ol ref={root} className="relative mt-14 space-y-14 pl-12 sm:pl-20">
      <span aria-hidden className="absolute bottom-2 left-[11px] top-2 w-0.5 bg-text/15 sm:left-[19px]" />
      <span
        ref={fill}
        aria-hidden
        className={`${s.processFill} absolute bottom-2 left-[11px] top-2 w-0.5 bg-gold sm:left-[19px]`}
      />
      {process.map((p, i) => (
        <li key={p.step} className="relative">
          <span
            aria-hidden
            className={`${s.stepDot} absolute -left-12 top-2 h-6 w-6 rotate-45 border-2 border-text/40 bg-ink sm:-left-20 sm:h-10 sm:w-10`}
          />
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Step 0{i + 1}</p>
          <h3 className="impact mt-2 text-5xl sm:text-7xl">{p.step}</h3>
          <p className="mt-3 max-w-xl text-lg text-muted">{p.line}</p>
        </li>
      ))}
    </ol>
  );
}
