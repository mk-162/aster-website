import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Card from "@/components/Card";
import PhoneFrame from "@/components/PhoneFrame";
import HeroMontage from "@/components/HeroMontage";
import HeroMap from "@/components/HeroMap";
import DeviceDuo from "@/components/DeviceDuo";
import PhotoStrip from "@/components/PhotoStrip";
import RouteMotif from "@/components/RouteMotif";
import CommunityWall from "@/components/CommunityWall";
import { appLinks } from "@/lib/links";

/* ---- Copy (marketing overhaul 2026-07-02: product-led hero, real app
 * screenshots, runner-inclusive, persuasion pass — no pricing numbers
 * beyond documented comparisons) ---- */

const steps = [
  {
    n: "01",
    body: "Tap Start. The phone already in your pocket becomes the tracker — no unit to rent, charge, or hand back.",
  },
  {
    n: "02",
    body: "Share one link. Anyone can open it in any browser and follow you live on the map. No app, no account, no login.",
  },
  {
    n: "03",
    body: "Finish watched. The moment you cross the line, everyone following knows — and the whole ride or run is saved.",
    dark: true,
  },
];

const audiences = [
  {
    kicker: "For athletes",
    label: "Athletes",
    title: "Take your people with you.",
    body: "Track your Sunday club run or a 300 km gravel race from the phone you already carry. Free, forever.",
    href: "/for-athletes",
  },
  {
    kicker: "For watchers",
    label: "Watchers",
    title: "They're moving. They're okay.",
    body: "One link, any browser, no login. Follow the whole ride or run live — not just the finish.",
    href: "/for-watchers",
  },
  {
    kicker: "For clubs",
    label: "Clubs",
    title: "Every Sunday, on one map.",
    body: "Recurring rides and runs, a members-only live map, and ride-leader tools that know who's off the back.",
    href: "/clubs",
  },
  {
    kicker: "For organisers",
    label: "Organisers",
    title: "Tracking that pays for itself.",
    body: "Live map, leaderboard, finish detection — and sponsor slots you sell. No hardware van.",
    href: "/for-organisers",
  },
];

const objections = [
  {
    title: "Dead zones don't break it.",
    body: "No signal on the moor or in the valley? The phone keeps recording offline and catches up the moment signal returns. The trail fills in and nothing is lost.",
  },
  {
    title: "All-day tracking from one charge.",
    body: "Tuned for endurance, not for burning the battery. Riders and runners track all day on the phone they started with.",
  },
  {
    title: "Free for athletes. Forever.",
    body: "Tracking, sharing, and being watched cost you nothing — not a trial, not a tier. Organisers pay for events; you never do.",
  },
  {
    title: "Help knows where you are.",
    body: "SOS sends your live position to your people. Hopefully you never tap it. If you do, it works.",
  },
];

const stats = [
  {
    value: "£0",
    label: "for athletes and watchers — against £20–£40/head tracker rental at hardware-tracked events",
  },
  {
    value: "One link",
    label: "is all a watcher needs. Any browser, no app, no account",
  },
  {
    value: "Zero",
    label: "hardware to buy, charge, hand out, or chase back at the finish",
  },
  {
    value: "Live",
    label: "positions, gaps, and finishes as they happen — not a results PDF the day after",
  },
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/* ---- JSON-LD: Organization + WebSite. @id values MUST stay identical
 * to app/about/page.tsx so the entity graph merges. ---- */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.astertrack.app/#organization",
  name: "Aster",
  legalName: "Manual Focus Ltd",
  url: "https://www.astertrack.app/",
  logo: "https://www.astertrack.app/brand/aster-mark-lime.svg",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "press",
      email: "press@astertrack.app",
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@astertrack.app",
    },
  ],
  founder: {
    "@type": "Person",
    "@id": "https://www.astertrack.app/about#james-vickers",
    name: "James Vickers",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.astertrack.app/#website",
  name: "Aster",
  url: "https://www.astertrack.app/",
  inLanguage: "en-GB",
  publisher: { "@id": "https://www.astertrack.app/#organization" },
};

