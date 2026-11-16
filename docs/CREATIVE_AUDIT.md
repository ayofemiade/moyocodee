# Creative Audit: live site (www.moyocode.com)

16 Nov 2026.

- **Method:** full-page screenshots of the live production site at 1265×598@1.5 and 390×844@3, in `qa-shots/round-0/` (git-ignored), plus the earlier Lighthouse runs.

## Verdict

It works and it is honest, but it is **templated**. Every section uses the same skeleton: a small kicker, a huge Anton heading, then content in one left-aligned 1152 px column. The 45° cut is worn as a costume, on band corners only, and means nothing. The service illustrations are grey wireframe blocks that could belong to any agency. The colour alternation has no reason behind it.

## Numbers

| Measure | Value |
|---|---|
| Page length | 11.6 screens on laptop (6,935 px), 11.2 on phone |
| Sections | 6, every one kicker + heading + body |
| Font families | 2 (Anton, Schibsted Grotesk) |
| Gold bands | 3, all the same skeleton as the black ones |
| Illustrations | 3 grey wireframes, labelled honestly but generic |
| Accessibility (Lighthouse) | 100 |
| Canonical URL | **Wrong:** `https://moyocode.com` 308-redirects to `https://www.moyocode.com` |

## Section by section

| Section | Problem | Verdict |
|---|---|---|
| Hero | Stacked text in a column; the right 60% of the laptop view is empty. The strikes are horizontal while the logo is 45° | Salvage the copy, the struck words and the chips. Discard the composition |
| Which of these is you? | Good mechanic; generic rounded cards | Keep the mechanic, restyle it |
| Three ways | Alternating text and grey wireframes, the most generic part of the site | Discard the wireframes. Show before and after instead |
| How we work | Strong scroll line, but a lot of empty space on the right | Keep the line, recompose |
| Founder | Strong copy, weak placement. It floats before the form | Merge into the form as a letter |
| Form | Works, and has real email delivery. The founder loves the gold | Keep and refine |

## What survives

The approved copy (verbatim), the logo, Anton for continuity with the video series, gold #F2C14E, the pick-to-form mechanic, the honest form, and the scroll line.
