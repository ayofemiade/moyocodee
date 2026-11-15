import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

// The full site (Blueprint direction). Concepts under /concepts render without this chrome.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
