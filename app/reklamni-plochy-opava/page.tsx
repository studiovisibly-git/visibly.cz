import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Accordion } from "@/components/Accordion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Media } from "@/components/Media";
import { Band, FinalCta, ProofStrip, SectionHead } from "@/components/Sections";
import { buildMetadata } from "@/lib/seo";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { poptavkaUrl } from "@/lib/poptavka";

export const metadata = buildMetadata({
  title: "Reklamní plochy Opava — pronájem ploch s tiskem | Visibly",
  description:
    "Pronájem reklamních ploch v Opavě včetně tisku a instalace grafiky. Plochy na frekventovaných místech — kampaň vyřešíte na jednom místě.",
  path: "/reklamni-plochy-opava",
});

const plochyFaq = [
  {
    q: "Co je v ceně pronájmu plochy?",
    a: "Pronájem plochy na sjednané období. Tisk a instalaci grafiky naceníme společně s pronájmem — vše vyřídíte jednou objednávkou u nás.",
  },
  {
    q: "Na jak dlouho si můžu plochu pronajmout?",
    a: "Obvykle od jednoho měsíce. U delších kampaní nabízíme zvýhodněné ceny — napište období, které zvažujete.",
  },
  {
    q: "Vyrobíte i grafiku kampaně?",
    a: "Ano, návrh, tisk i instalaci zajistíme kompletně. Grafiku stavíme pro čtení z dálky — jedna myšlenka, velké písmo, jasný kontakt.",
  },
  {
    q: "Jak rychle může kampaň viset?",
    a: "Podle obsazenosti ploch — když je plocha volná a data hotová, zvládneme instalaci v řádu dnů.",
  },
];

export default function ReklamniPlochyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Reklamní plochy Opava", href: "/reklamni-plochy-opava" }]} />

      <Hero
        variant="media"
        eyebrow="Lokální kampaně"
        title="Reklamní plochy v Opavě. S tiskem v ceně úvahy."
        sub="Pronajměte si plochu na frekventovaném místě — a tisk i instalaci vyřešte jednou objednávkou u nás."
        primary={{ label: "Poptat plochu", href: poptavkaUrl("reklamni-plochy-opava") }}
        scroll={{ label: "Jedna objednávka. Celá kampaň.", href: "#jak-to-funguje" }}
        media={{ label: "Kruhová fotografie · reklamní plocha v Opavě", variant: "circle" }}
      />

      <ProofStrip
        items={[
          { title: "Plochy v Opavě", text: "Frekventovaná místa, která lidé denně míjejí." },
          { title: "Tisk u nás", text: "Grafika z vlastní výroby — žádné dohadování třetích stran." },
          { title: "Instalace v ceně nabídky", text: "Kampaň visí bez vaší práce." },
        ]}
      />

      <section className="section container" id="jak-to-funguje">
        <SectionHead
          title="Jedna objednávka. Celá kampaň."
          text="Plochu, tisk i výlep vyřešíte na jednom místě — a kampaň může viset v řádu dnů."
          indent={1}
        />
        <div className="directory">
          <article className="dir-card" data-reveal>
            <span className="num">01</span>
            <h3>Vyberete plochu a termín</h3>
            <p>Pošleme aktuální nabídku volných ploch s fotkami a cenami.</p>
          </article>
          <article className="dir-card" data-reveal>
            <span className="num">02</span>
            <h3>Dodáte podklady — nebo jen zadání</h3>
            <p>Grafiku kampaně navrhneme, nebo zkontrolujeme vaše data.</p>
          </article>
          <article className="dir-card" data-reveal>
            <span className="num">03</span>
            <h3>Vytiskneme a nainstalujeme</h3>
            <p>Tisk z vlastního stroje, instalace naší partou.</p>
          </article>
          <article className="dir-card" data-reveal>
            <span className="num">04</span>
            <h3>Kampaň visí</h3>
            <p>Pošleme fotodokumentaci — vidíte, za co platíte.</p>
          </article>
        </div>
      </section>

      <section className="section--tight container">
        <Band
          title="Chcete vlastní plochu místo pronájmu?"
          text="Billboardy a citylighty tiskneme i pro plochy jiných provozovatelů."
          cta={{ label: "Tisk billboardů", href: "/tisk/billboardy-a-citylighty" }}
        />
      </section>

      <section className="section section--rule container">
        <SectionHead eyebrow="Časté dotazy" title="Než si pronajmete plochu" />
        <Accordion items={plochyFaq} />
      </section>

      <FinalCta
        title="Chcete viset v Opavě?"
        text="Napište termín a rozpočet — vrátíme nabídku volných ploch."
        cta={{ label: "Poptat plochu", href: poptavkaUrl("reklamni-plochy-opava") }}
      />
    </>
  );
}
