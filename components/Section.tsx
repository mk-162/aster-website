import type { CSSProperties, ReactNode } from "react";

type Tone = "dark" | "stone" | "white" | "photo";

/** Full-bleed marketing section. DS rhythm: dark → photo → stone → white,
 * each separated by the signature 2px dark border. `photo` renders a dark
 * base with a cover image + dark overlay behind the content. */
export default function Section({
  tone = "white",
  photoSrc,
  overlay = "linear-gradient(120deg, rgba(24,30,21,0.92) 0%, rgba(24,30,21,0.72) 48%, rgba(24,30,21,0.55) 100%)",
  className = "",
  innerClassName = "",
  children,
}: {
  tone?: Tone;
  photoSrc?: string;
  overlay?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  const tones: Record<Tone, string> = {
    dark: "bg-dark text-mint",
    stone: "bg-stone text-dark",
    white: "bg-white text-dark",
    photo: "bg-dark text-mint",
  };
  const photoStyle: CSSProperties | undefined =
    tone === "photo" && photoSrc
      ? {
          backgroundImage: `url('${photoSrc}')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }
      : undefined;

  return (
    <section
      className={`relative overflow-hidden border-b-2 border-dark ${tones[tone]} ${className}`}
    >
      {tone === "photo" && photoSrc && (
        <>
          <div aria-hidden className="absolute inset-0" style={photoStyle} />
          <div aria-hidden className="absolute inset-0" style={{ background: overlay }} />
        </>
      )}
      <div className={`relative container-site py-16 md:py-24 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}
