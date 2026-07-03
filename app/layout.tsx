import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

/* Brand fonts self-hosted via next/font (zero layout shift, no render-blocking
 * Google CSS request). The DS variables --font-sans / --font-condensed are
 * overridden with these instances in <html style>. */
const barlow = Barlow({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});
const barlowCondensed = Barlow_Condensed({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.astertrack.app"),
  title: {
    default: "Aster — Live tracking for endurance racing",
    template: "%s · Aster",
  },
  description:
    "Live GPS tracking and leaderboards for endurance cycling and running — from the phone athletes already carry. Free for athletes; watch any event, no app needed.",
  openGraph: {
    siteName: "Aster",
    type: "website",
    locale: "en_GB",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
      style={
        {
          "--font-sans": "var(--font-barlow), system-ui, sans-serif",
          "--font-condensed":
            "var(--font-barlow-condensed), var(--font-barlow), sans-serif",
        } as React.CSSProperties
      }
    >
      <body className="min-h-full flex flex-col">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
