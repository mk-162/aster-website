import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How your location and data are handled: sharing off by default, every share revocable and time-bound, watching needs no account, export or delete everything.",
  alternates: { canonical: "/privacy" },
};

/* Privacy policy — content ported faithfully from the production app's
 * /privacy page (frontend/src/pages/Privacy.tsx). Do not rewrite the legal
 * copy here; restyle only. Bump the date when the policy text changes. */
const LAST_UPDATED = "19 June 2026";

const heading =
  "font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.98] text-[clamp(24px,3.5vw,32px)] text-dark mt-12 mb-4 first:mt-0";
const body = "text-[16px] leading-relaxed text-dark/80 mb-4";
const list = "space-y-3 text-[16px] leading-relaxed text-dark/80 mb-4 list-disc pl-5";
const inlineLink = "text-lime-deep font-semibold underline";

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <main>
        <Section tone="dark" innerClassName="text-center">
          <Kicker tone="dark">Privacy</Kicker>
          <h1 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(40px,7vw,72px)] text-mint mb-5">
            Your dot, your call.
          </h1>
          <p className="text-lg leading-normal text-mint/85 max-w-[60ch] mx-auto">
            Aster only knows where you are when you decide to share it. This
            page says what we collect, how location is used, and the controls
            you have over both — in plain English.
          </p>
          <p className="text-sm text-mint/60 mt-4">Last reviewed {LAST_UPDATED}</p>
        </Section>

        <Section tone="white">
          <div className="max-w-[72ch] mx-auto">
            {/* Pre-beta honesty note */}
            <div className="border-2 border-dark rounded-2xl bg-stone shadow-pop-1 p-5 mb-10">
              <p className="text-[16px] leading-relaxed text-dark/80 m-0">
                Aster is in pre-beta development and not yet publicly released.
                This page describes how the product handles data today and the
                principles that guide it. It will grow more formal as we
                approach launch; if anything here is unclear, email{" "}
                <a href="mailto:privacy@astertrack.app" className={inlineLink}>
                  privacy@astertrack.app
                </a>
                .
              </p>
            </div>

            <h2 className={heading}>What we collect</h2>
            <ul className={list}>
              <li>
                <strong>Account details.</strong> The email address and profile
                information you provide at sign-up, so we can identify your
                account and send transactional email (sign-in, race
                notifications you opt into).
              </li>
              <li>
                <strong>Location data — only during a ride you start.</strong>{" "}
                When you tap Start, the app records GPS positions
                (&ldquo;pings&rdquo;) for that ride. Nothing is recorded before
                you start or after you stop.
              </li>
              <li>
                <strong>Ride and event data.</strong> The events you register
                for, your routes, distances and times, and any posts or
                comments you choose to publish.
              </li>
              <li>
                <strong>Basic technical data.</strong> The minimum needed to
                keep the service running and reliable — we don&rsquo;t sell it,
                and we don&rsquo;t build advertising profiles from it.
              </li>
            </ul>

            <h2 className={heading}>How location is used</h2>
            <p className={body}>
              Location exists to do one job: show your live position and trail
              to the people you&rsquo;re sharing with, and to record your ride
              so you can review it afterwards. It powers the live map, the
              leaderboard, your distance and time, and — if you ask for it —
              the SOS that lets an organiser find you.
            </p>
            <p className={body}>
              Sharing is <strong>never on by default</strong>. A deliberate
              share action is always required, and you choose <em>who</em> can
              see you, <em>what</em> they see, and <em>for how long</em>.
            </p>

            <h2 className={heading}>Sharing &amp; visibility controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Control
                title="Off by default"
                text="Location sharing is never on until you turn it on. Nothing about where you are leaves the device until you decide it should."
              />
              <Control
                title="One-tap revoke"
                text="Any active share can be stopped in one tap. No permanent shares run quietly in the background."
              />
              <Control
                title="Time-bound"
                text="Shares are time-bound by default — for the next stretch, or until you stop — so exposure doesn't outlast the ride."
              />
              <Control
                title="Watching needs no account"
                text="For public and unlisted events, anyone can open the link and watch — no login, no app to install. Watchers aren't asked to hand over an identity to spectate."
              />
            </div>
            <p className="text-sm text-dark/60 mb-4">
              Private events are the exception — they require authentication,
              so only invited people can see the riders.
            </p>

            <h2 className={heading}>Data retention</h2>
            <p className={body}>
              Ride and trace data is kept so you can review your rides and so
              results stay accurate. Shared traces stop being visible when the
              share expires. When you delete your account, your location
              history is permanently removed.
            </p>
            <p className={body}>
              We never sell or monetise location data, full stop.
            </p>

            <h2 className={heading}>Your rights</h2>
            <p className={body}>
              Aster already supports the core GDPR rights from inside the app:
            </p>
            <ul className={list}>
              <li>
                <strong>Access &amp; export.</strong> Download a copy of your
                data.
              </li>
              <li>
                <strong>Deletion.</strong> Permanently delete your account and
                your location history.
              </li>
              <li>
                <strong>Correction.</strong> Edit your profile and ride details
                at any time.
              </li>
            </ul>
            <p className={body}>
              Account deletion and data export live in the app under Profile
              &rarr; Privacy &amp; data. For anything you can&rsquo;t do
              yourself, email{" "}
              <a href="mailto:privacy@astertrack.app" className={inlineLink}>
                privacy@astertrack.app
              </a>{" "}
              and we&rsquo;ll handle it.
            </p>
          </div>
        </Section>

        <Section tone="dark" innerClassName="text-center">
          <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.98] text-[clamp(28px,4vw,40px)] text-mint mb-3">
            Questions about your data?
          </h2>
          <p className="text-lg text-mint/80 mb-6 max-w-[52ch] mx-auto">
            Email{" "}
            <a
              href="mailto:privacy@astertrack.app"
              className="text-lime font-semibold underline"
            >
              privacy@astertrack.app
            </a>{" "}
            and a human will answer.
          </p>
          <Link href="/terms" className="text-sm font-semibold text-lime underline">
            Read the Terms &rarr;
          </Link>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}

function Control({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-2 border-dark rounded-2xl bg-white shadow-pop-1 p-5">
      <h3 className="font-condensed uppercase tracking-[0.03em] font-semibold text-lg text-dark mb-1.5">
        {title}
      </h3>
      <p className="text-[15px] leading-normal text-dark/70 m-0">{text}</p>
    </div>
  );
}
