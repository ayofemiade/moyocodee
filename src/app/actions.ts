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

/**
 * Sends an enquiry to CONTACT_WEBHOOK_URL (any automation or email webhook).
 * Until that is set, the form says plainly that it isn't connected, rather than
 * pretending a message was delivered.
 */
export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  // Honeypot: real people never see or fill this field.
  if (text(form, "company_url")) return { status: "ok", message: "Thanks. We'll be in touch." };

  const enquiry = {
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

  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) {
    return {
      status: "error",
      message: "This form isn't connected yet, so your message was not sent.",
      values,
    };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
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
