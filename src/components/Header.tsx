"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { services } from "@/content/services";

const links = [
  ...services.map((s) => ({ href: `/services/${s.slug}`, label: s.label })),
  { href: "/#how", label: "How we work" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Every menu link closes the menu on click, so route changes need no extra effect.

  // While open: lock page scroll, close on Escape, keep Tab inside the menu.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-ink">
      <div className="mx-auto flex h-[var(--header-h)] max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
      <Link href="/" aria-label="MoyoCode home">
        <Logo />
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
        <ul className="flex items-center gap-6 text-sm font-medium text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition hover:text-gold">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#diagnosis"
          className="bg-gold px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-gold-hover"
        >
          Tell us your problem
        </Link>
      </nav>

      <button
        ref={buttonRef}
        type="button"
        className="flex h-11 items-center gap-2 px-1 text-sm font-semibold uppercase tracking-wider lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        Menu
        <span aria-hidden className="flex w-6 flex-col gap-1.5">
          <span className="h-0.5 w-full bg-text" />
          <span className="h-0.5 w-4 self-end bg-gold" />
        </span>
      </button>

      {open && (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-ink px-4 pb-10 pt-5 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              className="h-11 px-1 text-sm font-semibold uppercase tracking-wider text-gold"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
            >
              Close
            </button>
          </div>
          <ul className="mt-12 flex-1 space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="impact block py-2 text-5xl">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#diagnosis"
            onClick={() => setOpen(false)}
            className="bg-gold px-6 py-4 text-center font-semibold uppercase tracking-wide text-ink"
          >
            Tell us your problem
          </Link>
        </div>
      )}
      </div>
    </header>
  );
}
