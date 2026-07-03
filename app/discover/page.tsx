import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Kicker from "@/components/Kicker";
import RouteMotif from "@/components/RouteMotif";
import EventsBrowser from "./EventsBrowser";
import { fetchEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Discover live events",
  description:
    "Live and upcoming rides, runs and races. Follow any public event free in your browser — no app, no account, no sign-up. Open the map and watch the race unfold.",
  alternates: { canonical: "/discover" },
};

export default async function DiscoverPage() {
  const events = await fetchEvents();

  return (
    <>
      <SiteNav />
      <main>
        {/* ---- Hero band: dark, route-trace texture ---- */}
        <section className="relative overflow-hidden bg-dark text-mint border-b-2 border-dark">
          <RouteMotif tone="dark" variant={2} flip />
          <div className="relative container-site py-16 md:py-20">
            <Kicker tone="dark">
              Live &amp; upcoming · Rides · Runs · Races
            </Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.92] text-mint text-[clamp(42px,5.5vw,80px)] mb-5 max-w-[18ch] text-balance">
              Somebody&rsquo;s out there{" "}
              <span className="text-lime">right now.</span>
            </h1>
            <p className="text-[clamp(17px,1.5vw,20px)] leading-normal text-mint/85 max-w-[50ch]">
              Follow live events free, in your browser — or find your next
              start line.
            </p>
          </div>
        </section>

        {/* ---- Events index ---- */}
        <section className="bg-stone text-dark border-b-2 border-dark">
          <div className="container-site py-12 md:py-16">
            <EventsBrowser events={events} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
