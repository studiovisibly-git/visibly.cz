import Link from "next/link";
import { Accordion } from "./Accordion";
import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { Media } from "./Media";
import { Hero } from "./Hero";
import { Directory, FinalCta, Process, SectionHead, Split } from "./Sections";
import { VYROBCI } from "./TechStrip";
import { SITE_URL } from "@/lib/site";
import { poptavkaUrl } from "@/lib/poptavka";
import { serviceSchema } from "@/lib/schema";
import { getTechnologie, sluzbyTechnologie, type Technologie } from "@/lib/technologie";
import { realizaceProTechnologii } from "@/lib/works";

/**
 * Detail jedné technologie.
 *
 * Stránka obsluhuje tři různé návštěvníky naráz a v tomhle pořadí:
 *
 *  1. zákazníka z vyhledávání („UV tisk Opava") — ten chce vědět, jestli
 *     mu tady vyrobíme jeho věc, proto scroll CTA v heru míří rovnou na
 *     rozcestník produktů a ne na parametry,
 *  2. grafika a agenturu — ti chtějí čísla, ale až potvrzení, že jsou na
 *     správném stroji; tabulka proto stojí až za rozcestníkem,
 *  3. člověka, který si vybírá mezi technologiemi — pro něj je tu blok
 *     „kdy zvolit jinou", který ho radši pošle jinam, než aby ho nechal
 *     poptat něco, co se na tomhle stroji dělat nemá.
 */
