import Link from "next/link";
import { Hero } from "@/components/Hero";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Media } from "@/components/Media";
import { FinalCta } from "@/components/Sections";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS_ID } from "@/lib/schema";
import { INQUIRY_URL, SITE_URL } from "@/lib/site";
import { stitky } from "@/lib/stitky";
import { works } from "@/lib/works";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return {};
  return buildMetadata({
    title: work.metaTitle,
    description: work.metaDescription,
    path: `/realizace/${work.slug}`,
    /* Do náhledu při sdílení patří fotka zakázky, ne firemní vizuál. */
    image: work.hero.src,
  });
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  const others = works.filter((w) => w.slug !== work.slug).slice(0, 2);
  const sluzby = stitky(work.stitky);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Realizace", href: "/realizace" },
          { label: work.client, href: `/realizace/${work.slug}` },
        ]}
      />

      <Hero
        variant="media"
        eyebrow={`${work.client} · ${work.location}`}
        title={work.title}
        sub={work.intro}
        primary={{ label: "Chci podobné řešení", href: INQUIRY_URL }}
        scroll={{ label: "Projít realizaci", href: "#rozsah" }}
        media={{ ...work.hero, variant: "circle" }}
      />

      <section className="section--tight section--rule container" id="rozsah">
        <div className="case__meta" style={{ maxWidth: "44rem", borderTop: "none", paddingTop: 0 }}>
          <p>
            <strong>Kde</strong>
            <span>{work.location}</span>
          </p>
          <p>
            <strong>Dodáno</strong>
            <span>{work.deliverables.join(" · ")}</span>
          </p>
        </div>

        {/* Štítky služeb. Zároveň prolink na podstránky — kdo si prohlíží
            realizaci, se z ní dostane rovnou k tomu, co si chce objednat. */}
        <ul className="stitky" aria-label="Služby na této realizaci">
          {sluzby.map((s) => (
            <li key={s.slug}>
              <Link href={s.href} className="stitek">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Jádro případovky. Fotka je tu hlavní argument, ne ilustrace k textu —
          dostane většinu šířky a strany se po sekcích střídají, aby stránka
          nebyla sloupec obrázků u pravého okraje. */}
      {work.sections.map((section, i) => (
        <section className="section section--rule container" key={section.heading}>
          {/* Střídání stran musí přijít odsud: každá sekce je vlastní <section>,
              takže CSS `:nth-of-type` by uvnitř vždycky vidělo jen první kus. */}
          <div
            className={[
              "case-shot",
              section.media ? "" : "case-shot--text",
              section.media && i % 2 === 1 ? "case-shot--obraceny" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="case-shot__copy" data-reveal>
              <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="case-shot__title">{section.heading}</h2>
              <p className="case-shot__text">{section.text}</p>
            </div>
            {section.media && (
              <figure className="case-shot__foto" data-reveal>
                <Media
                  media={section.media}
                  /* Fotka drží přes půl kontejneru — bez tohohle by prohlížeč
                     sáhl po zbytečně malé variantě. */
                  sizes="(max-width: 900px) 92vw, 55vw"
                />
                <figcaption>{section.media.label}</figcaption>
              </figure>
            )}
          </div>
        </section>
      ))}

      <section className="section section--rule container">
        <h2 className="h2 indent-1" style={{ marginBottom: "2rem" }}>
          Služby z této realizace
        </h2>
        <div className="editorial">
          {sluzby.map((s) => (
            <article className="edit-card" key={s.slug} data-reveal>
              <h3>{s.label}</h3>
              <Link href={s.href} className="edit-card__link edit-card--link">
                Projít službu <span className="arr" aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--rule container">
        <h2 className="h2" style={{ marginBottom: "2rem" }}>
          Další realizace
        </h2>
        <div className="stagger-gallery">
          {others.map((other) => (
            <Link href={`/realizace/${other.slug}`} className="work-card" key={other.slug} data-reveal>
              <Media media={{ ...other.hero, variant: "wide" }} />
              <div className="work-card__meta">
                <span className="eyebrow">{other.client}</span>
                <h3>{other.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FinalCta
        title="Chcete podobné řešení?"
        cta={{ label: "Poptat výrobu", href: INQUIRY_URL }}
        secondary={{ label: "Všechny realizace", href: "/realizace" }}
      />

      {/* Případová studie jako CreativeWork: schema.org nemá typ pro realizaci
          a Article by lhal, tohle není článek. `locationCreated` říká, kde
          zakázka vznikla — u nás Opava, u brněnských klientů Brno; nepleteme
          to s obsluhovanou oblastí firmy. `about` váže realizaci na služby,
          takže je z dat vidět, co se na ní dělalo. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "@id": `${SITE_URL}/realizace/${work.slug}#realizace`,
          name: work.title,
          headline: `${work.client} — ${work.title}`,
          description: work.metaDescription,
          url: `${SITE_URL}/realizace/${work.slug}`,
          ...(work.hero.src && { image: `${SITE_URL}${work.hero.src}` }),
          inLanguage: "cs-CZ",
          creator: { "@id": BUSINESS_ID },
          provider: { "@id": BUSINESS_ID },
          locationCreated: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: work.location,
              addressCountry: "CZ",
            },
          },
          keywords: sluzby.map((s) => s.label).join(", "),
          about: sluzby.map((s) => ({
            "@type": "Service",
            name: s.label,
            url: `${SITE_URL}${s.href}`,
            provider: { "@id": BUSINESS_ID },
          })),
          mentions: { "@type": "Organization", name: work.client },
        }}
      />
    </>
  );
}
