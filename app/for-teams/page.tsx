import type { Metadata } from "next";
import Image from "next/image";
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
  title: "For teams & clubs — every member on one live map",
  description:
    "Running and cycling clubs on Aster. Weekly rides and runs on a members-only live map, one-tap RSVP, a shared route library, and a club feed that writes itself.",
  alternates: { canonical: "/for-teams" },
};

/* ---- Copy: clubs & teams audience. Ported from the app's ForTeams page,
 * rewritten sport-neutral (ride or run), community-first, no hardcoded
 * prices — clubs are the paid Group plan, sent to /pricing for numbers. ---- */

const problems = [
  {
    title: "The group, scattered by mile ten.",
    body: "Fast group up the road, social group off the back, someone stopped for a puncture nobody clocked. On a club morning the picture lives in a WhatsApp thread that updates whenever people remember to.",
  },
  {
    title: "One route, four versions.",
    body: "A GPX file emailed round, re-shared, edited on Tuesday. By the weekend nobody's sure which file the ride leader actually has.",
  },
  {
    title: "“Who's coming?” every single week.",
    body: "Half the thread is logistics, half is apology. Counting heads at the café is not a plan, and it's certainly not a register.",
  },
  {
    title: "The one who got dropped.",
    body: "Every club has the story. It shouldn't take a headcount at the finish to notice someone's been at the back on their own for twenty minutes.",
  },
];

const capabilities = [
  {
    kicker: "Every session",
    title: "Every member on one live map.",
    body: "Fast group, social group, the late starter — all live on a members-only map. Ride or run together even when you're apart, and the leader can see at a glance that everyone's still moving.",
  },
  {
    kicker: "The library",
    title: "Publish the route once.",
    body: "The club's route library lives on Aster. Push Sunday's route once and it's on every member's phone in a tap, map tiles downloaded for the dead zones. No files, no forwarding, no “which version?”.",
  },
  {
    kicker: "The register",
    title: "One-tap RSVP.",
    body: "Members tap once to say they're in. You roll out knowing who's coming and who to wait for — a real register, not a head-count and a guess.",
  },
  {
    kicker: "The feed",
    title: "The club feed writes itself.",
    body: "Who rode or ran, how far, who made it up the climb — the wrap-up posts to the club feed before the coffee's cold. Families follow any session live from a shared link.",
  },
];

