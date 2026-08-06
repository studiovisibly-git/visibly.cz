"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  PRIMARY_VIEW,
  productImage,
  productPath,
  type MalfiniCatalog,
  type BrandIndex,
  type MalfiniProduct,
  type PriceIndex,
} from "@/lib/malfini";

/** Kolik produktů ukázat, než si uživatel řekne o víc. */
const PAGE = 24;

const czk = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
  maximumFractionDigits: 0,
});

/** Cenová pásma — API filtr podle ceny nemá, filtrujeme podle vlastního indexu. */
const PRICE_BANDS = [
  { code: "", label: "Libovolná" },
  { code: "0-150", label: "do 150 Kč", max: 150 },
  { code: "150-300", label: "150–300 Kč", min: 150, max: 300 },
  { code: "300-600", label: "300–600 Kč", min: 300, max: 600 },
  { code: "600-", label: "nad 600 Kč", min: 600 },
] as const;

/**
 * Barva, kterou karta ukazuje. Když je zvolený filtr barvy a produkt ji má,
 * ukážeme rovnou tu — jinak by karta lákala na bílé tričko, které jste si
 * nevybrali. Stejná barva pak vede i v odkazu, ať otevřený produkt vypadá
 * jako to, na co člověk klikl.
 */
const cardColor = (product: MalfiniProduct, preferColor?: string) =>
  preferColor && product.colors.includes(preferColor) ? preferColor : (product.colors[0] ?? "00");

/** Fotka produktu. U obuvi je „a" podrážka, proto primárně „c". */
function CardImage({ product, color }: { product: MalfiniProduct; color: string }) {
  const [view, setView] = useState(PRIMARY_VIEW);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={color}
      src={productImage(product.code, color, view, 480)}
      alt={`${product.subName} ${product.name}`}
      loading="lazy"
      width={480}
      height={480}
      onError={() => view === PRIMARY_VIEW && setView("a")}
    />
  );
}

