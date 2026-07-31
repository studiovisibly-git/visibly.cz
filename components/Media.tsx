import Image from "next/image";
import { LazyVideo } from "./LazyVideo";
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
  const cls = `media media--${media.variant}${media.blend ? " media--blend" : ""}${className ? ` ${className}` : ""}`;

  if (media.src?.endsWith(".mp4")) {
    return (
      <div className={cls}>
        <LazyVideo src={media.src} poster={media.poster} label={media.alt ?? media.label} />
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

  /* Placeholder — fotografii teprve doplníme. Vidět má být jen tahle jedna
     věta: co přesně sem přijde, je poznámka pro nás, ne pro návštěvníka.
     V `aria-label` popisek zůstává — kdo stránku neuvidí, se aspoň dozví,
     co na tom místě má být. */
  return (
    <div className={`${cls} media--soon`} role="img" aria-label={media.label}>
      <span className="media__soon" aria-hidden="true">
        <span className="media__soon-eyebrow">Fotografie připravujeme</span>
      </span>
    </div>
  );
}
