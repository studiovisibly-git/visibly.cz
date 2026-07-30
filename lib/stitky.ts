import { allServices } from "./services";

/**
 * Štítky realizací = služby, které na zakázce byly.
 *
 * Klíč je schválně slug služby, ne vlastní číselník: štítek tak vždycky
 * ukazuje na existující podstránku, název se bere z ní a nemůže se rozejít.
 * Realizace může mít jeden štítek i pět — a nemusí mít žádný.
 *
 * Filtrování na přehledu zatím nestavíme, na čtyři realizace by bylo
 * k ničemu. Data ale sedí tak, aby stačilo přidat UI: `stitky` jsou pole
 * a `vsechnyStitky()` vrátí, co je skutečně použité.
 */
export type Stitek = { slug: string; label: string; href: string };

const podleSlugu = new Map<string, Stitek>(
  allServices.map((s) => [
    s.slug,
    {
      slug: s.slug,
      label: s.navLabel,
      href: s.hub ? `/${s.hub}/${s.slug}` : `/${s.slug}`,
    },
  ]),
);

/**
 * Štítek podle slugu služby. Neznámý slug je překlep v datech, ne stav,
 * se kterým by se dalo rozumně pracovat — proto spadne rovnou při buildu.
 */
export function stitek(slug: string): Stitek {
  const s = podleSlugu.get(slug);
  if (!s) throw new Error(`Štítek „${slug}" neodpovídá žádné službě.`);
  return s;
}

export function stitky(slugy: string[]): Stitek[] {
  return slugy.map(stitek);
}

/** Štítky, které se na realizacích opravdu používají — pro budoucí filtr. */
export function vsechnyStitky(realizace: { stitky: string[] }[]): Stitek[] {
  const pouzite = new Set(realizace.flatMap((r) => r.stitky));
  return [...pouzite].map(stitek).sort((a, b) => a.label.localeCompare(b.label, "cs"));
}
