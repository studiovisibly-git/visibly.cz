import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductView } from "@/components/ProductView";
import { Band } from "@/components/Sections";
import {
  CATALOG_PATH,
  PRIMARY_VIEW,
  getProductPage,
  productImage,
  productPath,
  type ProductPage,
} from "@/lib/malfini";
import { buildMetadata } from "@/lib/seo";
import { INQUIRY_URL } from "@/lib/site";

/**
 * Produkt z katalogu na vlastní adrese — `…/katalog-malfini/129/13`.
 *
 * Existuje kvůli sdílení: z mřížky se produkt otevírá v modálu (zachycená
 * trasa vedle), ale adresa je pořád tahle, takže jde zkopírovat a poslat.
 * Kdo ji otevře napřímo nebo obnoví stránku, dostane rovnou tuhle stránku.
 *
 * Barva je součástí adresy schválně — ceny se po barvách liší, takže odkaz
 * bez ní by ukazoval jiné číslo, než jaké odesílatel viděl.
 */
export const revalidate = 43200;

type Params = { kod: string; barva?: string[] };

const czk = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
  maximumFractionDigits: 0,
});

/** Adresa je platná jen ve tvaru kód nebo kód/barva — nic delšího. */
async function load(params: Promise<Params>): Promise<ProductPage | null> {
  const { kod, barva } = await params;
  if (barva && barva.length > 1) return null;
  return getProductPage(kod, barva?.[0]);
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const data = await load(params);
  if (!data) return {};

  const { product, color, colors, prices } = data;
  const colorName = colors[color]?.name ?? "";
  const from = prices && prices.length > 0 ? Math.min(...prices.map((p) => p.value)) : null;
  const nazev = `${product.subName} ${product.name}`.trim();

  return buildMetadata({
    title: `${nazev}${colorName ? ` — ${colorName}` : ""} | Katalog textilu Visibly`,
    description:
      `${nazev}, kód ${product.code}${colorName ? `, barva ${colorName}` : ""}. ` +
      `${from !== null ? `Od ${czk.format(from)} bez DPH za kus, samotný textil bez potisku. ` : ""}` +
      "Potisk doporučíme a naceníme.",
    path: productPath(product.code, color),
    /* Do náhledu při sdílení patří ta barva, na kterou odkaz vede. */
    image: productImage(product.code, color, PRIMARY_VIEW, 1200),
    /* Obsah je katalog dodavatele — do vyhledávače patří naše stránky o potisku,
       ne tisíce cizích produktových karet. Odkazy dovnitř webu ale platí. */
    noindex: true,
  });
}

export default async function ProduktPage({ params }: { params: Promise<Params> }) {
  const data = await load(params);
  if (!data) notFound();

  const { product, colors, brand, color, detail, prices } = data;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Reklama", href: "/reklama" },
          { label: "Reklamní textil", href: "/reklama/reklamni-textil" },
          { label: "Online katalog", href: CATALOG_PATH },
          { label: product.name, href: productPath(product.code, color) },
        ]}
      />

      <section className="section--tight container container--wide">
        <Link href={CATALOG_PATH} className="prod-back">
          ← Zpět do katalogu
        </Link>

        <div className="prod prod--page">
          <ProductView
            product={product}
            colors={colors}
            brand={brand}
            initialColor={color}
            initialDetail={detail}
            initialPrices={prices}
            heading="h1"
          />
        </div>

        <p className="catalog__source">
          Produktová data a fotografie: <strong>MALFINI®</strong>, značka a dodavatel textilu,
          se kterým dlouhodobě pracujeme. Sortiment, ceny i dostupnost se řídí jeho katalogem.
          Potisk, kalkulaci a předání zajišťuje Visibly.
        </p>
      </section>

      <section className="section--tight container">
        <Band
          eyebrow="Máte vybráno?"
          title="Pošlete nám kód produktu a počty."
          text="Doporučíme vhodný způsob potisku a připravíme přesnou kalkulaci."
          cta={{ label: "Poslat výběr", href: INQUIRY_URL }}
        />
      </section>
    </>
  );
}
