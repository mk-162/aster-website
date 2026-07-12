"use client";

/* ReplayVideo — an ambient, muted, looping product clip used inside the device
 * frames (BrowserFrame / PhoneFrame). It autoplays silently like a hero loop,
 * NOT a click-to-play player (that's the founder-video pattern on /smugglers).
 *
 * Respects prefers-reduced-motion: when the visitor asks for less motion we
 * render the poster still instead of an autoplaying video — same footprint,
 * no layout shift (the poster shares the clip's intrinsic ratio). */
import { useEffect, useState } from "react";

export default function ReplayVideo({
  src,
  poster,
  alt,
  width,
  height,
  className = "",
}: {
  src: string;
  poster: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  if (reduced) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={poster}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      width={width}
      height={height}
      aria-label={alt}
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
