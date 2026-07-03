"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Button from "@/components/Button";
import { appLinks } from "@/lib/links";
import type { AsterEvent, EventStatus } from "@/lib/events";

type Filter = "all" | EventStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "live", label: "Live now" },
  { key: "upcoming", label: "Upcoming" },
  { key: "finished", label: "Finished" },
];

/** "Sat 14 Mar, 09:00" in the event's own timezone. */
function formatStart(iso: string, timezone: string | null): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone ?? undefined,
    }).format(d);
  } catch {
    // Unknown timezone string — fall back to viewer-local.
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  }
}

function typeLabel(t: string | null): string | null {
  if (!t) return null;
  return t.replace(/[_-]+/g, " ");
}

function StatusBadge({ event }: { event: AsterEvent }) {
  if (event.status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 border-2 border-dark rounded-full bg-lime px-3 py-1 font-condensed uppercase tracking-[0.06em] font-bold text-[12px] text-dark">
        <span aria-hidden className="w-2 h-2 rounded-full bg-dark animate-pulse" />
        Live
      </span>
    );
  }
  if (event.status === "finished") {
    return (
      <span className="inline-flex items-center border-2 border-dark/30 rounded-full bg-white px-3 py-1 font-condensed uppercase tracking-[0.06em] font-semibold text-[12px] text-dark/60">
        Finished
      </span>
    );
  }
  return (
    <span className="font-condensed uppercase tracking-[0.06em] font-semibold text-[13px] text-lime-deep">
      {formatStart(event.start_time, event.timezone)}
    </span>
  );
}

function EventCard({ event }: { event: AsterEvent }) {
  const blurb = event.short_description || event.description || "";
  const tag = typeLabel(event.event_type);

  return (
    <a
      href={appLinks.event(event.slug)}
      className="group flex flex-col overflow-hidden border-2 border-dark rounded-2xl bg-white text-dark shadow-pop-2 transition-[transform,box-shadow] duration-100 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-pop-3"
    >
      {/* Header image / fallback */}
      <div className="relative h-40 border-b-2 border-dark bg-mint">
        {event.header_image_url ? (
          <Image
            src={event.header_image_url}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-stone">
            <span
              aria-hidden
              className="flex items-center justify-center w-16 h-16 rounded-full bg-mint border-2 border-dark font-condensed font-bold uppercase text-3xl text-dark"
            >
              {event.name.trim().charAt(0) || "A"}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-5 grow">
        <div className="flex items-center justify-between gap-3">
          <StatusBadge event={event} />
          {tag && (
            <span className="font-condensed uppercase tracking-[0.08em] font-semibold text-[11px] text-dark/50">
              {tag}
            </span>
          )}
        </div>
        <h3 className="font-condensed uppercase font-bold tracking-[0.01em] leading-tight text-xl text-balance">
          {event.name}
        </h3>
        {blurb && (
          <p className="text-sm leading-normal text-dark/70 line-clamp-2">
            {blurb}
          </p>
        )}
        <span className="mt-auto pt-1 font-condensed uppercase tracking-[0.06em] font-semibold text-[13px] text-lime-deep group-hover:underline">
          {event.status === "live" ? "Watch live →" : "View event →"}
        </span>
      </div>
    </a>
  );
}

/** Client-side browser over the server-fetched events: search + status chips. */
export default function EventsBrowser({ events }: { events: AsterEvent[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const liveCount = useMemo(
    () => events.filter((e) => e.status === "live").length,
    [events]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter(
      (e) =>
        (filter === "all" || e.status === filter) &&
        (!q || e.name.toLowerCase().includes(q))
    );
  }, [events, query, filter]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 h-10 px-4 border-2 border-dark rounded-full font-condensed uppercase tracking-[0.04em] font-semibold text-sm cursor-pointer transition-[transform,box-shadow] duration-100 ${
                  active
                    ? "bg-dark text-mint shadow-pop-sm"
                    : "bg-white text-dark hover:bg-lime-bg"
                }`}
              >
                {f.label}
                {f.key === "live" && liveCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-lime text-dark text-[11px] font-bold">
                    {liveCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events…"
          aria-label="Search events by name"
          className="h-11 w-full sm:w-72 px-4 border-2 border-dark/20 rounded-xl bg-white text-dark text-[15px] placeholder:text-dark/40 focus:outline-none focus:border-lime-deep"
        />
      </div>

      {/* Grid / empty state */}
      {visible.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      ) : (
        <div className="border-2 border-dark rounded-2xl bg-white shadow-pop-2 px-6 py-14 text-center">
          <h3 className="font-condensed uppercase font-bold text-2xl text-dark mb-3">
            {events.length === 0
              ? "Nothing to show just yet."
              : "No events match that."}
          </h3>
          <p className="text-dark/70 max-w-[46ch] mx-auto mb-7">
            {events.length === 0
              ? "We couldn't load events right now — but the app always has the latest. Rides, runs and races go live there first."
              : "Try a different search, or clear the filters — or head into the app for the full picture."}
          </p>
          <Button href={appLinks.discover} variant="primary" size="lg">
            Open the app
          </Button>
        </div>
      )}
    </div>
  );
}
