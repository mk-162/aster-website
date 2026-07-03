import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/app/blog/shared";

/** Journal card: hero image (or stone/mint fallback block) above meta,
 * title and description. DS card anatomy — 2px dark border, pop shadow,
 * lift-toward-cursor hover. */
export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block border-2 border-dark rounded-2xl bg-white text-dark shadow-pop-2 overflow-hidden transition-[transform,box-shadow] duration-100 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-pop-3"
    >
      <div className="relative aspect-[16/9] border-b-2 border-dark bg-stone overflow-hidden">
        {post.hero ? (
          <Image
            src={post.hero}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-mint-bg flex items-center justify-center">
            <span className="font-condensed uppercase tracking-[0.08em] font-bold text-lime-deep text-lg">
              {post.category}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="font-condensed uppercase tracking-[0.08em] font-semibold text-[13px] text-lime-deep mb-2.5">
          {post.category} · {formatDate(post.date)}
        </p>
        <h3 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[1.02] text-[26px] mb-2 text-balance">
          {post.title}
        </h3>
        <p className="text-[15px] leading-normal text-dark/75 mb-3">
          {post.description}
        </p>
        <p className="text-[13px] text-dark/55">
          {post.readingTimeMins} min read
        </p>
      </div>
    </Link>
  );
}
