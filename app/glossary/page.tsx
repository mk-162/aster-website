import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Button from "@/components/Button";
import RouteMotif from "@/components/RouteMotif";

export const metadata: Metadata = {
  title: "Glossary — live tracking + endurance cycling terms",
  description:
    "Plain-language definitions of live tracking and endurance cycling terms — watch link, SOS chat, finish-line geofence, bikepacking, gravel racing and more.",
  alternates: { canonical: "/glossary" },
};

/* ------------------------------------------------------------------ */
/* Terms ported from the original astertrack.app/glossary page. Each   */
/* term keeps its anchor slug so deep links (#dot-watching etc.) keep  */
/* working. Rendered as one alphabetical list — readers scan visually. */
/* ------------------------------------------------------------------ */

interface Term {
  slug: string; // url-safe anchor (used in #fragment)
  term: string; // display name
  short: string; // 1-sentence definition for SERP snippet
  body: string; // longer plain-language explanation
}

const TERMS: Term[] = [
  {
    slug: "bikepacking",
    term: "Bikepacking",
    short:
      "Multi-day, often self-supported cycling over remote terrain with all gear carried on the bike.",
    body: "Bikepacking is the long-distance, often self-supported branch of cycling that combines cycling, camping, and ultra-endurance racing. Riders carry all their kit on the bike (frame bag, seat pack, handlebar roll) and cover routes from a few hundred to several thousand kilometres. Events like Tour Divide (4,400 km Banff to Mexico), Trans Am (6,800 km Astoria to Yorktown), and the Atlas Mountain Race (1,300 km across Morocco) are the marquee bikepacking races; smaller weekend bikepacking events run year-round across the UK, EU, and US.",
  },
  {
    slug: "cutoff-time",
    term: "Cutoff time",
    short:
      "The deadline by which a rider must reach a point on the course or be removed from the leaderboard.",
    body: 'A cutoff time is the wall-clock deadline an organiser sets for an event — riders who haven\'t reached a specific checkpoint (or the finish) by that time are marked DNF ("did not finish") or auto-finished, depending on the event\'s rules. Aster\'s cutoff worker processes these automatically every 60 seconds so the organiser doesn\'t have to manually walk down the leaderboard. Critical for long events where slower riders extending the timing window indefinitely isn\'t practical.',
  },
  {
    slug: "dnf",
    term: "DNF",
    short:
      "Did Not Finish — a rider who started but didn't complete the event.",
    body: 'DNF stands for "Did Not Finish" — the status given to a rider who started an event but didn\'t complete it. Riders DNF for mechanicals, injury, weather, missing a cutoff, or just deciding the day isn\'t worth pushing through. On Aster, DNF is set by the rider themselves (Abandon button, 4-digit-confirmed), by the cutoff worker (if the rider misses an organiser-set cutoff), or manually by the organiser. The DNF status keeps the leaderboard honest and the rider\'s ride record accurate.',
  },
  {
    slug: "dot-watching",
    term: "Dot watching",
    short:
      "Following live GPS dots on a map during ultra-endurance bike races. A spectator subculture turned mainstream.",
    body: 'Dot watching is the colloquial term for following live GPS dots representing riders on a map during ultra-endurance bike races. The practice originated around the bikepacking community\'s coverage of Trackleaders-tracked events (Tour Divide, Trans Am, Atlas Mountain Race, the Iditarod Trail Invitational) and has grown into the mainstream of endurance cycling spectatorship. The "dots" are real-time positions of riders — moving across a route map, sometimes pausing for sleep or mechanicals, sometimes racing each other for the line. Dot watchers will refresh tracker pages all day during a marquee event, follow specific riders, and aggregate discussion on Slack, Discord, and now Reddit.',
  },
  {
    slug: "finish-line-geofence",
    term: "Finish-line geofence",
    short:
      "A circular zone on the map that auto-detects when a rider crosses the finish line.",
    body: 'A finish-line geofence is a virtual circle (a latitude/longitude point plus a radius — typically 25-100 metres) that the organiser drops on the map at the finish line. When a rider\'s GPS ping lands inside that circle, the platform auto-marks them as finished — no chip mat, no manual confirmation. Aster\'s geofence triggers a finish timestamp, freezes the rider\'s position on the leaderboard, broadcasts a "race_finished" event to the rider\'s watchers, and (optionally) pushes the ride to Strava. Removes the entire chip-on-the-line logistics layer for organisers who don\'t need millisecond-precision timing.',
  },
  {
    slug: "free-ride",
    term: "Free Ride",
    short:
      "Standalone tracking for any ride not tied to an event — solo training, group spins, recces.",
    body: "Free Ride is Aster's mode for tracking any ride that isn't part of an event you've entered. Solo training, group ride, recce, gravel commute, anything. Same GPS tracking, same watch-link sharing as race events, no event entry needed. Free for athletes, always. Each Free Ride generates a unique share link the rider can send to anyone — no app install needed for the watcher, no 3-contact cap like Strava Beacon or Garmin LiveTrack. Crash detection runs in the background as an auto-SOS safety net.",
  },
  {
    slug: "gravel-racing",
    term: "Gravel racing",
    short:
      "Off-road cycling racing on unpaved surfaces (gravel, dirt, fire road) with road-bike-derived equipment.",
    body: "Gravel racing is the off-road branch of cycling racing that runs on unpaved surfaces — gravel roads, fire roads, jeep tracks, occasional singletrack — using drop-bar bikes derived from road frames but with wider tyres and more clearance. The sport boomed in the late-2010s and early-2020s with US events like Unbound Gravel (Kansas, 200 miles, oversubscribed lottery), SBT GRVL (Steamboat Springs), and Big Sugar (Bentonville), plus European races like The Traka (Girona), Dirty Reiver (Northumberland), and the UCI Gravel World Series. Distinct from cyclocross (shorter, more technical, multi-lap) and mountain biking (more singletrack, suspension).",
  },
  {
    slug: "leaderboard-gap",
    term: "Leaderboard gap",
    short:
      "The real-time distance or time difference between a rider and the rider ahead.",
    body: 'A leaderboard gap is the live distance or time separation between two riders on the same event. Aster shows route-distance gaps ("Rider B is 2.3 km behind Rider A") rather than last-checkpoint splits, because the latter goes stale the moment a rider passes a checkpoint and only updates on the next one. The route-distance approach uses the current GPS pings of both riders, snapped to the route polyline, to compute the gap right now. Critical for the mid-race storytelling moments — "the gap is closing" / "the leader is pulling away" — that make races worth watching live.',
  },
  {
    slug: "off-route-detection",
    term: "Off-route detection",
    short:
      "Auto-detection when a rider deviates from the planned course beyond a configurable threshold.",
    body: "Off-route detection compares a rider's GPS position against the event's planned route polyline. When the rider drifts beyond a configurable distance (Aster default: 100 metres) from the route, the platform raises an off-route alert. Usually a navigation mistake at a junction or a deliberate detour for a feed station; occasionally a rider is genuinely lost. Aster surfaces the alert in the organiser dashboard and (configurably) to the rider's phone. The threshold is per-event so a singletrack mountain bike course with looser GPS lock doesn't false-positive against a road race where 100m off-route is meaningful.",
  },
  {
    slug: "point-to-point-adventure",
    term: "Point-to-point adventure",
    short:
      "A self-supported ride from A to B with no prescribed route — riders pick their own line.",
    body: 'Point-to-point adventure (Aster\'s display label for the underlying "Grand Départ" event type) is a ride format where the organiser sets a start, a finish, and optionally a few checkpoints — but no prescribed route between them. Riders pick their own line, navigate independently, and arrive in their own time. The format covers ultra-endurance bikepacking ("from this car park to that pub, 800 km, see you in a few days") down to weekend club outings. Distinct from races (mass-start, GPX-defined) and time trials (GPX-defined, rolling start).',
  },
  {
    slug: "sos-chat",
    term: "SOS chat",
    short:
      "Two-way messaging between a rider in distress and the event organiser, audit-trailed.",
    body: "SOS chat is the safety-critical messaging channel between a rider who's triggered an SOS alert and the event organiser. On Aster, SOS is triggered by the rider tapping a big red button (4-digit confirmation code to prevent pocket-taps) or via auto-SOS from crash detection in Free Ride mode. The organiser dashboard lights up with the rider's last position; chat opens for both sides. Every message in the channel is audit-trailed to the event's safety record. Resolves into one of four states: false_alarm, responding, resolved, or escalated to emergency services.",
  },
  {
    slug: "tracker-page",
    term: "Tracker page",
    short:
      "The public page where watchers follow a live race in real time.",
    body: 'A tracker page is the public-facing surface where watchers follow a live race or ride in real time. On Aster, each event has its own tracker page showing the route map, live rider positions, a real-time leaderboard with route-distance gaps, push notifications when riders start / pass checkpoints / finish, and a story feed for race recaps and updates. No app install required — opens in any browser, mobile or desktop. Free Ride mode generates a shareable tracker page per ride.',
  },
  {
    slug: "watch-link",
    term: "Watch link",
    short:
      "A shareable URL that lets anyone follow a rider live without installing an app.",
    body: "A watch link is a unique URL Aster generates for a Free Ride or event participation that the rider can share with anyone — family, friends, club members, sponsors, anyone — and have them follow the rider live in their browser. No app install for the watcher, no account creation, no 3-contact cap (Strava Beacon, Garmin LiveTrack, Wahoo Companion all cap at ~3 contacts; Aster has no cap). Watch links are revocable by the rider and expire when the ride ends (live) but persist as the ride's public archive.",
  },
];

