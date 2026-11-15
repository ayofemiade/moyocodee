import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

// Crossed Out direction (chosen 15 Nov 2026): Anton for impact, Inter for reading.
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "MoyoCode Technologies · Tell us the problem. We'll build what solves it.",
    template: "%s · MoyoCode Technologies",
  },
  description:
    "MoyoCode is a problem-solving technology company. Websites that make you the obvious choice, software built around how you work, and automation that takes repeated tasks off your plate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
