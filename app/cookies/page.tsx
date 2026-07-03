import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "This site sets no tracking cookies. One consent preference is stored in your browser, and the app uses strictly-necessary storage for login sessions. That's it.",
  alternates: { canonical: "/cookies" },
};

const LAST_UPDATED = "2 July 2026";

const heading =
  "font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.98] text-[clamp(24px,3.5vw,32px)] text-dark mt-12 mb-4 first:mt-0";
const body = "text-[16px] leading-relaxed text-dark/80 mb-4";
const list = "space-y-3 text-[16px] leading-relaxed text-dark/80 mb-4 list-disc pl-5";
const inlineLink = "text-lime-deep font-semibold underline";

export default function CookiesPage() {
  return (
    <>
      <SiteNav />
      <main>
        <Section tone="dark" innerClassName="text-center">
          <Kicker tone="dark">Cookies</Kicker>
          <h1 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(40px,7vw,72px)] text-mint mb-5">
            The shortest cookie page you&rsquo;ll read.
          </h1>
          <p className="text-lg leading-normal text-mint/85 max-w-[60ch] mx-auto">
            This website sets no tracking cookies. No analytics pixels, no ad
            networks, no fingerprinting. Here&rsquo;s the full picture.
          </p>
          <p className="text-sm text-mint/60 mt-4">Last updated {LAST_UPDATED}</p>
        </Section>

        <Section tone="white">
          <div className="max-w-[72ch] mx-auto">
            <h2 className={heading}>What we store</h2>
            <ul className={list}>
              <li>
                <strong>On this website:</strong> a single preference —{" "}
                <code className="text-[14px] bg-stone border border-dark/20 rounded px-1.5 py-0.5">
                  aster.cookieConsent.v1
                </code>{" "}
                — saved in your browser&rsquo;s localStorage when you answer
                the consent banner. It records whether you tapped
                &ldquo;Okay&rdquo; or &ldquo;No thanks&rdquo;, so we
                don&rsquo;t ask again. It is not a cookie, it is never sent to
                our servers, and it identifies nothing about you.
              </li>
              <li>
                <strong>In the Aster app</strong> (the app domain, once
                you&rsquo;re signed in): strictly-necessary storage that keeps
                your login session alive. Without it you couldn&rsquo;t stay
                signed in. Nothing there is used for tracking or advertising.
              </li>
            </ul>
            <p className={body}>
              If we ever add analytics to this site, this page will list
              exactly what was added and why, and the consent banner will ask
              you first.
            </p>

            <h2 className={heading}>Why</h2>
            <p className={body}>
              The consent preference exists purely so the banner doesn&rsquo;t
              nag you on every visit. The app&rsquo;s session storage exists so
              you stay signed in — which matters a great deal when you&rsquo;re
              mid-ride in a place with no signal. Neither is used to profile
              you, follow you around the web, or sell anything to anyone.
            </p>

            <h2 className={heading}>How to clear it</h2>
            <p className={body}>
              Clear your browser&rsquo;s site data for this domain (usually
              under Settings &rarr; Privacy &rarr; Site data, or by clicking
              the padlock in the address bar). The consent banner will simply
              appear again on your next visit. Clearing site data for the app
              domain signs you out of the app.
            </p>

            <h2 className={heading}>Contact</h2>
            <p className={body}>
              Questions about any of this? Email{" "}
              <a href="mailto:privacy@astertrack.app" className={inlineLink}>
                privacy@astertrack.app
              </a>{" "}
              and a human will answer. Our full{" "}
              <Link href="/privacy" className={inlineLink}>
                privacy policy
              </Link>{" "}
              covers how the app handles your data.
            </p>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
