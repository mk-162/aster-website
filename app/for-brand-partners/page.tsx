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
  title: "For brand partners — sponsor the live experience",
  description:
    "Put your brand on the live map, leaderboard and replay of races, rides and runs — in front of an audience already watching. One sponsor slot pays for the event, with a post-event impressions report to prove it.",
  alternates: { canonical: "/for-brand-partners" },
};

/* ---- Copy: sponsorship / brand audience. Ported from the app's
 * ForBrandPartners page, sport-neutral, honest about what's measured.
 * No hardcoded prices; sponsor inventory sits inside organiser plans. ---- */

const surfaces = [
  {
    kicker: "The live map",
    title: "Your name where the watching happens.",
    body: "A sponsor slot on the live map and leaderboard — the surface every watcher is already glued to for the full duration of the event. Not banner-ad real estate bolted on the side; a placement on the screen that already has their attention.",
  },
  {
    kicker: "The replay",
    title: "Present the moments that outlive race day.",
    body: "Every tracked ride and run becomes a replay — the route, the gaps, the moves. Athletes share them for weeks afterwards, and your slot travels with each one. The audience keeps growing after the finish line.",
  },
  {
    kicker: "The leaderboard",
    title: "Front and centre, all event long.",
    body: "The live standings are the thing people refresh. A leaderboard placement sits with them the whole way — through the early break, the chase, and the finish — in front of family, clubmates, and fans following live.",
  },
  {
    kicker: "The report",
    title: "Proof, not a promise.",
    body: "After the event, a sponsor impressions report: watchers, watcher-minutes, and where your slot appeared. Honest numbers on a real audience — the evidence a sponsor renews on, and the thing broadcast sponsorship could never itemise.",
  },
];

const honesty = [
  "We report what we can actually measure — watchers and watcher-minutes on the surfaces your slot appeared on. No invented reach, no programmatic make-believe.",
  "We don't sponsor the SOS or safety surfaces. They stay uncommercial by design.",
  "No interstitials, pop-ups, or sponsored push notifications. The audience didn't opt in to be sold to, and the watching experience is the product.",
  "One slot per surface, sold by the organiser. Curated placement, not an auction.",
];

