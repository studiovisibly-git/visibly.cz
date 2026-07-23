import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Accordion } from "@/components/Accordion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Media } from "@/components/Media";
import { Band, FinalCta, Process, ProofStrip, SectionHead } from "@/components/Sections";
import { buildMetadata } from "@/lib/seo";
import { EMAIL, EMAIL_HREF, INQUIRY_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Partnerský tisk pro agentury a grafická studia | Visibly Opava",
  description:
    "Tisknete pro klienty? Dodáte data, my pohlídáme výrobu. Partnerský tisk pro agentury a grafiky: diskrétnost, technická parita a férový ceník.",
  path: "/pro-agentury",
});

const b2bFaq = [
  {
    q: "Budete kontaktovat našeho klienta?",
    a: "Ne. Váš klient je váš — nekontaktujeme ho, neznačkujeme dodávky a na přání vystupujeme na místě pod vaší vlajkou. Diskrétnost je základ, na kterém partnerský režim stojí.",
  },
  {
    q: "Jak rychle vracíte kalkulace?",
    a: "Běžné zakázky obvykle do 24 hodin v pracovním týdnu. Víme, že klientovi slibujete termín — a čekání na nabídku tiskárny je to poslední, co potřebujete.",
  },
  {
    q: "Jaké podklady posíláte k přípravě dat?",
    a: "Šablony a specifikace pro každou technologii: přesahy pro řez, bílá pod tiskem, profily. Mluvíme s vámi jako grafik s grafikem.",
  },
  {
    q: "Umíte doručit přímo koncovému klientovi?",
    a: "Ano — neutrálně zabalené, s vaším dodacím listem, kamkoli po ČR. Nebo zakázku vyzvednete u nás v Opavě.",
  },
  {
    q: "Od jakého objemu platí partnerské ceny?",
    a: "Od druhé spolupráce automaticky. Nechceme sliby o objemech — chceme, aby se vám s námi vyplatilo tisknout dlouhodobě.",
  },
];

export default function ProAgenturyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Pro agentury", href: "/pro-agentury" }]} />

      <Hero
        variant="media"
        eyebrow="B2B · Partnerský tisk"
        title="Vy držíte klienta. My držíme výrobu."
        sub="Partnerský tisk pro agentury a grafická studia. Dodáte data, my pohlídáme kvalitu, termín a mlčenlivost."
        note="První odpověď obvykle do 24 hodin."
        primary={{ label: "Chci partnerský ceník", href: INQUIRY_URL }}
        scroll={{ label: "Jedna výroba pro celé vaše portfolio", href: "#co-vyrobite" }}
        media={{ label: "Kruhová fotografie · výroba / tiskový stroj", variant: "circle" }}
      />

      <ProofStrip
        items={[
          { title: "Diskrétnost", text: "Váš klient zůstává váš. Vždy." },
          { title: "Technická parita", text: "Profily, přesahy, bílá — žádné vysvětlování základů." },
          { title: "Vlastní stroje", text: "Epson SureColor, Roland, laminace, termolis." },
          { title: "Upřímné termíny", text: "Co slíbíme, drží. Co nejde, řekneme hned." },
        ]}
      />

      <section className="section container" id="co-vyrobite">
        <SectionHead
          eyebrow="Co u nás vyrobíte"
          title="Jedna výroba pro celé vaše portfolio."
          indent={1}
        />
        <div className="directory">
          <article className="dir-card" data-reveal>
            <span className="num">01</span>
            <h3>Velkoformátový tisk</h3>
            <p>Bannery, fólie, samolepky, plakáty, backlit. Solventní tisk na Epson SureColor.</p>
            <Link href="/tisk/velkoformatovy-tisk" className="dir-card__link dir-card--link">
              Specifikace tisku <span className="arr" aria-hidden="true">↗</span>
            </Link>
          </article>
          <article className="dir-card" data-reveal>
            <span className="num">02</span>
            <h3>Řezaná grafika a polepy</h3>
            <p>Ploter Roland, laminace, aplikační fólie. Včetně aplikace u klienta.</p>
            <Link href="/polepy/rezana-grafika" className="dir-card__link dir-card--link">
              Specifikace řezu <span className="arr" aria-hidden="true">↗</span>
            </Link>
          </article>
          <article className="dir-card" data-reveal>
            <span className="num">03</span>
            <h3>Tiskoviny a POS</h3>
            <p>Vizitky, letáky, brožury, stojky a kompletace kampaní po pobočkách.</p>
            <Link href="/tisk/tiskoviny" className="dir-card__link dir-card--link">
              Projít tiskoviny <span className="arr" aria-hidden="true">↗</span>
            </Link>
          </article>
          <article className="dir-card" data-reveal>
            <span className="num">04</span>
            <h3>Textil termolisem</h3>
            <p>Malé série bez minimálních nákladů — vzorky před výrobou samozřejmost.</p>
            <Link href="/reklama/reklamni-textil" className="dir-card__link dir-card--link">
              Projít textil <span className="arr" aria-hidden="true">↗</span>
            </Link>
          </article>
        </div>
      </section>

      <section className="section section--rule container">
        <SectionHead title="Jak spolupráce probíhá." indent={1} />
        <Process
          steps={[
            { title: "Data a specifikace", text: "Pošlete data, nebo jen popis — technické řešení doladíme." },
            { title: "Kalkulace do 24 h", text: "Cena a termín bez obvolávání." },
            { title: "Výroba a kontrola", text: "Vyrobíme a zkontrolujeme proti datům." },
            { title: "Předání", text: "Vám, nebo diskrétně přímo klientovi." },
          ]}
        />
      </section>

      <section className="section--tight container">
        <Band
          eyebrow="Férovost především"
          title="Nekonkurujeme vám. Tiskneme vám."
          text="Grafické služby nabízíme jen koncovým klientům, kteří přijdou přímo — vaše zakázky jsou u nás jen výroba."
          cta={{ label: "Chci partnerský ceník", href: INQUIRY_URL }}
        />
      </section>

      <section className="section section--rule container">
        <SectionHead eyebrow="Časté dotazy" title="Na co se agentury ptají nejčastěji" />
        <Accordion items={b2bFaq} />
      </section>

      <FinalCta
        title="Pojďme tisknout pro vaše klienty."
        text="Napište pár řádků o studiu a objemech — vrátíme ceník a podmínky."
        cta={{ label: "Chci partnerský ceník", href: INQUIRY_URL }}
        secondary={{ label: "Průvodce partnerským tiskem", href: "/pruvodce/partnersky-tisk-pro-agentury" }}
      />
    </>
  );
}
