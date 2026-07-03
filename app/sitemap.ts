import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { ARTICLES } from "@/lib/resources";
import { VS_SLUGS } from "@/app/vs/[competitor]/page";
import { SITE_URL } from "@/lib/seo";

/** Every public route on the marketing site. Static pages are listed
 * explicitly; blog posts, resource articles, and comparison pages come
 * from the same data sources the pages themselves render from, so the
 * sitemap can never drift out of sync with the routes. */

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const STATIC_PAGES: Array<{ path: string; changeFrequency: Freq; priority: number }> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  // Persona + commercial pages
  { path: "/for-athletes", changeFrequency: "monthly", priority: 0.9 },
  { path: "/for-watchers", changeFrequency: "monthly", priority: 0.9 },
  { path: "/for-organisers", changeFrequency: "monthly", priority: 0.9 },
  { path: "/clubs", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  // Sport landing pages
  { path: "/cycling", changeFrequency: "monthly", priority: 0.8 },
  { path: "/running", changeFrequency: "monthly", priority: 0.8 },
  { path: "/discover", changeFrequency: "daily", priority: 0.8 },
  // Content hubs
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/resources", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/glossary", changeFrequency: "monthly", priority: 0.5 },
  { path: "/battery-use", changeFrequency: "monthly", priority: 0.6 },
  { path: "/changelog", changeFrequency: "weekly", priority: 0.4 },
  // Company
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/founder", changeFrequency: "monthly", priority: 0.5 },
  { path: "/press", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  // Campaign / invite pages
  { path: "/smugglers", changeFrequency: "monthly", priority: 0.3 },
  { path: "/selected", changeFrequency: "monthly", priority: 0.3 },
  // Legal
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      changeFrequency,
      priority,
    }),
  );

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date || undefined,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const resourceEntries: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${SITE_URL}/resources/${article.slug}`,
    lastModified: article.dateModified ?? article.datePublished,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const vsEntries: MetadataRoute.Sitemap = VS_SLUGS.map((slug) => ({
    url: `${SITE_URL}/vs/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries, ...resourceEntries, ...vsEntries];
}
