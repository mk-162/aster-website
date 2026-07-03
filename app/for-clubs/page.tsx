import type { Metadata } from "next";
import Link from "next/link";
import {
  Section, Prose, Grid, HeroActions, Card, Capability, CtaPrimary, CtaSecondary,
  PhotoStrip, SiteHeader, SiteFooter, APP_URL,
} from "@/components/marketing";

export const metadata: Metadata = {
  title: "The home for your cycling club",
  description:
    "One link gets your whole club in. Every ride, every RSVP, and a live map on ride day — in the one place your club already looks. Free for small clubs.",
  alternates: { canonical: "/for-clubs" },
};

const PHOTOS = [
  { src: "/photography/04-two-drafting.jpg", alt: "Two gravel cyclists drafting on a forest gravel road" },
  { src: "/photography/10-gravel-rollout-rider.jpg", alt: "A mixed group rolling out under a start arch" },
  { src: "/photography/14-peloton-twilight-climb.jpg", alt: "A group stretched up a hillside at twilight" },
  { src: "/photography/11-road-startline-misty.jpg", alt: "A club group at the start on a cold misty morning" },
];

const CAPS = [
  { kicker: "Get everyone in", title: "One link. That's the whole setup.", body: "Paste one invite link into your club's group chat. Tap, and they're in — no admin chasing forty people to download an app and find your club. The link does the herding for you." },
  { kicker: "Know who's coming", title: "'I'm in' — the answer WhatsApp can't give you.", body: "The next ride sits at the top of your club page with one-tap RSVP. You see exactly who's turning up before you roll out, not a guess from a thread of emojis." },
  { kicker: "Set it once", title: "The Sunday ride that runs itself.", body: "Set your weekly club run once and it appears every week on its own, with pace groups. Everyone who's in gets a reminder the day before and an hour out. No re-posting, no forgetting." },
  { kicker: "Everyone home", title: "One live map. See the whole club roll.", body: "On ride day every member is on one map — the group ahead, whoever's off the back, whoever stopped. The ride leader can see everyone got home. Two-way SOS is there if a ride ever goes wrong." },
];

const ROADMAP = [
  "Just-my-clubmates on the map at big events — filter a sportive down to your club, so you can spot each other in a field of thousands.",
  "Club season tallies — attendance streaks, total distance ridden together, the stats that make a club feel like a club.",
  "Calendar feed — subscribe your club rides straight into Google or Apple Calendar.",
  "Ride leaders per pace group — assign who's leading the fast group and who's sweeping the back.",
];

