"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "./Button";
import Logo from "./Logo";
import { appLinks } from "@/lib/links";

const navLinks = [
  { label: "For athletes", href: "/for-athletes" },
  { label: "For watchers", href: "/for-watchers" },
  { label: "For clubs", href: "/clubs" },
  { label: "For organisers", href: "/for-organisers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Find events", href: "/discover" },
  { label: "Blog", href: "/blog" },
];

/** Sticky top nav — dark bar, mint condensed links, 2px dark bottom border.
 * Mobile: hamburger toggles a full-screen dark sheet. */
export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0E110C] text-mint border-b-2 border-dark">
      <div className="container-site flex items-center justify-between gap-6 py-3.5">
        <Logo tone="onDark" size={26} />

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-condensed uppercase tracking-[0.06em] font-semibold text-sm text-mint hover:text-lime py-1.5"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={appLinks.login}
            className="font-condensed uppercase tracking-[0.06em] font-semibold text-sm text-mint hover:text-lime py-1.5"
          >
            Log in
          </a>
          <Button href={appLinks.login} variant="primary" size="sm">
            Go to app
          </Button>
          <a
            href="https://help.astertrack.app"
            aria-label="Help centre"
            title="Help centre"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-mint/40 text-mint hover:text-lime hover:border-lime font-condensed font-bold text-sm leading-none"
          >
            ?
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden inline-flex flex-col justify-center gap-[5px] w-11 h-11 items-center border-2 border-mint/40 rounded-xl"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block w-5 h-[2px] bg-mint transition-transform ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-[2px] bg-mint ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[2px] bg-mint transition-transform ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile full-screen sheet */}
      {open && (
        <nav
          className="lg:hidden fixed inset-0 top-[62px] z-40 bg-[#0E110C] flex flex-col gap-2 px-6 py-8"
          aria-label="Primary mobile"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-condensed uppercase tracking-[0.04em] font-bold text-3xl text-mint hover:text-lime py-3 border-b-2 border-mint/15"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={appLinks.login}
            onClick={() => setOpen(false)}
            className="font-condensed uppercase tracking-[0.04em] font-bold text-3xl text-mint hover:text-lime py-3 border-b-2 border-mint/15"
          >
            Log in
          </a>
          <div className="pt-6 flex items-center gap-4">
            <Button href={appLinks.login} variant="primary" size="lg">
              Go to app
            </Button>
            <a
              href="https://help.astertrack.app"
              aria-label="Help centre"
              title="Help centre"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-mint/40 text-mint hover:text-lime hover:border-lime font-condensed font-bold text-xl leading-none"
            >
              ?
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
