import type { Metadata, Viewport } from "next";
import { Anton, Schibsted_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// The Cut (approved 15 Nov 2026): Anton for impact, Schibsted Grotesk for reading.
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
// display "optional" was tested on 15 Nov 2026 and did not move the lab LCP estimate, so the default (swap) stays.
const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-text" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Tell us the problem. We'll build what solves it.`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: `${site.name} · Tell us the problem. We'll build what solves it.`,
    description: site.description,
    locale: "en_GB",
  },
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
