import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Card from "@/components/Card";
import RouteMotif from "@/components/RouteMotif";
import PhoneFrame from "@/components/PhoneFrame";
import BrowserFrame from "@/components/BrowserFrame";
import PhotoStrip from "@/components/PhotoStrip";
import CommunityWall from "@/components/CommunityWall";
import { appLinks } from "@/lib/links";

export const metadata: Metadata = {
  title: "For clubs — every ride and run on one live map",
  description:
    "One link gets your whole club in. Every ride, every run, every RSVP, and a live map on the day — in the one place your club already looks.",
  alternates: { canonical: "/clubs" },
};

/* ---- Copy (founder brief 2026-07-02: community-first, explicit
 * problem → solution, tracking + sharing framing — no pricing numbers).
 * Sharper wording folded in from the 2026-07 clubs overhaul, kept
 * sport-neutral (ride OR run) and price-free per the current rules. ---- */

const problems = [
  {
    title: "The ride lives in five places.",
    body: "The route is a Komoot link. The plan is three messages deep in a group chat that's mostly memes. Who's actually turning up is a count of thumbs-up emojis. And it all vanishes into the scroll by Monday.",
  },
  {
    title: "Nothing tells you what's next.",
    body: "Strava tells you what happened after the ride or run. Nothing tells you what's happening next — or brings the club together while it does. The best part of the week runs on guesswork and goodwill.",
  },
  {
    title: "Two groups, one club, zero contact.",
    body: "The fast group and the social group set off together and lose each other by mile ten. Same club, same morning, moving blind to each other.",
  },
  {
    title: "The one who got dropped.",
    body: "Puncture at the back, or a turn missed on the trail — nobody noticed for twenty minutes. Every club has this story. It shouldn't take a headcount at the café to find out.",
  },
];

const pillars = [
  {
    title: "One link. That's the whole setup.",
    body: "Paste one invite link into your club's group chat. Tap, and everyone's in — no chasing forty people to download an app and find your club. The link does the herding for you.",
    chip: "Get everyone in",
    chipClass: "bg-lime text-dark",
  },
  {
    title: "“I'm in” — the answer the group chat can't give you.",
    body: "The next ride or run sits at the top of your club page with one-tap RSVP. You see exactly who's turning up before you set off, not a guess from a thread of emojis.",
    chip: "Know who's coming",
    chipClass: "bg-gold text-dark",
  },
  {
    title: "The Sunday ride or run that runs itself.",
    body: "Set your weekly outing once and it appears every week on its own, with pace groups. Everyone who's in gets a reminder the day before and an hour out. No re-posting, no forgetting.",
    chip: "Set it once",
    chipClass: "bg-coral text-dark",
  },
  {
    title: "One live map. See the whole club roll.",
    body: "On the day, every member is on one map — the group ahead, whoever's off the back, whoever stopped. The leader can see everyone got home. Two-way SOS is there if a day ever goes wrong.",
    chip: "Everyone home",
    chipClass: "bg-mint text-dark",
  },
];

const belonging = [
  {
    src: "/images/running-holding/r1-badger.jpg",
    alt: "Three trail runners and a dog on a misty woodland trail",
    caption: "New members find the group — and the group's dog.",
  },
  {
    src: "/images/cycling/04-two-drafting.webp",
    alt: "Two cyclists drafting close together on an open road",
    caption: "Nobody goes out alone, even two groups apart.",
  },
  {
    src: "/images/cycling/08-two-finish.webp",
    alt: "Two riders celebrating together at a finish line",
    caption: "The group chat becomes cheering.",
  },
];