export function TechnologiePageTemplate({ tech }: { tech: Technologie }) {
  const path = `/technologie/${tech.slug}`;
  /* Technika není služba, formulář tedy nepředvyplňujeme — stejně jako
     na rozcestníku /technologie (viz OSTATNI_STRANKY v lib/poptavka.ts). */
  const poptat = poptavkaUrl();
  const works = realizaceProTechnologii(sluzbyTechnologie(tech));

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Technologie", href: "/technologie" },
          { label: tech.navLabel, href: path },
        ]}
      />

      <Hero
        variant="media"
        eyebrow={tech.eyebrow}
        title={tech.h1}
        sub={tech.intro}
        note={`Stroj: ${tech.name}. Stačí popsat, co má vzniknout — technologii vybereme my.`}
        primary={{ label: "Probrat výrobu", href: poptat }}
        scroll={{ label: "Co na tom vyrobíme", href: "#vyrobime" }}
        media={tech.heroMedia}
      />

      {/* Čtyři čísla, kvůli kterým sem lidé chodí. Nad ohybem, velkým řezem —
          kdo přišel ověřit šířku role, nemusí kvůli tomu číst celou stránku. */}
      <section className="section--tight container" aria-label="Klíčové parametry">
        <dl className="tech-klic" data-reveal>
          {tech.klic.map((udaj) => (
            /* Popisek v HTML napřed, hodnota za ním — jinak by seznam nebyl
               platný a čtečka by četla „1 626 mm" bez toho, čeho se týká.
               Opačné pořadí na obrazovce dělá CSS. */
            <div className="tech-klic__item" key={udaj.label}>
              <dt className="tech-klic__label">{udaj.label}</dt>
              <dd className="tech-klic__val">
                {udaj.value}
                {udaj.unit && <span className="tech-klic__unit">{udaj.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
        {tech.brand && (
          <p className="tech-klic__stroj">
            <span className="tech-klic__logo">
              {/* Loga jsou SVG — optimalizátor by je jen protáhl bez užitku. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={VYROBCI[tech.brand].logo} alt={VYROBCI[tech.brand].name} loading="lazy" />
            </span>
            {tech.name} · vlastní výroba v Opavě
          </p>
        )}
      </section>

      <section className="section container">
        <Split
          media={tech.split.media}
          title={tech.split.title}
          text={tech.split.text}
          cta={{ label: "Probrat výrobu", href: poptat }}
        />
      </section>

      {/* Přednosti: tvrzení vlevo, důkaz vpravo. Vlasovka mezi řádky místo
          karet — na stránce o technice má výčet číst jako list parametrů,
          ne jako mřížka reklamních dlaždic. */}
      <section className="section section--rule container">
        <SectionHead
          eyebrow="Přednosti"
          title="V čem je tahle technologie jiná."
          indent={1}
        />
        <div className="tech-vyhody">
          {tech.prednosti.map((p, i) => (
            <article className="tech-vyhoda" key={p.title} data-reveal>
              <div>
                <span className="tech-vyhoda__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{p.title}</h3>
              </div>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section--tight container">
        <SectionHead
          eyebrow="Materiály"
          title={tech.slug === "rezaci-ploter" ? "Co na ní řežeme." : "Na co na ní tiskneme."}
        />
        <ul className="stitky tech-materialy">
          {tech.materialy.map((m) => (
            <li className="stitek" key={m}>
              {m}
            </li>
          ))}
        </ul>
        <p className="tech-materialy__note">
          Nenašli jste svůj materiál? Napište, na co potřebujete tisknout — buď to zvládneme,
          nebo řekneme rovnou, že ne.
        </p>
      </section>

      {/* Rozcestník produktů — kvůli tomuhle většina lidí přišla. Odkazy jen
          na stránky, které existují; zbytek je jedna věta pod nimi, ne
          falešné odkazy do poptávky. */}
      <section className="section section--rule container" id="vyrobime">
        <SectionHead
          eyebrow="Rozcestník"
          title="Co na ní vyrobíme."
          text="Jedna technologie, tři typy zakázek. Vyberte, co je nejblíž tomu vašemu."
          indent={1}
        />
        <div className="tech-produkty">
          {tech.produkty.map((skupina) => (
            <div className="tech-produkty__skupina" key={skupina.title} data-reveal>
              <h3>{skupina.title}</h3>
              <p>{skupina.text}</p>
              <ul>
                {skupina.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      {item.label}
                      <span className="arr" aria-hidden="true">
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="tech-produkty__dal" data-reveal>
          {tech.produktyDal}{" "}
          <Link href={poptat} className="arrow-link">
            Popsat vlastní zadání{" "}
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </Link>
        </p>
      </section>

      {works.length > 0 && (
        <section className="section section--rule container">
          <SectionHead eyebrow="Realizace" title="Vyrobeno na tomhle stroji." indent={0} />
          <div className="stagger-gallery">
            {works.map((work) => (
              <Link
                href={`/realizace/${work.slug}`}
                className="work-card"
                key={work.slug}
                data-reveal
              >
                <Media media={work.hero} />
                <div className="work-card__meta">
                  <span className="eyebrow">
                    {work.client} · {work.location}
                  </span>
                  <h3>{work.title}</h3>
                  <p>{work.summary}</p>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: "2rem" }}>
            <Link href="/realizace" className="arrow-link">
              Další realizace{" "}
              <span className="arr" aria-hidden="true">
                ↗
              </span>
            </Link>
          </p>
        </section>
      )}

      <section className="section section--rule container">
        <SectionHead title={tech.priprava.title} indent={1} />
        <Process steps={tech.priprava.steps} />
      </section>

      {/* Tabulka až tady: kdo si vybírá dodavatele, čte přednosti a produkty;
          čísla chce až ten, kdo je připravený zadávat. */}
      <section className="section section--rule container">
        <SectionHead
          eyebrow="Technické parametry"
          title={tech.name}
          text="Údaje z listu výrobce. Co si neověříme, sem nedáváme."
        />
        <div className="parametry">
          {tech.parametry.map((blok) => (
            <section className="parametry__blok" key={blok.title} data-reveal>
              <h3 className="eyebrow">{blok.title}</h3>
              <dl>
                {blok.radky.map((radek) => (
                  <div className="parametry__radek" key={radek.label}>
                    <dt>{radek.label}</dt>
                    <dd>{radek.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
        <p className="parametry__zdroj">{tech.parametryZdroj}</p>
      </section>

      {/* Poctivé odbočky. Kdo tu hledá něco, co tenhle stroj neumí, odejde
          na správnou stránku — ne do poptávky, kterou pak musíme rozmluvit. */}
      <section className="section section--rule container">
        <SectionHead
          eyebrow="Jiná technologie"
          title="Kdy vám tenhle stroj nepomůže."
          text="Nemáme jednu odpověď na všechno. Někdy je správná odpověď o dvě dveře vedle."
          indent={1}
        />
        <Directory
          cols={3}
          items={tech.jinak.flatMap((j) => {
            const cil = getTechnologie(j.slug);
            if (!cil) return [];
            return [
              {
                title: cil.navLabel,
                text: j.kdyz,
                href: `/technologie/${cil.slug}`,
                cta: `Projít ${cil.nazevVeVete}`,
              },
            ];
          })}
        />
      </section>

      <section className="section section--rule container">
        <div className="article-layout">
          <div>
            <SectionHead eyebrow="Časté dotazy" title={`Než pošlete zadání na ${tech.nazevVeVete}`} />
            <Accordion items={tech.faq} />
          </div>
          <aside className="article-aside">
            <div className="aside-box">
              <h3>Celý strojový park</h3>
              <p>Tisk, řez, laminace i dokončení — co všechno držíme u sebe v Opavě.</p>
              <Link href="/technologie" className="btn btn--sm">
                Projít technologie
              </Link>
            </div>
            <div className="aside-box">
              <h3>Nevíte, co si vybrat?</h3>
              <p>
                Popište, co má vzniknout a kde to bude fungovat. Technologii, materiál i postup
                navrhneme my.
              </p>
              <Link href={poptat} className="btn btn--sm">
                Probrat zadání
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <FinalCta
        title={tech.finalTitle}
        cta={{ label: "Probrat výrobu", href: poptat }}
        secondary={{ label: "Prohlédnout realizace", href: "/realizace" }}
      />

      <JsonLd
        data={serviceSchema({
          name: `${tech.navLabel} — ${tech.name}`,
          description: tech.metaDescription,
          url: `${SITE_URL}${path}`,
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: tech.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
