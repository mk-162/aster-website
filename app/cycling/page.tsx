import Image from "next/image";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Card from "@/components/Card";
import RouteMotif from "@/components/RouteMotif";
import { appLinks } from "@/lib/links";

export const metadata: Metadata = {
  title: "Live tracking for cycling — races, gravel and ultras",
  description:
    "Live GPS tracking for gravel, road, ultra and audax. Mass starts done properly, checkpoint racing, and a live map your people can watch without logging in.",
  alternates: { canonical: "/cycling" },
};

/* ---- Cycling-lander copy (redline: keep-for-cycling set) ---- */

const featureCards = [
  {
    kicker: "Checkpoint racing",
    title: "The gap right now, not at the last CP.",
    body: "Checkpoints, splits, and live gaps for point-to-point and ultra formats. Watchers see who's moving and who's stopped for a resupply — as it happens, not hours later.",
  },
  {
    kicker: "Built for the long stuff",
    title: "The line stays on when the bars don't.",
    body: "Gravel, audax, and multi-day ultras roll through dead zones. Pings queue on the phone and fill in the moment signal returns — the trail catches up and nothing goes missing.",
  },
  {
    kicker: "No hardware",
    title: "The tracker is already in your jersey pocket.",
    body: "No satellite units to rent, charge, hand out, or chase back after the finish. The phone a rider already carries is the tracker.",
  },
];

/** Mass-start diagram — the whole field goes live on the gun; pre-gun
 * pings are discarded. Built from DS chips and bars, no imagery. */
function MassStartDiagram() {
  const riders = [
    { name: "R 12", pre: 22 },
    { name: "R 47", pre: 34 },
    { name: "R 08", pre: 15 },
    { name: "R 91", pre: 28 },
  ];
  return (
    <div className="border-2 border-dark rounded-2xl bg-dark text-mint p-5 md:p-7 shadow-pop-lime">
      <div className="flex items-center justify-between mb-5">
        <span className="font-condensed uppercase tracking-[0.08em] font-semibold text-[13px] text-lime">
          Mass start · One gun · One clock
        </span>
        <span className="flex items-center gap-2 bg-white/10 border-2 border-mint/30 rounded-full px-3 py-1">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          <span className="font-mono font-bold text-[13px] tabular-nums">
            00:00:00
          </span>
        </span>
      </div>
      <div className="relative">
        {/* The gun line */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 w-[3px] bg-lime rounded-full"
          style={{ left: "42%" }}
        />
        <div className="space-y-3">
          {riders.map((r) => (
            <div key={r.name} className="flex items-center gap-3">
              <span className="font-condensed uppercase font-bold text-sm w-10 shrink-0 text-mint/70">
                {r.name}
              </span>
              <div className="relative h-7 flex-1">
                {/* Pre-gun warm-up pings — discarded */}
                <div
                  aria-hidden
                  className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-mint/15"
                  style={{ left: `${42 - r.pre}%`, width: `${r.pre - 3}%` }}
                />
                {/* Live from the gun */}
                <div
                  aria-hidden
                  className="absolute top-1/2 -translate-y-1/2 h-4 rounded-full bg-lime"
                  style={{ left: "42%", right: "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 text-[13px]">
          <span className="text-mint/50">
            Warm-up laps &amp; pre-gun pings — discarded
          </span>
          <span className="font-condensed uppercase tracking-[0.05em] font-bold text-lime">
            The gun → the whole field goes live
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CyclingPage() {
  return (
    <>
      <SiteNav />
      <main>
        {/* ---- Hero (gravel photography lives on this lander) ---- */}
        <section className="relative overflow-hidden bg-dark text-mint border-b-2 border-dark">
          <Image
            src="/images/cycling/hero-dust.webp"
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
            <Kicker tone="dark">For cycling · Races · Rides</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.92] text-mint text-[clamp(46px,6vw,88px)] mb-6 max-w-[16ch] text-balance">
              Be there for the whole ride.
            </h1>
            <p className="text-[clamp(18px,1.6vw,21px)] leading-normal text-mint/85 max-w-[46ch] mb-9">
              Live GPS tracking for gravel, road, ultra, and audax — from
              the phone already in your jersey pocket. Share one link and
              everyone you love follows every mile, all day on one charge.
              Free for riders, forever.
            </p>
            <div className="flex gap-3.5 flex-wrap items-center">
              <Button href={appLinks.signup} variant="primary">
                Track your next ride — free
              </Button>
              <Button href={appLinks.discover} variant="secondary">
                Watch a live race — no signup
              </Button>
            </div>
          </div>
        </section>

        {/* ---- Start-format feature: mass & gun starts ---- */}
        <Section tone="stone">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <Kicker>Mass starts · Gun starts</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-4 text-dark">
                The gun fires. The whole field goes live.
              </h2>
              <p className="text-lg leading-normal text-dark/70 max-w-[48ch] mb-4">
                One start moment for everyone. The instant the gun fires,
                every rider&apos;s clock, position, and leaderboard entry
                starts together — no staggered app-fiddling on the start
                line.
              </p>
              <p className="text-lg leading-normal text-dark/70 max-w-[48ch] mb-7">
                Warm-up loops and rolling to the line don&apos;t count.
                Anything recorded before the gun is discarded, so top speeds
                and distances come from the race — not the car park.
              </p>
              <Button href="/for-organisers" variant="secondary">
                Run your race on Aster
              </Button>
            </div>
            <MassStartDiagram />
          </div>
        </Section>

        {/* ---- Supporting feature cards ---- */}
        <Section tone="white">
          <Kicker>In the race</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-10 text-dark">
            Built for the way cycling races.
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

        {/* ---- Watcher / proof strip (finish celebration energy) ---- */}
        <Section
          tone="photo"
          photoSrc="/images/cycling/08-two-finish.webp"
        >
          <div className="max-w-[640px]">
            <Kicker tone="dark">Already trusted on gravel</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-4 text-mint">
              Family. Friends. Fans.
            </h2>
            <p className="text-lg leading-normal text-mint/80 max-w-[46ch] mb-7">
              Hour six of your 300 km race, you&apos;re still moving on the
              map — and everyone at home knows you&apos;re okay. Send one
              link and they get the live map, the leaderboard, the gaps —
              and they see you coming for the line before you do. No app to
              install, no account to make, no refreshing.
            </p>
            <Button href={appLinks.discover} variant="primary">
              Watch a live race — no signup
            </Button>
          </div>
        </Section>

        {/* ---- CTA band ---- */}
        <section className="relative overflow-hidden bg-dark text-mint text-center">
          <RouteMotif tone="dark" variant={2} />
          <div className="relative z-10 container-site py-16 md:py-24 max-w-[900px] mx-auto">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] text-[clamp(34px,5vw,60px)] mb-3.5 text-mint">
              On the start line?
            </h2>
            <p className="text-[19px] text-mint/70 max-w-[42ch] mx-auto mb-8">
              Free for riders forever, from the first training ride to race
              day — no tracker rental, no card, nothing to hand back.
              Organisers — let&apos;s put your race on the map.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <Button href={appLinks.signup} variant="primary">
                Track your next ride — free
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
