/**
 * Filtry katalogu v adrese.
 *
 * Smysl je jediný: poslat někomu rovnou „červená trička MALFINI do 300 Kč"
 * místo návodu, co si má naklikat. Adresa proto nese kódy tak, jak se čtou
 * — `?typ=tricka&barva=cervena` — a ne interní kódy dodavatele.
 *
 * Čte se i zapisuje na klientovi. Kdyby stránka sahala na `searchParams`
 * na serveru, přestala by se předgenerovat a index cen (přes tři tisíce
 * dotazů) by se počítal při každém načtení.
 */

import type { MalfiniCatalog } from "./malfini";

/** Stav levého sloupce s filtry — nic víc, nic míň. */
export type CatalogFilters = {
  /** Název skupiny, jak ho posílá dodavatel („PÁNSKÉ"). */
  group: string;
  query: string;
  category: string;
  trademark: string;
  color: string;
  /** Kód cenového pásma, viz PRICE_BANDS. */
  band: string;
};

export const EMPTY_FILTERS: CatalogFilters = {
  group: "",
  query: "",
  category: "",
  trademark: "",
  color: "",
  band: "",
};

/**
 * Cenová pásma. API filtr podle ceny nemá — nemá ho ani katalog dodavatele —
 * takže filtrujeme podle vlastního indexu nejnižších cen.
 */
export const PRICE_BANDS = [
  { code: "", slug: "", label: "Libovolná" },
  { code: "0-150", slug: "do-150", label: "do 150 Kč", max: 150 },
  { code: "150-300", slug: "150-300", label: "150–300 Kč", min: 150, max: 300 },
  { code: "300-600", slug: "300-600", label: "300–600 Kč", min: 300, max: 600 },
  { code: "600-", slug: "nad-600", label: "nad 600 Kč", min: 600 },
] as const;

/** Názvy parametrů. Česky, protože adresu čtou lidi, ne jen prohlížeč. */
const KEYS = {
  group: "komu",
  query: "hledat",
  category: "typ",
  trademark: "znacka",
  color: "barva",
  band: "cena",
} as const;

/**
 * Přepis adresy bez překreslení stránky.
 *
 * `history.state` se musí předat dál, ne nahradit `null`. Next si do něj ukládá,
 * jakou stránku ten záznam v historii ukazuje — a bez toho se po stisku „zpět"
 * nemá k čemu vrátit. Prakticky: modál produktu nad katalogem zůstane viset,
 * i když je v adresním řádku zase katalog.
 */
export function replaceUrl(url: string): void {
  window.history.replaceState(window.history.state, "", url);
}

/** „Bundy-vesty" → `bundy-vesty`, „MALFINI Premium®" → `malfini-premium`. */
export function slug(text: string): string {
  return text
    .normalize("NFD")
    /* Rozložené diakritické znaménko — po NFD visí za písmenem samostatně. */
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Převod mezi kódem dodavatele a tvarem v adrese, oběma směry. */
type Codebook = { toSlug: Map<string, string>; toCode: Map<string, string> };

/**
 * Názvy nejsou jednoznačné: „bílá" má v ceníku tři různé kódy (00, t0, b0)
 * podle toho, o jakou řadu jde. Název proto dostane ta volba, která je
 * nejpočetnější — u zbylých zůstane v adrese kód, aby odkaz vedl přesně na
 * to, co bylo vybrané. Kód se dá do adresy napsat vždycky.
 */
function codebook(items: { code: string; name: string; count?: number }[]): Codebook {
  const vitez = new Map<string, { code: string; count: number }>();
  for (const it of items) {
    const s = slug(it.name) || slug(it.code);
    if (!s) continue;
    const nej = vitez.get(s);
    if (!nej || (it.count ?? 0) > nej.count) vitez.set(s, { code: it.code, count: it.count ?? 0 });
  }

  const toCode = new Map<string, string>();
  for (const [s, v] of vitez) toCode.set(s, v.code);

  const toSlug = new Map<string, string>();
  for (const it of items) {
    const s = slug(it.name) || slug(it.code);
    toSlug.set(it.code, toCode.get(s) === it.code ? s : it.code);
    /* Holý kód musí zůstat čitelný i tehdy, když název vyhrál někdo jiný. */
    if (!toCode.has(it.code)) toCode.set(it.code, it.code);
  }

  return { toSlug, toCode };
}

export type CatalogCodebooks = Record<"group" | "category" | "trademark" | "color", Codebook>;

/**
 * Slovníky se staví z nefiltrovaného katalogu. Po zafiltrování API vrací jen
 * volby, které něčemu odpovídají — z těch by adresa šla přečíst jen zpola.
 */
export function catalogCodebooks(catalog: MalfiniCatalog): CatalogCodebooks {
  const facet = (code: string) => catalog.facets.find((f) => f.code === code)?.options ?? [];
  return {
    group: codebook(catalog.groups.map((g) => ({ code: g.name, name: g.name }))),
    category: codebook(facet("category")),
    trademark: codebook(facet("trademark")),
    color: codebook(facet("color")),
  };
}

/** Filtry z adresy. Co nedává smysl, tiše zahodíme — půlka odkazu je lepší než 404. */
export function readFilters(search: string, books: CatalogCodebooks): CatalogFilters {
  const p = new URLSearchParams(search);
  const kod = (klic: string, book: Codebook) => {
    const v = p.get(klic);
    return v ? (book.toCode.get(v.toLowerCase()) ?? "") : "";
  };

  const pasmo = p.get(KEYS.band)?.toLowerCase() ?? "";
  return {
    group: kod(KEYS.group, books.group),
    query: p.get(KEYS.query)?.trim() ?? "",
    category: kod(KEYS.category, books.category),
    trademark: kod(KEYS.trademark, books.trademark),
    color: kod(KEYS.color, books.color),
    band: PRICE_BANDS.find((b) => b.slug && (b.slug === pasmo || b.code === pasmo))?.code ?? "",
  };
}

/**
 * Adresa z filtrů — „?typ=tricka&barva=cervena". Prázdné filtry se vynechají,
 * ať se dá výsledek poslat i vyslovit.
 *
 * Skupina se do adresy dostane jen tehdy, když se v ní opravdu vybírá:
 * s hledáním se prohledává celý katalog napříč skupinami, takže `komu`
 * by v takovém odkazu bylo matoucí. Výchozí skupina se vynechá taky —
 * je to stav, do kterého se stránka postaví sama.
 */
export function writeFilters(
  f: CatalogFilters,
  books: CatalogCodebooks,
  defaultGroup: string,
): string {
  const p = new URLSearchParams();
  const put = (klic: string, kod: string, book: Codebook) => {
    if (kod) p.set(klic, book.toSlug.get(kod) ?? kod);
  };

  if (f.query) p.set(KEYS.query, f.query);
  else if (f.group && f.group !== defaultGroup) put(KEYS.group, f.group, books.group);

  put(KEYS.category, f.category, books.category);
  put(KEYS.trademark, f.trademark, books.trademark);
  put(KEYS.color, f.color, books.color);

  const pasmo = PRICE_BANDS.find((b) => b.code === f.band);
  if (pasmo?.slug) p.set(KEYS.band, pasmo.slug);

  const qs = p.toString();
  return qs ? `?${qs}` : "";
}
