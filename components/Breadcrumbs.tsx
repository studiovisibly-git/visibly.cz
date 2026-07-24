import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { SITE_URL } from "@/lib/site";
import type { LinkItem } from "@/lib/types";

/** Viditelné drobečky + BreadcrumbList schema. Poslední položka je aktuální stránka. */
export function Breadcrumbs({ items }: { items: LinkItem[] }) {
  const trail: LinkItem[] = [{ label: "Domů", href: "/" }, ...items];

  return (
    <div className="breadcrumbs">
      <div className="container">
        <nav aria-label="Drobečková navigace">
          <ol>
            {trail.map((item, i) =>
              i === trail.length - 1 ? (
                <li key={item.href} aria-current="page">
                  {item.label}
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ),
            )}
          </ol>
        </nav>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            item: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
          })),
        }}
      />
    </div>
  );
}
