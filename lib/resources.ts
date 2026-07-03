/** Resource-article data for the /resources long-form hub.
 *
 * Each article is a structured object: meta (title, summary, dates,
 * reading time, category) + body (ordered sections with H2 + a body
 * array of paragraphs / bullet lists / callouts). Kept as data, not
 * JSX/markdown, so the renderer can apply consistent DS typography.
 *
 * Ported from the Aster PWA marketing site (frontend/src/pages/
 * resources/articles.ts) — content carried faithfully, with the
 * brand voice lightly de-dotted per the tracking + sharing
 * repositioning (community/competitor "dot-watching" references
 * kept where factual).
 */

export type ArticleBlock =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "callout"; text: string };

export interface ArticleSection {
  h2: string;
  blocks: ArticleBlock[];
}

export interface Article {
  slug: string;
  title: string;
  summary: string; // 1-2 sentence summary, also used as meta description
  category: string; // free-text card label (e.g. "For organisers")
  author: string;
  datePublished: string; // ISO YYYY-MM-DD
  dateModified?: string; // ISO YYYY-MM-DD, optional
  readingTimeMinutes: number; // rough — informs the byline
  heroKicker: string; // small kicker above hero title
  heroSubhead: string; // hero paragraph under the title
  sections: ArticleSection[];
  // Closing CTA: which audience page to push readers toward.
  ctaHeading: string;
  ctaBody: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
}

