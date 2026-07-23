import type { Metadata } from "next";
import { SITE_URL } from "./site";

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
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
      images: [{ url: "/images/visibly-home-hero-colors.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/visibly-home-hero-colors.jpg"],
    },
  };
}
