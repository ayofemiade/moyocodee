# Design Intelligence Audit

Prepared 15 Nov 2026. This records which skills and tools exist, which were used, and which are proposed. **Nothing has been installed for this project yet.**

## Skills already on this machine

The founder approved these earlier for the Segun Michael project (`personal work/micheal/.claude/skills`). They are local markdown guidance files, so reusing them downloads nothing.

| Skill | Source | Used for this audit? | Plan |
|---|---|---|---|
| frontend-design | Anthropic (licence file included) | Yes: its "avoid generic AI aesthetics" principles shaped the critique | Copy into this project for implementation |
| modern-web-design | Community | Read headers only | Optional reference |
| gsap-scrolltrigger | Community | Yes: motion tool choice | Copy for implementation |
| motion-framer | Community | Yes: compared against GSAP | Not needed if GSAP is chosen |
| accessibility (WCAG 2.2) | web-quality-skills, MIT | Yes: contrast and skip-link findings | Copy for implementation |
| core-web-vitals | web-quality-skills, MIT | Yes: LCP diagnosis | Copy for implementation |
| performance | web-quality-skills, MIT | Yes | Copy for implementation |
| vercel-react-best-practices | Vercel, MIT | Yes: server-first, small client islands | Copy for implementation |
| scroll-reveal-libraries (AOS) | Community | Rejected | Too blunt; GSAP or CSS covers it |
| three.js / R3F / Spline / Babylon / Rive / Lottie families | Community | Rejected | 3D adds weight and risk with no business purpose here |

## Skills not on this machine

| Skill | Finding | Proposal |
|---|---|---|
| UI UX Pro Max ([nextlevelbuilder](https://claudemarketplaces.com/skills/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max)) | Real, MIT-licensed and widely used. It's a style, palette and font-pairing database with a Python search script. Directories note it is not affiliated with Anthropic | **Ask the founder first.** It downloads third-party code that runs a script. Useful mainly as a second opinion on font pairing and palette; the direction below does not depend on it |
| Official GSAP skills ([greensock/gsap-skills](https://www.skills.sh/greensock/gsap-skills/gsap-plugins)) | Published by GreenSock | Optional, if GSAP is approved |
| Searching the founder's claude.ai skills | No matching skills enabled | — |

## Tools used in this audit

- **The built-in browser:** rendered checks at 1265×598 (the founder's real screen), 768×1024 and 375×812.
- **Lighthouse 12.8.2:** run via `npx` against the local production build, using local Chrome.
- **Next.js production build output and `npm audit`.**

## Motion tools: decision

| Option | Verdict |
|---|---|
| CSS animations + transitions | **Use** for the hero and hover states. No JavaScript, so best for LCP |
| GSAP core + ScrollTrigger + SplitText | **Use**, lazy-loaded on the homepage only, for scroll storytelling. All plugins have been [free for commercial use since 30 Apr 2025](https://webflow.com/blog/gsap-becomes-free) |
| Motion for React | Rejected. It overlaps GSAP, and running both on the same elements is the mistake the brief warns about |
| Lenis / Locomotive smooth scroll | Rejected. That's the scroll hijacking the brief rules out |
| CSS scroll-driven animations | Use only as progressive enhancement, because browser support is uneven |

## Limitations

- **Visual research:** the reference studios use WebGL and loading screens, which didn't screenshot reliably in the built-in browser.
- **Locomotive:** its site showed a bot-check page, and I did not try to get around it.
- **Performance figures:** these are local lab numbers. Real numbers need a deployed URL.
