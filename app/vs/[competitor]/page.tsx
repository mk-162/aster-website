import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Card from "@/components/Card";
import Button from "@/components/Button";
import RouteMotif from "@/components/RouteMotif";

/* Comparison pages ported from the Aster PWA marketing site at
 * identical live URLs:
 *
 *   /vs/trackleaders   → "Aster vs Trackleaders"
 *   /vs/racemap        → "Aster vs RaceMap"
 *   /vs/strava-beacon  → "Aster vs Strava Beacon"
 *   /vs/garmin-livetrack → "Aster vs Garmin LiveTrack"
 *
 * These exist to capture high-intent organic searches ("trackleaders
 * alternative" etc.). Competitive claims are carried EXACTLY from the
 * source — do not strengthen them. Structure follows comparison-page
 * SEO best practice: honest summary, feature table, why-Aster,
 * honest when-competitor-is-right, FAQ (with FAQPage JSON-LD). */

interface FeatureRow {
  feature: string;
  aster: string;
  competitor: string;
}

interface ComparisonData {
  slug: string;
  competitor: string;
  competitorUrl?: string;
  summary: string;
  asterSummary: string;
  features: FeatureRow[];
  whyAster: Array<{ title: string; body: string }>;
  whenCompetitor: string;
  faq: Array<{ question: string; answer: string }>;
}

// ── DATA ────────────────────────────────────────────────────────────

const TRACKLEADERS: ComparisonData = {
  slug: "trackleaders",
  competitor: "Trackleaders",
  competitorUrl: "https://trackleaders.com",
  summary:
    "Trackleaders is the hardware-based GPS tracking service that has powered ultra-endurance events like Tour Divide and Trans Am for 17 years. It runs on dedicated satellite devices (Spot Gen 4, Garmin inReach, Zoleo) shipped to each rider.",
  asterSummary:
    "Aster is a phone-first live tracking platform. Riders carry their phone, organisers get a dashboard, watchers get a link — no hardware to ship, no batteries to chase, set up in an afternoon.",
  features: [
    { feature: "Tracking device", aster: "Rider's phone", competitor: "Satellite tracker (Spot / inReach / Zoleo)" },
    { feature: "Set-up time", aster: "Under an hour", competitor: "Weeks (ship trackers, train riders, recover devices)" },
    { feature: "Per-rider hardware cost", aster: "£0", competitor: "£100–250 per device, recovered or replaced" },
    { feature: "Watcher experience", aster: "Mobile-first live page, real-time leaderboard, story feed", competitor: "Desktop web table, 2009 UI, refresh-to-update" },
    { feature: "Editorial layer", aster: "Story feed, race recaps, athlete profiles on the platform", competitor: "None — DotWatcher provides this externally" },
    { feature: "Offline tolerance", aster: "Pings queue on-device for 7 days; uploads when signal returns", competitor: "Satellite uplink — works in true wilderness" },
    { feature: "Pricing model", aster: "£3 / rider / event, capped at £6,000", competitor: "Per-event setup + per-device rental" },
    { feature: "API / embed", aster: "Embeddable widget for organiser website", competitor: "Per-event microsite at trackleaders.com/<slug>" },
  ],
  whyAster: [
    {
      title: "No hardware logistics.",
      body: "You don't ship anything. You don't recover anything. You don't pay for batteries, SIMs, or trackers that don't come back. The phone is the tracker.",
    },
    {
      title: "Built for the 95% that have never had tracking.",
      body: "Trackleaders works for the marquee 5% — Tour Divide, Trans Am, Atlas Mountain. Aster works for the regional gravel race, the club championship, the Tuesday-night chaingang that never got live coverage because hardware tracking was out of reach.",
    },
    {
      title: "A watcher experience from this decade.",
      body: "Live map on mobile. Real-time leaderboard. Push notifications when their rider starts, stops, finishes. Story feed for race recaps. The audience is on their phone — meet them there.",
    },
    {
      title: "Editorial and tracking in one place.",
      body: "Trackleaders is infrastructure; DotWatcher is the editorial layer on top. Aster is both — race recaps, athlete profiles, sponsor frames, all native to the platform the audience is already on.",
    },
  ],
  whenCompetitor:
    "Trackleaders is still the right call for true wilderness ultras where phone coverage is genuinely absent for days on end — Tour Divide stretches in remote Wyoming, the Iditarod Trail Invitational, Atlas Mountain at altitude. Where there's ZERO cell signal for hours, a satellite uplink is the right tool. For everything else — and for the 95% of races that never had tracking at all because the hardware-shipping economics didn't add up — Aster is the better fit.",
  faq: [
    {
      question: "Is Aster a Trackleaders replacement?",
      answer:
        "For most events, yes — and at a fraction of the cost and setup complexity. For deep-wilderness ultras where there's genuinely no cell coverage for days, Trackleaders' satellite trackers still have an edge. We're honest about that.",
    },
    {
      question: "What about DotWatcher coverage?",
      answer:
        "DotWatcher.cc syndicates editorial commentary on top of Trackleaders' tracking. We respect what they do and have reached out about partnership. In the meantime, Aster bakes the editorial layer (race recaps, athlete profiles, sponsor frames) directly into the tracking platform so there's one place to follow a race, not two.",
    },
    {
      question: "Does phone tracking actually work in remote areas?",
      answer:
        "Yes, for the vast majority of events. Modern phones (iPhone 14+ with multi-band GNSS, latest Androids) match dedicated bike computers for GPS accuracy. Aster's offline-tolerant ping queue holds 7 days of pings on-device and uploads when signal returns, so dead zones don't lose data — the line picks up where it left off.",
    },
    {
      question: "How long does an Aster set-up take?",
      answer:
        "Under an hour for a typical race. Sign up, upload your GPX, set the start/finish line, share the watch link with your riders. We're on the phone with organisers during their first race-day for the first season as a baseline service.",
    },
    {
      question: "What's the pricing?",
      answer:
        "Event Organisers choose a monthly registration-cap plan: £79.99 for up to 100 registrations, £149.99 for 500, or £199.99 for 1,000. Build and test with up to three registrations free. Riders carry their own phones, so there is no hardware cost.",
    },
  ],
};

