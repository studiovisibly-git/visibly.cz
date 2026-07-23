import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Accordion } from "@/components/Accordion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Band, Directory, FinalCta, ProofStrip, SectionHead } from "@/components/Sections";
import { serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { INQUIRY_URL, SITE_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Tisk a reklama pro Moravskoslezský kraj | Visibly",
  description:
    "Tisk, polepy a výroba reklamy pro firmy z celého Moravskoslezského kraje — Ostrava, Opava, Krnov, Havířov, Karviná, Frýdek-Místek i Třinec. Dodání a montáž u vás.",
  path: "/moravskoslezsky-kraj",
});

const krajFaq = [
  {
    q: "Účtujete dopravu po kraji?",
    a: "Dopravu vidíte v nabídce předem — u větších zakázek a montáží bývá v ceně. Výjezdy spojujeme s dalšími zakázkami v okolí, což drží cenu dole.",
  },
  {
    q: "Jak probíhá zakázka na dálku?",
    a: "Poptávka, kontrola dat i schvalování náhledů probíhá online nebo telefonem. Vy odsouhlasíte náhled, my vyrobíme a přivezeme — osobně se potkáme až u předání nebo montáže.",
  },
  {
    q: "Montujete i mimo Opavu a Ostravu?",
    a: "Ano — cedule, polepy výloh i světelnou reklamu montujeme po celém kraji, od Krnova po Třinec. Termín výjezdu domluvíme v nabídce.",
  },
  {
    q: "Můžu si zakázku vyzvednout osobně?",
    a: "Samozřejmě. Výroba je v Opavě na Komárovské 2662/2 — vyzvednutí domluvíme na čas, který vám sedí.",
  },
  {
    q: "Jezdíte i za hranice kraje?",
    a: "Po domluvě ano. Tiskoviny a menší zakázky posíláme přepravcem po celé ČR, montáže mimo kraj řešíme individuálně.",
  },
];

const regiony = [
  { title: "Ostravsko", text: "Ostrava, Hlučín, Bohumín, Orlová — nejčastější směr našich výjezdů." },
  { title: "Opavsko", text: "Opava, Kravaře, Vítkov, Fulnek — domácí region, kde sídlí výroba." },
  { title: "Karvinsko", text: "Karviná, Havířov, Český Těšín — dodání i montáž na místě." },
  { title: "Frýdecko-Místecko", text: "Frýdek-Místek, Třinec, Frýdlant nad Ostravicí." },
  { title: "Novojičínsko", text: "Nový Jičín, Kopřivnice, Bílovec, Studénka, Odry." },
  { title: "Krnovsko a Bruntálsko", text: "Krnov, Bruntál, Rýmařov — kousek za kopcem." },
];

export default function MoravskoslezskyKrajPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Moravskoslezský kraj", href: "/moravskoslezsky-kraj" }]} />

      <Hero
        variant="media"
        eyebrow="Působnost · MS kraj"
        title="Tisk a reklama pro celý Moravskoslezský kraj."
        sub="Vyrábíme v Opavě a jezdíme tam, kde nás potřebujete — z Krnova do Třince, z Hlučína do Frýdku. Tisk dovezeme, polepy a reklamu namontujeme u vás."
        primary={{ label: "Poslat poptávku", href: INQUIRY_URL }}
        scroll={{ label: "Kam jezdíme", href: "#regiony" }}
        media={{
          label: "Barvy z výroby Visibly",
          variant: "circle",
          src: "/images/visibly-home-hero-colors.jpg",
          alt: "Tisk a reklamní výroba Visibly pro Moravskoslezský kraj",
        }}
      />

      <ProofStrip
        items={[
          { title: "Jedna výroba v Opavě", text: "Tisk, řez, laminace i kompletace pod jednou střechou." },
          { title: "Dodání po celém kraji", text: "Termín i dopravu potvrzujeme předem v nabídce." },
          { title: "Montáž u vás", text: "Polepy, cedule a světelná reklama včetně aplikace na místě." },
        ]}
      />

      <section className="section container" id="regiony">
        <SectionHead
          title="Kraj známe. Většinu z něj máme do hodiny."
          text="Výjezdy plánujeme po regionech — proto je doprava rychlá a levná."
          indent={1}
        />
        <div className="directory directory--3">
          {regiony.map((r, i) => (
            <article className="dir-card" key={r.title} data-reveal>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              {r.title === "Ostravsko" && (
                <Link href="/tiskarna-ostrava" className="dir-card__link dir-card--link">
                  Tiskárna pro Ostravu{" "}
                  <span className="arr" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section section--rule container">
        <SectionHead
          title="Co vozíme po kraji nejčastěji"
          text="Tisk dodáme kamkoli. Polepy a reklamu přijedeme namontovat."
        />
        <Directory
          cols={3}
          items={[
            { title: "Tisk", text: "Bannery, samolepky, plakáty, roll-upy i firemní tiskoviny.", href: "/tisk", cta: "Prohlédnout tisk" },
            { title: "Polepy", text: "Auta a dodávky u nás, výlohy a interiéry u vás.", href: "/polepy", cta: "Prohlédnout polepy" },
            { title: "Reklama", text: "Cedule, světelná reklama a 3D loga včetně montáže.", href: "/reklama", cta: "Prohlédnout reklamu" },
          ]}
        />
      </section>

      <section className="section--tight container">
        <Band
          eyebrow="Nejčastější směr"
          title="Pro Ostravu jezdíme nejčastěji."
          text="Tisk, polepy i montáže — celý proces vyřešíme na dálku."
          cta={{ label: "Tiskárna pro Ostravu", href: "/tiskarna-ostrava" }}
        />
      </section>

      <section className="section section--rule container">
        <SectionHead eyebrow="Časté dotazy" title="Než pošlete poptávku z kraje" />
        <Accordion items={krajFaq} />
      </section>

      <FinalCta
        title="Vyrábíme v Opavě. Fungujeme po celém kraji."
        text="Napište, co potřebujete a odkud jste — vrátíme nabídku s termínem i dopravou."
        cta={{ label: "Poslat poptávku", href: INQUIRY_URL }}
        secondary={{ label: "Prohlédnout realizace", href: "/realizace" }}
      />

      {/* Structured data: Service (celý kraj) + FAQ */}
      <JsonLd
        data={serviceSchema({
          name: "Tisk, polepy a reklama — Moravskoslezský kraj",
          description:
            "Tisk, polepy a reklamní výroba pro firmy z celého Moravskoslezského kraje s dodáním a montáží na místě.",
          url: `${SITE_URL}/moravskoslezsky-kraj`,
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: krajFaq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
