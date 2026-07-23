import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Media } from "@/components/Media";
import { Band, FinalCta } from "@/components/Sections";
import { buildMetadata } from "@/lib/seo";
import { INQUIRY_URL } from "@/lib/site";
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

      <section className="section--tight section--rule container" id="prace">
        <div className="stagger-gallery">
          {works.slice(0, 2).map((work) => (
            <Link href={`/realizace/${work.slug}`} className="work-card" key={work.slug} data-reveal>
              <Media media={work.hero} />
              <div className="work-card__meta">
                <span className="eyebrow">
                  {work.client} · {work.scopeLabel}
                </span>
                <h3>{work.title}</h3>
                <p>{work.summary}</p>
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
              <Media media={work.hero} />
              <div className="work-card__meta">
                <span className="eyebrow">
                  {work.client} · {work.scopeLabel}
                </span>
                <h3>{work.title}</h3>
                <p>{work.summary}</p>
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
    </>
  );
}
