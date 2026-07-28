"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  PRIMARY_VIEW,
  fileUrl,
  inquiryHref,
  productImage,
  type MalfiniCatalog,
  type MalfiniDetail,
  type MalfiniPrice,
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

/** Fotka produktu — u obuvi je „a" podrážka, proto primárně „c". */
function CardImage({ product }: { product: MalfiniProduct }) {
  const color = product.colors[0] ?? "00";
  const [view, setView] = useState(PRIMARY_VIEW);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
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
}: {
  catalog: MalfiniCatalog;
  priceIndex?: PriceIndex;
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
  const [open, setOpen] = useState<MalfiniProduct | null>(null);

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

          <label className="cat__field">
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
        {catalog.groups.length > 1 && (
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
        )}

        <p className="cat__count" aria-live="polite">
          {loading
            ? "Načítám…"
            : products.length === 0
              ? "Nic neodpovídá. Zkuste jiný filtr nebo název."
              : `${products.length} ${products.length === 1 ? "produkt" : products.length < 5 ? "produkty" : "produktů"}`}
        </p>

        <div className="cat__grid">
          {shown.map((p) => (
            <button className="cat-card" key={p.code} onClick={() => setOpen(p)}>
              <span className="cat-card__img">
                <CardImage product={p} />
              </span>
              <span className="cat-card__body">
                <span className="cat-card__sub">{p.subName}</span>
                <span className="cat-card__name">{p.name}</span>
                <span className="cat-card__meta">
                  kód {p.code} · {p.colors.length}&nbsp;
                  {p.colors.length === 1 ? "barva" : p.colors.length < 5 ? "barvy" : "barev"}
                </span>
                {priceIndex[p.code] != null && (
                  <span className="cat-card__price">od {czk.format(priceIndex[p.code])} bez DPH</span>
                )}
              </span>
            </button>
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

      {open && <ProductModal product={open} colors={catalog.colors} onClose={() => setOpen(null)} />}
    </div>
  );
}

function ProductModal({
  product,
  colors,
  onClose,
}: {
  product: MalfiniProduct;
  colors: MalfiniCatalog["colors"];
  onClose: () => void;
}) {
  const [color, setColor] = useState(product.colors[0] ?? "00");
  const [view, setView] = useState(PRIMARY_VIEW);
  const [detail, setDetail] = useState<MalfiniDetail | null>(null);
  const [prices, setPrices] = useState<MalfiniPrice[] | null>(null);
  const [failed, setFailed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Zavření Escapem + zámek scrollu pod modálem. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [onClose]);

  useEffect(() => {
    let alive = true;
    setDetail(null);
    setFailed(false);
    fetch(`/api/katalog?code=${encodeURIComponent(product.code)}&color=${encodeURIComponent(color)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: MalfiniDetail) => {
        if (!alive) return;
        setDetail(d);
        setView(d.views?.[0] ?? PRIMARY_VIEW);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [product.code, color]);

  /* Ceny jsou na produkt, ne na barvu — načítáme je jen jednou. */
  useEffect(() => {
    let alive = true;
    setPrices(null);
    fetch(`/api/katalog/ceny?code=${encodeURIComponent(product.code)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((p: MalfiniPrice[]) => alive && setPrices(p))
      .catch(() => alive && setPrices([]));
    return () => {
      alive = false;
    };
  }, [product.code]);

  const colorName = colors[color]?.name ?? "";
  const from = prices && prices.length > 0 ? Math.min(...prices.map((p) => p.value)) : null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={`${product.subName} ${product.name}`}>
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__panel">
        <button ref={closeRef} className="modal__close" onClick={onClose} aria-label="Zavřít">
          ✕
        </button>

        <div className="modal__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={productImage(product.code, color, view, 900)}
            alt={`${product.subName} ${product.name} — ${colorName}`}
            width={900}
            height={900}
          />
          {detail && detail.views.length > 1 && (
            <div className="modal__views">
              {detail.views.map((v) => (
                <button
                  key={v}
                  className={`modal__view${v === view ? " is-on" : ""}`}
                  onClick={() => setView(v)}
                  aria-label={`Pohled ${v.toUpperCase()}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={productImage(product.code, color, v, 120)} alt="" width={120} height={120} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal__copy">
          <span className="eyebrow">{product.subName}</span>
          <h2 className="h2">{product.name}</h2>
          <p className="modal__code">
            Kód produktu <strong>{product.code}</strong>
            {colorName && <> · barva {colorName}</>}
          </p>

          {from !== null && (
            <p className="modal__price">
              od <strong>{czk.format(from)}</strong> bez DPH / kus
              <span className="modal__price-note">samotný textil, bez potisku</span>
            </p>
          )}

          <div className="modal__colors">
            <span className="modal__label">Barvy ({product.colors.length})</span>
            <div className="modal__swatches">
              {product.colors.map((c) => (
                <button
                  key={c}
                  className={`modal__swatch${c === color ? " is-on" : ""}`}
                  onClick={() => setColor(c)}
                  title={colors[c]?.name ?? c}
                  aria-label={colors[c]?.name ?? c}
                  aria-pressed={c === color}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={productImage(product.code, c, PRIMARY_VIEW, 80)}
                    alt=""
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {prices && prices.length > 0 && (
            <div className="modal__sizes">
              <span className="modal__label">Velikosti, ceny a sklad</span>
              <div className="modal__table-wrap">
                <table className="modal__table">
                  <thead>
                    <tr>
                      <th>Velikost</th>
                      <th>Bez DPH</th>
                      <th>S DPH</th>
                      <th>Skladem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices.map((p) => (
                      <tr key={p.size}>
                        <td>{p.size}</td>
                        <td>{czk.format(p.value)}</td>
                        <td>{czk.format(p.valueWithVat)}</td>
                        <td>{p.availability > 0 ? `${p.availability.toLocaleString("cs-CZ")} ks` : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {failed && <p className="modal__note">Podrobnosti se teď nepodařilo načíst — kód produktu ale platí.</p>}

          {detail && (
            <>
              {detail.attributes.length > 0 && (
                <ul className="modal__attrs">
                  {detail.attributes.slice(0, 6).map((a) => (
                    <li key={a.title}>
                      <strong>{a.title}</strong>
                      <span>{a.text}</span>
                    </li>
                  ))}
                </ul>
              )}
              {detail.specificationHtml && (
                <div className="modal__rte" dangerouslySetInnerHTML={{ __html: detail.specificationHtml }} />
              )}
              {detail.descriptionHtml && (
                <div className="modal__rte" dangerouslySetInnerHTML={{ __html: detail.descriptionHtml }} />
              )}
              {detail.sizeChartPdf && (
                <p className="modal__note">
                  <a href={fileUrl(detail.sizeChartPdf)} target="_blank" rel="noopener">
                    Tabulka velikostí (PDF){" "}
                    <span className="arr" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </p>
              )}
            </>
          )}

          <div className="modal__cta">
            <Link href={inquiryHref(product, colorName)} className="btn btn--solid">
              Přidat do poptávky
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
