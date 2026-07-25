"use client";

import { useEffect, useRef } from "react";
import { documentTop, onLayoutChange, onScrollFrame, prefersReducedMotion } from "@/lib/motion";

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
    if (prefersReducedMotion()) return;

    // Pozici a výšku měříme dopředu, ne uvnitř scroll snímku — díky tomu
    // v každém snímku jen počítáme a měníme transform (žádný přepočet layoutu).
    let top = 0;
    let height = 0;
    let last = "";
    let inView = true;

    const measure = () => {
      top = documentTop(el);
      height = el.offsetHeight;
    };

    // Mimo viewport nadpis nepřepočítáváme vůbec — style recalc jen tam,
    // kde je vidět (stejný princip jako IX2 „while scrolling in view").
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(el);

    const apply = (scrollY: number, vh: number) => {
      if (!inView) return;
      // Pozice nadpisu vůči viewportu, dopočítaná z cachovaných hodnot.
      const relTop = top - scrollY;
      let p;
      if (fromTop) {
        // Reaguje od prvního pixelu scrollu: v klidu (scrollY 0) je posun 0,
        // pak roste přímo se scrollem.
        p = Math.max(0, Math.min(1, scrollY / vh));
      } else {
        const center = relTop + height / 2;
        // −1 (přichází zdola) … 0 (na středu) … +1 (odchází nahoru)
        p = (vh / 2 - center) / (vh / 2 + height / 2);
        p = Math.max(-1, Math.min(1, p));
      }
      const next = p.toFixed(4);
      if (next !== last) {
        last = next;
        el.style.setProperty("--p", next);
      }
    };

    measure();
    const stopLayout = onLayoutChange(el, measure);
    const stopScroll = onScrollFrame(apply);
    return () => {
      io.disconnect();
      stopLayout();
      stopScroll();
    };
  }, [text, lines.length, fromTop]);

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
