import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Card from "@/components/Card";
import RouteMotif from "@/components/RouteMotif";
import { ARTICLES, formatArticleDate } from "@/lib/resources";

/* /resources hub for evergreen long-form guides, ported from the
 * Aster PWA marketing site at the identical URL. Distinct from
 * /blog (journal) and /changelog (dated product changes): /resources
 * hosts the multi-thousand-word pieces that rank for evergreen
 * "how does X work / why does Y matter" queries, and gives cold
 * evaluators the "how does this actually work" answer without a call. */

export const metadata: Metadata = {
  title: "Resources — live race tracking guides",
  description:
    "Long-form guides on live race tracking: phone-first GPS versus hardware trackers, and how to set up live tracking for a race — evergreen reference for organisers.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Aster resources",
    numberOfItems: ARTICLES.length,
    itemListElement: ARTICLES.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Article",
        headline: a.title,
        description: a.summary,
        datePublished: a.datePublished,
        ...(a.dateModified && { dateModified: a.dateModified }),
        author: { "@type": "Person", name: a.author },
        publisher: { "@type": "Organization", name: "Aster" },
      },
    })),
  };

  return (
    <>
      <SiteNav />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />

        {/* ---- Hero ---- */}
        <Section tone="dark" innerClassName="text-center">
          <RouteMotif tone="dark" variant={1} />
          <div className="relative z-10">
            <Kicker tone="dark">Resources</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.95] text-[clamp(44px,7vw,88px)] text-mint mb-6 text-balance">
              How this all
              <br /> actually works.
            </h1>
            <p className="text-lg md:text-xl text-mint/85 max-w-[60ch] mx-auto">
              Plain-language guides for organisers, athletes, and anyone
              evaluating live race tracking for the first time. Read these
              instead of booking a call.
            </p>
          </div>
        </Section>

        {/* ---- Article cards ---- */}
        <Section tone="white">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a) => (
              <Card key={a.slug} href={`/resources/${a.slug}`} className="group">
                <Kicker>{a.category}</Kicker>
                <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.05] text-[22px] mb-3 group-hover:text-lime-deep transition-colors">
                  {a.title}
                </h2>
                <p className="text-[16px] leading-[1.65] text-dark/80 mb-4">
                  {a.summary}
                </p>
                <p className="text-[15px] font-semibold text-lime-deep inline-flex items-center gap-1.5">
                  Read the guide
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </p>
                <p className="text-[13px] text-dark/50 mt-3">
                  {a.readingTimeMinutes}-min read ·{" "}
                  {a.dateModified ? "Updated" : "Published"}{" "}
                  {formatArticleDate(a.dateModified ?? a.datePublished, {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        {/* ---- Cross-links ---- */}
        <Section tone="stone" innerClassName="text-center">
          <Kicker className="justify-center">Quick answers</Kicker>
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.02] text-[clamp(28px,3.5vw,36px)] mb-4">
            Shorter formats, same content.
          </h2>
          <p className="text-[17px] md:text-lg leading-[1.7] text-dark/85 mb-6 max-w-[60ch] mx-auto">
            If you came in with a specific question, these will probably get
            you there faster than a long-form guide.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/pricing"
              className="text-lime-deep font-semibold underline underline-offset-2 decoration-2 hover:decoration-4"
            >
              Pricing →
            </Link>
            <span className="text-dark/30">·</span>
            <Link
              href="/vs/trackleaders"
              className="text-lime-deep font-semibold underline underline-offset-2 decoration-2 hover:decoration-4"
            >
              Aster vs Trackleaders →
            </Link>
            <span className="text-dark/30">·</span>
            <Link
              href="/changelog"
              className="text-lime-deep font-semibold underline underline-offset-2 decoration-2 hover:decoration-4"
            >
              Changelog →
            </Link>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