const RACEMAP: ComparisonData = {
  slug: "racemap",
  competitor: "RaceMap",
  competitorUrl: "https://racemap.com",
  summary:
    "RaceMap is a B2B SaaS tracking platform for events, charging per-map activation plus per-tracker SIM fees. It supports both phone-app and hardware tracker workflows and is used by larger event organisers across Europe.",
  asterSummary:
    "Aster is a phone-first live tracking platform with an editorial layer baked in. Same phone-tracking capability, dramatically simpler pricing, plus a story feed and watcher experience designed for the audience, not the organiser back-office.",
  features: [
    { feature: "Tracking model", aster: "Rider's phone (web + native iOS / Android)", competitor: "Phone app + hardware trackers, modular" },
    { feature: "Pricing (500-rider event)", aster: "£149.99/month organiser tier", competitor: "~€500+ base, plus per-tracker SIM costs" },
    { feature: "Pricing model", aster: "Monthly subscription, sized by registrations", competitor: "Per map activation + per API + per tracker SIM + per data MB" },
    { feature: "Free preview", aster: "Build and test with up to 3 registrations", competitor: "2-device cap on free trial events" },
    { feature: "Editorial layer", aster: "Story feed, race recaps, athlete profiles, sponsor frames", competitor: "Not in product scope" },
    { feature: "Watcher experience", aster: "Mobile-first live page, story feed, push notifications", competitor: "Functional tracking map" },
    { feature: "Sponsor surface", aster: "Branded tracker pages, sponsor frames, editorial co-production", competitor: "Limited" },
  ],
  whyAster: [
    {
      title: "Pricing you can quote on the phone.",
      body: "RaceMap pricing requires a spreadsheet — €100 per map activation + €200 per API + per-tracker SIMs + per-MB-SMS. Aster is a single monthly Event Organiser plan: £79.99 for up to 100 registrations, £149.99 for 500, or £199.99 for 1,000. No tracker rentals or per-rider charge.",
    },
    {
      title: "Predictable monthly cost.",
      body: "Aster’s registration cap applies to each event, while one monthly plan covers your calendar. There are no tracker rentals, SIM fees, map-activation charges or per-rider charges to reconcile.",
    },
    {
      title: "The editorial layer is the moat.",
      body: 'RaceMap stops at "your race appears on a map". Aster keeps going: story feed for race recaps, athlete profiles your sponsors can frame, push notifications when their rider passes a feed station. The audience comes back; the sponsors notice.',
    },
    {
      title: "Phone-first means no procurement headache.",
      body: 'RaceMap supports phones too, but their commercial centre of gravity is the tracker rental. Aster is phone-first by design. No SIMs to manage. No trackers to ship. No "device returned in working order" line on the cost sheet.',
    },
  ],
  whenCompetitor:
    "RaceMap is the right tool for very large mass-participation events (5,000+ riders, multi-day stage races with complex timing integrations) where their modular pricing and tracker rental options give you fine-grained control. They're a real platform with real depth. For smaller events — and for organisers who want the editorial + watcher experience as part of the package — Aster is the better fit.",
  faq: [
    {
      question: "Is Aster cheaper than RaceMap?",
      answer:
        "For typical event sizes (200–2,000 riders), yes — usually by a factor of 2–3x once SIM costs are included. RaceMap's pricing is more competitive at the very large end (5,000+ riders) where their per-tracker model spreads over a bigger base.",
    },
    {
      question: "Does Aster integrate with my timing system?",
      answer:
        "Yes. Aster sits alongside RaceResult, MyLaps, ChronoTrack, or chip-on-the-line setups. We handle the live tracking and watcher experience; your timing partner handles the official splits. The two systems don't conflict — most of our organisers run both.",
    },
    {
      question: "Can I embed Aster on my event website?",
      answer:
        "Yes. The watch link is embeddable as a widget on your own site, so your event domain stays the canonical destination and Aster handles the live tracking surface.",
    },
    {
      question: "What about hardware trackers?",
      answer:
        "Aster is phone-first by design. If your event has riders without smartphones (or where you genuinely need a satellite uplink for wilderness sections), we'll talk through the right setup with you — for most events, the phone is the right answer.",
    },
  ],
};

