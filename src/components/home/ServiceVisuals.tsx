import { InView } from "./InView";
import s from "./home.module.css";

// Code-drawn illustrations of what each service produces. Labelled as illustrations:
// they show the kind of thing we build, not a client's real system.

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <figure className="w-full">
      <div className="border border-text/15 bg-raised p-4 sm:p-6">{children}</div>
      <figcaption className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">Illustration · {label}</figcaption>
    </figure>
  );
}

export function WebsiteVisual() {
  return (
    <Frame label="a site built to win the enquiry">
      <div aria-hidden className="border border-text/10 bg-ink">
        <div className="flex items-center gap-2 border-b border-text/10 px-3 py-2">
          <span className="h-2 w-2 bg-text/30" />
          <span className="h-2 w-12 bg-text/15" />
          <span className="ml-auto h-2 w-20 bg-text/15" />
        </div>
        <div className="space-y-3 p-5">
          <div className="h-3 w-1/3 bg-gold/70" />
          <div className="h-6 w-4/5 bg-text/80" />
          <div className="h-6 w-3/5 bg-text/80" />
          <div className="h-2.5 w-11/12 bg-text/20" />
          <div className="h-2.5 w-2/3 bg-text/20" />
          <div className={`${s.press} mt-4 inline-block bg-gold px-4 py-2 text-xs font-bold uppercase text-ink`}>
            Get a quote
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function SoftwareVisual() {
  const bars = [40, 65, 52, 80, 70, 92];
  return (
    <Frame label="a custom dashboard">
      <div aria-hidden className="grid grid-cols-[56px_1fr] border border-text/10 bg-ink">
        <div className="space-y-3 border-r border-text/10 p-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-2 ${i === 0 ? "bg-gold/80" : "bg-text/20"}`} />
          ))}
        </div>
        <div className="space-y-4 p-4">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-2 border border-text/10 p-2">
                <div className="h-1.5 w-2/3 bg-text/25" />
                <div className="h-3 w-1/2 bg-text/70" />
              </div>
            ))}
          </div>
          <div className="flex h-20 items-end gap-2 border-b border-text/10">
            {bars.map((h, i) => (
              <div key={i} className={i === bars.length - 1 ? "flex-1 bg-gold" : "flex-1 bg-text/25"} style={{ height: `${h}%` }} />
            ))}
          </div>
          {[0, 1].map((i) => (
            <div key={i} className="flex gap-2">
              <div className="h-2 w-1/4 bg-text/25" />
              <div className="h-2 w-1/3 bg-text/15" />
              <div className="ml-auto h-2 w-10 bg-gold/60" />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

const flow = [
  { label: "New enquiry from the website", tone: "text-text" },
  { label: "Reply sent to the customer", tone: "text-text" },
  { label: "Owner alerted with the details", tone: "text-text" },
  { label: "Follow-up booked if there's no answer", tone: "text-gold" },
];

export function AutomationVisual() {
  return (
    <Frame label="an enquiry handled automatically">
      <InView activeClass={s.inView}>
        <ol className="space-y-3">
          {flow.map((f, i) => (
            <li key={f.label} className={`${s.flowStep} flex items-center gap-4 border border-text/10 bg-ink px-4 py-3`}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-gold text-xs font-bold text-gold">
                {i + 1}
              </span>
              <span className={`font-medium ${f.tone}`}>{f.label}</span>
            </li>
          ))}
        </ol>
      </InView>
    </Frame>
  );
}
