/* PhotoStrip — the drifting full-bleed photo band ported from the PWA
 * marketing site (frontend/src/components/MarketingLayout.tsx). No captions,
 * no chrome; the slow Ken-Burns horizontal pans (globals.css .photo-drift-1..4)
 * carry the atmosphere. Layout adapts to the image count:
 *
 *  - 1 image:  full-bleed wide band (16:9 → 21:9 → 3:1)
 *  - 2-3:      1-up mobile, side-by-side at md:+
 *  - 4+:       horizontal-snap scroller mobile, 2-up md:, 4-up lg:
 *
 * Use between major sections to break the dark/stone/white rhythm.
 */
import Image from "next/image";

export interface StripImage {
  src: string;
  alt: string;
}

export default function PhotoStrip({
  images,
  bg = "dark",
}: {
  images: StripImage[];
  bg?: "dark" | "stone";
}) {
  if (images.length === 0) return null;
  const bgClass = bg === "dark" ? "bg-dark" : "bg-stone";

  if (images.length === 1) {
    return (
      <section className={`${bgClass} border-y-2 border-dark`} aria-label="Photography">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[3/1] overflow-hidden">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            sizes="100vw"
            className="object-cover photo-drift-1"
          />
        </div>
      </section>
    );
  }

  const lgCols = images.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <section className={`${bgClass} border-y-2 border-dark`} aria-label="Photography">
      <div className={`flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible ${lgCols} md:gap-0`}>
        {images.map((img, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-[85vw] md:w-auto snap-center aspect-[4/5] bg-stone overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 85vw"
              className={`object-cover photo-drift-${(i % 4) + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
