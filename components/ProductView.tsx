"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { replaceUrl } from "@/lib/katalog-url";
import {
  PRIMARY_VIEW,
  fileUrl,
  inquiryHref,
  productImage,
  productPath,
  type MalfiniColor,
  type MalfiniDetail,
  type MalfiniPrice,
  type MalfiniProduct,
} from "@/lib/malfini";

const czk = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
  maximumFractionDigits: 0,
});

type Loaded = { detail: MalfiniDetail | null; prices: MalfiniPrice[] | null };

/**
 * Tělo produktu — fotky, barvy, ceník, parametry. Stejné v modálu nad mřížkou
 * i na samostatné stránce; liší se jen rám okolo.
 *
 * Data pro výchozí barvu chodí ze serveru (`initial*`), takže stránka je má
 * rovnou v HTML. Přepnutí barvy se dotahuje na klientovi — je to jeden malý
 * JSON místo překreslení celé stránky, a než by doběhla navigace, je barva
 * dávno vidět. Jednou stažená barva se drží v paměti, návrat k ní je okamžitý.
 */
export function ProductView({
  product,
  colors,
  brand,
  initialColor,
  initialDetail,
  initialPrices,
  /* V modálu je nadpisem stránky pořád katalog, na vlastní stránce produkt. */
  heading: Title = "h2",
}: {
  product: MalfiniProduct;
  colors: Record<string, MalfiniColor>;
  /** Značka produktu — API ji v detailu nevrací, chodí z indexu. */
  brand?: string;
  initialColor: string;
  initialDetail?: MalfiniDetail | null;
  initialPrices?: MalfiniPrice[] | null;
  heading?: "h1" | "h2";
}) {
  const [color, setColor] = useState(initialColor);
  const [view, setView] = useState(initialDetail?.views?.[0] ?? PRIMARY_VIEW);
  const [detail, setDetail] = useState<MalfiniDetail | null>(initialDetail ?? null);
  const [prices, setPrices] = useState<MalfiniPrice[] | null>(initialPrices ?? null);
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);

  const cache = useRef<Map<string, Loaded> | null>(null);
  if (cache.current === null) {
    cache.current = new Map();
    if (initialDetail !== undefined) {
      cache.current.set(initialColor, { detail: initialDetail, prices: initialPrices ?? null });
    }
  }

  useEffect(() => {
    const hit = cache.current?.get(color);
    if (hit) {
      setDetail(hit.detail);
      setPrices(hit.prices);
      setView(hit.detail?.views?.[0] ?? PRIMARY_VIEW);
      setFailed(false);
      return;
    }

    let alive = true;
    setDetail(null);
    setPrices(null);
    setFailed(false);
    setView(PRIMARY_VIEW);

    const q = `code=${encodeURIComponent(product.code)}&color=${encodeURIComponent(color)}`;
    Promise.all([
      fetch(`/api/katalog?${q}`).then((r) => (r.ok ? r.json() : null)),
      fetch(`/api/katalog/ceny?${q}`).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([d, p]: [MalfiniDetail | null, MalfiniPrice[] | null]) => {
        if (!alive) return;
        cache.current?.set(color, { detail: d, prices: p });
        setDetail(d);
        setPrices(p);
        setView(d?.views?.[0] ?? PRIMARY_VIEW);
        setFailed(!d);
      })
      .catch(() => alive && setFailed(true));

    return () => {
      alive = false;
    };
  }, [color, product.code]);

  /* Adresa musí ukazovat na barvu, kterou má návštěvník před sebou — jinak by
     zkopírovaný odkaz vedl na jinou cenu. `replaceState` schválně: 48 barev
     by v historii znamenalo 48 kroků zpátky, než se člověk vrátí do katalogu. */
  useEffect(() => {
    const path = productPath(product.code, color);
    if (window.location.pathname !== path) replaceUrl(path);
    setCopied(false);
  }, [product.code, color]);

  const colorName = colors[color]?.name ?? "";
  const from = prices && prices.length > 0 ? Math.min(...prices.map((p) => p.value)) : null;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}${productPath(product.code, color)}`,
      );
      setCopied(true);
    } catch {
      /* Bez schránky (starší prohlížeč, http) zbývá adresní řádek — ten je správně. */
    }
  };

  return (
    <>
      <div className="prod__media">
        {/* Fotka potřebuje vlastní světlou plochu, na které splyne její bílé
            pozadí. Nestačí ji dát obrázku — multiply se míchá s tím, co je
            pod ním, ne s jeho vlastním pozadím. */}
        <span className="prod__stage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={productImage(product.code, color, view, 900)}
            alt={`${product.subName} ${product.name} — ${colorName}`}
            width={900}
            height={900}
          />
        </span>
        {detail && detail.views.length > 1 && (
          <div className="prod__views">
            {detail.views.map((v) => (
              <button
                key={v}
                className={`prod__view${v === view ? " is-on" : ""}`}
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

      <div className="prod__copy">
        <span className="eyebrow">{product.subName}</span>
        <Title className="h2 prod__title">{product.name}</Title>
        <p className="prod__code">
          {brand && <>{brand} · </>}
          kód produktu <strong>{product.code}</strong>
          {colorName && <> · barva {colorName}</>}
        </p>

        {from !== null && (
          <p className="prod__price">
            od <strong>{czk.format(from)}</strong> bez DPH / kus
            <span className="prod__price-note">
              {colorName ? `samotný textil bez potisku, barva ${colorName}` : "samotný textil, bez potisku"}
            </span>
          </p>
        )}

        <div className="prod__colors">
          <span className="prod__label">Barvy ({product.colors.length})</span>
          <div className="prod__swatches">
            {product.colors.map((c) => (
              <button
                key={c}
                className={`prod__swatch${c === color ? " is-on" : ""}`}
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
          {product.colors.length > 1 && (
            <p className="prod__colors-note">Ceny se podle barvy liší — tabulka platí pro vybranou.</p>
          )}
        </div>

        {prices && prices.length > 0 && (
          <div className="prod__sizes">
            <span className="prod__label">Velikosti, ceny a sklad</span>
            <div className="prod__table-wrap">
              <table className="prod__table">
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

        {failed && <p className="prod__note">Podrobnosti se teď nepodařilo načíst — kód produktu ale platí.</p>}

        {detail && (
          <>
            {detail.attributes.length > 0 && (
              <ul className="prod__attrs">
                {/* Titulek se opakuje (dodavatel posílá „Materiálové složení"
                    víckrát), takže sám o sobě není jedinečný klíč. */}
                {detail.attributes.slice(0, 6).map((a, i) => (
                  <li key={`${a.title}-${i}`}>
                    <strong>{a.title}</strong>
                    <span>{a.text}</span>
                  </li>
                ))}
              </ul>
            )}
            {detail.specificationHtml && (
              <div className="prod__rte" dangerouslySetInnerHTML={{ __html: detail.specificationHtml }} />
            )}
            {detail.descriptionHtml && (
              <div className="prod__rte" dangerouslySetInnerHTML={{ __html: detail.descriptionHtml }} />
            )}
            {detail.sizeChartPdf && (
              <p className="prod__note">
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

        <div className="prod__cta">
          <Link href={inquiryHref(product, colorName)} className="btn btn--solid">
            Přidat do poptávky
          </Link>
          {/* Odkaz vede přesně na tenhle produkt v téhle barvě — ať jde výběr
              poslat kolegovi nebo rovnou nám, bez opisování kódů. */}
          <button className="prod__share" onClick={copyLink}>
            {copied ? "Odkaz zkopírován" : "Zkopírovat odkaz"}
          </button>
        </div>
      </div>
    </>
  );
}
