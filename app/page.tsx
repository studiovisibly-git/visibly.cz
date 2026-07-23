import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/Hero";
import { Media } from "@/components/Media";
import {
  CircleRow,
  EditorialList,
  FinalCta,
  GiantMarquee,
  LogoStrip,
  Process,
  ProofStrip,
  SectionHead,
  ServiceShowcase,
  Split,
  WorkStrip,
} from "@/components/Sections";
import { clientLogos } from "@/lib/clients";
import { works } from "@/lib/works";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS_ID, localBusinessSchema } from "@/lib/schema";
import { INQUIRY_URL, SITE_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Visibly — tiskárna a reklamní studio Opava | Tisk, polepy, reklama",
  description:
    "Tiskneme a vyrábíme reklamu, která je vidět. Tisk, polepy a reklamní výroba pro firmy — vlastní výroba v Opavě, dodáváme po celém MS kraji i ČR.",
  path: "/",
});

const homeFaq = [
  {
    q: "Musím vědět přesný materiál?",
    a: "Nemusíte — to je naše práce. Popište, kde má výsledek fungovat a jak dlouho vydržet, a materiál doporučíme my. Vybírat z dvaceti druhů fólií po vás nikdy chtít nebudeme.",
  },
  {
    q: "Co když nemám hotová tisková data?",
    a: "Stačí logo, fotka nebo popis. Grafiku připravíme přímo pro výrobu — a data vám předáme, takže je příště použijete kdekoli.",
  },
  {
    q: "Děláte i aplikaci nebo montáž?",
    a: "Ano. Polepy aplikujeme v naší dílně nebo u vás, cedule a reklamu montujeme včetně kotvení. Zakázku předáváme hotovou, ne v krabici s návodem.",
  },
  {
    q: "Řešíte zakázky i mimo Opavu?",
    a: "Vyrábíme v Opavě a montujeme po celém Moravskoslezském kraji. Tisk a výrobu posíláme po celé republice — vzdálenost řešíme my, ne vy.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        variant="home"
        displayClass="display-xl"
        eyebrow="Tiskárna a reklamní studio · Opava"
        title="Tiskneme a vyrábíme reklamu, která je vidět. V Opavě i dál."
        titleLines={["Tiskneme a vyrábíme", "reklamu, která je vidět.", "V Opavě i dál."]}
        sub="Tisk, polepy a reklamní výroba pro firmy. Od návrhu po hotový výsledek."
        primary={{ label: "Poptat výrobu", href: INQUIRY_URL }}
        scroll={{ label: "Co potřebujete dostat do světa?", href: "#rozcestnik" }}
        media={{
          label: "Barevné tiskové materiály",
          variant: "circle",
          src: "/images/visibly-home-hero-colors.jpg",
          alt: "Barevné tiskové materiály z výroby Visibly",
        }}
      />

      {/* Proof */}
      <ProofStrip
        items={[
          { title: "Tiskárna a výrobní studio v Opavě" },
          { title: "Klíčové výrobní kroky držíme u sebe" },
          { title: "Tisk. Polepy. Reklamní výroba." },
          { title: "Podle zakázky i aplikace a montáž" },
        ]}
      />

      {/* Rozcestník služeb — vlajková showcase sekce (vzor work-2) */}
      <section className="section container" id="rozcestnik">
        <SectionHead
          eyebrow="Rozcestník"
          title="Co potřebujete dostat do světa?"
          text="Volba podle výsledku, ne podle technologie."
          indent={1}
        />
        <ServiceShowcase
          items={[
            {
              category: "01 — Potřebuji něco vytisknout",
              title: "Tisk",
              text: "Bannery, fólie, plakáty nebo tiskoviny.",
              href: "/tisk",
              media: {
                label: "Tiskoviny z výroby Visibly",
                variant: "wide",
                src: "/images/realizace-reformlab-poukazy-optimized.jpg",
                alt: "Tiskoviny a poukázky z výroby Visibly",
              },
            },
            {
              category: "02 — Chci polepit plochu",
              title: "Polepy",
              text: "Auto, výlohu, sklo, stěnu nebo interiér.",
              href: "/polepy",
              media: {
                label: "Polep firemního vozu",
                variant: "wide",
                src: "/images/realizace-ps-green-polep-optimized.jpg",
                alt: "Polep firemního vozu PS GREEN",
              },
            },
            {
              category: "03 — Potřebuji označit firmu",
              title: "Reklama",
              text: "Cedule, světelná reklama, 3D logo nebo orientace.",
              href: "/reklama",
              media: {
                label: "Označení provozovny",
                variant: "wide",
                src: "/images/realizace-rezani-betonu-brand-optimized.jpg",
                alt: "Označení provozovny Řezání betonu",
              },
            },
          ]}
        />
        <div className="showcase-outro" data-reveal>
          <p>Nevíte, co přesně potřebujete? Stačí fotografie nebo krátký popis.</p>
          <Link href={INQUIRY_URL} className="btn">
            Popsat zadání
          </Link>
        </div>
      </section>

      {/* Vybrané realizace — full-bleed pás */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Realizace" title="Vyrobeno u nás. Vidět všude." indent={0} />
        </div>
        <WorkStrip
          items={works.map((work) => ({
            href: `/realizace/${work.slug}`,
            media: work.hero,
            eyebrow: work.client,
            title: work.summary,
          }))}
        />
        <div className="container" style={{ marginTop: "2.5rem" }}>
          <Link href="/realizace" className="arrow-link">
            Všechny realizace <span className="arr" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* Proč Visibly */}
      <section className="section container">
        <Split
          media={{
            label: "Video z výroby",
            variant: "circle",
            src: "/video/epson-tisk-mini.mp4",
            alt: "Velkoformátový tisk na Epson SureColor",
          }}
          eyebrow="Proč Visibly"
          title="Jsme tiskárna a studio reklamní výroby."
          text="Klíčové výrobní kroky držíme u sebe. Díky tomu na sebe navazuje grafika, tisk, dokončení i montáž."
          cta={{ label: "Naše výroba", href: "/technologie" }}
          badge={{ label: "Naše výroba · podívejte se · naše výroba ·", href: "/technologie" }}
        />
      </section>

      {/* Klienti */}
      <section className="section--tight">
        <div className="container">
          <SectionHead title="Lokální firmy i větší značky." indent={2} />
        </div>
        <LogoStrip logos={clientLogos} />
      </section>

      {/* Proces */}
      <section className="section container">
        <SectionHead eyebrow="Proces · 01–04" title="Od nápadu po hotovou reklamu." indent={1} />
        <Process
          steps={[
            { title: "Zadání", text: "Řeknete nám, co potřebujete. Klidně jen fotku místa, auto nebo rozměr." },
            { title: "Návrh", text: "Doporučíme řešení a připravíme grafiku pro výrobu." },
            { title: "Tisk a výroba", text: "Vytiskneme, vyřežeme, zalaminujeme nebo vyrobíme." },
            { title: "Předání / instalace", text: "Dodáme, nalepíme nebo namontujeme." },
          ]}
        />
      </section>

      {/* Studio služby — kruhové chipy */}
      <section className="section container">
        <SectionHead
          eyebrow="Studio"
          title="Značka, web a obrazy pod jednou střechou."
          indent={1}
        />
        <CircleRow
          items={[
            { title: "Logo a vizuální identita", note: "Studio", href: "/navrh-loga-a-vizualni-identity" },
            { title: "Webdesign", note: "Studio", href: "/webdesign" },
            { title: "Tisk fotoobrazů", note: "Studio", href: "/tisk-fotoobrazu" },
            { title: "Partnerský tisk", note: "B2B", href: "/pro-agentury" },
          ]}
        />
      </section>

      {/* Průvodce */}
      <section className="section section--rule container">
        <SectionHead title="Dobré zadání šetří čas i slepé uličky." indent={0} />
        <EditorialList
          items={[
            {
              eyebrow: "Tisk",
              title: "Jak připravit data pro tisk",
              href: "/pruvodce/jak-pripravit-data-pro-tisk",
            },
            {
              eyebrow: "Polepy",
              title: "Co ovlivňuje cenu polepu auta",
              href: "/pruvodce/kolik-stoji-polep-auta",
            },
            {
              eyebrow: "Reklama",
              title: "Jak označit provozovnu",
              href: "/pruvodce/jak-oznacit-provozovnu",
            },
          ]}
        />
        <p style={{ marginTop: "2.5rem" }}>
          <Link href="/pruvodce" className="btn btn--ghost">
            Otevřít celý průvodce
          </Link>
        </p>
      </section>

      {/* FAQ */}
      <section className="section section--rule container">
        <SectionHead title="Než pošlete první zprávu." indent={1} />
        <Accordion items={homeFaq} />
      </section>

      {/* Obří marquee */}
      <GiantMarquee items={["Tisk", "Polepy", "Reklama", "Výroba v Opavě"]} />

      {/* Final CTA */}
      <FinalCta
        eyebrow="Pojďme na to"
        title="Řešíte tisk, polep nebo označení firmy?"
        text="Ozvěte se. Navrhneme nejlepší cestu od nápadu po hotový výsledek."
        cta={{ label: "Poptat výrobu", href: INQUIRY_URL }}
        secondary={{ label: "Zavolat 603 750 631", href: "tel:+420603750631" }}
      />

      {/* Business + WebSite schema (pokrytí celého MS kraje včetně Ostravy) */}
      <JsonLd data={localBusinessSchema} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: "Visibly",
          inLanguage: "cs",
          publisher: { "@id": BUSINESS_ID },
        }}
      />
    </>
  );
}
