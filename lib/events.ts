/** Fetches public events from the live Aster API for the /discover funnel.
 * Anonymous-readable endpoint (Rule 5: spectating never needs a login).
 * Build-safe: any failure resolves to [] so the marketing site always builds. */

export const ASTER_API_URL =
  process.env.NEXT_PUBLIC_ASTER_API_URL ??
  "https://watch-the-dot-production.up.railway.app";

export type EventStatus = "live" | "upcoming" | "finished";

export type AsterEvent = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  start_time: string;
  timezone: string | null;
  status: EventStatus;
  event_type: string | null;
  privacy: string;
  header_image_url: string | null;
};

const SHOWN_STATUSES: ReadonlySet<string> = new Set([
  "live",
  "upcoming",
  "finished",
]);

const STATUS_RANK: Record<EventStatus, number> = {
  live: 0,
  upcoming: 1,
  finished: 2,
};

const MAX_EVENTS = 48;

/** Public events only, live first, upcoming soonest-first, finished last.
 * Returns [] on any network / shape failure — never throws. */
export async function fetchEvents(): Promise<AsterEvent[]> {
  try {
    const res = await fetch(`${ASTER_API_URL}/api/v1/events`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) return [];
    const data: unknown = await res.json();
    if (!Array.isArray(data)) return [];

    return (data as AsterEvent[])
      .filter(
        (e) =>
          e &&
          typeof e.slug === "string" &&
          typeof e.name === "string" &&
          e.privacy === "public" &&
          SHOWN_STATUSES.has(e.status)
      )
      .sort((a, b) => {
        const rank = STATUS_RANK[a.status] - STATUS_RANK[b.status];
        if (rank !== 0) return rank;
        const ta = Date.parse(a.start_time) || 0;
        const tb = Date.parse(b.start_time) || 0;
        // Upcoming: soonest first. Finished: most recent first. Live: soonest start first.
        return a.status === "finished" ? tb - ta : ta - tb;
      })
      .slice(0, MAX_EVENTS);
  } catch {
    return [];
  }
}
