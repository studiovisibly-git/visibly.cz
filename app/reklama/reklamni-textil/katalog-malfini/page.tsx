import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Hero } from "@/components/Hero";
import { Band, Directory, Process, SectionHead } from "@/components/Sections";
import { buildMetadata } from "@/lib/seo";
import { INQUIRY_URL } from "@/lib/site";

/** Katalog běží u dodavatele; `?iframe=1` je jeho režim pro vložení do stránky. */
const CATALOG_EMBED = "https://onlinecatalog.malfini.com/visibly.cz/cs/catalog/?iframe=1";
const CATALOG_DIRECT = "https://onlinecatalog.malfini.com/visibly.cz/cs/catalog";

export const metadata = {
  ...buildMetadata({
    title: "Online katalog firemního textilu | Visibly Opava",
    description:
      "Katalog trik, mikin, polokošil a pracovního oblečení k potisku. Vyberte střih, barvu a velikosti — potisk doporučíme a naceníme.",
    path: "/reklama/reklamni-textil/katalog-malfini",
  }),
  /* Obsah katalogu je uvnitř iframu, takže z něj Google nic nevytěží — SEO
     výkon necháváme na stránce Reklamní textil. Odkazy odsud ale sledovat chceme. */
  robots: { index: false, follow: true },
};

export default function KatalogMalfiniPage() {
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
        variant="plain"
        displayClass="display-l"
        eyebrow="Reklamní textil · Katalog"
        title="Online katalog firemního textilu."
        sub="Trička, mikiny, polokošile i pracovní oblečení. Vyberte střih, barvu a velikosti — potisk doporučíme a naceníme my."
        note="Ceny v katalogu jsou bez potisku. Kalkulaci s potiskem pošleme na míru."
        primary={{ label: "Nechat nacenit potisk", href: INQUIRY_URL }}
        scroll={{ label: "Prohlédnout katalog", href: "#katalog" }}
      />

      <section className="section--tight container container--wide" id="katalog">
        <div className="catalog" data-reveal>
          <div className="catalog__frame">
            <iframe
              src={CATALOG_EMBED}
              title="Online katalog reklamního textilu"
              /* Katalog je hlavní obsah stránky — načítáme ho rovnou, ne až při scrollu. */
              loading="eager"
              allowFullScreen
            />
          </div>
          <p className="catalog__note">
            Nenačetl se katalog, nebo se vám v něm špatně listuje?{" "}
            <a href={CATALOG_DIRECT} target="_blank" rel="noopener">
              Otevřít v novém okně{" "}
              <span className="arr" aria-hidden="true">
                ↗
              </span>
            </a>
          </p>
        </div>
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
