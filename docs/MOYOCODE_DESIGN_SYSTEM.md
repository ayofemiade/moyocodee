# MoyoCode Design System (proposed for Direction 1 · The Cut)

15 Nov 2026. A proposal awaiting approval. Values marked *(current)* are already in code.

## Brand gesture: the cut

- **Angle:** one diagonal, measured from the logo's cuts once the vector exists. Working value: about 38° from horizontal, to be confirmed against the SVG.
- **Used for:** strike-throughs, section edges (`clip-path`), active states and the scroll line in "How we work".
- **Limit:** at most one diagonal element per viewport.

## Colour

| Token | Value | Use | Contrast on ink |
|---|---|---|---|
| `--ink` | #050505 *(current)* | Page background | — |
| `--ink-raised` | #0F0F0F | Cards, form | — |
| `--gold` | #F2C14E *(current)* | Accent, CTAs, the cut | 12.1:1 |
| `--gold-deep` | #C9962F | Gold on light surfaces, borders | 7.7:1 |
| `--text` | #F5F3EE *(current)* | Body text | 18.4:1 |
| `--text-muted` | #A8A6A0 | Secondary text (replaces 40% opacity, which failed contrast) | 8.4:1 |
| `--struck` | #8A8984 | Crossed-out words (replaces #525150, which failed at 2.57:1) | 5.8:1 |
| `--error` | #F29A8A | Form errors | 9.5:1 |

**Gold section** (call to action): `--gold` background with `--ink` text, 12.1:1.

**Brushed gold:** a subtle linear gradient (#B8862B → #F2C14E → #D9A43C), used only on the logo mark, never on text.

Contrast ratios were calculated with the WCAG 2 formula on 15 Nov 2026. They are re-checked with Lighthouse during implementation.

## Typography

| Role | Font | Why |
|---|---|---|
| Display | **Anton** *(current)* | Continuity with the TikTok series. Its condensed weight carries the cut |
| Text and UI | **Schibsted Grotesk** (proposed, Google Fonts, OFL) | Built for a newspaper, so it reads as credible and editorial. Less common than Inter, and readable small |
| Numbers and labels | Schibsted Grotesk, caps, tracked +0.2em | One family for text keeps the font budget small |

**Fluid scale** (CSS `clamp`, 360 px to 1440 px):

| Step | Min → max | Use |
|---|---|---|
| Display XL | 2.6 → 6 rem | Hero |
| Display L | 2.2 → 4.5 rem | Section titles |
| Display M | 1.6 → 2.4 rem | Card titles |
| Lead | 1.125 → 1.375 rem | Intros |
| Body | 1 → 1.0625 rem | Text |
| Label | 0.75 rem, caps | Kickers |

**Fonts budget:** at most 2 families and 3 files, with `display: swap` and Anton preloaded.

## Space, grid, shape

- **Spacing:** a 4 px base. Section padding is `clamp(4rem, 10vw, 8rem)`.
- **Grid:** 12 columns, 24 px gutter, max width 1200 px, and 16 px side margins on phones.
- **Corners:** square (0). The brand is sharp. Pills are allowed only for problem chips.
- **Borders:** 1 px at `--text` 10%. Gold is reserved for meaning.

## Components

| Component | Notes |
|---|---|
| Primary button | Gold block, ink text, uppercase. Hover runs a diagonal sweep. Focus ring 2 px gold, offset 3 px |
| Secondary button | 1 px outline, which turns gold on hover |
| Problem chip | Pill. When selected, a cut runs through it and the fix line appears |
| Speech bubble | Neutral shape (no app imitation), plus a "That's me" toggle (`aria-pressed`) |
| Case card | Image (16:10, `next/image`), problem, what we built, what changed |
| Form fields | `--ink-raised`, label above, error below linked with `aria-describedby` *(current pattern)* |
| Navigation | Desktop: inline links. Phone: full-screen menu with focus trap and Esc to close |
| Skip link | Visible on focus |

## Motion principles

1. **Purpose first:** every animation must show cause → effect (a problem cut → a fix appears).
2. **Durations:** 150 ms for UI feedback, 400–600 ms for reveals, and scrubbed (tied to scroll position) for the scroll story.
3. **Easing:** `cubic-bezier(0.7, 0, 0.2, 1)` for cuts, ease-out for reveals.
4. **Never animate the LCP element's opacity from 0.**
5. **`prefers-reduced-motion`:** everything ends in its final state instantly *(already implemented)*.
6. **No** cursor followers, smooth-scroll libraries or autoplay video.

## Breakpoints

360 · 480 · 768 · 1024 · 1280 · 1440, plus the founder's real screen, 1265×598 CSS px.
