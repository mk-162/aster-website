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

/** Yearly saving of Plus annual vs paying monthly (rounded to whole £). */
const PLUS_SAVE_YR = Math.round(PLUS.monthGbp * 12 - PLUS.annualTotalGbp);

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
        {/* Annual first — lead with the best price (founder). */}
        {(["Annual", "Monthly"] as const).map((t) => {
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
    <div className="max-w-[860px] mx-auto">
      <div className="grid gap-6 md:grid-cols-2 items-start">
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
          billed annually (£{gbp(PLUS.annualTotalGbp)}/yr) —{" "}
          <span className="text-lime-deep font-semibold">save £{gbp(PLUS_SAVE_YR)}/yr</span>{" "}
          vs £{gbp(PLUS.monthGbp)} monthly
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

      <ClubBillingPanel />
    </div>
  );
}

/* ---- Organisers view: 3 capped tiers + Enterprise --------------------- */

function OrganisersView() {
  const [annual, setAnnual] = useState(true);
  return (
    <div>
      {/* Benefit-led headline — lead with the value, not the free demo. */}
      <div className="text-center max-w-[640px] mx-auto mb-9">
        <p className="font-condensed uppercase tracking-[0.08em] font-semibold text-[13px] text-lime-deep mb-2.5">
          Aster Organiser
        </p>
        <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.98] text-[clamp(26px,3.6vw,40px)] text-dark m-0">
          Make your event <span className="text-lime-deep">more visible</span>,{" "}
          <span className="text-lime-deep">more fun</span>, and{" "}
          <span className="text-lime-deep">safer</span>.
        </h2>
        <p className="text-[16px] text-dark/70 leading-normal mt-4 mb-0 max-w-[54ch] mx-auto">
          Live GPS tracking, one page your whole community follows, and full
          control of your event — the same on every plan. Just pick the size
          that fits your field.
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
                {annual ? (
                  <>
                    billed annually ·{" "}
                    <span className="text-lime-deep font-semibold">save £{gbp(save)}/mo</span>{" "}
                    vs monthly
                  </>
                ) : (
                  <>£{gbp(tier.annualMonthGbp)}/mo on annual — save £{gbp(save)}/mo</>
                )}
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
            We offer a range of additional services to larger events to make
            sure everything runs smoothly.
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

      {/* Demo — deliberately at the bottom, not a leading position. It's a
          preview of the real thing, not a free tier to run an event on. */}
      <div className="mt-6 border-2 border-dark rounded-2xl bg-white shadow-pop-1 px-5 py-4 sm:px-6 sm:py-5 text-center">
        <p className="font-condensed uppercase tracking-[0.06em] text-[12px] font-bold text-dark/45 mb-1.5">
          Want to see it first?
        </p>
        <p className="text-[15px] text-dark/75 leading-normal m-0 max-w-[70ch] mx-auto">
          Set up any event and take up to {ORGANISER_FREE_CAP} registrations by
          share-link — a free live demo of the real thing, no card needed. Pick
          a size when you’re ready to open it to your whole field.
        </p>
      </div>
    </div>
  );
}

/* ---- Club billing: self-serve, on-page, deliberately subordinate --------
 * Sits UNDER the two rider cards (it's a club-owner action, not a third
 * consumer option) so the Free-vs-Plus choice stays the clean headline. No
 * "talk to us" — the per-seat price is shown up front and setup is self-serve. */
function ClubBillingPanel() {
  return (
    <div className="mt-6 border-2 border-dark rounded-2xl bg-white shadow-pop-1 overflow-hidden">
      <div className="grid sm:grid-cols-[1fr_auto] items-center gap-5 p-5 sm:p-6">
        <div className="min-w-0">
          <p className="font-condensed uppercase tracking-[0.06em] text-[11px] font-bold text-dark/45 mb-1.5">
            For club owners · optional
          </p>
          <p className="font-condensed uppercase tracking-[0.03em] font-bold text-lg text-dark mb-1.5">
            Rather cover your riders? One bill for the whole club.
          </p>
          <p className="text-[14px] text-dark/70 leading-normal m-0 max-w-[60ch]">
            Buy Plus seats and your members join free — nobody hits the £
            {gbp(PLUS.annualMonthGbp)} when your club grows past{" "}
            {PLUS.freeClubMembers}. Riders who already have their own Plus don’t
            use a seat, so you only pay for who needs it.
          </p>
        </div>
        <div className="min-w-0 sm:pl-5 sm:border-l-2 border-dark/10 sm:text-right">
          <p className="m-0">
            <span className="text-[13px] text-dark/55 font-medium align-middle">from </span>
            <span className="font-condensed font-bold text-[30px] leading-none text-dark align-middle">
              £{gbp(PLUS.monthGbp)}
            </span>
            <span className="text-dark/55 text-sm font-medium align-middle"> /seat/mo</span>
          </p>
          <p className="text-[12px] text-dark/50 font-medium mt-1 mb-3 m-0">
            {PLUS.freeClubMembers} seats free · volume discounts as you grow
          </p>
          <Button
            href={appLinks.signup}
            variant="secondary"
            size="sm"
            className="w-full sm:w-auto justify-center whitespace-nowrap"
          >
            Set up club billing
          </Button>
        </div>
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
    </div>
  );
}
