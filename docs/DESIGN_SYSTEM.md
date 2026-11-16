# Design System: Two Sides of the Cut

16 Nov 2026. This replaces `MOYOCODE_DESIGN_SYSTEM.md` for the round-2 build. Tokens are in `src/app/globals.css`.

## The rule everything follows

**Black is the problem side. Gold is the fix side.** A 45° line, the angle of the logo's cut, separates them, and it moves.

## Colour (WCAG 2 contrast, measured)

| Pair | Ratio | Use |
|---|---|---|
| Text #F5F3EE on ink #050505 | 18.4:1 | Body on the problem side |
| Muted #A8A6A0 on ink | 8.4:1 | Secondary text |
| Struck #8A8984 on ink | 5.8:1 | Crossed-out problems |
| Gold #F2C14E on ink | 12.1:1 | Accents on black |
| Ink on gold | 12.1:1 | Everything on the fix side |
| Ink at 80% on gold | 8.3:1 | Secondary text on gold (never below 75%, 7.3:1) |
| Ink on paper #F5F3EE | 18.4:1 | The "after" side of the cut panels |

**Never:** gold text on gold; muted text on gold.

## Type

| Role | Face | Rule |
|---|---|---|
| Display | Anton (OFL), uppercase | The voice of the TikTok series. Hero size `min(7cqw, 13cqh)`, sized against both width and height |
| Text | Schibsted Grotesk (OFL) | Body, labels and UI |

## Motion: the permitted list

| Motion | Where | Engine | Reduced motion |
|---|---|---|---|
| The cut scrubs with scroll | Hero (pinned) | `ScrollScene` (rAF over cached geometry) + CSS `clip-path` | Rests at the composed frame; no pin |
| The cut passes a panel | Service before/after panels | Same | Shows "after" |
| A pick is cut through | "Which of these is you?" | CSS transition on tap | Instant |
| The line draws down | How we work | GSAP ScrollTrigger, loaded on approach | Drawn in full |

Nothing else moves. There are no fades on scroll for ordinary content, and no loops.

## Layout

- **Container:** `max-w-6xl` with 16/32 px gutters.
- **Hero units:** the stage's own `cqw`/`cqh`, so the cut and the type stay locked together at every aspect ratio.
- **Sticky header:** height `--header-h: 4.5rem`, with `scroll-padding-top` set to match. Tablets and phones use the menu.
