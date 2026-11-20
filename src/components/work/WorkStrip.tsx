import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/work";

const kicker = "text-xs font-semibold uppercase tracking-[0.25em]";

/** Homepage, end of the gold "fix" side: the three live sites, linking into /work. */
export function WorkStrip() {
  return (
    <div className="mt-28 border-t-2 border-ink pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={`${kicker} text-ink/80`}>Proof</p>
          <h3 className="impact mt-2 text-4xl sm:text-5xl">See the fixes live</h3>
        </div>
        <Link
          href="/work"
          className="border-b-2 border-ink pb-1 font-semibold uppercase tracking-wide transition hover:border-transparent"
        >
          All our work →
        </Link>
      </div>
      <ul className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/work#${p.slug}`} className="group block">
              <span className="relative block aspect-[16/10] overflow-hidden border-2 border-ink bg-ink">
                <Image
                  src={`/work/${p.slug}-desktop.webp`}
                  alt=""
                  fill
                  sizes="(min-width: 1152px) 360px, (min-width: 640px) 31vw, 92vw"
                  className="object-cover object-top transition duration-300 group-hover:opacity-85"
                />
              </span>
              <span className="impact mt-4 block text-2xl group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
                {p.name}
              </span>
              <span className="mt-1 block text-ink/80">{p.short}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
