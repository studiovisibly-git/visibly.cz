import Link from "next/link";

/**
 * Výrobci strojů, které máme. Loga leží u nás, ne na cizím serveru —
 * načítání webu tak nezávisí na Wikimedii.
 *
 * `width` je optické doladění, ne chyba: značky mají hodně rozdílné poměry
 * stran (Agfa 3,9:1 · Epson 4,1:1 · Roland 6,6:1). Kdyby se sázely na stejnou
 * šířku, Roland by v kruhu vypadal jako nitka. Sjednocujeme tedy dojem,
 * ne čísla.
 *
 * `deviza` je jedna věc, kterou ten stroj umí a jiné neumí — patří ke značce,
 * ne k textu stránky. Tak se objeví všude, kde značka je, a věta na stránce
 * ji nemusí na deseti místech opisovat jinými slovy. Dvojice tvrzení + důkaz
 * je schválně: „fotorealistická barva" sama je reklama, „deset inkoustů"
 * je ověřitelný důvod, proč to tak je.
 */
export const VYROBCI = {
  epson: {
    name: "Epson",
    logo: "/logos/vyrobci/epson.svg",
    width: "70%",
    deviza: { title: "Fotorealistická barva", note: "Deset inkoustů, ne jen CMYK" },
  },
  agfa: {
    name: "Agfa",
    logo: "/logos/vyrobci/agfa.svg",
    width: "66%",
    deviza: { title: "UV tisk přímo na materiál", note: "Deska i role do 3,2 m" },
  },
  roland: {
    name: "Roland",
    logo: "/logos/vyrobci/roland.svg",
    width: "86%",
    deviza: { title: "Přesný řez do tvaru", note: "Kontura přesně podle dat" },
  },
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

/**
 * Blok o technice na podstránce služby.
 *
 * Karta s kruhem sedícím na horní hraně je vzor z původní šablony — tam ho
 * mají u referencí. Značka nestojí vedle rámu, ale probíjí ho: kruh přeruší
 * linku a je z toho jeden tvar, ne logo přilepené na obdélník.
 *
 * Na velký pás na rozcestích to navazuje, ale neopisuje ho: stejný 2px tah,
 * stejné kruhy, stejný rytmus text vlevo / značky vpravo. Kdo přijde
 * z /tisk na /tisk/bannery, nevidí dvakrát tentýž blok — vidí dva díly
 * jedné rodiny, druhý navíc s devízou uvnitř.
 */
export function TechNote({
  title,
  brands,
  text,
}: {
  title: string;
  brands: (keyof typeof VYROBCI)[];
  text: string;
}) {
  return (
    <Link href="/technologie" className="tech-note" data-reveal>
      <div className="tech-note__copy">
        <span className="eyebrow">Vlastní výroba</span>
        <h2 className="tech-note__title">{title}</h2>
        <p className="tech-note__text">{text}</p>
        <span className="arrow-link tech-note__cta">
          Projít technologie{" "}
          <span className="arr" aria-hidden="true">
            ↗
          </span>
        </span>
      </div>

      {/* Loga nesou informaci („na čem"), kterou věta vždycky neopakuje —
          proto mají alt se značkou a nejsou schovaná před čtečkou. */}
      <ul className="tech-note__cards">
        {brands.map((key) => (
          <li className="tech-note__card" key={key}>
            <span className="tech-note__disc">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={VYROBCI[key].logo}
                alt={VYROBCI[key].name}
                style={{ width: VYROBCI[key].width }}
                loading="lazy"
              />
            </span>
            <strong className="tech-note__deviza">{VYROBCI[key].deviza.title}</strong>
            <span className="tech-note__proof">{VYROBCI[key].deviza.note}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
