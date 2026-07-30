import type { Metadata } from "next";
import { SITE_URL } from "./site";

export function buildMetadata({
  title,
  description,
  path,
  image = "/images/visibly-home-hero-colors.jpg",
}: {
  title: string;
  description: string;
  path: string;
  /** Náhled pro sdílení. U realizací fotka zakázky, jinde firemní vizuál. */
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title,
    description,
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
