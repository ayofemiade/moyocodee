# 06 · Technical SEO Audit and Fix List

**Status key:** ✅ fixed in this round (branch `seo`, not pushed) · 🔧 founder or hosting action · ✔ already correct.

| Area | Check | Status |
|---|---|---|
| Crawl | All real pages are server-rendered with content in the HTML; links are real `<a href>` | ✔ |
| Crawl | robots.txt allows all and points to the sitemap. `/concepts` disallow removed so its `noindex` can be seen | ✅ |
| Index | `/concepts/*` gets `noindex` and its own canonical (it inherited the homepage's) | ✅ |
| Index | `*.vercel.app` hosts send `X-Robots-Tag: noindex` (duplicate-host fix) | ✅ |
| Index | 404 returns status 404 + `noindex` | ✔ |
| Sitemap | Only canonical, indexable URLs. `lastmod` = the real content date per page, not build time | ✅ |
| Canonical | Every page self-canonical on `https://www.moyocode.com`. Sitemap and canonical agree | ✔ / ✅ new pages |
| Redirects | Old service slugs → new: single 308 | ✅ |
| Redirects | `http://moyocode.com` takes 2 hops. Fix in Vercel → Domains: make the apex redirect straight to www (and check HSTS) | 🔧 |
| Variants | www vs apex, http vs https, trailing slash: all resolve to one URL | ✔ |
| Metadata | Unique titles and descriptions per page; per-page `og:url`, `og:title`, `og:description` | ✅ |
| Social | OG image (generated) on every page; Twitter `summary_large_image` | ✔ |
| Identity | Favicon (SVG logo), raster logo PNG for structured data | ✅ PNG added |
| HTML | One H1, logical H2/H3, landmarks (`header`, `nav`, `main`, `footer`), skip link | ✔ |
| HTML | Service H1s now include the service name | ✅ |
| JS SEO | No content behind client-only rendering. Interactive pieces (picks, menu) enhance server HTML | ✔ |
| Images | No raster content images yet; decorative SVG has `aria-hidden`. Image SEO applies when case-study photos arrive | ✔ / later |
| Performance | Live Lighthouse: desktop 100, mobile 94 (lab). Field CWV unavailable until there's traffic, via Search Console | ✔ lab / 🔧 field |
| Structured data | `Organization` + `WebSite` sitewide; `Service` + `BreadcrumbList` on services; `ContactPage`/`WebPage` + breadcrumbs elsewhere. `ProfessionalService` removed (it implies a physical location) | ✅ |
