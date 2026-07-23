import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ParallaxHeading } from "@/components/ParallaxHeading";
import { FinalCta } from "@/components/Sections";
import { allGuides, getGuide } from "@/lib/guides";
import { buildMetadata } from "@/lib/seo";
import { INQUIRY_URL, SITE_URL } from "@/lib/site";
import type { GuideBlock } from "@/lib/types";
import { ScrollCta } from "@/components/ScrollCta";

export function generateStaticParams() {
  return allGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/pruvodce/${guide.slug}`,
  });
}

function Block({ block }: { block: GuideBlock }) {
  if ("h2" in block) return <h2>{block.h2}</h2>;
  if ("h3" in block) return <h3>{block.h3}</h3>;
  if ("p" in block) return <p>{block.p}</p>;
  if ("ul" in block)
    return (
      <ul>
        {block.ul.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  if ("ol" in block)
    return (
      <ol>
        {block.ol.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    );
  if ("tip" in block)
    return (
      <div className="tip">
        <strong>{block.tip.title}</strong>
        {block.tip.text}
      </div>
    );
  if ("table" in block)
    return (
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              {block.table.head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  return null;
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Průvodce", href: "/pruvodce" },
          { label: guide.title, href: `/pruvodce/${guide.slug}` },
        ]}
      />

      <section className="container article-hero">
        <span className="eyebrow">
          Průvodce · {guide.category}
        </span>
        <ParallaxHeading text={guide.title} stagger />
        <p>{guide.excerpt}</p>
        <div className="hero__actions">
          <Link href={guide.service.href} className="btn">
            {guide.service.label}
          </Link>
          <ScrollCta href="#clanek">Číst průvodce</ScrollCta>
        </div>
      </section>

      <section className="section--tight section--rule container" id="clanek">
        <div className="article-layout">
          <article className="prose">
            {guide.body.map((block, i) => (
              <Block block={block} key={i} />
            ))}
          </article>

          <aside className="article-aside">
            <div className="aside-box">
              <h3>Související služba</h3>
              <p>Od rady rovnou k výrobě:</p>
              <ul style={{ marginTop: "0.5rem" }}>
                <li>
                  <Link href={guide.service.href}>{guide.service.label} ↗</Link>
                </li>
              </ul>
            </div>
            {guide.related.length > 0 && (
              <div className="aside-box">
                <h3>Čtěte dál</h3>
                <ul>
                  {guide.related.map((r) => (
                    <li key={r.href}>
                      <Link href={r.href}>{r.label} ↗</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="aside-box">
              <h3>Raději to probrat?</h3>
              <p>Napište, co řešíte. Poradíme konkrétně k vaší situaci.</p>
              <Link href={INQUIRY_URL} className="btn btn--sm">
                Poslat dotaz
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <FinalCta
        title="Přejděte od rady k výrobě."
        cta={{ label: "Poptat výrobu", href: INQUIRY_URL }}
        secondary={{ label: guide.service.label, href: guide.service.href }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.metaDescription,
          inLanguage: "cs",
          url: `${SITE_URL}/pruvodce/${guide.slug}`,
          author: { "@type": "Organization", name: "Visibly", url: SITE_URL },
          publisher: { "@type": "Organization", name: "Visibly", url: SITE_URL },
        }}
      />
    </>
  );
}