const STRAVA_BEACON: ComparisonData = {
  slug: "strava-beacon",
  competitor: "Strava Beacon",
  competitorUrl: "https://www.strava.com/beacon",
  summary:
    "Strava Beacon is the free live-location feature inside the Strava app. It sends a live link to up to 3 selected contacts so they can see where you are during a recorded activity. It's designed as a safety feature.",
  asterSummary:
    "Aster is a live race-tracking platform. Same underlying capability — phone GPS broadcasting position in real-time — but built for race events with leaderboards, a watcher page, organiser tools, and unlimited audience instead of a 3-contact safety ping.",
  features: [
    { feature: "Primary use case", aster: "Live race tracking for events + free rides", competitor: "Personal safety ping to family / partner" },
    { feature: "Number of watchers", aster: "Unlimited — anyone with the share link", competitor: "3 contacts maximum" },
    { feature: "Leaderboard", aster: "Real-time, route-distance gaps, category filters", competitor: "None" },
    { feature: "Race / event support", aster: "Native — start lines, finish detection, cut-offs, DNF", competitor: "None — just a location feed" },
    { feature: "Watcher needs an app", aster: "No — just open the link in any browser", competitor: "No — link opens in browser" },
    { feature: "Organiser dashboard", aster: "Yes — manage all riders, see SOS alerts, manage roster", competitor: "N/A — personal use only" },
    { feature: "Cost", aster: "Free Ride is free for riders. Race events: per-rider via organiser.", competitor: "Free with Strava subscription" },
  ],
  whyAster: [
    {
      title: "Not a 3-contact limit — your whole audience.",
      body: "Beacon caps live-location at 3 contacts. Aster's watch link is unlimited — share it with your race's social channels, embed it on the event site, send it to everyone who pre-registered. Built for racing, not for a partner's peace of mind.",
    },
    {
      title: "It's the right tool for the job.",
      body: "Strava's product strategy treats Beacon as a safety feature. The 3-contact cap, the lack of leaderboards, the no-event-integration story — all consistent with that. Aster's product strategy treats live tracking as a race-watching audience product. Different product, different fit.",
    },
    {
      title: "Real race infrastructure underneath.",
      body: "Finish-line detection, cut-off auto-processing, DNF flagging, multi-day stage support, off-route alerts, SOS dashboard with two-way chat. Beacon doesn't have any of this — it's not designed to.",
    },
    {
      title: "Editorial and storytelling built in.",
      body: "Race recaps, story feed, athlete profiles, sponsor frames. The whole post-race conversation lives in the same place as the live tracking. Beacon is a feed; Aster is a publication.",
    },
  ],
  whenCompetitor:
    "Strava Beacon is the right tool for solo training rides where you want your partner / family to know roughly where you are in case something goes wrong. It's free, it's already in the app you're using, and the 3-contact limit is fine for that use case. For racing, group rides with a watching audience, or any event with a leaderboard, it's not the right shape — and Strava have been consistent for years that they don't intend to make it one.",
  faq: [
    {
      question: "Why doesn't Strava just add a leaderboard?",
      answer:
        'They\'ve had the technology for a decade and haven\'t — which is the strongest competitive signal you can ask for. Live race-watching as a category is adjacent to Strava\'s core "training log + segment leaderboard" product, but not the same product. Strava\'s strategic focus stays on the segment / training-stress / subscription model.',
    },
    {
      question: "Do I need Strava to use Aster?",
      answer:
        "No. Aster is a standalone live tracking platform. We integrate with Strava for post-ride push (your ride appears in your Strava feed when you finish), but you don't need a Strava account to use Aster.",
    },
    {
      question: "Is Aster free?",
      answer:
        "Free Ride — solo recording with unlimited watcher links — is free for riders, always. Race events charge the organiser per rider (£3 / rider / event, capped at £6,000), not the rider. So as a rider, racing on Aster is free at the entry-line.",
    },
    {
      question: "Garmin LiveTrack and Wahoo Companion are the same as Beacon, right?",
      answer:
        "Same category, slightly different shape. Garmin and Wahoo also treat live-share as a safety feature inside their broader fitness-tracking products — private URLs sent to a list of contacts, no leaderboard, no event infrastructure, no public audience. We dig into the Garmin LiveTrack comparison in detail at /vs/garmin-livetrack. Aster is in a different category by design.",
    },
  ],
};

