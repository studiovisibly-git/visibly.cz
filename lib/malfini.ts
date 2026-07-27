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

export type MalfiniCatalog = {
  groups: MalfiniGroup[];
  colors: Record<string, MalfiniColor>;
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

/** URL fotky produktu. `view` je pohled (a/b/c/e…), `width` šířka v px. */
export function productImage(code: string, colorCode: string, view = "a", width = 640): string {
  return `${HOST}/image/product/${code}/${code}_${colorCode}_${view}~w${width}.jpg`;
}

/** Odkaz na PDF (tabulka velikostí apod.). */
export function fileUrl(path: string): string {
  return `${HOST}/file/${path}`;
}

/** Celý katalog — skupiny, produkty a číselník barev. */
export async function getCatalog(): Promise<MalfiniCatalog | null> {
  try {
    const res = await fetch(`${API}/product`, { next: { revalidate: CATALOG_REVALIDATE } });
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
      .filter((g: MalfiniGroup) => g.products.length > 0);

    const colors: Record<string, MalfiniColor> = {};
    for (const [code, c] of Object.entries<Record<string, unknown>>(raw.color ?? {})) {
      if (c?.isValid === false) continue;
      colors[code] = { code, name: cs(c.name as Localized) };
    }

    return { groups, colors };
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
