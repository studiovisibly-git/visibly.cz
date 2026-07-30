import { Hero } from "@/components/Hero";
import { Accordion } from "@/components/Accordion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Band, Directory, FinalCta, Process, ProofStrip, SectionHead } from "@/components/Sections";
import { TechStrip, VYROBCI } from "@/components/TechStrip";
import { ostravaAreaServed, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { INQUIRY_URL, SITE_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Tiskárna Ostrava — tisk s dodáním a montáží | Visibly",
  description:
    "Tiskárna pro Ostravu: velkoformátový tisk, bannery, samolepky, roll-upy i tiskoviny. Data zkontrolujeme online, vyrobíme 35 minut od Ostravy a dovezeme k vám.",
  path: "/tiskarna-ostrava",
});

const ostravaFaq = [
  {
    q: "Musím kvůli tisku jezdit do Opavy?",
    a: "Nemusíte. Poptávku, kontrolu dat i korektury vyřešíme online nebo telefonem a hotovou zakázku do Ostravy dovezeme — nebo rovnou namontujeme. Do výroby se ale můžete kdykoli přijet podívat.",
  },
  {
    q: "Účtujete dopravu do Ostravy?",
    a: "Dopravu vidíte v nabídce předem — u větších zakázek a zakázek s montáží bývá v ceně. Nikdy není překvapením na faktuře.",
  },
  {
    q: "Jak rychle umíte dodat do Ostravy?",
    a: "Běžné zakázky v řádu dní od odsouhlasení dat. Když hoří termín, napište to rovnou do poptávky — obratem řekneme, jestli ho stihneme.",
  },
  {
    q: "Tisknete i pro ostravské agentury a grafiky?",
    a: "Ano, partnerský tisk je běžná část naší výroby. Vůči vašim klientům vystupujete vy — my diskrétně pohlídáme data, tisk a termín.",
  },
  {
    q: "Proč tiskárna z Opavy, a ne z Ostravy?",
    a: "Protože na adrese záleží míň než na výsledku. Vlastní stroje, kontrola dat před tiskem a jedna parta, která za zakázku odpovídá — a Opava je z Ostravy 35 minut.",
  },
];

