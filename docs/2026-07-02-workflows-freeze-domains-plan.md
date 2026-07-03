# Plan: per-user workflows · frozen-until-paid · domain swap · info-page ports

**Date:** 2026-07-02 · **Status:** scoped, awaiting founder go
**Repos:** `aster-website` (site) + `watch-the-dot-` (app/backend — "main repo")

The four founder goals, one plan. Ordered so each phase ships value alone.

---

## 0. Grounding facts (audited today)

- **Payment UI already exists** on the club branch (`overnight/m6-crm`, deployed to staging):
  `TeamProfile.tsx` → `paymentsApi.clubCheckout(team.id, plan)` (Stripe Checkout, £ club sub);
  `ManageEvent.tsx` → "Pay & publish" CTA driven by a **402 `event_fee_required`** from the
  publish gate; backend `routes/payments.ts` + `services/payments.ts` (checkout, webhook,
  portal) are live code. *This is the founder's "mock-up payment page" — it's real, it needs
  modifying, not building.*
- **The publish gate is the seed of "private until paid":** today an unpaid paid-band event
  simply refuses to flip `status='live'`. The founder model refines this into "create fully,
  see everything, but frozen to the public until paid".
- **Admin comps already exist** (`fee_comped_at`, `club_comped_at`, admin panel actions) —
  the freeze must respect comps as paid.
- **Info pages on the current site** (all in the PWA SPA, all at astertrack.app):
  `/faq /pricing /about /contact /glossary /press /smugglers /selected /battery-use
  /changelog /resources /resources/:slug /versus` (+ `/for-*` pages already superseded).
- **Demo event:** prod has `aster-demo-event` (status: upcoming, empty). The staging
  simulator (`sim:race`) exists; prod has no simulator loop.
- **CORS** (`backend/src/lib/cors.ts`) allowlists exact hosts + `*.vercel.app`;
  **Stripe redirect URLs** derive from `FRONTEND_URL` env; **share links** derive from
  `lib/appUrls.ts`; **Android APK** declares app-links for the current domain
  (assetlinks.json served from the web domain).

---

## Phase 1 — Website: per-user workflows (site repo only, ~1 day)

### 1a. Athletes → goal: install the app
- Every athlete CTA converges on **one `/get-the-app` route** (site): detects platform →
  Android: APK/Play link; iOS: PWA install explainer (until App Store);
  desktop: QR code + `app.astertrack.app` link. Add `appLinks.install`.
- Homepage hero primary CTA becomes **"Get the app — free"**; `/for-athletes`,
  `/cycling`, `/running` final CTAs likewise. UTM-tag every install CTA
  (`?utm_source=site&utm_content=<page>`) so funnel metric #1 (installs by page) exists
  from day one.

### 1b. Watchers → goal: experience following a live event
- `/for-watchers` gets a **"Live right now" module at the top** (server component reusing
  `lib/events.ts`, revalidate 60s): live events as cards → deep-link straight into the
  spectator view.
- **Empty-state → demo event**: if zero live events, the module shows one "Watch the demo
  race" card instead. Requires a **permanent demo event** (see 1d) — until it exists, the
  fallback links to the most recent *finished* event's replay.
- Same module embedded (smaller) on the homepage watcher band.

### 1c. Clubs + organisers → goal: pay a subscription
- Website never takes money — it routes into the app's existing Stripe surfaces:
  - `/clubs` CTA → app club page → **club checkout** (exists).
  - `/for-organisers` CTA → app create-event → **Pay & publish** (exists).
- Site `/pricing` page (new): event bands + club bands rendered from `lib/pricing.ts`
  — pending the founder's publish-vs-concierge decision; page is built either way, with
  numbers or "talk to us" per decision.

### 1d. Permanent demo event (main repo, small)
- Seed **"Aster Demo Ride"** in prod (public, real course, real-sounding rider names) +
  a scheduled loop of the existing simulator against it (cron: one 20-min race every N
  hours, off-peak safe). Watchers page + organiser "see it live" CTAs all point here.
  *Effort: seed script reuse + one cron job. The sim already refuses prod DB writes via
  its guard — needs a deliberate prod-mode flag + review of Rule-4/6 safety (sim riders
  only, isolated event).*

---

## Phase 2 — Frozen-until-paid (main repo: backend + app, ~3–4 days)

**Model (founder):** anyone can create an event free and see everything — map, branding,
sponsor slots — but the event is **private until paid**. Account-level freeze: inactive
account ⇒ events frozen (nobody can join) and forums frozen (nobody can post). **Old data
is never blocked.**

### 2a. Semantics — one derived state, not scattered booleans
Introduce a single server-side helper `entitlementState(entity)` → `active | frozen`:
- **Event**: frozen ⇔ its band requires payment AND `fee_paid_at IS NULL` (comp counts as
  paid — `COALESCE(fee_paid_at, fee_comped_at)`). No new column needed for the basic case.
- **Club/team**: frozen ⇔ `club_tier='club'` machinery says subscription not active
  (status not in `active/past_due-grace`) AND not comped.
- **Account-level override (new):** `users.account_frozen_at timestamptz` (additive
  migration) — an admin/billing switch that freezes *everything the user organises*
  regardless of per-entity state. Surfaced in the admin panel (new action + audit row).

