import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Media } from "@/components/Media";
import { Band, FinalCta } from "@/components/Sections";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS_ID } from "@/lib/schema";
import { INQUIRY_URL, SITE_URL } from "@/lib/site";
import { stitky } from "@/lib/stitky";
import { works } from "@/lib/works";

export const metadata = buildMetadata({
  title: "Realizace — tisk, polepy a reklama v praxi | Visibly Opava",
  description:
    "Realizace Visibly: polepy aut, označení provozoven, identity a tiskoviny pro firmy z Opavy a okolí. Ukázky propojení návrhu, tisku a výroby.",
  path: "/realizace",
});

export default function RealizacePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Realizace", href: "/realizace" }]} />

      <Hero
        variant="plain"
        displayClass="display-xl"
        eyebrow="Portfolio"
        title="Realizace, které jsou vidět."
        titleLines={["Realizace,", "které jsou vidět."]}
        sub="Ukázky propojení návrhu, tisku, polepu a výroby do jednoho srozumitelného výsledku."
        primary={{ label: "Poptat výrobu", href: INQUIRY_URL }}
        scroll={{ label: "Prohlédnout naše práce", href: "#prace" }}
      />

      {/* Čtverec, ne 4:5 z `hero`. Ten poměr je stavěný pro kruh v heru
          případovky; tady stojí dva sloupce vedle sebe a na výšku by mezi
          nimi vznikly zbytečně dlouhé sloupce fotek. */}
      <section className="section--tight section--rule container" id="prace">
        <div className="stagger-gallery">
          {works.slice(0, 2).map((work) => (
            <Link href={`/realizace/${work.slug}`} className="work-card" key={work.slug} data-reveal>
              <Media media={{ ...work.hero, variant: "square" }} />
              <div className="work-card__meta">
                <span className="eyebrow">
                  {work.client} · {work.location}
                </span>
                <h3>{work.title}</h3>
                <p>{work.summary}</p>
                <ul className="stitky stitky--karta" aria-label="Služby na realizaci">
                  {stitky(work.stitky).map((s) => (
                    <li className="stitek" key={s.slug}>
                      {s.label}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginBlock: "clamp(2rem, 5vw, 4rem)" }}>
          <Band
            title="Stačí fotka, rozměr nebo nápad."
            text="Navrhneme, co dává smysl vyrobit."
            cta={{ label: "Probrat zadání", href: INQUIRY_URL }}
          />
        </div>

        <div className="stagger-gallery">
          {works.slice(2).map((work) => (
            <Link href={`/realizace/${work.slug}`} className="work-card" key={work.slug} data-reveal>
              <Media media={{ ...work.hero, variant: "square" }} />
              <div className="work-card__meta">
                <span className="eyebrow">
                  {work.client} · {work.location}
                </span>
                <h3>{work.title}</h3>
                <p>{work.summary}</p>
                <ul className="stitky stitky--karta" aria-label="Služby na realizaci">
                  {stitky(work.stitky).map((s) => (
                    <li className="stitek" key={s.slug}>
                      {s.label}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FinalCta
        title="Chcete podobné řešení?"
        cta={{ label: "Poptat výrobu", href: INQUIRY_URL }}
        secondary={{ label: "Jak pracujeme", href: "/technologie" }}
      />

      {/* Seznam realizací pro vyhledávače — každá položka odkazuje na svoji
          případovku, která má vlastní CreativeWork s městem a službami. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Realizace Visibly",
          itemListOrder: "https://schema.org/ItemListUnordered",
          numberOfItems: works.length,
          itemListElement: works.map((work, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/realizace/${work.slug}`,
            item: {
              "@type": "CreativeWork",
              "@id": `${SITE_URL}/realizace/${work.slug}#realizace`,
              name: work.title,
              description: work.summary,
              url: `${SITE_URL}/realizace/${work.slug}`,
              ...(work.hero.src && { image: `${SITE_URL}${work.hero.src}` }),
              creator: { "@id": BUSINESS_ID },
              locationCreated: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: work.location,
                  addressCountry: "CZ",
                },
              },
              temporalCoverage: work.rok.replace(/^(\d{2})(\d{2})[–-](\d{2})$/, "$1$2/$1$3"),
              keywords: stitky(work.stitky)
                .map((s) => s.label)
                .join(", "),
            },
          })),
        }}
      />
    </>
  );
}
