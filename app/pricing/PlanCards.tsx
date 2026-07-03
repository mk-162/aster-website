"use client";

/* PlanCards — the three experimental plans (Group / Event Organiser /
 * Enterprise). Numbers come exclusively from lib/pricing.ts (dummy, under
 * review) — nothing here wires to checkout yet.
 *
 * Conversion patterns in play: prominent size selector (the price lever),
 * SAVE 25% annual anchoring, per-unit price framing (per member / per event),
 * check-marked feature lists, risk-reversal microcopy (try free, cancel
 * anytime), a featured middle card, and Enterprise as the price anchor. */

import { useState } from "react";
import Button from "@/components/Button";
import {
  GROUP_STEPS,
  ORGANISER_STEPS,
  ENTERPRISE_FEATURES,
  ANNUAL_DISCOUNT_PCT,
  type PlanStep,
} from "@/lib/pricing";
import { appLinks } from "@/lib/links";

/* The size selector IS the pricing lever — make it look like a control, not
 * an afterthought: full-width, chunky 2px dark border, custom chevron,
 * contained by the card (min-w-0 everywhere so nothing overflows). */
function StepSelect({
  steps,
  value,
  onChange,
  label,
}: {
  steps: PlanStep[];
  value: number;
  onChange: (i: number) => void;
  label: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border-2 border-dark bg-lime-bg p-3 mb-1">
      <label className="block min-w-0">
        <span className="font-condensed uppercase tracking-[0.06em] text-[12px] font-bold text-dark block mb-1.5">
          {label} — pick your size
        </span>
        <span className="relative block min-w-0">
          <select
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full min-w-0 appearance-none rounded-lg border-2 border-dark bg-white pl-3.5 pr-10 py-3 text-[16px] font-semibold text-dark shadow-pop-sm focus:border-lime-deep outline-none cursor-pointer"
          >
            {steps.map((s, i) => (
              <option key={s.label} value={i}>
                {s.label}
              </option>
            ))}
          </select>
          {/* chevron */}
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
          >
            <path d="M3 6l5 5 5-5" fill="none" stroke="#181E15" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </span>
      </label>
    </div>
  );
}

/* Annual pricing is deliberately shown as its MONTHLY equivalent ("billed
 * annually") — the full yearly figure only ever appears at checkout, so the
 * bigger number never scares anyone off this page (founder rule). */
