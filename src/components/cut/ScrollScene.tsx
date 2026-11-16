"use client";

import { useEffect, useRef } from "react";

/**
 * The site's one motion engine. Writes scroll progress to the element as CSS variables:
 *   --p  0..1 progress through the scene   --w / --h  the element's size in px
 * CSS turns those into the cut (see globals.css, .cut-*). No library, no scroll hijacking.
 *
 * Rules (world-class-website, motion-and-performance):
 * - Geometry is measured once (and on resize), never during scroll.
 * - Only changed values are written, inside one shared rAF.
 * - Reduced motion: progress jumps to `reducedTo` (the "fixed" state) and stays.
 * - Without JS the server-rendered `initial` value is the first frame, so nothing is hidden.
 */

// Before/after panels used to scroll-link here ("pass"); they now play on a timer (CutPlay).
type Mode = "pin";

type Scene = {
  el: HTMLElement;
  mode: Mode;
  top: number;
  height: number;
  last: string;
};

const scenes = new Set<Scene>();
let vh = 0;
let raf = 0;
let listening = false;

function measure() {
  vh = window.innerHeight;
  const y = window.scrollY;
  scenes.forEach((s) => {
    const r = s.el.getBoundingClientRect();
    s.top = r.top + y;
    s.height = r.height;
    s.el.style.setProperty("--w", `${Math.round(r.width)}px`);
    s.el.style.setProperty("--h", `${Math.round(r.height)}px`);
  });
}

function frame() {
  raf = 0;
  const y = window.scrollY;
  scenes.forEach((s) => {
    // Sticky stage: 0 when the scene's top reaches the top, 1 when its bottom leaves.
    const run = Math.max(1, s.height - vh);
    let p = (y - s.top) / run;
    p = Math.min(1, Math.max(0, p));
    const v = p.toFixed(3);
    if (v !== s.last) {
      s.last = v;
      s.el.style.setProperty("--p", v);
    }
  });
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(frame);
}

function listen() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", () => {
    measure();
    schedule();
  });
  // Content above a scene can change height (fonts, images); re-measure when the page does.
  new ResizeObserver(() => {
    measure();
    schedule();
  }).observe(document.body);
}

export function ScrollScene({
  as: Tag = "div",
  mode = "pin",
  initial,
  reducedTo = 1,
  className,
  style,
  children,
  ...rest
}: {
  as?: "div" | "section" | "figure";
  mode?: Mode;
  /** Server-rendered progress: the first frame and the no-JS frame. */
  initial: number;
  reducedTo?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "style" | "className" | "children">) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", String(reducedTo));
      const r = el.getBoundingClientRect();
      el.style.setProperty("--w", `${Math.round(r.width)}px`);
      el.style.setProperty("--h", `${Math.round(r.height)}px`);
      return;
    }
    const scene: Scene = { el, mode, top: 0, height: 0, last: "" };
    scenes.add(scene);
    listen();
    measure();
    schedule();
    return () => {
      scenes.delete(scene);
    };
  }, [mode, reducedTo]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      style={{ ...style, ["--p" as string]: initial }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
