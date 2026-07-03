import Link from "next/link";
import {
  Section, Grid, HeroActions, CtaPrimary, CtaSecondary, PhotoStrip,
  SiteHeader, SiteFooter, APP_URL,
} from "@/components/marketing";

// /for-clubs is native to this site; the others link to the app's existing
// marketing pages until they're ported here.
const AUDIENCES = [
  { kicker: "For clubs", title: "Your club, sorted.", body: "One link gets everyone in. Every ride, RSVP and live map in the one place your club already looks. Free for small clubs.", href: "/for-clubs", cta: "Clubs →" },
  { kicker: "For teams", title: "Your team. Live, all day.", body: "Every rider on one map. Live gaps, ETAs, one sponsor URL that stays alive all season.", href: `${APP_URL}/for-teams`, cta: "Teams →" },
  { kicker: "For athletes", title: "Be watched, anywhere.", body: "Free ride or race — friends and family follow your dot live, and your finish is a story worth sharing.", href: `${APP_URL}/for-athletes`, cta: "Athletes →" },
  { kicker: "For organisers", title: "Put your event on the map.", body: "Live leaderboards, spectator tracking, and a sponsor report that proves the eyeballs. Free to start.", href: `${APP_URL}/for-organisers`, cta: "Organisers →" },
];

const PHOTOS = [
  { src: "/photography/10-gravel-rollout-rider.jpg", alt: "Cyclists rolling out under a start arch in dramatic light" },
  { src: "/photography/04-two-drafting.jpg", alt: "Two gravel cyclists drafting on a forest road" },
  { src: "/photography/14-peloton-twilight-climb.jpg", alt: "A group stretched up a hillside at twilight" },
  { src: "/photography/11-road-startline-misty.jpg", alt: "A group at the start line on a cold misty morning" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <Section bg="dark" className="text-center">
        <p className="font-condensed uppercase tracking-wide text-tiny text-lime mb-3">The live experience for cycling</p>
        <h1 className="font-condensed font-bold uppercase tracking-tight text-[40px] sm:text-[56px] lg:text-[80px] leading-[0.95] text-mint mb-4 lg:mb-6">
          Watch the whole<br />ride, live.
        </h1>
        <p className="text-large lg:text-xl text-mint/85 mb-7 max-w-[34ch] lg:max-w-[46ch] mx-auto">
          Every rider on one map — races, club runs, and grand departs. Free to ride, free to watch.
        </p>
        <HeroActions>
          <CtaPrimary href={`${APP_URL}`}>Open the app</CtaPrimary>
          <CtaSecondary href="/for-clubs">Bring your club</CtaSecondary>
        </HeroActions>
      </Section>

      <PhotoStrip images={PHOTOS} />

      <Section bg="white">
        <p className="font-condensed uppercase tracking-wide text-tiny text-lime-deep mb-2">One platform</p>
        <h2 className="text-display lg:text-[44px] text-dark mb-8 lg:mb-12">Whoever you are on ride day.</h2>
        <Grid cols={2}>
          {AUDIENCES.map((a) => {
            const cls = "block bg-white border-2 border-dark rounded-2xl shadow-pop-2 p-6 transition-all hover:-translate-x-px hover:-translate-y-px hover:shadow-pop-3";
            const inner = (
              <>
                <p className="font-condensed uppercase tracking-wide text-tiny text-lime-deep mb-1">{a.kicker}</p>
                <h3 className="text-title text-dark mb-2">{a.title}</h3>
                <p className="text-body text-dark/75 mb-3">{a.body}</p>
                <span className="text-small font-semibold text-lime-deep">{a.cta}</span>
              </>
            );
            return a.href.startsWith("http")
              ? <a key={a.href} href={a.href} className={cls}>{inner}</a>
              : <Link key={a.href} href={a.href} className={cls}>{inner}</Link>;
          })}
        </Grid>
      </Section>

      <Section bg="dark-cta">
        <h2 className="font-condensed uppercase tracking-tight text-title lg:text-display text-mint mb-2">
          See the dot move.
        </h2>
        <p className="text-body lg:text-large text-mint/70 mb-6 lg:mb-8 max-w-[34ch] mx-auto">
          Free for riders. Free for watchers. Free for small clubs.
        </p>
        <HeroActions>
          <CtaPrimary href={`${APP_URL}`}>Open the app</CtaPrimary>
          <CtaSecondary href={`${APP_URL}/pricing`}>See pricing</CtaSecondary>
        </HeroActions>
      </Section>

      <SiteFooter />
    </>
  );
}
