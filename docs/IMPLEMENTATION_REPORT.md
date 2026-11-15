# Implementation Report (interim: stages 0–2)

15 Nov 2026, branch `visual-concepts`. Direction 1, "The Cut", was approved by the founder. This covers the foundation and homepage. The other pages, form delivery and launch are not done yet.

## What changed and why

| Area | Change | Why |
|---|---|---|
| Checkpoint | Committed all prior work before starting | Concepts were lost once before |
| Logo | `src/components/Logo.tsx`: vector redraw of the supplied render. Brushed or flat, plus a wordmark lock-up. Comparison page at `/concepts/logo` | The supplied file is a 3D render, unusable as a logo. **The redraw was approved by the founder on 15 Nov 2026** |
| Brand angle | Both logo pieces measure about 45°, so all "cut" bars have 45° ends (`.cut-bar`) | One gesture across logo, strikes and the scroll line |
| Type | Inter replaced by Schibsted Grotesk; Anton kept | Inter is the default SaaS font. Anton keeps continuity with the video series |
| Colour | Muted and struck tokens replace opacity-based greys | Earlier greys failed contrast (2.57:1 and 3.44:1) |
| Header | Logo, desktop navigation with a CTA, full-screen phone menu (focus trap, Esc to close, scroll lock, focus returned) | No navigation existed on phones |
| Skip link | "Skip to content" | Keyboard access |
| Hero | Cut animation with the **headline visible from the first paint**. Problem chips: tapping one cuts it and shows its fix | The earlier fade hid the headline for 1 s and delayed LCP |
| Sound familiar? | Speech bubbles with "That's me" toggles and a live "N problems picked" summary | The plain list became an interaction that builds intent |
| Shared choice | `PainContext`: chips, toggles and the form share one selection, sent as `picked` | The visitor's first tap carries into the enquiry |
| Services | Alternating rows, each with a code-drawn illustration **labelled "Illustration"** | Equal cards were the most generic part of the page |
| How we work | Gold line fills on scroll and steps light up (GSAP ScrollTrigger, loaded only near the section, no pinning, reduced-motion fallback) | The one immersive moment from Direction 2 |
| Form | Shows the picked problems; accepts picked problems instead of text; "What happens next" in 3 steps beside it | Confidence before action |
| SEO | `metadataBase`, canonical URLs, Open Graph and Twitter metadata, generated OG image, `sitemap.xml`, `robots.txt` (concepts excluded), ProfessionalService JSON-LD, logo favicon | None existed |
| Clean-up | Starter SVGs and favicon removed | — |

## Dependencies

- **Added:** `gsap@3.15.1`. It's dynamically imported in `ProcessLine` only, so it isn't in the initial bundle.
- **Skills copied** from the Segun project into `.claude/skills` (git-ignored): frontend-design, gsap-scrolltrigger, accessibility, core-web-vitals, performance, vercel-react-best-practices.

## Tests performed (15 Nov 2026)

| Test | Result |
|---|---|
| `npm run lint`, `npm run build` | Pass. 15 routes |
| Hero cut animation | Bars reach full width (transform measured) |
| Chip → bubble → summary → form | One tap and one toggle both show in the form and in the hidden `picked` value |
| Submit with picked problems and no text | Passes validation. Then shows the honest "not connected" message |
| Process line | Fill at 68% mid-section. 3 of 4 steps active at that scroll point |
| Phone (375×812) | No horizontal overflow on home and services. Chips 44 px tall. Menu: opens, traps focus, closes on Esc, returns focus |
| SEO routes | `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, `/icon.svg` return 200. Canonical and JSON-LD present. Unknown route returns 404 |
| Lighthouse (mobile simulation, local) | See below |

## Lighthouse after this stage

| Page | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| `/` | 95 | 100 | 100 | 100 | 0.9 s | 2.6 s | 130 ms | 0 |
| `/services/websites` | 96 | 100 | 100 | 100 | 0.9 s | 2.5 s | 140 ms | 0 |
| `/services/automation` | 86 | 100 | 100 | 100 | 0.9 s | 2.8 s | 390 ms | 0 |

- **Before this stage:** the homepage scored 92 / 96 / 100 / 100, with LCP 2.6 s and TBT 250 ms.
- **The automation page result is noisy:** the same code scored 97 with TBT 80 ms one run earlier. Lab runs on this machine vary.
- **LCP gap:** measured directly, the LCP render delay is about 0.2 s, and 2.5 s is Lighthouse's slow-4G simulation. Switching the text font to `display: optional` did not change it, so that was reverted. Re-measure on the real deployed URL before more work here.

## Remaining (needs founder input or later stages)

1. ~~Approve the logo redraw~~: approved on 15 Nov 2026.
2. Confirm "What happens next": a 20–30 minute call, and a written cost and timeline.
3. Contact details (email, WhatsApp) and where the form should deliver. The form is honest but not connected.
4. Founder photo and background, for the founder section and About.
5. Client permissions for case studies (Segun, Mrs Onyeje).
6. Pages: About, How we work, Work, Contact, Privacy, and a styled 404.
7. Deploy, then field LCP; domain connection; final QA, performance and SEO reports.
