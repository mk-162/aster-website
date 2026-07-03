import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import Card from "@/components/Card";
import Button from "@/components/Button";
import RouteMotif from "@/components/RouteMotif";
import {
  ARTICLES,
  formatArticleDate,
  getArticle,
  type ArticleBlock,
} from "@/lib/resources";

/* Single long-form resource article, keyed by :slug — ported from the
 * Aster PWA marketing site at the identical /resources/<slug> URLs.
 * One template, all articles; content lives in lib/resources.ts.
 * Prose styling mirrors the blog article template (hand-styled DS
 * longform — no typography plugin). */

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.datePublished,
    },
  };
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p className="text-[17px] leading-[1.7] text-dark/85 mb-5">{block.text}</p>
      );
    case "h3":
      return (
        <h3 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.05] text-[22px] mt-9 mb-3">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="list-disc pl-6 mb-5 space-y-2 text-[17px] leading-[1.7] text-dark/85">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal pl-6 mb-5 space-y-2 text-[17px] leading-[1.7] text-dark/85">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <blockquote className="border-l-2 border-dark bg-lime-bg rounded-r-2xl pl-5 pr-5 py-4 my-6 text-[18px] leading-[1.6] text-dark/80 italic">
          {block.text}
        </blockquote>
      );
  }
}

export default async function ResourceArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const others = ARTICLES.filter((a) => a.slug !== article.slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.datePublished,
    ...(article.dateModified && { dateModified: article.dateModified }),
    mainEntityOfPage: `https://astertrack.app/resources/${article.slug}`,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", "@id": "https://astertrack.app/#organization", name: "Aster" },
    articleSection: article.category,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Aster",
        item: "https://astertrack.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: "https://astertrack.app/resources",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://astertrack.app/resources/${article.slug}`,
      },
    ],
  };

  return (
    <>
      <SiteNav />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* ---- Article header ---- */}
        <section className="bg-stone text-dark border-b-2 border-dark">
          <div className="container-site py-14 md:py-20">
            <div className="max-w-[820px]">
              <span className="inline-block border-2 border-dark rounded-xl bg-lime px-3 py-1 font-condensed uppercase tracking-[0.06em] font-bold text-[13px] mb-5">
                {article.heroKicker}
              </span>
              <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.95] text-[clamp(38px,5vw,64px)] mb-5 text-balance">
                {article.title}
              </h1>
              <p className="text-[17px] md:text-lg leading-[1.7] text-dark/85 mb-5 max-w-[64ch]">
                {article.heroSubhead}
              </p>
              <p className="font-condensed uppercase tracking-[0.08em] font-semibold text-[13px] text-lime-deep">
                {article.author} · {article.readingTimeMinutes} min read ·{" "}
                {article.dateModified ? "Updated" : "Published"}{" "}
                {formatArticleDate(article.dateModified ?? article.datePublished)}
              </p>
            </div>
          </div>
        </section>

        {/* ---- Body ---- */}
        <section className="bg-white text-dark border-b-2 border-dark">
          <div className="container-site py-14 md:py-20">
            <article className="max-w-[68ch]">
              {article.sections.map((section) => (
                <div key={section.h2} className="mb-12 last:mb-0">
                  <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.02] text-[30px] mb-4">
                    {section.h2}
                  </h2>
                  {section.blocks.map((block, bi) => (
                    <Block key={bi} block={block} />
                  ))}
                </div>
              ))}
            </article>
          </div>
        </section>

        {/* ---- CTA band ---- */}
        <section className="relative overflow-hidden bg-dark text-mint border-b-2 border-dark">
          <RouteMotif tone="dark" variant={2} flip />
          <div className="relative z-10 container-site py-16 md:py-24 text-center">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.95] text-mint text-[clamp(36px,4.5vw,60px)] mb-4">
              {article.ctaHeading}
            </h2>
            <p className="text-lg text-mint/85 max-w-[52ch] mx-auto mb-9">
              {article.ctaBody}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href={article.ctaPrimaryHref}>
                {article.ctaPrimaryLabel}
              </Button>
              <Button href={article.ctaSecondaryHref} variant="secondary">
                {article.ctaSecondaryLabel}
              </Button>
            </div>
          </div>
        </section>

        {/* ---- Related resources ---- */}
        {others.length > 0 && (
          <Section tone="stone">
            <div className="max-w-[880px] mx-auto">
              <div className="text-center">
                <Kicker>More guides</Kicker>
                <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.02] text-[clamp(28px,3.5vw,36px)] mb-8">
                  Keep reading.
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {others.map((a) => (
                  <Card key={a.slug} href={`/resources/${a.slug}`} className="group">
                    <Kicker>{a.category}</Kicker>
                    <h3 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.05] text-[20px] mb-2.5 group-hover:text-lime-deep transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-dark/80 mb-3">
                      {a.summary}
                    </p>
                    <p className="text-[15px] font-semibold text-lime-deep">
                      {a.readingTimeMinutes}-min read →
                    </p>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/resources"
                  className="text-lime-deep font-semibold underline underline-offset-2 decoration-2 hover:decoration-4"
                >
                  All resources →
                </Link>
              </div>
            </div>
          </Section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
