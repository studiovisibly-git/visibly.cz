import Link from "next/link";
import { Hero } from "@/components/Hero";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Media } from "@/components/Media";
import { FinalCta } from "@/components/Sections";
import { buildMetadata } from "@/lib/seo";
import { INQUIRY_URL } from "@/lib/site";
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
  });
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  const others = works.filter((w) => w.slug !== work.slug).slice(0, 2);

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
            <strong>Rozsah</strong>
            <span>{work.scopeLabel}</span>
          </p>
          <p>
            <strong>Dodáno</strong>
            <span>{work.deliverables.join(" · ")}</span>
          </p>
        </div>
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
          {work.services.map((s) => (
            <article className="edit-card" key={s.href} data-reveal>
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
    </>
  );
}
