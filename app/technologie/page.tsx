import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Accordion } from "@/components/Accordion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Media } from "@/components/Media";
import { Directory, FinalCta, Process, SectionHead, Split } from "@/components/Sections";
import { VYROBCI } from "@/components/TechStrip";
import { buildMetadata } from "@/lib/seo";
import { INQUIRY_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Technologie — vlastní výroba v Opavě | Visibly",
  description:
    "Strojový park Visibly: velkoformátový tisk Epson SureColor, řezací ploter Roland, laminace a termolis. Výroba, která hlídá výsledek od dat po předání.",
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

/* `brand` je klíč do VYROBCI — logo výrobce v hlavičce karty. Procesy bez
   značkového stroje (laminace, termolis, kompletace) ho schválně nemají;
   dokreslovat jim logo by bylo zavádějící. */
type Tech = {
  num: string;
  name: string;
  brand?: keyof typeof VYROBCI;
  points: { title: string; text: string }[];
};

const techList: Tech[] = [
  {
    num: "01 · Velkoformátový tisk",
    name: "Epson SureColor SC-S80610",
    brand: "epson",
    points: [
      { title: "Barva pod kontrolou", text: "Čitelnost odstínů a detailů i na metrech plochy." },
      { title: "Materiál podle místa", text: "Fólie, bannery, papíry — povrch podle použití." },
      { title: "Více typů výstupu", text: "Od samolepky po backlit do světelného rámu." },
    ],
  },
  {
    num: "02 · Hybridní UV tisk",
    name: "Agfa Anapurna M2050i",
    brand: "agfa",
    points: [
      { title: "Deska i role", text: "Tiskne přímo na Dibond, sklo, hliník, keramiku i fólie." },
      { title: "Bílá barva", text: "Podklad pod barvy i tisk na průhledné materiály." },
      { title: "Ven i dovnitř", text: "UV LED odolnost pro výlohy, cedule i interiér." },
    ],
  },
  {
    num: "03 · Rolový UV tisk",
    name: "Agfa Anapurna RTR3200i LED",
    brand: "agfa",
    points: [
      { title: "Až 3,2 metru", text: "Bannery a plachty v jednom kuse, bez spojů." },
      { title: "Dvě role zároveň", text: "Vyšší průchodnost u velkých sérií a formátů." },
      { title: "Šetrné vytvrzení", text: "UV LED zvládne i teplem citlivé fólie a plachty." },
    ],
  },
  {
    num: "04 · Přesný řez",
    name: "Roland CAMM-1 GR2-640",
    brand: "roland",
    points: [
      { title: "Čisté hrany", text: "Detail odpovídá datům, ne náladě nože." },
      { title: "Tvar podle grafiky", text: "Logo nemusí končit obdélníkem." },
      { title: "Připraveno k aplikaci", text: "S aplikační fólií, části na sebe navazují." },
    ],
  },
  {
    num: "05 · Ochrana povrchu",
    name: "Velkoplošná laminace",
    points: [
      { title: "Odolnější povrch", text: "UV, oděr i mytí bez ztráty barev." },
      { title: "Mat nebo lesk", text: "Vzhled podle použití a světla." },
      { title: "Součást řešení", text: "Doporučíme, jen kde dává smysl." },
    ],
  },
  {
    num: "06 · Firemní textil",
    name: "Termolis",
    points: [
      { title: "Správná pozice", text: "Logo přesně tam, kde má být." },
      { title: "Menší série", text: "Od jednoho kusu, bez příplatků za málo." },
      { title: "Jednotná značka", text: "Textil ladí s autem i tiskovinami." },
    ],
  },
  {
    num: "07 · Dokončení na místě",
    name: "Kompletace a aplikace",
    points: [
      { title: "Složení zakázky", text: "Kampaně balíme po pobočkách." },
      { title: "Čistá aplikace", text: "Polepy bez bublin, montáž bez děr navíc." },
      { title: "Kontrola v kontextu", text: "Výsledek posuzujeme na místě, ne od stolu." },
    ],
  },
];

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
          indent={1}
        />
        <div>
          {techList.map((tech) => (
            <article className="tech-item" key={tech.name} data-reveal>
              <div className="tech-item__head">
                <span className="eyebrow">{tech.num}</span>
                <h3>{tech.name}</h3>
                {tech.brand && (
                  /* Logo výrobce jako podpis pod jméno stroje — oddělené
                     vlasovkou, aby to čtelo jako údaj, ne jako reklama. */
                  <span className="tech-item__brand">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={VYROBCI[tech.brand].logo}
                      alt={VYROBCI[tech.brand].name}
                      loading="lazy"
                    />
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
              </div>
            </article>
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
            { title: "Reklama", text: "Cedule, světlo a 3D loga.", href: "/reklama", cta: "Prohlédnout reklamu" },
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
