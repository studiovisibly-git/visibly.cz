import type { MetadataRoute } from "next";

/**
 * Manifest pro Android / „Přidat na plochu". Ikony jsou plný černý čtverec —
 * launcher si je sám ořízne do svého tvaru (maskable), takže kruh uvnitř
 * kruhu nevznikne.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Visibly — tiskárna a reklamní studio Opava",
    short_name: "Visibly",
    description:
      "Tisk, polepy a reklamní výroba pro firmy. Vlastní výroba v Opavě, dodáváme po celém Moravskoslezském kraji.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "cs",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
