import { Suspense } from "react";
import { Accordion } from "@/components/Accordion";
import { Hero } from "@/components/Hero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { Media } from "@/components/Media";
import { Process, SectionHead } from "@/components/Sections";
import { buildMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";
import {
  ADDRESS_FULL,
  EMAIL,
  EMAIL_HREF,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: "Kontakt — poptávka tisku a reklamy | Visibly Opava",
  description:
    "Kontaktujte Visibly: nezávazná poptávka tisku, polepů a reklamy. Komárovská 2662/2, Opava · 603 750 631 · chci@visibly.cz. Stačí fotka nebo krátký popis.",
  path: "/kontakt",
});

const kontaktFaq = [
  {
    q: "Musím mít hotová tisková data?",
    a: "Ne. Pošlete, co máte — logo, fotku, náčrt na ubrousku. Grafiku připravíme my a před výrobou vám ji ukážeme ke schválení.",
  },
  {
    q: "Umíte poradit s materiálem?",
    a: "To je přesně naše práce. Popište, kde má výsledek fungovat a jak dlouho vydržet — materiál, dokončení i technologii doporučíme my.",
  },
  {
    q: "Děláte i montáž nebo aplikaci?",
    a: "Ano, polepy aplikujeme a reklamu montujeme v Opavě a okolí vlastními silami. Zakázku předáváme hotovou na místě.",
  },
  {
    q: "Působíte jen v Opavě?",
    a: "Vyrábíme v Opavě, montujeme po celém Moravskoslezském kraji a tisk posíláme po celé ČR. Vzdálenost není překážka.",
  },
  {
    q: "Jak rychle dokážete říct cenu?",
    a: "Běžné poptávky naceníme do 24–48 hodin. Když je zadání složitější, ozveme se s doplňujícími dotazy — ale vždy rychle.",
  },
  {
    q: "Co když přesně nevím, co potřebuji?",
    a: "Ideální výchozí stav! Napište, co řešíte — třeba „nová provozovna, potřebuji být vidět“. Návrh řešení je na nás.",
  },
];

export default function KontaktPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Kontakt", href: "/kontakt" }]} />

      <Hero
        variant="plain"
        displayClass="display-xl"
        eyebrow="Kontakt"
        title="Pojďme vyrobit něco, co bude vidět."
        titleLines={["Pojďme vyrobit něco,", "co bude vidět."]}
        sub="Stačí fotka, soubor nebo krátký popis."
        note="Nemusíte znát technologii ani přesný rozměr."
        primary={{ label: "Začít poptávku", href: "#poptavka" }}
        scroll={{ label: "Stačí začít tím, co už víte", href: "#poptavka" }}
      />

      <section className="section section--rule container" id="poptavka">
        <SectionHead
          title="Stačí začít tím, co už víte."
          text="Nevíte rozměr nebo materiál? Nevadí. Pošlete fotografii a napište, kde má výsledek fungovat."
        />
        <div className="lead-form">
          {/* Formulář čte ?produkt= z URL (předvyplnění z katalogu textilu),
              což vyžaduje Suspense, aby stránka zůstala staticky generovaná. */}
          <Suspense fallback={null}>
            <LeadForm />
          </Suspense>
          <aside className="contact-panel">
            <span className="eyebrow">Raději rovnou?</span>
            <a href={PHONE_HREF}>
              <strong>Zavolat</strong>
              <span className="val">{PHONE_DISPLAY}</span>
            </a>
            <a href={EMAIL_HREF}>
              <strong>Napsat e-mail</strong>
              <span className="val">{EMAIL}</span>
            </a>
            <a href={MAPS_URL} target="_blank" rel="noopener">
              <strong>Navštívit studio</strong>
              <span className="val">{ADDRESS_FULL} ↗</span>
            </a>
          </aside>
        </div>
      </section>

      <section className="section section--rule container">
        <SectionHead title="Co nám pomůže odhadnout řešení?" indent={1} />
        <Process
          steps={[
            { title: "Co chcete vyrobit" },
            { title: "Kde to bude použité" },
            { title: "Rozměr nebo počet" },
            { title: "Fotka nebo podklady" },
            { title: "Termín" },
          ]}
        />
      </section>

      <section className="section section--rule container">
        <SectionHead eyebrow="Časté dotazy" title="Než nám napíšete" />
        <Accordion items={kontaktFaq} />
      </section>

      <section className="section section--rule container">
        <div className="split">
          <div className="split__media" data-reveal>
            <Media media={{ label: "Kruhová mapa · Opava, Komárovská 2662/2", variant: "circle" }} />
          </div>
          <div className="split__copy" data-reveal>
            <h2 className="h2">Najdete nás v Opavě.</h2>
            <p>Dodáváme do Opavy, Ostravy, Moravskoslezského kraje i po celé republice.</p>
            <p className="split__sub">
              {ADDRESS_FULL} · {PHONE_DISPLAY} · {EMAIL}
            </p>
            <p>
              <a href={MAPS_URL} target="_blank" rel="noopener" className="btn">
                Navigovat
              </a>
            </p>
          </div>
        </div>
      </section>

      <JsonLd data={localBusinessSchema} />
    </>
  );
}
