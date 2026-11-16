# 15 · SEO QA report

16 Nov 2026. Production build (`next build`, Next 16.4.6) served by `next start` on localhost:3135. Not yet deployed, so nothing here is a live-site or field measurement.

## Build and lint

- `npm run lint`: clean. `tsc --noEmit`: clean. `next build`: 18 static pages, no errors.

## Generated HTML (scripted crawl of every public URL)

| URL | Status | Title (chars) | Desc (chars) | Canonical = og:url | H1 | JSON-LD |
|---|---|---|---|---|---|---|
| `/` | 200 | 62 | 135 | ✓ | Tell us the problem. We'll build what solves it. | WebPage, Organization, WebSite |
| `/services` | 200 | 56 | 136 | ✓ | Websites, software and automation | BreadcrumbList, CollectionPage, Organization, WebSite |
| `/services/website-design` | 200 | 58 | 146 | ✓ | Website design and development: Be the obvious choice | BreadcrumbList, Service, Organization, WebSite |
| `/services/custom-software` | 200 | 53 | 148 | ✓ | Custom software development: Work the way… | same |
| `/services/ai-automation` | 200 | 47 | 151 | ✓ | AI and business process automation: Stop doing it by hand | same |
| `/contact` | 200 | 37 | 147 | ✓ | What's slowing your business down? | ContactPage, Organization, WebSite |
| `/privacy` | 200 | 25 | 100 | ✓ | Privacy notice | WebPage, Organization, WebSite |
| `/concepts`, `/concepts/b` | 200 | internal title | — | none (by design) | — | none; `robots: noindex, nofollow` ✓ |

- Exactly one H1 per page; no duplicate titles or descriptions; all JSON-LD parses.
- Word counts (visible text, approx.): service pages 460–520 (were 132–178), hub 329.
- `/services/websites|software|automation` → **308** to the new URL in one hop ✓
- `/services/nope` and `/does-not-exist` → **404** ✓
- `Host: moyocodee.vercel.app` → `X-Robots-Tag: noindex, nofollow` ✓ (checked with curl; Node's fetch drops a custom Host header, so the crawl script can't test this). `Host: www.moyocode.com` → no header ✓
- robots.txt: `Allow: /`, sitemap line, no disallow ✓
- sitemap.xml: 7 canonical URLs, lastmod 2026-11-16, no /concepts ✓
- `/brand/moyocode-logo-512.png` → 200 image/png ✓

## Visual check (screenshots in `qa-shots/seo/`, git-ignored)

`/services` and `/services/ai-automation` at 1265×598@1.5 and 390×844@3, full page: no horizontal overflow, no console errors or failed requests, gold/black bands alternate as designed, breadcrumbs readable.

## Lighthouse 12.8.2 (local, emulated; not a real phone or field data)

| Page | Preset | Perf | A11y | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|---|
| `/services/website-design` | mobile | 88 | 100 | 100 | 100 | 2.7 s | 0 |
| `/services/website-design` | desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 |
| `/services` | mobile | 97 | 100 | 100 | 100 | 2.4 s | 0 |
| `/services` | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 |

Mobile LCP 2.7 s on the longest service page is just above the 2.5 s "good" line under Lighthouse's simulated slow 4G. Field data (CrUX) will only exist after real traffic; re-check in Search Console's Core Web Vitals report.

## Not tested

- Google's Rich Results Test and Schema Markup Validator (need the live URL; run after deploy).
- Real indexing, rankings, impressions: nothing to measure until Search Console is set up. No figures are claimed.
- Physical phones; Safari.
