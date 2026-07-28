import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { Hero } from "@/components/Hero";
import { Band, Directory, Process, SectionHead } from "@/components/Sections";
import { getCatalog, getPriceIndex } from "@/lib/malfini";
import { buildMetadata } from "@/lib/seo";
import { INQUIRY_URL } from "@/lib/site";

/** Původní katalog dodavatele — záloha, kdyby jeho API přestalo odpovídat. */
const CATALOG_DIRECT = "https://onlinecatalog.malfini.com/visibly.cz/cs/catalog";

/* Data se přegenerují dvakrát denně (12 h) — sortiment se mění po sezónách.
   Next vyžaduje číselný literál, proto tu není konstanta z lib/malfini. */
export const revalidate = 43200;

export const metadata = buildMetadata({
  title: "Katalog firemního textilu k potisku | Visibly Opava",
  description:
    "Katalog trik, mikin, polokošil a pracovního oblečení k potisku — přes 390 modelů. Vyberte střih a barvu, potisk doporučíme a naceníme.",
  path: "/reklama/reklamni-textil/katalog-malfini",
});

export default async function KatalogMalfiniPage() {
  const catalog = await getCatalog();
  /* Ceny se tahají po produktech (API nemá hromadný endpoint ani filtr ceny).
     Stavíme je jednou při generování stránky — pak jsou v ceníku na kartách
     i ve filtru okamžitě. */
  const priceIndex = catalog ? await getPriceIndex(catalog) : {};

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Reklama", href: "/reklama" },
          { label: "Reklamní textil", href: "/reklama/reklamni-textil" },
          { label: "Online katalog", href: "/reklama/reklamni-textil/katalog-malfini" },
        ]}
      />

      <Hero
        variant="media"
        displayClass="display-l"
        eyebrow="Reklamní textil · Katalog"
        title="Katalog firemního textilu."
        media={{
          label: "Tričko z katalogu",
          variant: "circle",
          src: "https://onlinecatalog.malfini.com/image/product/819/819_96_C~w900.jpg",
          alt: "Tričko ze sortimentu MALFINI k potisku",
          blend: true,
        }}
        sub="Trička, mikiny, polokošile i pracovní oblečení ze sortimentu MALFINI®. Vyberte střih a barvu, potisk doporučíme a naceníme my."
        note="Klikněte na produkt — ukážeme fotky, barvy i materiál. Ceny jsou bez potisku."
        primary={{ label: "Nechat nacenit potisk", href: INQUIRY_URL }}
        scroll={{ label: "Prohlédnout katalog", href: "#katalog" }}
      />

      <section className="section--tight container container--wide" id="katalog">
        {catalog ? (
          <CatalogBrowser catalog={catalog} priceIndex={priceIndex} />
        ) : (
          /* Záloha, kdyby API dodavatele neodpovědělo — ať stránka neskončí prázdná. */
          <div className="catalog">
            <p className="catalog__note">
              Katalog se teď nepodařilo načíst.{" "}
              <a href={CATALOG_DIRECT} target="_blank" rel="noopener">
                Otevřít katalog u dodavatele{" "}
                <span className="arr" aria-hidden="true">
                  ↗
                </span>
              </a>
            </p>
          </div>
        )}

        {/* Zdroj dat a fotografií přiznáváme — katalog i snímky jsou MALFINI®. */}
        <p className="catalog__source">
          Produktová data a fotografie: <strong>MALFINI®</strong>, značka a dodavatel textilu,
          se kterým dlouhodobě pracujeme. Sortiment i dostupnost se řídí jejich katalogem —{" "}
          <a href={CATALOG_DIRECT} target="_blank" rel="noopener">
            zobrazit původní katalog{" "}
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </a>
          . Potisk, kalkulaci a předání zajišťuje Visibly.
        </p>
      </section>

      <section className="section--tight container">
        <Band
          eyebrow="Máte vybráno?"
          title="Pošlete nám kód produktu a počty."
          text="Doporučíme vhodný způsob potisku a připravíme přesnou kalkulaci."
          cta={{ label: "Poslat výběr", href: INQUIRY_URL }}
        />
      </section>

      <section className="section section--rule container">
        <SectionHead
          title="Od výběru v katalogu po oblečený tým."
          text="Katalog je jen první krok — zbytek už je na nás."
          indent={1}
        />
        <Process
          steps={[
            { title: "Vyberete v katalogu", text: "Střih, barvu a velikosti. Poznamenejte si kód produktu." },
            { title: "Pošlete nám výběr", text: "Kód, počty kusů a logo nebo motiv k potisku." },
            { title: "Doporučíme potisk", text: "Podle počtu kusů, motivu a nasazení textilu." },
            { title: "Vyrobíme a předáme", text: "Potisk u nás v Opavě, hotové vyzvednete nebo dovezeme." },
          ]}
        />
      </section>

      <section className="section section--rule container">
        <SectionHead title="Souvisí s textilem" />
        <Directory
          cols={3}
          items={[
            {
              title: "Potisk textilu",
              text: "Jak potiskujeme, jaké série zvládneme a co ovlivní cenu.",
              href: "/reklama/reklamni-textil",
              cta: "Zpět na textil",
            },
            {
              title: "Reklamní předměty",
              text: "Hrnky, propisky, tašky a merch k oblečení.",
              href: "/reklama/reklamni-predmety",
              cta: "Projít předměty",
            },
            {
              title: "Jak vybrat potisk",
              text: "Termolis, sítotisk, DTF nebo výšivka — podle čeho se rozhodnout.",
              href: "/pruvodce/jak-vybrat-potisk-textilu-pro-firmu",
              cta: "Číst průvodce",
            },
          ]}
        />
      </section>
    </>
  );
}
