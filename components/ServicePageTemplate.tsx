import Link from "next/link";
import { Accordion } from "./Accordion";
import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { Media } from "./Media";
import { Hero } from "./Hero";
import {
  Band,
  Directory,
  EditorialList,
  Feature,
  FinalCta,
  Process,
  ProofStrip,
  SectionHead,
  Split,
} from "./Sections";
import { TechNote } from "./TechStrip";
import { realizaceProSluzbu } from "@/lib/works";
import { SITE_URL } from "@/lib/site";
import { poptavkaUrl } from "@/lib/poptavka";
import { serviceSchema } from "@/lib/schema";
import { TECH_NOTES } from "@/lib/technika";
import type { LinkItem, ServicePage } from "@/lib/types";

const HUB_LABELS: Record<string, string> = {
  tisk: "Tisk",
  polepy: "Polepy",
  reklama: "Reklama",
};

/** Jednotná šablona SEO podstránky služby podle vzoru z wireframu. */
export function ServicePageTemplate({ page }: { page: ServicePage }) {
  const path = page.hub ? `/${page.hub}/${page.slug}` : `/${page.slug}`;
  const crumbs: LinkItem[] = page.hub
    ? [
        { label: HUB_LABELS[page.hub], href: `/${page.hub}` },
        { label: page.navLabel, href: path },
      ]
    : [{ label: page.navLabel, href: path }];

  /* Realizace se štítkem téhle služby napřed, ručně vypsané za nimi.
     Detaily v lib/works.ts. */
  const works = realizaceProSluzbu(page.slug, page.works);
  /* Jen na službách, kde o výsledku rozhoduje konkrétní stroj. Který slug
     zmínku dostane, řeší lib/technika.ts — včetně důvodů, proč jinde není. */
  const technika = TECH_NOTES[page.slug];
  /* Každé CTA na stránce nese, odkud vede — formulář pak nenutí vybírat
     oblast, kterou člověk právě odklikl. */
  const poptat = poptavkaUrl(page.slug);
  /* Data stránek míří na formulář natvrdo („/kontakt#poptavka") na
     šedesáti místech. Přepisujeme je tady, ať předvyplnění nezáleží na tom,
     kterým tlačítkem člověk odešel, a data zůstanou bez logiky. */
  const sKontextem = (href: string) => (href.startsWith("/kontakt#") ? poptat : href);

  return (
    <>
      <Breadcrumbs items={crumbs} />

      {/* Hero */}
      <Hero
        variant="media"
        eyebrow={page.eyebrow}
        title={page.h1}
        sub={page.intro}
        note="Stačí fotka, rozměr nebo krátký popis. Ozveme se s návrhem řešení."
        primary={{ label: page.finalCta, href: poptat }}
        /* Když má stránka výrazný blok, vede scroll CTA k němu — je to hlavní akce. */
        scroll={
          page.feature
            ? { label: page.feature.scrollLabel, href: `#${page.feature.id}` }
            : { label: page.variantsTitle, href: "#varianty" }
        }
        media={page.heroMedia}
      />

      {/* Proof */}
      <ProofStrip items={page.proof} />

      {/* Hlavní akce stránky — nahoře, dřív než delší čtení */}
      {page.feature && (
        <section className="section--tight container">
          <Feature block={page.feature} />
        </section>
      )}

      {/* Postoj / split */}
      <section className="section container">
        <Split
          media={page.split.media}
          title={page.split.title}
          text={page.split.text}
          cta={{ label: page.finalCta, href: poptat }}
        />
      </section>

      {/* Doklad, na čem se to vyrobí — hned za postojem, dřív než varianty. */}
      {technika && (
        <section className="section--tight container">
          <TechNote title={technika.title} brands={technika.brands} text={technika.text} />
        </section>
      )}

      {/* Varianty — interní prolinkování */}
      <section className="section section--rule container" id="varianty">
        <SectionHead title={page.variantsTitle} text={page.variantsText} indent={1} />
        <Directory items={page.variants.map((v) => ({ ...v, href: sKontextem(v.href) }))} />
      </section>

      {/* Band */}
      <section className="section--tight container">
        <Band
          title={page.band.title}
          text={page.band.text}
          cta={{ label: page.band.cta, href: sKontextem(page.band.href) }}
        />
      </section>

      {/* Realizace */}
      {works.length > 0 && (
        <section className="section section--rule container">
          <SectionHead eyebrow="Realizace" title="Vyrobeno pro skutečný provoz." indent={0} />
          <div className="stagger-gallery">
            {works.map((work) => (
              <Link href={`/realizace/${work.slug}`} className="work-card" key={work.slug} data-reveal>
                <Media media={{ ...work.hero, variant: "wide" }} />
                <div className="work-card__meta">
                  <span className="eyebrow">
                    {work.client} · {work.location}
                  </span>
                  <h3>{work.title}</h3>
                  <p>{work.summary}</p>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: "2rem" }}>
            <Link href="/realizace" className="arrow-link">
              Další realizace <span className="arr" aria-hidden="true">↗</span>
            </Link>
          </p>
        </section>
      )}

      {/* Proces */}
      <section className="section section--rule container">
        <SectionHead title={page.process.title} indent={1} />
        <Process steps={page.process.steps} />
      </section>

      {/* FAQ */}
      <section className="section section--rule container">
        <div className="article-layout">
          <div>
            <SectionHead eyebrow="Časté dotazy" title={page.faqTitle} />
            <Accordion items={page.faq} />
          </div>
          <aside className="article-aside">
            {page.guides.length > 0 && (
              <div className="aside-box">
                <h3>Průvodce k tématu</h3>
                <ul>
                  {page.guides.map((g) => (
                    <li key={g.href}>
                      <Link href={g.href}>{g.label} ↗</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="aside-box">
              <h3>Nenašli jste odpověď?</h3>
              <p>Napište nám, co řešíte. Poradíme s materiálem, daty i rozpočtem.</p>
              <Link href={poptat} className="btn btn--sm">
                Probrat zadání
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCta
        title={page.finalTitle}
        cta={{ label: page.finalCta, href: poptat }}
        secondary={{ label: "Prohlédnout realizace", href: "/realizace" }}
      />

      {/* Structured data: Service + FAQ */}
      <JsonLd
        data={serviceSchema({
          name: page.h1,
          description: page.metaDescription,
          url: `${SITE_URL}${path}`,
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
