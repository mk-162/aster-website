import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Button from "@/components/Button";
import RouteMotif from "@/components/RouteMotif";
import BlogSidebar from "@/components/BlogSidebar";
import BlogCard from "@/components/BlogCard";
import { appLinks } from "@/lib/links";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      ...(post.hero ? { images: [{ url: post.hero }] } : {}),
    },
  };
}

/* Hand-styled prose (no typography plugin in Tailwind v4 here). Headings
 * condensed uppercase; links lime-deep underlined; blockquotes 2px dark
 * left border; images rounded + bordered — the DS applied to longform. */
const mdComponents = {
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.02] text-[30px] mt-12 mb-4"
      {...props}
    />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.05] text-[22px] mt-9 mb-3"
      {...props}
    />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p className="text-[17px] leading-[1.7] text-dark/85 mb-5" {...props} />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-lime-deep underline underline-offset-2 decoration-2 hover:decoration-4"
      {...props}
    />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="list-disc pl-6 mb-5 space-y-2 text-[17px] leading-[1.7] text-dark/85"
      {...props}
    />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="list-decimal pl-6 mb-5 space-y-2 text-[17px] leading-[1.7] text-dark/85"
      {...props}
    />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-2 border-dark pl-5 my-6 text-[18px] leading-[1.6] text-dark/75 italic"
      {...props}
    />
  ),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-bold text-dark" {...props} />
  ),
  img: ({ src, alt }: React.ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      className="rounded-2xl border-2 border-dark my-7 w-full"
    />
  ),
  hr: () => <hr className="border-t-2 border-dark my-10" />,
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

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
        name: "Journal",
        item: "https://astertrack.app/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://astertrack.app/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteNav />
      <main>
        {/* ---- Post header ---- */}
        <section className="bg-stone text-dark border-b-2 border-dark">
          <div className="container-site py-14 md:py-20">
            <div className="max-w-[820px]">
              <span className="inline-block border-2 border-dark rounded-xl bg-lime px-3 py-1 font-condensed uppercase tracking-[0.06em] font-bold text-[13px] mb-5">
                {post.category}
              </span>
              <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.95] text-[clamp(38px,5vw,64px)] mb-5 text-balance">
                {post.title}
              </h1>
              <p className="font-condensed uppercase tracking-[0.08em] font-semibold text-[13px] text-lime-deep">
                {formatDate(post.date)} · {post.author} ·{" "}
                {post.readingTimeMins} min read
              </p>
            </div>
            {post.hero && (
              <div className="relative aspect-[21/9] mt-10 rounded-2xl border-2 border-dark overflow-hidden shadow-pop-2">
                <Image
                  src={post.hero}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </section>

        {/* ---- Body, with the conversion rail ---- */}
        <section className="bg-white text-dark border-b-2 border-dark">
          <div className="container-site py-14 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,68ch)_300px] items-start">
              <article className="max-w-[68ch] min-w-0">
                <ReactMarkdown components={mdComponents}>
                  {post.body}
                </ReactMarkdown>
              </article>
              <BlogSidebar />
            </div>
          </div>
        </section>

        {/* ---- More from the journal ---- */}
        {more.length > 0 && (
          <section className="bg-stone text-dark border-b-2 border-dark">
            <div className="container-site py-14 md:py-20">
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.02] text-[32px] mb-8">
                More from the journal.
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {more.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---- CTA band ---- */}
        <section className="relative overflow-hidden bg-dark text-mint border-b-2 border-dark">
          <RouteMotif tone="dark" variant={1} flip />
          <div className="relative z-10 container-site py-16 md:py-24 text-center">
            <h2 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.95] text-mint text-[clamp(36px,4.5vw,60px)] mb-4">
              See it live.
            </h2>
            <p className="text-lg text-mint/85 max-w-[46ch] mx-auto mb-9">
              The fastest way to understand live tracking is to open an event
              that is happening right now.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href={appLinks.discover}>Watch a live event</Button>
              <Button href={appLinks.app} variant="secondary">
                Get the app
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
