import type { ReactNode } from "react";

/** Condensed uppercase micro-label above headings.
 * On light sections use lime-deep (never lime text on white); on dark, lime. */
export default function Kicker({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={`font-condensed uppercase tracking-[0.08em] font-semibold text-[13px] mb-2.5 ${
        tone === "dark" ? "text-lime" : "text-lime-deep"
      } ${className}`}
    >
      {children}
    </p>
  );
}
