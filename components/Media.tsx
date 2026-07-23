import Image from "next/image";
import type { MediaSpec } from "@/lib/types";

/**
 * Fotografie, video, nebo elegantní placeholder se stejným poměrem stran.
 * `src` končící na .mp4 se vykreslí jako smyčkové video; jinak jako obrázek.
 */
export function Media({
  media,
  className,
  sizes = "(max-width: 860px) 90vw, 40vw",
  priority = false,
}: {
  media: MediaSpec;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const cls = `media media--${media.variant}${className ? ` ${className}` : ""}`;

  if (media.src?.endsWith(".mp4")) {
    return (
      <div className={cls}>
        <video
          className="media__video"
          src={media.src}
          poster={media.poster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label={media.alt ?? media.label}
        />
      </div>
    );
  }

  if (media.src) {
    return (
      <div className={cls}>
        <Image src={media.src} alt={media.alt ?? media.label} fill sizes={sizes} priority={priority} />
      </div>
    );
  }

  // Placeholder — fotografii teprve doplníme. Očistíme redundantní předponu popisku.
  const subject = media.label.replace(/^(kruhová\s+)?(fotografie|foto|video|obrázek)\s*·?\s*/i, "");
  return (
    <div className={`${cls} media--soon`} role="img" aria-label={media.label}>
      <span className="media__soon" aria-hidden="true">
        <span className="media__soon-eyebrow">Fotografie připravujeme</span>
        {subject && <span className="media__soon-label">{subject}</span>}
      </span>
    </div>
  );
}
