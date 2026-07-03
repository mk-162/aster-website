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
import { appLinks } from "@/lib/links";

export const metadata: Metadata = {
  title: "For clubs — every ride on one live map",
  description:
    "Your club's routes, rides and people on one map. Publish Sunday's route once, ride together even when apart, and share the day with everyone who couldn't make it.",
  alternates: { canonical: "/clubs" },
};

/* ---- Copy (founder brief 2026-07-02: community-first, explicit
 * problem → solution, tracking + sharing framing — no pricing numbers) ---- */

const problems = [
  {
    title: "The route, forwarded four times.",
    body: "A GPX file emailed to a mailing list, re-shared in WhatsApp, edited by someone on Tuesday. By Sunday there are three versions and nobody is sure which one the ride leader has.",
  },
  {
    title: "“Where are you?” × 40.",
    body: "The group thread on a ride morning: who's coming, who's late, who went to the other café. Half logistics, half apology, all noise.",
  },
  {
    title: "Two groups, one club, zero contact.",
    body: "The fast group and the social group roll out together and lose each other by mile ten. Same club, same morning, riding blind to each other.",
  },
  {
    title: "The one who got dropped.",
    body: "Puncture at the back, nobody noticed for twenty minutes. Every club has this story. It shouldn't take a headcount at the café to find out.",
  },
];

const pillars = [
  {
    title: "Routes, distributed.",
    body: "The club's route library lives on Aster. Publish Sunday's route once and it's on every member's phone in one tap — with the map tiles downloaded for the dead zones. No files, no forwarding, no “which version?”.",
    chip: "The library",
    chipClass: "bg-lime text-dark",
  },
  {
    title: "Everyone on one map.",
    body: "Fast group, social group, the one who started late — all live on a members-only map. You ride together even when you're apart, and the ride leader can see in a glance that everyone's still rolling.",
    chip: "Live",
    chipClass: "bg-gold text-dark",
  },
  {
    title: "Share the day.",
    body: "One-tap RSVP so you know who's coming. Families follow the ride live from a link. And the wrap-up — who rode, how far, who made it up the climb — writes itself to the club feed before the coffee's cold.",
    chip: "The feed",
    chipClass: "bg-coral text-dark",
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
    caption: "Nobody rides alone, even two groups apart.",
  },
  {
    src: "/images/cycling/08-two-finish.webp",
    alt: "Two riders celebrating together at a finish line",
    caption: "The WhatsApp thread becomes cheering.",
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
              The club ride is the best part of the week.
            </h1>
            <p className="text-[clamp(18px,1.6vw,21px)] leading-normal text-mint/85 max-w-[48ch] mb-9">
              Everyone should get to be part of it &mdash; the fast group, the
              social group, the new member who doesn&apos;t know the roads yet,
              and the families following from home. Aster puts your club&apos;s
              routes, rides, and people on one map.
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
            <Kicker>The problem &middot; Be honest</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
              The club run works in spite of the admin.
            </h2>
            <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-10">
              Every club runs on the goodwill of whoever forwards the route,
              chases the RSVPs, and counts heads at the caf&eacute;. The riding
              is brilliant. The plumbing around it is a GPX file and a group
              chat doing jobs neither was built for.
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

        {/* ---- The solution ---- */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={1} />
          <div className="relative z-10">
            <Kicker tone="dark">The solution &middot; One map</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-mint">
              We distribute routes. We let people share.
            </h2>
            <p className="text-lg leading-normal text-mint/70 max-w-[56ch] mb-10">
              Three things a club actually needs, and nothing it doesn&apos;t.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
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
          </div>
        </Section>

        {/* ---- See it working — the product, demonstrated (founder: show
             screen grabs so a visitor understands this ORGANISES the ride) ---- */}
        <Section tone="white">
          <Kicker>See it working</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
            This is Sunday, organised.
          </h2>
          <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-12">
            Real screens from a live ride. The route goes out once, everyone
            shows up on one map, and the people at home follow along.
          </p>
          <div className="grid gap-10 md:grid-cols-3 items-start">
            <figure className="m-0">
              <PhoneFrame
                src="/images/app/live-map-phone.png"
                alt="A club route on the live map, with riders along it"
                className="max-w-[240px] mx-auto"
                sizes="240px"
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
                src="/images/app/live-riders-phone.png"
                alt="The live riders list — who is out, in what order, and the gaps between them"
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
                src="/images/app/live-map-desktop.png"
                alt="The same ride followed from home in a desktop browser"
                url="astertrack.app/…"
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

        {/* ---- Drifting photo band (the strip from the current site) ---- */}
        <PhotoStrip
          images={[
            { src: "/images/cycling/04-two-drafting.webp", alt: "Two club riders drafting close on a fast road" },
            { src: "/images/running-holding/r2-transylvania.jpg", alt: "A dawn trail start, runners setting off together" },
            { src: "/images/cycling/11-road-startline-misty.webp", alt: "A misty start line before the ride rolls out" },
            { src: "/images/cycling/08-two-finish.webp", alt: "Two riders celebrating at the finish together" },
          ]}
        />

        {/* ---- Community proof ---- */}
        <Section tone="white">
          <Kicker>The point</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,52px)] mb-5 text-dark">
            The club is the point.
          </h2>
          <p className="text-lg leading-normal text-dark/70 max-w-[56ch] mb-10">
            None of this is about software. It&apos;s about more people making
            it out on a Sunday, new members finding their group on week one
            instead of week six, and nobody riding alone unless they want to.
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

        {/* ---- Mates tier + plans ---- */}
        <Section tone="stone">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <Kicker>Plans &middot; Sized to the club</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,4.5vw,48px)] mb-4 text-dark">
                Mates ride free.
              </h2>
              <p className="text-lg leading-normal text-dark/70 max-w-[46ch] mb-4">
                Informal groups of up to ten &mdash; you, your riding mates,
                the Tuesday-night regulars &mdash; use Aster free. Routes,
                the shared live map, the lot.
              </p>
              <p className="text-lg leading-normal text-dark/70 max-w-[46ch] mb-7">
                Proper clubs get club plans, banded by size, priced so the
                committee says yes in one meeting. Tell us how big you are and
                we&apos;ll tell you the number.
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
            <Card tone="dark" className="!shadow-pop-lime">
              <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-xl text-mint mb-2">
                What every plan carries.
              </p>
              <ul className="m-0 p-0 list-none grid gap-2.5 text-[15px] leading-normal text-mint/80">
                <li>The club route library, published once, on every phone.</li>
                <li>Members-only live map for every club ride.</li>
                <li>One-tap RSVP &mdash; know who&apos;s coming before you roll.</li>
                <li>Ride wrap-ups posted to the club feed, automatically.</li>
                <li>Families follow any ride live from a shared link.</li>
                <li>Watching is free and unlimited for everyone, always.</li>
              </ul>
            </Card>
          </div>
        </Section>

        {/* ---- Final CTA ---- */}
        <section className="bg-dark text-mint text-center">
          <div className="container-site py-16 md:py-24 max-w-[900px]">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] text-[clamp(34px,5vw,60px)] mb-3.5 text-mint">
              Next Sunday, on one map.
            </h2>
            <p className="text-[19px] text-mint/70 max-w-[44ch] mx-auto mb-8">
              One route everyone has, one map everyone&apos;s on, and a group
              chat that goes back to being about the riding.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <Button href={appLinks.signup} variant="primary">
                Get your club on Aster
              </Button>
              <Button href={appLinks.organiserDemo} variant="secondary">
                Talk to us
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
