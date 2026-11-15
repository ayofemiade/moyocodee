import { ImageResponse } from "next/og";
import { LOGO_PATHS, LOGO_VIEWBOX } from "@/components/Logo";

export const alt = "MoyoCode Technologies: Tell us the problem. We'll build what solves it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview image (WhatsApp, LinkedIn, X). Uses the default sans font to avoid fetching fonts at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          color: "#f5f3ee",
          padding: 72,
        }}
      >
        <svg width="120" height="113" viewBox={LOGO_VIEWBOX}>
          {LOGO_PATHS.map((d) => (
            <path key={d} d={d} fill="#F2C14E" />
          ))}
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1, textTransform: "uppercase" }}>
            Tell us the problem.
          </div>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, textTransform: "uppercase", color: "#F2C14E" }}>
            We&apos;ll build what solves it.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#a8a6a0" }}>MoyoCode Technologies</div>
        </div>
      </div>
    ),
    size,
  );
}
