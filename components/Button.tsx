import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  /** Real <button> type for forms (ignored when href is set). */
  type?: "button" | "submit";
  disabled?: boolean;
};

/** DS button: 2px dark border, pop shadow, press-nudge active state
 * (translate toward the shadow, shadow → none — like a physical button).
 * Primary = lime on a lime-deep offset; secondary = mint on dark offset. */
export default function Button({
  children,
  variant = "primary",
  size = "lg",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center border-2 border-dark rounded-xl font-condensed uppercase tracking-[0.03em] font-bold text-dark cursor-pointer select-none transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";
  const variants = {
    primary: "bg-lime shadow-pop-lime hover:brightness-105",
    secondary: "bg-mint shadow-pop-2 hover:brightness-102",
  };
  const sizes = {
    sm: "h-10 px-4 text-sm",
    lg: "h-14 px-7 text-lg",
  };
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${cls} disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
