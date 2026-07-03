# PROMPT: Systematic knowledge-base refresh (paste into agent)

You are updating the Aster help centre — the Jekyll knowledge base (Just the Docs theme)
published at https://github.com/mk-162/aster-knowledgebase/ and developed in the
`knowledge-base/` directory of the main repo `/home/minigeek/projects/watch-the-dot-`.
The content is OLD: the product, positioning, pricing model, and website have all changed
since it was written. Your job is a full, systematic sweep — audit every article against
the CURRENT offering, update every section, and substantially expand **Teams & Clubs**,
which will carry the heaviest support load. Include ALL functionality.

## Ground truth — in order of authority (later never overrides earlier)

1. **The code** — `/home/minigeek/projects/watch-the-dot-` (frontend `src/pages` +
   `src/App.tsx` route table, backend `src/routes/*`). If the KB says a feature works one
   way and the code says another, the code wins. The club/CRM feature set lives on the
   `overnight/m6-crm` line (checked out at `/home/minigeek/projects/wtd-admin`) — use that
   worktree as truth for clubs, subscriptions, and event fees.
2. **The staging app** — https://watchthedot-staging.vercel.app (anonymous spectating
   works without login; use it to verify real flows). Do NOT take screenshots — see rules.
3. **Business model** — `docs/2026-07-01-business-model-final.md` + club spec
   `docs/2026-07-01-club-mvp-spec.md` in the main repo, WITH these founder overrides
   (2026-07-02, newest wins): consumer side is FREE FOREVER (anyone taking part in or
   spectating an event never pays); paid plans are **Group** (clubs, priced by member
   size), **Event Organiser** (a SUBSCRIPTION including N events/month, scalable), and
   **Enterprise** (POA — white glove, dedicated server, extended marketing + sponsorship).
   Exact prices are EXPERIMENTAL (see `lib/pricing.ts` in the marketing site) — in the KB,
   describe the SHAPE of pricing and link to astertrack.app/pricing rather than hardcoding
   numbers. Also scoped (describe as "how it works" only where user-visible today):
   events can be created free and previewed fully but stay private until the plan is
   active; if a plan lapses, joins and new posts pause but nothing is ever deleted and old
   data stays readable.
