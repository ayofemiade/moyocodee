# 01 · SEO Baseline Audit

**Date:** 16 Nov 2026.

**Method:**
- Live site crawled at `https://www.moyocode.com` with headless Chrome (raw server HTML plus rendered DOM).
- `curl` for redirects, robots and sitemap.
- Lighthouse 12.8.2, run the same day.

**Not verifiable** (no access):
- Google Search Console (index coverage, impressions, clicks, queries)
- Real-user Core Web Vitals (the PageSpeed Insights API returned "quota exceeded" for the shared key)
- Backlinks and authority (no Ahrefs, Semrush or Moz access)
- Rankings

**None of these are estimated here.**

## Site facts

- **Stack:** Next.js 16.4.6 (App Router) with static prerendering for every route. React 19. Hosted on Vercel; DNS at Hostinger.
- **Rendering:** every route's full text and headings are in the **server HTML**. Each page sends one `<h1>` before any JavaScript runs, so crawlers don't need to render JS.
- **Indexable routes (6):**
    - `/`
    - `/services/websites`
    - `/services/software`
    - `/services/automation`
    - `/contact`
    - `/privacy`
- **Other routes:** `/concepts`, `/concepts/a`, `/concepts/b`, `/concepts/c`, `/concepts/logo` (internal design comparisons) and the 404 page.
- **Index status:** unknown. A `site:` search through the available search tool returned nothing, but that tool does not honour `site:`, so this is **not evidence either way**. Search Console is the only reliable source.
- **Brand search:** "MoyoCode" collides with similar names (moocode, mocoding, Moyo projects). Brand entity signals (consistent name, logo, sameAs profiles) matter.

## Findings

| # | Finding | Evidence | Severity |
|---|---|---|---|
| 1 | **Duplicate host indexable:** `moyocodee.vercel.app` serves the full site, 200, with no `X-Robots-Tag` | `curl -I` | High |
| 2 | **og:url is the homepage on every page**, so social and link previews point to the wrong page | rendered `meta[property=og:url]` | High |
| 3 | **Thin service pages:** 158, 132 and 178 words of main content | rendered `main` text | High |
| 4 | **Service H1s don't name the service**, e.g. "Be the obvious choice" (websites) and "Stop doing it by hand" (automation) | rendered `h1` | High |
| 5 | **Homepage title has no service terms:** "MoyoCode Technologies · Tell us the problem. We'll build what solves it." (72 characters) | `<title>` | High |
| 6 | **Structured data type is wrong:** `ProfessionalService` (a LocalBusiness subtype) on every page with no address. Google's LocalBusiness guidance expects a physical address. No `WebSite`, `Service` or `BreadcrumbList` | JSON-LD | Medium |
| 7 | **Homepage description is 185 characters,** so it truncates in results | `meta description` | Medium |
| 8 | **Sitemap `lastmod` = build time** for every URL, so it claims everything changed on every deploy | `/sitemap.xml` | Medium |
| 9 | **`/concepts` inherits the homepage title, description and canonical (`/`)**, and robots.txt blocks crawling, so Google can't see a `noindex` | crawl | Medium |
| 10 | **No `/services` hub,** so services have no parent page and no breadcrumb trail | route list | Medium |
| 11 | **Slugs are generic** (`/websites`, `/software`, `/automation`). The URLs are 1 day old, so the cheapest time to make them descriptive is now, with 308 redirects | route list | Low |
| 12 | **`http://moyocode.com` takes 2 hops** (http → https apex → www) | `curl -IL` | Low (Vercel domain setting) |
| 13 | **No measurement:** no Search Console, Bing Webmaster or analytics; no conversion tracking | code audit | High (business) |

## What is already good

- One `<h1>` per page, server-rendered, with all content in the initial HTML.
- `https` and `www` canonicalisation work. Trailing slashes 308 to the slash-less URL.
- Correct 404 status with `noindex`.
- Canonicals are correct on all six real pages.
- No images without `alt`. No third-party scripts. No cookies.
- Lighthouse SEO 100 on every page. Desktop performance 100 and mobile 94 (live, lab).
- Accessibility 100.