const GARMIN_LIVETRACK: ComparisonData = {
  slug: "garmin-livetrack",
  competitor: "Garmin LiveTrack",
  competitorUrl:
    "https://www.garmin.com/en-GB/garmin-technology/cycling-science/live-track/",
  summary:
    "Garmin LiveTrack is the safety-share feature inside Garmin Connect. When a rider starts an activity on a paired Garmin Edge head unit or Forerunner watch, LiveTrack sends a private URL by email to a hand-picked list of contacts who can watch a live map of the ride until the rider stops.",
  asterSummary:
    "Aster is a live race-tracking platform. Same underlying problem (people want to know where the rider is) solved at a different scale: a public watch link, every rider in an event on one map, a leaderboard, an editorial feed, organiser tools, SOS chat. Live tracking as an audience product, not a private safety share.",
  features: [
    { feature: "Primary use case", aster: "Race + group-ride + event live tracking with public audience", competitor: "Personal safety-share with hand-picked contacts" },
    { feature: "Watch surface", aster: "Public URL, no account required, every rider on one map", competitor: "Per-contact private URL emailed to LiveTrack's contact list" },
    { feature: "Tracking device", aster: "Rider's phone (iOS + Android app)", competitor: "Garmin Edge head unit or Forerunner watch paired with the rider's phone (the phone uploads)" },
    { feature: "Leaderboard", aster: "Live, with gaps and ETAs", competitor: "None — single rider, no field" },
    { feature: "Multi-rider on one map", aster: "Yes — designed for it", competitor: "No" },
    { feature: "Event infrastructure (registration, roster, finish line, cutoffs)", aster: "Yes", competitor: "No" },
    { feature: "SOS / two-way chat with organiser", aster: "Yes", competitor: "No (contacts can see location but can't reach the rider through LiveTrack)" },
    { feature: "Watcher experience after the ride", aster: "Permanent rider page with polyline, splits, recap", competitor: "Map disappears when activity ends; data moves into Garmin Connect activity log" },
    { feature: "Requires Garmin hardware", aster: "No (phone only)", competitor: "Yes (Edge or Forerunner)" },
    { feature: "Pricing", aster: "Free for personal Free Ride; race events charge organiser per rider", competitor: "Free (Garmin Connect feature) — costs are baked into the Garmin device price" },
  ],
  whyAster: [
    {
      title: "Built for an audience, not a contact list.",
      body: "LiveTrack sends a one-off email to a handful of contacts. Aster gives you a public watch link you can share on Instagram, paste in a group chat, or hand to a sponsor — every viewer sees the same live map, no email-list management.",
    },
    {
      title: "Multi-rider on one screen.",
      body: "LiveTrack is built around one rider sharing one ride. Aster puts the whole event — every rider on the start sheet — on one map with live gaps, ETAs, and the field around each rider. That's the entire watcher product.",
    },
    {
      title: "No Garmin hardware required.",
      body: "LiveTrack only works if the rider has a Garmin Edge or Forerunner. Aster runs on any iOS or Android phone — useful when the field is a mix of devices, or when the rider doesn't have (or doesn't want to carry) a head unit.",
    },
    {
      title: "Event-day operations the safety feature isn't built for.",
      body: "LiveTrack has no concept of a roster, a finish line, lap detection, organiser SOS visibility, or a cutoff time. Those are the operational primitives a race needs, and they're Aster's default surface.",
    },
  ],
  whenCompetitor:
    "Garmin LiveTrack is the right tool when you're a solo rider on a regular training ride or a one-off adventure, and you want your partner / family / a small named list of people to be able to see where you are during the ride. It's free, it ships with the Garmin you already use, and the security model (private URL emailed to specific contacts) is the right shape for that intimate use case. For racing, public-audience tracking, group rides with multiple riders on one map, or any event with a leaderboard or organiser dashboard, it's not the right shape — and Garmin haven't signalled they intend to make it one.",
  faq: [
    {
      question: "Can I use Garmin LiveTrack for a bike race?",
      answer:
        "Technically you can ask every rider to start LiveTrack and forward you their URL, but you'd end up with N separate URLs, no leaderboard, no shared audience-facing map, and no way to alert riders if there's an issue. Beyond a friendly group ride with a handful of riders, the format breaks. Aster is built for that shape from the start.",
    },
    {
      question: "Does Aster work with my Garmin Edge?",
      answer:
        "Yes, in the sense that Aster doesn't care what bike computer (if any) the rider is using — Aster runs on the rider's phone and the Edge is just a head unit for the rider's own ride data. We plan to add Garmin Connect activity push (the rider's finished ride appears in their Garmin Connect feed) on the post-launch roadmap. For now, the equivalent is the Strava push that fires at finish.",
    },
    {
      question: "Is Aster more accurate than LiveTrack?",
      answer:
        "GPS accuracy is essentially identical — both use the same satellite constellations and the same phone-side GPS chip (the Edge uses its own chip, but it forwards positions to the phone over Bluetooth, which then uploads). The difference between the two products is what happens to the positions after they arrive at the server: route-snapping, leaderboard ordering, off-route detection, organiser dashboard. Aster does all of that; LiveTrack doesn't, by design.",
    },
    {
      question: "Do I need to remove LiveTrack to use Aster?",
      answer:
        "No. They're independent products. A rider can have LiveTrack going for their partner (private, on the Edge) AND have Aster going for the race audience (public, on the phone) at the same time, on the same ride. Different audiences, different products, no conflict.",
    },
    {
      question: "Why isn't Garmin building this?",
      answer:
        "Garmin's strategic centre is hardware (head units, watches, sensors) and the Garmin Connect ecosystem that surrounds it. Live race tracking as an organiser-facing platform is adjacent to that but not the same product, and would dilute the hardware-sales flywheel that drives the rest of the business. They've had the technology to build a leaderboard-shaped LiveTrack for a decade and haven't — which tells you most of what you need to know about their roadmap.",
    },
  ],
};

