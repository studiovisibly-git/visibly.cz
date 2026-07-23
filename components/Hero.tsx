import Link from "next/link";
import { Media } from "./Media";
import { ParallaxHeading } from "./ParallaxHeading";
import { ScrollCta } from "./ScrollCta";
import { ScrollScale } from "./ScrollScale";
import type { LinkItem, MediaSpec } from "@/lib/types";

type HeroVariant = "home" | "media" | "plain";

/**
 * Jednotný hero pro celý web.
 * Nahoře eyebrow + H1 (cik-cak parallax, řez 500). Dole jeden blok:
 * doplňkový text → tlačítko + scroll CTA → poznámka. Na desktopu ukotvený u paty.
 */
export function Hero({
  eyebrow,
  title,
  titleLines,
  displayClass = "display-l",
  sub,
  note,
  primary,
  scroll,
  secondary,
  media,
  variant = "media",
}: {
  eyebrow: string;
  title: string;
  titleLines?: string[];
  displayClass?: "display-xl" | "display-l";
  sub: string;
  note?: string;
  primary: LinkItem;
  /** Scroll CTA se zalomenou šipkou dolů. */
  scroll?: LinkItem;
  /** Alternativa ke scroll CTA — prostý odkaz se šipkou ↗. */
  secondary?: LinkItem;
  media?: MediaSpec;
  variant?: HeroVariant;
}) {
  return (
    <section className={`container container--wide hero hero--${variant}`}>
      <div className="hero__copy">
        <span className="eyebrow">{eyebrow}</span>
        <ParallaxHeading text={title} lines={titleLines} className={displayClass} stagger />
        <div className="hero__foot">
          <p className="hero__sub">{sub}</p>
          <div className="hero__actions">
            <Link href={primary.href} className="btn">
              {primary.label}
            </Link>
            {scroll && <ScrollCta href={scroll.href}>{scroll.label}</ScrollCta>}
            {!scroll && secondary && (
              <Link href={secondary.href} className="arrow-link">
                {secondary.label}{" "}
                <span className="arr" aria-hidden="true">
                  ↗
                </span>
              </Link>
            )}
          </div>
          {note && <p className="hero__note">{note}</p>}
        </div>
      </div>

      {media && (
        <ScrollScale className="hero__media">
          <Media
            media={media}
            sizes={variant === "home" ? "(max-width: 1080px) 62vw, 28rem" : "(max-width: 860px) 70vw, 26rem"}
            priority
          />
        </ScrollScale>
      )}
    </section>
  );
}
