/** Shared SEO constants — single source of truth for the canonical
 * domain and the JSON-LD entity @ids used across pages. The site lives
 * at the apex domain; the app moves to app.astertrack.app. */

export const SITE_URL = "https://astertrack.app";

/** Entity @ids — MUST match the values used in app/about/page.tsx so
 * the Organization/Person graph merges into single entities. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const FOUNDER_ID = `${SITE_URL}/about#james-vickers`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** A fixed "content last touched" date for sitemap entries that have no
 * per-item frontmatter date. Deliberately NOT new Date() — builds must
 * be deterministic. Bump when doing a meaningful content pass. */
export const SITE_LAST_MODIFIED = "2026-07-02";
