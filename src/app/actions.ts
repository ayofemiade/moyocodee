"use server";

import { readMailConfig, sendMail } from "@/lib/mail";

export type EnquiryState = {
  status: "idle" | "ok" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "problem" | "contact" | "consent", string>>;
  /** Echoed back so React's post-submit form reset doesn't wipe what people typed. */
  values?: Record<string, string>;
};

const MAX = 4000;
/** Forms submitted faster than this after the page loaded are almost certainly bots. */
const MIN_FILL_MS = 3000;

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
  const html = `<h2 style="font-family:sans-serif">New enquiry from the MoyoCode website</h2>${rows
    .map(
      ([k, v]) =>
        `<p style="font-family:sans-serif;margin:0 0 14px"><strong>${escapeHtml(k)}</strong><br>${escapeHtml(v).replace(/\n/g, "<br>")}</p>`,
    )
    .join("")}`;
  return { text, html };
}

const SILENT_OK: EnquiryState = { status: "ok", message: "Thanks. We'll be in touch." };

/**
 * Validates an enquiry and emails it from MoyoCode's own mailbox (see src/lib/mail.ts).
 * With no mailbox configured, the form says plainly that it isn't connected,
 * rather than pretending a message was delivered.
 */
export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  // Spam protection, built in (no CAPTCHA service):
  // 1. Honeypot: real people never see or fill this field.
  if (text(form, "company_url")) return SILENT_OK;
  // 2. Timing: the page stamps when it loaded. A form filled in under 3 seconds is a bot.
  //    (No stamp at all is allowed, so the form still works with JavaScript off.)
  const loadedAt = Number(text(form, "loaded_at"));
  if (loadedAt && Date.now() - loadedAt < MIN_FILL_MS) return SILENT_OK;

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

  const mail = readMailConfig();
  if (!mail) {
    return {
      status: "error",
      message: "This form isn't connected yet, so your message was not sent.",
      values,
    };
  }

  try {
    await sendMail(mail, {
      subject: `New enquiry: ${enquiry.name}${enquiry.business ? ` (${enquiry.business})` : ""}`,
      ...emailBody(enquiry),
      // Hitting Reply answers the visitor directly when they gave an email address.
      replyTo: EMAIL_RE.test(enquiry.contact) ? enquiry.contact : undefined,
    });
  } catch (err) {
    console.error("Enquiry delivery failed", err);
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
