# Existing Website Audit

Audited 15 Nov 2026 by Claude, on branch `visual-concepts` (uncommitted).

## What "the existing website" is

**moyocode.com is not live.** The domain did not resolve on 15 Nov 2026 and was still unregistered on 8 Nov. The only implementation is the local Next.js build in this repository, which was created on 15 Nov 2026 in the Crossed Out direction the founder chose. This audit covers that build.

## Technical inventory

| Area | Current state |
|---|---|
| Framework | Next.js 16.4.6 (App Router), React 19.3.1. Upgraded from 15.5.6 because of a critical advisory; `npm audit --omit=dev` is clean |
| Styling | Tailwind CSS 4, CSS variables in `src/app/globals.css`, one CSS module (`src/app/(site)/crossed.module.css`) |
| Fonts | `next/font/google`: Anton (display) and Inter (body). Concept pages load extra fonts |
| Animation | CSS keyframes only. No animation library |
| Routes | `/`, `/services/[websites, software, automation]`, `/concepts`, `/concepts/a`, `/concepts/b`, `/concepts/c` |
| Structure | Route group `(site)` with Header/Footer layout; concepts render without it |
| Content | `src/content/home.ts`, `src/content/services.ts` |
| Form | `src/components/EnquiryForm.tsx` + server action `src/app/actions.ts`. Posts to `CONTACT_WEBHOOK_URL`; **not connected**, and it says so to the visitor |
| Images | None. No `next/image` usage. Default Next.js favicon and starter SVGs in `public/` |
| Metadata | Title template and description only |
| SEO files | No `sitemap`, `robots`, Open Graph image, canonical or structured data |
| Deployment | Not deployed. No Vercel project linked |
| Git | One commit (`Initial commit from Create Next App`). All MoyoCode work is uncommitted |

## Lighthouse (mobile, simulated throttling, local production build)

| Page | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS | Weight |
|---|---|---|---|---|---|---|---|---|
| `/` | 92 | 96 | 100 | 100 | 2.6 s | 250 ms | 0 | 230 KiB |
| `/services/automation` | 92 | 95 | 100 | 100 | 2.6 s | 230 ms | 0 | 227 KiB |

Lab data on localhost, so there is no network latency from a real host. Field data does not exist yet.

**Why LCP is 2.6 s:** the hero headline is hidden (`opacity: 0`) for 1 second by the reveal animation, so the browser cannot count it as painted until it fades in. The animation the founder approved on 15 Nov costs LCP directly. The fix is to keep the motion but start the headline visible (animate a mask or transform, never `opacity: 0` on the LCP element).

## Screenshots

Saved in `docs/screenshots/`: `current-laptop-hero.jpg`, `current-laptop-services.jpg`, `current-laptop-process.jpg`, `current-laptop-cta-form.jpg`, `current-laptop-service-page.jpg`, `current-tablet-hero.jpg`. Laptop = 1265×598 (the founder's real screen at 150% scaling). The pane's 1440 px and 375 px captures came back cropped or tiled by the tool, so they are not saved. Phone layout was checked by measurement instead: no horizontal overflow, single-line struck words.

## Honest findings

### Working

- The hero idea, problems crossed out before the promise, is distinctive and on-message. The founder loves it, and it ties to the TikTok series.
- The copy is clear and owner-focused. No jargon, no invented claims.
- The form is honest, validates, keeps typed answers after errors, and asks the right first question.
- Zero layout shift, small page weight, no animation library.

### Weak

1. **Visually weak sections:** "Sound familiar?" is a plain list. "How we work" is four equal columns. Both read as wireframes.
2. **Repetitive patterns:** every section is heading + list or heading + equal grid. Nothing changes rhythm after the hero.
3. **Typography:** Anton everywhere with no second display voice. Inter is the default font of most SaaS sites.
4. **Storytelling:** the page tells, but never shows a fix happening.
5. **Conversion:**
    - No way to reach MoyoCode except the form, which is not connected. No email, phone or WhatsApp. For Nigerian buyers, no WhatsApp is a real gap.
    - No proof: no work, no founder photo. The founder note is anonymous text.
    - Nothing explains what happens after someone submits.
6. **Brand:** the new logo (gold M) appears nowhere. The wordmark is typed text. The favicon is Next.js's.
7. **Mobile navigation:** service links are hidden below 768 px, and there is no menu.
8. **Missing pages:** no About, How We Work, Work, Contact or Privacy page. A form that collects names and phone numbers needs a privacy notice under Nigeria's NDPA.
9. **Performance:** LCP is held back by the reveal (above). There is 230 ms of main-thread blocking from React hydration of a mostly static page. Lighthouse also flags render-blocking CSS and some legacy JavaScript.
10. **Accessibility:**
    - The struck hero words fail contrast (2.57:1). They're decorative and `aria-hidden`, but low-vision readers still see them.
    - Footer copyright and the "(optional)" label fail at 3.44:1.
    - No skip link.
11. **SEO:**
    - No sitemap, robots file, canonical URLs, `metadataBase`, Open Graph image or Organization structured data.
    - No real domain to point them at yet.
12. **Animation:** the hero animation runs once and nothing else moves. There's room for purposeful scroll motion.

## The supplied logo

`docs/assets/logo-render-supplied.jpg` (540×341) is a **3D render on a textured wall**, not a usable logo file. The site, favicon and Open Graph image need a flat vector (SVG). Either the founder supplies the original vector, or a redrawn SVG is approved before use.

The mark is an M built from two angled pieces with sharp diagonal cuts. That diagonal is the strongest visual idea available and drives the proposed direction.