export default function Home() {
  return (
    <>
      <SiteNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <main>
        {/* ---- Hero: product-led, sport-neutral (the app IS the picture) ---- */}
        <section className="relative overflow-hidden bg-dark text-mint border-b-2 border-dark">
          <HeroMap />
          <div className="relative z-10 container-site py-16 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
              <div>
                <Kicker tone="dark">Live tracking · Rides · Runs · Races</Kicker>
                <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.92] text-mint text-[clamp(46px,6vw,88px)] mb-6 max-w-[16ch] text-balance">
                  Out there. <span className="text-lime">Watched over.</span>
                </h1>
                <p className="text-[clamp(18px,1.6vw,21px)] leading-normal text-mint/85 max-w-[48ch] mb-9">
                  Aster turns the phone in your pocket into a live tracker.
                  Ride or run anywhere — a Sunday club run, a 300 km gravel
                  race, her first 50-miler — share one link, and everyone you
                  love follows you live in any browser. Free for athletes,
                  forever.
                </p>
                <div className="flex gap-3.5 flex-wrap items-center">
                  <Button href={appLinks.signup} variant="primary">
                    Start tracking — free
                  </Button>
                  <Button href={appLinks.discover} variant="secondary">
                    Watch a live race — no signup
                  </Button>
                </div>
                {/* Free-forever banner: the individual-athlete promise, with
                    the app link as the action (PWA — "download" = open/install). */}
                <div className="mt-6 inline-flex flex-wrap items-center gap-x-4 gap-y-3 border-2 border-lime/60 rounded-2xl bg-lime/10 px-5 py-3.5">
                  <p className="font-condensed uppercase tracking-[0.05em] font-bold text-lime text-base leading-tight">
                    Free forever — for individuals
                  </p>
                  <Button href={appLinks.login} variant="primary" size="sm">
                    Download now
                  </Button>
                </div>
              </div>
              <HeroMontage className="max-w-[300px] sm:max-w-[420px] lg:max-w-[480px] mx-auto lg:mx-0 lg:justify-self-end w-full" />
            </div>
          </div>
        </section>

        {/* ---- Two-door band: ride / run ---- */}
        <Section tone="stone">
          <div className="grid gap-4 md:grid-cols-2">
            <Card href="/cycling" className="flex flex-col">
              <Kicker className="!mb-2">Cycling</Kicker>
              <p className="font-condensed uppercase font-bold text-[clamp(26px,3vw,36px)] leading-[0.95] text-dark mb-3">
                Built for the ride.
              </p>
              <p className="text-[16px] leading-normal text-dark/70 mb-5">
                Gravel, road, ultra, audax. Mass starts done properly,
                checkpoint gaps live, and tracking that survives the dead
                zones.
              </p>
              <span className="mt-auto font-condensed uppercase tracking-[0.03em] font-bold text-sm text-lime-deep">
                Aster for cycling →
              </span>
            </Card>
            <Card href="/running" className="flex flex-col">
              <Kicker className="!mb-2">Running</Kicker>
              <p className="font-condensed uppercase font-bold text-[clamp(26px,3vw,36px)] leading-[0.95] text-dark mb-3">
                Built for the run.
              </p>
              <p className="text-[16px] leading-normal text-dark/70 mb-5">
                Trail ultras, fell races, road races. Wave starts with honest
                timing, aid-station splits, and SOS on remote ridge lines.
              </p>
              <span className="mt-auto font-condensed uppercase tracking-[0.03em] font-bold text-sm text-lime-deep">
                Aster for running →
              </span>
            </Card>
          </div>
        </Section>

        {/* ---- Drifting photo band (the strip from the current site) ---- */}
        <PhotoStrip
          images={[
            { src: "/images/cycling/hero-dust.webp", alt: "Gravel riders raising dust on an open road at golden hour" },
            { src: "/images/running-holding/r4-firetower.jpg", alt: "A trail runner mid-race in autumn woods" },
            { src: "/images/cycling/14-peloton-twilight-climb.webp", alt: "A group stretched up a twilight climb" },
            { src: "/images/cycling/13-road-female-wet.webp", alt: "A road cyclist pushing through rain and spray" },
          ]}
        />

        {/* ---- Watch it live: real desktop spectator view ---- */}
        <Section tone="dark">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
            <div>
              <Kicker tone="dark">For the ones waiting</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-4 text-mint">
                &ldquo;Somewhere past CP2&rdquo; is not an answer.
              </h2>
              <p className="text-lg leading-normal text-mint/70 max-w-[46ch] mb-4">
                When someone you love is hours deep into a race, the silence
                is the hard part. A text at the last checkpoint tells you
                where they were. The live map tells you where they are.
              </p>
              <p className="text-lg leading-normal text-mint/70 max-w-[46ch] mb-7">
                They&apos;re moving. They&apos;re okay. You can see it. The
                whole field, the gaps, the finishes — live in any browser,
                from one shared link. No app to install, no account to make.
              </p>
              <div className="flex gap-3.5 flex-wrap items-center">
              <Button href={appLinks.discover} variant="primary">
                Watch a live race — no signup
              </Button>
              <Button href="/for-watchers" variant="secondary">
                For the watchers
              </Button>
              </div>
            </div>
            {/* Works on both — desktop view with the phone hanging off its
                corner (founder-requested montage). */}
            <DeviceDuo
              desktopAlt="The Aster desktop spectator view: dark sidebar, live map of a 100-rider race, and the leaderboard panel"
              phoneAlt="The same live race, followed from a phone"
              url="astertrack.app/watch/…"
            />
          </div>
        </Section>

        {/* ---- How it works ---- */}
        <Section tone="white">
          <Kicker>How it works</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-10 text-dark">
            Start. Share. Finish watched.
          </h2>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="grid gap-4">
              {steps.map((s) => (
                <Card
                  key={s.n}
                  tone={s.dark ? "dark" : "white"}
                  className={s.dark ? "!shadow-pop-lime" : ""}
                >
                  <div className="flex items-start gap-5">
                    <span
                      className={`font-condensed font-bold text-4xl leading-none ${
                        s.dark ? "text-lime" : "text-lime-deep"
                      }`}
                    >
                      {s.n}
                    </span>
                    <p className="text-[17px] leading-normal m-0">{s.body}</p>
                  </div>
                </Card>
              ))}
            </div>
            <PhoneFrame
              src="/images/app/live-riders-phone.png"
              alt="The Aster riders list on a phone: the live leaderboard of a race in progress"
              className="max-w-[280px] md:max-w-[320px] mx-auto"
            />
          </div>
        </Section>

        {/* ---- Objections answered + proof stats ---- */}
        <Section tone="stone">
          <Kicker>The honest answers</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-8 text-dark">
            The questions everyone asks. Answered.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 mb-12">
            {objections.map((w) => (
              <Card key={w.title}>
                <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-dark mb-1">
                  {w.title}
                </p>
                <p className="text-[15px] leading-normal text-dark/70 m-0">
                  {w.body}
                </p>
              </Card>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 border-t-2 border-dark pt-8">
            {stats.map((s) => (
              <div key={s.value}>
                <p className="font-condensed font-bold text-4xl leading-none text-dark mb-1.5">
                  {s.value}
                </p>
                <p className="text-sm leading-normal text-dark/60 m-0">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ---- Atmosphere band (running holding image — two-sport balance) ---- */}
        <Section tone="photo" photoSrc="/images/running-holding/r2-transylvania.jpg">
          <div className="max-w-[640px]">
            <Kicker tone="dark">Any distance · Any surface</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-4 text-mint">
              Every mile deserves a witness.
            </h2>
            <p className="text-lg leading-normal text-mint/80 max-w-[46ch] mb-7">
              A gravel race through the dust. A dawn start on a 100-mile
              trail ultra. The club run that got carried away. If it&apos;s
              worth doing, someone wants to watch you do it.
            </p>
            <Button href={appLinks.signup} variant="primary">
              Start tracking — free
            </Button>
          </div>
        </Section>

        {/* ---- The good bits: finish celebrations + mates (fun pass) ---- */}
        <Section tone="stone">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/images/cycling/08-two-finish.webp"
                alt="Two riders celebrating together as they cross a finish line"
                width={800}
                height={1000}
                sizes="(min-width: 1024px) 300px, 44vw"
                className="w-full h-auto rounded-2xl border-2 border-dark shadow-pop-2 object-cover"
              />
              <Image
                src="/images/running-holding/r1-badger.jpg"
                alt="Trail runners and a dog out on a hillside path"
                width={800}
                height={1000}
                sizes="(min-width: 1024px) 300px, 44vw"
                className="w-full h-auto rounded-2xl border-2 border-dark shadow-pop-2 object-cover mt-8"
              />
            </div>
            <div>
              <Kicker>The good bits</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-4 text-dark">
                Nobody frames a results PDF.
              </h2>
              <p className="text-lg leading-normal text-dark/70 max-w-[46ch] mb-4">
                The finish-line hug. The mate who rode the last 40 km on your
                wheel. The dog that met you at mile 20. Sport is better when
                the people who care get to be part of it — and now they can
                be, from anywhere.
              </p>
              <p className="text-lg leading-normal text-dark/70 max-w-[46ch] mb-7">
                Track it. Share it. Let them cheer at the kitchen table.
              </p>
              <Button href={appLinks.signup} variant="primary">
                Start tracking — free
              </Button>
            </div>
          </div>
        </Section>

        {/* ---- Community wall: the festival collage + phone centrepiece ---- */}
        <CommunityWall />

        {/* ---- Audience cards ---- */}
        <Section tone="white">
          <Kicker>One platform</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-10 text-dark">
            Pick where you are.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a) => (
              <Card key={a.href} href={a.href} className="flex flex-col">
                <Kicker className="!mb-2">{a.kicker}</Kicker>
                <p className="font-condensed uppercase font-bold text-xl text-dark mb-2">
                  {a.title}
                </p>
                <p className="text-[15px] leading-normal text-dark/70 mb-4">
                  {a.body}
                </p>
                <span className="mt-auto font-condensed uppercase tracking-[0.03em] font-bold text-sm text-lime-deep">
                  {a.label} →
                </span>
              </Card>
            ))}
          </div>
        </Section>

        {/* ---- Final CTA ---- */}
        <section className="relative overflow-hidden bg-dark text-mint text-center">
          <RouteMotif tone="dark" variant={2} flip />
          <div className="relative z-10 container-site py-16 md:py-24 max-w-[900px] mx-auto">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] text-[clamp(34px,5vw,60px)] mb-3.5 text-mint">
              Your next one could be watched.
            </h2>
            <p className="text-[19px] text-mint/70 max-w-[42ch] mx-auto mb-8">
              Free for athletes and watchers, forever. Set up before your
              next ride or run — it takes about a minute.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <Button href={appLinks.signup} variant="primary">
                Start tracking — free
              </Button>
              <Button href={appLinks.discover} variant="secondary">
                Watch a live race — no signup
              </Button>
              <Button href="/for-organisers" variant="secondary">
                I organise events
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
