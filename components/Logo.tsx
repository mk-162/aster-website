import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  /** onDark = lime mark + lime wordmark (matches the app's dark sidebar);
   * onLight = dark mark + dark wordmark. */
  tone?: "onDark" | "onLight";
  /** Mark height in px; wordmark scales with it. */
  size?: number;
  /** Wrap in a home link (default true). */
  asLink?: boolean;
  className?: string;
};

/** The genuine Aster mark (4-petal geometric flower) + condensed uppercase
 * wordmark. Treatment mirrors the production app: lime mark + lime "ASTER"
 * on dark surfaces; dark mark + dark text on light. */
export default function Logo({
  tone = "onDark",
  size = 26,
  asLink = true,
  className = "",
}: LogoProps) {
  const mark =
    tone === "onDark" ? "/brand/aster-mark-lime.svg" : "/brand/aster-mark-dark.svg";
  const textColor = tone === "onDark" ? "text-lime" : "text-dark";

  const inner = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src={mark}
        alt=""
        width={size}
        height={size}
        priority
        className="block"
        style={{ width: size, height: size }}
      />
      <span
        className={`font-condensed font-bold uppercase tracking-[0.04em] leading-none ${textColor}`}
        style={{ fontSize: size }}
      >
        Aster
      </span>
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link href="/" aria-label="Aster — home" className="inline-flex">
      {inner}
    </Link>
  );
}
