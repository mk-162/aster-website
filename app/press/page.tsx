import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Card from "@/components/Card";
import Button from "@/components/Button";
import RouteMotif from "@/components/RouteMotif";

export const metadata: Metadata = {
  title: "Press & media kit",
  description:
    "Press resources: launch press release, fast facts, brand kit download, founder bio and a direct press contact. UK-based, pre-launch, built by James Vickers.",
  alternates: { canonical: "/press" },
};

/* ------------------------------------------------------------------ */
/* The press release — standard form, structured for copy-paste.       */
/* Facts sourced from the current astertrack.app/press page and the    */
/* brand fact sheet; nothing invented.                                 */
/* ------------------------------------------------------------------ */

const RELEASE = {
  embargo: "FOR IMMEDIATE RELEASE",
  dateline: "UNITED KINGDOM — 2 July 2026",
  headline: "Aster brings live tracking to the endurance races that never had it.",
  subhead:
    "New UK platform replaces £20–50k satellite hardware with the phone athletes already carry — free for athletes and the people watching them.",
  body: [
    "Live tracking has long been a luxury in endurance sport. Following a race as it happens has meant hardware satellite trackers costing £20–50k per event to ship, recover, and replace — economics that work for a handful of marquee races and break for everyone else. Around 95% of endurance events have never had live tracking at all.",
    "Aster, launching from the UK, changes the economics by removing the hardware entirely. The tracker is the phone the athlete is already carrying. Athletes start tracking from their pocket; family, friends, and fans follow along live from one shared link, in any browser, with no app to install and nothing to pay. Tracking and watching are free for athletes and their people, and stay that way.",
    "Clubs get route distribution and members-only live maps, so every club run and reliability ride can be followed by the people who care. Organisers get live tracking, leaderboards, and sponsor inventory for their events as a simple subscription — replacing the hardware line on the budget with one bill.",
    "“Live tracking shouldn’t depend on whether a race can afford crates of satellite units,” said James Vickers, founder of Aster and co-founder of RGT Cycling, which was acquired by Wahoo in 2022. “The phone in every jersey pocket and running vest is already a better tracker than the box on the handlebars. Our job is to switch it on, and to make watching someone you love ride through the night actually good.”",
    "Aster is currently pre-launch, with its first marquee events planned for spring 2027. Clubs and event organisers can register interest now at astertrack.app.",
  ],
  boilerplate:
    "Aster is a live GPS tracking and sharing platform for endurance sport, built by Manual Focus Ltd in the United Kingdom. It replaces £20–50k hardware satellite trackers with the phone the athlete already carries, bringing live tracking to the roughly 95% of endurance races that have never had it. Aster is free for athletes and watchers; clubs and organisers subscribe. Founded by James Vickers, co-founder of RGT Cycling (acquired by Wahoo in 2022).",
  contact: "Press contact: press@astertrack.app",
};

const FAST_FACTS = [
  { label: "Founded", value: "United Kingdom, by James Vickers" },
  { label: "Legal entity", value: "Manual Focus Ltd" },
  {
    label: "What it replaces",
    value: "£20–50k hardware satellite trackers — with the athlete’s own phone",
  },
  {
    label: "The gap",
    value: "~95% of endurance races have never had live tracking",
  },
  {
    label: "For athletes & watchers",
    value: "Free, forever. One shared link, any browser, no app for spectators",
  },
  {
    label: "For clubs & organisers",
    value: "Route distribution, members-only live maps, leaderboards, sponsor inventory — as a subscription",
  },
  { label: "Status", value: "Pre-launch; first marquee events spring 2027" },
  {
    label: "Founder background",
    value: "Co-founder of RGT Cycling, acquired by Wahoo in 2022",
  },
];

