import Image from "next/image";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Button from "@/components/Button";
import PhoneFrame from "@/components/PhoneFrame";
import { appLinks } from "@/lib/links";

/* CommunityWall — the festival-wall collage: PhotoStrip's bigger, louder
 * sibling. A dark full-bleed section, a rotated snapshot grid of riders and
 * runners, and the app itself — a PhoneFrame — planted in the middle of the
 * wall so it reads social-first, not tracker-first. CSS-only motion (hover
 * scale + the DS press language); server component, no client JS. */

interface WallPhoto {
  src: string;
  alt: string;
  /** Tailwind classes for span/rotation variety. */
  className?: string;
  /** Overlaid social chip: initials for the avatar circles + watcher count.
   * Makes the collage read as a live wall of shared races, not a gallery. */
  watchers?: { initials: string[]; count: number };
}

const photos: WallPhoto[] = [
  {
    src: "/images/cycling/08-two-finish.webp",
    alt: "Two riders celebrating side by side as they cross a finish line",
    className: "row-span-2 rotate-[-1.5deg]",
    watchers: { initials: ["KH", "SM", "JP"], count: 43 },
  },
  {
    src: "/images/cycling/16-portrait-female-clean.webp",
    alt: "A cyclist grinning at the camera after a race",
    className: "rotate-[1deg]",
    watchers: { initials: ["AL", "RB"], count: 12 },
  },
  {
    src: "/images/running-holding/r1-badger.webp",
    alt: "Trail runners and a dog sharing a hillside path",
    className: "rotate-[-1deg]",
    watchers: { initials: ["TW", "EM", "GD"], count: 18 },
  },
  {
    src: "/images/cycling/04-two-drafting.webp",
    alt: "Two riders drafting close, deep in conversation with the road",
    className: "rotate-[1.5deg]",
    watchers: { initials: ["MB", "CV"], count: 9 },
  },
  {
    src: "/images/cycling/18-gravel-rollout-dust.webp",
    alt: "A gravel field rolling out through golden dust",
    className: "row-span-2 rotate-[1deg]",
    watchers: { initials: ["FO", "LN", "PK"], count: 87 },
  },
  {
    src: "/images/running-holding/r2-transylvania.webp",
    alt: "Runners strung along a mountain trail mid-race",
    className: "rotate-[-1.5deg]",
    watchers: { initials: ["IS", "DH"], count: 31 },
  },
  {
    src: "/images/cycling/02-female-three-quarter.webp",
    alt: "A rider mid-effort, eyes up the road",
    className: "rotate-[1deg]",
    watchers: { initials: ["JR", "AB"], count: 15 },
  },
  {
    src: "/images/cycling/11-road-startline-misty.webp",
    alt: "A misty start line, riders packed and waiting for the off",
    className: "rotate-[-1deg]",
    watchers: { initials: ["WT", "NC", "OD"], count: 126 },
  },
  {
    src: "/images/cycling/13-road-female-wet.webp",
    alt: "A road cyclist pushing on through rain and spray",
    className: "rotate-[1.5deg]",
    watchers: { initials: ["HP", "KS"], count: 22 },
  },
  {
    src: "/images/cycling/14-peloton-twilight-climb.webp",
    alt: "A group stretched up a twilight climb together",
    className: "rotate-[-1deg]",
    watchers: { initials: ["EV", "MG", "TF"], count: 58 },
  },
];

/* Brand-token backgrounds cycled across the avatar circles. */
const AVATAR_TONES = ["bg-lime", "bg-mint", "bg-gold"] as const;

function WatcherChip({ initials, count }: NonNullable<WallPhoto["watchers"]>) {
  return (
    <div className="absolute bottom-2 left-2 z-[1] flex items-center gap-1.5 rounded-full border border-mint/25 bg-dark/80 py-1 pl-1 pr-2.5 backdrop-blur-sm">
      <div className="flex -space-x-1.5">
        {initials.map((ini, i) => (
          <span
            key={ini}
            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 border-dark text-[9px] font-bold text-dark ${AVATAR_TONES[i % AVATAR_TONES.length]}`}
          >
            {ini}
          </span>
        ))}
      </div>
      <span className="text-[11px] font-semibold leading-none text-mint">
        {count} watching
      </span>
    </div>
  );
}

function WallTile({ src, alt, className = "", watchers }: WallPhoto) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 border-dark bg-stone shadow-pop-2 transition-transform duration-200 hover:scale-[1.03] hover:z-10 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover"
      />
      {watchers && <WatcherChip {...watchers} />}
    </div>
  );
}

export default function CommunityWall() {
  return (
    <Section tone="dark">
      <div className="text-center max-w-[820px] mx-auto mb-12">
        <Kicker tone="dark">The Aster community</Kicker>
        <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,56px)] text-mint text-balance">
          Every dot on the map is{" "}
          <span className="text-lime">somebody&apos;s whole race.</span>
        </h2>
        <p className="text-lg leading-normal text-mint/70 max-w-[52ch] mx-auto mt-4">
          Finish lines, club runs, first ultras, last-minute sprints for the
          village sign &mdash; all of it live, all of it shared, all of it
          watched by the people who care.
        </p>
      </div>

      {/* The wall. The phone sits in the middle of the grid, above the
          photos, breaking their edges — the app is part of the crowd. */}
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[160px] sm:auto-rows-[200px] lg:auto-rows-[220px]">
          {photos.slice(0, 5).map((p) => (
            <WallTile key={p.src} {...p} />
          ))}
          {/* Reserved hole for the phone on md:+ — keeps the collage airy
              around the centrepiece instead of hiding photos under it. */}
          <div aria-hidden className="hidden md:block md:col-span-2" />
          {photos.slice(5).map((p) => (
            <WallTile key={p.src} {...p} />
          ))}
        </div>
        <PhoneFrame
          src="/images/app/live-riders-phone.png"
          alt="The Aster app mid-race: the live riders list and map, the social heart of the wall"
          className="mx-auto mt-6 max-w-[240px] rotate-[1.5deg] md:mt-0 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:z-20 md:max-w-[250px] lg:max-w-[280px] md:w-full"
          sizes="(min-width: 1024px) 280px, 240px"
        />
      </div>

      <div className="text-center mt-12">
        <Button href={appLinks.signup} variant="primary">
          Start tracking — free
        </Button>
      </div>
    </Section>
  );
}
