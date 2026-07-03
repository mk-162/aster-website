import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Button from "@/components/Button";
import RouteMotif from "@/components/RouteMotif";

/* Public /changelog of shipped product changes, ported from the Aster
 * PWA marketing site at the identical URL.
 *
 * Three jobs: fresh-content signal for search, trust signal for
 * evaluators ("this thing ships"), and a searchable anchor for
 * long-tail "Aster <feature>" queries.
 *
 * Reverse-chronological. Newest at the top. New entries go above the
 * existing list; never edit the date on a shipped entry. Every entry's
 * date is the commit (or commit-cluster) date pulled from git history
 * of the app repo — no estimates. */

type Category = "Reliability" | "Feature" | "Performance" | "Safety" | "Marketing";

interface Entry {
  date: string; // ISO YYYY-MM-DD — feeds schema datePublished
  category: Category;
  title: string; // 1-line headline, sentence case
  body: string; // 1-3 sentence plain-language explanation
}

const ENTRIES: Entry[] = [
  {
    date: "2026-05-22",
    category: "Marketing",
    title:
      "Marketing surface area — pricing, about, FAQ, glossary, comparisons, press, resources.",
    body: "Built out the public marketing pages from a single /welcome to the full /pricing + /about + /faq + /glossary + /contact + /press + /changelog + /resources hub + 4 comparison pages (Trackleaders, RaceMap, Strava Beacon, Garmin LiveTrack) + 4 long-form articles. Per-page social-share images so every link looks distinct in social previews. WebP photography pipeline shaving megabytes off marketing pages.",
  },
  {
    date: "2026-05-22",
    category: "Reliability",
    title:
      "Spectator trail handles pause and teleport without drawing fake straight lines.",
    body: "Selected-rider trails on the watch page now split at time gaps so a paused or signal-dropped rider doesn't get a straight line connecting their before-and-after positions. Same gap-splitting logic in free-ride watcher (commit bee9ff2). Leaderboard re-anchor logic now runs in the canonical query so WebSocket pushes and HTTP fetches agree on distance for every rider.",
  },
  {
    date: "2026-05-22",
    category: "Safety",
    title:
      "Rule 5 — anonymous spectator access for public + unlisted events is part of the free-tier offer.",
    body: "Surfaced a regression where /tracking/history was gated behind auth, breaking the historical-trail seed for incognito spectators. Fixed in commit 875f941 — the full live experience (map + leaderboard + rider trail + route polyline) is now anon-accessible for public/unlisted events. Rule 5 in CLAUDE.md pins the policy so it can't drift back.",
  },
  {
    date: "2026-05-21",
    category: "Reliability",
    title:
      "Rule 4 — pings are bounded by start and stop; the bounded set is canonical truth.",
    body: "Rewrote Rule 4 in CLAUDE.md and started shipping the hardening: server-side pre-Start cutoff on free-ride /pings (commit 1d5b922), leaderboard WS broadcast reading from the canonical bounded-ping query (commit e5d617c). Every surface that reports on a ride — rider summary, spectator polyline, leaderboard distance + time — now computes from a single query over the bounded set so the rider, spectator, and leaderboard see the same number.",
  },
  {
    date: "2026-05-21",
    category: "Marketing",
    title:
      'Stripped "free for 2027" / "Year 1 free" claims from every customer-facing surface.',
    body: 'Found and pulled the unintentional "free for 2027" promise from the /for-organisers hero, the /welcome organiser card, the investor deck BUSINESS MODEL footer, the organiser deck lime YEAR 1 FREE banner, and the comparison-table footnote (commit 94a4fec). Pricing now consistent: £3 / rider / event capped at £6,000 for organisers; Free Ride free for athletes always.',
  },
  {
    date: "2026-05-20",
    category: "Feature",
    title: "Point-to-point checkpoint system shipped end-to-end.",
    body: "Phase 1 schema + CRUD endpoints (commit 7ad28b7), Phase 2 + 3 organiser editor + tracking detection + spectator rendering (commit cd5eb23). Drag-to-reorder checkpoint rows, map-picker for placement, visually distinct start + finish rows, explainer callout on the editor. Point-to-point events now run with checkpoint coords driving start/finish detection without requiring a GPX.",
  },
  {
    date: "2026-05-20",
    category: "Reliability",
    title: "Race events #105 — pre-gun pings no longer pollute top-speed stats.",
    body: "Pings collected before actual_start_time were inflating top-speed calculations at race start. Server-side gate (commit bdbc0d6) drops any ping with timestamp earlier than the gun. This is the fix that Rule 4 later generalised to TT gate-crossings and free-ride/grand-depart tap-Start.",
  },
  {
    date: "2026-05-20",
    category: "Marketing",
    title: "Domain cutover — astertrack.app is the canonical home.",
    body: "Swapped all vercel.app references over to astertrack.app and added a cutover runbook (commits 19162d5 + 366d71a). Search Console, social links, and outbound email signatures all point at the proper domain.",
  },
  {
    date: "2026-05-19",
    category: "Marketing",
    title:
      '"Grand Départ" renamed to "Point-to-point adventure" across the app + marketing.',
    body: 'The grand-départ framing tested confusingly outside the bikepacking-ultra audience. Renamed to "Point-to-point adventure" everywhere — app navigation, marketing pages, persona language, organiser flows (commits f207b14, f82c5dd, 8bbc9a7).',
  },
  {
    date: "2026-05-19",
    category: "Marketing",
    title:
      "Investor deck — 5 weakest body slides rewritten + SEIS + EIS tax-position slide added.",
    body: "INSIGHT, PRODUCT, BRAND, TRACTION, TEAM slides rewritten for tighter typographic hierarchy and sharper claims (commit d4c40f3). New 17/20 slide quantifying the UK SEIS + EIS tax position for investors (commit 5bd4667). Decorative italics stripped across all four decks (commit 14eb67a).",
  },
  {
    date: "2026-05-18",
    category: "Reliability",
    title:
      "Spectator Phase 1 — real-time-feel position updates with WebSocket catch-up.",
    body: "Spectator-side redesign (commit ad2364a): visibility/WebSocket catch-up so a tab returning to focus snaps to the current state, health surface for connection state, retry on dropped connection, raised LIMIT on history fetch. Real-time-feel update cadence with position animation and tighter intervals (commit 23d728b).",
  },
  {
    date: "2026-05-15",
    category: "Reliability",
    title:
      "Free-ride watcher polyline + distance no longer keep growing after WebSocket drops.",
    body: "Incident on ride 3ced3199: when the watcher's WebSocket connection dropped, the rendered polyline and reported distance kept extending using stale state instead of pausing. Fixed in commit 9287455.",
  },
  {
    date: "2026-05-14",
    category: "Reliability",
    title: "Late-drain ping symmetry — web and native paths agree.",
    body: "Web /pings + native /pings-native now share the same late-arrival semantics with cutoff filtering and ON CONFLICT dedup (commits 7a28d36 + d89225c). intended_ended_at persists across retries so a /stop that fires hours later doesn't backdate or extend the ride.",
  },
  {
    date: "2026-05-09",
    category: "Reliability",
    title: "Android P0 crash hotfix triple — gms-location dependency pinning.",
    body: "Crash storm on Android 16 traced to a gms-location version mismatch. Stack of three commits to pin tslocationmanager to 4.1.5 + force-pin gms-location to 21.0.1 + drop the force-pin once upstream caught up (5eeba09, bd86155, 115fc03). Track.tsx reverted to a known-good state during the storm and re-stabilised afterwards.",
  },
  {
    date: "2026-05-08",
    category: "Safety",
    title: "SOS push + broadcast restricted to event admins only.",
    body: "SOS alerts and the linked WebSocket broadcast now only reach the event's admin set, not every connected user with /api access (commit b25bb89). Tightened the surface for sensitive emergency content.",
  },
  {
    date: "2026-05-06",
    category: "Safety",
    title: "Free-ride SOS hardening — rate-limit, dedup, atomic fan-out.",
    body: 'PR5 (commit ea9a9d0): rate-limited the SOS endpoint, deduped repeat alerts within a window, made the watcher fan-out atomic so a half-sent broadcast can\'t leave watchers in inconsistent states. Paused-rider "I\'m OK" handled in the same change.',
  },
  {
    date: "2026-04-29",
    category: "Marketing",
    title:
      "Brand colour system — dark primary, lime global, red restricted to SOS + Sign Out.",
    body: "Repointed the primary brand colour to dark, surfaced lime globally as the accent, and restricted the loud red to safety-critical actions (SOS, Sign Out) so its meaning stays sharp (commit ff2b709).",
  },
  {
    date: "2026-04-28",
    category: "Reliability",
    title: "Free-ride rides INSERT — atomic lazy-create + race-safe.",
    body: "Rule 4 hardening: rides.INSERT path now atomic so two near-simultaneous /start requests can't both create a row, and lazy-create from /pings (when pings land before /start due to offline queueing) closes any pre-existing open ride before opening a new one (commits 64d0ac2 + ce956cb).",
  },
  {
    date: "2026-04-21",
    category: "Safety",
    title: "Crash-SOS delivery — surface failure, retry, fallback prompt.",
    body: "When a crash-triggered SOS fails to deliver (network, server, or client error), the rider sees an explicit failure surface with a retry button and a fallback to call emergency services manually (commit 4d78d23). The silent-failure mode where a rider thinks the SOS went out and it didn't is closed.",
  },
  {
    date: "2026-01-25",
    category: "Feature",
    title: "Initial release — Watch the Dot PWA, Free Ride, crash detection, SOS.",
    body: "First commit of the platform (0ab6bab): GPS tracking PWA, Free Ride mode (standalone tracking without an event), crash detection with next-of-kin alerts, SOS chat, shareable watch links (commit 71bd357).",
  },
];

