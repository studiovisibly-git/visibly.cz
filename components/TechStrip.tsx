import Link from "next/link";

export type TechItem = {
  /** Druh tisku — to, co zákazník hledá. */
  kind: string;
  /** Konkrétní stroj. Jméno samo o sobě nic neprodá, ale doloží, že je náš. */
  machine: string;
  /** Jedna věta o tom, co z toho zákazník má. Ne parametry pro parametry. */
  what: string;
};

/**
 * Pás o výrobní technice. Vědomě nevypisuje parametry strojů — ty nikomu,
 * kdo shání banner, nic neřeknou. Každý stroj je přeložený do jedné věty
 * o tom, co s ním jde vyrobit, a doplněný tím jedním údajem, který si
 * zákazník může ověřit proti svojí zakázce.
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
    <section className="tech-strip" data-reveal>
      <div className="tech-strip__head">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="tech-strip__title">{title}</h2>
        <p className="tech-strip__text">{text}</p>
      </div>

      <ul className="tech-strip__grid">
        {items.map((t) => (
          <li className="tech-strip__item" key={t.machine}>
            <span className="tech-strip__kind">{t.kind}</span>
            <strong className="tech-strip__machine">{t.machine}</strong>
            <span className="tech-strip__what">{t.what}</span>
          </li>
        ))}
      </ul>

      <Link href={href} className="arrow-link tech-strip__cta">
        {cta}{" "}
        <span className="arr" aria-hidden="true">
          ↗
        </span>
      </Link>
    </section>
  );
}
