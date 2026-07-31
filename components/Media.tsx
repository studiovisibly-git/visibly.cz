import Image from "next/image";
import { LazyVideo } from "./LazyVideo";
import { ScrollScale } from "./ScrollScale";
import type { MediaSpec } from "@/lib/types";

/**
 * Fotografie, video, nebo elegantní placeholder se stejným poměrem stran.
 * `src` končící na .mp4 se vykreslí jako smyčkové video; jinak jako obrázek.
 *
 * Hranaté fotky se při scrollu pomalu zvětšují a posouvají — stejné gesto
 * jako v Circle šabloně. Kruhy ho nedostávají: ty už se zvětšují v heru,
 * kde ScrollScale řídí celý blok, a druhá vrstva by se s ní prala.
 */
export function Media({
  media,
  className,
  sizes = "(max-width: 860px) 90vw, 40vw",
  priority = false,
  parallax = true,
}: {
  media: MediaSpec;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Vypnout tam, kde fotky stojí v těsném pásu vedle sebe. */
  parallax?: boolean;
}) {
  const cls = `media media--${media.variant}${media.blend ? " media--blend" : ""}${className ? ` ${className}` : ""}`;
  const sParallaxem = parallax && media.variant !== "circle";

  if (media.src?.endsWith(".mp4")) {
    return (
      <div className={cls}>
        <LazyVideo src={media.src} poster={media.poster} label={media.alt ?? media.label} />
      </div>
    );
  }

  if (media.src) {
    const obrazek = (
      <Image src={media.src} alt={media.alt ?? media.label} fill sizes={sizes} priority={priority} />
    );
    return (
      <div className={cls}>
        {sParallaxem ? (
          /* Rám ořezává (`.media` má overflow: hidden), hýbe se až vrstva
             uvnitř — ta je zároveň pozicovaným rodičem pro `fill`. */
          <ScrollScale className="media__parallax" from={1.08} to={1.28}>
            {obrazek}
          </ScrollScale>
        ) : (
          obrazek
        )}
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
