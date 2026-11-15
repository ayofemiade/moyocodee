import Image from "next/image";
import { LogoMark } from "@/components/Logo";

export const metadata = { title: "Logo redraw check", robots: { index: false } };

// Side-by-side check of the redrawn SVG against the supplied render. Not part of the live site.
export default function LogoCheck() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-8">
      <h1 className="impact text-4xl">Logo redraw: for approval</h1>
      <p className="mt-3 max-w-2xl text-text/80">
        Left: the image you supplied. Right: the vector redraw used on the site. Below: the redraw at the small sizes
        where it actually appears (browser tab, header).
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <figure className="bg-[#1d1d20] p-4">
          <Image src="/brand/logo-render-supplied.jpg" alt="Supplied MoyoCode logo render" width={540} height={341} className="h-auto w-full" />
          <figcaption className="mt-2 text-sm text-text/70">Supplied render</figcaption>
        </figure>
        <figure className="flex flex-col bg-[#1d1d20] p-4">
          <div className="flex flex-1 items-center justify-center">
            <LogoMark className="h-64 w-auto" title="MoyoCode logo, vector redraw" />
          </div>
          <figcaption className="mt-2 text-sm text-text/70">Vector redraw (draft)</figcaption>
        </figure>
      </div>
      <div className="mt-8 flex items-end gap-8 bg-[#111] p-6">
        {[16, 32, 48, 96].map((s) => (
          <div key={s} className="text-center">
            <div style={{ height: s }}>
              <LogoMark className="h-full w-auto" />
            </div>
            <p className="mt-2 text-xs text-text/70">{s}px</p>
          </div>
        ))}
        <div className="text-center">
          <LogoMark className="h-24 w-auto text-gold" tone="flat" />
          <p className="mt-2 text-xs text-text/70">Flat gold</p>
        </div>
      </div>
    </main>
  );
}
