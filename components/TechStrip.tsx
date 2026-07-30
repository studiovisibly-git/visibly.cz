import Link from "next/link";

/**
 * Výrobci strojů, které máme. Loga leží u nás, ne na cizím serveru —
 * načítání webu tak nezávisí na Wikimedii.
 *
 * `width` je optické doladění, ne chyba: značky mají hodně rozdílné poměry
 * stran (Agfa 3,9:1 · Epson 4,1:1 · Roland 6,6:1). Kdyby se sázely na stejnou
 * šířku, Roland by v kruhu vypadal jako nitka. Sjednocujeme tedy dojem,
 * ne čísla.
 */
export const VYROBCI = {
  epson: { name: "Epson", logo: "/logos/vyrobci/epson.svg", width: "70%" },
  agfa: { name: "Agfa", logo: "/logos/vyrobci/agfa.svg", width: "66%" },
  roland: { name: "Roland", logo: "/logos/vyrobci/roland.svg", width: "86%" },
} as const;

export type TechItem = {
  name: string;
  /** Jedna věc, kterou s ním umíme — ne parametry, ale výsledek. */
  what: string;
  logo?: string;
  width?: string;
};

/** Logo výrobce, nebo jeho název, dokud logo nemáme. */
function BrandMark({ item }: { item: TechItem }) {
  if (!item.logo) return <span className="tech-strip__wordmark">{item.name}</span>;
  // Loga jsou SVG — optimalizátor obrázků by je jen protáhl bez užitku.
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={item.logo}
      alt={item.name}
      style={item.width ? { width: item.width } : undefined}
      loading="lazy"
    />
  );
}

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
          <li className="tech-strip__item" key={t.name}>
            <span className="tech-strip__disc">
              <BrandMark item={t} />
            </span>
            <span className="tech-strip__what">{t.what}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
