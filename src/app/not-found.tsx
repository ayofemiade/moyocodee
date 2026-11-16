import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

/*
 * 404: the one page where the cut has nothing to fix. Problem side only, with a straight way back.
 * // pending: founder approval of this copy
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="relative overflow-hidden">
        <section className="mx-auto flex min-h-[calc(100svh-var(--header-h))] max-w-6xl flex-col justify-center px-4 py-20 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Error 404</p>
          <h1 className="impact mt-4 text-6xl text-balance sm:text-8xl">
            <span className="relative inline-block text-struck">
              This page
              <span aria-hidden className="cut-bar absolute -left-[0.1em] -right-[0.1em] top-1/2" />
            </span>
            <br />
            <span className="text-gold">doesn&apos;t exist.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            The link may be old, or mistyped. Everything MoyoCode does starts from the homepage.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="bg-gold px-6 py-3.5 font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-hover">
              Go to the homepage
            </Link>
            <Link href="/contact" className="border border-text/30 px-6 py-3.5 font-semibold uppercase tracking-wide transition hover:border-gold">
              Tell us your problem
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