export default function ForTeams() {
  return (
    <>
      <SiteNav />
      <main>
        {/* ---- Hero ---- */}
        <section className="relative overflow-hidden bg-dark text-mint border-b-2 border-dark">
          <Image
            src="/images/cycling/14-peloton-twilight-climb.webp"
            alt=""
            fill
            priority
            className="object-cover object-[center_40%] opacity-50"
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
            <Kicker tone="dark">For clubs &amp; teams &middot; Every week</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.92] text-mint text-[clamp(46px,6vw,88px)] mb-6 max-w-[16ch] text-balance">
              Your club. Live, every session.
            </h1>
            <p className="text-[clamp(18px,1.6vw,21px)] leading-normal text-mint/85 max-w-[48ch] mb-9">
              One link and every member's on one map — the weekly ride, the club
              run, race day. Running clubs and cycling clubs alike get a
              members-only live map, a shared route library, one-tap RSVP, and a
              feed that keeps the club talking between sessions.
            </p>
            <div className="flex gap-3.5 flex-wrap items-center">
              <Button href={appLinks.signup} variant="primary">
                Get your club on Aster
              </Button>
              <Button href={appLinks.organiserDemo} variant="secondary">
                Talk to us
              </Button>
            </div>
          </div>
        </section>

        {/* ---- The problem ---- */}
        <Section tone="stone" className="!overflow-hidden">
          <RouteMotif tone="light" variant={2} flip />
          <div className="relative z-10">
            <Kicker>The club-day problem &middot; Be honest</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
              The session works in spite of the admin.
            </h2>
            <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-10">
              Every club runs on the goodwill of whoever forwards the route,
              chases the RSVPs, and counts heads at the end. The riding and the
              running are brilliant. The plumbing around them is a GPX file and a
              group chat doing jobs neither was built for. Aster puts every
              member on one map — live, with the group around them.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {problems.map((p) => (
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
          </div>
        </Section>

        {/* ---- What the club gets ---- */}
        <Section tone="white">
          <Kicker>What the club gets</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
            Everything the club actually needs.
          </h2>
          <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-10">
            Not a fleet of features nobody asked for — the handful of things that
            make a weekly ride or run easier to run, and the whole club easier to
            belong to.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {capabilities.map((c) => (
              <Card key={c.title}>
                <p className="font-condensed uppercase tracking-wide text-xs text-lime-deep mb-2">
                  {c.kicker}
                </p>
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

        {/* ---- See it working ---- */}
        <Section tone="dark">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <Kicker tone="dark">See it working</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-4 text-mint">
                One map. Everyone on it.
              </h2>
              <p className="text-lg leading-normal text-mint/70 max-w-[46ch] mb-4">
                Who's out, in what order, and the gaps between them — the fast
                group, the social group, and the late starter on one live list.
                The ride leader stops guessing and the whole club rides together
                even when it's strung out across the course.
              </p>
              <p className="text-lg leading-normal text-mint/70 max-w-[46ch] mb-7">
                And when someone's out on their own, an SOS goes to the club in
                one tap — with their live position. Hopefully nobody taps it.
              </p>
              <Button href={appLinks.discover} variant="primary">
                Watch a live session — no signup
              </Button>
            </div>
            <PhoneFrame
              src="/images/app/live-riders-phone.png"
              alt="The Aster live members list: who is out, in what order, and the gaps between them"
              className="max-w-[280px] md:max-w-[320px] mx-auto"
            />
          </div>
        </Section>

        {/* ---- Pricing shape — no hardcoded numbers ---- */}
        <Section tone="stone">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <Kicker>Plans &middot; Sized to the club</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-4 text-dark">
                Clubs get the Group plan.
              </h2>
              <p className="text-lg leading-normal text-dark/70 max-w-[46ch] mb-4">
                Proper clubs — running or cycling — run on the Group plan, banded
                by how many members you have and priced so the committee says yes
                in one meeting. Set it up, see the whole thing, and share it
                before you commit.
              </p>
              <p className="text-lg leading-normal text-dark/70 max-w-[46ch] mb-7">
                Members watch and follow for free, forever. Informal groups of
                riding or running mates stay free too.
              </p>
              <div className="flex gap-3.5 flex-wrap items-center">
                <Button href="/pricing" variant="primary">
                  See plans and pricing
                </Button>
                <Button href="/clubs" variant="secondary">
                  How it works for clubs
                </Button>
              </div>
            </div>
            <Card tone="dark" className="!shadow-pop-lime">
              <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-xl text-mint mb-2">
                What every Group plan carries.
              </p>
              <ul className="m-0 p-0 list-none grid gap-2.5 text-[15px] leading-normal text-mint/80">
                <li>The club route library, published once, on every phone.</li>
                <li>Members-only live map for every ride and run.</li>
                <li>One-tap RSVP &mdash; a real register before you roll.</li>
                <li>Session wrap-ups posted to the club feed, automatically.</li>
                <li>Two-way SOS with live position, straight to the club.</li>
                <li>Families follow any session live from a shared link.</li>
                <li>Watching is free and unlimited for everyone, always.</li>
              </ul>
            </Card>
          </div>
        </Section>

        {/* ---- Final CTA ---- */}
        <section className="relative overflow-hidden bg-dark text-mint text-center">
          <RouteMotif tone="dark" variant={1} flip />
          <div className="relative z-10 container-site py-16 md:py-24 max-w-[900px] mx-auto">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] text-[clamp(34px,5vw,60px)] mb-3.5 text-mint">
              Make your club visible.
            </h2>
            <p className="text-[19px] text-mint/70 max-w-[44ch] mx-auto mb-8">
              One route everyone has, one map everyone's on, and a group chat
              that goes back to being about the riding and the running. Set up
              before your next session.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <Button href={appLinks.signup} variant="primary">
                Get your club on Aster
              </Button>
              <Button href="/pricing" variant="secondary">
                See plans and pricing
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
