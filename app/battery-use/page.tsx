import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import RouteMotif from "@/components/RouteMotif";
import BatteryCalculator from "./BatteryCalculator";

export const metadata: Metadata = {
  title: "Battery use — how long does live tracking last?",
  description:
    "Interactive battery forecaster for Aster's GPS tracking. See exactly how many hours your phone gets in each mode, with or without auto-fallback.",
  alternates: { canonical: "/battery-use" },
};

/* Ported from the original astertrack.app/battery-use page. Honest
 * technical content — the burn rates, the fallback ladder, and the
 * practical tips are kept verbatim in substance. */
export default function BatteryUsePage() {
  return (
    <>
      <SiteNav />
      <main>
        {/* Hero — the calculator IS the page; everything else is framing. */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={1} />
          <div className="relative z-10 text-center">
            <Kicker tone="dark">Battery forecaster</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(40px,7vw,72px)] text-mint mt-3 mb-4">
              How long will
              <br />
              <span className="text-lime">your phone last?</span>
            </h1>
            <p className="text-lg leading-normal text-mint/70 max-w-[52ch] mx-auto">
              Aster uses your phone&rsquo;s GPS for hours. Set your starting
              battery, pick a mode, and see exactly how long tracking lasts —
              all four modes, with or without auto-fallback.
            </p>
          </div>
        </Section>

        {/* The widget */}
        <Section tone="stone">
          <div className="max-w-[720px] mx-auto">
            <BatteryCalculator />
          </div>
        </Section>

        {/* Explainer — the four modes in detail */}
        <Section tone="white">
          <div className="max-w-[720px] mx-auto">
            <Kicker>How the ladder works</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(28px,4vw,40px)] text-dark mb-8">
              Four modes. One ladder. No fiddling.
            </h2>
            <div className="space-y-5 text-[16px] leading-relaxed text-dark/85">
              <p>
                Aster has four battery modes, each with a different GPS sample
                rate and upload cadence. The default — <strong>Live</strong> —
                gives spectators the smoothest tracking at the cost of the
                fastest battery drain. The other three tiers progressively slow
                GPS sampling to extend tracking life.
              </p>
              <p>
                You pick a starting mode when you tap Start. Most riders leave
                it on Live — that&rsquo;s the right call for races up to ~2
                hours. For longer rides, the app&rsquo;s{" "}
                <strong>auto-fallback</strong> takes over: at 30% battery it
                drops you one tier (Live → Standard), at 15% another (Standard
                → Endurance), at 8% the final step to Ultra. A small banner
                pops up each time so you know.
              </p>
              <p>
                You can also turn auto-fallback off and stay locked to your
                chosen mode for the whole ride — useful if you&rsquo;ve picked
                Endurance from the start and don&rsquo;t want any surprises.
                The calculator above lets you model both: pick a scenario pill
                to see &ldquo;Auto&rdquo; (the cascade) or
                &ldquo;Live/Standard/Endurance/Ultra&rdquo; (locked) durations.
              </p>
            </div>
          </div>
        </Section>

        {/* Practical tips */}
        <Section tone="stone">
          <div className="max-w-[720px] mx-auto">
            <Kicker>Other ways to stretch your battery</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(28px,4vw,40px)] text-dark mb-8">
              Low-effort wins.
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-[16px] leading-relaxed text-dark/85">
              <li>
                <strong>Lock the screen</strong> when you&rsquo;re not checking
                it — the display is the single biggest battery drain after GPS.
              </li>
              <li>
                <strong>Drop screen brightness</strong> if you do leave it on.
              </li>
              <li>
                <strong>Close other apps</strong> before the start — Spotify,
                Strava, navigation apps all compound the drain.
              </li>
              <li>
                <strong>Keep the phone out of direct sun</strong> if possible —
                heat reduces battery efficiency significantly.
              </li>
              <li>
                <strong>Bring a battery pack</strong> for multi-hour rides. A
                5,000 mAh pack weighs almost nothing and is cheap insurance.
              </li>
              <li>
                <strong>Charge while you ride</strong> if your phone is
                bar-mounted near a power bank — some riders swear by it for
                ultra-distance days.
              </li>
              <li>
                <strong>Don&rsquo;t use airplane mode.</strong> Aster needs a
                data connection to upload positions — airplane mode means your
                spectators see a frozen position the whole time.
              </li>
            </ul>
          </div>
        </Section>

        {/* Soft link back for cold visitors who landed here directly */}
        <Section tone="white">
          <div className="max-w-[720px] mx-auto text-center">
            <p className="text-sm text-dark/60 m-0">
              <a href="/" className="underline hover:text-dark">
                See what Aster is
              </a>{" "}
              <span aria-hidden>·</span>{" "}
              <a href="/faq" className="underline hover:text-dark">
                Read the FAQ
              </a>
            </p>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
