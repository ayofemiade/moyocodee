import Image from "next/image";
import { CutPlay } from "@/components/cut/CutPlay";
import type { Project } from "@/content/work";
import s from "./work.module.css";

const kicker = "text-xs font-semibold uppercase tracking-[0.25em]";

/**
 * One client project, on the black (problem) or gold (fix) side.
 * Text: who, what we did, the brief, the fix, a live link.
 * Picture: the brief, cut at 45° to reveal a real screenshot of the live site (desktop + phone).
 */
export function WorkCase({
  project: p,
  index,
  gold,
  eager = false,
}: {
  project: Project;
  index: number;
  gold: boolean;
  eager?: boolean;
}) {
  const sub = gold ? "text-ink/80" : "text-muted";
  return (
    <article
      id={p.slug}
      aria-labelledby={`${p.slug}-title`}
      className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14"
    >
      <div className={`lg:col-span-5 ${index % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
        <p className={`impact text-7xl ${gold ? "" : "text-gold"}`}>0{index + 1}</p>
        <p className={`${kicker} mt-6 ${gold ? "text-ink/80" : "text-gold"}`}>{p.sector}</p>
        <h2 id={`${p.slug}-title`} className="impact mt-2 text-5xl text-balance sm:text-6xl">
          {p.name}
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="What we did">
          {p.tags.map((t) => (
            <li
              key={t}
              className={`border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                gold ? "border-ink/50 text-ink/80" : "border-text/25 text-muted"
              }`}
            >
              {t}
            </li>
          ))}
        </ul>
        <p className={`mt-7 text-lg leading-relaxed ${sub}`}>
          <span className={`${kicker} block ${gold ? "text-ink" : "text-text"}`}>The brief</span>
          <span className="mt-1 block">{p.brief}</span>
        </p>
        <p className="mt-5 text-lg font-medium leading-relaxed">
          <span className={`${kicker} block font-semibold ${gold ? "text-ink" : "text-gold"}`}>What we did</span>
          <span className="mt-1 block">{p.fix}</span>
        </p>
        <a
          href={p.url}
          target="_blank"
          rel="noopener"
          className={`mt-8 inline-block border-b-2 pb-1 font-semibold uppercase tracking-wide transition hover:border-transparent ${
            gold ? "border-ink" : "border-gold hover:text-gold"
          }`}
        >
          Visit {p.host} <span aria-hidden>↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>

      <figure className={`lg:col-span-7 ${index % 2 ? "lg:order-1 lg:col-start-1" : ""} ${gold ? "" : s.onDark}`}>
        <div className={s.stage}>
          <CutPlay className={s.panel}>
            <div className={s.before}>
              <span className={s.tag}>The brief</span>
              <p className={s.brief}>{p.brief}</p>
            </div>
            <div className={s.after}>
              <span className={s.tag}>Live</span>
              <Image
                src={`/work/${p.slug}-desktop.webp`}
                alt=""
                fill
                sizes="(min-width: 1152px) 640px, (min-width: 1024px) 56vw, 92vw"
                className="object-cover object-top"
                loading={eager ? "eager" : "lazy"}
              />
            </div>
            <span className={s.blade} />
          </CutPlay>
          <div className={s.phone}>
            <Image
              src={`/work/${p.slug}-phone.webp`}
              alt=""
              fill
              sizes="(min-width: 1024px) 150px, 24vw"
              className="object-cover object-top"
            />
          </div>
        </div>
        <figcaption className={`mt-4 text-xs font-semibold uppercase tracking-[0.2em] ${sub}`}>
          {p.host} on desktop and phone · screenshot, Nov 2026
        </figcaption>
      </figure>
    </article>
  );
}
