/* RouteMotif — decorative GPS-trace vector for section backgrounds.
 *
 * A winding route line with a start ring, checkpoint ticks and a finish dot —
 * the product's core visual (a live track) turned into brand texture. Renders
 * absolutely positioned behind section content; aria-hidden, non-interactive.
 *
 *   tone="dark"  → lime/mint strokes at low opacity (for dark sections)
 *   tone="light" → dark strokes at very low opacity (for stone/white sections)
 *   variant      → two path shapes so adjacent sections don't repeat
 *   flip         → mirror horizontally for compositional variety
 */
export default function RouteMotif({
  tone = "dark",
  variant = 1,
  flip = false,
  className = "",
}: {
  tone?: "dark" | "light";
  variant?: 1 | 2;
  flip?: boolean;
  className?: string;
}) {
  const stroke = tone === "dark" ? "var(--lime)" : "var(--dark)";
  const soft = tone === "dark" ? "var(--mint-teal)" : "var(--dark)";
  const opacity = tone === "dark" ? 0.16 : 0.08;

  const d =
    variant === 1
      ? "M -40 520 C 120 480, 180 320, 340 300 S 560 380, 700 300 S 900 80, 1080 140 S 1300 320, 1480 260"
      : "M -40 160 C 140 220, 260 420, 420 400 S 620 220, 800 260 S 1020 460, 1200 420 S 1380 260, 1520 320";

  // checkpoint ticks sit along the path at fixed fractions (approximate points)
  const cps =
    variant === 1
      ? [
          [340, 300],
          [700, 300],
          [1080, 140],
        ]
      : [
          [420, 400],
          [800, 260],
          [1200, 420],
        ];
  const start = variant === 1 ? [-4, 505] : [-4, 172];
  const finish = variant === 1 ? [1440, 265] : [1460, 310];

  return (
    <svg
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${flip ? "-scale-x-100" : ""} ${className}`}
      style={{ opacity }}
    >
      {/* the trace */}
      <path d={d} fill="none" stroke={stroke} strokeWidth={4} strokeLinecap="round" />
      {/* travelled portion, dashed — the "so far" of a live track */}
      <path
        d={d}
        fill="none"
        stroke={soft}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray="2 26"
        strokeDashoffset={8}
      />
      {/* start ring */}
      <circle cx={start[0]} cy={start[1]} r={14} fill="none" stroke={stroke} strokeWidth={4} />
      {/* checkpoints */}
      {cps.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={7} fill={stroke} />
          <circle cx={x} cy={y} r={16} fill="none" stroke={stroke} strokeWidth={2} />
        </g>
      ))}
      {/* finish dot — filled, slightly larger */}
      <circle cx={finish[0]} cy={finish[1]} r={12} fill={stroke} />
    </svg>
  );
}
