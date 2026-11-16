import Link from "next/link";
import { Logo } from "@/components/Logo";
import { services } from "@/content/services";
import { site } from "@/content/site";

const heading = "text-xs font-semibold uppercase tracking-[0.25em] text-gold";

export function Footer() {
  return (
    <footer className="border-t border-text/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-muted">
            You bring the problem. We find the right fix. Technology is only the tool.
          </p>
          <p className="mt-2 text-sm text-muted">{site.tagline}</p>
        </div>
        <nav aria-label="Services">
          <p className={heading}>Services</p>
          <ul className="mt-4 space-y-2 text-muted">
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
          <ul className="mt-4 space-y-2 text-muted">
            <li>
              <Link href="/contact" className="transition hover:text-gold">
                Get a free diagnosis
              </Link>
            </li>
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="transition hover:text-gold">
                  {site.email}
                </a>
              </li>
            )}
            {site.whatsapp && (
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                  className="transition hover:text-gold"
                  rel="noopener noreferrer"
                >
                  WhatsApp us
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-8 text-xs text-muted sm:px-8">
        © {new Date().getFullYear()} {site.name} ·{" "}
        <Link href="/privacy" className="underline underline-offset-4 transition hover:text-gold">
          Privacy notice
        </Link>
      </p>
    </footer>
  );
}
