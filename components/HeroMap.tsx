/* HeroMap — the homepage hero IS the live map.
 *
 * A full-bleed, brand-styled race map rendered as SVG: dark-olive terrain with
 * contour lines, a sweeping lime route, app-style checkpoint markers, and a
 * strung-out field of rider direction arrows with rank chips — the leader in
 * gold, the chase behind. Pure vector: crisp at any size, no screenshot to
 * re-capture when the app UI changes, and dark enough on the left for the
 * headline to sit on. Decorative (aria-hidden) — the copy carries the meaning.
 */
export default function HeroMap({ className = "" }: { className?: string }) {
  // Rider arrows: position along the route + heading (deg) + rank label.
  const riders: Array<{ x: number; y: number; r: number; label: string; leader?: boolean }> = [
    { x: 1150, y: 208, r: 24, label: "1", leader: true },
    { x: 1042, y: 260, r: 38, label: "2" },
    { x: 968, y: 318, r: 44, label: "3" },
    { x: 906, y: 380, r: 50, label: "4" },
    { x: 748, y: 470, r: 78, label: "7" },
  ];

  return (
    <svg
      viewBox="0 0 1440 780"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      {/* ---- terrain: contour lines + forest patches ---- */}
      <g stroke="#2A3326" strokeWidth="1.5" fill="none" opacity="0.55">
        <path d="M -60 120 C 220 60, 420 170, 660 130 S 1080 40, 1500 110" />
        <path d="M -60 210 C 240 150, 460 260, 700 220 S 1120 130, 1500 200" />
        <path d="M -60 330 C 260 270, 480 380, 720 340 S 1140 250, 1500 320" />
        <path d="M -60 460 C 240 400, 500 510, 760 470 S 1160 380, 1500 450" />
        <path d="M -60 590 C 260 530, 520 640, 780 600 S 1180 510, 1500 580" />
        <path d="M -60 700 C 280 650, 540 750, 800 710 S 1200 630, 1500 690" />
      </g>
      <g fill="#1E2618" opacity="0.8">
        <path d="M 180 560 q 90 -60 190 -10 q 60 30 30 80 q -70 60 -170 20 q -80 -35 -50 -90 Z" />
        <path d="M 1180 560 q 80 -50 170 -6 q 55 28 26 72 q -64 52 -152 18 q -72 -32 -44 -84 Z" />
        <path d="M 560 90 q 80 -44 164 -4 q 52 26 24 66 q -60 48 -144 16 q -68 -30 -44 -78 Z" />
      </g>

      {/* ---- water hint ---- */}
      <path
        d="M 40 690 q 60 -22 120 0 q 40 16 20 38 q -50 26 -110 8 q -50 -18 -30 -46 Z"
        fill="#24413D"
        opacity="0.6"
      />

      {/* ---- readability: darken terrain under the headline (BELOW the race
           layer, so the route + field stay vivid) ---- */}
      <rect width="1440" height="780" fill="url(#hero-fade)" />

      {/* ---- the route: start (bottom-left) → finish (top-right) ---- */}
      <path
        id="hero-route"
        d="M 90 700 C 260 660, 340 560, 470 540 S 700 560, 780 470 S 900 330, 1000 290 S 1160 230, 1240 180"
        fill="none"
        stroke="#C7F542"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* travelled portion — dashed ticks over the ridden section */}
      <path
        d="M 90 700 C 260 660, 340 560, 470 540 S 700 560, 780 470"
        fill="none"
        stroke="#75D6C8"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="2 30"
        opacity="0.9"
      />

      {/* ---- start ring ---- */}
      <circle cx="90" cy="700" r="16" fill="none" stroke="#C7F542" strokeWidth="5" />
      <circle cx="90" cy="700" r="5" fill="#C7F542" />

      {/* ---- checkpoints (app-style: white rounded square + cross) ---- */}
      {[
        [470, 540],
        [1000, 290],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x - 15}, ${y - 15})`}>
          <rect width="30" height="30" rx="8" fill="#FFFFFF" stroke="#181E15" strokeWidth="2.5" />
          <path
            d="M 9 9 L 21 21 M 21 9 L 9 21"
            stroke="#5B5BD6"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* ---- finish dot ---- */}
      <circle cx="1240" cy="180" r="13" fill="#C7F542" stroke="#181E15" strokeWidth="3" />
      <circle cx="1240" cy="180" r="24" fill="none" stroke="#C7F542" strokeWidth="2.5" opacity="0.5" />

      {/* ---- the field: direction arrows + rank chips ---- */}
      {riders.map((p) => (
        <g key={p.label} transform={`translate(${p.x}, ${p.y}) rotate(${p.r})`}>
          {/* arrowhead pointing along heading */}
          <path
            d="M 0 -19 L 13 12 L 0 5 L -13 12 Z"
            fill={p.leader ? "#F2C94C" : "#181E15"}
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
          {/* rank chip, counter-rotated upright */}
          <g transform={`rotate(${-p.r}) translate(16, -22)`}>
            <rect x="-2" y="-13" width="22" height="22" rx="7" fill="#FFFFFF" stroke="#181E15" strokeWidth="2" />
            <text
              x="9"
              y="3.5"
              textAnchor="middle"
              fontFamily="var(--font-condensed)"
              fontWeight="700"
              fontSize="14"
              fill="#181E15"
            >
              {p.label}
            </text>
          </g>
        </g>
      ))}

      {/* ---- gentle fade over the race layer's far-left tail only, so the
           route start doesn't fight the CTAs ---- */}
      <rect width="1440" height="780" fill="url(#hero-fade-race)" />
      <defs>
        <linearGradient id="hero-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#181E15" stopOpacity="0.9" />
          <stop offset="0.42" stopColor="#181E15" stopOpacity="0.65" />
          <stop offset="0.72" stopColor="#181E15" stopOpacity="0.12" />
          <stop offset="1" stopColor="#181E15" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hero-fade-race" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#181E15" stopOpacity="0.72" />
          <stop offset="0.38" stopColor="#181E15" stopOpacity="0.28" />
          <stop offset="0.55" stopColor="#181E15" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
