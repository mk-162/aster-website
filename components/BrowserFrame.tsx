import Image from "next/image";

/** Dark browser chrome for desktop app screenshots — title bar with three
 * dots and a URL pill. DS language: 2px dark border + pop shadow.
 * Screenshots are 2880×1800 desktop captures. */
export default function BrowserFrame({
  src,
  alt,
  url = "watchthedot.app/watch/…",
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 640px, 92vw",
}: {
  src: string;
  alt: string;
  url?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border-2 border-dark bg-dark shadow-pop-lime ${className}`}
    >
      <div className="flex items-center gap-3 px-4 py-2.5 border-b-2 border-dark bg-dark">
        <span aria-hidden className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-mint/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-mint/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-mint/30" />
        </span>
        <span className="flex-1 max-w-[420px] mx-auto rounded-full bg-white/10 border border-mint/20 px-3.5 py-1 text-center font-mono text-[12px] text-mint/70 truncate">
          {url}
        </span>
        <span aria-hidden className="w-[46px]" />
      </div>
      <Image
        src={src}
        alt={alt}
        width={2880}
        height={1800}
        priority={priority}
        sizes={sizes}
        className="block w-full h-auto"
      />
    </div>
  );
}
