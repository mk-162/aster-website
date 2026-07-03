import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

// Aster brand fonts: Barlow for body, Barlow Condensed for headlines/numerals.
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const SITE_URL = "https://www.astertrack.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aster — live race tracking for cycling",
    template: "%s — Aster",
  },
  description:
    "The live experience for cycling. Follow every rider on one map, run your club, and put your event on the map. Free for riders and small clubs.",
  openGraph: {
    type: "website",
    siteName: "Aster",
    url: SITE_URL,
    images: ["/og/og-for-teams.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