const COMPARISONS: Record<string, ComparisonData> = {
  trackleaders: TRACKLEADERS,
  racemap: RACEMAP,
  "strava-beacon": STRAVA_BEACON,
  "garmin-livetrack": GARMIN_LIVETRACK,
};

// ── ROUTING + METADATA ──────────────────────────────────────────────

/** Canonical list of comparison slugs — imported by app/sitemap.ts. */
export const VS_SLUGS = Object.keys(COMPARISONS);

export function generateStaticParams() {
  return Object.keys(COMPARISONS).map((competitor) => ({ competitor }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor } = await params;
  const data = COMPARISONS[competitor];
  if (!data) return {};
  return {
    title: `Aster vs ${data.competitor}`,
    description: `How Aster compares to ${data.competitor} for live race tracking — pricing, hardware, watcher experience and set-up time in an honest side-by-side, updated for 2026.`,
    alternates: { canonical: `/vs/${competitor}` },
  };
}

// ── PAGE ────────────────────────────────────────────────────────────

export default async function VersusPage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor } = await params;
  const data = COMPARISONS[competitor];
  if (!data) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Aster", item: "https://www.astertrack.app/" },
      {
        "@type": "ListItem",
        position: 2,
        name: `Aster vs ${data.competitor}`,
        item: `https://www.astertrack.app/vs/${competitor}`,
      },
    ],
  };

  return (
    <>
      <SiteNav />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* ---- Hero ---- */}
        <Section tone="dark" innerClassName="text-center">
          <RouteMotif tone="dark" variant={1} />
          <div className="relative z-10">
            <Kicker tone="dark">Direct comparison</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.95] text-[clamp(40px,6vw,72px)] text-mint mb-6 text-balance">
              Aster vs {data.competitor}
            </h1>
            <p className="text-lg md:text-xl text-mint/85 max-w-[60ch] mx-auto mb-8">
              {data.asterSummary}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/for-organisers">Put your race on Aster</Button>
              <Button href="/pricing" variant="secondary">
                See pricing
              </Button>
            </div>
          </div>
        </Section>

        {/* ---- Honest summary of competitor ---- */}
        <Section tone="stone">
          <div className="max-w-[880px] mx-auto">
            <Kicker>What {data.competitor} is</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.02] text-[clamp(28px,3.5vw,40px)] mb-5">
              We won&apos;t trash the competitor. Here&apos;s an honest summary.
            </h2>
            <p className="text-[17px] md:text-lg leading-[1.7] text-dark/85">
              {data.summary}
              {data.competitorUrl && (
                <>
                  {" "}
                  <a
                    href={data.competitorUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-lime-deep underline underline-offset-2 decoration-2 font-semibold hover:decoration-4"
                  >
                    {data.competitor}&apos;s site →
                  </a>
                </>
              )}
            </p>
          </div>
        </Section>

        {/* ---- Feature-by-feature comparison ---- */}
        <Section tone="white">
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.02] text-[clamp(28px,3.5vw,40px)] mb-10 text-center">
            Side by side
          </h2>
          <div className="max-w-[1000px] mx-auto overflow-x-auto rounded-2xl border-2 border-dark shadow-pop-2">
            <table className="w-full text-[15px] md:text-[16px] bg-white">
              <thead>
                <tr className="border-b-2 border-dark">
                  <th className="text-left py-3 px-4 font-condensed uppercase tracking-[0.06em] text-[13px] text-dark/60 w-1/3">
                    Feature
                  </th>
                  <th className="text-left py-3 px-4 bg-lime/25 font-condensed uppercase tracking-[0.06em] text-[13px] text-lime-deep">
                    Aster
                  </th>
                  <th className="text-left py-3 px-4 font-condensed uppercase tracking-[0.06em] text-[13px] text-dark/60">
                    {data.competitor}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.features.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i < data.features.length - 1 ? "border-b border-dark/15" : ""}
                  >
                    <td className="py-3 px-4 font-semibold text-dark">{row.feature}</td>
                    <td className="py-3 px-4 bg-lime/10 text-dark">{row.aster}</td>
                    <td className="py-3 px-4 text-dark/80">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ---- Why Aster ---- */}
        <Section tone="stone">
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.02] text-[clamp(28px,3.5vw,40px)] mb-10 text-center">
            Why organisers choose Aster over {data.competitor}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-[1000px] mx-auto">
            {data.whyAster.map((item) => (
              <Card key={item.title}>
                <h3 className="font-condensed uppercase font-bold tracking-[-0.01em] text-[22px] mb-2.5">
                  {item.title}
                </h3>
                <p className="text-[16px] leading-[1.65] text-dark/80">{item.body}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* ---- Honest "when competitor is right" ---- */}
        <Section tone="white">
          <div className="max-w-[880px] mx-auto">
            <Kicker>Being honest</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.02] text-[clamp(28px,3.5vw,40px)] mb-5">
              When {data.competitor} is the right call
            </h2>
            <p className="text-[17px] md:text-lg leading-[1.7] text-dark/85">
              {data.whenCompetitor}
            </p>
          </div>
        </Section>

        {/* ---- FAQ ---- */}
        <Section tone="stone">
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.02] text-[clamp(28px,3.5vw,40px)] mb-10 text-center">
            Common questions
          </h2>
          <div className="max-w-[880px] mx-auto space-y-5">
            {data.faq.map((item) => (
              <Card key={item.question}>
                <h3 className="font-condensed uppercase font-bold tracking-[-0.01em] text-[20px] mb-2.5">
                  {item.question}
                </h3>
                <p className="text-[16px] leading-[1.65] text-dark/80">{item.answer}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* ---- CTA band ---- */}
        <section className="relative overflow-hidden bg-dark text-mint border-b-2 border-dark">
          <RouteMotif tone="dark" variant={2} flip />
          <div className="relative z-10 container-site py-16 md:py-24 text-center">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.95] text-mint text-[clamp(36px,4.5vw,60px)] mb-4">
              Ready to put your race on Aster?
            </h2>
            <p className="text-lg text-mint/85 max-w-[52ch] mx-auto mb-9">
              30-minute call. We&apos;ll walk through your race, the dashboard,
              and what a launch on Aster would look like.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/for-organisers">See the organiser page</Button>
              <Button href="mailto:hello@astertrack.app?subject=Race%20on%20Aster" variant="secondary">
                Email us
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
