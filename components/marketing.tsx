import type { ReactNode } from "react";
import Link from "next/link";
import AsterLogo from "./AsterLogo";

// The app lives at the apex; every action CTA points there.
export const APP_URL = "https://astertrack.app";

type SectionBg = "dark" | "stone" | "white" | "dark-cta";
const BG: Record<SectionBg, string> = {
  dark: "bg-dark text-mint",
  stone: "bg-stone",
  white: "bg-white",
  "dark-cta": "bg-dark text-mint text-center",
};

export function Section({
  bg,
  border,
  id,
  className = "",
  children,
}: {
  bg: SectionBg;
  border?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${BG[bg]} ${border ? "border-y-2 border-dark" : ""} ${className}`}>
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12 py-10 lg:py-16">{children}</div>
    </section>
  );
}

export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[880px] mx-auto ${className}`}>{children}</div>;
}

export function Grid({ cols = 2, className = "", children }: { cols?: 2 | 3; className?: string; children: ReactNode }) {
  const c = cols === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";
  return <div className={`grid gap-6 lg:gap-8 ${c} ${className}`}>{children}</div>;
}

export function HeroActions({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-4 sm:justify-center sm:items-center mb-8 [&_a]:sm:max-w-[300px]">
      {children}
    </div>
  );
}

export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  // Coloured cards pass their own bg-; default is white. Always border-2 + pop-2.
  const hasBg = /(^|\s)bg-/.test(className);
  return (
    <div className={`${hasBg ? "" : "bg-white"} border-2 border-dark rounded-2xl shadow-pop-2 p-5 ${className}`}>
      {children}
    </div>
  );
}

const BTN_BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all h-12 px-[18px] text-small focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lime-deep";

export function CtaPrimary({ href, children }: { href: string; children: ReactNode }) {
  const cls = `${BTN_BASE} bg-lime text-dark border-2 border-dark shadow-pop-lime hover:bg-lime-mid active:translate-x-[4px] active:translate-y-[4px] active:shadow-none`;
  return isExternal(href) ? (
    <a href={href} className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

export function CtaSecondary({ href, children }: { href: string; children: ReactNode }) {
  const cls = `${BTN_BASE} bg-mint text-dark border-2 border-dark shadow-pop-1 hover:bg-mint-deep active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`;
  return isExternal(href) ? (
    <a href={href} className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

function isExternal(href: string) {
  return href.startsWith("http");
}

// Photo strip — full-bleed brand photography between sections.
export function PhotoStrip({ images }: { images: { src: string; alt: string }[] }) {
  if (images.length === 0) return null;
  return (
    <section className="bg-dark border-y-2 border-dark" aria-label="Cycling photography">
      <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4 md:gap-0">
        {images.map((img, i) => (
          <div key={i} className="flex-shrink-0 w-[85vw] md:w-auto snap-center aspect-[4/5] bg-stone overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

// Shared marketing header — logo + sign-in (→ app).
export function SiteHeader() {
  return (
    <header className="bg-dark text-mint border-b-2 border-dark">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <AsterLogo className="w-12 h-12 text-lime flex-shrink-0" />
            <div className="min-w-0">
              <h2 className="font-condensed uppercase tracking-wide text-title leading-none text-white">Aster</h2>
              <p className="text-tiny text-mint/70 leading-tight mt-0.5">Live race tracking</p>
            </div>
          </Link>
          <a
            href={`${APP_URL}/login`}
            className="px-4 py-2 bg-lime text-dark text-small font-semibold rounded-xl border-2 border-lime-deep hover:bg-lime-mid active:translate-y-[1px] transition-all flex-shrink-0"
          >
            Sign in
          </a>
        </div>
      </div>
    </header>
  );
}

// Native www pages built so far. Everything else points at the app's existing
// marketing pages (astertrack.app/...) until it's ported to the www site.
const FOOTER_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "For clubs", href: "/for-clubs" },
  { label: "For teams", href: `${APP_URL}/for-teams` },
  { label: "For athletes", href: `${APP_URL}/for-athletes` },
  { label: "For organisers", href: `${APP_URL}/for-organisers` },
  { label: "Pricing", href: `${APP_URL}/pricing` },
  { label: "FAQ", href: `${APP_URL}/faq` },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  const cls = "text-mint/60 hover:text-lime transition-colors";
  return href.startsWith("http") ? (
    <a href={href} className={cls}>{label}</a>
  ) : (
    <Link href={href} className={cls}>{label}</Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-dark text-mint/50 text-tiny text-center border-t border-mint/10">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12 py-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <AsterLogo className="w-4 h-4 text-mint/40" />
          <span className="font-condensed uppercase tracking-wide">Aster</span>
        </div>
        <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
          {FOOTER_LINKS.map((l, i) => (
            <span key={l.href} className="flex items-center gap-3">
              {i > 0 && <span className="text-mint/20">·</span>}
              <FooterLink href={l.href} label={l.label} />
            </span>
          ))}
          <span className="text-mint/20">·</span>
          <a href={`${APP_URL}/login`} className="text-mint/60 hover:text-lime transition-colors">Sign in</a>
        </div>
        <p>The live experience for cycling.</p>
      </div>
    </footer>
  );
}

// Capability block used in the feature grids.
export function Capability({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div>
      <p className="font-condensed uppercase tracking-wide text-tiny text-lime-deep mb-1">{kicker}</p>
      <h3 className="text-title text-dark mb-2">{title}</h3>
      <p className="text-body text-dark/75">{body}</p>
    </div>
  );
}
