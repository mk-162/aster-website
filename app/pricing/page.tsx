import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import RouteMotif from "@/components/RouteMotif";
import PlanCards from "./PlanCards";

export const metadata: Metadata = {
  title: "Pricing — free for athletes and watchers",
  description:
    "Athletes and watchers ride and watch free, forever. Simple group plans for clubs, a per-event organiser subscription, and enterprise white-glove service.",
  alternates: { canonical: "/pricing" },
};

/* Pricing (EXPERIMENTAL model, founder 2026-07-02 v3): Group / Event
 * Organiser / Enterprise. All numbers are dummy placeholders under review —
 * they live in lib/pricing.ts and are not wired to checkout. */
export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <main>
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={2} />
          <div className="relative z-10 text-center">
            <Kicker tone="dark">Pricing · Simple on purpose</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(40px,7vw,72px)] text-mint mt-3 mb-4">
              The people pay nothing.
              <br />
              <span className="text-lime">The organisers pay one bill.</span>
            </h1>
            <p className="text-lg leading-normal text-mint/70 max-w-[52ch] mx-auto">
              Tracking, sharing, and watching are free for every athlete and
              every follower, forever. Clubs and organisers pick a plan sized
              to them.
            </p>
          </div>
        </Section>

        {/* FREE FOREVER — the most important line on the page (founder). */}
        <section className="bg-lime border-y-2 border-dark">
          <div className="container-site py-10 md:py-12 text-center">
            <p className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(28px,4.5vw,54px)] text-dark m-0">
              Taking part is free. Watching is free.
              <br />
              <span className="inline-block mt-1 bg-dark text-lime px-4 py-1 rounded-xl">
                Forever.
              </span>
            </p>
            <p className="text-[17px] text-dark/70 font-medium max-w-[54ch] mx-auto mt-4 mb-0">
              Anyone taking part in an event, and anyone spectating one, never
              pays Aster a penny. No trial, no tier, no catch — only clubs and
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
                  q: "Can I try it before paying?",
                  a: "Yes. Create your event free and see the whole thing — the map, the branding, the sponsor slots. It stays private until your plan is active; then you go live.",
                },
                {
                  q: "What happens if I stop paying?",
                  a: "Everything you've built stays yours and stays visible. Nothing is deleted and old rides, results, and posts remain readable — new activity just pauses until the plan is active again.",
                },
                {
                  q: "Do my members or entrants ever pay Aster?",
                  a: "No. Athletes and watchers never pay. Your entry fees are your business — we don't take a cut.",
                },
                {
                  q: "What does a sponsor slot have to do with the price?",
                  a: "Your live map is watched all day by exactly the audience local sponsors want. One digital sponsor slot, sold once, typically covers your Aster subscription.",
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
