# 14 · SEO implementation report

Branch `seo`, 16 Nov 2026. Not committed or pushed (waiting for "push").
This covers priorities 1–2 of [13-IMPLEMENTATION-ROADMAP.md](13-IMPLEMENTATION-ROADMAP.md). Results are in [15-SEO-QA-REPORT.md](15-SEO-QA-REPORT.md).

## What changed and why

| # | Change | Files | Fixes (audit ref) |
|---|---|---|---|
| 1 | `*.vercel.app` hosts send `X-Robots-Tag: noindex, nofollow` | `next.config.ts` | Duplicate indexable copy at moyocodee.vercel.app |
| 2 | Every page sets its own title, description, canonical and `og:url` through `pageMeta()` | `src/lib/seo.tsx`, every page | `og:url` pointed at the homepage on every page |
| 3 | Title template `%s \| MoyoCode`; default description cut to 135 characters | `src/app/layout.tsx`, `src/content/site.ts` | Home title 72 chars, description 185 chars |
| 4 | Home title now names the services: "Website Design, Custom Software & AI Automation \| MoyoCode" | `src/app/(site)/page.tsx` | Home title had no service terms |
| 5 | Descriptive service URLs: `/services/website-design`, `/custom-software`, `/ai-automation`. Old URLs redirect permanently (308, one hop) | `src/content/services.ts`, `next.config.ts` | Generic slugs |
| 6 | Service pages rebuilt: H1 contains the service name; new sections Who it's for, What you get, How a project runs, Questions people ask (FAQ), links to the other two services | `src/app/(site)/services/[slug]/page.tsx` | Thin pages (132–178 words, now ≈460–520); H1 didn't name the service |
| 7 | New `/services` hub listing all three services | `src/app/(site)/services/page.tsx` | No hub page |
| 8 | Visible breadcrumbs + `BreadcrumbList` on hub and service pages | `src/components/Breadcrumbs.tsx` | No hierarchy signal |
| 9 | Structured data: sitewide `Organization` + `WebSite` graph (logo, founder, slogan); `Service` per service page; `CollectionPage`, `ContactPage`, `WebPage` | `src/lib/seo.tsx`, `(site)/layout.tsx` | `ProfessionalService` without an address, unconfirmed `areaServed` |
| 10 | 512×512 PNG logo for the Organization `logo` | `public/brand/moyocode-logo-512.png` | Logo must be a crawlable raster image |
| 11 | `/concepts` is `noindex, nofollow`, no canonical, own title; robots.txt no longer blocks it (a block hides the noindex) | `src/app/concepts/layout.tsx`, `src/app/robots.ts` | Concepts inherited the home title/canonical |
| 12 | Sitemap uses the date content last changed, not build time; adds `/services` | `src/app/sitemap.ts` | lastmod = every deploy |
| 13 | Home "How it works →" links now read "More on website design and development →" etc. | `src/app/(site)/page.tsx` | Non-descriptive anchor text |

## Decisions

- **Organization, not LocalBusiness.** MoyoCode has no published address. Google's LocalBusiness guidance expects one, so it waits (see 09).
- **No FAQPage markup.** Google shows FAQ rich results only for government and health sites; the FAQs are visible content that answers real questions, which is what matters.
- **No visible breadcrumbs on Contact and Privacy.** They are one level deep and Contact sits on the gold band; they carry `ContactPage` / `WebPage` data instead.
- **Home H1 unchanged.** "Tell us the problem. We'll build what solves it." is approved copy; the title and section headings carry the service terms.
- **No `sameAs`.** Added only once the founder confirms official profile URLs.

## Copy waiting for founder approval (`// pending`)

All in `src/content/services.ts` and the hub page: every service page's "Who it's for" list, FAQ questions and answers, `seoTitle`/`seoDescription`; the hub description and intro; the shorter site description in `src/content/site.ts`. None claims a past client result, a price or a timeframe that isn't already approved.

## Not done here (needs the founder or later rounds)

1. Google Search Console + Bing Webmaster Tools: verify `www.moyocode.com`, submit the sitemap, request indexing of the four new URLs.
2. Vercel: make `moyocode.com` redirect to `www` in one hop (currently two).
3. Validate keyword priorities in Google Keyword Planner (03 lists the free-tool evidence only).
4. Approve the pending copy above.
5. Confirm official profile URLs for `sameAs`; decide on Google Business Profile eligibility (09).
6. Case studies only with written client permission (07).
7. Content calendar articles (08) and directory profiles (11).
