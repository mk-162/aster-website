"use client";

/**
 * BatteryCalculator — interactive forecaster for Aster tracking
 * battery life. Slider sets starting battery %, scenario pills
 * switch between auto-fallback (cascade) and locked-to-one-mode
 * scenarios, per-tier bars show standalone durations normalised
 * against the longest tier.
 *
 * Ported from the app's marketing surface (frontend
 * BatteryCalculator.tsx). Numbers source-of-truth is the app's
 * in-code burn rates and demote thresholds (30 / 15 / 8).
 *
 * Pure presentation — no API calls, no global state.
 */

import { useState } from "react";

type ScenarioKey = "auto" | "Live" | "Standard" | "Endurance" | "Ultra";

// Per-mode burn rate (% per hour). Live includes the radio-tail cost
// that pulls it above the GPS-only baseline.
const TIERS = [
  { name: "Live" as const, upper: 100, lower: 30, pctPerHr: 15, blurb: "1 fix/sec · 1–2s lag" },
  { name: "Standard" as const, upper: 30, lower: 15, pctPerHr: 8.5, blurb: "1 fix/2s · 6s lag" },
  { name: "Endurance" as const, upper: 15, lower: 8, pctPerHr: 4.5, blurb: "1 fix/5s · 15s lag" },
  { name: "Ultra" as const, upper: 8, lower: 0, pctPerHr: 4, blurb: "1 fix/15s · 5min lag" },
];

const SCENARIO_PILLS: { key: ScenarioKey; label: string }[] = [
  { key: "auto", label: "Auto" },
  { key: "Live", label: "Live" },
  { key: "Standard", label: "Standard" },
  { key: "Endurance", label: "Endurance" },
  { key: "Ultra", label: "Ultra" },
];

// Pretty-print duration. <1h shows minutes; otherwise "Xh Ym".
function fmt(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export default function BatteryCalculator() {
  const [startingPct, setStartingPct] = useState(100);
  // 'auto' = full ladder; otherwise the rider is locked to one mode
  // for the whole ride and there's no auto-fallback.
  const [scenario, setScenario] = useState<ScenarioKey>("auto");

  // "If you stayed only in this mode" duration — naive startingPct
  // divided by the mode's burn rate. Doesn't account for auto-fallback.
  const standaloneHours = TIERS.map((t) => startingPct / t.pctPerHr);

  // Auto-fallback cascade: starting at startingPct, how many hours
  // does the rider spend in each tier on the way down to 0%?
  const cascadeSegments = TIERS.map((t) => {
    const enterAt = Math.min(startingPct, t.upper);
    const drained = Math.max(0, enterAt - t.lower);
    const hours = drained / t.pctPerHr;
    return { ...t, drained, hours, used: drained > 0 };
  });
  const cascadeTotalHours = cascadeSegments.reduce((sum, s) => sum + s.hours, 0);

  const headlineHours =
    scenario === "auto"
      ? cascadeTotalHours
      : standaloneHours[TIERS.findIndex((t) => t.name === scenario)];
  const headlineLabel =
    scenario === "auto"
      ? "Tracking lasts with auto-fallback"
      : `Tracking lasts locked to ${scenario}`;

  const maxStandalone = Math.max(...standaloneHours);

  return (
    <div className="border-2 border-dark rounded-2xl bg-white shadow-pop-2 p-5 sm:p-7">
      {/* Slider for starting battery */}
      <label className="block text-sm font-medium text-dark/70 mb-2">
        If your battery starts at{" "}
        <span className="text-dark font-bold text-lg tabular-nums">
          {startingPct}%
        </span>
      </label>
      <input
        type="range"
        min={10}
        max={100}
        step={5}
        value={startingPct}
        onChange={(e) => setStartingPct(Number(e.target.value))}
        className="w-full accent-lime-deep cursor-pointer mb-4"
        aria-label="Starting battery percentage"
      />
      <div className="flex justify-between text-xs text-dark/50 -mt-3 mb-5">
        <span>10%</span>
        <span>100%</span>
      </div>

      {/* Scenario pills — "Auto" (cascade) vs each locked-mode option */}
      <p className="text-xs uppercase tracking-wide text-dark/60 mb-2">
        Scenario
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {SCENARIO_PILLS.map(({ key, label }) => {
          const active = scenario === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setScenario(key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
                active
                  ? "bg-dark text-lime border-dark"
                  : "bg-white text-dark/70 border-dark/10 hover:border-dark/30"
              }`}
              aria-pressed={active}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Headline — number swaps based on active scenario */}
      <div className="bg-stone border-2 border-lime-deep rounded-xl p-4 mb-5 text-center">
        <p className="text-xs uppercase tracking-wide text-dark/60 mb-1">
          {headlineLabel}
        </p>
        <p className="font-condensed text-4xl text-dark font-bold tabular-nums m-0">
          {fmt(headlineHours)}
        </p>
      </div>

      {/* Per-tier breakdown */}
      <p className="text-xs uppercase tracking-wide text-dark/60 mb-3">
        If you stayed only in this mode
      </p>
      <div className="space-y-3">
        {TIERS.map((t, i) => {
          const standalone = standaloneHours[i];
          const seg = cascadeSegments[i];
          const widthPct = Math.max(4, (standalone / maxStandalone) * 100);
          const selected = scenario === t.name;
          return (
            <div
              key={t.name}
              className={`rounded-lg p-3 transition-colors ${
                selected ? "bg-lime-bg ring-2 ring-lime-deep" : ""
              }`}
            >
              <div className="flex items-baseline justify-between mb-1 gap-2">
                <div className="min-w-0">
                  <span className="font-semibold text-dark">{t.name}</span>{" "}
                  <span className="text-sm text-dark/60">— {t.blurb}</span>
                </div>
                <span className="text-sm text-dark font-medium tabular-nums whitespace-nowrap">
                  {fmt(standalone)}
                </span>
              </div>
              <div className="relative h-2 bg-dark/10 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-lime-deep rounded-full transition-[width] duration-150"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
              {scenario === "auto" && seg.used && (
                <p className="text-xs text-dark/55 mt-1 m-0">
                  Actually spends{" "}
                  <span className="font-medium">{fmt(seg.hours)}</span> here
                  during the cascade ({Math.round(seg.drained)}% of battery).
                </p>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-dark/55 mt-5 leading-snug m-0">
        Estimates from in-app burn rates. Real consumption varies with signal
        strength, temperature, and other apps. Cell signal is the single
        biggest variable — weak signal can double the drain.
      </p>
    </div>
  );
}
