/* BlogSidebar — the conversion rail on blog surfaces. Three widgets, one per
 * audience, each driving a registration-shaped action. Server component: the
 * live-events widget reads the same anon events API as /discover (ISR via
 * fetchEvents' revalidate), so "live right now" is real, not decorative. */

import Button from "./Button";
import { fetchEvents } from "@/lib/events";
import { appLinks } from "@/lib/links";

export default async function BlogSidebar() {
  const events = await fetchEvents().catch(() => []);
  const live = events.filter((e) => e.status === "live");

  return (
    <aside className="space-y-5 lg:sticky lg:top-24" aria-label="Get started with Aster">
      {/* 1 — Athletes: the primary registration driver */}
      <div className="bg-dark border-2 border-dark rounded-2xl shadow-pop-2 p-5">
        <p className="font-condensed uppercase tracking-[0.05em] text-[12px] font-bold text-lime mb-1.5">
          Free for athletes · forever
        </p>
        <p className="font-condensed uppercase font-bold text-[22px] leading-[1.02] text-mint mb-2">
          Your next ride or run, watched over.
        </p>
        <p className="text-[13px] leading-normal text-mint/70 mb-4">
          One tap to track, one link to share. Set up before your next outing —
          it takes about a minute.
        </p>
        <Button href={appLinks.signup} variant="primary" size="sm" className="w-full justify-center">
          Start tracking — free
        </Button>
      </div>

      {/* 2 — Watchers: zero-friction taste of the product */}
      <div className="bg-white border-2 border-dark rounded-2xl shadow-pop-1 p-5">
        <p className="font-condensed uppercase tracking-[0.05em] text-[12px] font-bold text-lime-deep mb-1.5">
          {live.length > 0 ? (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-lime border border-dark mr-1.5 align-middle animate-pulse" />
              {live.length} event{live.length === 1 ? "" : "s"} live right now
            </>
          ) : (
            "See it working"
          )}
        </p>
        <p className="text-[13px] leading-normal text-dark/70 mb-4">
          {live.length > 0
            ? "Somebody's out there as you read this. Open a live map — no app, no account."
            : "Open a live event map in your browser — no app, no account."}
        </p>
        <Button href="/discover" variant="secondary" size="sm" className="w-full justify-center">
          Watch live — no signup
        </Button>
      </div>

      {/* 3 — Clubs & organisers: the paying audiences */}
      <div className="bg-lime-bg border-2 border-dark rounded-2xl shadow-pop-1 p-5">
        <p className="font-condensed uppercase tracking-[0.05em] text-[12px] font-bold text-lime-deep mb-1.5">
          Clubs & organisers
        </p>
        <p className="text-[13px] leading-normal text-dark/80 mb-4">
          Routes distributed, every outing on one map, live tracking on every
          event. Build it free — pay only when you go live.
        </p>
        <Button href="/pricing" variant="secondary" size="sm" className="w-full justify-center">
          See plans
        </Button>
      </div>
    </aside>
  );
}
