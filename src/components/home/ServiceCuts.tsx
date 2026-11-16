import { CutPanel } from "@/components/cut/CutPanel";

/*
 * Before/after drawings for the three services, set in type and CSS only (no stock, no fake UI
 * screenshots). Each is an illustration of the kind of change, not a client's real system.
 * Sizes use the panel's container units (cqw) so they scale with the panel.
 */

const big = "font-[family-name:var(--font-display)] uppercase leading-[0.95]";

function WebsiteBefore() {
  return (
    <div className="mt-[9cqw] flex flex-1 flex-col items-center justify-center gap-[2cqw] text-center">
      <p className="text-[4.2cqw] font-bold line-through decoration-1">WELCOME TO OUR WEBSITE!!!</p>
      <p className="text-[3cqw] line-through decoration-1">Page under construction</p>
      <p className="text-[2.8cqw] underline">Click here</p>
      <p className="mt-[3cqw] text-[2.4cqw] line-through decoration-1">Last updated 2019</p>
    </div>
  );
}

function WebsiteAfter() {
  return (
    <div className="mt-[9cqw] flex flex-1 flex-col justify-end gap-[2.5cqw]">
      <p className={`${big} text-[9cqw]`}>Your offer,<br />said clearly.</p>
      <p className="text-[3.4cqw] font-medium">Proof people trust. One clear next step.</p>
      <p className="w-fit bg-ink px-[3cqw] py-[1.6cqw] text-[2.8cqw] font-bold uppercase tracking-wide text-gold">
        Get a quote →
      </p>
    </div>
  );
}

const cells = ["Order", "Paid?", "Stock", "#REF!", "yes??", "FINAL", "v7", "check", "dup?", "pending", "???", "see other"];

function SoftwareBefore() {
  return (
    <div className="mt-[9cqw] grid flex-1 grid-cols-3 gap-px bg-[#2a2a2a] text-[2.8cqw]">
      {cells.map((c) => (
        <span key={c} className="flex items-center bg-ink px-[1.5cqw] line-through decoration-1">
          {c}
        </span>
      ))}
    </div>
  );
}

function SoftwareAfter() {
  const rows = [
    ["Orders", "On track"],
    ["Payments", "Up to date"],
    ["Stock", "Reorder sent"],
  ];
  return (
    <div className="mt-[9cqw] flex flex-1 flex-col justify-end">
      <p className={`${big} mb-[3cqw] text-[8cqw]`}>One system.</p>
      {rows.map(([k, v]) => (
        <p key={k} className="flex justify-between border-t-2 border-ink py-[1.8cqw] text-[3.4cqw] font-semibold">
          <span>{k}</span>
          <span>{v}</span>
        </p>
      ))}
    </div>
  );
}

const tasks = ["Reply to the new enquiry", "Chase the unpaid invoice", "Remind tomorrow's clients", "Update the spreadsheet"];

function AutomationBefore() {
  return (
    <ul className="mt-[10cqw] flex flex-1 flex-col justify-center gap-[2.4cqw] text-[3.4cqw]">
      {tasks.map((t) => (
        <li key={t} className="flex items-center gap-[2cqw]">
          <span className="h-[3cqw] w-[3cqw] shrink-0 border border-current" />
          {t}
        </li>
      ))}
    </ul>
  );
}

function AutomationAfter() {
  return (
    <ul className="mt-[10cqw] flex flex-1 flex-col justify-center gap-[2.4cqw] text-[3.4cqw] font-semibold">
      {tasks.map((t) => (
        <li key={t} className="flex items-center justify-between gap-[2cqw] border-b-2 border-ink pb-[1.4cqw]">
          {t}
          <span className="shrink-0 bg-ink px-[1.6cqw] py-[0.6cqw] text-[2.2cqw] uppercase tracking-wide text-gold">
            Automatic
          </span>
        </li>
      ))}
    </ul>
  );
}

const cuts = {
  "website-design": { label: "a dated website becoming a clear one", before: <WebsiteBefore />, after: <WebsiteAfter /> },
  "custom-software": { label: "scattered spreadsheets becoming one system", before: <SoftwareBefore />, after: <SoftwareAfter /> },
  "ai-automation": { label: "repeated tasks becoming automatic", before: <AutomationBefore />, after: <AutomationAfter /> },
} as const;

export type CutSlug = keyof typeof cuts;

export function ServiceCut({ slug, onDark = false }: { slug: CutSlug; onDark?: boolean }) {
  const c = cuts[slug];
  return <CutPanel label={c.label} before={c.before} after={c.after} onDark={onDark} />;
}
