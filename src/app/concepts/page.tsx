import Link from "next/link";

const concepts = [
  {
    href: "/concepts/a",
    name: "A · The Diagnosis",
    idea: "Editorial and calm. MoyoCode as the specialist who listens first: serif type, warm gold, problems laid out like an intake form.",
  },
  {
    href: "/concepts/b",
    name: "B · Crossed Out",
    idea: "Bold and kinetic. Problems get struck through in gold, live, before the promise lands. Matches the energy of your video series.",
  },
  {
    href: "/concepts/c",
    name: "C · Blueprint",
    idea: "Engineered and precise. A problem goes in, a fix comes out, drawn as a gold schematic on dark ink.",
  },
];

export default function Concepts() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-[#e9b949]">MoyoCode · visual concepts</p>
      <h1 className="mt-3 text-3xl font-semibold">Pick a direction</h1>
      <p className="mt-3 text-[#e8e6e1]/70">
        Same copy, three directions. Each shows the hero, the problems and the three ways we solve them.
      </p>
      <ul className="mt-10 space-y-4">
        {concepts.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="block border border-white/10 bg-[#0c0f14] p-5 transition hover:border-[#e9b949]/60"
            >
              <span className="text-lg font-medium">{c.name}</span>
              <span className="mt-1 block text-[#e8e6e1]/70">{c.idea}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-[#e8e6e1]/70">
        Already built in full from C:{" "}
        <Link href="/" className="text-[#e9b949] underline underline-offset-4">
          the complete Blueprint site
        </Link>
        . If you choose A or B, I&apos;ll rebuild it in that style.
      </p>
    </main>
  );
}
