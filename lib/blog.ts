import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CATEGORIES, type Category, type Post } from "@/app/blog/shared";

/** Blog content pipeline — no CMS. Posts are markdown files in
 * content/blog/<slug>.md with frontmatter (title, description, date,
 * category, author, hero). Read from disk at build time only.
 * Server-only (uses fs); client-safe types + helpers live in
 * app/blog/shared.ts. */

export { CATEGORIES, formatDate } from "@/app/blog/shared";
export type { Category, Post } from "@/app/blog/shared";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function parsePost(slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  const category = CATEGORIES.includes(data.category)
    ? (data.category as Category)
    : "Product";
  const words = content.trim().split(/\s+/).length;
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    category,
    author: String(data.author ?? "The Aster team"),
    hero: data.hero ? String(data.hero) : undefined,
    body: content,
    readingTimeMins: Math.max(1, Math.round(words / 220)),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) =>
      parsePost(
        f.replace(/\.md$/, ""),
        fs.readFileSync(path.join(BLOG_DIR, f), "utf8"),
      ),
    )
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  return parsePost(slug, fs.readFileSync(file, "utf8"));
}
