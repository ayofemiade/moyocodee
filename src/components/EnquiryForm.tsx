"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions";
import { usePains } from "@/components/home/PainContext";
import { pains } from "@/content/home";

const initial: EnquiryState = { status: "idle", message: "" };

const field =
  "mt-2 w-full border border-text/20 bg-[#111] px-4 py-3 text-text placeholder:text-text/35 focus:border-gold focus:outline-none";
const label = "text-xs font-semibold uppercase tracking-[0.15em] text-text/70";

function Err({ msg, id }: { msg?: string; id: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-2 text-sm text-error">
      {msg}
    </p>
  );
}

export function EnquiryForm({ button }: { button: string }) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const e = state.fieldErrors ?? {};
  const v = state.values ?? {};
  const ctx = usePains();
  const pickedLabels = (ctx?.picked ?? []).map((id) => pains.find((p) => p.id === id)?.chip).filter(Boolean);

  if (state.status === "ok") {
    return (
      <div className="bg-ink p-6 text-text sm:p-8" role="status">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Received</p>
        <p className="mt-2 text-lg">{state.message}</p>
      </div>
    );
  }

  return (
    <form key={JSON.stringify(v)} action={action} className="grid gap-5 bg-ink p-5 text-text shadow-[12px_12px_0_rgba(5,5,5,0.25)] sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            defaultValue={v.name}
            autoComplete="name"
            required
            className={field}
            aria-invalid={!!e.name}
            aria-describedby={e.name ? "name-err" : undefined}
          />
          <Err msg={e.name} id="name-err" />
        </div>
        <div>
          <label htmlFor="business" className={label}>
            Business name and website
          </label>
          <input id="business" name="business" autoComplete="organization" defaultValue={v.business} className={field} />
        </div>
      </div>

      {pickedLabels.length > 0 && (
        <div>
          <p className={label}>You picked</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {pickedLabels.map((l) => (
              <li key={l} className="rounded-full border border-gold px-3 py-1 text-sm text-gold">
                {l}
              </li>
            ))}
          </ul>
          <input type="hidden" name="picked" value={pickedLabels.join("; ")} />
        </div>
      )}

      <div>
        <label htmlFor="problem" className={label}>
          {pickedLabels.length ? "Tell us a little more" : "What’s slowing your business down?"}
        </label>
        <textarea
          id="problem"
          name="problem"
          defaultValue={v.problem}
          rows={4}
          required
          placeholder="For example: enquiries come in at night and nobody replies until the morning."
          className={field}
          aria-invalid={!!e.problem}
          aria-describedby={e.problem ? "problem-err" : undefined}
        />
        <Err msg={e.problem} id="problem-err" />
      </div>

      <div>
        <label htmlFor="tried" className={label}>
          What have you tried so far? <span className="normal-case tracking-normal text-muted">(optional)</span>
        </label>
        <textarea id="tried" name="tried" rows={2} defaultValue={v.tried} className={field} />
      </div>

      <div className="grid gap-5 sm:grid-cols-[180px_1fr]">
        <div>
          <label htmlFor="contactMethod" className={label}>
            Reach me by
          </label>
          <select id="contactMethod" name="contactMethod" className={field} defaultValue={v.contactMethod || "email"}>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact" className={label}>
            Email or phone number
          </label>
          <input
            id="contact"
            name="contact"
            defaultValue={v.contact}
            required
            className={field}
            aria-invalid={!!e.contact}
            aria-describedby={e.contact ? "contact-err" : undefined}
          />
          <Err msg={e.contact} id="contact-err" />
        </div>
      </div>

      {/* Honeypot for bots: hidden from people and screen readers. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company_url">Leave this empty</label>
        <input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-text/80">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            defaultChecked={v.consent === "yes"}
            className="mt-1 h-4 w-4 accent-[#f2c14e]"
            aria-invalid={!!e.consent}
            aria-describedby={e.consent ? "consent-err" : undefined}
          />
          I agree to be contacted about my enquiry.
        </label>
        <Err msg={e.consent} id="consent-err" />
      </div>

      {state.status === "error" && (
        <p role="alert" className="border-l-2 border-error pl-3 text-error">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-gold px-6 py-3.5 font-semibold uppercase tracking-wide text-ink transition hover:bg-gold-hover disabled:opacity-60 sm:w-fit"
      >
        {pending ? "Sending…" : button}
      </button>
    </form>
  );
}
