import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Section from "@/components/Section";
import Kicker from "@/components/Kicker";
import RouteMotif from "@/components/RouteMotif";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the Aster team — organisers, clubs, press, support, or just saying hello. Direct email addresses for every enquiry; most messages answered within a working day.",
  alternates: { canonical: "/contact" },
};

/* Direct addresses ported from the current site's contact page, kept alongside
 * the form for people who prefer plain email. */
const directLines = [
  { label: "General & hello", email: "hello@astertrack.app" },
  { label: "Organisers & partnerships", email: "james@astertrack.app" },
  { label: "Press", email: "press@astertrack.app" },
  { label: "Support (tag URGENT for safety issues)", email: "help@astertrack.app" },
];

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main>
        <Section tone="dark" className="!overflow-hidden">
          <RouteMotif tone="dark" variant={1} />
          <div className="relative z-10">
            <Kicker tone="dark">Contact · A human replies</Kicker>
            <h1 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(40px,7vw,72px)] text-mint mt-3 mb-4">
              Say hello.
            </h1>
            <p className="text-lg leading-normal text-mint/70 max-w-[52ch]">
              Organising an event, running a club, writing a story, or stuck on
              something — we read everything and reply to most messages within
              a working day.
            </p>
          </div>
        </Section>

        <Section tone="stone">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div className="bg-white border-2 border-dark rounded-2xl shadow-pop-2 p-6 sm:p-8">
              <ContactForm />
            </div>
            <div>
              <Kicker>Prefer plain email?</Kicker>
              <h2 className="font-condensed uppercase font-bold tracking-[-0.01em] leading-[0.95] text-[clamp(24px,3vw,32px)] mt-2 mb-6 text-dark">
                Straight to an inbox.
              </h2>
              <div className="space-y-3">
                {directLines.map((d) => (
                  <a
                    key={d.email}
                    href={`mailto:${d.email}`}
                    className="block border-2 border-dark rounded-2xl bg-white shadow-pop-1 p-4 hover:-translate-x-px hover:-translate-y-px hover:shadow-pop-2 transition-transform"
                  >
                    <span className="font-condensed uppercase tracking-[0.04em] font-semibold text-dark block">
                      {d.label}
                    </span>
                    <span className="text-[15px] text-lime-deep font-medium">{d.email}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