### 2b. Enforcement points (each = one guard + one test)
| Surface | Frozen behaviour |
|---|---|
| Event publish (`PATCH status='live'`) | Already gated (402) — keep |
| **Event visibility** | Frozen event is forced `privacy='private'` in every public read (list, slug, discovery, search) — owner + invited admins still see it fully (the "see what it looks like" promise) |
| **Join/registration** (`registration.ts` + join routes) | Refuse with a clear typed error (`event_frozen`) — nobody can join |
| Invitations | Creating invites allowed (owner prepping), accepting blocked while frozen |
| **Forum/feed posts** (event feed, club feed, comments) | POST blocked with `forum_frozen`; **reads always allowed** (old data promise) |
| Club rides (recurring) | New RSVPs blocked; existing history readable |
| Pings/tracking | **Untouched** — a frozen event has no participants beyond the owner; Rules 1–4 never touched by construction |
| Admin panel | Freeze/unfreeze visible on entity pages; comp actions already unfreeze |

**What we do NOT do:** delete anything, hide historical rides/results/feeds, log anyone
out, or end any ride (Rules 2/3). Freeze is forward-blocking only.

### 2c. Owner experience ("see it before you pay")
- Owner opens their frozen event: full map, route, sponsor slots, branding — with a
  persistent banner: *"This event is private until you activate it — [Pay & publish]"*
  (reuses the existing 402→checkout flow).
- The existing `ManageEvent` pay step gets promoted into this banner + a preview watermark
  on the spectator view ("PREVIEW — not yet live").

### 2d. Migration + tests
- Migration (next free number, verify ≥130): `users.account_frozen_at` + partial index;
  additive/idempotent per house pattern.
- Vitest per enforcement row (mock-query pattern), incl. "frozen event invisible to anon
  but fully visible to owner" and "comp unfreezes".

---

## Phase 3 — Domain swap: site → `astertrack.app`, app → `app.astertrack.app` (~1 day + DNS/propagation)

*Supersedes the earlier site.astertracking.app decision.*

### 3a. Vercel moves (order matters — do in one sitting, off-peak)
1. Add `app.astertrack.app` to the **PWA** project; deploy; verify.
2. Update backend envs (Railway prod): `FRONTEND_URL=https://app.astertrack.app`
   (drives Stripe success/cancel URLs + share links via `appUrls`).
3. Supabase Auth: add `app.astertrack.app` to redirect allowlist BEFORE the switch;
   remove apex later.
4. CORS (`lib/cors.ts`): add `app.astertrack.app` + keep apex during transition.
5. Move apex `astertrack.app` from the PWA project to the **website** project.
6. Website `lib/links.ts`: one-file change → all deep links point at `app.astertrack.app`.

### 3b. Redirects (the wild-link inventory)
Old links in the wild all hit the apex. After the swap the **website** owns the apex, so it
must 301 app-bound paths → `app.astertrack.app`:
- `/events/:slug`, `/e/:code?`, `/watch/:code`, `/ride/watch/:code`, `/rides/:id/replay`,
  `/login`, `/signup`, `/teams/*`, `/organizer*`, `/profile`, `/d/:slug` (decks), `/u/*`
  — implement as `vercel.json` redirects on the site project (audit `App.tsx` route table
  for the complete list; anything not an info page 301s).
- Info pages (Phase 4) intentionally do NOT redirect — they now live on the site.
- **Android app-links:** serve `/.well-known/assetlinks.json` from BOTH the apex (site
  project) and app subdomain during transition; APK association update in the next release.
- Email templates (Resend/Supabase): audit for hardcoded apex URLs → point at app subdomain.
- Post-swap checks: Stripe webhook unaffected (Railway URL), Search Console re-verify,
  sitemap split (site sitemap at apex; app noindexed except spectator pages — decide).

### 3c. Rollback
The apex domain re-attach to the PWA project is a 2-minute Vercel operation; CORS/auth
allowlists keep both hosts through the transition window, so rollback is non-destructive.

## Phase 4 — Info-page ports (site repo, ~1–2 days, parallelisable)

Port each SPA info page into the Next template **at the identical path** so every existing
URL keeps working natively at the apex (no redirect needed):
`/faq · /pricing · /about · /contact · /glossary · /press · /smugglers · /selected ·
/battery-use · /changelog · /resources · /resources/:slug · /versus`
- Content lifted from the PWA components (they're mostly static JSX + data arrays — a
  mechanical port into `Section`/`Card`/`PhotoStrip` template).
- Event info pages (`/smugglers`, `/selected`) keep their event-specific art; add the
  live-event module so they double as watcher funnels on race day.
- The PWA's copies are then deleted and `app.astertrack.app/<info-path>` 301s back to the
  apex (one redirect map in the PWA's `vercel.json`).
- SEO: `metadata` + canonical per page; sitemap.xml on the site.

---

## Sequencing & effort

| Phase | Where | Effort | Depends on |
|---|---|---|---|
| 1a–1c website workflows | site | ~1 day | nothing |
| 1d demo event + cron | main repo | ~0.5 day | prod-sim safety review |
| 2 frozen-until-paid | main repo | 3–4 days | club branch merged (m6-crm line) |
| 3 domain swap | both + DNS | ~1 day, one sitting | founder DNS access; do BEFORE heavy SEO |
| 4 info-page ports | site | 1–2 days | none (before phase 3 ideally, so apex swap is seamless) |

**Recommended order: 4 → 1 → 3 → 2.** (Port pages first so the apex swap loses zero URLs;
website workflows next; swap domains; then the product freeze work on the main repo.)

## Open questions for the founder
1. **Pricing page**: publish the band tables at launch, or "talk to us"? (Blocks 1c page copy only.)
2. Frozen-event **owner preview watermark** — required, or is the banner enough?
3. Demo event: run the simulator **on prod** on a schedule (recommended: isolated demo
   event, off-peak) — comfortable with that?
4. APK app-links re-association needs a release — bundle with the next APK anyway?
