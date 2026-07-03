/** Client-safe blog primitives (no fs) — shared by server pipeline (lib/blog.ts)
 * and client components (BlogIndex, BlogCard). */

export const CATEGORIES = ["Events", "Product", "Guides"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date string, e.g. "2026-07-02" */
  date: string;
  category: Category;
  author: string;
  /** Optional path into /public, e.g. "/images/cycling/hero-dust.webp" */
  hero?: string;
  /** Raw markdown body */
  body: string;
  /** Whole minutes, minimum 1 */
  readingTimeMins: number;
};

/** British long date, e.g. "2 July 2026". */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
