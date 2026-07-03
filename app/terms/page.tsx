import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms for using the platform: acceptable use, accounts, organiser responsibilities — and the important bit: a tracking aid, not a safety device.",
  alternates: { canonical: "/terms" },
};

/* Terms of service — content ported faithfully from the production app's
 * /terms page (frontend/src/pages/Terms.tsx). Do not rewrite the legal copy
 * here; restyle only. Bump the date when the terms text changes. */
const LAST_UPDATED = "19 June 2026";

const heading =
  "font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.98] text-[clamp(24px,3.5vw,32px)] text-dark mt-12 mb-4 first:mt-0";
const body = "text-[16px] leading-relaxed text-dark/80 mb-4";
const list = "space-y-3 text-[16px] leading-relaxed text-dark/80 mb-4 list-disc pl-5";
const inlineLink = "text-lime-deep font-semibold underline";

export default function TermsPage() {
  return (
    <>
      <SiteNav />
      <main>
        <Section tone="dark" innerClassName="text-center">
          <Kicker tone="dark">Terms</Kicker>
          <h1 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(40px,7vw,72px)] text-mint mb-5">
            The short version of the deal.
          </h1>
          <p className="text-lg leading-normal text-mint/85 max-w-[60ch] mx-auto">
            These terms cover how you can use Aster, what we&rsquo;re
            responsible for, and — most importantly — what we&rsquo;re not.
            Plain English, no traps.
          </p>
          <p className="text-sm text-mint/60 mt-4">
            Draft · last reviewed {LAST_UPDATED}
          </p>
        </Section>

        <Section tone="white">
          <div className="max-w-[72ch] mx-auto">
            {/* Pre-beta note */}
            <div className="border-2 border-dark rounded-2xl bg-stone shadow-pop-1 p-5 mb-10">
              <p className="text-[16px] leading-relaxed text-dark/80 m-0">
                Aster is in pre-beta development and not yet publicly released.
                This is a draft agreement that will be finalised before launch.
                By using a pre-release build you accept it as written here.
                Questions:{" "}
                <a href="mailto:hello@astertrack.app" className={inlineLink}>
                  hello@astertrack.app
                </a>
                .
              </p>
            </div>

            {/* Safety disclaimer — the important one, placed high. */}
            <h2 className={heading}>Aster is an aid, not a safety device</h2>
            <p className={body}>
              This is the part that matters most. Aster helps people see where
              you are and helps you signal for help — but it is{" "}
              <strong>not</strong> a guaranteed safety or emergency system. GPS
              can be wrong, phone signal can drop, batteries die, and software
              can fail.
            </p>
            <p className={body}>
              You are responsible for your own safety on every ride. Carry
              proper equipment, plan for the conditions, and never rely on
              Aster — or any single device — as your only line of defence in
              remote terrain.
            </p>

            <h2 className={heading}>Your account</h2>
            <ul className={list}>
              <li>
                You&rsquo;re responsible for keeping your sign-in details
                secure and for activity under your account.
              </li>
              <li>
                Give accurate information when you sign up, and keep it
                current.
              </li>
              <li>
                You must be old enough to enter into this agreement in your
                country, or have a guardian&rsquo;s consent.
              </li>
              <li>
                You can delete your account at any time from the app under
                Profile &rarr; Privacy &amp; data.
              </li>
            </ul>

            <h2 className={heading}>Acceptable use</h2>
            <p className={body}>Please don&rsquo;t:</p>
            <ul className={list}>
              <li>
                Use Aster to track or surveil anyone without their knowledge
                and consent.
              </li>
              <li>
                Interfere with, overload, or attempt to break the service.
              </li>
              <li>
                Post content that&rsquo;s unlawful, abusive, or infringes
                someone else&rsquo;s rights.
              </li>
              <li>
                Misrepresent results, impersonate other riders, or game
                leaderboards.
              </li>
            </ul>

            <h2 className={heading}>If you run events</h2>
            <p className={body}>
              Event organisers using Aster are responsible for:
            </p>
            <ul className={list}>
              <li>
                The safety, permits, and lawful running of their own event —
                Aster provides tracking tools, not event management or
                insurance.
              </li>
              <li>
                Being clear with riders about what is tracked and who can see
                it.
              </li>
              <li>
                Handling rider data they collect in line with applicable
                privacy law.
              </li>
              <li>
                The accuracy of the event details, routes, and results they
                publish.
              </li>
            </ul>

            <h2 className={heading}>Disclaimers &amp; liability</h2>
            <p className={body}>
              Aster is provided &ldquo;as is&rdquo;, especially during
              pre-beta. We don&rsquo;t promise it will be uninterrupted or
              error-free, and we can&rsquo;t guarantee that tracking,
              notifications, or SOS features will work in every situation.
            </p>
            <p className={body}>
              To the fullest extent permitted by law, Aster is not liable for
              indirect or consequential loss, or for loss arising from your
              reliance on the service for safety. Nothing here limits liability
              that can&rsquo;t be limited under law.
            </p>

            <h2 className={heading}>Changes &amp; governing law</h2>
            <p className={body}>
              We may update these terms as the product develops. Material
              changes will be flagged before launch. Continued use after an
              update means you accept the revised terms.
            </p>
            <p className={body}>
              These terms are governed by the laws of England and Wales (draft
              default, to be confirmed at launch), and the courts of England
              and Wales have jurisdiction over any disputes.
            </p>
          </div>
        </Section>

        <Section tone="dark" innerClassName="text-center">
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.98] text-[clamp(28px,4vw,40px)] text-mint mb-3">
            Need anything cleared up?
          </h2>
          <p className="text-lg text-mint/80 mb-6 max-w-[52ch] mx-auto">
            Email{" "}
            <a
              href="mailto:hello@astertrack.app"
              className="text-lime font-semibold underline"
            >
              hello@astertrack.app
            </a>
            .
          </p>
          <Link href="/privacy" className="text-sm font-semibold text-lime underline">
            Read the Privacy page &rarr;
          </Link>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
