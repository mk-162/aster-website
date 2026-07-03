/* Canonical pricing — the ONLY place prices live on this site.
 *
 * Source: docs/2026-07-01-business-model-final.md (main repo) for event bands,
 * founder decision 2026-07-02 for the size-banded club tiers (supersedes the
 * doc's flat £15/mo club price). Annual = two months free (monthly × 10).
 *
 * NOTE: whether these render publicly or sit behind "talk to us" is a pending
 * founder decision — pages must import from here either way, never inline
 * numbers.
 */

/** Organiser event fees, banded by field size. One-off, per event. */
export const EVENT_BANDS = [
  { band: "community", label: "Community", maxField: 50, priceGbp: 0 },
  { band: "small", label: "Small", maxField: 100, priceGbp: 149 },
  { band: "standard", label: "Standard", maxField: 500, priceGbp: 349 },
  { band: "large", label: "Large", maxField: 1500, priceGbp: 749 },
  { band: "xl", label: "XL", maxField: null, priceGbp: 1499, custom: true },
] as const;

/** Optional Pro toggle on any paid event band. */
export const EVENT_PRO_TOGGLE_GBP = 100;

/** Club subscription, banded by ACTIVE MEMBER count (founder, 2026-07-02). */
export const CLUB_BANDS = [
  { band: "mates", label: "Mates", maxMembers: 10, yearGbp: 0, monthGbp: 0, perMember: null },
  { band: "starter", label: "Starter", maxMembers: 25, yearGbp: 100, monthGbp: 10, perMember: "~£4" },
  { band: "club", label: "Club", maxMembers: 75, yearGbp: 150, monthGbp: 15, perMember: "~£2" },
  { band: "large", label: "Large", maxMembers: 200, yearGbp: 300, monthGbp: 30, perMember: "~£1.50" },
  { band: "xl", label: "XL", maxMembers: 500, yearGbp: 600, monthGbp: 60, perMember: "~£1.20" },
  { band: "federation", label: "Federation", maxMembers: null, yearGbp: 1000, monthGbp: null, perMember: "~£1", custom: true },
] as const;

/** Consumers (athletes + watchers): free forever. No individual paid tier. */
export const CONSUMER_PRICE = "free" as const;

/* ---------------------------------------------------------------------------
 * EXPERIMENTAL site pricing (founder, 2026-07-02 v3) — the /pricing page model.
 * Three plans: Group / Event Organiser / Enterprise. Organiser is a
 * SUBSCRIPTION (includes N events/month, scalable via dropdown); Group scales
 * by member size; Enterprise is POA (white glove, dedicated server, extended
 * marketing + sponsorship packages).
 *
 * ALL NUMBERS BELOW ARE DUMMY placeholders for founder review. The app's
 * billing machinery still runs the banded model above — do NOT wire these to
 * checkout until the model is confirmed.
 * ------------------------------------------------------------------------- */

export interface PlanStep {
  label: string;
  monthGbp: number;
  yearGbp: number;
  /** Per-unit price framing shown under the headline price. */
  unit?: string;
}

/** Annual = 25% off (yearGbp = monthGbp × 9). */
export const ANNUAL_DISCOUNT_PCT = 25;

/** Group (clubs) — scaled by active member count. DUMMY numbers.
 *  Free ≤10 stays outside the dropdown. `unit` powers per-member framing. */
export const GROUP_STEPS: PlanStep[] = [
  { label: "Up to 25 members", monthGbp: 10, yearGbp: 90, unit: "≈ £3.60 per member per year" },
  { label: "Up to 75 members", monthGbp: 15, yearGbp: 135, unit: "≈ £1.80 per member per year" },
  { label: "Up to 200 members", monthGbp: 30, yearGbp: 270, unit: "≈ £1.35 per member per year" },
  { label: "Up to 500 members", monthGbp: 60, yearGbp: 540, unit: "≈ £1.10 per member per year" },
];

/** Event Organiser — subscription including N events per month. DUMMY numbers. */
export const ORGANISER_STEPS: PlanStep[] = [
  { label: "3 events / month", monthGbp: 99, yearGbp: 891, unit: "≈ £33 per event" },
  { label: "5 events / month", monthGbp: 149, yearGbp: 1341, unit: "≈ £30 per event" },
  { label: "10 events / month", monthGbp: 249, yearGbp: 2241, unit: "≈ £25 per event" },
  { label: "20 events / month", monthGbp: 399, yearGbp: 3591, unit: "≈ £20 per event" },
];

/** Enterprise — POA. */
export const ENTERPRISE_FEATURES = [
  "White-glove service — we run tracking at your events",
  "Dedicated server and priority infrastructure",
  "Extended marketing package",
  "Sponsorship packages and inventory support",
  "Custom capacity, custom terms",
] as const;