export default function PressPage() {
  return (
    <>
      <SiteNav />
      <main>
        {/* Hero */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={2} />
          <div className="relative z-10">
            <Kicker tone="dark">Press · Media kit</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(40px,7vw,72px)] text-mint mt-3 mb-4">
              Writing about Aster?
              <br />
              <span className="text-lime">Everything you need is here.</span>
            </h1>
            <p className="text-lg leading-normal text-mint/70 max-w-[56ch]">
              The launch release, fast facts, the brand kit, and a direct line
              to the founder. Press enquiries get a same-day response at{" "}
              <a
                href="mailto:press@astertrack.app"
                className="text-lime font-semibold underline"
              >
                press@astertrack.app
              </a>
              .
            </p>
          </div>
        </Section>

        {/* The press release */}
        <Section tone="white">
          <div className="max-w-[760px] mx-auto">
            <Kicker>Press release · 2 July 2026</Kicker>
            <p className="text-sm text-dark/60 mb-6">
              Journalists are welcome to reproduce this release, in full or in
              part, without asking.
            </p>

            <article className="border-2 border-dark rounded-2xl bg-white shadow-pop-2 p-6 sm:p-10">
              <p className="font-condensed uppercase tracking-[0.08em] font-semibold text-[13px] text-lime-deep mb-6">
                {RELEASE.embargo}
              </p>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1] text-[clamp(26px,3.6vw,38px)] text-dark mb-3">
                {RELEASE.headline}
              </h2>
              <p className="text-lg leading-normal text-dark/80 font-medium mb-6">
                {RELEASE.subhead}
              </p>
              <p className="font-condensed uppercase tracking-[0.04em] font-semibold text-sm text-dark/60 mb-5">
                {RELEASE.dateline}
              </p>
              <div className="space-y-4">
                {RELEASE.body.map((para) => (
                  <p key={para.slice(0, 40)} className="text-[15px] leading-relaxed text-dark/85">
                    {para}
                  </p>
                ))}
              </div>

              <hr className="border-t-2 border-dark/10 my-7" />

              <p className="font-condensed uppercase tracking-[0.06em] font-semibold text-sm text-dark mb-2">
                About Aster
              </p>
              <p className="text-[15px] leading-relaxed text-dark/80 mb-5">
                {RELEASE.boilerplate}
              </p>
              <p className="text-[15px] font-medium text-dark">
                Press contact:{" "}
                <a
                  href="mailto:press@astertrack.app"
                  className="text-lime-deep font-semibold underline"
                >
                  press@astertrack.app
                </a>
              </p>
            </article>
          </div>
        </Section>

        {/* Fast facts */}
        <Section tone="stone">
          <div className="max-w-[880px] mx-auto">
            <Kicker>Fast facts</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(28px,4vw,40px)] text-dark mb-8">
              The 30-second fact sheet.
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {FAST_FACTS.map((f) => (
                <Card key={f.label}>
                  <p className="font-condensed uppercase tracking-[0.06em] font-semibold text-xs text-lime-deep mb-1.5">
                    {f.label}
                  </p>
                  <p className="text-[15px] leading-normal text-dark/85 m-0">
                    {f.value}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* Brand kit download */}
        <Section tone="white">
          <div className="max-w-[880px] mx-auto">
            <Kicker>Brand kit</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(28px,4vw,40px)] text-dark mb-8">
              Logos, colours, type, photography.
            </h2>
            <Card tone="dark" className="!p-8 sm:!p-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                <div className="flex-1">
                  <p className="font-condensed uppercase tracking-[0.06em] font-semibold text-sm text-lime mb-3">
                    One download, everything in it
                  </p>
                  <p className="text-[15px] leading-relaxed text-mint/80 m-0">
                    Logo marks in four colourways (SVG + PNG), brand colours,
                    typography, and photography samples — with a short BRAND.md
                    covering how to use them.
                  </p>
                </div>
                <div className="shrink-0">
                  <a
                    href="/press/aster-brand-kit.zip"
                    download
                    className="inline-flex items-center justify-center border-2 border-dark rounded-xl font-condensed uppercase tracking-[0.03em] font-bold text-dark cursor-pointer select-none transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none bg-lime shadow-pop-lime hover:brightness-105 h-14 px-7 text-lg"
                  >
                    Download the brand kit (.zip)
                  </a>
                </div>
              </div>
            </Card>

            {/* Logo dos / don'ts */}
            <div className="grid gap-4 sm:grid-cols-3 mt-6">
              <div className="border-2 border-dark rounded-2xl bg-dark shadow-pop-1 p-5">
                <p className="font-condensed uppercase tracking-[0.06em] font-semibold text-xs text-lime mb-1.5">
                  Do
                </p>
                <p className="text-sm leading-normal text-mint/80 m-0">
                  Use the lime mark on dark backgrounds — the primary lockup.
                </p>
              </div>
              <div className="border-2 border-dark rounded-2xl bg-white shadow-pop-1 p-5">
                <p className="font-condensed uppercase tracking-[0.06em] font-semibold text-xs text-lime-deep mb-1.5">
                  Do
                </p>
                <p className="text-sm leading-normal text-dark/80 m-0">
                  Use the lime-deep mark on light backgrounds and in print.
                </p>
              </div>
              <div className="border-2 border-dark rounded-2xl bg-white shadow-pop-1 p-5">
                <p className="font-condensed uppercase tracking-[0.06em] font-semibold text-xs text-dark/50 mb-1.5">
                  Don&rsquo;t
                </p>
                <p className="text-sm leading-normal text-dark/80 m-0">
                  Never set lime text on white — it fails contrast. Use
                  lime-deep instead.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Founder teaser */}
        <Section tone="stone">
          <div className="max-w-[880px] mx-auto">
            <Kicker>The founder</Kicker>
            <Card href="/founder" className="!p-8 sm:!p-10">
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(26px,3.6vw,36px)] text-dark mb-3">
                James Vickers.
              </h2>
              <p className="text-[15px] leading-relaxed text-dark/80 mb-4 max-w-[62ch]">
                Co-founder of RGT Cycling, the virtual cycling platform
                acquired by Wahoo in 2022. Now building Aster at Manual Focus
                Ltd in the UK — on the conviction that live tracking
                shouldn&rsquo;t be a luxury for the few events that can afford
                hardware.
              </p>
              <span className="font-condensed uppercase tracking-[0.04em] font-bold text-lime-deep">
                About the founder →
              </span>
            </Card>
          </div>
        </Section>

        {/* Press contact band */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={1} flip />
          <div className="relative z-10 text-center">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,5vw,48px)] text-mint mb-4">
              On deadline? Email us.
            </h2>
            <p className="text-lg leading-normal text-mint/70 max-w-[48ch] mx-auto mb-8">
              Quotes, interviews, high-res assets, or fact-check questions —
              press enquiries get a same-day response.
            </p>
            <Button href="mailto:press@astertrack.app?subject=Press%20enquiry">
              press@astertrack.app
            </Button>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
