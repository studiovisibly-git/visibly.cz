import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ParallaxHeading } from "@/components/ParallaxHeading";
import { allGuides } from "@/lib/guides";
import { polepyLinks, reklamaLinks, studioLinks, tiskLinks } from "@/lib/nav";
import { buildMetadata } from "@/lib/seo";
import { works } from "@/lib/works";

export const metadata = buildMetadata({
  title: "Mapa webu | Visibly",
  description: "Přehled všech stránek webu visibly.cz — služby, realizace, průvodce a kontakt.",
  path: "/mapa-webu",
});

const staticPages = [
  { label: "Úvodní stránka", href: "/" },
  { label: "Realizace", href: "/realizace" },
  { label: "Technologie", href: "/technologie" },
  { label: "O nás", href: "/o-nas" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Průvodce", href: "/pruvodce" },
  { label: "Pro agentury", href: "/pro-agentury" },
  { label: "Reklamní plochy Opava", href: "/reklamni-plochy-opava" },
  { label: "Cookies", href: "/cookies" },
];

function LinkList({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="h3" style={{ marginBottom: "1rem" }}>
        {title}
      </h2>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.5rem" }}>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="arrow-link" style={{ borderBottom: "none" }}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MapaWebuPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Mapa webu", href: "/mapa-webu" }]} />
      <section className="section container">
        <ParallaxHeading text="Mapa webu" className="h2" stagger />
        <div style={{ marginBottom: "3rem" }} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
            gap: "3rem",
          }}
        >
          <LinkList title="Hlavní stránky" items={staticPages} />
          <LinkList title="Tisk" items={[{ label: "Tisk — přehled", href: "/tisk" }, ...tiskLinks]} />
          <LinkList
            title="Polepy"
            items={[{ label: "Polepy — přehled", href: "/polepy" }, ...polepyLinks]}
          />
          <LinkList
            title="Reklama"
            items={[{ label: "Reklama — přehled", href: "/reklama" }, ...reklamaLinks]}
          />
          <LinkList title="Studio" items={studioLinks} />
          <LinkList
            title="Realizace"
            items={works.map((w) => ({ label: w.client, href: `/realizace/${w.slug}` }))}
          />
          <LinkList
            title="Průvodce"
            items={allGuides.map((g) => ({ label: g.title, href: `/pruvodce/${g.slug}` }))}
          />
        </div>
      </section>
    </>
  );
}
