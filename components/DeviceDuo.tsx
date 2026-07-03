/* DeviceDuo — the "works on both" montage: a desktop browser view with a phone
 * overlapping its lower-left corner. One composition says the whole thing —
 * track from the phone in your pocket, follow on any screen, no app needed.
 *
 * Pure composition of the existing BrowserFrame + PhoneFrame primitives, so it
 * inherits the DS treatment (2px borders, pop shadows). Screenshots default to
 * the live staged-race captures; override via props when the app UI changes.
 */
import BrowserFrame from "./BrowserFrame";
import PhoneFrame from "./PhoneFrame";

export default function DeviceDuo({
  desktopSrc = "/images/app/live-map-desktop.png",
  desktopAlt = "Following a live race in the browser — map and leaderboard",
  phoneSrc = "/images/app/live-map-phone.png",
  phoneAlt = "The same live race on a phone",
  url = "astertrack.app/…",
  priority = false,
  className = "",
}: {
  desktopSrc?: string;
  desktopAlt?: string;
  phoneSrc?: string;
  phoneAlt?: string;
  url?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative pb-[9%] ${className}`}>
      {/* Desktop, inset left so the phone has room to hang off its corner. */}
      <div className="pl-[14%] sm:pl-[18%]">
        <BrowserFrame
          src={desktopSrc}
          alt={desktopAlt}
          url={url}
          priority={priority}
          sizes="(min-width: 1024px) 620px, 86vw"
        />
      </div>
      {/* Phone overlaps the browser's lower-left — pocket-first, big-screen too. */}
      <div className="absolute bottom-0 left-0 w-[30%] sm:w-[26%] max-w-[210px] rotate-[-3deg]">
        <PhoneFrame
          src={phoneSrc}
          alt={phoneAlt}
          sizes="(min-width: 640px) 210px, 30vw"
        />
      </div>
    </div>
  );
}