export default function TiskarnaOstravaPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Tiskárna Ostrava", href: "/tiskarna-ostrava" }]} />

      <Hero
        variant="media"
        eyebrow="Tiskárna pro Ostravu"
        title="Tiskárna pro Ostravu. Výroba 35 minut od vás."
        sub="Bannery, samolepky, plakáty i firemní tiskoviny. Data zkontrolujeme online, vytiskneme na vlastních strojích a do Ostravy dovezeme — nebo rovnou namontujeme."
        primary={{ label: "Poptat tisk", href: INQUIRY_URL }}
        scroll={{ label: "Jak funguje tisk na dálku", href: "#jak-to-funguje" }}
        media={{
          label: "Video z výroby",
          variant: "circle",
          src: "/video/epson-tisk-mini.mp4",
          alt: "Velkoformátový tisk pro Ostravu ve výrobě Visibly",
        }}
      />

      <ProofStrip
        items={[
          { title: "Celý proces na dálku", text: "Poptávka, data i korektury online nebo telefonem." },
          { title: "Vlastní výroba", text: "Tisk, řez i laminace pod jednou střechou — žádné přeprodávání." },
          { title: "Dodání i montáž v Ostravě", text: "Hotovou zakázku přivezeme, polepy a cedule aplikujeme u vás." },
        ]}
      />

      <section className="section container" id="jak-to-funguje">
        <SectionHead
          title="Z Ostravy k nám nemusíte. Zakázka dojede sama."
          text="Celý průběh je stavěný na dálku — od první fotky po předání."
          indent={1}
        />
        <Process
          steps={[
            { title: "Pošlete poptávku", text: "Stačí fotka, rozměr nebo krátký popis toho, co potřebujete." },
            { title: "Zkontrolujeme data", text: "Rozlišení, spadávky a barevnost projdou kontrolou před tiskem." },
            { title: "Vyrobíme v Opavě", text: "Vlastní stroje Epson a Agfa, laminace i řez na jednom místě." },
            { title: "Dovezeme do Ostravy", text: "Dodání na adresu, nebo montáž a aplikace přímo u vás." },
          ]}
        />
      </section>

      <section className="section section--rule container" id="sluzby">
        <SectionHead
          title="Co pro Ostravu tiskneme nejčastěji"
          text="Každá služba má vlastní stránku s detaily, materiály a cenami."
        />
        <Directory
          cols={3}
          items={[
            { title: "Velkoformátový tisk", text: "Bannery, fólie a plakáty v metrech, ne centimetrech.", href: "/tisk/velkoformatovy-tisk", cta: "Velkoformát" },
            { title: "Bannery a plachty", text: "Na plot, fasádu, lešení i akce — s konfekcí podle místa.", href: "/tisk/bannery-a-plachty", cta: "Bannery" },
            { title: "Samolepky a fólie", text: "Tištěné i řezané, s laminací pro delší životnost.", href: "/tisk/samolepky-a-folie", cta: "Samolepky" },
            { title: "Roll-upy", text: "Kvalitní konstrukce a grafika čitelná ze tří metrů.", href: "/tisk/roll-upy", cta: "Roll-upy" },
            { title: "Billboardy a citylighty", text: "Přesné formáty pro pronajaté plochy v Ostravě.", href: "/tisk/billboardy-a-citylighty", cta: "Billboardy" },
            { title: "Firemní tiskoviny", text: "Vizitky, letáky a brožury sladěné se zbytkem značky.", href: "/tisk/tiskoviny", cta: "Tiskoviny" },
          ]}
        />
      </section>

      {/* Ostravská stránka slibuje výrobu v Opavě pro Ostravu — pás strojů
          dokládá, že se veze hotová práce, ne přeprodaná zakázka. */}
      <section className="section--tight container">
        <TechStrip
          eyebrow="Vlastní výroba v Opavě"
          title="Do Ostravy vezeme hotovou práci."
          text="Nejsme překupník, který zakázku pošle dál. Tiskneme, řežeme a laminujeme na svých strojích, 30 minut od Ostravy."
          items={[
            { ...VYROBCI.epson, what: "Deset barev, ne jen CMYK" },
            { ...VYROBCI.agfa, what: "Až 3,2 m bez spoje" },
            { ...VYROBCI.roland, what: "Tvar podle grafiky" },
          ]}
          href="/technologie"
          cta="Projít technologie"
        />
      </section>

      <section className="section--tight container">
        <Band
          eyebrow="B2B cesta"
          title="Tiskneme i pro ostravské agentury."
          text="Dodáte data, my pohlídáme výrobu — diskrétně vůči vašim klientům."
          cta={{ label: "Partnerský tisk", href: "/pro-agentury" }}
        />
      </section>

      <section className="section section--rule container">
        <SectionHead
          title="Polepy a reklamu řešíme pro Ostravu také"
          text="Montáž i aplikace probíhá u vás — přijedeme na zaměření."
        />
        <Directory
          items={[
            { title: "Polepy v Ostravě", text: "Auta, dodávky, výlohy i interiéry — aplikace u vás nebo u nás.", href: "/polepy-ostrava", cta: "Polepy Ostrava" },
            { title: "Výroba reklamy pro Ostravu", text: "Cedule, světelná reklama a 3D loga včetně montáže.", href: "/reklama-ostrava", cta: "Reklama Ostrava" },
          ]}
        />
      </section>

      <section className="section section--rule container">
        <SectionHead eyebrow="Časté dotazy" title="Než pošlete poptávku z Ostravy" />
        <Accordion items={ostravaFaq} />
      </section>

      <FinalCta
        title="Potřebujete tisk v Ostravě?"
        text="Napište, co má vzniknout — vrátíme nabídku s termínem i dopravou."
        cta={{ label: "Poslat poptávku", href: INQUIRY_URL }}
        secondary={{ label: "Prohlédnout realizace", href: "/realizace" }}
      />

      {/* Structured data: Service (Ostrava) + FAQ */}
      <JsonLd
        data={serviceSchema({
          name: "Tiskárna Ostrava — velkoformátový tisk a tiskoviny",
          description:
            "Tisk pro firmy z Ostravy: velkoformátový tisk, bannery, samolepky, roll-upy a firemní tiskoviny s dodáním a montáží v Ostravě.",
          url: `${SITE_URL}/tiskarna-ostrava`,
          area: ostravaAreaServed,
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ostravaFaq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
