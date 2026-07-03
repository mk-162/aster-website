import Image from "next/image";

/** Dark rounded device frame for real app screenshots — DS language
 * (2px dark border, pop shadow), no fake notch detail. Screenshots are
 * 780×1688 phone captures. */
export default function PhoneFrame({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 340px, 75vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`relative rounded-[36px] border-2 border-dark bg-dark p-2.5 shadow-pop-lime ${className}`}
    >
      <div className="overflow-hidden rounded-[28px] bg-dark">
        <Image
          src={src}
          alt={alt}
          width={780}
          height={1688}
          priority={priority}
          sizes={sizes}
          className="block w-full h-auto"
        />
      </div>
    </div>
  );
}
