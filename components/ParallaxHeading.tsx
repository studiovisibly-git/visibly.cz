"use client";

import { useEffect, useRef } from "react";

/** Rozdělí titulek na vyvážené řádky (1–4) pro cik-cak parallax. */
export function splitLines(text: string, maxChars = 15): string[] {
  // Dělíme jen na běžných mezerách — nezlomitelná mezera drží slova u sebe.
  const words = text.trim().split(/[ \t\n]+/);
  if (words.length <= 1) return [text.trim()];

  const build = (limit: number): string[] => {
    const out: string[] = [];
    let cur = "";
    for (const w of words) {
      if (!cur) cur = w;
      else if ((cur + " " + w).length <= limit) cur += " " + w;
      else {
        out.push(cur);
        cur = w;
      }
    }
    if (cur) out.push(cur);
    return out;
  };

  let lines = build(maxChars);
  if (lines.length > 4) lines = build(Math.ceil(text.length / 4));
  return lines;
}

/**
 * Cik-cak: každý řádek má jiný faktor — střídavý směr (±) a jinou velikost.
 * Nikdy dva stejné, funguje pro libovolný počet řádků.
 */
export function lineFactor(i: number): number {
  const magnitude = 0.55 + 0.34 * i; // 0.55, 0.89, 1.23, 1.57…
  const sign = i % 2 === 0 ? -1 : 1;
  return Number((sign * magnitude).toFixed(3));
}

/**
 * Nadpis s cik-cak scroll parallaxem — sdílený pro všechny H1 i závěrečné CTA.
 * Řádky se při scrollu posouvají vodorovně různou rychlostí a směrem.
 */
export function ParallaxHeading({
  as: Tag = "h1",
  text,
  lines: linesProp,
  className = "",
  stagger = false,
  fromTop = false,
}: {
  as?: "h1" | "h2";
  text: string;
  /** Explicitní rozdělení na řádky (jinak se rozdělí automaticky). */
  lines?: string[];
  className?: string;
  /** Statické cik-cak odsazení řádků (hero nadpisy). Vypnuto u vycentrovaných CTA. */
  stagger?: boolean;
  /**
   * Kotví parallax od horního okraje: v klidu (načtení, bez scrollu) je posun
   * přesně 0 — řádky tedy začínají zarovnané a rozjíždějí se až scrollem.
   * Pro hero nadpisy, které jsou nad ohybem; bez toho by měly nenulový posun
   * daný svojí svislou pozicí (a nezarovnaly by se s eyebrow).
   */
  fromTop?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const lines = linesProp ?? splitLines(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      let p;
      if (fromTop) {
        // 0 dokud je nadpis na svém místě (rect.top ≥ 0), pak roste, jak odjíždí nahoru.
        p = Math.max(0, Math.min(1, -rect.top / vh));
      } else {
        const center = rect.top + rect.height / 2;
        // −1 (přichází zdola) … 0 (na středu) … +1 (odchází nahoru)
        p = (vh / 2 - center) / (vh / 2 + rect.height / 2);
        p = Math.max(-1, Math.min(1, p));
      }
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [text, lines.length]);

  return (
    <Tag className={`tlines${stagger ? " tlines--stagger" : ""}${className ? ` ${className}` : ""}`} ref={ref}>
      {lines.map((line, i) => (
        <span
          className="tline"
          key={line + i}
          style={{ "--f": lineFactor(i) } as React.CSSProperties}
        >
          {line}
        </span>
      ))}
    </Tag>
  );
}
