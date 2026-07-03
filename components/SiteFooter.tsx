import Link from "next/link";
import Logo from "./Logo";
import FooterMap from "./FooterMap";
import { appLinks } from "@/lib/links";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Open the app", href: appLinks.app },
      { label: "Start tracking — free", href: appLinks.signup },
      { label: "Discover events", href: "/discover" },
    ],
  },
  {
    title: "Audiences",
    links: [
      { label: "For athletes", href: "/for-athletes" },
      { label: "For watchers", href: "/for-watchers" },
      { label: "For clubs", href: "/clubs" },
      { label: "For organisers", href: "/for-organisers" },
      { label: "For brand partners", href: "/for-brand-partners" },
      { label: "Cycling", href: "/cycling" },
      { label: "Running", href: "/running" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides", href: "/resources" },
      { label: "About", href: "/about" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms & conditions", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

function FooterLink({ label, href }: { label: string; href: string }) {
  const cls = "text-sm text-mint/60 hover:text-lime";
  return href.startsWith("http") ? (
    <a href={href} className={cls}>
      {label}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-dark text-mint/60 border-t-2 border-dark mt-auto">
      <FooterMap />
      <div className="relative container-site py-11 flex flex-wrap gap-10 justify-between">
        <div className="max-w-[280px]">
          <Logo tone="onDark" size={24} />
          <p className="mt-4 text-sm leading-relaxed">
            The live experience for endurance sport. Track from the phone you
            carry, share one link, and bring everyone along.
          </p>
        </div>
        <div className="flex gap-12 flex-wrap">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-2.5">
              <p className="font-condensed uppercase tracking-[0.06em] font-semibold text-xs text-mint mb-1">
                {col.title}
              </p>
              {col.links.map((l) => (
                <FooterLink key={l.label} {...l} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="relative border-t border-mint/10">
        <div className="container-site py-4 flex flex-wrap gap-3 items-center justify-between">
          <p className="font-condensed uppercase tracking-[0.06em] text-xs text-mint/45">
            © 2026 Manual Focus Ltd
          </p>
          <p className="text-xs text-mint/45">Photography via Unsplash</p>
        </div>
      </div>
    </footer>
  );
}
