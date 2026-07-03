import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import RouteMotif from "@/components/RouteMotif";
import Kicker from "@/components/Kicker";
import { getAllPosts } from "@/lib/blog";
import BlogIndex from "./BlogIndex";
import BlogSidebar from "@/components/BlogSidebar";

export const metadata: Metadata = {
  title: "The journal — live tracking, events and clubs",
  description:
    "Stories and practical guides: live tracking on race day, product decisions explained plainly, and how clubs and organisers get the most from a live track.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <SiteNav />
      <main>
        {/* ---- Hero: dark band + route motif ---- */}
        <section className="relative overflow-hidden bg-dark text-mint border-b-2 border-dark">
          <RouteMotif tone="dark" variant={2} flip />
          <div className="relative z-10 container-site py-16 md:py-24">
            <Kicker tone="dark">The Aster journal · Events · Tracking</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.92] text-mint text-[clamp(46px,6vw,88px)] mb-6 max-w-[18ch] text-balance">
              Notes from the road.{" "}
              <span className="text-lime">And the people watching it.</span>
            </h1>
            <p className="text-[clamp(18px,1.6vw,21px)] leading-normal text-mint/85 max-w-[48ch]">
              How live tracking changes race day, why we built things the way
              we did, and practical guides for clubs and organisers. Written
              plainly, published when there is something worth saying.
            </p>
          </div>
        </section>

        {/* ---- Filter chips + grid, with the conversion rail ---- */}
        <section className="bg-stone text-dark border-b-2 border-dark">
          <div className="container-site py-14 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_300px] items-start">
              <BlogIndex posts={posts} />
              <BlogSidebar />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
