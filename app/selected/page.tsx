import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Card from "@/components/Card";
import Button from "@/components/Button";
import RouteMotif from "@/components/RouteMotif";
import PhotoStrip from "@/components/PhotoStrip";

/* /selected — ported from the PWA marketing site (SelectedPage.tsx).
 * Early-access landing for hand-picked partners, teams, organisers, and
 * investors. URL is live in the wild and must keep working. */

export const metadata: Metadata = {
  title: "Early access — by invitation",
  description:
    "You've been selected for early access to live GPS tracking for cycling events. Install the app on iPhone or Android and take a look before everyone else.",
  alternates: { canonical: "/selected" },
};

// Hero-action mix — start line, peloton, gravel rollout, finish.
const PHOTOS = [
  {
    src: "/images/cycling/11-road-startline-misty.webp",
    alt: "Riders on a misty road start line",
  },
  {
    src: "/images/cycling/14-peloton-twilight-climb.webp",
    alt: "Peloton stretched up a hillside at twilight, town lights in the distance",
  },
  {
    src: "/images/selected/10-gravel-rollout-rider.webp",
    alt: "Gravel cyclist rolling out at speed",
  },
  {
    src: "/images/cycling/08-two-finish.webp",
    alt: "Two gravel cyclists at a finish moment, sunset light",
  },
];

const LINKS = {
  ios: "https://testflight.apple.com/join/59jjtBc3",
  android:
    "https://drive.google.com/file/d/1ilJ8GyXiE1Zj4UtS7WeIEP4sq1nL67EC/view?usp=drive_link",
  email: "james@astertrack.app",
};

