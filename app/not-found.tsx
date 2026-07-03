import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import { appLinks } from "@/lib/links";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That page doesn't exist on Aster. Head back to the start or find a live event to watch.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main>
        <Section tone="dark" innerClassName="py-24 md:py-32">
          <Kicker tone="dark">404 · Off route</Kicker>
          <h1 className="font-condensed uppercase font-bold tracking-[-0.02em] leading-[0.92] text-mint text-[clamp(46px,6vw,88px)] mb-6 max-w-[18ch] text-balance">
            Wrong turn.{" "}
            <span className="text-lime">The route home is easy.</span>
          </h1>
          <p className="text-[clamp(18px,1.6vw,21px)] leading-normal text-mint/85 max-w-[48ch] mb-9">
            This page doesn&apos;t exist — or it&apos;s moved on without
            leaving a track. No matter: you&apos;re one turn from where you
            meant to be.
          </p>
          <div className="flex gap-3.5 flex-wrap items-center">
            <Button href="/" variant="primary">
              Back to the start
            </Button>
            <Button href={appLinks.discover} variant="secondary">
              Find a live event
            </Button>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
