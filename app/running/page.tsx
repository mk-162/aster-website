import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Card from "@/components/Card";
import RouteMotif from "@/components/RouteMotif";
import { appLinks } from "@/lib/links";

export const metadata: Metadata = {
  title: "Live tracking for running — trail, fell and road",
  description:
    "Live GPS tracking for trail ultras, fell races and road races. Wave starts with honest per-wave timing, SOS on remote trails, and a live map anyone can watch free.",
  alternates: { canonical: "/running" },
};

/* ---- Running-lander copy (running vocabulary per redline) ---- */

const featureCards = [
  {
    kicker: "Trail & ultra safety",
    title: "Help knows where you are.",
    body: "On a remote ridge line, SOS sends your live position to your people. Race ops see every runner on one map — no £30-a-head tracker rental, no hardware to hand back at the finish.",
  },
  {
    kicker: "Checkpoint splits",
    title: "Aid station to aid station, live.",
    body: "Splits at every checkpoint, the gap right now, and who's moving through the night. Following an ultra finally means watching it happen, not refreshing a results page.",
  },
  {
    kicker: "For the ones waiting",
    title: "More than the finish chute.",
    body: "Your family follows the whole race live, not four hours of waiting at a barrier. One link, no app, no account — they open it and you're there.",
  },
];

/** Wave-start diagram — fields released in timed waves; each runner's
 * clock anchors to their wave's release. DS chips and bars, no imagery. */
