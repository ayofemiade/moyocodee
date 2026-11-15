# Implementation Roadmap (Direction 1 · The Cut)

Proposed 15 Nov 2026. **Nothing here starts until the founder approves the direction.** Each stage ends with browser checks at 1265×598, 768 px and 375 px, plus Lighthouse on the changed pages.

## Stage 0: Checkpoint

- Commit the current work on `visual-concepts`, so nothing is lost again.
- Copy the approved skills from the Segun project into `.claude/skills`.

## Stage 1: Foundation

- Design tokens and fonts: Schibsted Grotesk and the contrast-safe colours.
- Logo SVG component, favicon and app icons, from the founder's vector or an approved redraw.
- Header with a mobile full-screen menu, a skip link and the footer.
- SEO base:
    - `metadataBase` and canonical URLs
    - `sitemap.ts` and `robots.ts`
    - Open Graph image generated with `next/og`
    - Organization and ProfessionalService structured data

## Stage 2: Homepage

1. Hero: the CSS cut animation with the headline visible from the first paint, plus the problem chips (a small client component).
2. Sound familiar?: speech bubbles with "That's me" toggles, carrying choices into the form.
3. Three ways: a treatment per service. The website before/after slider waits for real assets.
4. How we work: a pinned GSAP ScrollTrigger line, lazy-loaded, with a static fallback for reduced motion.
5. Founder (real photo), Work teaser (only with an approved case study), then the form with "What happens next".

## Stage 3: Other pages

| Page | Route | Depends on |
|---|---|---|
| About | `/about` | Founder photo and background |
| How we work | `/how-we-work` | — |
| Services ×3 | `/services/*` (existing) | — |
| Work + case studies | `/work`, `/work/[slug]` | Client permissions and assets. **Not shipped empty** |
| Contact | `/contact` | Email and WhatsApp |
| Privacy | `/privacy` | Registered name and address |
| 404 | `not-found.tsx` | — |

## Stage 4: Form delivery

- Choose the destination: email via an email service, a WhatsApp alert, or the instant-reply system later.
- Set `CONTACT_WEBHOOK_URL` as a secret.
- Test real delivery end to end.

## Stage 5: Quality assurance and launch readiness

- Functional, visual, accessibility and SEO passes, plus Lighthouse on every route.
- Connect moyocode.com in Vercel. DNS stays at Hostinger, with A and CNAME records only.
- Post-launch reports: implementation, quality assurance, performance and SEO.

## Dependencies to add

| Package | Why | Loaded |
|---|---|---|
| `gsap` (includes ScrollTrigger and SplitText) | Scroll storytelling on the homepage | Lazy, homepage only |

Nothing else is planned.

## Performance targets (lab, mobile)

| Measure | Target |
|---|---|
| LCP | under 2.0 s (currently 2.6 s) |
| TBT | under 150 ms (currently 250 ms) |
| CLS | 0 |
| Homepage JavaScript before interaction | ≤ current + 50 KiB gzip |
