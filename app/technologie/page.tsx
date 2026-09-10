import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Accordion } from "@/components/Accordion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Directory, FinalCta, Process, SectionHead, Split } from "@/components/Sections";
import { ZnackaVyrobce } from "@/components/TechStrip";
import { buildMetadata } from "@/lib/seo";
import { INQUIRY_URL } from "@/lib/site";
import { strojovyPark, type TechKarta } from "@/lib/technologie";

export const metadata = buildMetadata({
  title: "Technologie — vlastní výroba v Opavě | Visibly",
  description:
    "Strojový park Visibly: velkoformátový solventní tisk Epson SureColor, UV tisk Agfa na desky i role do 3,2 m, řezací ploter Roland. Parametry i produkty u každé technologie.",
  path: "/technologie",
});

const techFaq = [
  {
    q: "Musím vědět, jakou technologii potřebuji?",
    a: "Ne — technologie je náš problém. Vy popíšete, co má vzniknout a kde to bude fungovat; my vybereme stroj, materiál i postup.",
  },
  {
    q: "Zkontrolujete před výrobou moje data?",
    a: "Vždy. Rozlišení, spadávky, barevnost a křivky projdou kontrolou dřív, než se cokoli vyrobí. Když něco nesedí, ozveme se s řešením.",
  },
  {
    q: "Potřebuji u každého tisku laminaci?",
    a: "Ne. Laminace má smysl u polepů, venkovních tisků a tiskovin do rukou. Kde je zbytečná, sami vám ji rozmluvíme — s cenou to umí i opačně.",
  },
  {
    q: "Zajistíte také aplikaci nebo dokončení?",
    a: "Ano — polepy aplikujeme, cedule montujeme, zakázky kompletujeme. Výroba u nás končí hotovým výsledkem, ne krabicí s díly.",
  },
  {
    q: "Mohu konzultovat výrobu před hotovým návrhem?",
    a: "Prosíme o to! Konzultace před návrhem šetří peníze — grafika pak od začátku počítá s materiálem a technologií.",
  },
];

/**
 * Karta jednoho stroje.
 *
 * Technologie s vlastní stránkou je celá odkazem, zbytek (laminace,
 * termolis, kompletace) zůstává obyčejnou kartou. Rozdíl je vidět: karta
 * s odkazem má dole šipku a na hover se zvedne — kdyby vypadaly stejně,
 * lidé by klikali i tam, kde není kam jít.
 */
function TechCard({ tech }: { tech: TechKarta }) {
  const obsah = (
    <>
      <div className="tech-item__head">
        <span className="eyebrow">{tech.num}</span>
        <h3>{tech.name}</h3>
        {tech.brand && (
          /* Logo výrobce jako podpis pod jméno stroje — oddělené
             vlasovkou, aby to čtelo jako údaj, ne jako reklama. */
          <span className="tech-item__brand">
            <ZnackaVyrobce brand={tech.brand} />
          </span>
        )}
      </div>
      <div className="tech-item__points">
        {tech.points.map((point) => (
          <div key={point.title}>
            <strong>{point.title}</strong>
            <p>{point.text}</p>
          </div>
        ))}
        {tech.slug && (
          <span className="tech-item__cta">
            Parametry a produkty{" "}
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </span>
        )}
      </div>
    </>
  );

  if (!tech.slug) {
    return (
      <article className="tech-item" data-reveal>
        {obsah}
      </article>
    );
  }

  return (
    <Link href={`/technologie/${tech.slug}`} className="tech-item tech-item--odkaz" data-reveal>
      {obsah}
    </Link>
  );
}

export default function TechnologiePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Technologie", href: "/technologie" }]} />

      <Hero
        variant="media"
        eyebrow="Výroba · Opava"
        title="Výroba, která hlídá výsledek od začátku."
        sub="Klíčové kroky výroby držíme u sebe — od dat až po předání."
        primary={{ label: "Probrat výrobu", href: INQUIRY_URL }}
        scroll={{ label: "Stroje jsou prostředek. Výsledek je měřítko.", href: "#stroje" }}
        media={{
          label: "Video z výroby",
          variant: "circle",
          src: "/video/epson-tisk-mini.mp4",
          alt: "Velkoformátový tisk na Epson SureColor",
        }}
      />

      <section className="section section--rule container">
        <Split
          media={{ label: "Video z tisku", variant: "circle", src: "/video/epson-tisk-mini.mp4", alt: "Velkoformátový tisk na Epson SureColor" }}
          eyebrow="Výroba v Opavě"
          title="Když kroky navazují, mizí slabá místa."
          text="Tisk, řezání, laminace a aplikace řešíme jako jeden výrobní celek."
          cta={{ label: "Probrat výrobu", href: INQUIRY_URL }}
        />
      </section>

      <section className="section section--rule container" id="stroje">
        <SectionHead
          title="Stroje jsou prostředek. Výsledek je měřítko."
          text="U tiskáren a plotru najdete pod odkazem parametry, materiály i výčet toho, co se na nich dá vyrobit."
          indent={1}
        />
        <div>
          {strojovyPark.map((tech) => (
            <TechCard tech={tech} key={tech.name} />
          ))}
        </div>
      </section>

      <section className="section section--rule container">
        <SectionHead title="Kontrola probíhá dřív, než je pozdě." indent={1} />
        <Process
          steps={[
            { title: "Data a rozměr", text: "Kontrola podkladů před výrobou." },
            { title: "Materiál a místo", text: "Volba podle skutečného použití." },
            { title: "První výstup", text: "Kontrola barev a detailu." },
            { title: "Předání", text: "Hotové, zkontrolované, na místě." },
          ]}
        />
      </section>

      <section className="section section--rule container">
        <SectionHead title="Jedna výroba. Tři typy výsledku." />
        <Directory
          cols={3}
          items={[
            { title: "Tisk", text: "Bannery, samolepky, plakáty, tiskoviny.", href: "/tisk", cta: "Prohlédnout tisk" },
            { title: "Polepy", text: "Auta, výlohy a interiéry.", href: "/polepy", cta: "Prohlédnout polepy" },
            { title: "Reklama", text: "Cedule, světlo a 3D loga.", href: "/reklama", cta: "Prohlédnout reklamu" },
          ]}
        />
      </section>

      <section className="section section--rule container">
        <SectionHead eyebrow="Časté dotazy" title="Než zadání pošlete do výroby" />
        <Accordion items={techFaq} />
      </section>

      <FinalCta
        title="Nevíte, jak začít s výrobou?"
        cta={{ label: "Probrat zadání", href: INQUIRY_URL }}
        secondary={{ label: "Prohlédnout realizace", href: "/realizace" }}
      />
    </>
  );
}
