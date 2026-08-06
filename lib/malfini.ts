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

/** Značka produktu podle kódu, např. „MALFINI®" nebo „RIMECK®". */
export type BrandIndex = Record<string, string>;

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
 * Kód, jak ho chce API. Na kartě produktu svítí velkými („F29"), jenže ceník
 * i detail rozumí jen malému tvaru — `seoName`, což je vždycky totéž malými.
 * S velkým kódem ceník vrátí chybu, ne prázdno; proto to dřív u ~160 produktů
 * vypadalo, že cenu prostě nemají. Totéž platí pro kódy barev („a1" vs „A1").
 */
const apiCode = (code: string): string => code.toLowerCase();

/**
 * Spustí úkoly s omezenou souběžností. `Promise.all` po dávkách čeká vždy na
 * nejpomalejší kus dávky — u tří tisíc požadavků na ceník je to znát.
 */
async function pool<T>(items: readonly T[], limit: number, run: (item: T) => Promise<void>) {
  let next = 0;
  const worker = async () => {
    while (next < items.length) await run(items[next++]);
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
}

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
 * Nejnižší cena každého produktu — tedy nejlevnější velikost té nejlevnější
 * barvy. Ceník je po barvách a rozdíly nejsou drobné (u trika Basic stojí
 * bordó 85,80 Kč, bílá 87,28 Kč a zbytek 95,34 Kč), takže „od" nejde spočítat
 * z jedné barvy — musí se projít všechny.
 *
 * API filtr podle ceny nemá — nemá ho ani původní katalog dodavatele — takže
 * podle tohohle indexu filtrujeme na klientovi. Přes tři tisíce kombinací
 * produkt+barva se souběžností 24 stáhne za ~50 s a drží se v cache stejně
 * dlouho jako katalog, takže návštěvník na to nikdy nečeká.
 */
export async function getPriceIndex(catalog: MalfiniCatalog): Promise<PriceIndex> {
  const seen = new Set<string>();
  const pairs: { code: string; color: string }[] = [];
  for (const g of catalog.groups) {
    for (const p of g.products) {
      for (const color of p.colors) {
        const key = `${p.code}|${color}`;
        if (seen.has(key)) continue;
        seen.add(key);
        pairs.push({ code: p.code, color });
      }
    }
  }

  const index: PriceIndex = {};
  await pool(pairs, 24, async ({ code, color }) => {
    const prices = await getPrices(code, color);
    if (!prices || prices.length === 0) return;
    const min = Math.min(...prices.map((p) => p.value));
    if (index[code] == null || min < index[code]) index[code] = min;
  });

  return index;
}

/**
 * Značka každého produktu podle kódu. V seznamu produktů ji API nevrací —
 * ani v detailu — zná ji jen jako filtr. Projdeme tedy katalog jednou za
 * každou značku a poskládáme index sami. Značek je jednotky, takže je to
 * pár požadavků navíc; drží se v cache stejně dlouho jako katalog.
 */
export async function getBrandIndex(catalog: MalfiniCatalog): Promise<BrandIndex> {
  const znacky = catalog.facets.find((f) => f.code === "trademark")?.options ?? [];
  const index: BrandIndex = {};

  const casti = await Promise.all(
    znacky.map(async (z) => {
      const c = await getCatalog({ trademark: z.code });
      if (!c) return null;
      return [z.name, c.groups.flatMap((g) => g.products.map((p) => p.code))] as const;
    }),
  );

  for (const cast of casti) {
    if (!cast) continue;
    const [nazev, kody] = cast;
    for (const kod of kody) index[kod] = nazev;
  }

  return index;
}

/**
 * Ceny a dostupnost po velikostech pro jednu barvu. Bez nich zákazník netuší,
 * na čem je. Barva je povinná schválně: ceník je po barvách a bez ní vrátí
 * API ceny první barvy v řadě — tedy skoro vždy něčeho jiného, než co má
 * zákazník na obrazovce.
 */
export async function getPrices(code: string, colorCode: string): Promise<MalfiniPrice[] | null> {
  try {
    const res = await fetch(
      `${API}/product/${encodeURIComponent(apiCode(code))}/price/CZK?colorCode=${encodeURIComponent(apiCode(colorCode))}`,
      {
        next: { revalidate: CATALOG_REVALIDATE },
      },
    );
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
      `${API}/product/${encodeURIComponent(apiCode(code))}/detail?colorCode=${encodeURIComponent(apiCode(colorCode))}`,
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
      /* Detail posílá u barvy `code` velkými („A1") — jenže ceník i slovník
         barev znají jen malý tvar `seoName`. Sjednocujeme na něj. */
      colors: (d.colors ?? []).map((c: unknown) =>
        typeof c === "string"
          ? apiCode(c)
          : apiCode(
              String(
                (c as Record<string, unknown>).seoName ?? (c as Record<string, unknown>).code ?? "",
              ),
            ),
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

export const CATALOG_PATH = "/reklama/reklamni-textil/katalog-malfini";

/**
 * Vlastní adresa produktu — aby šel výběr poslat kolegovi nebo nám do poptávky.
 * Barva je v ní schválně: ceny se po barvách liší, takže odkaz bez ní by
 * ukazoval něco jiného, než co odesílatel viděl. Tvar kopíruje katalog
 * dodavatele (kód/barva), protože kódy jsou stabilní — názvy se přejmenovávají.
 */
export function productPath(code: string, colorCode?: string): string {
  const base = `${CATALOG_PATH}/${apiCode(code)}`;
  return colorCode ? `${base}/${apiCode(colorCode)}` : base;
}

/** Vše, co potřebuje stránka i modál produktu — poskládané na serveru. */
export type ProductPage = {
  product: MalfiniProduct;
  colors: Record<string, MalfiniColor>;
  brand?: string;
  /** Barva, kterou stránka opravdu ukazuje — z adresy, nebo první v řadě. */
  color: string;
  detail: MalfiniDetail | null;
  prices: MalfiniPrice[] | null;
};

/**
 * Produkt podle kódu z adresy. Katalog, značky i ceny jsou v cache, takže je
 * to prakticky zdarma — a data jdou rovnou do HTML, ne až po doběhnutí JS.
 * Vrací null, když kód nesedí; stránka na to odpoví 404.
 */
export async function getProductPage(code: string, colorCode?: string): Promise<ProductPage | null> {
  const catalog = await getCatalog();
  if (!catalog) return null;

  const wanted = apiCode(code);
  const product = catalog.groups
    .flatMap((g) => g.products)
    .find((p) => apiCode(p.code) === wanted);
  if (!product) return null;

  /* Barvu z adresy bereme jen tehdy, když ji produkt opravdu má — jinak by
     ceník i fotka byly prázdné. */
  const asked = colorCode ? apiCode(colorCode) : "";
  const color = asked && product.colors.includes(asked) ? asked : (product.colors[0] ?? "");

  const [brands, detail, prices] = await Promise.all([
    getBrandIndex(catalog),
    getProductDetail(product.code, color),
    getPrices(product.code, color),
  ]);

  return { product, colors: catalog.colors, brand: brands[product.code], color, detail, prices };
}