export default function Clubs() {
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
            <Kicker tone="dark">For clubs &middot; Every Sunday</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.92] text-mint text-[clamp(46px,6vw,88px)] mb-6 max-w-[18ch] text-balance">
              Your club, sorted.
            </h1>
            <p className="text-[clamp(18px,1.6vw,21px)] leading-normal text-mint/85 max-w-[48ch] mb-9">
              One link gets everyone in. Every ride, every run, every RSVP, and
              a live map on the day &mdash; in the one place your club already
              looks. Aster puts your club&apos;s routes, outings, and people on
              one map.
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

        {/* ---- Drifting photo band ---- */}
        <PhotoStrip
          images={[
            { src: "/images/cycling/04-two-drafting.webp", alt: "Two club riders drafting close on a fast road" },
            { src: "/images/running-holding/r2-transylvania.jpg", alt: "A dawn trail start, runners setting off together" },
            { src: "/images/cycling/11-road-startline-misty.webp", alt: "A misty start line before the group rolls out" },
            { src: "/images/cycling/08-two-finish.webp", alt: "Two riders celebrating at the finish together" },
          ]}
        />

        {/* ---- The problem ---- */}
        <Section tone="stone" className="!overflow-hidden">
          <RouteMotif tone="light" variant={2} flip />
          <div className="relative z-10">
            <Kicker>The Sunday-ride problem &middot; Be honest</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
              Your club&apos;s outing lives in five places.
            </h2>
            <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-10">
              Every club runs on the goodwill of whoever forwards the route,
              chases the RSVPs, and counts heads at the caf&eacute;. The riding
              and running is brilliant. The plumbing around it is a map link and
              a group chat doing jobs neither was built for. Aster is the one
              place the club goes.
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

        {/* ---- The solution — four capability beats ---- */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={1} />
          <div className="relative z-10">
            <Kicker tone="dark">Live today &middot; One place</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-mint">
              Everything to arrange a ride or run, in one place.
            </h2>
            <p className="text-lg leading-normal text-mint/70 max-w-[56ch] mb-10">
              Four things a club actually needs, and nothing it doesn&apos;t.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map((p) => (
                <Card key={p.title} className="flex flex-col">
                  <span
                    className={`self-start font-condensed uppercase tracking-[0.06em] font-bold text-[12px] rounded-full border-2 border-dark px-3 py-1 mb-4 ${p.chipClass}`}
                  >
                    {p.chip}
                  </span>
                  <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-xl text-dark mb-2">
                    {p.title}
                  </p>
                  <p className="text-[15px] leading-normal text-dark/70 m-0">
                    {p.body}
                  </p>
                </Card>
              ))}
            </div>
            <p className="text-[15px] leading-normal text-mint/70 max-w-[64ch] mt-8">
              Plus a club noticeboard for the stuff that shouldn&apos;t scroll
              away, a shared route library, and a club page that&apos;s
              yours &mdash; kit, roster, and every ride and run you&apos;ve done
              together.
            </p>
          </div>
        </Section>

        {/* ---- See it working — the product, demonstrated ---- */}
        <Section tone="white">
          <Kicker>See it working</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
            This is Sunday, organised.
          </h2>
          <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-12">
            Real screens from a live day out. The route goes out once, everyone
            shows up on one map, and the people at home follow along.
          </p>
          <div className="grid gap-10 md:grid-cols-3 items-start">
            <figure className="m-0">
              <PhoneFrame
                src="/images/app/live-map-phone.webp"
                alt="A club route on the live map, with members moving along it"
                className="max-w-[240px] mx-auto"
                sizes="240px"
                videoSrc="/images/app/replay-phone.mp4"
                poster="/images/app/replay-phone-poster.webp"
              />
              <figcaption className="text-center mt-5">
                <span className="font-condensed uppercase tracking-[0.04em] font-semibold text-dark">
                  Sunday&apos;s route, on everyone&apos;s phone.
                </span>
                <span className="block text-sm text-dark/60 mt-1">
                  Published once, from the club&apos;s route library.
                </span>
              </figcaption>
            </figure>
            <figure className="m-0">
              <PhoneFrame
                src="/images/app/live-riders-phone.webp"
                alt="The live members list — who is out, in what order, and the gaps between them"
                className="max-w-[240px] mx-auto"
                sizes="240px"
              />
              <figcaption className="text-center mt-5">
                <span className="font-condensed uppercase tracking-[0.04em] font-semibold text-dark">
                  Who&apos;s out, and where.
                </span>
                <span className="block text-sm text-dark/60 mt-1">
                  Fast group, social group, the late starter — one list.
                </span>
              </figcaption>
            </figure>
            <figure className="m-0 md:pt-10">
              <BrowserFrame
                src="/images/app/live-map-desktop.webp"
                alt="The same outing followed from home in a desktop browser"
                url="astertrack.app/…"
                videoSrc="/images/app/replay-desktop.mp4"
                poster="/images/app/replay-desktop-poster.webp"
              />
              <figcaption className="text-center mt-5">
                <span className="font-condensed uppercase tracking-[0.04em] font-semibold text-dark">
                  Home follows along.
                </span>
                <span className="block text-sm text-dark/60 mt-1">
                  One shared link. Any browser. No account.
                </span>
              </figcaption>
            </figure>
          </div>
        </Section>

        {/* ---- Community proof ---- */}
        <Section tone="white">
          <Kicker>The point</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
            The club is the point.
          </h2>
          <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-10">
            None of this is about software. It&apos;s about more people making
            it out on a Sunday, new members finding their group on week one
            instead of week six, and nobody going out alone unless they want to.
            The tools just get out of the way.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {belonging.map((b) => (
              <figure
                key={b.src}
                className="m-0 border-2 border-dark rounded-2xl overflow-hidden bg-white shadow-pop-2"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <figcaption className="p-4 text-[15px] leading-normal text-dark/80 border-t-2 border-dark">
                  {b.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        {/* ---- Community wall: the festival collage + phone centrepiece ---- */}
        <CommunityWall />

        {/* ---- Mates tier + plans ---- */}
        <Section tone="stone">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <Kicker>Plans &middot; Sized to the club</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-4 text-dark">
                Mates go free.
              </h2>
              <p className="text-lg leading-normal text-dark/70 max-w-[46ch] mb-4">
                Informal groups of mates &mdash; you, your riding and running
                regulars, the Tuesday-night crew &mdash; use Aster free.
                Routes, the shared live map, the lot. No card, no trial.
              </p>
              <p className="text-lg leading-normal text-dark/70 max-w-[46ch] mb-4">
                Proper clubs get the Group plan, which scales by member size and
                pays for itself as you grow. Athletes never pay &mdash; taking
                part and being watched are free forever; only the club
                subscription is paid.
              </p>
              <p className="text-lg leading-normal text-dark/70 max-w-[46ch] mb-7">
                See the numbers on the pricing page, or tell us how big you are
                and we&apos;ll walk you through it.
              </p>
              <div className="flex gap-3.5 flex-wrap items-center">
                <Button href={appLinks.signup} variant="primary">
                  Get your club on Aster
                </Button>
                <Button href="/pricing" variant="secondary">
                  See pricing
                </Button>
              </div>
            </div>
            <Card tone="dark" className="!shadow-pop-lime">
              <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-xl text-mint mb-2">
                What every plan carries.
              </p>
              <ul className="m-0 p-0 list-none grid gap-2.5 text-[15px] leading-normal text-mint/80">
                <li>One invite link that gets the whole club in.</li>
                <li>The club route library, published once, on every phone.</li>
                <li>Recurring rides and runs with pace groups and reminders.</li>
                <li>One-tap RSVP &mdash; know who&apos;s coming before you set off.</li>
                <li>Members-only live map, with two-way SOS.</li>
                <li>A club noticeboard, roster, and page that&apos;s yours.</li>
                <li>Watching is free and unlimited for everyone, always.</li>
              </ul>
            </Card>
          </div>
        </Section>

        {/* ---- Final CTA ---- */}
        <section className="bg-dark text-mint text-center">
          <div className="container-site py-16 md:py-24 max-w-[900px]">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] text-[clamp(34px,5vw,60px)] mb-3.5 text-mint">
              Bring your club together.
            </h2>
            <p className="text-[19px] text-mint/70 max-w-[44ch] mx-auto mb-8">
              Start free, paste one link, and you&apos;re rolling. One route
              everyone has, one map everyone&apos;s on, and a group chat that
              goes back to being about the riding and running.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <Button href={appLinks.signup} variant="primary">
                Get your club on Aster
              </Button>
              <Button href="/pricing" variant="secondary">
                See pricing
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