export default function ForClubs() {
  return (
    <>
      <SiteHeader />

      <Section bg="dark" className="text-center">
        <p className="font-condensed uppercase tracking-wide text-tiny text-lime mb-3">For clubs</p>
        <h1 className="font-condensed font-bold uppercase tracking-tight text-[40px] sm:text-[56px] lg:text-[80px] leading-[0.95] text-mint mb-4 lg:mb-6">
          Your club,<br />sorted.
        </h1>
        <p className="text-large lg:text-xl text-mint/85 mb-7 max-w-[34ch] lg:max-w-[46ch] mx-auto">
          One link gets everyone in. Every ride, every RSVP, and a live map on ride day — in the one place your club already looks.
        </p>
        <HeroActions>
          <CtaPrimary href={`${APP_URL}/teams/create`}>Start your club — free</CtaPrimary>
          <CtaSecondary href={`${APP_URL}/login`}>Already have a club — sign in</CtaSecondary>
        </HeroActions>
      </Section>

      <PhotoStrip images={PHOTOS} />

      <Section bg="stone">
        <Prose>
          <p className="font-condensed uppercase tracking-wide text-tiny text-lime-deep mb-2">The Sunday-ride problem</p>
          <h2 className="text-display lg:text-[44px] text-dark mb-4 lg:mb-6">
            Your club&apos;s ride lives in five places. Nobody&apos;s sure who&apos;s coming.
          </h2>
          <p className="text-body lg:text-large text-dark/80 mb-3">
            The route&apos;s a Komoot link. The plan&apos;s three messages deep in a WhatsApp group that&apos;s mostly memes. Who&apos;s actually turning up is a count of thumbs-up emojis. And it all vanishes into the scroll by Monday.
          </p>
          <p className="text-body lg:text-large text-dark/80 mb-3">
            Strava tells you what happened after the ride. Nothing tells you what&apos;s happening next — or brings the club together while it does.
          </p>
          <p className="text-body lg:text-large text-dark font-medium">
            Aster is the one place your club goes: the next ride, who&apos;s in, and everyone on one live map when you roll out.
          </p>
        </Prose>
      </Section>

      <Section bg="white">
        <p className="font-condensed uppercase tracking-wide text-tiny text-lime-deep mb-2">Live today</p>
        <h2 className="text-display lg:text-[44px] text-dark mb-8 lg:mb-12">Everything to arrange a ride, in one place.</h2>
        <Grid cols={2}>
          {CAPS.map((c) => <Capability key={c.kicker} {...c} />)}
        </Grid>
        <Prose className="mt-8 lg:mt-12">
          <p className="text-body lg:text-large text-dark/70">
            Plus a club noticeboard for the stuff that shouldn&apos;t scroll away, a shared route library, and a club page that&apos;s yours — kit, roster, and every ride you&apos;ve done together.
          </p>
        </Prose>
      </Section>

      <Section bg="stone" border>
        <Prose>
          <p className="font-condensed uppercase tracking-wide text-tiny text-gold mb-2">Building next</p>
          <h2 className="text-display lg:text-[44px] text-dark mb-3 lg:mb-5">Where the club product goes next.</h2>
          <p className="text-body lg:text-large text-dark/70 mb-5 lg:mb-7">
            Aster&apos;s pre-beta. Below is what we&apos;re building next — tell us which one would change your club&apos;s week and we&apos;ll move it up.
          </p>
          <Card>
            <ul className="space-y-3">
              {ROADMAP.map((f) => (
                <li key={f} className="flex gap-3 text-body text-dark/85">
                  <span className="text-gold font-bold mt-0.5 flex-shrink-0">→</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Prose>
      </Section>

      <Section bg="white">
        <p className="font-condensed uppercase tracking-wide text-tiny text-lime-deep mb-2">Pricing</p>
        <h2 className="text-display lg:text-[44px] text-dark mb-8 lg:mb-12">Free to start. Pays for itself as you grow.</h2>
        <Grid cols={2}>
          <Card className="bg-mint-bg">
            <h3 className="text-large font-semibold text-dark mb-1">Small club</h3>
            <p className="text-display text-dark mb-2">Free</p>
            <p className="text-small text-dark/70">
              Invite links, RSVP, recurring rides, the live map, the noticeboard — everything to arrange a ride. No card, no trial.
            </p>
          </Card>
          <Card className="bg-lime-bg">
            <h3 className="text-large font-semibold text-dark mb-1">Full club</h3>
            <p className="text-display text-dark mb-1">£15<span className="text-body font-normal text-dark/60"> / month</span></p>
            <p className="text-small text-dark/60 mb-2">or £150 / year — one subscription for the whole club.</p>
            <p className="text-small text-dark/70">
              Grow past a friend group: unlimited members, a club sponsor slot, and unlimited favourites for everyone.
            </p>
          </Card>
        </Grid>
        <p className="text-small text-dark/60 mt-6">
          Riders never pay — riding and being watched are free forever. Only the club subscription is paid.
        </p>
      </Section>

      <Section bg="dark-cta">
        <h2 className="font-condensed uppercase tracking-tight text-title lg:text-display text-mint mb-2">Bring your club together.</h2>
        <p className="text-body lg:text-large text-mint/70 mb-6 lg:mb-8 max-w-[34ch] mx-auto">
          Start free, paste one link, and you&apos;re rolling. Five minutes.
        </p>
        <HeroActions>
          <CtaPrimary href={`${APP_URL}/teams/create`}>Start your club — free</CtaPrimary>
          <CtaSecondary href={`${APP_URL}/pricing`}>See pricing</CtaSecondary>
        </HeroActions>
      </Section>

      <SiteFooter />
    </>
  );
}
