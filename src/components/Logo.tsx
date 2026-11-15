import { useId } from "react";

/**
 * MoyoCode M, redrawn as a vector from the founder's 3D render.
 * Approved by the founder on 15 Nov 2026 as the official mark.
 * Both pieces are cut at about 45°, which is the brand's "cut" angle.
 */
export const LOGO_VIEWBOX = "150 10 295 277";
export const LOGO_PATHS = [
  "M155 15 L350 205 L350 245 L200 112 L200 240 L157 282 Z",
  "M437 15 L437 240 L395 282 L395 108 L352 150 L332 130 Z",
];

type Props = {
  className?: string;
  /** Brushed-gold gradient (default) or a flat colour via currentColor. */
  tone?: "brushed" | "flat";
  title?: string;
};

export function LogoMark({ className, tone = "brushed", title }: Props) {
  const id = useId();
  const fill = tone === "brushed" ? `url(#${id})` : "currentColor";
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {tone === "brushed" && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#B8862B" />
            <stop offset="0.5" stopColor="#F2C14E" />
            <stop offset="1" stopColor="#D9A43C" />
          </linearGradient>
        </defs>
      )}
      {LOGO_PATHS.map((d) => (
        <path key={d} d={d} fill={fill} />
      ))}
    </svg>
  );
}

/** Mark + wordmark, used in the header and footer. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-7 w-auto" />
      <span className="impact text-2xl leading-none">
        Moyo<span className="text-gold">Code</span>
      </span>
    </span>
  );
}
