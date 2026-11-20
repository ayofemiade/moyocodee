/*
 * Client work shown on /work and in the homepage strip.
 * Facts confirmed by Moyosore, 20 Nov 2026:
 *   - Segun Michael and V&M: MoyoCode designed and built both. V&M: Next.js, early 2026.
 *   - GBC: MoyoCode maintains the website and its server (contract since Jul 2026). The design is not ours.
 *   - All three may be named publicly. No client quotes yet, so none are shown.
 * "brief" is the client's problem in Moyosore's words. "fix" is copy written for him: pending approval.
 * Screenshots: taken from the live sites on 20 Nov 2026 (public/work/).
 */

export type Project = {
  slug: string;
  name: string;
  url: string;
  host: string;
  sector: string;
  tags: string[];
  brief: string;
  fix: string;
  /** Short line for the homepage strip. */
  short: string;
};

export const workIntro = {
  title: "Live sites, not mockups",
  // pending
  line: "Websites we designed and built, and one we keep running. Every one is live, so open it and click around.",
};

export const projects: Project[] = [
  {
    slug: "segun",
    name: "Segun Michael",
    url: "https://www.segunmichael.com/",
    host: "segunmichael.com",
    sector: "Personal brand",
    tags: ["Design", "Build", "Next.js"],
    brief:
      "He needed a portfolio website that showed the three different things he does, and told them as one story.",
    // pending
    fix: "One site, one voice: listening, media and real estate each get their own page under the same idea, with booking and WhatsApp built in.",
    short: "Portfolio for three lines of work",
  },
  {
    slug: "vm",
    name: "V&M Properties",
    url: "https://www.vandmpropertyllc.com/",
    host: "vandmpropertyllc.com",
    sector: "Real estate · North Carolina, USA",
    tags: ["Design", "Build", "Next.js", "2026"],
    brief: "They needed a website that builds trust with clients and potential investors.",
    // pending
    fix: "A site that leads with the buildings: their story, services, a featured development and what clients say, ending in a clear way to enquire.",
    short: "Real estate developer, USA",
  },
  {
    slug: "gbc",
    name: "Gbenga Biobaku & Co.",
    url: "https://www.gbc-law.com/",
    host: "gbc-law.com",
    sector: "Law firm",
    tags: ["Website & server admin", "Craft CMS", "Since 2026"],
    brief: "They needed someone they could trust to maintain their website and keep their server in place.",
    // pending
    fix: "We look after the site and the server under it: security patches, updates, backups and content changes, on an ongoing contract.",
    short: "Website and server, maintained",
  },
];

export const workClose = {
  // pending
  line: "Need a site that does a job like these?",
  button: "Tell us your problem",
};
