import type { Metadata } from "next";
import Link from "next/link";
import { privacy } from "@/content/privacy";
import { JsonLd, pageMeta, webPageLd } from "@/lib/seo";

const privacyDescription =
  "What personal information the MoyoCode website collects, why, and what you can ask us to do with it.";

export const metadata: Metadata = pageMeta({
  title: "Privacy Notice",
  description: privacyDescription,
  path: "/privacy",
});

/*
 * Privacy: a reading page, so calm and still. One trace of the brand's cut: what the site does
 * NOT do is set as problems already crossed out, which is also the most reassuring line on the page.
 */

const h2 = "impact text-3xl sm:text-4xl";
const ext = "font-semibold underline decoration-gold decoration-2 underline-offset-4 hover:text-gold";

function External({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={ext}>
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-8 lg:pt-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Updated {privacy.updated}</p>
      <h1 className="impact mt-3 text-6xl sm:text-8xl">Privacy notice</h1>
      <p className="mt-6 text-xl leading-relaxed text-muted">{privacy.intro}</p>

      {/* The short version first: what the site does not do. */}
      <section className="mt-14 border-y border-text/15 py-8" aria-labelledby="dont-title">
        <h2 id="dont-title" className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          What this site does not do
        </h2>
        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {privacy.dont.map((d) => (
            <li key={d} className="impact relative text-3xl text-struck sm:text-4xl">
              <span className="sr-only">No </span>
              {d}
              <span aria-hidden className="cut-bar absolute -left-[0.08em] -right-[0.08em] top-1/2" />
            </li>
          ))}
        </ul>
        <p className="mt-5 text-muted">{privacy.dontNote}</p>
      </section>

      <section className="mt-14" aria-labelledby="collect-title">
        <h2 id="collect-title" className={h2}>
          What we collect, and why
        </h2>
        <p className="mt-3 text-muted">Only what you type into the enquiry form.</p>
        <dl className="mt-6 divide-y divide-text/15 border-y border-text/15">
          {privacy.collect.map((c) => (
            <div key={c.item} className="grid gap-1 py-4 sm:grid-cols-[1fr_1.2fr] sm:gap-6">
              <dt className="font-semibold">{c.item}</dt>
              <dd className="text-muted">{c.why}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-lg">{privacy.purpose}</p>
        <p className="mt-3 text-muted">
          <span className="font-semibold text-text">Legal basis:</span> {privacy.basis}
        </p>
      </section>

      <section className="mt-14" aria-labelledby="where-title">
        <h2 id="where-title" className={h2}>
          Where it goes
        </h2>
        <ul className="mt-6 space-y-6">
          {privacy.where.map((w) => (
            <li key={w.who} className="border-l-4 border-gold pl-5">
              <p className="font-semibold">{w.who}</p>
              <p className="mt-1 text-muted">{w.what}</p>
              <p className="mt-2">
                <External href={w.link.href} label={w.link.label} />
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-muted">{privacy.abroad}</p>
      </section>

      <section className="mt-14" aria-labelledby="keep-title">
        <h2 id="keep-title" className={h2}>
          How long we keep it
        </h2>
        <p className="mt-4 text-lg text-muted">{privacy.retention}</p>
      </section>

      <section className="mt-14" aria-labelledby="rights-title">
        <h2 id="rights-title" className={h2}>
          Your choices
        </h2>
        <p className="mt-3 text-muted">You can:</p>
        <ul className="mt-3 space-y-2">
          {privacy.rights.map((r) => (
            <li key={r} className="flex gap-3">
              <span aria-hidden className="text-gold">
                →
              </span>
              {r}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-muted">
          {privacy.rightsHow} <External href={privacy.ndpc.href} label={privacy.ndpc.label} />.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block bg-gold px-6 py-3.5 font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-hover"
        >
          Make a request
        </Link>
      </section>

      <section className="mt-14 border-t border-text/15 pt-8" aria-labelledby="changes-title">
        <h2 id="changes-title" className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          Changes
        </h2>
        <p className="mt-3 text-muted">{privacy.changes}</p>
      </section>
      <JsonLd data={webPageLd("WebPage", "/privacy", "Privacy notice", privacyDescription)} />
    </article>
  );
}
