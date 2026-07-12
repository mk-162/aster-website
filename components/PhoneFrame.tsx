import Image from "next/image";
import ReplayVideo from "./ReplayVideo";

/** Dark rounded device frame for real app screenshots — DS language
 * (2px dark border, pop shadow), no fake notch detail. Screenshots are
 * 780×1688 phone captures; pass `videoSrc` + `poster` to show an ambient
 * looping replay clip instead (480×1040, same ~0.46 ratio). */
export default function PhoneFrame({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 340px, 75vw",
  videoSrc,
  poster,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  videoSrc?: string;
  poster?: string;
}) {
  return (
    <div
      className={`relative rounded-[36px] border-2 border-dark bg-dark p-2.5 shadow-pop-lime ${className}`}
    >
      <div className="overflow-hidden rounded-[28px] bg-dark">
        {videoSrc && poster ? (
          <ReplayVideo
            src={videoSrc}
            poster={poster}
            alt={alt}
            width={480}
            height={1040}
            className="block w-full h-auto"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={780}
            height={1688}
            priority={priority}
            sizes={sizes}
            className="block w-full h-auto"
          />
        )}
      </div>
    </div>
  );
}
