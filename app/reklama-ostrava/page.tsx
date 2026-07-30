import { Hero } from "@/components/Hero";
import { Accordion } from "@/components/Accordion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Band, Directory, FinalCta, Process, ProofStrip, SectionHead } from "@/components/Sections";
import { ostravaAreaServed, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { poptavkaUrl } from "@/lib/poptavka";

export const metadata = buildMetadata({
  title: "Reklama Ostrava — cedule, světelná reklama, 3D loga | Visibly",
  description:
    "Výroba reklamy pro Ostravu: reklamní cedule, světelná reklama, 3D loga a orientační systémy. Obhlídka a montáž u vás v Ostravě, výroba na vlastních strojích.",
  path: "/reklama-ostrava",
});

const reklamaFaq = [
  {
    q: "Přijedete na obhlídku do Ostravy?",
    a: "Ano, zaměření a obhlídka místa jsou běžnou součástí zakázky. Návrh pak sedí na skutečnou fasádu a světelné podmínky — ne na fotku z mapy.",
  },
  {
    q: "Zajistíte montáž v Ostravě?",
    a: "Ano, montujeme vlastní partou po celé Ostravě a okolí — fasády, ploty, výlohy i interiéry. Neposíláme subdodávku: montuje parta, která reklamu vyrobila.",
  },
  {
    q: "Potřebuji povolení na reklamu na fasádě?",
    a: "U vlastní provozovny většinou stačí souhlas majitele objektu. U památkových zón, velkých formátů a světelné reklamy pomůžeme ověřit, co místo dovolí, ještě před výrobou.",
  },
  {
    q: "Kolik stojí světelná reklama?",
    a: "Podle velikosti a technologie — prosvětlený box vyjde jinak než 3D písmena s podsvitem. Po obhlídce dostanete cenu na konkrétní řešení, ne odhad od stolu.",
  },
  {
    q: "Jak dlouho trvá výroba a montáž?",
    a: "Cedule v řádu dní, světelná reklama a 3D loga podle složitosti výroby. Termín potvrdíme v nabídce — a držíme ho, protože výrobu ani montáž nepřeprodáváme.",
  },
];

export default function ReklamaOstravaPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Reklama Ostrava", href: "/reklama-ostrava" }]} />

      <Hero
        variant="media"
        eyebrow="Reklamní výroba · Ostrava"
        title="Reklama pro Ostravu. Včetně montáže u vás."
        sub="Cedule, světelná loga i navigace v budovách. Přijedeme na obhlídku, navrhneme podle místa, vyrobíme na vlastních strojích a namontujeme vlastní partou."
        primary={{ label: "Poptat reklamu", href: poptavkaUrl("reklama-ostrava") }}
        scroll={{ label: "Co pro Ostravu vyrábíme", href: "#sluzby" }}
        media={{
          label: "Označení provozovny",
          variant: "circle",
          src: "/images/realizace-rezani-betonu-hero-optimized.jpg",
          alt: "Označení provozovny z výroby Visibly",
        }}
      />

      <ProofStrip
        items={[
          { title: "Obhlídka v Ostravě", text: "Návrh stavíme podle skutečného místa, ne fotky z mapy." },
          { title: "Vlastní výroba", text: "Tisk, řez i kompletace pod jednou střechou v Opavě." },
          { title: "Montáž vlastní partou", text: "Montuje parta, která reklamu vyrobila — žádná subdodávka." },
        ]}
      />

      <section className="section container" id="sluzby">
        <SectionHead
          title="Co pro Ostravu vyrábíme"
          text="Každá služba má vlastní stránku s materiály, postupem a cenami."
        />
        <Directory
          cols={3}
          items={[
            { title: "Reklamní cedule", text: "Dibond, PVC i plexi — čitelné z místa, odkud se skutečně dívá.", href: "/reklama/reklamni-cedule", cta: "Cedule" },
            { title: "Světelná reklama", text: "Prosvětlená loga, boxy a LED nápisy s úsporným provozem.", href: "/reklama/svetelna-reklama", cta: "Světelná reklama" },
            { title: "3D loga", text: "Plastická písmena na fasády i recepce, s podsvitem i bez.", href: "/reklama/3d-loga", cta: "3D loga" },
            { title: "Venkovní reklama", text: "Od cedule po označení celé provozovny.", href: "/reklama/venkovni-reklama", cta: "Venkovní reklama" },
            { title: "Interiérová reklama", text: "Loga na recepce, grafika na stěny, značení prodejen.", href: "/reklama/interierova-reklama", cta: "Interiéry" },
            { title: "Orientační systémy", text: "Navigace v budovách a areálech, se kterou se nikdo neztratí.", href: "/reklama/orientacni-systemy", cta: "Navigace" },
          ]}
        />
      </section>

      <section className="section section--rule container">
        <SectionHead
          title="Od obhlídky po rozsvícení"
          text="Celou cestu držíme u sebe — proto víme, že výsledek bude sedět."
          indent={1}
        />
        <Process
          steps={[
            { title: "Obhlídka a zaměření", text: "Přijedeme na místo v Ostravě, změříme a nafotíme." },
            { title: "Návrh v kontextu", text: "Vizualizace na skutečné fasádě — vidíte výsledek předem." },
            { title: "Výroba v Opavě", text: "Tisk, řez, kompletace i elektro na jednom místě." },
            { title: "Montáž a předání", text: "Namontujeme, zapojíme a předáme hotové." },
          ]}
        />
      </section>

      <section className="section--tight container">
        <Band
          eyebrow="Nevíte, kde začít?"
          title="Co na provozovnu patří nejdřív?"
          text="Sepsali jsme, v jakém pořadí investovat do označení provozovny."
          cta={{ label: "Jak označit provozovnu", href: "/pruvodce/jak-oznacit-provozovnu" }}
        />
      </section>

      <section className="section section--rule container">
        <SectionHead eyebrow="Časté dotazy" title="Než objednáte reklamu v Ostravě" />
        <Accordion items={reklamaFaq} />
      </section>

      <FinalCta
        title="Chcete být v Ostravě vidět?"
        text="Pošlete fotku místa — vrátíme návrh řešení s cenou a termínem."
        cta={{ label: "Poslat poptávku", href: poptavkaUrl("reklama-ostrava") }}
        secondary={{ label: "Prohlédnout realizace", href: "/realizace" }}
      />

      {/* Structured data: Service (Ostrava) + FAQ */}
      <JsonLd
        data={serviceSchema({
          name: "Výroba reklamy Ostrava — cedule, světelná reklama, 3D loga",
          description:
            "Reklamní výroba pro firmy z Ostravy: cedule, světelná reklama, 3D loga a orientační systémy s obhlídkou a montáží v Ostravě.",
          url: `${SITE_URL}/reklama-ostrava`,
          area: ostravaAreaServed,
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: reklamaFaq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
