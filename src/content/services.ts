// Service page copy. Approved copy: label, headline, problem, whatWeDo, youGet, examples
// (MoyoCode Website Story doc, 13 Nov 2026).
// SEO round (16 Nov 2026) added: name, slugs, seoTitle, seoDescription, forWho, faqs.
// // pending: founder approval of every SEO-round line below. Never imply past client results,
// prices or timelines we can't prove.

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  /** The previous URL slug, permanently redirected (next.config.ts). */
  oldSlug: string;
  /** Short label for navigation. */
  label: string;
  /** Full, descriptive service name: used in the H1, breadcrumbs, structured data and link text. */
  name: string;
  /** Kind of service, for structured data. */
  serviceType: string;
  headline: string;
  seoTitle: string;
  seoDescription: string;
  problem: string;
  whatWeDo: string;
  forWho: string[];
  youGet: string[];
  examples?: string[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "website-design",
    oldSlug: "websites",
    label: "Websites",
    name: "Website design and development",
    serviceType: "Website design and development",
    headline: "Be the obvious choice",
    seoTitle: "Website Design & Development for Businesses",
    seoDescription:
      "Business websites designed and built to turn visitors into enquiries: clear copy, fast pages, built for phones first. Start with a free diagnosis.",
    problem:
      "People judge your business in seconds. A dated or generic site sends them to a competitor before you ever hear from them.",
    whatWeDo:
      "A one-of-a-kind website that tells your story clearly, shows why you're the better choice, and makes it easy to get in touch.",
    forWho: [
      "Businesses whose website is dated, slow or hard to update",
      "New businesses that need to look credible from day one",
      "Service businesses that need enquiries, not just a brochure",
      "Anyone redesigning a site that looks fine but brings in nothing",
    ],
    youGet: [
      "Custom design, not a template",
      "Copy shaped around your customers",
      "Mobile-first build",
      "Enquiry forms that reach you instantly",
      "A care plan if you want us to keep it running",
    ],
    faqs: [
      {
        q: "How much does a business website cost?",
        a: "It depends on how many pages you need, what the site has to do (bookings, payments, a blog) and who writes the words. We give you a written quote after the free call, once we understand the problem it needs to solve.",
      },
      {
        q: "How long does it take to build?",
        a: "It depends on the scope and on how quickly content and feedback come in. The quote includes a timeline in writing, and you see progress every week, not just at the end.",
      },
      {
        q: "Can you redesign my current website?",
        a: "Yes. We start by looking at what your current site does well and what it's costing you, so the redesign keeps what works and fixes what doesn't.",
      },
      {
        q: "Do you look after the website after launch?",
        a: "If you want us to. A care plan covers hosting, fixes and small changes, so the site keeps working while you run the business.",
      },
    ],
  },
  {
    slug: "custom-software",
    oldSlug: "software",
    label: "Software",
    name: "Custom software development",
    serviceType: "Custom software development",
    headline: "Work the way your business actually works",
    seoTitle: "Custom Software Development for Businesses",
    seoDescription:
      "Business software built around how you already work: management systems, dashboards, client portals and internal tools. Start with a free diagnosis.",
    problem:
      "Off-the-shelf tools force your process into their shape, so your team ends up working around the software.",
    whatWeDo:
      "Custom systems built around how you already work: management systems, dashboards, client portals and internal tools.",
    forWho: [
      "Teams running the business on spreadsheets and WhatsApp threads",
      "Businesses whose current tool forces constant workarounds",
      "Operations that need one place for orders, clients, stock or bookings",
      "Owners who can't see what's happening today without asking around",
    ],
    youGet: ["A tool your team actually uses", "Your data in one place", "A system that grows with you"],
    faqs: [
      {
        q: "Should I build custom software or buy an existing tool?",
        a: "Often an existing tool is enough, and we'll tell you if it is. Custom software makes sense when the way you work is part of what makes you different, or when off-the-shelf tools need so many workarounds that they cost more than they save.",
      },
      {
        q: "How much does custom software cost?",
        a: "It depends on what the system must do and how many people will use it. We map the process with you first, then quote in writing, so you know what you're paying for before anything is built.",
      },
      {
        q: "Can it connect to the tools we already use?",
        a: "Usually, yes. Most tools offer a way to connect. We check what yours support before we promise anything.",
      },
    ],
  },
  {
    slug: "ai-automation",
    oldSlug: "automation",
    label: "AI and automation",
    name: "AI and business process automation",
    serviceType: "Business process automation",
    headline: "Stop doing it by hand",
    seoTitle: "AI & Business Process Automation",
    seoDescription:
      "Automate the repeated work: enquiry replies, follow-ups, invoice reminders and data entry, using AI only where it genuinely helps. Free diagnosis call.",
    problem:
      "Repeated tasks eat hours, and things slip: an enquiry nobody answered, a quote nobody chased, an invoice nobody followed up.",
    whatWeDo:
      "Automations that handle repeated work on their own, using AI where it genuinely helps, and only there.",
    forWho: [
      "Businesses missing enquiries or replying too late",
      "Teams copying the same information between tools",
      "Owners chasing quotes, invoices and reminders by hand",
      "Anyone whose week is full of the same five tasks",
    ],
    youGet: [
      "Less manual work every week",
      "Nothing slipping through the cracks",
      "Clear reports on what the automation did",
    ],
    examples: [
      "Every enquiry answered quickly, day or night",
      "Missed calls answered by an AI receptionist",
      "Quotes and invoices followed up automatically",
      "Appointment reminders that cut no-shows",
      "Review requests after every job",
    ],
    faqs: [
      {
        q: "What should a business automate first?",
        a: "The task you repeat most often, that follows the same steps every time, and that costs you customers or hours when it slips. Replying to new enquiries and chasing payments are common places to start.",
      },
      {
        q: "Do I need AI, or just automation?",
        a: "Often plain automation is enough. We use AI only where it genuinely helps, for example to understand a written enquiry, and we'll say so when it doesn't.",
      },
      {
        q: "Can it work with WhatsApp?",
        a: "WhatsApp has an official business platform for automated messages. We check what you need against its rules and costs before we build anything.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/** Last real content change per page, for the sitemap (not the build time). */
export const contentUpdated = "2026-11-16";
