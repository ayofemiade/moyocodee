# Design Reference Analysis (round 2)

16 Nov 2026. Six sites were driven in headless Chrome through playwright-core, at 1440×900 and 390×844 with an iPhone user agent. Each was scrolled in steps to 35% and 60% of the page.

- **Frames and computed type facts:** `qa-shots/refs/` (git-ignored), with `contact-sheet.png` as an overview.
- **Limits:**
    - Cookie banners were not dismissed.
    - Hover was not tested.
    - Video and WebGL were seen only as still frames.
    - Locomotive was skipped because it serves a bot check.

| Site | Measured | What works, and why | Learn | Don't copy |
|---|---|---|---|---|
| [pentagram.com](https://www.pentagram.com) | 28.4 screens on desktop, 38.5 on phone. Type: "Plain" at 18–19 px | The work is the brand. Navigation and type stay quiet, so the projects carry the identity | Restraint lets the strongest material dominate | A work grid needs real work, which MoyoCode cannot show yet |
| [rauno.me](https://rauno.me) | 6.8 screens on desktop. One signature yellow disc | One colour gesture plus one horizontal strip makes a personal site instantly recognisable | **One signature shape, repeated with conviction**, beats many effects | The horizontal strip pattern |
| [cuberto.com](https://cuberto.com) | 14.7 screens on desktop, 21.3 on phone. Suisse Intl, h1 81 px / 500 / −0.01em | Polished conventional agency: 3D object hero, proof cards scattered at angles | Tilted, scattered cards give testimonials life | The 3D-blob hero, which is now a cliché |
| [instrument.com](https://www.instrument.com) | 7.5 screens on desktop. Full-width wordmark, then a lime colour band, then giant mixed serif and sans | A **full-bleed colour band** shifts the mood mid-page. Type at billboard scale | Colour bands as chapters, which validates the black and gold alternation | Mixing type families for its own sake |
| [basement.studio](https://basement.studio) | 7.5 screens. Geist 87 px / −0.04em. WebGL wireframe scene. "Human / Machine" toggle | The visitor gets a control in the first second | Early interaction makes people stay | WebGL as atmosphere, which is technology looking for a reason |
| [linear.app](https://linear.app) | 11.1 screens on desktop, 7 on phone. Inter Variable 64 px | The product itself is the hero image. Calm confidence | Show the thing working instead of describing it | Inter, and the dark-SaaS look every product site now shares |

## Synthesis

| Principle | From | How it applies to MoyoCode |
|---|---|---|
| One signature gesture, used with conviction | Rauno, Instrument | The 45° cut from the logo becomes the site's single gesture |
| Colour bands as chapters | Instrument | Black and gold alternate, with a meaning attached: black is the problem, gold is the fix |
| Give the visitor something to do early | Basement | Problem chips and "That's me" picks, which also feed the form |
| Show it working | Linear | Every service shows a before and after, cut live |
| Restraint where trust is built | Pentagram, Linear | The founder letter and the form stay calm |

## What none of the references does

Every reference presents **itself**: its work, its product, its scene. None makes **the visitor's own problem** the subject of the page, and none uses one physical gesture to show a problem becoming a fix. MoyoCode can. Its logo is literally two pieces separated by one 45° cut, so the site can be built as **two sides of that cut**.

**Look-alike risk:** a diagonal split hero is common in sports and fashion templates. The answer is that here the line *moves*, and it carries meaning: what's behind it is the visitor's problem, and what's in front is the fix.
