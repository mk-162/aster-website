import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Button from "@/components/Button";
import RouteMotif from "@/components/RouteMotif";

export const metadata: Metadata = {
  title: "About the founder",
  description:
    "James Vickers, founder — co-founder of RGT Cycling (acquired by Wahoo in 2022), now building live tracking for the endurance races that never had it, from the UK.",
  alternates: { canonical: "/founder" },
};

export default function FounderPage() {
  return (
    <>
      <SiteNav />
      <main>
        {/* Typographic hero — no founder portrait exists yet. */}
        {/* TODO: founder portrait */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={1} />
          <div className="relative z-10">
            <Kicker tone="dark">About the founder</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.92] text-[clamp(56px,11vw,128px)] text-mint mt-3 mb-5">
              James
              <br />
              <span className="text-lime">Vickers.</span>
            </h1>
            <p className="text-lg leading-normal text-mint/70 max-w-[52ch]">
              Co-founder of RGT Cycling. Now building Aster — live tracking
              for the races that never had it.
            </p>
          </div>
        </Section>

        {/* Story */}
        <Section tone="white">
          <div className="max-w-[720px] mx-auto">
            <Kicker>The story so far</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(28px,4vw,40px)] text-dark mb-8">
              From virtual roads to real ones.
            </h2>
            <div className="space-y-5 text-[16px] leading-relaxed text-dark/85">
              <p>
                James co-founded RGT Cycling, the virtual cycling platform,
                and built it into a product riders around the world trained
                and raced on. In 2022 RGT was acquired by Wahoo.
              </p>
              <p>
                Now he&rsquo;s building Aster at Manual Focus Ltd in the UK —
                a live tracking and sharing platform for endurance sport,
                with its first marquee events planned for spring 2027.
              </p>
            </div>
          </div>
        </Section>

        {/* Why — with pull-quote */}
        <Section tone="stone">
          <div className="max-w-[720px] mx-auto">
            <Kicker>Why Aster</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(28px,4vw,40px)] text-dark mb-8">
              Tracking shouldn&rsquo;t be a luxury.
            </h2>
            <div className="space-y-5 text-[16px] leading-relaxed text-dark/85">
              <p>
                Live tracking today belongs to the roughly 5% of endurance
                events that can afford £20–50k of hardware satellite trackers
                — shipped out, strapped on, recovered, replaced. The other
                95% of races, and every club run and long training day in
                between, have never had it.
              </p>
              <blockquote className="border-2 border-dark rounded-2xl bg-dark shadow-pop-2 p-7 sm:p-9 my-2">
                <p className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.05] text-[clamp(24px,3.4vw,34px)] text-lime m-0">
                  &ldquo;The phone in every jersey pocket and running vest is
                  already the tracker.&rdquo;
                </p>
              </blockquote>
              <p>
                That conviction is the whole company. Aster switches on the
                device athletes already carry, gives the people watching one
                shared link that works in any browser, and gives clubs and
                organisers the tools the biggest races have always had —
                without the hardware bill.
              </p>
            </div>
          </div>
        </Section>

        {/* CTA band */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={2} flip />
          <div className="relative z-10 text-center">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,5vw,48px)] text-mint mb-4">
              Writing about Aster?
            </h2>
            <p className="text-lg leading-normal text-mint/70 max-w-[48ch] mx-auto mb-8">
              The press release, fast facts, and the brand kit are all on the
              press page — or email the founder&rsquo;s press line directly.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="/press">Press &amp; media kit</Button>
              <Button
                href="mailto:press@astertrack.app?subject=Press%20enquiry"
                variant="secondary"
              >
                press@astertrack.app
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
