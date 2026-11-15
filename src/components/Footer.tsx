import Link from "next/link";
import { services } from "@/content/services";

const heading = "text-xs font-semibold uppercase tracking-[0.25em] text-gold";

export function Footer() {
  return (
    <footer className="border-t border-text/10">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-8 md:grid-cols-3">
        <div>
          <p className="impact text-3xl">
            Moyo<span className="text-gold">Code</span>
          </p>
          <p className="mt-2 text-text/60">Technology That Moves Business Forward.</p>
        </div>
        <nav aria-label="Services">
          <p className={heading}>Services</p>
          <ul className="mt-3 space-y-2 text-text/70">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="transition hover:text-gold">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className={heading}>Start here</p>
          <Link href="/#diagnosis" className="mt-3 inline-block text-text/70 transition hover:text-gold">
            Get a free diagnosis
          </Link>
        </div>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-8 text-xs text-text/40 sm:px-8">
        © {new Date().getFullYear()} MoyoCode Technologies
      </p>
    </footer>
  );
}
