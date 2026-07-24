import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Media } from "@/components/Media";
import { Band, FinalCta } from "@/components/Sections";
import { allGuides, guideCategories } from "@/lib/guides";
import { buildMetadata } from "@/lib/seo";
import { INQUIRY_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Průvodce tiskem a reklamou — praktické rady | Visibly Opava",
  description:
    "Praktické rady z tiskárny: příprava dat, ceny polepů, výběr cedule či banneru. Každý článek vede k jasnému rozhodnutí a související službě.",
  path: "/pruvodce",
});

export default function PruvodcePage() {
  const featured = allGuides.filter((g) => g.featured);
  const rest = allGuides.filter((g) => !g.featured);

  return (
    <>
      <Breadcrumbs items={[{ label: "Průvodce", href: "/pruvodce" }]} />

      <Hero
        variant="plain"
        displayClass="display-xl"
        eyebrow="Obsahový hub"
        title="Průvodce tiskem a reklamou."
        titleLines={["Průvodce tiskem", "a reklamou."]}
        sub="Vyberte téma podle problému. Každý článek vede k jasnému rozhodnutí a související službě."
        primary={{ label: "Probrat zadání", href: INQUIRY_URL }}
        scroll={{ label: "Rady, které vedou k výsledku", href: "#temata" }}
      />

      <section className="section--tight section--rule container" id="temata">
        <div className="stagger-gallery">
          {featured.map((guide) => (
            <Link
              href={`/pruvodce/${guide.slug}`}
              className="work-card"
              key={guide.slug}
              data-reveal
            >
              <Media media={{ label: `Ilustrační foto · ${guide.title}`, variant: "wide" }} />
              <div className="work-card__meta">
                <span className="eyebrow">{guide.category}</span>
                <h3>{guide.title}</h3>
                <p>{guide.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <h2 className="h2 indent-1" style={{ marginBottom: "2.5rem" }}>
          Rady, které vedou k výsledku.
        </h2>
        {guideCategories.map((category) => {
          const items = rest.filter((g) => g.category === category);
          if (items.length === 0) return null;
          return (
            <div key={category} style={{ marginBottom: "2.5rem" }}>
              <span className="eyebrow" style={{ marginBottom: "1rem" }}>
                {category}
              </span>
              <div className="editorial">
                {items.map((guide) => (
                  <article className="edit-card" key={guide.slug} data-reveal>
                    <h3>{guide.title}</h3>
                    <p>{guide.excerpt}</p>
                    <Link href={`/pruvodce/${guide.slug}`} className="edit-card__link edit-card--link">
                      Číst průvodce <span className="arr" aria-hidden="true">↗</span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="section--tight container">
        <Band
          title="Přejděte od rady rovnou k výrobě."
          text="Tisk · Polepy · Reklamní výroba"
          cta={{ label: "Probrat zadání", href: INQUIRY_URL }}
        />
      </section>

      <FinalCta
        title="Nenašli jste odpověď?"
        text="Napište nám, co řešíte — poradíme i bez článku."
        cta={{ label: "Poslat dotaz", href: INQUIRY_URL }}
      />
    </>
  );
}
