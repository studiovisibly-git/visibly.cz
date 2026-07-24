import Link from "next/link";
import { Accordion } from "./Accordion";
import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { Media } from "./Media";
import { Hero } from "./Hero";
import {
  Band,
  CircleRow,
  Directory,
  EditorialList,
  FinalCta,
  Process,
  ProofStrip,
  SectionHead,
  Split,
} from "./Sections";
import { getWork } from "@/lib/works";
import { INQUIRY_URL, SITE_URL } from "@/lib/site";
import { serviceSchema } from "@/lib/schema";
import type { DirItem, Faq, LinkItem, MediaSpec, ProcessStep } from "@/lib/types";

export type HubPage = {
  path: string;
  label: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroCta: string;
  heroMedia: MediaSpec;
  split: { title: string; text: string; media: MediaSpec };
  proof: { title: string; text?: string }[];
  directoryTitle: string;
  directoryText?: string;
  directory: DirItem[];
  band: { eyebrow?: string; title: string; text?: string; cta: string; href: string };
  worksTitle: string;
  works: string[];
  materialsTitle: string;
  materials: { title: string; text?: string }[];
  materialsBand: { title: string; text: string; cta: string; href: string };
  processTitle: string;
  process: ProcessStep[];
  faqTitle: string;
  faq: Faq[];
  guidesTitle: string;
  guides: LinkItem[];
  finalTitle: string;
  finalCta: string;
  metaDescription: string;
};

/** Přehledová (hub) stránka služby — /tisk, /polepy, /reklama. */
export function HubPageTemplate({ hub }: { hub: HubPage }) {
  const works = hub.works.map(getWork);

  return (
    <>
      <Breadcrumbs items={[{ label: hub.label, href: hub.path }]} />

      {/* Hero */}
      <Hero
        variant="media"
        eyebrow={hub.eyebrow}
        title={hub.h1}
        sub={hub.intro}
        note="Stačí fotka, rozměr nebo krátký popis. Ozveme se s návrhem řešení."
        primary={{ label: hub.heroCta, href: INQUIRY_URL }}
        scroll={{ label: hub.directoryTitle, href: "#rozcestnik" }}
        media={hub.heroMedia}
      />

      {/* Split — postoj */}
      <section className="section section--rule container">
        <Split
          media={hub.split.media}
          title={hub.split.title}
          text={hub.split.text}
          cta={{ label: hub.heroCta, href: INQUIRY_URL }}
        />
      </section>

      {/* Proof */}
      <ProofStrip items={hub.proof} />

      {/* Rozcestník */}
      <section className="section container" id="rozcestnik">
        <SectionHead title={hub.directoryTitle} text={hub.directoryText} indent={1} />
        <Directory items={hub.directory} />
      </section>

      {/* Band */}
      <section className="section--tight container">
        <Band
          eyebrow={hub.band.eyebrow}
          title={hub.band.title}
          text={hub.band.text}
          cta={{ label: hub.band.cta, href: hub.band.href }}
        />
      </section>

      {/* Realizace */}
      <section className="section section--rule container">
        <SectionHead eyebrow="Realizace" title={hub.worksTitle} indent={0} />
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

      {/* Materiály / řešení — kruhové chipy */}
      <section className="section section--rule container">
        <SectionHead title={hub.materialsTitle} indent={2} />
        <CircleRow items={hub.materials.map((m, i) => ({ title: m.title, note: String(i + 1).padStart(2, "0") }))} />
        <div style={{ marginTop: "clamp(2.5rem, 6vw, 4.5rem)" }}>
          <Band
            title={hub.materialsBand.title}
            text={hub.materialsBand.text}
            cta={{ label: hub.materialsBand.cta, href: hub.materialsBand.href }}
          />
        </div>
      </section>

      {/* Proces */}
      <section className="section section--rule container">
        <SectionHead title={hub.processTitle} indent={1} />
        <Process steps={hub.process} />
      </section>

      {/* FAQ */}
      <section className="section section--rule container">
        <SectionHead eyebrow="Časté dotazy" title={hub.faqTitle} />
        <Accordion items={hub.faq} />
      </section>

      {/* Průvodce */}
      <section className="section section--rule container">
        <SectionHead title={hub.guidesTitle} indent={0} />
        <EditorialList
          items={hub.guides.map((g) => ({ title: g.label, href: g.href, cta: "Přečíst průvodce" }))}
        />
      </section>

      <FinalCta
        title={hub.finalTitle}
        cta={{ label: hub.finalCta, href: INQUIRY_URL }}
        secondary={{ label: "Prohlédnout realizace", href: "/realizace" }}
      />

      <JsonLd
        data={serviceSchema({
          name: hub.h1,
          description: hub.metaDescription,
          url: `${SITE_URL}${hub.path}`,
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: hub.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
