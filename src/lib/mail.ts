import "server-only";
import nodemailer from "nodemailer";

/**
 * Sends email straight from MoyoCode's own mailbox over SMTP. No email service sits in between:
 * the site logs in to your mailbox (Hostinger, Gmail or any other) like a mail app does, and sends.
 *
 * Settings (server-only environment variables, never sent to the browser):
 *   SMTP_HOST, SMTP_PORT (465 = SSL, 587 = STARTTLS), SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL
 */

export type MailConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  to: string;
};

export function readMailConfig(): MailConfig | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 465),
    user: SMTP_USER,
    pass: SMTP_PASS,
    // Defaults to the sending mailbox itself.
    to: CONTACT_TO_EMAIL || SMTP_USER,
  };
}

export async function sendMail(
  cfg: MailConfig,
  msg: { subject: string; text: string; html: string; replyTo?: string },
) {
  const transport = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465,
    // Port 587 must upgrade to an encrypted connection; never send the password in clear text.
    requireTLS: cfg.port !== 465,
    auth: { user: cfg.user, pass: cfg.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    // Local test servers only. Set SMTP_ALLOW_PLAIN=1 to skip TLS against localhost.
    ...(process.env.SMTP_ALLOW_PLAIN === "1" && cfg.host === "127.0.0.1"
      ? { secure: false, requireTLS: false, ignoreTLS: true }
      : {}),
  });

  await transport.sendMail({
    // Most mailboxes only allow sending as yourself, so "from" is always the login address.
    from: { name: "MoyoCode website", address: cfg.user },
    to: cfg.to,
    replyTo: msg.replyTo,
    // Strip line breaks so nobody can inject extra mail headers through the subject.
    subject: msg.subject.replace(/[\r\n]+/g, " ").slice(0, 150),
    text: msg.text,
    html: msg.html,
  });
}
