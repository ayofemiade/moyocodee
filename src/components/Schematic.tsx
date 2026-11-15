const GOLD = "#d9a93f";
const BOX = "rgba(12,15,20,0.92)";
const TEXT = "#e8e6e1";
const MONO = "var(--font-mono-bp), ui-monospace, monospace";
const SANS = "var(--font-grotesk), system-ui, sans-serif";

/** Hero diagram: a problem goes into MoyoCode and a working fix comes out. */
export function Schematic() {
  return (
    <svg
      viewBox="0 0 420 400"
      className="h-auto w-full"
      role="img"
      aria-label="Diagram: a problem goes into MoyoCode, which understands, diagnoses, builds and improves, and a working fix comes out"
    >
      <rect x="60" y="16" width="300" height="74" rx="6" fill={BOX} stroke="rgba(232,230,225,0.35)" />
      <text x="80" y="42" fill="rgba(232,230,225,0.5)" fontSize="11" fontFamily={MONO} letterSpacing="2">
        INPUT · PROBLEM
      </text>
      <text x="80" y="70" fill={TEXT} fontSize="17" fontFamily={SANS}>
        Enquiries wait until tomorrow
      </text>

      <line x1="210" y1="90" x2="210" y2="150" stroke={GOLD} strokeWidth="2" className="flow" />

      <rect x="110" y="150" width="200" height="86" rx="6" fill={BOX} stroke={GOLD} strokeWidth="2" />
      <circle cx="132" cy="172" r="4" fill={GOLD} className="pulse" />
      <text x="146" y="176" fill={GOLD} fontSize="11" fontFamily={MONO} letterSpacing="2">
        MOYOCODE
      </text>
      <text x="130" y="206" fill={TEXT} fontSize="13" fontFamily={MONO}>
        understand → diagnose
      </text>
      <text x="130" y="224" fill={TEXT} fontSize="13" fontFamily={MONO}>
        → build → improve
      </text>

      <line x1="210" y1="236" x2="210" y2="296" stroke={GOLD} strokeWidth="2" className="flow" />

      <rect x="40" y="296" width="340" height="90" rx="6" fill={BOX} stroke={GOLD} />
      <text x="60" y="322" fill={GOLD} fontSize="11" fontFamily={MONO} letterSpacing="2">
        OUTPUT · FIX
      </text>
      <text x="60" y="348" fill={TEXT} fontSize="15" fontFamily={SANS}>
        Reply sent · Owner alerted
      </text>
      <text x="60" y="370" fill={TEXT} fontSize="15" fontFamily={SANS}>
        Lead logged · Follow-up scheduled
      </text>
    </svg>
  );
}