export default function SelectedPage() {
  return (
    <>
      <SiteNav />
      <main>
        {/* ---- Hero: by-invitation early access ---- */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={1} />
          <div className="relative z-10 text-center">
            <Kicker tone="dark" className="text-center">
              Early access &middot; By invitation
            </Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.92] text-mint text-[clamp(46px,7vw,88px)] mb-6 text-balance">
              You&apos;re in.
            </h1>
            <div className="text-lg italic text-mint/85 max-w-[56ch] mx-auto space-y-3">
              <p>
                You&apos;ve been hand-picked to see Aster before anyone else
                &mdash; live GPS tracking for cycling events, from races to
                free rides.
              </p>
              <p>
                Install it below, have a look around, and tell us what you
                think. This is early, and your eyes on it shape where it goes.
              </p>
            </div>
          </div>
        </Section>

        {/* ---- Photo strip ---- */}
        <PhotoStrip images={PHOTOS} />

        {/* ---- What Aster is ---- */}
        <Section tone="white">
          <div className="text-center">
            <Kicker className="text-center">What it is</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] text-dark mb-5">
              Track it. Share it live.
            </h2>
            <p className="text-lg leading-normal text-dark/80 max-w-[64ch] mx-auto mb-4">
              Aster turns any bike ride or event into a live map. Riders tap
              Start; family, fans, and organisers follow every metre in real
              time &mdash; no login, no hardware, works in the middle of
              nowhere with no signal. Races, group rides, grand departs, free
              rides.
            </p>
            <p className="text-lg leading-normal text-dark/60 max-w-[64ch] mx-auto m-0">
              Live positions &middot; leaderboards &middot; route + elevation
              &middot; safety SOS &middot; offline-first tracking &middot;
              shareable rider cards.
            </p>
          </div>
        </Section>

        {/* ---- Install ---- */}
        <Section tone="stone">
          <div className="text-center mb-10">
            <Kicker className="text-center">Get the app</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] text-dark mb-4">
              Install on iPhone or Android
            </h2>
            <p className="text-lg leading-normal text-dark/70 max-w-[60ch] mx-auto">
              Tap the link on your phone. Sign up inside the app &mdash; the
              first feed you see is seeded so it&apos;s never empty.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 max-w-[760px] mx-auto">
            <InstallCard
              label="iPhone"
              sub="TestFlight"
              url={LINKS.ios}
              cta="Open TestFlight"
              notes={[
                "Install TestFlight from the App Store first if you haven't",
                "Open the link, tap Accept, then Install",
                "Open Aster, sign up or sign in",
              ]}
            />
            <InstallCard
              label="Android"
              sub="APK · sideload"
              url={LINKS.android}
              cta="Open in Drive"
              notes={[
                "Drive → Download → tap the .apk",
                "Allow installs from your browser once if prompted",
                "Open Aster, sign up or sign in",
              ]}
            />
          </div>
          <p className="text-center text-sm text-dark/55 mt-6 max-w-[56ch] mx-auto">
            Prefer to just look first? Anyone can watch live events with no
            login at{" "}
            <a
              href="https://astertrack.app"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              astertrack.app
            </a>
            .
          </p>
        </Section>

        {/* ---- Why you're here ---- */}
        <Section tone="white">
          <div className="text-center mb-10">
            <Kicker className="text-center">Why you&apos;re here</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] text-dark">
              What early access means for you
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <AudienceCard
              title="Partners"
              body="Reach the endurance-cycling audience already watching live races — editorial co-production, presented-by frames, athlete kit-tagging. Not banner ads, not interstitials."
            />
            <AudienceCard
              title="Teams & clubs"
              body="Every rider on your team on one live map — race day, training day, all season. Roster, group rides, championships. Free for clubs and friend groups under 50 riders."
              to="/clubs"
            />
            <AudienceCard
              title="Organisers"
              body="Phone-first GPS live tracking for races. No hardware to ship, no per-rider fees on the watch link, set up in an afternoon — built for the 95% of races that never had tracking."
              to="/for-organisers"
            />
            <AudienceCard
              title="Investors"
              body="Six months in, building the live layer for endurance sport. Get hands-on with the product before the round — and let's talk about where it goes from here."
            />
          </div>
        </Section>

        {/* ---- Follow it live (watcher funnel) ---- */}
        <Section tone="stone" className="!overflow-hidden">
          <RouteMotif tone="light" variant={2} flip />
          <div className="relative z-10 text-center">
            <Kicker className="text-center">Race day &middot; Follow it live</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] text-dark mb-4">
              See a live event right now
            </h2>
            <p className="text-lg leading-normal text-dark/70 max-w-[52ch] mx-auto mb-8">
              The fastest way to understand Aster is to watch a ride as it
              happens &mdash; one link, any browser, no account.
            </p>
            <Button href="/discover">Follow it live</Button>
          </div>
        </Section>

        {/* ---- Contact / next step ---- */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={2} />
          <div className="relative z-10 text-center">
            <Kicker tone="dark" className="text-center">
              Next step
            </Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] text-mint mb-5">
              Let&apos;s talk
            </h2>
            <p className="text-[19px] leading-normal text-mint/85 mb-8 max-w-[58ch] mx-auto">
              Once you&apos;ve had a look, hit reply or drop me a line &mdash;
              feedback, questions, &ldquo;can we do X&rdquo;, a call. Whatever
              fits. This is a conversation, not a pitch deck.
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
              <Button
                href={`mailto:${LINKS.email}?subject=Aster%20early%20access%20%E2%80%94%20`}
              >
                Email {LINKS.email}
              </Button>
              <Button href="https://astertrack.app" variant="secondary">
                Explore live at astertrack.app
              </Button>
            </div>
          </div>
        </Section>

        {/* ---- Footer-light ---- */}
        <Section tone="white">
          <p className="text-sm text-dark/60 text-center m-0">
            Curious what Aster is, more broadly?{" "}
            <Link href="/" className="underline">
              See the full story
            </Link>
            .
          </p>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}

/* ---- Local pieces ---- */

function InstallCard({
  label,
  sub,
  url,
  cta,
  notes,
}: {
  label: string;
  sub: string;
  url: string;
  cta: string;
  notes: string[];
}) {
  return (
    <Card className="flex flex-col items-center text-center">
      <p className="font-condensed uppercase tracking-[0.06em] font-semibold text-xs text-lime-deep mb-1">
        {sub}
      </p>
      <h3 className="font-condensed uppercase tracking-[0.03em] font-bold text-2xl text-dark mb-5">
        {label}
      </h3>
      <Button href={url} className="w-full mb-5" size="sm">
        {cta}
      </Button>
      <ol className="text-sm text-dark/75 space-y-1.5 list-decimal pl-4 text-left self-stretch m-0">
        {notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ol>
    </Card>
  );
}

function AudienceCard({
  title,
  body,
  to,
}: {
  title: string;
  body: string;
  to?: string;
}) {
  return (
    <Card className="flex flex-col">
      <h3 className="font-condensed uppercase tracking-[0.03em] font-semibold text-xl text-dark mb-2 border-l-2 border-lime-deep pl-3 leading-tight">
        {title}
      </h3>
      <p className="text-[15px] leading-normal text-dark/70 flex-1 m-0">
        {body}
      </p>
      {to && (
        <Link
          href={to}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-lime-deep hover:underline self-start"
        >
          Learn more <span aria-hidden>→</span>
        </Link>
      )}
    </Card>
  );
}
