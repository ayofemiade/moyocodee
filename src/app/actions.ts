"use server";

export type EnquiryState = {
  status: "idle" | "ok" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "problem" | "contact" | "consent", string>>;
  /** Echoed back so React's post-submit form reset doesn't wipe what people typed. */
  values?: Record<string, string>;
};

const MAX = 4000;

function text(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim().slice(0, MAX) : "";
}

type Enquiry = {
  name: string;
  business: string;
  problem: string;
  picked: string;
  tried: string;
  contactMethod: string;
  contact: string;
  consent: boolean;
  receivedAt: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(v: string) {
  return v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function emailBody(e: Enquiry) {
  const rows: [string, string][] = [
    ["Name", e.name],
    ["Business", e.business || "Not given"],
    ["Picked on the site", e.picked || "None"],
    ["What's slowing them down", e.problem || "Not written"],
    ["Tried so far", e.tried || "Not given"],
    ["Reach them by", `${e.contactMethod}: ${e.contact}`],
    ["Consent to contact", e.consent ? "Yes" : "No"],
    ["Received", e.receivedAt],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n\n");
  const html = `<h2 style="font-family:sans-serif">New enquiry from moyocode.com</h2>${rows
    .map(
      ([k, v]) =>
        `<p style="font-family:sans-serif;margin:0 0 14px"><strong>${escapeHtml(k)}</strong><br>${escapeHtml(v).replace(/\n/g, "<br>")}</p>`,
    )
    .join("")}`;
  return { text, html };
}

/** Email via Resend's API (no SDK needed). Keys come from server-only environment variables. */
async function sendEmail(e: Enquiry, apiKey: string, to: string) {
  const { text, html } = emailBody(e);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      // Until moyocode.com is verified in Resend, only the shared test sender works,
      // and it can only deliver to the Resend account's own email address.
      from: process.env.CONTACT_FROM_EMAIL || "MoyoCode website <onboarding@resend.dev>",
      to: [to],
      subject: `New enquiry: ${e.name}${e.business ? ` (${e.business})` : ""}`.slice(0, 150),
      text,
      html,
      // Reply goes straight to the visitor when they gave an email address.
      ...(EMAIL_RE.test(e.contact) ? { reply_to: e.contact } : {}),
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

async function postWebhook(e: Enquiry, url: string) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

/**
 * Delivers an enquiry by email (RESEND_API_KEY + CONTACT_TO_EMAIL) and/or to a webhook
 * (CONTACT_WEBHOOK_URL). With neither configured, the form says plainly that it isn't
 * connected, rather than pretending a message was delivered.
 */
export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  // Honeypot: real people never see or fill this field.
  if (text(form, "company_url")) return { status: "ok", message: "Thanks. We'll be in touch." };

  const enquiry: Enquiry = {
    name: text(form, "name"),
    business: text(form, "business"),
    problem: text(form, "problem"),
    // Problems the visitor ticked on the homepage (chips or "That's me").
    picked: text(form, "picked"),
    tried: text(form, "tried"),
    contactMethod: text(form, "contactMethod"),
    contact: text(form, "contact"),
    consent: form.get("consent") === "yes",
    receivedAt: new Date().toISOString(),
  };

  const values = {
    name: enquiry.name,
    business: enquiry.business,
    problem: enquiry.problem,
    picked: enquiry.picked,
    tried: enquiry.tried,
    contactMethod: enquiry.contactMethod,
    contact: enquiry.contact,
    consent: enquiry.consent ? "yes" : "",
  };

  const fieldErrors: EnquiryState["fieldErrors"] = {};
  if (!enquiry.name) fieldErrors.name = "Please tell us your name.";
  if (enquiry.problem.length < 10 && !enquiry.picked)
    fieldErrors.problem = "Please describe the problem in a sentence or two, or pick one above.";
  if (!enquiry.contact) fieldErrors.contact = "Please tell us how to reach you.";
  if (!enquiry.consent) fieldErrors.consent = "Please confirm we can contact you about this enquiry.";
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "A few details are missing.", fieldErrors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const channels = [
    ...(apiKey && to ? [() => sendEmail(enquiry, apiKey, to)] : []),
    ...(webhook ? [() => postWebhook(enquiry, webhook)] : []),
  ];

  if (!channels.length) {
    return {
      status: "error",
      message: "This form isn't connected yet, so your message was not sent.",
      values,
    };
  }

  // Succeed if at least one channel delivered; log any that failed.
  const results = await Promise.allSettled(channels.map((send) => send()));
  results.forEach((r) => r.status === "rejected" && console.error("Enquiry delivery failed", r.reason));
  if (!results.some((r) => r.status === "fulfilled")) {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again in a moment.",
      values,
    };
  }

  return {
    status: "ok",
    message: "Thanks. We'll reply within one working day with what we'd do about it.",
  };
}
