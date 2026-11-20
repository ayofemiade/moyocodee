# Work page: direction (Stop 1)

20 Nov 2026. Adds three real client sites to moyocode.com. Nothing is built in `src/` yet.

## What I looked at
Captured live, desktop 1440×900 and phone 390×844 (now in `public/work/` as WebP):

| Site | What it is | Detected |
|---|---|---|
| segunmichael.com | Personal brand: Listening Hub, media, real estate, booking, WhatsApp | Next.js |
| vandmpropertyllc.com | Luxury real-estate developer, North Carolina | Not Next/WordPress/Framer markers; stack unconfirmed |
| gbc-law.com | Law firm | Craft CMS (SEOmatic). Moyosore's role: website and server administration since Jul 2026 |

Honesty point: the GBC design is older and is not MoyoCode's design work. It must be shown as **"we keep it running"** (servers, patching, backups, content), never as "we designed this".

## Three concepts

**A. Live on the fix side (recommended).** A `/work` page. Each project gets a section that alternates black and gold like the homepage. Copy: the client's problem is struck through in muted text, then the fix is stated. A real desktop screenshot and a phone screenshot sit on a panel cut at the logo's 45° angle, using the cut played by the existing `CutPlay`. A live link goes to each site. A three-thumbnail strip at the end of the homepage's "Three ways we fix it" links to `/work`, and "Work" goes into the header.
- Why: it is the site's own idea (problem → fix) applied to proof. Real screenshots; no fake "before" images.
- Risk: it needs one true sentence per client about the problem the site solved.

**B. The index.** The three client names are set huge in Anton as a list; hovering over or focusing a name reveals its screenshot.
- Why not: with three items it looks thin, and hover-reveal hides the proof on phones, where most visitors are.

**C. Scroll the real site.** Each project pins a frame, and its full-page screenshot scrolls inside it as you scroll.
- Why not: the images are 10–12k px tall, which is heavy and risky for phone memory. It is also scroll-reveal motion that the brand rules avoid.

## Comp
`docs/screenshots/work/comp-A-desktop.webp`, `comp-A-phone.webp`. Dashed boxes are pending facts.

## Pending from Moyosore (nothing invented)
1. Segun and V&M: did MoyoCode design **and** build both? V&M's platform? The year each went live.
2. One sentence each: what problem the client had before.
3. OK to name all three on the public site (not only in pitches)?
4. Any real client quote with permission (optional; left out if none).

## Built (20 Nov 2026, concept A approved with project facts)
- `/work` page (`src/app/(site)/work/page.tsx`), content in `src/content/work.ts` (`// pending` marks copy awaiting approval), `WorkCase` + `work.module.css`, homepage strip `WorkStrip` at the end of "Three ways we fix it", "Work" in header, footer and sitemap. CollectionPage + ItemList JSON-LD.
- Screenshots as WebP in `public/work/` (412 KB for all six).
- Checked (production build, Playwright/Chrome): 1265×598@1.5, 1440×900, 1024×700, 768×1024, 390×844@3. No horizontal overflow, no console errors. Each cut starts at --p 0 and ends at 1. Reduced motion and no-JS both show the live site (--p 1).
- Fixed in the browser: the "The brief" label showed through the screenshot, and the screenshot covered the "Live" label (stacking order).
- Not done: Lighthouse, a real phone, Segun's launch year (not supplied, so it isn't shown), client quotes (none yet).
