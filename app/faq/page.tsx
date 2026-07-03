import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Button from "@/components/Button";
import RouteMotif from "@/components/RouteMotif";

export const metadata: Metadata = {
  title: "FAQ — live tracking questions answered",
  description:
    "Common questions answered: what Aster is, how it compares to Trackleaders, RaceMap and Strava Beacon, pricing, set-up, and how phone tracking works in dead zones.",
  alternates: { canonical: "/faq" },
};

/* ------------------------------------------------------------------ */
/* Q&A content — ported from the original astertrack.app/faq page.     */
/* Grouped into 5 categories for readability; the JSON-LD treats them  */
/* as a single FAQPage with all questions flat (schema.org spec).      */
/* Pricing answers reflect the current model (see /pricing + /press):  */
/* athletes and watchers free forever; clubs and organisers subscribe. */
/* ------------------------------------------------------------------ */

interface QA {
  question: string;
  answer: string;
}
interface Group {
  heading: string;
  items: QA[];
}

const QUESTIONS: Group[] = [
  {
    heading: "What is Aster?",
    items: [
      {
        question: "What is Aster?",
        answer:
          "Aster is a phone-first live tracking and sharing platform for endurance cycling — races, group rides, and point-to-point adventures. Athletes carry their phone (no hardware to ship), watchers get a link to a live map, and organisers get a dashboard. iOS, Android, and web.",
      },
      {
        question: "Who is Aster for?",
        answer:
          "Five audiences run on one platform: athletes (race + train), watchers (friends, family, fans), teams (clubs to pro programmes), organisers (race directors), and brand partners (sponsors looking for editorial alignment). Built primarily around the 95% of bike races that have never had live tracking because hardware was out of reach.",
      },
      {
        question: 'What is "dot watching"?',
        answer:
          "Dot watching is the community's term for following live GPS positions on a map during ultra-endurance bike races — bikepacking events like Tour Divide, Trans Am, the Atlas Mountain Race. It started as a subculture around Trackleaders' bikepacking coverage and has grown into the mainstream of endurance cycling spectatorship. Aster is built to bring that experience to every race, not just the marquee 5%.",
      },
      {
        question: "How is Aster different from Strava?",
        answer:
          "Strava is a training-log and segment-leaderboard product. Strava Beacon (the live-share feature) is capped at 3 contacts and treated as a safety ping for family. Aster is a live tracking and sharing platform — unlimited watchers, real-time leaderboard, organiser dashboard, race-event infrastructure. Different product, different category. We integrate with Strava for post-ride push when a rider finishes.",
      },
    ],
  },
  {
    heading: "For race organisers",
    items: [
      {
        question: "How does Aster compare to Trackleaders?",
        answer:
          "Trackleaders runs on hardware satellite trackers (Spot Gen 4, Garmin inReach, Zoleo) shipped to each rider. Aster uses the rider's phone — no hardware to ship, recover, or replace.",
      },
      {
        question: "How does Aster compare to RaceMap?",
        answer:
          "RaceMap is a B2B SaaS with per-map-activation pricing plus per-tracker SIM fees, used mostly by larger European events. Aster is phone-first with a simple organiser subscription, plus an editorial layer (story feed, race recaps, athlete profiles) baked in.",
      },
      {
        question: "What does it cost to put a race on Aster?",
        answer:
          "Athletes and watchers never pay — tracking and spectating are free, forever. Organisers pay a simple subscription sized to their event, which replaces the hardware line on the budget with one bill: live tracking, leaderboards, and sponsor inventory included. No per-rider hardware cost, no platform fee on your entries. See the pricing page for current plans.",
      },
      {
        question: "How long does it take to set up?",
        answer:
          "Under an hour for a typical race. Create an organiser account, upload your GPX route, set the start/finish line lat/lon and radius, share the watch link. We're on the phone with organisers for the race-day of their first event as a baseline service.",
      },
      {
        question: "Does Aster work with my timing system?",
        answer:
          "Yes. Aster sits alongside RaceResult, MyLaps, ChronoTrack, or chip-on-the-line — we handle the live tracking and watcher experience; your timing partner handles the official splits. Most organisers run both.",
      },
      {
        question: "Can I embed the tracker on my own event website?",
        answer:
          "Yes — the watch link is embeddable as a widget on your event site, so your domain stays the canonical destination and Aster powers the live tracking surface.",
      },
    ],
  },
  {
    heading: "For athletes",
    items: [
      {
        question: "Do my watchers need to install an app?",
        answer:
          "No. The watcher experience is web-first — your friends and family open a link in any browser (phone or desktop) and see your live position. No app install, no account creation, no friction.",
      },
      {
        question: "How many people can watch my ride?",
        answer:
          "Unlimited. Strava Beacon, Garmin LiveTrack, and Wahoo Companion cap at ~3 contacts. Aster has no limit — share the link with your whole family, your club channel, your sponsors, anyone.",
      },
      {
        question: "Does it work in dead zones?",
        answer:
          "Yes. Pings queue on-device for up to 7 days and upload automatically when signal returns. If you ride into a dead zone, the live line pauses on the map; when you come out the other side, it picks up where you left off — without losing the offline section.",
      },
      {
        question: "Is there a Free Ride mode?",
        answer:
          "Yes. Free Ride is for any ride that isn't part of an event — solo training, group spins, recces, exploring. Same tracking, same watcher link, no event registration needed. Free for riders, always.",
      },
      {
        question: "What about safety / SOS?",
        answer:
          "Tap the big red SOS button (4-digit confirmation code to prevent pocket-taps), and the organiser dashboard lights up with your position. Two-way chat for the organiser to talk to you. Auto-SOS via crash detection in Free Ride mode. The whole flow audit-trails to event records.",
      },
    ],
  },
  {
    heading: "How the product works",
    items: [
      {
        question: "Does phone GPS work as well as a dedicated bike computer?",
        answer:
          "For modern phones, yes. iPhone 14+ and recent Android flagships use multi-band GNSS (L1 + L5) which matches Garmin and Wahoo bike computers for accuracy. The bottleneck for tracking in remote terrain is signal upload, not GPS lock — and Aster's offline ping queue handles that.",
      },
      {
        question: "What happens if my phone battery dies mid-ride?",
        answer:
          "Tracking stops when the battery does. Aster runs in background-low-power mode by default to extend battery life (target: a 12-hour ride on an 80% start charge). Long-distance bikepackers should bring a power bank — same as they would for any phone-dependent ride. If the battery dies and the rider charges later, the on-device buffer uploads on app reopen, so the polyline shows what they did even if the live feed went dark.",
      },
      {
        question: "What about the persistent notification while tracking?",
        answer:
          'iOS and Android both require a visible notification when an app is using GPS in the background. The notification is informational only — it says "still tracking, X km" — and crucially has no "Stop" button. Pocket-taps on the lock screen cannot end a ride.',
      },
      {
        question: "What's the Aster Free Ride model exactly?",
        answer:
          "A standalone ride not associated with any event. Start, ride, stop. Generates a watch link you can share with anyone. Stats, polyline, photos all attach to a personal ride record. Push to Strava on finish if you connect Strava. Crash detection runs in the background as an auto-SOS safety net.",
      },
    ],
  },
  {
    heading: "About the company",
    items: [
      {
        question: "Who built Aster?",
        answer:
          "James Vickers — 15 years in cycling industry marketing. Co-founder of RGT Cycling (acquired by Wahoo Fitness in 2022). Previously: Wahoo, Classified Cycling, current Marketing Consultant at Ribble Cycles. Aster is built solo with AI agent orchestration handling engineering, content, and operations.",
      },
      {
        question: "Where is Aster based?",
        answer:
          "United Kingdom (Manual Focus Ltd). Operating globally — first marquee gravel events targeted for spring 2027 across the UK, EU, and US.",
      },
      {
        question: "Is Aster open-source?",
        answer:
          "No. The platform is proprietary. We publish technical writing and architecture decisions openly via our docs and blog, but the codebase itself is closed.",
      },
      {
        question: "Are you raising money?",
        answer:
          "Yes — a £400–600k UK pre-seed, SEIS + EIS qualified. For investor enquiries, email james@astertrack.app.",
      },
    ],
  },
];

