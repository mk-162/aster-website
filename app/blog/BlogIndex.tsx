"use client";

import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import { CATEGORIES, type Category, type Post } from "./shared";

/** Client-side category filter so /blog stays fully static. Posts arrive
 * pre-sorted (date desc) from the server component. */
export default function BlogIndex({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<Category | "All">("All");
  const shown =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  const chips: (Category | "All")[] = ["All", ...CATEGORIES];

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-10" role="group" aria-label="Filter by category">
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={`h-10 px-4 border-2 border-dark rounded-xl font-condensed uppercase tracking-[0.03em] font-bold text-sm cursor-pointer transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
              active === c
                ? "bg-lime text-dark shadow-pop-lime"
                : "bg-white text-dark shadow-pop-sm hover:bg-lime-bg"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="text-dark/70">Nothing in this category yet. Soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
