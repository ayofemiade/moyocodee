# New Creative Direction (round 2)

16 Nov 2026. The founder's brief of 16 Nov delegates the choice: "Make a professional creative decision. Document the reasoning and proceed." So this document ends in a decision rather than a stop.

## What the material allows

- **No photographs** of the founder or of client work have been supplied or approved, so the site must be carried by **type, colour and one gesture**.
- **The logo:** an M made of two pieces separated by **one 45° cut**.
- **Colours:** black #050505 and gold #F2C14E. The founder asked for black and gold to alternate.
- **Approved copy:** "Tell us the problem. We'll build what solves it." and the five problems.
- **Continuity:** Anton is the type of the founder's TikTok series.
- **No proof yet:** no case studies, testimonials or numbers. None may be invented.

## Five directions

| # | Direction | Central idea | Memorable as | Main risk |
|---|---|---|---|---|
| A | **The Problem Pages** (experimental editorial) | A broadsheet: business owners' problems set as letters to the editor, each answered in print | "A newspaper of business problems" | A known trope. Heavy reading on phones |
| B | **The Workshop** (immersive world) | A spatial 3D workshop you walk through; each bench is a service | "The 3D workshop site" | WebGL weight and phone memory. Technology looking for a reason |
| C | **Gold Standard** (minimalist luxury) | Silence: one brushed-gold M, huge calm type, almost no motion | "Very premium" | Forgettable. Drops the energy the founder chose |
| D | **The Fix Machine** (creative technology lab) | Type a problem into a machine; a diagram assembles the fix | "You type your problem and it builds the answer" | Implies automatic diagnosis MoyoCode doesn't offer, which is dishonest |
| **E** | **Two Sides of the Cut** (original) | The logo's 45° cut becomes a **moving line**. Behind it is the visitor's problem, in black; in front of it is the fix, in gold. Every chapter is one cut | "A gold line slices through business chaos and leaves it fixed" | Diagonal splits exist in templates. The answer is that this one moves and means something |

## Scoring (1–5; honesty is a gate)

| | A | B | C | D | **E** |
|---|---|---|---|---|---|
| Originality | 3 | 3 | 2 | 4 | **5** |
| Brand relevance | 3 | 2 | 3 | 4 | **5** (it *is* the logo) |
| Visual quality | 4 | 4 | 4 | 3 | **4** |
| Usability / conversion | 3 | 2 | 4 | 3 | **4** |
| Feasibility and speed | 4 | 2 | 5 | 3 | **4** (CSS clip-path plus a rAF scrub, no library) |
| Honesty (gate) | pass | pass | pass | **fail** | pass |
| Mobile | 2 | 1 | 4 | 3 | **4** |

## Decision: E, Two Sides of the Cut

- **The one verb:** *cut.* The line moves across a chapter as you scroll; behind it is the problem, in front of it the fix.
- **The colours now mean something:** black = the problem, gold = the fix. That's why the site alternates.
- **Structure:**
    1. **Hero:** split diagonally at 45°. The problem side is crowded with the fragments of a struggling business (illustrative, labelled). The fix side holds the promise. Scrolling moves the cut until gold takes the screen.
    2. **Which of these is you?** (black): the picks; each pick is cut through.
    3. **Three ways we fix it** (gold): each service is a before/after panel the cut passes through as you scroll.
    4. **How we work** (black): the blade line draws down through four steps.
    5. **A letter** (gold): the founder's note opens a letter-style enquiry form.
- **Motion engine:** CSS for the first frame, plus one hand-written rAF scrub that reads cached geometry. No GSAP for the new scenes, no WebGL, no smooth-scroll library.
- **Reduced motion:** every cut rests at its "fixed" state, and nothing hides content.
- **Phones:** the cut runs at 45° across the width, problem above and fix below.

## Rejected

- **A broadsheet:** a known trope.
- **WebGL worlds:** weight with no meaning.
- **A "type your problem" AI machine:** dishonest.
- **Cursor followers and smooth scroll:** they hurt usability.
- **New photography or AI-generated people:** no approved material exists.

## Still needed from the founder (not blocking)

Real photos of the founder; client permission for case studies; contact details to publish; the business details for a privacy notice.
