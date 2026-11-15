"use client";

import { useEffect, useRef, useState } from "react";

/** Adds `activeClass` once the element scrolls into view. Used to start CSS animations at the right moment. */
export function InView({
  children,
  className = "",
  activeClass,
}: {
  children: React.ReactNode;
  className?: string;
  activeClass: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} ${seen ? activeClass : ""}`}>
      {children}
    </div>
  );
}
