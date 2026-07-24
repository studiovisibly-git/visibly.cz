import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Media } from "@/components/Media";
import { FinalCta, SectionHead, Split, WorkCard } from "@/components/Sections";
import { buildMetadata } from "@/lib/seo";
import {
  ADDRESS_FULL,
  EMAIL,
  INQUIRY_URL,
  PHONE_DISPLAY,
} from "@/lib/site";
import { works } from "@/lib/works";

export const metadata = buildMetadata({
  title: "O nás — tiskárna a reklamní výroba z Opavy | Visibly",
  description:
    "Visibly je tiskárna a studio reklamní výroby z Opavy. Nejdřív řešíme, co má reklama udělat — teprve potom, jak ji vyrobit. Vlastní stroje, přímý kontakt.",
  path: "/o-nas",
});

export default function ONasPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "O nás", href: "/o-nas" }]} />

      <Hero
        variant="media"
        eyebrow="Kdo jsme"
        title="Tiskárna a reklamní výroba z Opavy."
        sub="Navrhujeme, tiskneme a vyrábíme reklamu, která obstojí na obrazovce i v reálném provozu."
        primary={{ label: "Poptat výrobu", href: INQUIRY_URL }}
        scroll={{ label: "Tři principy, které jsou vidět v práci", href: "#principy" }}
        media={{ label: "Kruhová fotografie · práce ve výrobě", variant: "circle" }}
      />

      <section className="section section--rule container statement">
        <div data-reveal>
          <h2>Nejdřív řešíme, co má reklama udělat. Teprve potom, jak ji vyrobit.</h2>
          <div className="statement__cols">
            <p>
              Visibly je tiskárna a studio reklamní výroby z Opavy. Nejsme jen reklamka, která
              zakázky přeposílá dál — klíčové výrobní kroky držíme u sebe.
            </p>
            <p>
              Každou zakázku posuzujeme v souvislostech: kde bude výsledek fungovat, kdo se na něj
              bude dívat a co si má zapamatovat. Doporučujeme podle skutečného použití.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--rule container">
        <Split
          media={{ label: "Video z výroby", variant: "circle", src: "/video/epson-tisk-mini.mp4", alt: "Velkoformátový tisk na Epson SureColor" }}
          eyebrow="Od návrhu po předání"
          title="Jedna zakázka. Jeden souvislý kontext."
          text="Grafika počítá s materiálem, tisk s dokončením a dokončení s místem aplikace."
          cta={{ label: "Prohlédnout výrobu", href: "/technologie" }}
        />
      </section>

      <section className="section section--rule container">
        <SectionHead title="Důvěra stojí na konkrétních věcech." indent={1} />
        <div className="case">
          <div data-reveal>
            <Media media={{ label: "Fotografie · zakázky v dílně", variant: "tall" }} />
          </div>
          <div className="facts" data-reveal>
            <div>
              <span className="eyebrow">Kde jsme</span>
              <h3>{ADDRESS_FULL}</h3>
            </div>
            <div>
              <span className="eyebrow">Tisk</span>
              <h3>Epson SureColor SC-S80610</h3>
            </div>
            <div>
              <span className="eyebrow">Řezání</span>
              <h3>Roland CAMM-1 GR2-640</h3>
            </div>
            <div>
              <span className="eyebrow">Co navazuje</span>
              <h3>Laminace, termolis a aplikace</h3>
            </div>
            <div>
              <span className="eyebrow">Přímý kontakt</span>
              <h3>
                {PHONE_DISPLAY} · {EMAIL}
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--rule container" id="principy">
        <SectionHead title="Tři principy, které jsou vidět v práci." indent={0} />
        <div className="editorial">
          <article className="edit-card" data-reveal>
            <span className="eyebrow">01</span>
            <h3>Doporučujeme podle použití</h3>
            <p>Materiál a technologie se vybírají podle místa a účelu — ne podle marže.</p>
          </article>
          <article className="edit-card" data-reveal>
            <span className="eyebrow">02</span>
            <h3>Mluvíme lidsky</h3>
            <p>Žádné zkratky na obranu. Technologii překládáme do vašich rozhodnutí.</p>
          </article>
          <article className="edit-card" data-reveal>
            <span className="eyebrow">03</span>
            <h3>Dotahujeme detail</h3>
            <p>Hrana fólie, ořez tiskoviny, vodováha na ceduli. Detail dělá výsledek.</p>
          </article>
        </div>
      </section>

      <section className="section section--rule container">
        <SectionHead title="Na zakázce se potkají tři pohledy." indent={2} />
        <div className="editorial">
          <article className="edit-card" data-reveal>
            <h3>Co má výsledek sdělit</h3>
            <p>Pohled značky a zákazníka.</p>
          </article>
          <article className="edit-card" data-reveal>
            <h3>Jak má výsledek vzniknout</h3>
            <p>Pohled grafika a výroby.</p>
          </article>
          <article className="edit-card" data-reveal>
            <h3>Jak má fungovat na místě</h3>
            <p>Pohled montáže a provozu.</p>
          </article>
        </div>
      </section>

      <section className="section section--rule container">
        <SectionHead title="Výsledek je nejlepší představení." indent={0} />
        <div className="stagger-gallery">
          {works.map((work) => (
            <WorkCard
              key={work.slug}
              href={`/realizace/${work.slug}`}
              media={{ ...work.hero, variant: "wide" }}
              eyebrow={work.client}
              title={work.title}
            />
          ))}
        </div>
        <p style={{ marginTop: "2.5rem" }}>
          <Link href="/realizace" className="btn btn--ghost">
            Prohlédnout všechny realizace
          </Link>
        </p>
      </section>

      <FinalCta
        title="Pojďme udělat reklamu, která obstojí."
        cta={{ label: "Probrat zakázku", href: INQUIRY_URL }}
        secondary={{ label: "Zavolat 603 750 631", href: "tel:+420603750631" }}
      />
    </>
  );
}
