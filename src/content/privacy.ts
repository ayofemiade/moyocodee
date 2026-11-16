// Privacy notice copy, written from an audit of what the site actually does (16 Nov 2026):
// - only personal data: the enquiry form (fields below), sent by email to MoyoCode's own mailbox
// - no cookies, no analytics, no ads, no tracking, no third-party scripts or fonts (fonts are self-hosted)
// - hosting: Vercel, which processes request data such as IP addresses to deliver and protect the site
// Not legal advice: the founder should review it. Lines marked // pending need the founder's decision.

export const privacy = {
  updated: "16 November 2026",
  intro:
    "MoyoCode Technologies runs this website. This notice explains what personal information the site collects, why, and what you can ask us to do with it. It follows Nigeria's Data Protection Act 2023.",

  collect: [
    { item: "Your name", why: "So we know who we're replying to." },
    { item: "Business name and website (optional)", why: "So we can look at your business before we reply." },
    { item: "The problems you pick and what you write", why: "So we understand what's slowing your business down." },
    { item: "What you've tried so far (optional)", why: "So we don't suggest something you've already ruled out." },
    { item: "How to reach you: email, phone or WhatsApp", why: "So we can reply the way you asked." },
    { item: "Your consent tick", why: "So we have your permission to contact you about this enquiry." },
  ],

  purpose:
    "We use this information for one thing: to reply to your enquiry and talk with you about it. We don't add you to a mailing list, and we don't sell or share it for marketing.",

  basis: "Your consent, given by ticking the box on the form. You can withdraw it at any time.",

  dont: ["Analytics", "Advertising", "Tracking cookies", "Selling your data"],
  dontNote:
    "The site sets no cookies and loads no tracking or advertising scripts. Its fonts are served from our own site, not from a font service.",

  where: [
    {
      who: "Our email",
      what: "Your enquiry is sent by email to MoyoCode's mailbox, currently hosted by Google (Gmail).",
      link: { label: "Google's privacy policy", href: "https://policies.google.com/privacy" },
    },
    {
      who: "Our hosting",
      what: "The site runs on Vercel, which processes technical request data, such as your IP address, to deliver the site and protect it from abuse.",
      link: { label: "Vercel's privacy policy", href: "https://vercel.com/legal/privacy-policy" },
    },
  ],
  abroad:
    "Google and Vercel may store and process this data outside Nigeria. Both publish the safeguards they use for international transfers in the policies linked above.",

  // Approved by the founder on 16 Nov 2026: 24 months.
  retention:
    "We keep your enquiry for as long as we're talking with you, and no longer than 24 months after our last contact. Then we delete it.",

  rights: [
    "Ask what information we hold about you",
    "Ask us to correct it",
    "Ask us to delete it",
    "Withdraw your consent",
    "Object to how we use it",
  ],
  // Approved by the founder on 16 Nov 2026: reply in one working day, act within 30 days.
  rightsHow:
    "Send your request through our contact form and we'll reply within one working day and act on it within 30 days. If you're unhappy with how we handle your information, you can complain to the Nigeria Data Protection Commission.",
  ndpc: { label: "Nigeria Data Protection Commission", href: "https://ndpc.gov.ng" },

  changes: "If we change how the site uses personal information, we'll update this page and its date.",
};
