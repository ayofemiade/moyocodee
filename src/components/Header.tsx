import Link from "next/link";
import { services } from "@/content/services";

export function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-6 sm:px-8">
      <Link href="/" className="impact text-2xl" aria-label="MoyoCode home">
        Moyo<span className="text-gold">Code</span>
      </Link>
      <nav aria-label="Main" className="flex items-center gap-6">
        <ul className="hidden items-center gap-6 text-sm font-medium text-text/70 md:flex">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="transition hover:text-gold">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#diagnosis"
          className="whitespace-nowrap text-sm font-semibold text-gold transition hover:text-gold-hover"
        >
          <span className="sm:hidden">Get help →</span>
          <span className="hidden sm:inline">Tell us your problem →</span>
        </Link>
      </nav>
    </header>
  );
}
