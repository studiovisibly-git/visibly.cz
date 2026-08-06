import type { Metadata } from "next";
import { SITE_URL } from "./site";

export function buildMetadata({
  title,
  description,
  path,
  image = "/images/visibly-home-hero-colors.jpg",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  /** Náhled pro sdílení. U realizací fotka zakázky, jinde firemní vizuál. */
  image?: string;
  /**
   * Stránka má existovat kvůli sdílení, ale ne se dostat do vyhledávače.
   * Typicky produkty z katalogu dodavatele: obsah je jeho, my ho jen ukazujeme,
   * a tisíce takových adres by web ve výsledcích jen ředily.
   *
   * Vědomě to neřešíme v robots.txt — zákaz procházení by vyhledávači zabránil
   * uvidět právě tuhle hlavičku, a adresa by se v indexu objevila bez popisu.
   */
  noindex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    robots: noindex ? { index: false, follow: true } : undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Visibly — tiskárna a reklamní studio Opava",
      locale: "cs_CZ",
      type: "website",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
