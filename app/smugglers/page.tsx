import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Card from "@/components/Card";
import Button from "@/components/Button";
import RouteMotif from "@/components/RouteMotif";

/* /smugglers — ported from the PWA marketing site (SmugglersPage.tsx).
 * Landing page for Smugglers Path test riders (event: Saturday 30 May 2026).
 * URL is live in the wild (QR codes + direct links) and must keep working. */

export const metadata: Metadata = {
  title: "Smugglers Path — test rider welcome",
  description:
    "Install the Aster app, join the WhatsApp group, and get ready for the Smugglers Path test ride on Saturday.",
  alternates: { canonical: "/smugglers" },
};

const LINKS = {
  android:
    "https://drive.google.com/file/d/1ilJ8GyXiE1Zj4UtS7WeIEP4sq1nL67EC/view?usp=drive_link",
  ios: "https://testflight.apple.com/join/1TEXD1k1",
  whatsapp: "https://chat.whatsapp.com/KYpKh8E4N2fGCzINoVMabF?mode=gi_t",
  email: "james@astertrack.app",
};

export default function SmugglersPage() {
  return (
    <>
      <SiteNav />
      <main>
        {/* ---- Hero: founder welcome video + précis ---- */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={1} />
          <div className="relative z-10 text-center">
            <Kicker tone="dark" className="text-center">
              Smugglers Path test ride &middot; Saturday 30 May
            </Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.92] text-mint text-[clamp(46px,7vw,88px)] mb-6 text-balance">
              Welcome,
              <br />
              Smugglers
            </h1>
            <div className="mx-auto max-w-[180px] sm:max-w-[210px] lg:max-w-[240px] rounded-2xl overflow-hidden border-2 border-mint/20 bg-black">
              <video
                controls
                playsInline
                preload="metadata"
                poster="/images/smugglers/welcome-poster.jpg"
                className="w-full h-auto block"
              >
                <source src="/images/smugglers/welcome.mp4" type="video/mp4" />
                Your browser doesn&apos;t support embedded video. Use one of
                the install links below to continue.
              </video>
            </div>
            <div className="mt-6 text-lg italic text-mint/85 max-w-[52ch] mx-auto space-y-3">
              <p>
                We&apos;re just six months in to building Aster, a new mobile
                app for tracking and sharing rides and races.
              </p>
              <p>
                You&apos;re the first real riders to put the app to the test in
                a real event.
              </p>
              <p>
                We want you to break it, share what you find, don&apos;t let
                bugs ruin your ride.
              </p>
              <p>Thanks for being in.</p>
            </div>
          </div>
        </Section>

        {/* ---- Install + join ---- */}
        <Section tone="stone">
          <div className="text-center mb-10">
            <Kicker className="text-center">Three things to do now</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] text-dark mb-4">
              Install the app. Join the group.
            </h2>
            <p className="text-lg leading-normal text-dark/70 max-w-[60ch] mx-auto">
              Tap the link on your phone. The WhatsApp group is for everything
              &mdash; bugs, kit questions, race-day chat, the post-ride
              debrief.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <InstallCard
              label="Android"
              sub="APK · sideload"
              url={LINKS.android}
              cta="Open in Drive"
              notes={[
                "Drive → Download → tap the .apk",
                "You'll need to allow installs from your browser once",
                "Open Aster, sign up or sign in",
              ]}
            />
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
              label="WhatsApp"
              sub="Tester group"
              url={LINKS.whatsapp}
              cta="Join group"
              notes={[
                "Bugs, questions, compliments, complaints",
                "Founder's on it — replies fast",
                "Pre-ride chat happens here too",
              ]}
            />
          </div>
        </Section>

        {/* ---- Race-day walkthrough ---- */}
        <Section tone="white">
          <div className="max-w-[760px] mx-auto">
            <Kicker>Saturday morning</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] text-dark mb-8">
              Race-day walkthrough
            </h2>
            <ol className="space-y-8 list-none p-0 m-0">
              <Step
                n={1}
                title="Open the Smugglers Path event and tap Enter"
              >
                <p className="mb-2">
                  Find the event under <strong>Events → Discover</strong> in
                  the bottom nav, or open the event link directly. Tap{" "}
                  <strong>Enter as rider</strong>, confirm your display name,
                  and you&apos;re in.
                </p>
                <p>
                  Once entered, the event shows up under{" "}
                  <strong>Events → Entered</strong> with a &ldquo;Starts
                  in&rdquo; countdown. Do this the day before if you can
                  &mdash; it&apos;s a one-tap action but takes a quick network
                  round-trip, and the start area might have patchy signal.
                </p>
              </Step>
              <Step
                n={2}
                title="At the start, open the Track screen and wait for the Start button to enable"
              >
                <p className="mb-2">
                  <strong>15 minutes before the gun</strong>, the Start button
                  on the Track screen enables. Tap it once and you&apos;ll see{" "}
                  <strong>Tracking Armed</strong> in the status banner and feel
                  a short buzz &mdash; that&apos;s the app confirming GPS is
                  live and ready.
                </p>
                <p className="mb-2">
                  If you tap Start too early, the button is greyed out with an
                  &ldquo;Opens in X&rdquo; countdown &mdash; that&apos;s
                  normal, just wait for the window.
                </p>
                <p>
                  You can lock the screen now if you want, or leave it on
                  &mdash; up to you. The countdown beeps fire either way.
                </p>
              </Step>
              <Step n={3} title="Listen for the countdown — tick-tick-tick, GO">
                <p className="mb-2">
                  In the <strong>final 5 seconds</strong> before the gun, your
                  phone ticks once a second (T-5, T-4, T-3, T-2, T-1), each
                  with a short haptic pulse. Then at T=0 you&apos;ll hear a
                  longer beep and feel a long buzz &mdash; that&apos;s the gun.
                  Your race clock starts.
                </p>
                <p className="mb-2">
                  If your phone is in silent mode you&apos;ll only feel the
                  haptics &mdash; the visual <strong>&ldquo;GO!&rdquo;</strong>{" "}
                  flashes briefly in the banner so you can confirm it fired.
                </p>
                <p>
                  The Track screen label changes from &ldquo;Tracking
                  Armed&rdquo; to <strong>&ldquo;Racing&rdquo;</strong> the
                  moment the gun fires.
                </p>
              </Step>
              <Step n={4} title="Ride. Don't touch the phone.">
                <p className="mb-2">
                  Tracking runs in the background &mdash; lock the screen, drop
                  the phone in a jersey pocket, top-tube bag, or bar mount, and
                  forget about it. Aster sends a position every few seconds
                  while you have signal and quietly buffers them on the phone
                  when you don&apos;t.
                </p>
                <p className="mb-2">
                  When you hit a dead zone, your position pauses on the
                  spectator map. The moment signal returns, the buffered
                  positions upload and the map catches up. You don&apos;t need
                  to do anything.
                </p>
                <p>
                  If you genuinely need to stop the ride, use{" "}
                  <strong>Pause</strong> (for breaks, mechanicals, aid
                  stations) or <strong>Abandon</strong> (if you&apos;re done)
                  &mdash; covered below.
                </p>
              </Step>
            </ol>
          </div>
        </Section>

        {/* ---- Button semantics ---- */}
        <Section tone="stone">
          <div className="max-w-[760px] mx-auto">
            <Kicker>What the buttons do</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] text-dark mb-8">
              Pause vs Abandon
            </h2>
            <div className="space-y-5">
              <ButtonExplainer
                label="Pause Race"
                color="amber"
                body="Mechanical, aid station, nature break, helping a fallen rider. Pause stops sending GPS pings — your position freezes on the map for watchers — and saves battery while you're not riding. The race clock keeps ticking (it's wall-clock time from the gun, same for everyone, never pauses). Tap Resume when you're rolling again. Use this freely."
              />
              <ButtonExplainer
                label="Abandon Race"
                color="red"
                body="Genuinely done. You'll type a 4-digit code shown on the screen — small friction to stop accidental taps on a bar-mounted phone. Followers get a 'rider abandoned' notification. There's no Undo for this one — only tap it if you mean it."
              />
              <ButtonExplainer
                label="SOS Emergency"
                color="red"
                body="Actual emergency. Triggers a 4-digit confirm code, then alerts the event organiser with your live position. Two-way chat opens. Don't test this on the day — we'll do it pre-event."
              />
            </div>
          </div>
        </Section>

        {/* ---- Battery FAQ ---- */}
        <Section tone="white">
          <div className="max-w-[760px] mx-auto">
            <Kicker>About your battery</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] text-dark mb-8">
              Battery questions, answered
            </h2>
            <div className="space-y-7">
              <BatteryQ q="How much battery does Aster actually use?">
                Roughly <strong>~15% per hour in Live mode</strong> (the
                default) on a modern phone with the screen off and a normal GPS
                lock. As your battery drops the app automatically downshifts
                the GPS sample rate, which trades a small amount of
                map-smoothness for big battery savings &mdash; Standard &asymp;
                8.5%/h, Endurance &asymp; 4.5%/h, Ultra &asymp; 4%/h. A
                fully-charged S23 or iPhone 14 with auto-fallback comfortably
                handles 8&ndash;10 hours of tracking. Cold weather or weak cell
                signal can push consumption higher because the radio works
                harder.
              </BatteryQ>
              <BatteryQ q="Should I bring a battery pack?">
                <strong>Recommended &mdash; yes.</strong> A fully-charged
                modern phone running Aster on auto-fallback should comfortably
                last a full Smugglers day, but conditions (cold, weak signal,
                photo-taking, Strava on the side) can shorten that. A 5,000 mAh
                pack weighs almost nothing and is the difference between
                &ldquo;ride continues&rdquo; and &ldquo;ride ends&rdquo; if the
                day stretches long.
              </BatteryQ>
              <BatteryQ q="What does the app do when my battery drops?">
                <p className="mb-4">
                  Aster has an automatic <strong>battery ladder</strong>{" "}
                  &mdash; as your phone&apos;s battery falls past 30% / 15% /
                  8%, the app drops down one tier (Live &rarr; Standard &rarr;
                  Endurance &rarr; Ultra) so tracking lasts longer. You
                  don&apos;t need to do anything; a small banner pops up to
                  tell you the mode just changed.
                </p>
                <p className="mb-4">
                  Want to forecast exactly how long your phone will last in
                  each mode?
                </p>
                <Button
                  href="/battery-use"
                  variant="secondary"
                  size="sm"
                >
                  Open the battery calculator →
                </Button>
              </BatteryQ>
              <BatteryQ q="What happens if my battery dies mid-ride?">
                Tracking stops, but every position recorded up to that moment
                is <strong>safely on your phone</strong> (and already uploaded
                if you had signal). When you charge back up and re-open Aster,
                any unsent positions sync to the server and your ride summary
                reflects the full distance up to the dead moment. You
                won&apos;t lose data &mdash; just any riding you do between
                battery-dead and battery-back-on.
              </BatteryQ>
              <BatteryQ q="Should I use airplane mode to save battery?">
                <strong>No.</strong> Aster needs your phone&apos;s data
                connection to send positions to the server. Airplane mode kills
                that. The phone will still record GPS locally and upload
                everything once you turn data back on, but your spectators see
                you frozen on the map the whole time you&apos;re in airplane
                mode &mdash; kind of defeats the point. Leave data on.
              </BatteryQ>
              <BatteryQ q="Anything else I can do to extend battery?">
                A few low-effort wins:
                <ul className="mt-3 space-y-1 list-disc pl-6">
                  <li>
                    Lock the screen when you&apos;re not checking it &mdash;
                    the display is the single biggest battery drain after GPS
                  </li>
                  <li>Drop your screen brightness if you do leave it on</li>
                  <li>
                    Close other apps before the start &mdash; Spotify, Strava,
                    navigation apps all compound the drain
                  </li>
                  <li>
                    Keep the phone out of direct sun if possible &mdash; heat
                    reduces battery efficiency significantly
                  </li>
                  <li>
                    Bar-mount + power bank cable plugged in = a phone that
                    charges while you ride. Some riders swear by it for long
                    days
                  </li>
                </ul>
              </BatteryQ>
            </div>
          </div>
        </Section>

        {/* ---- Known gotchas: Samsung ---- */}
        <Section tone="stone">
          <div className="max-w-[760px] mx-auto">
            <Kicker>One thing to check &middot; Optional</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] text-dark mb-5">
              Samsung phones &mdash; turn off Sleeping Apps{" "}
              <span className="text-lg align-middle text-dark/50 font-normal normal-case tracking-normal">
                (optional)
              </span>
            </h2>
            <p className="text-lg leading-normal text-dark/80 mb-4">
              Samsung is aggressive about killing background apps to save
              battery. For a 2&ndash;4 hour race it can interrupt tracking. Two
              taps to fix it permanently:
            </p>
            <ol className="text-lg leading-normal text-dark/80 list-decimal pl-6 space-y-2">
              <li>
                Settings &rarr; Device care &rarr; Battery &rarr; Background
                usage limits
              </li>
              <li>
                Sleeping apps &rarr; if Aster is in the list, remove it. Or add
                Aster to <strong>Never sleeping apps</strong>.
              </li>
            </ol>
            <p className="text-lg leading-normal text-dark/80 mt-4">
              iPhone &mdash; nothing extra to do. Pixel + most stock-Android
              phones don&apos;t need this either. Xiaomi, OnePlus, and Huawei
              have their own version of the same setting buried in different
              places &mdash; search &ldquo;battery optimisation&rdquo; in your
              settings if you&apos;re on one of those.
            </p>
          </div>
        </Section>

        {/* ---- Follow it live (watcher funnel) ---- */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={2} flip />
          <div className="relative z-10 text-center">
            <Kicker tone="dark" className="text-center">
              On the day &middot; Follow it live
            </Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] text-mint mb-5">
              Family + friends can watch live
            </h2>
            <p className="text-[19px] leading-normal text-mint/85 max-w-[52ch] mx-auto mb-4">
              Share the link with anyone you want watching. No login needed for
              them &mdash; they can find the Smugglers Path event and follow
              your dot on the live map. Works on any phone or laptop, incognito
              too.
            </p>
            <p className="text-mint/70 mb-8">
              One link. One screen. They see every metre.
            </p>
            <Button href="/discover">Follow it live</Button>
          </div>
        </Section>

        {/* ---- Contact ---- */}
        <Section tone="stone">
          <div className="text-center">
            <Kicker className="text-center">Anything else</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] text-dark mb-5">
              Talk to us
            </h2>
            <p className="text-lg leading-normal text-dark/80 mb-7 max-w-[56ch] mx-auto">
              Bugs, compliments, confusion, kit questions, &ldquo;should I take
              a spare battery&rdquo; &mdash; all of it. The WhatsApp group is
              fastest.
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
              <Button href={LINKS.whatsapp}>Join the WhatsApp group</Button>
              <Button
                href={`mailto:${LINKS.email}?subject=Smugglers%20Path%20%E2%80%94%20`}
                variant="secondary"
              >
                Email {LINKS.email}
              </Button>
            </div>
          </div>
        </Section>

        {/* ---- Footer-light ---- */}
        <Section tone="white">
          <p className="text-sm text-dark/60 text-center m-0">
            Not a Smugglers tester?{" "}
            <Link href="/" className="underline">
              See what Aster is
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

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span
        aria-hidden
        className="flex-shrink-0 w-10 h-10 rounded-full bg-dark text-lime font-condensed font-bold text-lg flex items-center justify-center"
      >
        {n}
      </span>
      <div>
        <h3 className="font-condensed uppercase tracking-[0.03em] font-semibold text-xl text-dark mb-2 leading-tight">
          {title}
        </h3>
        <div className="text-[15px] leading-relaxed text-dark/80">
          {children}
        </div>
      </div>
    </li>
  );
}

function BatteryQ({ q, children }: { q: string; children: ReactNode }) {
  return (
    <div className="border-l-2 border-lime-deep pl-4 lg:pl-5">
      <h3 className="font-condensed uppercase tracking-[0.03em] font-semibold text-xl text-dark mb-2 leading-tight">
        {q}
      </h3>
      <div className="text-[15px] leading-relaxed text-dark/80">{children}</div>
    </div>
  );
}

function ButtonExplainer({
  label,
  color,
  body,
}: {
  label: string;
  color: "amber" | "red";
  body: string;
}) {
  const colorClasses =
    color === "amber"
      ? "bg-amber-100 text-amber-900 border-amber-300"
      : "bg-red-100 text-red-900 border-red-300";
  return (
    <Card className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-start">
      <div className="flex-shrink-0 sm:w-44">
        <span
          className={`inline-flex items-center justify-center w-full px-4 py-2 rounded-xl border-2 font-semibold text-center ${colorClasses}`}
        >
          {label}
        </span>
      </div>
      <p className="flex-1 text-[15px] leading-relaxed text-dark/80 m-0">
        {body}
      </p>
    </Card>
  );
}