4. **The new marketing site** — `/home/minigeek/projects/aster-website/site` (Next.js).
   Its pages (/pricing, /clubs, /for-*, /faq, /battery-use, /glossary, /vs/*) are current
   copy; reuse their facts and mirror their positioning. The KB should LINK to them rather
   than duplicate marketing content.
5. **Product rules** — CLAUDE.md in the main repo (Rules 1–6: offline start/finish, never
   auto-logout, tracking persists until explicitly ended, ping bounds, anonymous
   spectating for public/unlisted events, finished-is-frozen). Safety articles must state
   these behaviours accurately — they are promises, not aspirations.

## Positioning rules (non-negotiable)

- The brand story is **TRACKING + SHARING** (plus route distribution and community).
  "Watch the Dot" is dead as a name/identity: fix the site title in `_config.yml`, index
  copy, and every article. "Dot" may appear only as incidental map vocabulary or in the
  glossary-style definition of community terms — never as the product's identity.
- Sport-neutral: cycling AND running are equal citizens ("athletes", "ride or run").
- Voice per `knowledge-base/STYLE-GUIDE.md` + the brand: warm, plain-spoken, BRITISH
  English, headlines end in a period, no emoji, specificity over adjectives, honest about
  limits (battery, dead zones, phone-GPS accuracy).
- Domains: the app is moving to app.astertrack.app with the website at astertrack.app —
  write app links as relative in-app paths ("in the app, open Profile → Privacy") rather
  than hardcoded URLs wherever possible; where a URL is unavoidable use astertrack.app
  for marketing pages and flag app-domain links with `<!-- TODO: confirm app domain -->`.

## Screenshot rule

Do NOT add, capture, or update ANY screenshots — the app UI is about to change. Where an
article needs one, insert the placeholder `{% include screenshot-todo.html slug="..." %}`
(create that include once: a bordered "screenshot coming soon" box) with a one-line
caption describing exactly what the future screenshot must show. Keep existing image
references ONLY if the article text no longer depends on them being current; otherwise
replace with the placeholder. Every placeholder slug goes into a new
`reference/screenshot-shotlist.md` so the whole shot list can be captured in one session
after the UI settles.

## The sweep — work section by section, in this order

For EACH section: (a) list every article; (b) diff each claim against ground truth;
(c) rewrite; (d) note anything you could not verify in a `## Unverified` block at the
bottom of the article as an HTML comment. Sections and known focus points:

1. **getting-started** — install paths (Android APK, iPhone TestFlight, PWA), account
   creation, first track, sharing your first link. Verify install links against the
   marketing site's /smugglers page (current real links).
2. **for-athletes** — start/pause/finish flows, free ride vs event modes, offline
   behaviour (Rule 1/3: offline start ALWAYS works; tracking never self-stops; battery
   guidance consistent with the /battery-use calculator's modes and thresholds).
3. **for-spectators** — anonymous watching (NO login for public/unlisted events — this is
   a product promise), share links, leaderboard, following multiple athletes, the
   5-favourite cap on the persistent follow graph (club membership lifts it).
4. **teams-and-clubs** — REWRITE AND EXPAND (see below).
5. **for-organisers** — event creation (free to create, preview everything, private until
   plan active), event types (race, TT, P2P, group ride, grand depart), start formats
   (mass/gun starts; WAVE starts for running), checkpoints, finish detection, cutoffs,
   sponsor slots, results. Subscription framing per the model above.
6. **social-and-following** — feed, posts, stories, comments, reactions, mentions,
   following; verify each against `backend/src/routes/feed.ts` + `stories.ts`.
7. **notifications** — push categories that actually exist in the code (stoppage,
   milestones, gap changes, SOS alerts…); note watcher-side vs athlete-side.
8. **safety-and-offline** — SOS flow (what it does and does NOT do), crash detection,
   dead zones (offline queue catches up — Rule 4), the honest "aid, not a safety device"
   framing from /terms.
9. **account-and-privacy** — GDPR export/deletion, privacy controls, hide-my-dot rider
   privacy (organiser-enabled, per-rider opt-out), tracking-visibility consents,
   private/unlisted/public/members event privacy levels.
10. **reference** — glossary alignment with the site's /glossary, getting-support
    (contact addresses from the site's /contact), FAQ overlaps (link, don't duplicate).
11. **index.md + _config.yml** — retitle (e.g. "Aster Help Centre"), rewrite the landing
    copy to the tracking+sharing story, ensure nav_order still makes sense with the
    expanded clubs section.

## Teams & Clubs — the deep-dive (this section carries the support load)

Audit the club feature set from the m6-crm worktree code + club-mvp-spec and write
complete task-based articles ("How do I…") covering AT MINIMUM:
- What a club is on Aster; Mates (free, up to 10) vs paid Group plans by member size —
  shape only, link to /pricing for numbers.
- Creating a club; joining (one-tap join/invite); roles (owner/admin/member) and what
  each can do; managing members; the member cap and what happens at the boundary.
- **The route library**: publishing a route once, how it reaches every member's phone,
  updating a route, offline map tiles for the dead zones.
- **Club rides**: creating recurring rides, one-tap RSVP (and its role as the
  affiliation/insurance register), the members-only live map, riding in split groups,
  the ride wrap-up that posts to the club feed.
- **Sharing**: members-only vs public visibility, families following a member's ride via
  share link, the club feed (posts, wrap-ups, announcements), the club sponsor slot.
- **The mates overlay at third-party events** (club members visible to each other at an
  event the club doesn't run).
- **Billing**: subscribing (monthly/annual), what happens when a subscription lapses
  (freeze semantics: no new joins/posts, everything readable, nothing deleted), upgrading
  size band, cancelling. Honest, reassuring tone — the "your data is never hostage"
  promise matters.
- Troubleshooting: common failure modes per flow (member can't see the ride, route not
  downloading, RSVP issues) — derive from how the code actually behaves, not guesses.

## Verification & delivery

- Build the Jekyll site locally (`cd knowledge-base && bundle exec jekyll build` — install
  gems if needed) and fix every warning/broken include.
- Run a link check over the built output (internal anchors + cross-links; external links
  to astertrack.app/* paths must exist on the marketing site — its route list is the
  app/ directory of /home/minigeek/projects/aster-website/site).
- Every article keeps valid Just the Docs front matter (title, parent, nav_order).
- Deliver as a single branch + PR to https://github.com/mk-162/aster-knowledgebase/ (or
  the knowledge-base/ dir of the main repo if that is the publishing source — CHECK which
  one deploys before pushing; if unsure, stop and ask). PR description: per-section
  summary of what changed, the unverified-claims list, and the screenshot shot-list.
- Do not invent features. If you cannot find a feature in code or on staging, it does not
  go in the KB — list it in the PR description as "claimed in old KB, not found".
