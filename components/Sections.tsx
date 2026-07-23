import Link from "next/link";
import { Media } from "./Media";
import { ParallaxHeading } from "./ParallaxHeading";
import type { DirItem, LinkItem, MediaSpec, ProcessStep } from "@/lib/types";

/* ---------- Hlavička sekce ---------- */

export function SectionHead({
  eyebrow,
  title,
  text,
  indent,
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  /** Rozhozené nadpisy — 0 = vlevo, 1/2 = posun doprava. */
  indent?: 0 | 1 | 2;
  className?: string;
}) {
  const indentCls = indent === 1 ? " indent-1" : indent === 2 ? " indent-2" : "";
  return (
    <div className={`section-head${indentCls}${className ? ` ${className}` : ""}`} data-reveal>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="h2">{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

/* ---------- Proof strip (01–04 pod hero) ---------- */

export function ProofStrip({ items }: { items: { title: string; text?: string }[] }) {
  return (
    <section className="proof" aria-label="Proč Visibly">
      <div className="container proof__grid">
        {items.map((item, i) => (
          <div className="proof__item" key={item.title} data-reveal>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            {item.text && <p>{item.text}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Directory (rozcestník otázek) ---------- */

export function Directory({ items, cols = 2 }: { items: DirItem[]; cols?: 2 | 3 }) {
  return (
    <div className={`directory${cols === 3 ? " directory--3" : ""}`}>
      {items.map((item, i) => (
        <article className="dir-card" key={item.title} data-reveal>
          <span className="num">{item.num ?? String(i + 1).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          {item.text && <p>{item.text}</p>}
          <Link href={item.href} className="dir-card__link dir-card--link">
            {item.cta}{" "}
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}

/* ---------- Rotující kruhový badge (vzor: Circle „PLAY") ---------- */

export function SpinBadge({ label, href }: { label: string; href: string }) {
  const id = `spin-${label.replace(/\W/g, "").slice(0, 14)}`;
  return (
    <Link href={href} className="spin-badge" aria-label={label}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <path id={id} d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
        </defs>
        <text>
          <textPath href={`#${id}`}>{label}</textPath>
        </text>
      </svg>
      <span className="spin-badge__arrow" aria-hidden="true">
        ↗
      </span>
    </Link>
  );
}

/* ---------- Split (kruhové médium + postoj) ---------- */

export function Split({
  media,
  eyebrow,
  title,
  text,
  sub,
  cta,
  badge,
  flip = false,
}: {
  media: MediaSpec;
  eyebrow?: string;
  title: string;
  text: string;
  sub?: string;
  cta?: LinkItem;
  badge?: { label: string; href: string };
  flip?: boolean;
}) {
  const mediaEl = (
    <div className="split__media" data-reveal>
      <Media media={media} />
      {badge && <SpinBadge label={badge.label} href={badge.href} />}
    </div>
  );
  const copyEl = (
    <div className="split__copy" data-reveal>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="h2">{title}</h2>
      <p>{text}</p>
      {sub && <p className="split__sub">{sub}</p>}
      {cta && (
        <p>
          <Link href={cta.href} className="btn btn--solid">
            {cta.label}
          </Link>
        </p>
      )}
    </div>
  );

  return (
    <div className={flip ? "split split--flip" : "split"}>
      {flip ? (
        <>
          {copyEl}
          {mediaEl}
        </>
      ) : (
        <>
          {mediaEl}
          {copyEl}
        </>
      )}
    </div>
  );
}

/* ---------- Band (CTA) — vycentrovaný blok s cik-cak parallaxem ----------
   Eyebrow na středu nahoře, titulek na 2 řádky s parallaxem (menší než
   závěrečné CTA), pod ním text a tlačítko. Stejný jazyk jako final CTA. */

/** Rozdělí titulek na 2 vyvážené řádky podle počtu slov. */
function twoLines(title: string): string[] {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return [title.trim()];
  let best = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ").length;
    const b = words.slice(i).join(" ").length;
    const diff = Math.abs(a - b);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

export function Band({
  eyebrow,
  title,
  text,
  cta,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  cta: LinkItem;
}) {
  return (
    <div className="cta-block" data-reveal>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <ParallaxHeading as="h2" text={title} lines={twoLines(title)} className="cta-block__title" />
      {text && <p className="cta-block__text">{text}</p>}
      <Link href={cta.href} className="btn btn--solid">
        {cta.label}
      </Link>
    </div>
  );
}

/* ---------- Process (kroky 01–04) ---------- */

export function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="process" style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {steps.map((step, i) => (
        <li className="process__item" key={step.title} data-reveal>
          <span className="num">{String(i + 1).padStart(2, "0")}</span>
          <h3>{step.title}</h3>
          {step.text && <p>{step.text}</p>}
        </li>
      ))}
    </ol>
  );
}

/* ---------- Editorial list (karty průvodce) ---------- */

export function EditorialList({
  items,
}: {
  items: { eyebrow?: string; title: string; text?: string; href: string; cta?: string }[];
}) {
  return (
    <div className="editorial">
      {items.map((item) => (
        <article className="edit-card" key={item.href + item.title} data-reveal>
          {item.eyebrow && <span className="eyebrow">{item.eyebrow}</span>}
          <h3>{item.title}</h3>
          {item.text && <p>{item.text}</p>}
          <Link href={item.href} className="edit-card__link edit-card--link">
            {item.cta ?? "Číst průvodce"}{" "}
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}

/* ---------- Final CTA — sdílená klientská komponenta s řádkovým parallaxem ---------- */

export { FinalCta } from "./FinalCta";

/* ---------- Logo strip — reálná SVG loga klientů, plynulý marquee ---------- */

export function LogoStrip({ logos }: { logos: { name: string; src: string }[] }) {
  const doubled = [...logos, ...logos];
  return (
    <div className="logo-strip" aria-label="Klienti">
      <div className="logo-strip__track">
        {doubled.map((logo, i) => (
          <span className="logo-strip__item" key={`${logo.name}-${i}`} aria-hidden={i >= logos.length}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={i < logos.length ? logo.name : ""} loading="lazy" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Showcase rozcestník služeb (vzor: work-2) ---------- */

export function ServiceShowcase({
  items,
}: {
  items: { category: string; title: string; text: string; href: string; media: MediaSpec }[];
}) {
  return (
    <div className="showcase">
      {items.map((item) => (
        <Link href={item.href} className="showcase__item" key={item.href} data-reveal>
          <div className="showcase__media">
            <Media media={item.media} />
          </div>
          <div className="showcase__meta">
            <span className="category">
              <span className="dot" aria-hidden="true" />
              {item.category}
            </span>
            <h3 className="showcase__title">
              {item.title}
              <span className="arr" aria-hidden="true">
                ↗
              </span>
            </h3>
            <p className="showcase__text">{item.text}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ---------- Kruhové chipy (vzor: Core Services) ---------- */

export function CircleRow({
  items,
}: {
  items: { title: string; note?: string; href?: string }[];
}) {
  return (
    <div className="circle-row" data-reveal>
      {items.map((item) =>
        item.href ? (
          <Link href={item.href} className="circle-chip" key={item.title}>
            {item.title}
            {item.note && <small>{item.note}</small>}
          </Link>
        ) : (
          <div className="circle-chip" key={item.title}>
            {item.title}
            {item.note && <small>{item.note}</small>}
          </div>
        ),
      )}
    </div>
  );
}

/* ---------- Obří marquee titulek ---------- */

export function GiantMarquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee-xl" aria-hidden="true">
      <div className="marquee-xl__track">
        {row.map((item, i) => (
          <span className="marquee-xl__item" key={`${item}-${i}`}>
            {item}
            <span className="sep">—</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Full-bleed horizontální pás prací ---------- */

export function WorkStrip({
  items,
}: {
  items: { href: string; media: MediaSpec; eyebrow: string; title: string }[];
}) {
  return (
    <div className="work-strip-wrap" data-reveal>
      <div className="work-strip">
        {items.map((item) => (
          <Link href={item.href} className="work-strip__item" key={item.href}>
            <Media media={item.media} />
            <div className="work-strip__caption">
              <span className="eyebrow">{item.eyebrow}</span>
              <strong>{item.title}</strong>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ---------- Karta realizace ---------- */

export function WorkCard({
  href,
  media,
  eyebrow,
  title,
  text,
}: {
  href: string;
  media: MediaSpec;
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <Link href={href} className="work-card" data-reveal>
      <Media media={media} />
      <div className="work-card__meta">
        <span className="eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
        {text && <p>{text}</p>}
      </div>
    </Link>
  );
}
