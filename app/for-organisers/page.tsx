import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Card from "@/components/Card";
import BrowserFrame from "@/components/BrowserFrame";
import RouteMotif from "@/components/RouteMotif";
import { appLinks } from "@/lib/links";

export const metadata: Metadata = {
  title: "For organisers — race tracking without hardware",
  description:
    "Professional live tracking for races, rides and runs — live map, leaderboard and finish detection from the phones your athletes already carry. No hardware to ship.",
  alternates: { canonical: "/for-organisers" },
};

/* ---- Copy (per redline 2026-07-02: banded pricing, sponsor fold-in,
 * social content stream, sport-neutral) ---- */

const pitch = [
  {
    title: "No hardware, no returns van.",
    body: "Tracker rental runs £20–£40 a head; chip timing £500–£2,000 an event. Aster does the job from the phone every athlete already carries — nothing to buy, charge, hand out, or chase back at the finish.",
  },
  {
    title: "A live map that fills your next start line.",
    body: "Every watcher glued to your race this year is a potential entrant next year. Positions, gaps, and finishes as they happen — for race control and for everyone at home.",
  },
  {
    title: "Finish detection that runs itself.",
    body: "Athletes are detected crossing the line and the leaderboard updates on its own. No timing crew at the finish, no spreadsheet at midnight.",
  },
  {
    title: "SOS straight to race control.",
    body: "An athlete in trouble sends their live position to you in one tap. Hopefully nobody taps it. If they do, you know exactly where to send help.",
  },
];

const contentStream = [
  {
    title: "Every athlete is a broadcast.",
    body: "The moment someone starts tracking, their people are watching — family, clubmates, fans. Each shared link puts your event in front of an audience you didn't have to buy — and each one is marketing for next year's edition.",
  },
  {
    title: "Finish-line moments, ready to post.",
    body: "Results, finish times, and ride stories are generated from the live data as athletes cross the line — shareable the minute they happen, not next Tuesday.",
  },
  {
    title: "Replays that outlive race day.",
    body: "Every tracked ride becomes a replay — the route, the gaps, the moves. Athletes share them, and every share carries your event's name.",
  },
  {
    title: "A content stream, not a media team.",
    body: "What your athletes share adds up to your event's social feed. You get the aggregated stream — stories, highlights, and moments — without hiring anyone to make it.",
  },
];

