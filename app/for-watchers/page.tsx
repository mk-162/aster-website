import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Card from "@/components/Card";
import PhoneFrame from "@/components/PhoneFrame";
import RouteMotif from "@/components/RouteMotif";
import { appLinks } from "@/lib/links";

export const metadata: Metadata = {
  title: "For watchers — follow someone you love, live",
  description:
    "They share their live track; you open one link in any browser. Follow the whole race — positions, gaps, checkpoints, the finish — with no app and no account.",
  alternates: { canonical: "/for-watchers" },
};

/* ---- Copy: the people at home. Tracking + sharing framing — they share
 * their live track with you; you just open the link. ---- */

const steps = [
  {
    n: "01",
    title: "They send you the link.",
    body: "One link is the whole setup. They start tracking, share their live track with you, and that's it — no invites to accept, no app to install, no account to make.",
  },
  {
    n: "02",
    title: "You open it anywhere.",
    body: "Any browser on any device — the phone in your hand, the laptop in the kitchen, the telly if you're feeling ceremonial. It just works.",
  },
  {
    n: "03",
    title: "You watch it happen.",
    body: "Live position on the map, the trail so far, gaps to the riders around them, and the moment they cross the line. You're there for all of it.",
    dark: true,
  },
];

const raceDay = [
  {
    title: "The leaderboard, live.",
    body: "Where they sit in the field right now — not where they were at the last checkpoint, an hour of worrying ago.",
  },
  {
    title: "The gaps, as they change.",
    body: "Thirty seconds down to the group ahead and closing. Watching a chase unfold live is more fun than any results page has ever been.",
  },
  {
    title: "Checkpoints and splits.",
    body: "Every checkpoint they clear, with times. You'll know they went through CP3 before they've had a chance to text you.",
  },
];

export default function ForWatchers() {
  return (
    <>
      <SiteNav />
      <main>
        {/* ---- Hero: dark + route motif, pure emotion ---- */}
        <section className="relative overflow-hidden bg-dark text-mint border-b-2 border-dark">
          <RouteMotif tone="dark" variant={2} />
          <div className="relative z-10 container-site py-20 md:py-28">
            <Kicker tone="dark">For watchers · No app · No account</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.92] text-mint text-[clamp(46px,6vw,88px)] mb-6 max-w-[18ch] text-balance">
              Someone you love is out there.{" "}
              <span className="text-lime">Be there too.</span>
            </h1>
            <p className="text-[clamp(18px,1.6vw,21px)] leading-normal text-mint/85 max-w-[48ch] mb-9">
              When they share their live track with you, the long silence of
              race day is over. You see them moving. You see them climbing.
              You see them coming home. One link, any browser — and
              you&apos;re with them the whole way.
            </p>
            <div className="flex gap-3.5 flex-wrap items-center">
              <Button href={appLinks.discover} variant="primary">
                Watch a live event — no signup
              </Button>
              <Button href="/for-athletes" variant="secondary">
                Riding or running yourself?
              </Button>
            </div>
          </div>
        </section>

        {/* ---- How following works ---- */}
        <Section tone="stone">
          <Kicker>How following works</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-10 text-dark">
            Three steps. One of them is theirs.
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <Card
                key={s.n}
                tone={s.dark ? "dark" : "white"}
                className={s.dark ? "!shadow-pop-lime" : ""}
              >
                <span
                  className={`font-condensed font-bold text-4xl leading-none ${
                    s.dark ? "text-lime" : "text-lime-deep"
                  }`}
                >
                  {s.n}
                </span>
                <p
                  className={`font-condensed uppercase font-bold text-xl mt-3 mb-2 ${
                    s.dark ? "text-mint" : "text-dark"
                  }`}
                >
                  {s.title}
                </p>
                <p
                  className={`text-[15px] leading-normal m-0 ${
                    s.dark ? "text-mint/70" : "text-dark/70"
                  }`}
                >
                  {s.body}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        {/* ---- Race day ---- */}
        <Section tone="white">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <Kicker>Race day</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-4 text-dark">
                Better than being in the team car.
              </h2>
              <p className="text-lg leading-normal text-dark/70 max-w-[48ch] mb-8">
                You don&apos;t just get a position on a map. You get the whole
                race — who&apos;s where, who&apos;s chasing, who&apos;s about
                to be caught. Fair warning: it&apos;s quite hard to put down.
              </p>
              <div className="grid gap-4">
                {raceDay.map((r) => (
                  <Card key={r.title}>
                    <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-dark mb-1">
                      {r.title}
                    </p>
                    <p className="text-[15px] leading-normal text-dark/70 m-0">
                      {r.body}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
            <PhoneFrame
              src="/images/app/live-map-phone.webp"
              alt="The live race on a phone: rider dots moving along the route as the field spreads out"
              className="max-w-[280px] md:max-w-[320px] mx-auto"
              videoSrc="/images/app/replay-phone.mp4"
              poster="/images/app/replay-phone-poster.webp"
            />
          </div>
        </Section>

        {/* ---- For the long ones (ultras) ---- */}
        <Section tone="photo" photoSrc="/images/running-holding/r2-transylvania.jpg">
          <div className="max-w-[640px]">
            <Kicker tone="dark">For the long ones</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-4 text-mint">
              2 a.m. is easier when you can see them.
            </h2>
            <p className="text-lg leading-normal text-mint/80 max-w-[46ch] mb-4">
              Ultras run through the night, and the night is the hard part —
              for them out there, and for you at home. On the live map the
              overnight sections aren&apos;t a blank: you see them ticking
              along the ridge, pausing at an aid station, moving again.
            </p>
            <p className="text-lg leading-normal text-mint/80 max-w-[46ch] mb-7">
              Moving again is the best thing a map has ever told anyone. Put
              the kettle on. They&apos;re fine.
            </p>
            <Button href={appLinks.discover} variant="primary">
              Watch a live event — no signup
            </Button>
          </div>
        </Section>

        {/* ---- Final CTA ---- */}
        <section className="relative overflow-hidden bg-dark text-mint text-center">
          <RouteMotif tone="dark" variant={1} flip />
          <div className="relative z-10 container-site py-16 md:py-24 max-w-[900px] mx-auto">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] text-[clamp(34px,5vw,60px)] mb-3.5 text-mint">
              See what watching feels like.
            </h2>
            <p className="text-[19px] text-mint/70 max-w-[44ch] mx-auto mb-8">
              Open a live event right now — no app, no account, no signup.
              And if you&apos;re the one doing the miles, tracking is free
              forever.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <Button href={appLinks.discover} variant="primary">
                Watch a live event — no signup
              </Button>
              <Button href="/for-athletes" variant="secondary">
                Riding or running yourself?
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
