/**
 * Data katalogu textilu z API dodavatele.
 *
 * Katalog na onlinecatalog.malfini.com je React aplikace nad veřejným JSON
 * API na naší vlastní adrese (store „visibly.cz"). Tahat data přímo znamená,
 * že katalog vykreslíme ve vlastním designu — místo iframu, ze kterého
 * neumíme přenést výběr do poptávky ani ho nechat zaindexovat.
 *
 * Pozn.: API není dokumentované. Kdyby přestalo odpovídat, stránka to pozná
 * (getCatalog vrátí null) a nabídne odkaz na původní katalog.
 */

const STORE = "visibly.cz";
const HOST = "https://onlinecatalog.malfini.com";
const API = `${HOST}/api/v2/${STORE}`;

/** Jak často se katalog přegeneruje (vteřiny). Sortiment se mění po sezónách. */
export const CATALOG_REVALIDATE = 60 * 60 * 12;

type Localized = { cs?: string } & Record<string, string | undefined>;

export type MalfiniProduct = {
  code: string;
  seoName: string;
  name: string;
  subName: string;
  colors: string[];
};

export type MalfiniGroup = {
  name: string;
  products: MalfiniProduct[];
};

export type MalfiniColor = { code: string; name: string };

export type MalfiniFacetOption = { code: string; name: string; count: number };
export type MalfiniFacet = { code: string; name: string; options: MalfiniFacetOption[] };

export type MalfiniCatalog = {
  groups: MalfiniGroup[];
  colors: Record<string, MalfiniColor>;
  facets: MalfiniFacet[];
};

/** Filtry, které nabízíme v UI. Víc jich API umí, tyhle dávají smysl zákazníkovi. */
export type CatalogFilters = { category?: string; trademark?: string; color?: string };

/** Nejnižší cena produktu (bez DPH) podle kódu — pro filtr a štítek na kartě. */
export type PriceIndex = Record<string, number>;

/** Cena a dostupnost jedné velikosti. */
export type MalfiniPrice = {
  size: string;
  value: number;
  valueWithVat: number;
  availability: number;
};

export type MalfiniAttribute = { title: string; text: string };

export type MalfiniDetail = {
  code: string;
  name: string;
  subName: string;
  specificationHtml: string;
  descriptionHtml: string;
  attributes: MalfiniAttribute[];
  colors: string[];
  views: string[];
  sizeChartPdf: string | null;
};

const cs = (v: Localized | string | undefined | null): string =>
  typeof v === "string" ? v : (v?.cs ?? "");

/**
 * Hlavní pohled na produkt. API vrací pohledy v pořadí a „c" je konzistentně
 * první — u obuvi je to bota z boku, kdežto „a" je podrážka.
 */
export const PRIMARY_VIEW = "c";

/** URL fotky produktu. `view` je pohled (a/b/c/e…), `width` šířka v px. */
export function productImage(code: string, colorCode: string, view = PRIMARY_VIEW, width = 640): string {
  return `${HOST}/image/product/${code}/${code}_${colorCode}_${view}~w${width}.jpg`;
}

/** Odkaz na PDF (tabulka velikostí apod.). */
export function fileUrl(path: string): string {
  return `${HOST}/file/${path}`;
}

/** Filtry, které vůbec ukazujeme — zbylých ~19 facetů je na katalog k potisku
 *  příliš podrobných (šířka obuvi, bezpečnostní kategorie…). */
const UI_FACETS = ["category", "trademark", "color"];

/**
 * Sortiment, který na web nepatří — propagační a obalový materiál.
 * Skrýváme jak produkty, tak celé skupiny i volbu ve filtru.
 */
const HIDDEN_CATEGORIES = ["promotional-materials"];
const HIDDEN_GROUPS = ["PROPAGAČNÍ MATERIÁL", "OBALOVÝ MATERIÁL"];

const isHiddenGroup = (name: string) => HIDDEN_GROUPS.includes(name.trim().toUpperCase());

/**
 * Katalog — skupiny, produkty, barvy a nabídka filtrů.
 * Filtrování probíhá na straně API: seznam produktů sám o sobě neobsahuje
 * kategorii ani značku, takže po nich filtrovat lokálně nejde.
 */
