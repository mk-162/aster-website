import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Card from "@/components/Card";
import Button from "@/components/Button";
import RouteMotif from "@/components/RouteMotif";

export const metadata: Metadata = {
  title: "About — live tracking built in the UK",
  description:
    "The company behind the live tracking platform: Manual Focus Ltd, founded by James Vickers (co-founder of RGT Cycling, acquired by Wahoo in 2022). UK-based, pre-launch.",
  alternates: { canonical: "/about" },
};

/* ------------------------------------------------------------------ */
/* Structured data. Richer Organization schema than the site default:  */
/* founder, foundingDate, slogan. @id pattern matches the global org   */
/* entity so search engines merge rather than duplicate. Person schema */
/* shares the founder @id so both merge into one entity.               */
/* ------------------------------------------------------------------ */

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.astertrack.app/#organization",
  name: "Aster",
  legalName: "Manual Focus Ltd",
  url: "https://www.astertrack.app/",
  slogan: "The live experience for endurance sport.",
  description:
    "Phone-first live tracking and sharing platform for endurance sport. UK pre-seed, SEIS + EIS qualified.",
  foundingDate: "2025",
  founder: {
    "@type": "Person",
    "@id": "https://www.astertrack.app/about#james-vickers",
    name: "James Vickers",
    jobTitle: "Founder",
    sameAs: ["https://www.linkedin.com/in/james-vickers-cycling"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.astertrack.app/about#james-vickers",
  name: "James Vickers",
  url: "https://www.astertrack.app/about",
  description:
    "15 years in cycling industry marketing. Co-founder of RGT Cycling (acquired by Wahoo Fitness 2022). Marketing Consultant at Ribble Cycles. MCIM, MCPR. Founder of Aster.",
  knowsAbout: [
    "cycling",
    "endurance sports",
    "live race tracking",
    "sports marketing",
    "consumer brand strategy",
    "AI agent orchestration",
  ],
};

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <main>
        {/* Hero */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={1} />
          <div className="relative z-10 text-center">
            <Kicker tone="dark">About</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(40px,7vw,80px)] text-mint mt-3 mb-4">
              Built by cyclists,
              <br />
              <span className="text-lime">for cyclists.</span>
            </h1>
            <p className="text-lg leading-normal text-mint/70 max-w-[56ch] mx-auto">
              Aster is a phone-first live tracking and sharing platform for
              endurance cycling. Built solo with AI agent orchestration,
              launching properly in spring 2027.
            </p>
          </div>
        </Section>

        {/* Why Aster exists */}
        <Section tone="white">
          <div className="max-w-[720px] mx-auto">
            <Kicker>Why Aster exists</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(28px,4vw,40px)] text-dark mb-8">
              Live tracking has looked the same for 17 years.
            </h2>
            <div className="space-y-5 text-[16px] leading-relaxed text-dark/85">
              <p>
                5% of bike races get live tracking — the marquee ultras (Tour
                Divide, Trans Am, Atlas Mountain). The other 95% — the regional
                gravel race, the club championship, the Tuesday-night chaingang
                — get nothing live. The audience is the same audience either
                way: people who want to watch a bike race unfold in real time.
              </p>
              <p>
                The reason for the gap isn&rsquo;t audience. It&rsquo;s
                economics. Hardware satellite trackers cost £20–50k per event
                to ship, recover, and replace. That maths works for the marquee
                5% and breaks for everyone else.
              </p>
              <p className="font-medium text-dark">
                Aster is the modern layer underneath. Phone-first tracking, no
                hardware to ship, a sharing experience built for the audience
                already on their phone. Built for the 95% of races that have
                never had tracking — and the 5% who want a better one.
              </p>
            </div>
          </div>
        </Section>

        {/* Founder */}
        <Section tone="stone">
          <div className="max-w-[760px] mx-auto">
            <Kicker>The founder</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(28px,4vw,40px)] text-dark mb-8">
              James Vickers — 15 years in cycling.
            </h2>

            <Card className="mb-5">
              <div className="space-y-4 text-[15px] leading-relaxed text-dark/85">
                <p className="m-0">
                  Aster is built solo by James Vickers, with AI agent
                  orchestration handling engineering, content, and operations.
                  James previously co-founded <strong>RGT Cycling</strong>{" "}
                  (acquired by Wahoo Fitness in 2022), where he led the brand
                  from 100 users to 450,000, lifted prompted brand recall from
                  2 to 95, and played a critical role in the corporate strategy
                  and diligence of the Wahoo acquisition.
                </p>
                <p className="m-0">
                  Since RGT he&rsquo;s held senior marketing roles at{" "}
                  <strong>Wahoo Fitness</strong> (Head of Marketing,
                  Subscription Services), <strong>Classified Cycling</strong>{" "}
                  (Head of Marketing and Communications), and currently
                  consults as Marketing Director at <strong>Ribble Cycles</strong>{" "}
                  (£1.2M budget; secured BBC + ITV TV coverage in 2025;
                  Presenting Partner of the British Gravel Championships).
                </p>
                <p className="m-0">
                  He&rsquo;s a member of CIM and the Chartered Institute of PR,
                  raced in the 2025 UK National Championships (15th), and lives
                  between Sheffield and Lincoln. Aster is the working answer to
                  &ldquo;how much business can one operator run when AI handles
                  the stack?&rdquo;
                </p>
              </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { stat: "15 yrs", label: "in cycling industry" },
                { stat: "450k", label: "RGT users grown to" },
                { stat: "£1.2M", label: "Ribble budget managed" },
                { stat: "15th", label: "UK National Champs 2025" },
              ].map((s) => (
                <Card key={s.label} className="text-center !p-4">
                  <p className="font-condensed text-3xl font-bold text-lime-deep mb-1">
                    {s.stat}
                  </p>
                  <p className="text-sm text-dark/70 m-0">{s.label}</p>
                </Card>
              ))}
            </div>

            <p className="text-sm text-dark/60 m-0">
              More on the story:{" "}
              <a href="/founder" className="text-lime-deep font-semibold underline">
                about the founder
              </a>{" "}
              <span aria-hidden>·</span>{" "}
              <a href="/press" className="text-lime-deep font-semibold underline">
                press &amp; media kit
              </a>
            </p>
          </div>
        </Section>

        {/* How it's built */}
        <Section tone="white">
          <div className="max-w-[720px] mx-auto">
            <Kicker>How Aster is built</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(28px,4vw,40px)] text-dark mb-8">
              One operator. AI handling the stack.
            </h2>
            <div className="space-y-5 text-[16px] leading-relaxed text-dark/85">
              <p>
                Aster is a working proof of the brand-to-platform thesis: a
                cycling brand operating as a software platform, run by a single
                operator with AI handling the rest. Orchestrated AI agents run
                business analysis, product, engineering requirements, market
                research, development, testing, marketing and content. The
                human is in the loop for an otherwise self-running operation.
              </p>
              <p>
                Tech stack: native iOS and Android apps via Capacitor, React
                PWA, Node/Fastify API, Postgres with PostGIS for geographic
                queries, Mapbox for live maps, Redis for real-time leaderboard
                state, Socket.IO for the watcher experience. Four
                non-negotiable rider-safety rules drive product design: offline
                start/finish, never auto-logout, tracking persists, never lose
                a ping.
              </p>
            </div>
          </div>
        </Section>

        {/* Fundraising */}
        <Section tone="stone">
          <div className="max-w-[720px] mx-auto">
            <Kicker>Fundraising</Kicker>
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(28px,4vw,40px)] text-dark mb-8">
              Pre-seed. UK. SEIS + EIS qualified.
            </h2>
            <div className="space-y-5 text-[16px] leading-relaxed text-dark/85">
              <p>
                Aster is raising a £400–600k pre-seed, designed to clear via
                SEIS for the first £250k and EIS for the balance. UK investors
                get up to 50% income tax relief on day one, with loss relief
                capping the downside even in a full write-off.
              </p>
              <p>
                For investor enquiries, email{" "}
                <a
                  href="mailto:james@astertrack.app"
                  className="text-lime-deep font-semibold underline"
                >
                  james@astertrack.app
                </a>
                .
              </p>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={2} flip />
          <div className="relative z-10 text-center">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(30px,5vw,48px)] text-mint mb-4">
              Want to put your race on Aster?
            </h2>
            <p className="text-lg leading-normal text-mint/70 max-w-[48ch] mx-auto mb-8">
              We&rsquo;ll walk through your race, the dashboard, and what a
              launch on Aster would look like.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="/for-organisers">For race organisers</Button>
              <Button href="/pricing" variant="secondary">
                See pricing
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
