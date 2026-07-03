/* FooterMap — watermarked elevation profile behind the footer.
 *
 * Not another map (the hero already is one): this is the OTHER iconic race
 * graphic — the climb profile. Three layered hill silhouettes recede into
 * the dark, the front ridge traced by a lime profile line with a soft
 * gradient fill, over faint distance gridlines. Watermark-level contrast:
 * the link columns stay the foreground. Decorative (aria-hidden), vector.
 */
export default function FooterMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        {/* front-profile fill: lime fading out downward, like the app's climb graph */}
        <linearGradient id="footer-hill-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C7F542" stopOpacity="0.22" />
          <stop offset="0.55" stopColor="#C7F542" stopOpacity="0.07" />
          <stop offset="1" stopColor="#C7F542" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="footer-hill-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#75D6C8" stopOpacity="0.14" />
          <stop offset="1" stopColor="#75D6C8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="footer-hill-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8FA982" stopOpacity="0.1" />
          <stop offset="1" stopColor="#8FA982" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ---- distance gridlines (faint verticals, profile-graph furniture) ---- */}
      <g stroke="#8FA982" strokeWidth="1" opacity="0.1">
        {[180, 360, 540, 720, 900, 1080, 1260].map((x) => (
          <line key={x} x1={x} y1="40" x2={x} y2="420" />
        ))}
      </g>

      {/* ---- back range (highest, faintest) ---- */}
      <path
        d="M -20 420 L -20 190 L 120 130 L 260 205 L 420 90 L 560 180 L 700 60 L 850 170 L 1000 85 L 1150 190 L 1300 110 L 1460 200 L 1460 420 Z"
        fill="url(#footer-hill-back)"
      />
      <path
        d="M -20 190 L 120 130 L 260 205 L 420 90 L 560 180 L 700 60 L 850 170 L 1000 85 L 1150 190 L 1300 110 L 1460 200"
        fill="none"
        stroke="#8FA982"
        strokeWidth="1.5"
        opacity="0.18"
      />

      {/* ---- mid range (teal) ---- */}
      <path
        d="M -20 420 L -20 265 L 150 215 L 320 285 L 500 175 L 660 260 L 840 150 L 1010 245 L 1180 180 L 1340 265 L 1460 225 L 1460 420 Z"
        fill="url(#footer-hill-mid)"
      />
      <path
        d="M -20 265 L 150 215 L 320 285 L 500 175 L 660 260 L 840 150 L 1010 245 L 1180 180 L 1340 265 L 1460 225"
        fill="none"
        stroke="#75D6C8"
        strokeWidth="1.5"
        opacity="0.22"
      />

      {/* ---- front profile (the lime ridge — the graph itself) ---- */}
      <path
        d="M -20 420 L -20 345 L 130 320 L 300 355 L 470 265 L 620 330 L 790 230 L 950 315 L 1120 260 L 1290 340 L 1460 295 L 1460 420 Z"
        fill="url(#footer-hill-front)"
      />
      <path
        d="M -20 345 L 130 320 L 300 355 L 470 265 L 620 330 L 790 230 L 950 315 L 1120 260 L 1290 340 L 1460 295"
        fill="none"
        stroke="#C7F542"
        strokeWidth="2.5"
        strokeLinejoin="round"
        opacity="0.4"
      />
      {/* summit markers on the front profile's two biggest tops */}
      {[
        [790, 230],
        [1120, 260],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="4.5" fill="#C7F542" opacity="0.45" />
      ))}
    </svg>
  );
}