const CATEGORY_STYLES: Record<Category, string> = {
  Reliability: "bg-mint text-dark",
  Feature: "bg-lime text-dark",
  Performance: "bg-mint text-dark",
  Safety: "bg-lime-deep text-white",
  Marketing: "bg-mint text-dark",
};

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const metadata: Metadata = {
  title: "Changelog — what we shipped",
  description:
    "What's shipped: reliability fixes, new features, performance wins and safety improvements — a reverse-chronological log of every meaningful change.",
  alternates: { canonical: "/changelog" },
};

export default function ChangelogPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Aster changelog",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: ENTRIES.length,
    itemListElement: ENTRIES.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TechArticle",
        headline: e.title,
        description: e.body,
        datePublished: e.date,
        author: { "@type": "Organization", name: "Aster" },
        publisher: { "@type": "Organization", name: "Aster" },
        articleSection: e.category,
      },
    })),
  };

  return (
    <>
      <SiteNav />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />

        {/* ---- Hero ---- */}
        <Section tone="dark" innerClassName="text-center">
          <RouteMotif tone="dark" variant={1} />
          <div className="relative z-10">
            <Kicker tone="dark">Changelog</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.95] text-[clamp(44px,7vw,88px)] text-mint mb-6 text-balance">
              What we shipped.
              <br /> When we shipped it.
            </h1>
            <p className="text-lg md:text-xl text-mint/85 max-w-[60ch] mx-auto">
              Reliability fixes, new features, performance wins, safety
              improvements. The plain-language log of every meaningful change.
            </p>
          </div>
        </Section>

        {/* ---- Entries ---- */}
        <Section tone="white">
          <div className="max-w-[880px] mx-auto">
            <ol className="space-y-6">
              {ENTRIES.map((e) => (
                <li
                  key={e.date + e.title}
                  className="border-2 border-dark rounded-2xl bg-white p-6 md:p-7 shadow-pop-2"
                >
                  <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                    <time
                      dateTime={e.date}
                      className="font-condensed uppercase tracking-[0.08em] font-semibold text-[13px] text-dark/60"
                    >
                      {formatDate(e.date)}
                    </time>
                    <span
                      className={`font-condensed uppercase tracking-[0.06em] font-bold text-[12px] px-2.5 py-1 rounded-full border-2 border-dark ${CATEGORY_STYLES[e.category]}`}
                    >
                      {e.category}
                    </span>
                  </div>
                  <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.05] text-[22px] mb-2.5">
                    {e.title}
                  </h2>
                  <p className="text-[16px] leading-[1.65] text-dark/80">{e.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* ---- CTA band ---- */}
        <section className="relative overflow-hidden bg-dark text-mint border-b-2 border-dark">
          <RouteMotif tone="dark" variant={2} flip />
          <div className="relative z-10 container-site py-16 md:py-24 text-center">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.95] text-mint text-[clamp(36px,4.5vw,60px)] mb-4">
              Want to be on the next entry?
            </h2>
            <p className="text-lg text-mint/85 max-w-[52ch] mx-auto mb-9">
              Tell us what would change your race day. The roadmap is a
              conversation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/for-organisers">For race organisers</Button>
              <Button href="/contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