export const ARTICLES: Article[] = [
  // ───────────────────────────────────────────────────────────────
  // 1. How live race tracking works (foundational explainer)
  // ───────────────────────────────────────────────────────────────
  {
    slug: "how-live-race-tracking-works",
    title: "How live race tracking works in 2026",
    summary:
      "From the GPS chip in a rider's phone to their position moving live on a spectator's map: a plain-language walkthrough of how modern live race tracking actually works.",
    category: "Foundations",
    author: "James Vickers",
    datePublished: "2026-05-22",
    readingTimeMinutes: 7,
    heroKicker: "Foundations",
    heroSubhead:
      "What's actually happening between a rider crossing the start line and their position moving on the watch page. Written for race organisers, brand partners, and spectators who want to understand the chain.",
    sections: [
      {
        h2: "The four moving parts",
        blocks: [
          {
            kind: "p",
            text: "Modern live race tracking is a chain of four things: a device that knows where the rider is, a network that carries that position somewhere, a server that stores and interprets it, and a screen that shows it to an audience. Every live-tracking platform — hardware satellite trackers, phone-based apps, GPS-watch beacons — is a different combination of those same four parts.",
          },
          {
            kind: "p",
            text: "Understanding which combination a platform uses is the entire reason any two platforms perform differently. Coverage, latency, cost, the size of the audience that can watch — they're all downstream of which device, network, server, and screen you chose.",
          },
        ],
      },
      {
        h2: "1. The device — what knows where the rider is",
        blocks: [
          {
            kind: "p",
            text: "Every live-tracking device, satellite or phone, uses the same underlying technology: a GPS chip listens for signals from the constellation of GPS satellites orbiting Earth and triangulates a position to within a few metres. The GPS chip itself is essentially free now — every smartphone has one, and so does every dedicated tracker.",
          },
          {
            kind: "p",
            text: "What separates the categories is what the device does with that position once it has one:",
          },
          {
            kind: "ul",
            items: [
              "Hardware satellite trackers (Spot, inReach, YB Tracking pucks) send the position over a satellite uplink — works anywhere in the world but the per-message cost is high and the device costs £200–£500.",
              "Phone-based apps (Aster, Strava Beacon, RideWithGPS Live) send the position over the cellular data the phone already has — free at the margin, dependent on cell coverage.",
              "GPS watches (Garmin LiveTrack, Wahoo Live) sit between the two: the watch has the GPS chip but no network, so it pairs with the rider's phone over Bluetooth and the phone does the uploading.",
            ],
          },
          {
            kind: "p",
            text: "Aster sits in the phone-based-app category. The rider's phone is the device, the cellular data plan the rider already has is the network. There's no separate hardware to ship to the start line, no per-tracker activation fee, no recovery logistics after the race.",
          },
        ],
      },
      {
        h2: "2. The network — how the position gets to the server",
        blocks: [
          {
            kind: "p",
            text: "Once the device has a position, it needs to send it somewhere. The constraint here is bandwidth and reliability, not raw distance. A position fix is tiny — typically 60–200 bytes including the timestamp, accuracy, speed, and battery percentage. The challenge isn't sending one fix; it's sending one every few seconds for hours, across patchy coverage.",
          },
          {
            kind: "p",
            text: "Modern phone-based trackers solve patchy coverage the same way every offline-tolerant app does: a queue on the device. The phone records every position as it happens — every five seconds, say — and buffers the fixes locally. The moment cell signal returns, the queue drains in the background. On Aster the queue is held in native SQLite on iOS and Android, and survives the app being killed, the phone restarting, and (within seven days) the battery dying flat.",
          },
          {
            kind: "callout",
            text: "The practical effect: a rider can cross a 40-kilometre stretch with no signal at all. Their position pauses on the watch page while they're in the dead zone, then re-appears at their current location the moment signal returns — and the line they rode in the dead zone backfills onto the map.",
          },
        ],
      },
      {
        h2: "3. The server — what the position becomes",
        blocks: [
          {
            kind: "p",
            text: "When a position arrives at the server, it isn't just stored — it's interpreted. The server snaps the position to the planned race route (so the rider's marker follows the road, not their three-metre wobble); calculates how far along the route the rider has progressed; updates the leaderboard ordering; checks whether the rider has crossed the finish-line geofence; and broadcasts the update to anyone currently watching the event.",
          },
          {
            kind: "p",
            text: "Two pieces of infrastructure do the heavy lifting on a modern platform. A spatial database (Aster uses PostgreSQL with PostGIS) handles the route-snapping and the geographic queries — given a point and a route polyline, what's the closest point on the route, how far along is it, is the rider currently off-route. And a real-time cache (Aster uses Redis sorted sets) holds the current leaderboard standing so a watcher loading the page doesn't have to wait for a full database query.",
          },
          {
            kind: "p",
            text: 'The unglamorous but critical part: handling late-arriving positions. A rider\'s phone might upload a queue of pings from two hours ago when they finally find signal. The server has to insert those into history in the right time order, recompute the rider\'s total distance and moving time, and not extend the live polyline past wherever the rider actually is now. This is where the difference between a well-built tracker and a janky one shows up — most tracking failures aren\'t "the GPS broke", they\'re "the late drain corrupted the timeline".',
          },
        ],
      },
      {
        h2: "4. The screen — the watcher experience",
        blocks: [
          {
            kind: "p",
            text: "The final step is everything the audience sees: the live map with every rider moving on it, the leaderboard, the gaps, the ETAs to the next checkpoint, the live chat, the SOS visibility. This is where modern phone-based trackers have leapfrogged the satellite-tracker incumbents — because the cost ceiling of the watcher experience is no longer constrained by hardware economics.",
          },
          {
            kind: "p",
            text: "On a hardware-satellite platform, the watcher map is typically a basic web page that polls the server every 30–60 seconds and re-draws the dots. On a phone-first platform, the watcher map can hold a live WebSocket to the server, push position updates the instant they arrive, animate the riders smoothly between fixes, and surface rich auxiliary content — rider profile, team colours, photos, comments — without breaking a sweat. The audience is on their phone and so is the watcher experience.",
          },
        ],
      },
      {
        h2: "What this means for an organiser deciding",
        blocks: [
          {
            kind: "p",
            text: "If you're a race organiser comparing tracking platforms, the four-part model is the right lens to evaluate with. Ask each platform:",
          },
          {
            kind: "ol",
            items: [
              "What does the device cost per rider, in total (hardware + activation + shipping + recovery)?",
              "What happens when the rider loses cell or satellite coverage — do the positions buffer, or are they lost?",
              "Does the server snap positions to my route, detect lap crossings, hold a real-time leaderboard?",
              "Can my entire audience watch on their phone without an account or app install?",
            ],
          },
          {
            kind: "p",
            text: "The answers tell you whether you're buying a 2010-era hardware tracker with a 2010-era watcher experience, or a 2026-era platform built around the device almost every rider already has in their jersey pocket.",
          },
        ],
      },
    ],
    ctaHeading: "Put your race on Aster.",
    ctaBody:
      "Phone-first GPS live tracking. No hardware to ship. Set up in an afternoon. 30-minute call to walk through it.",
    ctaPrimaryLabel: "For race organisers",
    ctaPrimaryHref: "/for-organisers",
    ctaSecondaryLabel: "See pricing",
    ctaSecondaryHref: "/pricing",
  },

  // ───────────────────────────────────────────────────────────────
  // 2. Phone-first vs hardware satellite trackers
  // ───────────────────────────────────────────────────────────────
  {
    slug: "phone-first-vs-hardware-trackers",
    title: "Phone-first GPS vs hardware satellite trackers",
    summary:
      "Hardware satellite trackers ruled live race tracking for 17 years for a reason. Here's the honest comparison — what each does well, where each breaks, and why the economics finally tip in favour of phone-first in 2026.",
    category: "Comparison",
    author: "James Vickers",
    datePublished: "2026-05-22",
    readingTimeMinutes: 9,
    heroKicker: "Comparison",
    heroSubhead:
      "Hardware satellite trackers (YB Tracking, Spot, Garmin inReach) and phone-first apps (Aster, Strava Beacon) solve the same problem with different trade-offs. This is the unvarnished comparison.",
    sections: [
      {
        h2: "Why hardware satellite trackers won the first 17 years",
        blocks: [
          {
            kind: "p",
            text: "Live race tracking as a public-facing audience experience started in earnest around 2009 with Tour Divide and the first wave of bikepacking ultras. The defining constraint of those races — riders going for days through wilderness with zero cell coverage — meant that the only viable technology was a satellite uplink. YB Tracking, Spot, and later Garmin inReach all converged on the same form factor: a small puck the rider clips to their jersey or bar bag, sending a position every 10 minutes over the Iridium or Globalstar satellite network.",
          },
          {
            kind: "p",
            text: "Hardware satellite trackers solve coverage the right way for that use case. A rider on the Continental Divide can be 200 km from the nearest cell tower; the satellite link doesn't care. The hardware is rugged, weatherproof, and has multi-day battery life. The tracking is reliable in a way phone-based tracking couldn't be in 2010, when smartphones had patchy GPS chips, four-hour battery lives, and no offline-tolerant background-location APIs.",
          },
          {
            kind: "p",
            text: "Those technical wins came with a structural cost: every rider needs a physical device. The organiser ships them out, the riders carry them, the organiser collects them after. The unit economics are punishing.",
          },
        ],
      },
      {
        h2: "The economics of hardware tracking",
        blocks: [
          {
            kind: "p",
            text: "A typical hardware-tracker line item for a 150-rider race breaks down something like:",
          },
          {
            kind: "ul",
            items: [
              "Tracker rental or device cost: £100–£300 per unit",
              "Satellite messaging plan: £20–£80 per device for the duration of the event",
              "Outbound shipping (to riders, often international): £15–£40 per device",
              "Return shipping (riders post the trackers back): £15–£40 per device",
              "Loss + damage budget (5–15% never come back): cost of replacement",
              "Customer support time spent chasing missing devices: large and uncounted",
            ],
          },
          {
            kind: "p",
            text: "For a marquee 250-rider ultra, the all-in tracking cost from a hardware vendor lands in the £20,000–£50,000 range. That math works when the event itself is generating £100k+ of entry revenue and live tracking is mission-critical to the brand. It doesn't work for a 60-rider regional gravel race with a £40 entry fee.",
          },
          {
            kind: "callout",
            text: "This is the structural reason 95% of bike races have never had live tracking. It isn't audience — the audience for a regional race is just as keen to watch as the audience for Tour Divide. It's that £50 per rider in tracking costs eats the entire entry-fee margin.",
          },
        ],
      },
      {
        h2: "What phone-first GPS tracking does differently",
        blocks: [
          {
            kind: "p",
            text: "Phone-first platforms replace the dedicated hardware with the smartphone every rider already has. The same GPS chip, the same offline-tolerant background-location API, the same satellite positioning — just inside a device that costs the organiser zero to deploy and zero to recover.",
          },
          {
            kind: "p",
            text: "What changed between 2010 and 2026 that made this viable:",
          },
          {
            kind: "ul",
            items: [
              "Smartphone GPS chips became as accurate as dedicated trackers (often more accurate, since they fuse GPS + GLONASS + Galileo + BeiDou constellations).",
              "Background-location APIs on iOS and Android became reliable — Apple's CoreLocation and Android's FusedLocationProvider give native apps disciplined, battery-efficient background tracking for hours at a time.",
              "Phone battery life caught up; a modern rider phone with airplane mode + cellular-data-only + dimmed screen will hold tracking for 12+ hours on a single charge, and battery packs handle anything longer.",
              "Cellular coverage in the European gravel + road racing terrain expanded enough that the average race route now has 80–95% coverage. The remaining gaps are handled by on-device queueing.",
              "Native offline-queue libraries (Aster runs on Transistor BackgroundGeolocation) survive app kills, phone restarts, and OEM-aggressive background-process killing.",
            ],
          },
          {
            kind: "p",
            text: "The result: phone-first tracking is now reliable enough for serious racing, while keeping the marginal cost per rider effectively zero.",
          },
        ],
      },
      {
        h2: "Where each one is still the right choice",
        blocks: [
          {
            kind: "h3",
            text: "Hardware satellite trackers are still right when:",
          },
          {
            kind: "ul",
            items: [
              "The race goes through long stretches with literally no cellular coverage — the Continental Divide, the Iditarod Trail Invitational, the Atlas Mountain Race deep desert sections.",
              "Riders are expected to be off-grid for 12+ hours in a single push, longer than a phone battery + power bank can comfortably cover.",
              "The audience expectation for the marquee event is hardware-grade reliability (a single missed ping makes the front page of CyclingTips).",
              "The race already has the operational infrastructure for tracker shipping + recovery, and the entry-fee economics support a £100+ per-rider tracking budget.",
            ],
          },
          {
            kind: "h3",
            text: "Phone-first is the right choice when:",
          },
          {
            kind: "ul",
            items: [
              "The route has reasonable cellular coverage (most road, gravel, and XC mountain bike racing in Europe and North America).",
              "The race is anything other than a multi-day ultra — daily-format events, stage races, time trials, group rides, fondos, regional and club racing.",
              "The organiser is allergic to the per-rider hardware cost or doesn't have the logistics capacity for tracker shipping and recovery.",
              "The audience experience matters as much as the raw tracking — the watcher map, leaderboard, gaps, ETAs, SOS visibility are all richer on a platform built native for phones.",
            ],
          },
        ],
      },
      {
        h2: "The honest hybrid case",
        blocks: [
          {
            kind: "p",
            text: "A serious bikepacking ultra in 2026 should probably run both. Hardware trackers for the leaders and any rider explicitly going through known dead zones for hours at a time; phone tracking for everyone else and as a backup layer for the lead group. Both surfaces feed the same watcher map, and the rider's profile shows whichever ping was most recent.",
          },
          {
            kind: "p",
            text: "For everything outside the marquee ultras — the regional race, the club championship, the Tuesday-night chaingang, the 95% of the market that has never had tracking — phone-first is the only economics that makes the format viable at all.",
          },
        ],
      },
    ],
    ctaHeading: "Try phone-first tracking on your next race.",
    ctaBody:
      "Aster is a phone-first live race-tracking platform built for the 95% of races that have never had live tracking. No hardware to ship; no per-rider fees on the watch link.",
    ctaPrimaryLabel: "For race organisers",
    ctaPrimaryHref: "/for-organisers",
    ctaSecondaryLabel: "Aster vs Trackleaders",
    ctaSecondaryHref: "/vs/trackleaders",
  },

  // ───────────────────────────────────────────────────────────────
  // 3. Organiser setup guide
  // ───────────────────────────────────────────────────────────────
  {
    slug: "organiser-live-tracking-setup-guide",
    title: "How to set up live tracking for your first bike race",
    summary:
      "A practical, step-by-step checklist for race organisers setting up live GPS tracking for the first time. Course preparation, rider onboarding, watcher-link communications, race-day operations.",
    category: "For organisers",
    author: "James Vickers",
    datePublished: "2026-05-22",
    readingTimeMinutes: 11,
    heroKicker: "For organisers",
    heroSubhead:
      "If you've never run live tracking on a race before, the operational side can feel daunting. It isn't. Here's the exact checklist — start to finish — for getting a first race tracked.",
    sections: [
      {
        h2: "Six weeks out: confirm the route and the start",
        blocks: [
          {
            kind: "p",
            text: "The first thing to lock down isn't a tracking platform — it's the GPX file. Live tracking is only as good as the route data you give it: the platform needs to know where the road is supposed to go so it can detect off-route riders, calculate route progress, position the finish-line geofence, and snap GPS pings to the line for clean polylines.",
          },
          {
            kind: "ul",
            items: [
              "Pin the final route at least four weeks before race day. Late route changes break rider device pre-downloads.",
              "Export a clean GPX from RideWithGPS, Komoot, or Strava — single track, no detours or scribbles.",
              "Confirm the start-line latitude/longitude (you'll use this for offline-start support) and the finish-line latitude/longitude + radius (typically 50 metres).",
              "Sanity-check cellular coverage along the route — a quick way is to look at a heat-map from your network provider, or pre-ride with a phone and note dead zones.",
            ],
          },
          {
            kind: "p",
            text: "If the route has long dead-zone sections (more than 30 minutes of riding between cell coverage), brief riders in advance that their live position will pause during those sections and backfill on the other side. This pre-empts the inevitable \"my friend's dot isn't moving\" panic messages.",
          },
        ],
      },
      {
        h2: "Four weeks out: create the event in the platform",
        blocks: [
          {
            kind: "p",
            text: "Set up the event in whatever tracking platform you've chosen. On Aster the process takes about 15 minutes:",
          },
          {
            kind: "ol",
            items: [
              "Sign in as an organiser, create the event.",
              "Upload the GPX file. The platform will derive the route polyline, elevation profile, and bounding box automatically.",
              "Confirm the finish-line geofence — usually the platform suggests a 50 m radius at the GPX end point; widen if your finish line is a long arch.",
              "Set the off-route alert threshold — 100 m default works for road and gravel; widen to 200 m for technical mountain bike courses where riders may legitimately deviate.",
              "Set categories (Pro Men, Pro Women, Open, Masters) if you're running a categorised race.",
              "If the race has a hard cutoff, set the cutoff time and decide whether late riders are DNF or marked finished.",
            ],
          },
        ],
      },
      {
        h2: "Three weeks out: rider communications",
        blocks: [
          {
            kind: "p",
            text: "This is where most first-time tracked events stumble. Riders need to install the tracking app, sign in, and register for the event — and they need to do it before they get to the start line, ideally before they leave home. Last-minute install in the start village at 6 am while the wifi struggles is a recipe for missed riders.",
          },
          {
            kind: "p",
            text: "What to send riders three weeks out:",
          },
          {
            kind: "ul",
            items: [
              'A short email (200 words max) explaining: that the race is live-tracked, the app to install, the link to register for this specific event, and a one-line note that "if you can\'t get signal at the start line, the app will still work — just hit Start and your ride will sync when you find signal".',
              "A QR code in the same email pointing to the event-registration deep link, so riders on a phone can scan rather than copy-paste.",
              "A one-line technical note that the app uses background GPS and they should keep the app installed and signed in through race day. They do not need to keep the app open.",
            ],
          },
          {
            kind: "p",
            text: "Send a reminder email five days out, with the same QR code. Some riders will only act on the second email.",
          },
        ],
      },
      {
        h2: "One week out: watcher-link communications",
        blocks: [
          {
            kind: "p",
            text: "The watcher-link push is separate from the rider-app push and lands a different audience: friends, family, sponsors, partners, the cycling media. It's also the single highest-leverage thing you can do for the event's public profile — every share of a working watcher link generates dot-watching traffic, which is some of the most engaged audience time the cycling internet has.",
          },
          {
            kind: "p",
            text: "What to push:",
          },
          {
            kind: "ul",
            items: [
              'A short post on your event\'s Instagram + Facebook + Twitter the week before, with the watch-link URL. Use a phrase that signals what the link is — "Follow the race live on race day" beats "live tracking link" for click-through.',
              "An email to your race's full mailing list (including past entrants, sponsors, suppliers) with the same link.",
              "If you have brand partners, send them the watch link with a note that they're welcome to repost — most brands will, because it's interesting content their audience hasn't seen from them.",
              "Brief your race-day media team (photographers, videographers, social) that the watch link exists — they'll often share it in real time during the race as part of the rolling coverage.",
            ],
          },
        ],
      },
      {
        h2: "Race day morning: dry-run + final checks",
        blocks: [
          {
            kind: "p",
            text: "About 90 minutes before the start, do a single end-to-end test. Open the organiser dashboard on a laptop, open the watch link on a phone, and have one staff member start tracking on their phone (as a registered test participant if your platform supports it, or just as a free-ride session if it doesn't).",
          },
          {
            kind: "p",
            text: "Confirm that:",
          },
          {
            kind: "ul",
            items: [
              "The test rider appears on the dashboard with a recent ping.",
              "The watch link shows the test rider on the map.",
              "The leaderboard updates as the test rider moves.",
              "You can send a test SOS from the rider phone and see it on the organiser dashboard within 10 seconds.",
            ],
          },
          {
            kind: "p",
            text: "If any of those four checks fails, you have time to escalate to the platform's support channel before riders start dropping in. If they all pass, you're ready.",
          },
        ],
      },
      {
        h2: "During the race: who watches what",
        blocks: [
          {
            kind: "p",
            text: "The organiser dashboard is the safety surface. Someone — race director, safety officer, or a dedicated dashboard watcher — should have the dashboard open with sound on for the entire race. SOS alerts and off-route alerts are the highest-priority signal; everything else is informational.",
          },
          {
            kind: "p",
            text: 'The watch link is the audience surface. It runs itself; you don\'t need to touch it. The only thing the organiser team needs to do during the race for the audience side is post the occasional update to the event feed ("Lead group through CP2, 35 km to go, gap is 4 minutes") — those feed posts show up to every watcher and turn the watch-link audience from passive dot-watchers into engaged readers.',
          },
        ],
      },
      {
        h2: "After the race: the long tail",
        blocks: [
          {
            kind: "p",
            text: "Live tracking generates a permanent record. Every rider has a polyline of their ride, a finish time, a moving time, an elevation profile, lap splits — the kind of post-race detail riders previously only got from their Garmin head unit.",
          },
          {
            kind: "p",
            text: "The half-day after a race is when the audience is hottest: friends are still talking about it, sponsors are still pushing content, riders are still riding the post-finish high. Push the recap post within 24 hours — link the watch page, embed a rider quote or two, tag the brand partners. The same watch link that was live on race day becomes the durable destination for the event for the rest of the year.",
          },
        ],
      },
    ],
    ctaHeading: "Run your race on Aster.",
    ctaBody:
      "Phone-first GPS live tracking, built for the 95% of races that have never had tracking. 30-minute call to walk through your event and what setup looks like.",
    ctaPrimaryLabel: "For race organisers",
    ctaPrimaryHref: "/for-organisers",
    ctaSecondaryLabel: "See pricing",
    ctaSecondaryHref: "/pricing",
  },

  // ───────────────────────────────────────────────────────────────
  // 4. Bikepacking + ultra live tracking primer
  // ───────────────────────────────────────────────────────────────
  {
    slug: "bikepacking-ultra-live-tracking",
    title: "Live tracking for bikepacking + ultra-distance races",
    summary:
      "The audience for ultra-distance bikepacking races built dot-watching from nothing. Here's how live tracking works for self-supported ultras specifically — what's different about the rider, the route, and the audience compared to a one-day road race.",
    category: "For ultras",
    author: "James Vickers",
    datePublished: "2026-05-22",
    readingTimeMinutes: 8,
    heroKicker: "For ultras",
    heroSubhead:
      "Bikepacking and ultra-distance racing built the live-tracking audience as a category. The riders, the routes, and the audience expectation are all different from a one-day road race. Here's how each constraint shapes the platform choice.",
    sections: [
      {
        h2: "Why ultras built dot-watching",
        blocks: [
          {
            kind: "p",
            text: "Live race tracking as a public-audience product didn't start with road racing or mountain biking — it started with ultra-distance bikepacking. Tour Divide (4,400 km Banff to Mexico, racing the Continental Divide route) put trackers on its first field around 2009. Trans Am (6,800 km Astoria to Yorktown) followed. By 2015 the marquee bikepacking calendar — Atlas Mountain Race, Silk Road Mountain Race, Indian Pacific Wheel Race, Iditarod Trail Invitational — had standardised on live tracking as a defining feature.",
          },
          {
            kind: "p",
            text: "Ultras built the audience because the format invited it. A road race finishes in five hours; the live audience window is short and most spectators want to be there in person anyway. An ultra finishes in two to four weeks; the audience window is long, the riders are spread across continents, and almost none of the audience can be there physically. The watch page IS the race for everyone except the riders themselves.",
          },
          {
            kind: "callout",
            text: "Dot watching as a verb predates phone-first tracking — it came out of a watch-page-on-a-laptop era when the dot literally was the entire ride from the audience's point of view. The visceral simplicity of a dot moving across a continent over weeks is what made it a category.",
          },
        ],
      },
      {
        h2: "What's different about an ultra rider",
        blocks: [
          {
            kind: "p",
            text: "An ultra rider's tracking constraints are unlike any other cycling discipline:",
          },
          {
            kind: "ul",
            items: [
              "The rider may be in true wilderness for days at a time — the Continental Divide, the Atlas Mountain interior, the Iditarod Trail in winter. Cellular coverage is patchy at best and absent for stretches measured in days, not hours.",
              "Battery life and charging strategy is a core part of race planning. The rider's phone is one of multiple battery-dependent devices (head unit, lights, dynamo cache) sharing a fixed daily charge budget from a hub dynamo or solar panel.",
              "The tracker is left on continuously for weeks. A 15-hour daily race-day is a short ride; sleep is taken at the side of the road and the tracker keeps running.",
              'The audience appetite for granularity is extreme. Watchers refresh every few minutes for weeks. A single missed ping triggers "is X OK?" forum threads.',
            ],
          },
          {
            kind: "p",
            text: "Hardware satellite trackers (Spot Gen 4, Garmin inReach Mini 2, Zoleo) became the default for these races for a reason — they solve the wilderness-coverage and battery-life problems in ways no phone-based solution could in 2010 or 2015.",
          },
        ],
      },
      {
        h2: "Where phone-first tracking is now viable for ultras",
        blocks: [
          {
            kind: "p",
            text: 'Phone-based tracking has caught up enough that the ultra-tracking question isn\'t "phone OR satellite" anymore — it\'s "which combination, for which event":',
          },
          {
            kind: "ul",
            items: [
              "Phone-first works for ultras held in regions with 80%+ cellular coverage on the route — most European bikepacking, most US east-coast and west-coast routes outside true wilderness, Australia's coastal stretches.",
              "Phone-first as the primary tracker, with the rider carrying a satellite messenger as a private SOS device for the gaps, is a viable cost-reduction for ultras with mixed-coverage routes.",
              "Pure satellite is still the right call for the marquee wilderness ultras — Tour Divide, Iditarod, Atlas Mountain Race deep desert stages — where multi-day gaps between cell coverage are the norm.",
            ],
          },
          {
            kind: "p",
            text: "On Aster specifically, the offline-tolerance is the feature that makes ultras viable: the phone's GPS chip records every position to an on-device SQLite queue for up to seven days; the queue drains the moment cell signal returns and backfills the polyline. A rider going through a 48-hour dead-zone re-appears on the map with the full ride visible, not just the moment they re-emerged.",
          },
        ],
      },
      {
        h2: "What the ultra audience actually watches",
        blocks: [
          {
            kind: "p",
            text: "The watch experience an ultra audience wants is different from the road-race audience. A road-race watcher wants the leaderboard and the live map for five hours and then they're done. An ultra watcher comes back daily for three weeks. What sustains them is different:",
          },
          {
            kind: "ul",
            items: [
              "Daily mileage and elevation, rider-by-rider, so the audience can see who pushed hard yesterday and who took an unscheduled rest.",
              'Stoppage time visibility — how long each rider has been at their current location, so the audience can read "sleeping" vs "mechanical" vs "hold-up".',
              "Cumulative ETA to the next checkpoint or the finish, recalculated as the rider's pace changes through the race.",
              "Rider-side commentary — short voice notes or text dispatches from the riders themselves at re-supply stops, surfaced into the watcher feed.",
              "Editorial layer — DotWatcher-style daily race reports synthesised from the rider movement plus the rider commentary plus social media. Most ultras outsource this today; the platform that builds it in-house wins the audience attention.",
            ],
          },
        ],
      },
      {
        h2: "What this means for an ultra organiser deciding",
        blocks: [
          {
            kind: "p",
            text: "If you're organising a bikepacking ultra and deciding on a tracking approach for 2026 or 2027, the right framing is:",
          },
          {
            kind: "ol",
            items: [
              "Audit your route for cellular coverage. Pre-ride with a phone and a coverage-mapping app, or pull network-provider heat-maps. Calculate the longest single dead-zone gap.",
              "If the longest gap is under 12 hours and you have realistic 80%+ coverage along the route, phone-first tracking handles the job — the queueing fills the gaps and the per-rider cost drops to zero.",
              "If the longest gap is 24-48 hours but most of the route has coverage, run phone-first as the public-audience tracker and let riders carry a satellite messenger as their private SOS device. Total per-rider hardware cost stays under £100.",
              "If the route includes multi-day wilderness sections (Tour Divide, Iditarod, deep desert ultras), satellite remains the right primary surface and phone tracking is a complementary layer in the covered sections.",
            ],
          },
          {
            kind: "p",
            text: "Aster handles the first two cases natively. For the third — the marquee wilderness ultras — the right platform is still a hardware-based tracker; Aster could play a complementary role on the covered sections of the same race but isn't the primary tool there yet.",
          },
        ],
      },
    ],
    ctaHeading: "Bikepacking your first ultra in 2027?",
    ctaBody:
      "Aster is built for the format-defining wave of European and US gravel ultras that have cellular coverage on most of the route. 30-minute call to talk through your event.",
    ctaPrimaryLabel: "For race organisers",
    ctaPrimaryHref: "/for-organisers",
    ctaSecondaryLabel: "Phone vs hardware comparison",
    ctaSecondaryHref: "/resources/phone-first-vs-hardware-trackers",
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Format an ISO YYYY-MM-DD date for display (British English). */
export function formatArticleDate(
  iso: string,
  opts: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  },
): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    ...opts,
    timeZone: "UTC",
  });
}