export async function getCatalog(filters: CatalogFilters = {}): Promise<MalfiniCatalog | null> {
  try {
    const qs = new URLSearchParams();
    if (filters.category) qs.set("category", filters.category);
    if (filters.trademark) qs.set("trademark", filters.trademark);
    if (filters.color) qs.set("color", filters.color);
    const url = `${API}/product${qs.toString() ? `?${qs}` : ""}`;

    const res = await fetch(url, { next: { revalidate: CATALOG_REVALIDATE } });
    if (!res.ok) return null;
    const raw = await res.json();

    const groups: MalfiniGroup[] = (raw.productGroups ?? [])
      .map((g: Record<string, unknown>) => ({
        name: cs(g.name as Localized),
        products: ((g.products as Record<string, unknown>[]) ?? []).map((p) => ({
          code: String(p.code ?? ""),
          seoName: String(p.seoName ?? p.code ?? ""),
          name: cs(p.name as Localized),
          subName: cs(p.subName as Localized),
          colors: (p.colors as string[]) ?? [],
        })),
      }))
      .filter((g: MalfiniGroup) => g.products.length > 0 && !isHiddenGroup(g.name));

    const colors: Record<string, MalfiniColor> = {};
    for (const [code, c] of Object.entries<Record<string, unknown>>(raw.color ?? {})) {
      if (c?.isValid === false) continue;
      colors[code] = { code, name: cs(c.name as Localized) };
    }

    const facets: MalfiniFacet[] = (raw.facets ?? [])
      .filter((f: Record<string, unknown>) => UI_FACETS.includes(String(f.code)))
      .map((f: Record<string, unknown>) => ({
        code: String(f.code),
        name: cs(f.name as Localized),
        options: ((f.options as Record<string, unknown>[]) ?? [])
          .filter(
            (o) =>
              o.isValid !== false &&
              Number(o.count ?? 0) > 0 &&
              !HIDDEN_CATEGORIES.includes(String(o.code)),
          )
          .map((o) => ({
            code: String(o.code ?? ""),
            name: cs(o.name as Localized),
            count: Number(o.count ?? 0),
          })),
      }))
      /* Pořadí jako v UI_FACETS — kategorie první, značka druhá. */
      .sort(
        (a: MalfiniFacet, b: MalfiniFacet) =>
          UI_FACETS.indexOf(a.code) - UI_FACETS.indexOf(b.code),
      );

    return { groups, colors, facets };
  } catch {
    return null;
  }
}

/**
 * Nejnižší cena každého produktu. API filtr podle ceny nemá — nemá ho ani
 * původní katalog dodavatele — takže si index postavíme sami a filtrujeme
 * podle něj na klientovi. Souběžnost 20 zvládne celý katalog za ~6 s
 * a výsledek se drží v cache stejně dlouho jako katalog.
 */
export async function getPriceIndex(catalog: MalfiniCatalog): Promise<PriceIndex> {
  const codes = [...new Set(catalog.groups.flatMap((g) => g.products.map((p) => p.code)))];
  const index: PriceIndex = {};
  const BATCH = 20;

  for (let i = 0; i < codes.length; i += BATCH) {
    const slice = codes.slice(i, i + BATCH);
    const results = await Promise.all(
      slice.map(async (code) => {
        const prices = await getPrices(code);
        if (!prices || prices.length === 0) return null;
        return [code, Math.min(...prices.map((p) => p.value))] as const;
      }),
    );
    for (const r of results) if (r) index[r[0]] = r[1];
  }

  return index;
}

/** Ceny a dostupnost po velikostech. Bez nich zákazník netuší, na čem je. */
export async function getPrices(code: string): Promise<MalfiniPrice[] | null> {
  try {
    const res = await fetch(`${API}/product/${encodeURIComponent(code)}/price/CZK`, {
      next: { revalidate: CATALOG_REVALIDATE },
    });
    if (!res.ok) return null;
    const raw = await res.json();
    if (!Array.isArray(raw)) return null;

    return raw
      .map((r: Record<string, unknown>) => {
        /* `prices` je ceník podle odebraného množství — bereme první stupeň. */
        const p = ((r.prices as Record<string, unknown>[]) ?? [])[0] ?? {};
        return {
          size: cs(r.size as Localized),
          value: Number(p.value ?? 0),
          valueWithVat: Number(p.valueWithVat ?? 0),
          availability: Number(r.availability ?? 0),
        };
      })
      .filter((p: MalfiniPrice) => p.size && p.value > 0);
  } catch {
    return null;
  }
}

/** Detail jednoho produktu v konkrétní barvě. Volá se až při otevření karty. */
export async function getProductDetail(
  code: string,
  colorCode: string,
): Promise<MalfiniDetail | null> {
  try {
    const res = await fetch(
      `${API}/product/${encodeURIComponent(code)}/detail?colorCode=${encodeURIComponent(colorCode)}`,
      { next: { revalidate: CATALOG_REVALIDATE } },
    );
    if (!res.ok) return null;
    const d = await res.json();

    return {
      code: String(d.code ?? code),
      name: cs(d.name),
      subName: cs(d.subName),
      specificationHtml: cs(d.specification),
      descriptionHtml: cs(d.description),
      attributes: (d.attributes ?? [])
        .map((a: Record<string, unknown>) => ({
          title: cs(a.title as Localized),
          text: cs(a.text as Localized),
        }))
        .filter((a: MalfiniAttribute) => a.title && a.text),
      colors: (d.colors ?? []).map((c: unknown) =>
        typeof c === "string" ? c : String((c as Record<string, unknown>).code ?? ""),
      ),
      views: (d.views ?? ["a"]) as string[],
      sizeChartPdf: (d.sizeChartPdf as string) ?? null,
    };
  } catch {
    return null;
  }
}

/** Odkaz do poptávky s předvyplněným produktem. */
export function inquiryHref(product: { code: string; name: string; subName: string }, colorName?: string): string {
  const parts = [`${product.subName} ${product.name}`.trim(), `kód ${product.code}`];
  if (colorName) parts.push(`barva ${colorName}`);
  return `/kontakt?produkt=${encodeURIComponent(parts.join(", "))}#poptavka`;
}
