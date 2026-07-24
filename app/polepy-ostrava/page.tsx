import { Hero } from "@/components/Hero";
import { Accordion } from "@/components/Accordion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Band, Directory, FinalCta, Process, ProofStrip, SectionHead } from "@/components/Sections";
import { ostravaAreaServed, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { INQUIRY_URL, SITE_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Polepy Ostrava — auta, dodávky, výlohy | Visibly",
  description:
    "Polepy aut, dodávek a výloh pro Ostravu. Návrh a výroba ve vlastní dílně, auto polepíme v krytém zázemí, výlohy a interiéry aplikujeme přímo u vás v Ostravě.",
  path: "/polepy-ostrava",
});

const polepyFaq = [
  {
    q: "Kde probíhá polep auta?",
    a: "V kryté dílně v Opavě — kvalitní polep potřebuje čisto, stálou teplotu a klid na práci. U běžného rozsahu auto přebíráme ráno a večer odjíždí polepené.",
  },
  {
    q: "Vyplatí se polep, když jsme z Ostravy?",
    a: "Ano. Cesta do Opavy trvá 35 minut a kvůli autu k nám pojedete jednou. Výlohy, interiéry a označení provozovny polepíme přímo u vás v Ostravě.",
  },
  {
    q: "Polepíte výlohu přímo v Ostravě?",
    a: "Ano. Přijedeme na zaměření, grafiku navrhneme a vyrobíme u nás a vrátíme se s hotovou fólií. Aplikace proběhne na místě, obvykle během pár hodin.",
  },
  {
    q: "Zvládnete jednotný polep pro celou flotilu?",
    a: "Ano — připravíme šablonu pro každý typ vozu a termíny rozložíme tak, aby flotila nikdy nestála celá naráz. Jednotný vzhled hlídáme na všech autech.",
  },
  {
    q: "Kolik polep auta stojí?",
    a: "Od nižších tisíců za řezané logo na dveře po desítky tisíc za celopolep. Cenu ovlivňuje rozsah, typ fólie a tvar karoserie — pošlete fotku auta a vrátíme konkrétní nabídku.",
  },
];

export default function PolepyOstravaPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Polepy Ostrava", href: "/polepy-ostrava" }]} />

      <Hero
        variant="media"
        eyebrow="Polepy · Ostrava"
        title="Polepy pro Ostravu. Od jednoho auta po flotilu."
        sub="Auta, dodávky, výlohy i interiéry. Grafiku navrhneme a vyrobíme ve vlastní dílně — auto polepíme v krytém zázemí, výlohy aplikujeme přímo u vás v Ostravě."
        primary={{ label: "Poptat polep", href: INQUIRY_URL }}
        scroll={{ label: "Co v Ostravě polepujeme", href: "#sluzby" }}
        media={{
          label: "Polep firemního vozu",
          variant: "circle",
          src: "/images/realizace-ps-green-polep-optimized.jpg",
          alt: "Polep firemního auta z výroby Visibly",
        }}
      />

      <ProofStrip
        items={[
          { title: "Aplikace u vás nebo u nás", text: "Auta v krytém zázemí, výlohy a interiéry na místě v Ostravě." },
          { title: "Vlastní tisk a ploter", text: "Fólie tiskneme a řežeme u sebe — kvalitu neměníme podle subdodávek." },
          { title: "Flotily a série", text: "Jednotný styl pro všechna auta, termíny podle vašeho provozu." },
        ]}
      />

      <section className="section container" id="sluzby">
        <SectionHead
          title="Co pro Ostravu polepujeme"
          text="Každý typ polepu má vlastní stránku s materiály, postupem a cenami."
          indent={1}
        />
        <Directory
          items={[
            { title: "Polepy aut", text: "Řezaná grafika i tištěné fólie, částečný i celopolep.", href: "/polepy/polepy-aut", cta: "Polepy aut" },
            { title: "Polepy dodávek", text: "Velké plochy, které prodávají — jednotný styl pro flotilu.", href: "/polepy/polepy-dodavek", cta: "Polepy dodávek" },
            { title: "Polepy výloh", text: "Řezaná grafika, tisk i mléčné fólie — aplikace v Ostravě.", href: "/polepy/polepy-vyloh", cta: "Polepy výloh" },
            { title: "Interiérové polepy", text: "Stěny, sklo a navigace v kancelářích a provozovnách.", href: "/polepy/interierove-polepy", cta: "Interiéry" },
          ]}
        />
      </section>

      <section className="section section--rule container">
        <SectionHead
          title="Jak probíhá polep, když jste z Ostravy"
          text="Většinu vyřešíme na dálku — osobně se potkáme až u aplikace."
          indent={1}
        />
        <Process
          steps={[
            { title: "Fotka a zadání", text: "Pošlete fotku auta nebo výlohy a představu, co má polep říct." },
            { title: "Návrh na míru", text: "Grafika sedne na konkrétní karoserii nebo sklo — ne na šablonu." },
            { title: "Výroba fólií", text: "Tisk, laminace a řez ve vlastní dílně v Opavě." },
            { title: "Aplikace", text: "Auto u nás v krytém zázemí, výlohy a interiéry u vás v Ostravě." },
          ]}
        />
      </section>

      <section className="section--tight container">
        <Band
          eyebrow="Flotily"
          title="Jedna značka na všech autech."
          text="Šablony pro každý typ vozu a termíny, při kterých flotila nestojí."
          cta={{ label: "Probrat flotilu", href: INQUIRY_URL }}
        />
      </section>

      <section className="section section--rule container">
        <SectionHead eyebrow="Časté dotazy" title="Než objednáte polep v Ostravě" />
        <Accordion items={polepyFaq} />
      </section>

      <FinalCta
        title="Chcete polep v Ostravě?"
        text="Pošlete fotku auta nebo výlohy — vrátíme návrh řešení s cenou."
        cta={{ label: "Poslat poptávku", href: INQUIRY_URL }}
        secondary={{ label: "Tiskárna pro Ostravu", href: "/tiskarna-ostrava" }}
      />

      {/* Structured data: Service (Ostrava) + FAQ */}
      <JsonLd
        data={serviceSchema({
          name: "Polepy Ostrava — auta, dodávky a výlohy",
          description:
            "Polepy aut, dodávek, výloh a interiérů pro firmy z Ostravy. Návrh a výroba ve vlastní dílně, aplikace v krytém zázemí nebo přímo v Ostravě.",
          url: `${SITE_URL}/polepy-ostrava`,
          area: ostravaAreaServed,
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: polepyFaq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