function fmtGbp(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

function Price({ step, annual }: { step: PlanStep; annual: boolean }) {
  const monthly = annual ? step.yearGbp / 12 : step.monthGbp;
  return (
    <div className="my-5">
      <p className="m-0">
        <span className="font-condensed font-bold text-[52px] leading-none text-dark">
          £{fmtGbp(monthly)}
        </span>
        <span className="text-dark/60 text-lg font-medium">/month</span>
        {annual && (
          <span className="ml-2 align-middle inline-block bg-lime border-2 border-dark rounded-full font-condensed uppercase tracking-[0.05em] text-[11px] font-bold px-2.5 py-0.5 text-dark">
            Save {ANNUAL_DISCOUNT_PCT}%
          </span>
        )}
      </p>
      <p className="text-sm text-dark/60 font-medium mt-1.5 m-0">
        {annual ? "billed annually" : "billed monthly"}
        {step.unit ? ` · ${step.unit}` : ""}
      </p>
    </div>
  );
}

function Check({ dark = false }: { dark?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className="w-4 h-4 flex-shrink-0 mt-[3px]">
      <circle cx="8" cy="8" r="7" fill={dark ? "#C7F542" : "#EFFBC4"} stroke="#181E15" strokeWidth="1.5" />
      <path d="M4.5 8.2l2.3 2.3 4.5-4.7" fill="none" stroke="#181E15" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FeatureList({ items, dark = false }: { items: readonly string[]; dark?: boolean }) {
  return (
    <ul className="list-none p-0 m-0 mb-6 space-y-2.5">
      {items.map((f) => (
        <li key={f} className={`flex items-start gap-2.5 text-[14px] leading-snug ${dark ? "text-mint/80" : "text-dark/80"}`}>
          <Check dark={dark} />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  );
}

const cardClass =
  "min-w-0 bg-white border-2 border-dark rounded-2xl shadow-pop-2 p-6 sm:p-7 flex flex-col";

export default function PlanCards() {
  // Default MONTHLY (founder rule): the annual toggle then reads as the win.
  const [annual, setAnnual] = useState(false);
  const [groupIdx, setGroupIdx] = useState(1);
  const [orgIdx, setOrgIdx] = useState(0);

  return (
    <div>
      {/* Monthly / annual toggle — the discount is the headline */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center rounded-full border-2 border-dark bg-white p-1">
          {(["Monthly", "Annual"] as const).map((t) => {
            const active = (t === "Annual") === annual;
            return (
              <button
                key={t}
                onClick={() => setAnnual(t === "Annual")}
                className={`font-condensed uppercase tracking-[0.05em] text-[13px] font-bold px-5 py-2 rounded-full transition-colors ${
                  active ? "bg-dark text-mint" : "text-dark hover:bg-stone"
                }`}
                aria-pressed={active}
              >
                {t}
                {t === "Annual" && (
                  <span className={`ml-1.5 ${active ? "text-lime" : "text-lime-deep"}`}>
                    −{ANNUAL_DISCOUNT_PCT}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {/* ---- Group ---- */}
        <div className={cardClass}>
          <p className="font-condensed uppercase tracking-[0.04em] font-bold text-2xl text-dark mb-1">
            Group.
          </p>
          <p className="text-[15px] text-dark/70 leading-normal mb-5">
            For clubs and riding or running groups. Routes distributed, every
            outing on one map, members-only sharing.
          </p>
          <StepSelect steps={GROUP_STEPS} value={groupIdx} onChange={setGroupIdx} label="Club size" />
          <Price step={GROUP_STEPS[groupIdx]} annual={annual} />
          <FeatureList
            items={[
              "Club route library, published to every phone",
              "Members-only live map for every ride",
              "RSVP, ride wrap-ups, club feed",
              "Groups of up to 10 stay free, forever",
            ]}
          />
          <div className="mt-auto">
            <Button href={appLinks.signup} variant="secondary" className="w-full justify-center">
              Get your club on Aster
            </Button>
            <p className="text-center text-[12px] text-dark/50 mt-2.5 m-0">
              Start free · upgrade when the club&apos;s ready · cancel anytime
            </p>
          </div>
        </div>

        {/* ---- Event Organiser (featured) ---- */}
        <div className={`${cardClass} !border-[3px] relative`}>
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-lime border-2 border-dark rounded-full font-condensed uppercase tracking-[0.06em] text-[12px] font-bold px-4 py-1 text-dark whitespace-nowrap">
            Most popular
          </span>
          <p className="font-condensed uppercase tracking-[0.04em] font-bold text-2xl text-dark mb-1">
            Event organiser.
          </p>
          <p className="text-[15px] text-dark/70 leading-normal mb-5">
            A subscription, not a per-event bill. Run your calendar — live
            tracking, leaderboards, and sponsor slots on every event.
          </p>
          <StepSelect steps={ORGANISER_STEPS} value={orgIdx} onChange={setOrgIdx} label="Events per month" />
          <Price step={ORGANISER_STEPS[orgIdx]} annual={annual} />
          {/* Sponsor-ROI framing, live against the selected size. */}
          <p className="border-2 border-dark rounded-xl bg-gold/40 px-3 py-2 text-[13px] font-medium text-dark mb-5 m-0">
            One £500 sponsor-slot sale covers ≈{" "}
            {Math.max(1, Math.floor(500 / (annual ? ORGANISER_STEPS[orgIdx].yearGbp / 12 : ORGANISER_STEPS[orgIdx].monthGbp)))}{" "}
            months of this plan.
          </p>
          <FeatureList
            items={[
              "Create events free — pay when you go live",
              "Live map, leaderboard, finish detection",
              "Sponsor slots you sell — one slot covers Aster",
              "Unlimited watchers, no login to follow",
              "Entrants never pay Aster a penny",
            ]}
          />
          <div className="mt-auto">
            <Button href={appLinks.organiserDemo} variant="primary" className="w-full justify-center">
              Start organising
            </Button>
            <p className="text-center text-[12px] text-dark/50 mt-2.5 m-0">
              Build your event free — no card until you go live
            </p>
          </div>
        </div>

        {/* ---- Enterprise ---- */}
        <div className={`${cardClass} !bg-dark`}>
          <p className="font-condensed uppercase tracking-[0.04em] font-bold text-2xl text-mint mb-1">
            Enterprise.
          </p>
          <p className="text-[15px] text-mint/70 leading-normal mb-5">
            For marquee events and series that want the full production.
          </p>
          <p className="my-5">
            <span className="font-condensed font-bold text-[52px] leading-none text-lime">POA</span>
            <span className="block text-sm text-mint/60 font-medium mt-1.5">
              Priced on application.
            </span>
          </p>
          <FeatureList items={ENTERPRISE_FEATURES} dark />
          <div className="mt-auto">
            <Button href={appLinks.organiserDemo} variant="primary" className="w-full justify-center">
              Talk to us
            </Button>
            <p className="text-center text-[12px] text-mint/50 mt-2.5 m-0">
              A human replies within one working day
            </p>
          </div>
        </div>
      </div>

      {/* The old way vs Aster — honest cost anchoring (brand-doc figures). */}
      <div className="mt-10 border-2 border-dark rounded-2xl bg-white shadow-pop-1 overflow-hidden">
        <div className="grid sm:grid-cols-2">
          <div className="p-5 border-b-2 sm:border-b-0 sm:border-r-2 border-dark/15">
            <p className="font-condensed uppercase tracking-[0.05em] text-[12px] font-bold text-dark/50 mb-1.5">
              The old way
            </p>
            <p className="text-[15px] text-dark/70 leading-normal m-0">
              GPS tracker rental at £20–£40 per athlete, chip timing at
              £500–£2,000 per event — plus the hardware van, the charging
              table, and chasing units back at the finish.
            </p>
          </div>
          <div className="p-5 bg-lime-bg">
            <p className="font-condensed uppercase tracking-[0.05em] text-[12px] font-bold text-lime-deep mb-1.5">
              With Aster
            </p>
            <p className="text-[15px] text-dark leading-normal m-0 font-medium">
              One subscription, everything included — from about{" "}
              {ORGANISER_STEPS[ORGANISER_STEPS.length - 1].unit?.replace("≈ ", "") ?? "£20 per event"}{" "}
              at scale. The tracker is the phone your athletes already carry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
