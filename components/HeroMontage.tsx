/* HeroMontage — the hero's right-side product layer. The full-bleed HeroMap
 * behind the section carries the map + route + rider arrows; this adds the
 * human layer on top: the live leaderboard phone and two floating story chips
 * (the leader, the chase). Chips are crisp JSX in the app's own UI style.
 * Screenshot swaps via props when the app UI changes. */
import Image from "next/image";

export default function HeroMontage({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative ${className}`}
      aria-label="The Aster app: a live leaderboard during a race"
    >
      {/* Phone — the live leaderboard */}
      <div className="relative mx-auto w-[74%] max-w-[280px] rotate-[2.5deg]">
        <div className="rounded-[30px] border-2 border-dark bg-dark p-2 shadow-pop-lime">
          <div className="relative overflow-hidden rounded-[22px] aspect-[390/620]">
            <Image
              src="/images/app/live-riders-phone.webp"
              alt="The live leaderboard: ranks, distance to go, and time gaps"
              fill
              priority
              sizes="280px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Floating chip — the leader's row */}
      <div className="absolute top-[6%] left-[-4%] rotate-[-3deg] bg-white border-2 border-dark rounded-xl shadow-pop-2 px-3.5 py-2.5 flex items-center gap-3">
        <span className="font-condensed font-bold text-lg text-dark">#1</span>
        <span className="w-8 h-8 rounded-full bg-mint border-2 border-dark flex items-center justify-center font-condensed font-bold text-[11px] text-dark">
          SR
        </span>
        <span className="leading-tight">
          <span className="block text-[13px] font-semibold text-dark">Sim Rider 05</span>
          <span className="block font-condensed uppercase tracking-[0.05em] text-[10px] font-bold text-lime-deep">
            Leader · 1.3 km to go
          </span>
        </span>
      </div>

      {/* Floating chip — the chase */}
      <div className="absolute bottom-[10%] right-[-2%] rotate-[3deg] bg-dark border-2 border-mint/40 rounded-xl shadow-pop-2 px-3.5 py-2 leading-tight">
        <span className="block font-condensed uppercase tracking-[0.06em] text-[10px] font-bold text-lime">
          The chase
        </span>
        <span className="block font-mono text-[15px] font-semibold text-mint">+22s</span>
      </div>

      {/* Floating chip — live watchers (the sharing story) */}
      <div className="absolute bottom-[28%] left-[-8%] rotate-[-2deg] bg-lime border-2 border-dark rounded-xl shadow-pop-1 px-3.5 py-2 leading-tight">
        <span className="block font-condensed uppercase tracking-[0.06em] text-[10px] font-bold text-dark/70">
          Watching live
        </span>
        <span className="block font-condensed font-bold text-[17px] text-dark">
          Mum · the club · 41 more
        </span>
      </div>
    </div>
  );
}
