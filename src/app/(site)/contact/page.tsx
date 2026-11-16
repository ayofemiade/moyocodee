import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { cta, founder, nextSteps } from "@/content/home";

export const metadata: Metadata = {
  title: "Tell us the problem",
  description: cta.line,
  alternates: { canonical: "/contact" },
};

/*
 * Contact: a page you can link to directly (a bio link, an email signature).
 * Its idea is the letter: the founder's note opens it, the visitor's problem completes it.
 * Same gold "fix side" as the homepage letter, at full height.
 */
export default function ContactPage() {
  return (
    <section className="band-gold section-pad min-h-[calc(100svh-var(--header-h))]" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/80">Free diagnosis</p>
          <h1 id="contact-title" className="impact mt-3 text-5xl text-balance sm:text-7xl">
            {cta.question}
          </h1>
          <figure className="mt-10 border-l-4 border-ink pl-6">
            <blockquote className="text-xl font-medium leading-snug">&ldquo;{founder.note}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm font-semibold uppercase tracking-[0.15em]">
              {founder.name} <span className="text-ink/80">· {founder.role}</span>
            </figcaption>
          </figure>
          <ol className="mt-10 space-y-5 border-t-2 border-ink pt-6">
            {nextSteps.map((n, i) => (
              <li key={n.step} className="grid grid-cols-[2.5rem_1fr]">
                <span className="impact text-3xl">0{i + 1}</span>
                <span>
                  <span className="block font-bold uppercase tracking-wide">{n.step}</span>
                  <span className="text-ink/80">{n.line}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-7">
          <p className="mb-5 text-lg text-ink/80">{cta.line}</p>
          <EnquiryForm button={cta.button} />
        </div>
      </div>
    </section>
  );
}
