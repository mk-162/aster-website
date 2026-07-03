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
  title: "For athletes — free live tracking, forever",
  description:
    "Track any ride or run live from the phone in your pocket and share it with family, your club and the finish line. Free for athletes, forever — no hardware needed.",
  alternates: { canonical: "/for-athletes" },
};

/* ---- Copy (founder brief 2026-07-02: tracking + sharing framing,
 * fun over safety-lecture — no pricing numbers) ---- */

const trackPoints = [
  {
    title: "One tap and go.",
    body: "Tap Start at the trailhead, put the phone in your pocket, and forget about it. No unit to rent, no cradle to mount, no beeping to babysit.",
  },
  {
    title: "Built for all day.",
    body: "Tuned for endurance, not for burning the battery. A full day out on the phone you started with — climbs, café, the long way home.",
  },
  {
    title: "Free. Forever.",
    body: "Tracking, sharing, being watched — none of it costs you anything. Not a trial, not a tier. Organisers pay for events; you never do.",
  },
];

const sharePoints = [
  {
    title: "Your family, along for the ride.",
    body: "One link and they're watching live in any browser — no app, no account. Dinner goes on when you're twenty minutes out, not when you were 'probably close'.",
  },
  {
    title: "Your club knows you're out.",
    body: "Roll out and your clubmates can see it. Someone's always up the road; sometimes they wait at the junction. That's the whole point of a club.",
  },
  {
    title: "Finishes worth sharing.",
    body: "The line-crossing, the ride story, the numbers you're quietly proud of — ready to share the moment they happen, not after an evening of screenshots.",
  },
];

const routePoints = [
  {
    title: "Follow the club's route.",
    body: "Sunday's route lands on your phone in one tap from the club library — right version, every time, with the map saved for the signal-free bits.",
  },
  {
    title: "Race the course.",
    body: "Registered for an event? The course, the checkpoints, and the finish line come with it. Cross the line and the result is simply there.",
  },
];

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Aster",
  url: "https://www.astertrack.app/",
  applicationCategory: "SportsApplication",
  operatingSystem: "Android, iOS, Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  publisher: { "@id": "https://www.astertrack.app/#organization" },
};

export default function ForAthletes() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <SiteNav />
      <main>
        {/* ---- Hero ---- */}
        <section className="relative overflow-hidden bg-dark text-mint border-b-2 border-dark">
          <Image
            src="/images/cycling/18-gravel-rollout-dust.webp"
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
            <Kicker tone="dark">For athletes &middot; Rides &middot; Runs &middot; Races</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.92] text-mint text-[clamp(46px,6vw,88px)] mb-6 max-w-[16ch] text-balance">
              You do the thing. We bring your people.
            </h1>
            <p className="text-[clamp(18px,1.6vw,21px)] leading-normal text-mint/85 max-w-[48ch] mb-9">
              The ride, the run, the race &mdash; that&apos;s yours. Aster
              tracks it live from the phone in your pocket and carries the
              people who care along with you: family at home, clubmates on the
              road, everyone screaming at the finish.
            </p>
            <div className="flex gap-3.5 flex-wrap items-center">
              <Button href={appLinks.signup} variant="primary">
                Start tracking — free
              </Button>
              <Button href={appLinks.discover} variant="secondary">
                Find an event
              </Button>
            </div>
          </div>
        </section>

        {/* ---- Track ---- */}
        <Section tone="stone" className="!overflow-hidden">
          <RouteMotif tone="light" variant={1} />
          <div className="relative z-10">
            <Kicker>Track &middot; Phone in pocket</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
              The tracker is already in your pocket.
            </h2>
            <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-10">
              No hardware, no faff, no subscription maths. Tap Start and get on
              with the good part.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {trackPoints.map((p) => (
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

        {/* ---- Share ---- */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={2} flip />
          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <Kicker tone="dark">Share &middot; The best bit</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-mint">
                Doing it is good. Sharing it is better.
              </h2>
              <p className="text-lg leading-normal text-mint/70 max-w-[48ch] mb-8">
                A big day out is a story, and stories want an audience. Share
                your live location with the people who care, your routes with
                your club, your finishes with absolutely everyone.
              </p>
              <div className="grid gap-4">
                {sharePoints.map((p) => (
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
            <figure className="m-0 border-2 border-dark rounded-2xl overflow-hidden bg-dark shadow-pop-lime">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/cycling/08-two-finish.webp"
                  alt="Two riders celebrating together as they cross a finish line"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <figcaption className="p-4 text-[15px] leading-normal text-mint/80 border-t-2 border-dark">
                The finish is better when they saw the whole thing.
              </figcaption>
            </figure>
          </div>
        </Section>

        {/* ---- Routes ---- */}
        <Section tone="white">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <Kicker>Routes &middot; Never lost</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-4 text-dark">
                The right route, on your phone, in one tap.
              </h2>
              <p className="text-lg leading-normal text-dark/70 max-w-[46ch] mb-8">
                No GPX archaeology in the group chat, no &ldquo;which
                version?&rdquo; at the car park.
              </p>
              <div className="grid gap-4">
                {routePoints.map((p) => (
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
            <figure className="m-0 border-2 border-dark rounded-2xl overflow-hidden bg-white shadow-pop-2">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/cycling/02-female-three-quarter.webp"
                  alt="A cyclist riding relaxed on an open gravel road"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <figcaption className="p-4 text-[15px] leading-normal text-dark/80 border-t-2 border-dark">
                Know the way. Enjoy the wandering.
              </figcaption>
            </figure>
          </div>
        </Section>

        {/* ---- Safety, honestly ---- */}
        <Section tone="stone">
          <Kicker>The serious bit &middot; Kept short</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-5 text-dark">
            And if the day goes sideways.
          </h2>
          <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-10">
            We won&apos;t lecture you. Two things are true and then we&apos;ll
            get back to the fun.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-dark mb-1">
                SOS, one tap.
              </p>
              <p className="text-[15px] leading-normal text-dark/70 m-0">
                Your live position goes straight to your people. Hopefully you
                never tap it. If you do, it works.
              </p>
            </Card>
            <Card>
              <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-dark mb-1">
                Dead zones don&apos;t break it.
              </p>
              <p className="text-[15px] leading-normal text-dark/70 m-0">
                No signal on the moor or in the valley? The phone keeps
                recording offline and catches up the moment signal returns.
                Start and finish work with no bars at all.
              </p>
            </Card>
          </div>
        </Section>

        {/* ---- Final CTA ---- */}
        <section className="bg-dark text-mint text-center">
          <div className="container-site py-16 md:py-24 max-w-[900px]">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] text-[clamp(34px,5vw,60px)] mb-3.5 text-mint">
              Go do the thing.
            </h2>
            <p className="text-[19px] text-mint/70 max-w-[42ch] mx-auto mb-8">
              Set up before your next ride or run &mdash; it takes about a
              minute, and it costs you nothing, ever.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <Button href={appLinks.signup} variant="primary">
                Start tracking — free
              </Button>
              <Button href={appLinks.discover} variant="secondary">
                Find an event
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