function WaveStartDiagram() {
  const waves = [
    { name: "Wave A", offset: 0, clock: "00:00:00" },
    { name: "Wave B", offset: 18, clock: "00:00:00" },
    { name: "Wave C", offset: 36, clock: "00:00:00" },
  ];
  return (
    <div className="border-2 border-dark rounded-2xl bg-dark text-mint p-5 md:p-7 shadow-pop-lime">
      <div className="flex items-center justify-between mb-5">
        <span className="font-condensed uppercase tracking-[0.08em] font-semibold text-[13px] text-lime">
          Wave start · One clock per wave
        </span>
        <span className="flex items-center gap-2 bg-white/10 border-2 border-mint/30 rounded-full px-3 py-1">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          <span className="font-condensed uppercase font-bold text-[12px] tracking-[0.05em]">
            Live
          </span>
        </span>
      </div>
      <div className="space-y-3">
        {waves.map((w) => (
          <div key={w.name} className="flex items-center gap-3">
            <span className="font-condensed uppercase font-bold text-sm w-16 shrink-0 text-mint/70">
              {w.name}
            </span>
            <div className="relative h-8 flex-1">
              {/* Held in the corral until release */}
              {w.offset > 0 && (
                <div
                  aria-hidden
                  className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-mint/15"
                  style={{ left: 0, width: `${w.offset - 2}%` }}
                />
              )}
              {/* Released — this wave's clock starts here */}
              <div
                aria-hidden
                className="absolute top-1/2 -translate-y-1/2 h-5 rounded-full bg-lime flex items-center"
                style={{ left: `${w.offset}%`, right: 0 }}
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 font-mono font-bold text-[12px] text-dark pl-2 tabular-nums"
                style={{ left: `${w.offset}%` }}
              >
                {w.clock}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13px] text-mint/50 m-0">
        Each wave&apos;s release is its own gun — every runner&apos;s time and
        leaderboard position anchors to their wave, not the first one.
      </p>
    </div>
  );
}

export default function RunningPage() {
  return (
    <>
      <SiteNav />
      <main>
        {/* ---- Hero: dawn ultra start (running holding image) ---- */}
        <section className="relative overflow-hidden bg-dark text-mint border-b-2 border-dark">
          <Image
            src="/images/running-holding/r2-transylvania.jpg"
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
          <div className="relative container-site py-24 md:py-32">
            <Kicker tone="dark">For running · Trail · Road</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.92] text-mint text-[clamp(48px,7vw,104px)] mb-6 max-w-[14ch] text-balance">
              Every mile, <span className="text-lime">watched.</span>
            </h1>
            <p className="text-[clamp(18px,1.6vw,21px)] leading-normal text-mint/85 max-w-[46ch] mb-9">
              Live GPS tracking for trail ultras, fell races, and road races
              — from the phone already in your vest. Share one link and your
              people follow the whole race live in any browser: the
              dead-of-night sections, the aid-station stops, the finish.
              Free for runners, forever.
            </p>
            <div className="flex gap-3.5 flex-wrap items-center">
              <Button href={appLinks.signup} variant="primary">
                Track your next run — free
              </Button>
              <Button href={appLinks.discover} variant="secondary">
                Watch a live race — no signup
              </Button>
            </div>
          </div>
        </section>

        {/* ---- Start-format feature: wave starts ---- */}
        <Section tone="stone">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <Kicker>Wave starts</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-4 text-dark">
                Your race starts when your wave does.
              </h2>
              <p className="text-lg leading-normal text-dark/70 max-w-[48ch] mb-4">
                Big fields go off in timed waves — and every runner&apos;s
                clock starts at their wave&apos;s release, not the first gun.
                Times, gaps, and leaderboard positions are honest across the
                whole field.
              </p>
              <p className="text-lg leading-normal text-dark/70 max-w-[48ch] mb-7">
                Someone in wave C running the same time as someone in wave A
                sits level on the leaderboard — no mental arithmetic for the
                people watching, no asterisks in the results.
              </p>
              <Button href="/for-organisers" variant="secondary">
                Run your race on Aster
              </Button>
            </div>
            <WaveStartDiagram />
          </div>
        </Section>

        {/* ---- Supporting feature cards ---- */}
        <Section tone="white">
          <Kicker>In the race</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-10 text-dark">
            Built for the way running races.
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {featureCards.map((f) => (
              <Card key={f.title}>
                <Kicker className="!mb-2">{f.kicker}</Kicker>
                <p className="font-condensed uppercase font-bold text-xl text-dark mb-2">
                  {f.title}
                </p>
                <p className="text-[15px] leading-normal text-dark/70 m-0">
                  {f.body}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        {/* ---- Watcher strip ---- */}
        <Section tone="dark" className="relative">
          <RouteMotif tone="dark" variant={1} flip />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="max-w-[640px]">
              <Kicker tone="dark">For the watchers</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-4 text-mint">
                Mile 70, 3 a.m. Still moving. Still okay.
              </h2>
              <p className="text-lg leading-normal text-mint/70 max-w-[46ch] mb-7">
                Somewhere on a dark hillside they&apos;re still moving across
                the map — and everyone at home knows they&apos;re okay. The
                live map, the leaderboard, the splits: open the link and
                watch the whole field move. No app to install, no account to
                make, no per-watcher fees. Ever.
              </p>
              <Button href={appLinks.discover} variant="primary">
                Watch a live race — no signup
              </Button>
            </div>
            <Image
              src="/images/running-holding/r4-firetower.jpg"
              alt="A trail runner in autumn colours below a fire tower"
              width={900}
              height={1100}
              sizes="(min-width: 1024px) 420px, 88vw"
              className="w-full h-auto rounded-2xl border-2 border-dark shadow-pop-lime object-cover max-w-[440px] justify-self-center lg:justify-self-end"
            />
          </div>
        </Section>

        {/* ---- CTA band ---- */}
        <section className="bg-dark text-mint text-center">
          <div className="container-site py-16 md:py-24 max-w-[900px]">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] text-[clamp(34px,5vw,60px)] mb-3.5 text-mint">
              Toeing the line?
            </h2>
            <p className="text-[19px] text-mint/70 max-w-[42ch] mx-auto mb-8">
              Free for runners forever, from training days to her first
              50-miler — no tracker hire, no card, all-day tracking from one
              charge. Organisers — let&apos;s put your race on the map.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <Button href={appLinks.signup} variant="primary">
                Track your next run — free
              </Button>
              <Button href="/for-organisers" variant="secondary">
                Run your race on Aster
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
