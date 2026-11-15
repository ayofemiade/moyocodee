// Service page copy, from the MoyoCode Website Story doc (13 Nov 2026).
// Describe what we build. Never imply past client results we can't prove.

export type Service = {
  slug: string;
  label: string;
  headline: string;
  problem: string;
  whatWeDo: string;
  youGet: string[];
  examples?: string[];
};

export const services: Service[] = [
  {
    slug: "websites",
    label: "Websites",
    headline: "Be the obvious choice",
    problem:
      "People judge your business in seconds. A dated or generic site sends them to a competitor before you ever hear from them.",
    whatWeDo:
      "A one-of-a-kind website that tells your story clearly, shows why you're the better choice, and makes it easy to get in touch.",
    youGet: [
      "Custom design, not a template",
      "Copy shaped around your customers",
      "Mobile-first build",
      "Enquiry forms that reach you instantly",
      "A care plan if you want us to keep it running",
    ],
  },
  {
    slug: "software",
    label: "Software",
    headline: "Work the way your business actually works",
    problem:
      "Off-the-shelf tools force your process into their shape, so your team ends up working around the software.",
    whatWeDo:
      "Custom systems built around how you already work: management systems, dashboards, client portals and internal tools.",
    youGet: [
      "A tool your team actually uses",
      "Your data in one place",
      "A system that grows with you",
    ],
  },
  {
    slug: "automation",
    label: "AI and automation",
    headline: "Stop doing it by hand",
    problem:
      "Repeated tasks eat hours, and things slip: an enquiry nobody answered, a quote nobody chased, an invoice nobody followed up.",
    whatWeDo:
      "Automations that handle repeated work on their own, using AI where it genuinely helps, and only there.",
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
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
