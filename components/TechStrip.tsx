import Image from "next/image";
import Link from "next/link";

export type TechItem = {
  /** Značka stroje — do kruhu. */
  brand: string;
  /** Jedna věc, kterou s ním umíme. Ne parametry, ale výsledek. */
  what: string;
  /**
   * Cesta k logu výrobce, až bude. Do té doby je v kruhu nápis značky —
   * vlastní sazbou, takže to nevypadá jako díra po chybějícím obrázku.
   */
  logo?: string;
};

/**
 * Pás o výrobní technice. Značky v kruzích místo odstavců: „na čem tiskneme"
 * se pozná na první pohled a text zůstane na to jediné, co si zákazník může
 * ověřit proti svojí zakázce.
 *
 * Údaje musí sedět s /technologie — ta stránka je zdroj pravdy.
 */
export function TechStrip({
  eyebrow,
  title,
  text,
  items,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  text: string;
  items: TechItem[];
  href: string;
  cta: string;
}) {
  return (
    <Link href={href} className="tech-strip" data-reveal>
      <div className="tech-strip__copy">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="tech-strip__title">{title}</h2>
        <p className="tech-strip__text">{text}</p>
        <span className="arrow-link tech-strip__cta">
          {cta}{" "}
          <span className="arr" aria-hidden="true">
            ↗
          </span>
        </span>
      </div>

      <ul className="tech-strip__items">
        {items.map((t) => (
          <li className="tech-strip__item" key={t.brand}>
            <span className="tech-strip__disc">
              {t.logo ? (
                <Image src={t.logo} alt={t.brand} fill sizes="(max-width: 860px) 26vw, 10rem" />
              ) : (
                <span className="tech-strip__wordmark">{t.brand}</span>
              )}
            </span>
            <span className="tech-strip__what">{t.what}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
