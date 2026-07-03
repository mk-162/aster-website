import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page doesn't exist on Aster. Head back to the live tracking homepage, discover events, or check the FAQ.",
  robots: { index: false, follow: false },
};

const links = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover events" },
  { href: "/faq", label: "FAQ" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b1f16] text-center px-6 py-24">
      <p className="font-condensed uppercase font-bold tracking-[0.2em] text-sm text-lime-300/80 mb-4">
        404
      </p>
      <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.95] text-[clamp(40px,7vw,88px)] text-white mb-6">
        Off course
      </h1>
      <p className="text-lg text-white/70 max-w-[46ch] mb-10">
        This page doesn&apos;t exist — or it moved. The route back is easy.
      </p>
      <nav className="flex flex-wrap justify-center gap-4">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="font-condensed uppercase font-bold tracking-wide px-6 py-3 border-2 border-lime-300 text-lime-300 hover:bg-lime-300 hover:text-[#0b1f16] transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
