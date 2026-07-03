import Link from "next/link";
import type { ReactNode } from "react";

/** DS card: white fill, 2px dark border, 16px radius, pop-2 shadow.
 * Interactive cards lift toward the cursor and deepen to pop-3. */
export default function Card({
  children,
  href,
  tone = "white",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  tone?: "white" | "dark";
  className?: string;
}) {
  const base = `border-2 border-dark rounded-2xl p-6 md:p-7 ${
    tone === "dark" ? "bg-dark text-mint" : "bg-white text-dark"
  }`;
  if (href) {
    return (
      <Link
        href={href}
        className={`${base} shadow-pop-2 block transition-[transform,box-shadow] duration-100 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-pop-3 hover:bg-lime-bg ${className}`}
      >
        {children}
      </Link>
    );
  }
  return <div className={`${base} shadow-pop-2 ${className}`}>{children}</div>;
}