export function CatalogBrowser({
  catalog: initial,
  priceIndex = {},
  brandIndex = {},
}: {
  catalog: MalfiniCatalog;
  priceIndex?: PriceIndex;
  brandIndex?: BrandIndex;
}) {
  const [catalog, setCatalog] = useState(initial);
  const [category, setCategory] = useState("");
  const [trademark, setTrademark] = useState("");
  const [color, setColor] = useState("");
  const [band, setBand] = useState("");
  const [loading, setLoading] = useState(false);

  const [group, setGroup] = useState(initial.groups[0]?.name ?? "");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE);

  /* Kategorii, značku i barvu umí odfiltrovat jen API — seznam produktů tyhle
     údaje neobsahuje. Při změně proto natáhneme nová data. */
  useEffect(() => {
    if (!category && !trademark && !color) {
      setCatalog(initial);
      setGroup((g) => (initial.groups.some((x) => x.name === g) ? g : (initial.groups[0]?.name ?? "")));
      return;
    }
    let alive = true;
    setLoading(true);
    const qs = new URLSearchParams();
    if (category) qs.set("category", category);
    if (trademark) qs.set("trademark", trademark);
    if (color) qs.set("color", color);

    fetch(`/api/katalog/produkty?${qs}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((c: MalfiniCatalog) => {
        if (!alive) return;
        setCatalog(c);
        setGroup((g) => (c.groups.some((x) => x.name === g) ? g : (c.groups[0]?.name ?? "")));
        setLimit(PAGE);
      })
      .catch(() => alive && setCatalog({ ...initial, groups: [] }))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [category, trademark, color, initial]);

  const facet = (code: string) =>
    catalog.facets.find((f) => f.code === code) ?? initial.facets.find((f) => f.code === code);
  const categories = facet("category")?.options ?? [];
  const brands = facet("trademark")?.options ?? [];
  const colorOptions = facet("color")?.options ?? [];

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    let base = q
      ? catalog.groups.flatMap((g) => g.products)
      : (catalog.groups.find((g) => g.name === group)?.products ?? []);

    if (q) {
      base = base.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subName.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q),
      );
    }

    const b = PRICE_BANDS.find((x) => x.code === band);
    if (b && band) {
      base = base.filter((p) => {
        const price = priceIndex[p.code];
        if (price == null) return false;
        if ("min" in b && b.min != null && price < b.min) return false;
        if ("max" in b && b.max != null && price >= b.max) return false;
        return true;
      });
    }

    return base;
  }, [catalog, group, query, band, priceIndex]);

  const shown = products.slice(0, limit);
  const active = Boolean(category || trademark || color || band || query);

  const reset = () => {
    setCategory("");
    setTrademark("");
    setColor("");
    setBand("");
    setQuery("");
    setLimit(PAGE);
  };

  return (
    <div className="cat">
      {/* Filtry vlevo, při scrollu se přilepí — mřížka je vedle. */}
      <aside className="cat__side">
        <div className="cat__side-inner">
          <div className="cat__side-head">
            <span className="cat__side-title">Filtry</span>
            {active && (
              <button className="cat__reset" onClick={reset}>
                Zrušit
              </button>
            )}
          </div>

          {catalog.groups.length > 1 && (
            <div className="cat__field cat__field--wide">
              <span>Komu</span>
              <div className="cat__tabs" role="tablist" aria-label="Skupiny produktů">
                {catalog.groups.map((g) => (
                  <button
                    key={g.name}
                    role="tab"
                    aria-selected={!query && g.name === group}
                    className={`cat__tab${!query && g.name === group ? " is-on" : ""}`}
                    onClick={() => {
                      setGroup(g.name);
                      setQuery("");
                      setLimit(PAGE);
                    }}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <label className="cat__field cat__field--wide">
            <span>Hledat</span>
            <input
              type="search"
              placeholder="Název nebo kód"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(PAGE);
              }}
            />
          </label>

          <label className="cat__field">
            <span>Typ oblečení</span>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setQuery("");
                setLimit(PAGE);
              }}
            >
              <option value="">Vše</option>
              {categories.map((o) => (
                <option key={o.code} value={o.code}>
                  {o.name}
                </option>
              ))}
            </select>
          </label>

          <label className="cat__field">
            <span>Značka</span>
            <select
              value={trademark}
              onChange={(e) => {
                setTrademark(e.target.value);
                setQuery("");
                setLimit(PAGE);
              }}
            >
              <option value="">Všechny</option>
              {brands.map((o) => (
                <option key={o.code} value={o.code}>
                  {o.name}
                </option>
              ))}
            </select>
          </label>

          <label className="cat__field">
            <span>Barva</span>
            <select
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                setQuery("");
                setLimit(PAGE);
              }}
            >
              <option value="">Všechny</option>
              {colorOptions.map((o) => (
                <option key={o.code} value={o.code}>
                  {o.name}
                </option>
              ))}
            </select>
          </label>

          <label className="cat__field">
            <span>Cena za kus</span>
            <select
              value={band}
              onChange={(e) => {
                setBand(e.target.value);
                setLimit(PAGE);
              }}
            >
              {PRICE_BANDS.map((b) => (
                <option key={b.code} value={b.code}>
                  {b.label}
                </option>
              ))}
            </select>
            <small className="cat__hint">Bez DPH, samotný textil bez potisku.</small>
          </label>
        </div>
      </aside>

      <div className="cat__main">
        <p className="cat__count" aria-live="polite">
          {loading
            ? "Načítám…"
            : products.length === 0
              ? "Nic neodpovídá. Zkuste jiný filtr nebo název."
              : `${products.length} ${products.length === 1 ? "produkt" : products.length < 5 ? "produkty" : "produktů"}`}
        </p>

        <div className="cat__grid">
          {shown.map((p) => (
            /* Karta je odkaz na vlastní adresu produktu — jde zkopírovat,
               otevřít na nové kartě i poslat dál. Z mřížky se přesto otevře
               v modálu: tu adresu zachytává souběžná trasa vedle.
               Bez prefetch — na obrazovce jich je pořád 24 a každá by jinak
               při načtení sáhla na ceník dodavatele. */
            <Link
              className="cat-card"
              key={p.code}
              href={productPath(p.code, cardColor(p, color))}
              prefetch={false}
              /* Modál je fixní přes celou obrazovku, takže skok na začátek
                 stránky není vidět — zato po zavření by člověk skončil na
                 začátku mřížky místo u karty, ze které vyšel. */
              scroll={false}
            >
              <span className="cat-card__img">
                <CardImage product={p} color={cardColor(p, color)} />
              </span>
              <span className="cat-card__body">
                <span className="cat-card__sub">{p.subName}</span>
                <span className="cat-card__name">{p.name}</span>
                {/* Značka vede řádek s kódem — přibyde údaj, ne další řádek.
                    Rozlišuje kvalitativní řady, takže patří k rozhodování. */}
                <span className="cat-card__meta">
                  {brandIndex[p.code] && <>{brandIndex[p.code]} · </>}
                  kód {p.code} · {p.colors.length}&nbsp;
                  {p.colors.length === 1 ? "barva" : p.colors.length < 5 ? "barvy" : "barev"}
                </span>
                {priceIndex[p.code] != null && (
                  <span className="cat-card__price">od {czk.format(priceIndex[p.code])} bez DPH</span>
                )}
              </span>
            </Link>
          ))}
        </div>

        {limit < products.length && (
          <div className="cat__more">
            <button className="btn" onClick={() => setLimit((l) => l + PAGE * 2)}>
              Zobrazit další produkty
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