const FLAT_QUESTIONS = QUESTIONS.flatMap((g) => g.items);

/* FAQPage JSON-LD — rich expandable Q&A in the SERP. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FLAT_QUESTIONS.map((qa) => ({
    "@type": "Question",
    name: qa.question,
    acceptedAnswer: { "@type": "Answer", text: qa.answer },
  })),
};

export default function FAQPage() {
  return (
    <>
      <SiteNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main>
        {/* Hero */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={2} />
          <div className="relative z-10 text-center">
            <Kicker tone="dark">Frequently asked</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(40px,7vw,72px)] text-mint mt-3 mb-4">
              Questions,
              <br />
              <span className="text-lime">answered.</span>
            </h1>
            <p className="text-lg leading-normal text-mint/70 max-w-[56ch] mx-auto">
              What Aster is, how it compares, what it costs. Pulled from the
              questions organisers, athletes, and journalists actually ask.
            </p>
          </div>
        </Section>

        {/* Question groups */}
        {QUESTIONS.map((group, gi) => (
          <Section key={group.heading} tone={gi % 2 === 0 ? "white" : "stone"}>
            <div className="max-w-[760px] mx-auto">
              <Kicker>{group.heading}</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(28px,4vw,40px)] text-dark mb-8">
                {group.heading}
              </h2>
              <div className="space-y-4">
                {group.items.map((qa) => (
                  <details
                    key={qa.question}
                    className="group border-2 border-dark rounded-2xl bg-white shadow-pop-1 p-5"
                  >
                    <summary className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-dark cursor-pointer list-none flex items-start justify-between gap-3">
                      <span>{qa.question}</span>
                      <span
                        aria-hidden
                        className="text-lime-deep text-xl leading-none shrink-0 transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="text-[15px] leading-relaxed text-dark/80 mt-3 m-0">
                      {qa.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Section>
        ))}

        {/* CTA */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={1} flip />
          <div className="relative z-10 text-center">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,5vw,48px)] text-mint mb-4">
              Still got a question?
            </h2>
            <p className="text-lg leading-normal text-mint/70 max-w-[48ch] mx-auto mb-8">
              Drop us an email and we&rsquo;ll get back within 24 hours.
            </p>
            <Button href="mailto:hello@astertrack.app?subject=Question%20about%20Aster">
              Email us
            </Button>
            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 justify-center text-sm text-mint/60">
              <a href="/glossary" className="hover:text-mint underline underline-offset-2">
                Glossary of tracking terms →
              </a>
              <span aria-hidden>·</span>
              <a href="/battery-use" className="hover:text-mint underline underline-offset-2">
                Battery use forecaster →
              </a>
              <span aria-hidden>·</span>
              <a href="/pricing" className="hover:text-mint underline underline-offset-2">
                Pricing →
              </a>
              <span aria-hidden>·</span>
              <a href="/about" className="hover:text-mint underline underline-offset-2">
                About Aster →
              </a>
              <span aria-hidden>·</span>
              <a href="/resources" className="hover:text-mint underline underline-offset-2">
                Guides & resources →
              </a>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