export default function ForBrandPartners() {
  return (
    <>
      <SiteNav />
      <main>
        {/* ---- Hero ---- */}
        <section className="relative overflow-hidden bg-dark text-mint border-b-2 border-dark">
          <Image
            src="/images/cycling/brands.webp"
            alt=""
            fill
            priority
            className="object-cover object-[center_35%] opacity-50"
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
            <Kicker tone="dark">For brand partners</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.92] text-mint text-[clamp(46px,6vw,88px)] mb-6 max-w-[15ch] text-balance">
              The live race is the audience. Be in it.
            </h1>
            <p className="text-[clamp(18px,1.6vw,21px)] leading-normal text-mint/85 max-w-[48ch] mb-9">
              A sponsor slot on the live map, the leaderboard, and the replay of
              races, rides and runs — in front of an audience that's already
              watching, mile by mile, for hours. Part of the experience, not an
              interruption to it.
            </p>
            <div className="flex gap-3.5 flex-wrap items-center">
              <Button href={appLinks.organiserDemo} variant="primary">
                Start a conversation
              </Button>
              <Button href={appLinks.discover} variant="secondary">
                Watch a live event — no signup
              </Button>
            </div>
          </div>
        </section>

        {/* ---- The premise ---- */}
        <Section tone="stone" className="!overflow-hidden">
          <RouteMotif tone="light" variant={2} flip />
          <div className="relative z-10">
            <Kicker>The premise</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
              Most sponsorship is a logo nobody sees.
            </h2>
            <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-4">
              The marquee races are televised. The rest — the gravel weekends,
              the regional road races, the trail ultras, the club runs — happen
              out of sight of the cameras the old sponsorship model is priced
              against. A name on a jersey nobody watches.
            </p>
            <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-4">
              But those are exactly the events people follow live: family, fans,
              clubmates, glued to a live map for hours. A present, attentive,
              in-the-moment audience — and until Aster there was no way to be in
              front of them.
            </p>
            <p className="text-lg leading-normal text-dark font-medium max-w-[56ch]">
              Aster makes that audience addressable, and measurable, for the
              first time.
            </p>
          </div>
        </Section>

        {/* ---- The surfaces ---- */}
        <Section tone="white">
          <Kicker>The inventory</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
            Where your brand actually shows up.
          </h2>
          <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-10">
            Real placement on the surfaces watchers already have open — the live
            map, the leaderboard, and the replay that keeps travelling after the
            event ends.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {surfaces.map((s) => (
              <Card key={s.title}>
                <p className="font-condensed uppercase tracking-wide text-xs text-lime-deep mb-2">
                  {s.kicker}
                </p>
                <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-dark mb-1">
                  {s.title}
                </p>
                <p className="text-[15px] leading-normal text-dark/70 m-0">
                  {s.body}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        {/* ---- What watchers see ---- */}
        <Section tone="dark">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <Kicker tone="dark">The audience</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-4 text-mint">
                No login. No app. Just the link.
              </h2>
              <p className="text-lg leading-normal text-mint/70 max-w-[46ch] mb-7">
                Anyone can open an event's link and follow the whole field live —
                no account, no install, no paywall. Every family, club, and fan
                base does the rest. Your slot sits on the surface they're all
                watching — this one:
              </p>
              <Button href={appLinks.discover} variant="primary">
                Watch a live event — no signup
              </Button>
            </div>
            <BrowserFrame
              src="/images/app/live-map-desktop.webp"
              alt="The Aster spectator view of a live event: map with athlete dots and route, plus the live leaderboard where a sponsor slot sits"
              url="astertrack.app/watch/your-event"
              videoSrc="/images/app/replay-desktop.mp4"
              poster="/images/app/replay-desktop-poster.webp"
            />
          </div>
        </Section>

        {/* ---- The maths ---- */}
        <Section tone="stone">
          <Kicker>The maths &middot; Short</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
            One sponsor slot pays for the event.
          </h2>
          <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-10">
            The economics are the pitch. A single map or leaderboard slot,
            sold to a brand already speaking to these athletes, covers the
            organiser's cost of running the event on Aster — with a post-event
            impressions report to justify the renewal. Good for the organiser,
            good for the brand, honest for everyone.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-dark mb-1">
                Slots on the surfaces that matter.
              </p>
              <p className="text-[15px] leading-normal text-dark/70 m-0">
                Map and leaderboard placements, in front of every watcher for
                the full duration — plus the replay afterwards.
              </p>
            </Card>
            <Card>
              <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-dark mb-1">
                An impressions report to renew on.
              </p>
              <p className="text-[15px] leading-normal text-dark/70 m-0">
                Watchers and watcher-minutes after the event — real numbers on a
                real audience, itemised by the surface you appeared on.
              </p>
            </Card>
            <Card tone="dark" className="!shadow-pop-lime">
              <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-mint mb-1">
                Included, not a separate tier.
              </p>
              <p className="text-[15px] leading-normal text-mint/70 m-0">
                Sponsor inventory ships inside the organiser plans — see the
                pricing for how the bands work.
              </p>
            </Card>
          </div>
        </Section>

        {/* ---- Honesty / what we won't do ---- */}
        <Section tone="white">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <Kicker>Honest about it</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-4 text-dark">
                What we measure — and what we won't do.
              </h2>
              <p className="text-lg leading-normal text-dark/70 max-w-[46ch] mb-7">
                The integrity of the watching experience is the product. There's
                nothing worth sponsoring if we trash it, so the discipline is
                part of the offer, not a caveat on it.
              </p>
              <div className="flex gap-3.5 flex-wrap items-center">
                <Button href={appLinks.organiserDemo} variant="primary">
                  Start a conversation
                </Button>
                <Button href="/pricing" variant="secondary">
                  See plans and pricing
                </Button>
              </div>
            </div>
            <Card tone="dark" className="!shadow-pop-lime">
              <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-xl text-mint mb-3">
                The ground rules.
              </p>
              <ul className="m-0 p-0 list-none grid gap-3 text-[15px] leading-normal text-mint/80">
                {honesty.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="text-lime font-bold mt-0.5 flex-shrink-0">
                      &rarr;
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>

        {/* ---- Final CTA ---- */}
        <section className="relative overflow-hidden bg-dark text-mint text-center">
          <RouteMotif tone="dark" variant={1} flip />
          <div className="relative z-10 container-site py-16 md:py-24 max-w-[900px] mx-auto">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] text-[clamp(34px,5vw,60px)] mb-3.5 text-mint">
              Let's talk about a partnership.
            </h2>
            <p className="text-[19px] text-mint/70 max-w-[44ch] mx-auto mb-8">
              A slot on the live experience, in front of an audience that's
              already watching, with numbers to prove it. Tell us who you want to
              reach and we'll show you what it looks like on race day.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <Button href={appLinks.organiserDemo} variant="primary">
                Start a conversation
              </Button>
              <Button href={appLinks.discover} variant="secondary">
                Watch a live event — no signup
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
