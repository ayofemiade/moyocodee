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
3. Form delivery: **no third-party service.** The site emails each enquiry straight from MoyoCode's own mailbox over SMTP, using Nodemailer 10.3.1 (MIT-0, no dependencies) in `src/lib/mail.ts`. Spam protection is built in: a honeypot field and a 3-second minimum fill time, with no CAPTCHA service.
    - **Tested end to end on 15 Nov 2026** against a local test mail server. The real submission arrived with the correct From, To and Reply-To, the picked problems and the message; typed HTML arrived escaped. A bot-speed submission was dropped.
    - **Bug fixed during testing:** tapping a problem chip reset the timing stamp, which would have flagged real visitors as bots.
    - **Goes live when** the founder puts the mailbox details in `.env.local` (see `.env.example`), and later in Vercel.
4. Founder photo and background, for the founder section and About.
5. Client permissions for case studies (Segun, Mrs Onyeje).
6. Pages: About, How we work, Work, Contact, Privacy, and a styled 404.
7. Deploy, then field LCP; domain connection; final QA, performance and SEO reports.

---

# Round 2: Two Sides of the Cut (16 Nov 2026)

Branch `rethink`, **uncommitted**. Per the founder's standing rule, nothing is committed or pushed until they say "push". `main`, which is live, is untouched. The founder's brief of 16 Nov delegated the creative choice; the reasoning is in `NEW_CREATIVE_DIRECTION.md`.

## The idea

The logo's 45° cut becomes a **moving line**. Behind it, in black, is the visitor's problem. In front of it, in gold, is the fix. That gives the founder's black and gold alternation a meaning: black is always the problem side, gold is always the fix side.

## What changed

| Area | Change |
|---|---|
| Hero | Rebuilt as a pinned scene split by a 45° line. The problem side holds tilted, struck notes (illustrative, `// pending`). The fix side holds the promise. Scrolling moves the line until gold fills the screen, and each note it passes turns into its fixed version. The headline is split across the line, one sentence on each side |
| Motion engine | `src/components/cut/ScrollScene.tsx`: one shared rAF over cached geometry, writing only changed `--p`, `--w` and `--h`. No library. The no-JS frame and the reduced-motion frame are server-rendered values |
| Which of these is you? | A ruled ledger on black (it was rounded cards on gold). Picking a line cuts it through in gold and reveals its fix. Picks still feed the form |
| Three ways we fix it | Grey wireframes replaced by **before/after panels** (`CutPanel`) that the line sweeps across as they scroll into view. Type-set illustrations, labelled "Illustration" |
| How we work | Back on black. The heading is pinned beside the drawing line on desktop |
| Letter | The founder's note and "What happens next" now open the form on gold |
| Service pages | Each service's own before/after panel at full size beside its problem and fix |
| New pages | `/contact` (the letter, linkable on its own) and a styled 404 (`// pending` copy) |
| Header | Sticky, 72 px, solid black. The menu now starts below 1024 px, because nav links wrapped at 768 |
| SEO | Canonicals, sitemap, OG and JSON-LD now use `https://www.moyocode.com`. The bare domain 308-redirects to www, so the old canonical pointed at a redirect |
| Removed | HeroChips, PainBubbles, ServiceVisuals (git-staged deletions, not committed) |

## Defects found in the browser, and fixed

1. **Port collision:** 3125 was serving the Segun Michael site from another session. The first shots were discarded and QA moved to 3135.
2. **Hero cut off at the bottom** at every size, because the stage was 100svh below the header. Fixed with the sticky header plus a stage of `100svh − header`, laid out in container units.
3. **Notes sitting on the cut at rest** (half-cut text read as a glitch). Positions now keep about 300 px clear at 1265×598, 1440×900 and 1920×1080. Phones show two notes.
4. **Tablet nav wrapping** at 768 px. The menu button now appears below 1024 px.
5. **Panels invisible on black service pages.** Added a 28% white edge on dark.
6. **Reduced motion pushed the hero down** by the header height (sticky `top` acting as a relative offset). Reset to 0.

## Measured (16 Nov 2026, local production build)

| Check | Result |
|---|---|
| Lighthouse desktop: home, service, contact | 100 / 100 / 100 / 100. LCP 0.5 s, TBT 0 ms, CLS 0 |
| Lighthouse mobile (simulated slow 4G) | 96–97 / 100 / 100 / 100. LCP 2.6 s, TBT 60–90 ms (it was 270–360 ms), CLS 0 |
| Phone layer memory, 390×844@3, 10 scroll stops | Peak 272 MB (the reference project's safe range was 300–700 MB) |
| Horizontal overflow | None at 1265×598, 1440×900, 1920×1080, 768×1024, 390×844, 375×667 |
| Console errors | None (the 404 page reports its own 404, as expected) |
| No JS | The hero's first frame renders complete on laptop and phone |
| Reduced motion | Hero rests composed; panels show "after" |
| Scroll scene | `--p` tracks scroll exactly (0.33 → 0.329, 0.66 → 0.661, 1 → 1.000). Panels cut mid-screen at p ≈ 0.45 |

**Not tested:** a physical iPhone or Android (emulation only), keyboard tabbing through every control (the skip link, focus ring and scroll-padding are in place, but no full tab pass was recorded), and field Core Web Vitals.

## Open items (founder)

1. Approve the illustrative hero notes and the 404 copy (`// pending`).
2. Real photos of the founder, for About and the letter.
3. Client permission and assets for Work and case studies. The pages wait until then.
4. ~~Privacy notice~~: built at `/privacy` on 16 Nov 2026 from an audit of the site.
    - **What the audit found:** no cookies, analytics, ads or third-party requests. The only personal data is the form. It goes to the Gmail mailbox, and Vercel hosts the site.
    - **Where it's linked:** the footer, the form's consent line (opens in a new tab so a half-written enquiry is never lost), and the sitemap.
    - **Checks:** Lighthouse gave 90 / 100 / 100 / 100. No overflow at laptop or phone size.
    - **Founder decisions:** the 24-month retention period and the 30-day response commitment were approved on 16 Nov 2026. This is not legal advice; the founder should review it.
5. Say **"push"** to commit `rethink` and deploy.