const sorted = [...TERMS].sort((a, b) => a.term.localeCompare(b.term));

/* DefinedTermSet JSON-LD — marks this content as glossary-shaped for
 * definition-style rich results. Anchors match the on-page ids. */
const glossaryJsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Aster — live tracking + endurance cycling glossary",
  url: "https://astertrack.app/glossary",
  hasDefinedTerm: sorted.map((t) => ({
    "@type": "DefinedTerm",
    "@id": `https://astertrack.app/glossary#${t.slug}`,
    name: t.term,
    description: t.short,
    url: `https://astertrack.app/glossary#${t.slug}`,
    inDefinedTermSet: "https://astertrack.app/glossary",
  })),
};

export default function GlossaryPage() {
  return (
    <>
      <SiteNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryJsonLd) }}
      />
      <main>
        {/* Hero */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={2} />
          <div className="relative z-10 text-center">
            <Kicker tone="dark">Glossary</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(40px,7vw,72px)] text-mint mt-3 mb-4">
              The language of
              <br />
              <span className="text-lime">live tracking.</span>
            </h1>
            <p className="text-lg leading-normal text-mint/70 max-w-[56ch] mx-auto">
              Plain-language definitions of the terms used in live tracking and
              endurance cycling. Linkable, citable, evergreen.
            </p>
          </div>
        </Section>

        {/* Quick-jump index — alphabetical chip row */}
        <Section tone="stone">
          <div className="max-w-[880px] mx-auto">
            <Kicker className="text-center">Jump to a term</Kicker>
            <div className="flex flex-wrap gap-2 justify-center">
              {sorted.map((t) => (
                <a
                  key={t.slug}
                  href={`#${t.slug}`}
                  className="px-3 py-1.5 rounded-xl border-2 border-dark/15 bg-white text-sm text-dark hover:bg-lime-bg hover:border-dark transition-colors"
                >
                  {t.term}
                </a>
              ))}
            </div>
          </div>
        </Section>

        {/* Term list */}
        <Section tone="white">
          <div className="max-w-[760px] mx-auto space-y-10">
            {sorted.map((t) => (
              <article key={t.slug} id={t.slug} className="scroll-mt-24">
                <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1] text-[clamp(26px,3.6vw,36px)] text-dark mb-2">
                  {t.term}
                </h2>
                <p className="text-lg leading-normal text-dark/80 font-medium mb-3">
                  {t.short}
                </p>
                <p className="text-[15px] leading-relaxed text-dark/75 m-0">
                  {t.body}
                </p>
              </article>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={1} flip />
          <div className="relative z-10 text-center">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,5vw,48px)] text-mint mb-4">
              Want to put your race on Aster?
            </h2>
            <p className="text-lg leading-normal text-mint/70 max-w-[48ch] mx-auto mb-8">
              We&rsquo;ll walk through your race, the dashboard, and what a
              launch on Aster would look like.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="/for-organisers">For race organisers</Button>
              <Button href="/resources" variant="secondary">
                Long-form guides
              </Button>
              <Button href="/faq" variant="secondary">
                Read the FAQ
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
