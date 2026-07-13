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
 * SITE pricing — MONETIZATION PIVOT (founder, 2026-07-13). Supersedes the
 * Group/Organiser/Enterprise experiment above for the /pricing page.
 *
 * Two products, two payers:
 *   • Aster Plus — individual membership. Join any club as its 4th+ member;
 *     unlimited favourites. ONE membership, EVERY club (portable — a member
 *     with Plus uses no club seat). Paid by the joining member.
 *   • Aster Organiser — event-registration subscription. Free preview (3
 *     registrations, share-link only, not on discovery); paid tiers are
 *     feature-identical and differ ONLY by the registration cap per event.
 *
 * Everyone else is free forever: spectating, riding, creating events/clubs,
 * event discovery, and being one of a club's first 3 active members.
 *
 * Annual billing is ~a third off (not a flat %, and NOT uniform across tiers
 * — Tier 3 is 25% off, the rest ~33%), so we show both prices and compute the
 * per-tier saving rather than badge a single number. NOT wired to checkout.
 * ------------------------------------------------------------------------- */

/** Aster Plus — the individual membership (the ONLY consumer paid product). */
export const PLUS = {
  /** Headline price: annual billing, shown per month. */
  annualMonthGbp: 1.99,
  /** Rolling monthly billing. */
  monthGbp: 2.99,
  /** Full annual charge (1.99 × 12). */
  annualTotalGbp: 23.88,
  /** A club's first N members are free forever; the (N+1)th needs Plus. */
  freeClubMembers: 3,
} as const;

/** Aster Free — what every rider and watcher gets, forever. */
export const FREE_FEATURES = [
  "Follow & cheer any rider — no account needed to watch",
  "Track your own rides & runs",
  "Create your own events & clubs",
  "Get discovered on the map",
  "Be one of a club’s first 3 members — free forever",
] as const;

/** Aster Plus — everything in Free, plus these. */
export const PLUS_FEATURES = [
  "Join any club as a full member — 4th, 40th, doesn’t matter",
  "One membership covers every club you ride with",
  "Unlimited favourites",
] as const;

/** Event Organiser — registration-capped subscription. Features are identical
 *  on every tier; only `cap` changes. */
export interface OrganiserTier {
  /** Max registrations per event. */
  cap: number;
  /** Display label, e.g. "500". */
  label: string;
  /** Rolling monthly billing. */
  monthGbp: number;
  /** Annual billing, shown per month. */
  annualMonthGbp: number;
}

/** Free preview cap before a paid tier is needed. */
export const ORGANISER_FREE_CAP = 3;

export const ORGANISER_TIERS: OrganiserTier[] = [
  { cap: 100, label: "100", monthGbp: 75, annualMonthGbp: 50 },
  { cap: 500, label: "500", monthGbp: 150, annualMonthGbp: 100 },
  { cap: 1000, label: "1,000", monthGbp: 200, annualMonthGbp: 150 },
];

/** Included on EVERY organiser tier — the point is that they're all the same. */
export const ORGANISER_FEATURES = [
  "Your own event page & event community",
  "Full event management tools",
  "Live GPS tracking for every entrant",
  "Sponsorship control — your slots, your revenue",
  "Unlimited followers — no login to watch",
  "Entrants never pay Aster a penny",
] as const;

/** Enterprise — 1,000+, sales-negotiated. */
export const ENTERPRISE_FEATURES = [
  "Unlimited registrations — fields of 1,000+",
  "White-glove event support",
  "Dedicated infrastructure & priority uptime",
  "Sponsorship & marketing packages",
  "Custom terms, sales-negotiated",
] as const;
