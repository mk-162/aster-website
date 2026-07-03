"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./Button";

const STORAGE_KEY = "aster.cookieConsent.v1";

/** First-visit consent banner. Stores 'accepted' | 'declined' in
 * localStorage under aster.cookieConsent.v1 and never shows again once a
 * choice is made. Sets no cookies itself. Renders nothing until mounted to
 * avoid a hydration flash. */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (private mode etc.) — don't show a banner
      // whose dismissal we can't persist.
    }
  }, []);

  const choose = (choice: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Persisting failed; still dismiss for this page view.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 z-[60] max-w-[340px] bg-mint text-dark border-2 border-dark rounded-2xl shadow-pop-3 p-4"
    >
      <p className="text-sm leading-normal m-0 mb-3">
        No tracking cookies here — just one preference saved in your browser.{" "}
        <Link href="/cookies" className="text-lime-deep font-semibold underline">
          How it works
        </Link>
      </p>
      <div className="flex items-center gap-2.5">
        <Button variant="primary" size="sm" onClick={() => choose("accepted")}>
          Okay
        </Button>
        <button
          onClick={() => choose("declined")}
          className="text-sm font-semibold text-dark/60 underline hover:text-dark px-1"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
