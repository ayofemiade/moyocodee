import type { Metadata, Viewport } from "next";
import { Anton, Schibsted_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// The Cut (approved 15 Nov 2026): Anton for impact, Schibsted Grotesk for reading.
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
// display "optional" was tested on 15 Nov 2026 and did not move the lab LCP estimate, so the default (swap) stays.
const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-text" });

// Defaults only. Every page sets its own title, description, canonical and og:url via pageMeta()
// (src/lib/seo.tsx), so no page inherits the homepage's identity.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MoyoCode Technologies",
    template: "%s | MoyoCode",
  },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, locale: "en_GB" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#050505", colorScheme: "dark" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${schibsted.variable}`}>
      <body className="antialiased">
        {/* Without JS the before/after panels can't play, so show the fix (CutPlay). */}
        <noscript dangerouslySetInnerHTML={{ __html: "<style>[data-cut]{--p:1!important}</style>" }} />
        {children}
      </body>
    </html>
  );
}
