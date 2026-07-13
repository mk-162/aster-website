"use client";

/* PlanCards — the monetization-pivot pricing (founder, 2026-07-13).
 *
 * Two tabs, because there are two payers with two different stories:
 *   • "Ride & join clubs"  → Aster Free vs Aster Plus (opens here by default;
 *      the £1.99 splash carries the low-price message — no hero shouts it).
 *   • "Organise events"    → 3 registration-capped tiers + Enterprise, all
 *      feature-identical, so we show the features ONCE and let the columns
 *      differ only by cap.
 *
 * Club-pays is deliberately NOT a table — it's a slim strip at the very bottom
 * (founder: keep the main page simple). Numbers come only from lib/pricing.ts
 * and nothing here wires to checkout yet. */

import { useState } from "react";
import Button from "@/components/Button";
import {
  PLUS,
  FREE_FEATURES,
  PLUS_FEATURES,
  ORGANISER_TIERS,
  ORGANISER_FEATURES,
  ORGANISER_FREE_CAP,
  ENTERPRISE_FEATURES,
} from "@/lib/pricing";
import { appLinks } from "@/lib/links";

/* ---- helpers ---------------------------------------------------------- */

function gbp(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

function Check({ dark = false }: { dark?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className="w-4 h-4 flex-shrink-0 mt-[3px]">
      <circle cx="8" cy="8" r="7" fill={dark ? "#C7F542" : "#EFFBC4"} stroke="#181E15" strokeWidth="1.5" />
      <path d="M4.5 8.2l2.3 2.3 4.5-4.7" fill="none" stroke="#181E15" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FeatureList({
  items,
  dark = false,
  className = "",
}: {
  items: readonly string[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <ul className={`list-none p-0 m-0 space-y-2.5 ${className}`}>
      {items.map((f) => (
        <li
          key={f}
          className={`flex items-start gap-2.5 text-[14px] leading-snug ${dark ? "text-mint/80" : "text-dark/80"}`}
        >
          <Check dark={dark} />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  );
}

const cardClass =
  "min-w-0 bg-white border-2 border-dark rounded-2xl shadow-pop-2 p-6 sm:p-7 flex flex-col";

/* ---- £1.99 price splash ---------------------------------------------- */
/* A retail-style starburst so the low number pops without a hero headline.
 * Path is deterministic (fixed angles — no random/date), built once. */
const BURST_D = (() => {
  const spikes = 15;
  const cx = 60;
  const cy = 60;
  const outer = 58;
  const inner = 47;
  const step = Math.PI / spikes;
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = i * step - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
})();

function PriceSplash() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-6 -right-3 w-24 h-24 sm:w-28 sm:h-28 rotate-[-9deg] drop-shadow-[3px_3px_0_rgba(24,30,21,0.9)] z-20"
    >
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <path d={BURST_D} fill="#C7F542" stroke="#181E15" strokeWidth="3" strokeLinejoin="round" />
        <text
          x="60"
          y="46"
          textAnchor="middle"
          className="font-condensed"
          style={{ fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", fill: "#181E15" }}
        >
          JUST
        </text>
        <text
          x="60"
          y="76"
          textAnchor="middle"
          className="font-condensed"
          style={{ fontWeight: 700, fontSize: 34, fill: "#181E15" }}
        >
          £{gbp(PLUS.annualMonthGbp)}
        </text>
        <text
          x="60"
          y="93"
          textAnchor="middle"
          className="font-condensed"
          style={{ fontWeight: 600, fontSize: 12, letterSpacing: "0.04em", fill: "#181E15" }}
        >
          a month
        </text>
      </svg>
    </div>
  );
}

/* ---- tab switcher ----------------------------------------------------- */

type Tab = "riders" | "organisers";

function TabSwitch({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "riders", label: "Ride & join clubs" },
    { id: "organisers", label: "Organise events" },
  ];
  return (
    <div className="flex justify-center mb-9">
      <div
        role="tablist"
        aria-label="Who are you?"
        className="inline-flex items-center gap-1 rounded-full border-2 border-dark bg-white p-1 shadow-pop-1"
      >
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => onChange(t.id)}
              className={`font-condensed uppercase tracking-[0.04em] text-[13px] sm:text-[15px] font-bold px-4 sm:px-7 py-2.5 rounded-full transition-colors ${
                active ? "bg-dark text-mint" : "text-dark hover:bg-stone"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---- billing (monthly / annual) toggle — organiser tab only ----------- */

function BillingToggle({ annual, onChange }: { annual: boolean; onChange: (a: boolean) => void }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex items-center rounded-full border-2 border-dark bg-white p-1">
        {(["Monthly", "Annual"] as const).map((t) => {
          const isAnnual = t === "Annual";
          const active = isAnnual === annual;
          return (
            <button
              key={t}
              onClick={() => onChange(isAnnual)}
              aria-pressed={active}
              className={`font-condensed uppercase tracking-[0.05em] text-[13px] font-bold px-5 py-2 rounded-full transition-colors ${
                active ? "bg-dark text-mint" : "text-dark hover:bg-stone"
              }`}
            >
              {t}
              {isAnnual && (
                <span className={`ml-1.5 ${active ? "text-lime" : "text-lime-deep"}`}>save ⅓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---- Riders view: Aster Free vs Aster Plus ---------------------------- */

function RidersView() {
  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-[860px] mx-auto items-start">
      {/* Aster Free */}
      <div className={cardClass}>
        <p className="font-condensed uppercase tracking-[0.04em] font-bold text-2xl text-dark mb-1">
          Aster Free.
        </p>
        <p className="text-[15px] text-dark/70 leading-normal mb-5">
          Everything you need to ride, watch, and get started. No account needed
          just to follow along.
        </p>
        <p className="my-4">
          <span className="font-condensed font-bold text-[52px] leading-none text-dark">£0</span>
          <span className="text-dark/60 text-lg font-medium"> /forever</span>
        </p>
        <FeatureList items={FREE_FEATURES} className="mb-6" />
        <div className="mt-auto">
          <Button href={appLinks.signup} variant="secondary" className="w-full justify-center">
            Get the app
          </Button>
          <p className="text-center text-[12px] text-dark/50 mt-2.5 m-0">
            Free forever · no card, ever
          </p>
        </div>
      </div>

      {/* Aster Plus (featured, splash) */}
      <div className={`${cardClass} !border-[3px] relative overflow-visible`}>
        <PriceSplash />
        <p className="font-condensed uppercase tracking-[0.04em] font-bold text-2xl text-dark mb-1">
          Aster Plus.
        </p>
        <p className="text-[15px] text-dark/70 leading-normal mb-5 max-w-[30ch]">
          Your membership to club life. One low fee, every club you ride
          with — join, leave, and join again without paying twice.
        </p>
        <p className="my-4">
          <span className="font-condensed font-bold text-[52px] leading-none text-dark">
            £{gbp(PLUS.annualMonthGbp)}
          </span>
          <span className="text-dark/60 text-lg font-medium"> /month</span>
        </p>
        <p className="text-sm text-dark/60 font-medium -mt-2 mb-5 m-0">
          billed annually (£{gbp(PLUS.annualTotalGbp)}/yr) · or £{gbp(PLUS.monthGbp)} monthly
        </p>
        <p className="font-condensed uppercase tracking-[0.05em] text-[12px] font-bold text-dark/50 mb-2.5">
          Everything in Free, plus
        </p>
        <FeatureList items={PLUS_FEATURES} className="mb-4" />
        <p className="border-2 border-dark rounded-xl bg-lime-bg px-3 py-2 text-[13px] font-medium text-dark mb-6 m-0">
          Some clubs cover this for their members — you may never pay it.
        </p>
        <div className="mt-auto">
          <Button href={appLinks.signup} variant="primary" className="w-full justify-center">
            Get Aster Plus
          </Button>
          <p className="text-center text-[12px] text-dark/50 mt-2.5 m-0">
            Cheaper than most club fees — and it works across all of them
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---- Organisers view: 3 capped tiers + Enterprise --------------------- */

function OrganisersView() {
  const [annual, setAnnual] = useState(true);
  return (
    <div>
      {/* Free preview strip */}
      <div className="max-w-[760px] mx-auto mb-8 border-2 border-dark rounded-2xl bg-white shadow-pop-1 px-5 py-4 text-center">
        <p className="text-[15px] text-dark leading-normal m-0">
          <span className="font-condensed uppercase tracking-[0.04em] font-bold text-dark">
            Try it free —{" "}
          </span>
          up to {ORGANISER_FREE_CAP} registrations on any event, shared by link.
          Ready to open it up? Pick the size that fits your field.
        </p>
      </div>

      <BillingToggle annual={annual} onChange={setAnnual} />

      {/* Capacity is the only lever — every tier is otherwise identical. */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
        {ORGANISER_TIERS.map((tier, i) => {
          const featured = i === 1; // 500 — gentle anchor
          const price = annual ? tier.annualMonthGbp : tier.monthGbp;
          const save = tier.monthGbp - tier.annualMonthGbp;
          return (
            <div
              key={tier.cap}
              className={`${cardClass} !p-6 ${featured ? "!border-[3px] relative" : ""}`}
            >
              {featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-lime border-2 border-dark rounded-full font-condensed uppercase tracking-[0.06em] text-[11px] font-bold px-3.5 py-1 text-dark whitespace-nowrap">
                  Most popular
                </span>
              )}
              <p className="font-condensed font-bold text-[40px] leading-none text-dark">
                {tier.label}
              </p>
              <p className="font-condensed uppercase tracking-[0.05em] text-[12px] font-bold text-dark/50 mt-1 mb-4">
                registrations / event
              </p>
              <p className="m-0">
                <span className="font-condensed font-bold text-[38px] leading-none text-dark">
                  £{gbp(price)}
                </span>
                <span className="text-dark/60 text-base font-medium"> /mo</span>
              </p>
              <p className="text-[13px] text-dark/55 font-medium mt-1.5 mb-5 m-0">
                {annual ? `billed annually · save £${gbp(save)}/mo` : "billed monthly"}
              </p>
              <div className="mt-auto">
                <Button
                  href={appLinks.organiserDemo}
                  variant={featured ? "primary" : "secondary"}
                  size="sm"
                  className="w-full justify-center"
                >
                  Start organising
                </Button>
              </div>
            </div>
          );
        })}

        {/* Enterprise */}
        <div className={`${cardClass} !p-6 !bg-dark`}>
          <p className="font-condensed font-bold text-[40px] leading-none text-mint">1,000+</p>
          <p className="font-condensed uppercase tracking-[0.05em] text-[12px] font-bold text-mint/50 mt-1 mb-4">
            enterprise
          </p>
          <p className="m-0">
            <span className="font-condensed font-bold text-[34px] leading-none text-lime">Let’s talk</span>
          </p>
          <p className="text-[13px] text-mint/55 font-medium mt-1.5 mb-5 m-0">
            Sales-negotiated, built around your event.
          </p>
          <div className="mt-auto">
            <Button href={appLinks.organiserDemo} variant="primary" size="sm" className="w-full justify-center">
              Talk to us
            </Button>
          </div>
        </div>
      </div>

      {/* Shared feature list — same on every paid tier. */}
      <div className="mt-8 border-2 border-dark rounded-2xl bg-lime-bg shadow-pop-1 p-6 sm:p-7">
        <p className="font-condensed uppercase tracking-[0.05em] text-[13px] font-bold text-lime-deep mb-4">
          Every paid tier includes — no feature gates, ever
        </p>
        <FeatureList items={ORGANISER_FEATURES} className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 !space-y-0" />
        <div className="mt-5 pt-5 border-t-2 border-dark/10">
          <p className="font-condensed uppercase tracking-[0.05em] text-[13px] font-bold text-lime-deep mb-4">
            Enterprise adds
          </p>
          <FeatureList items={ENTERPRISE_FEATURES} className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 !space-y-0" />
        </div>
      </div>
    </div>
  );
}

/* ---- Club-pays strip (bottom, deliberately understated) --------------- */

function ClubPaysStrip() {
  return (
    <div className="mt-10 border-2 border-dark rounded-2xl bg-white shadow-pop-1 overflow-hidden">
      <div className="grid sm:grid-cols-[1fr_auto] items-center gap-4 p-5 sm:p-6">
        <div>
          <p className="font-condensed uppercase tracking-[0.04em] font-bold text-lg text-dark mb-1">
            Run a club? You can cover your riders.
          </p>
          <p className="text-[14px] text-dark/70 leading-normal m-0 max-w-[62ch]">
            Prefer your members to join free? Buy Plus seats for the club at
            member price and pick up the bill yourself. Riders who already have
            their own Plus don’t use a seat.
          </p>
        </div>
        <Button href={appLinks.organiserDemo} variant="secondary" size="sm" className="justify-center whitespace-nowrap">
          Talk to us about club billing
        </Button>
      </div>
    </div>
  );
}

/* ---- root ------------------------------------------------------------- */

export default function PlanCards() {
  const [tab, setTab] = useState<Tab>("riders");
  return (
    <div>
      <TabSwitch tab={tab} onChange={setTab} />
      {tab === "riders" ? <RidersView /> : <OrganisersView />}
      <ClubPaysStrip />
    </div>
  );
}