export default function ForOrganisers() {
  return (
    <>
      <SiteNav />
      <main>
        {/* ---- Hero ---- */}
        <section className="relative overflow-hidden bg-dark text-mint border-b-2 border-dark">
          <Image
            src="/images/cycling/organisers.webp"
            alt=""
            fill
            priority
            className="object-cover object-[center_30%] opacity-50"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, rgba(24,30,21,0.92) 0%, rgba(24,30,21,0.72) 48%, rgba(24,30,21,0.55) 100%)",
            }}
          />
          <div className="relative container-site py-20 md:py-28">
            <Kicker tone="dark">For organisers</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.92] text-mint text-[clamp(46px,6vw,88px)] mb-6 max-w-[16ch] text-balance">
              Put your race on the map.
            </h1>
            <p className="text-[clamp(18px,1.6vw,21px)] leading-normal text-mint/85 max-w-[46ch] mb-9">
              Live tracking your entrants rave about, a watching audience
              your sponsors pay for, and zero hardware to ship — all from
              the phones your athletes already carry.
            </p>
            <div className="flex gap-3.5 flex-wrap items-center">
              <Button href={appLinks.organiserDemo} variant="primary">
                Tell us about your event
              </Button>
              <Button href={appLinks.discover} variant="secondary">
                Watch a live race — no signup
              </Button>
            </div>
          </div>
        </section>

        {/* ---- The pitch ---- */}
        <Section tone="stone">
          <Kicker>The pitch</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
            The trackers are already in their pockets.
          </h2>
          <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-10">
            Renting trackers means £20–£40 per athlete, a charging table, a
            hand-out queue, and a van chasing units after the finish. Aster
            does the whole job with the phone every athlete already carries —
            for cycling and running events alike. Same live map, none of the
            logistics.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {pitch.map((p) => (
              <Card key={p.title}>
                <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-dark mb-1">
                  {p.title}
                </p>
                <p className="text-[15px] leading-normal text-dark/70 m-0">
                  {p.body}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        {/* ---- Automated social content stream ---- */}
        <Section tone="white">
          <Kicker>Content stream · No media team</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
            Your event makes its own content.
          </h2>
          <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-10">
            Every athlete who tracks generates moments worth sharing — and
            everything they share carries your event with it.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {contentStream.map((c) => (
              <Card key={c.title}>
                <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-dark mb-1">
                  {c.title}
                </p>
                <p className="text-[15px] leading-normal text-dark/70 m-0">
                  {c.body}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        {/* ---- Spectator experience ---- */}
        <Section tone="dark">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <Kicker tone="dark">The watchers</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-4 text-mint">
                No login. No app. Just the link.
              </h2>
              <p className="text-lg leading-normal text-mint/70 max-w-[46ch] mb-7">
                Anyone can open your event&apos;s link and follow the whole
                field live — no account, no install, no paywall. Share it once
                and every family, club, and fan base does the rest. This is
                what they see:
              </p>
              <Button href={appLinks.discover} variant="primary">
                Watch a live race — no signup
              </Button>
            </div>
            <BrowserFrame
              src="/images/app/live-map-desktop.png"
              alt="The Aster spectator view of a live 100-rider race: map with rider dots and route, plus the live leaderboard panel"
              url="astertrack.app/watch/your-event"
            />
          </div>
        </Section>

        {/* ---- Sponsor slots ---- */}
        <Section tone="stone">
          <Kicker>Sponsors · Your inventory</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
            One digital sponsor slot pays for Aster.
          </h2>
          <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-10">
            The live map and leaderboard carry sponsor display slots — and
            they&apos;re yours to sell. One map-banner sale typically covers your
            whole Aster subscription before the gun has even fired. Give your sponsors
            something to point at: their name on the screen every watcher is
            glued to, plus a post-event impressions report to prove it.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-dark mb-1">
                Slots on the surfaces that matter.
              </p>
              <p className="text-[15px] leading-normal text-dark/70 m-0">
                Map banner and leaderboard placements, in front of every
                watcher for the full duration of the event.
              </p>
            </Card>
            <Card>
              <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-dark mb-1">
                An impressions report to sell with.
              </p>
              <p className="text-[15px] leading-normal text-dark/70 m-0">
                After the event, a report of watcher numbers and sponsor
                exposure — the evidence your sponsors renew on. Point your
                sponsors at{" "}
                <a href="/for-brand-partners" className="underline underline-offset-2">
                  how brand partnership works on Aster
                </a>
                .
              </p>
            </Card>
            <Card tone="dark" className="!shadow-pop-lime">
              <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-mint mb-1">
                The maths is short.
              </p>
              <p className="text-[15px] leading-normal text-mint/70 m-0">
                One map banner more than covers your Aster subscription. Included
                in every plan — not a separate tier.
              </p>
            </Card>
          </div>
        </Section>

        {/* ---- Pricing shape (subscription model, v3) ---- */}
        <Section tone="white">
          <Kicker>Pricing</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
            One subscription. Your whole calendar.
          </h2>
          <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-8">
            No per-athlete metering, no per-watcher fees, no per-event
            invoices. An organiser plan includes your events each month —
            pick the size that fits and scale it when your series grows.
            Create any event free and see the whole thing before you go
            live. Compare the price of a plan with £20–£40 per athlete in
            tracker rental, or £500–£2,000 for chip timing — and remember
            one sponsor slot covers it.
          </p>
          <div className="flex gap-3.5 flex-wrap items-center">
            <Button href="/pricing" variant="primary">
              See plans and pricing
            </Button>
            <Button href={appLinks.organiserDemo} variant="secondary">
              Talk to us
            </Button>
          </div>
        </Section>

        {/* ---- Final CTA ---- */}
        <section className="relative overflow-hidden bg-dark text-mint text-center">
          <RouteMotif tone="dark" variant={1} flip />
          <div className="relative z-10 container-site py-16 md:py-24 max-w-[900px] mx-auto">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] text-[clamp(34px,5vw,60px)] mb-3.5 text-mint">
              Put your event on the map.
            </h2>
            <p className="text-[19px] text-mint/70 max-w-[44ch] mx-auto mb-8">
              Fuller start lines, sponsors who renew, and no hardware van.
              Tell us about your event — we&apos;ll show you what race day
              looks like on Aster.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <Button href={appLinks.organiserDemo} variant="primary">
                Tell us about your event
              </Button>
              <Button href={appLinks.discover} variant="secondary">
                Watch a live race — no signup
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
