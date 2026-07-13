import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import PlanCards from "./PlanCards";

export const metadata: Metadata = {
  title: "Pricing — free to ride and watch",
  description:
    "Riding and watching are free forever. Aster Plus is your £1.99/mo membership to every club; Aster Organiser is a simple per-size subscription for events. Only club riders and organisers ever pay.",
  alternates: { canonical: "/pricing" },
};

/* Pricing (MONETIZATION PIVOT, founder 2026-07-13): the dark hero is gone —
 * the green "Forever" band is the single lead-in above the tables, and the
 * £1.99 message lives in the splash on the Plus card, not a headline. Two
 * products live in the tabs below; numbers live in lib/pricing.ts. */
export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <main>
        {/* FREE FOREVER — the single lead-in and the page's <h1> (founder). */}
        <section className="bg-lime border-y-2 border-dark">
          <div className="container-site py-12 md:py-16 text-center">
            <h1 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(28px,4.5vw,54px)] text-dark m-0">
              Free to take part, or spectate.
              <br />
              Free solo, or with a few friends.
              <br />
              <span className="inline-block mt-2 bg-dark text-lime px-4 py-1 rounded-xl">
                Forever.
              </span>
            </h1>
            <p className="text-[17px] text-dark/70 font-medium max-w-[56ch] mx-auto mt-5 mb-0">
              No trial, no tier, no catch — only club riders and event
              organisers ever pay.
            </p>
          </div>
        </section>

        <Section tone="stone">
          <PlanCards />
        </Section>

        <Section tone="white">
          <div className="max-w-[720px] mx-auto">
            <Kicker>The honest answers</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(28px,4vw,40px)] mb-8 text-dark">
              Pricing questions, answered.
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Do I have to pay to join a club?",
                  a: "Only once a club grows. A club's first three members are always free. From the fourth member on you'll need Aster Plus — £1.99 a month, billed annually. Some clubs choose to cover it for their members, so you may never pay even that.",
                },
                {
                  q: "Can I be in more than one club?",
                  a: "Yes — one Aster Plus covers every club you ride with. It's a membership, not a per-club fee, and it's portable: join, leave, and join again without paying twice.",
                },
                {
                  q: "Do watchers or entrants ever pay Aster?",
                  a: "Never. Following, cheering, and taking part in an event are free forever. Organisers pay to take registrations — entrants and spectators don't pay Aster a penny, and your entry fees are your business.",
                },
                {
                  q: "What's the difference between the organiser tiers?",
                  a: "Only the number of registrations per event. Every tier has the same features — event page, community, live GPS tracking, and full sponsorship control. Start free with up to three registrations by share-link, then pick the size that fits your field.",
                },
                {
                  q: "What happens if I stop paying?",
                  a: "Everything you've built stays yours and stays visible. Nothing is deleted and old rides, results, and posts remain readable — new activity just pauses until the plan is active again.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="border-2 border-dark rounded-2xl bg-white shadow-pop-1 p-5">
                  <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-dark mb-1.5">
                    {q}
                  </p>
                  <p className="text-[15px] leading-normal text-dark/70 m-0">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
