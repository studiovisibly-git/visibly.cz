import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";
import { RevealInit } from "@/components/RevealInit";
import { CursorDot } from "@/components/CursorDot";
import { SITE_URL } from "@/lib/site";
import "@/styles/globals.css";
import "@/styles/site.css";

/* Stejné řezy jako na původním webu: Medium 500 + Bold 700. */
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Visibly — tiskárna a reklamní studio Opava",
    template: "%s",
  },
  description:
    "Tisk, polepy a reklamní výroba pro firmy. Vlastní výroba v Opavě, dodáváme po celém Moravskoslezském kraji, Ostravsku i po celé ČR.",
  applicationName: "Visibly",
  authors: [{ name: "Visibly — studio visibly s.r.o." }],
  keywords: [
    "tiskárna Opava",
    "tiskárna Ostrava",
    "reklamní studio Opava",
    "reklama Ostrava",
    "velkoformátový tisk Opava",
    "polepy aut Ostrava",
    "polepy aut Opava",
    "světelná reklama Moravskoslezský kraj",
    "reklamní cedule Opava",
    "polepy výloh Ostrava",
    "výroba reklamy Moravskoslezský kraj",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "Visibly — tiskárna a reklamní studio Opava",
    url: SITE_URL,
    title: "Visibly — tiskárna a reklamní studio Opava",
    description:
      "Tisk, polepy a reklamní výroba pro firmy. Vlastní výroba v Opavě, dodáváme po celém Moravskoslezském kraji, Ostravsku i po celé ČR.",
    images: [{ url: "/images/visibly-home-hero-colors.jpg", width: 1200, height: 630, alt: "Visibly — tiskárna a reklamní studio Opava" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visibly — tiskárna a reklamní studio Opava",
    description: "Tisk, polepy a reklamní výroba pro firmy v Opavě, Ostravě a celém MS kraji.",
    images: ["/images/visibly-home-hero-colors.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/images/favicon.png", type: "image/png" },
      { url: "/images/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={satoshi.variable}>
      <body>
        {/* Bez JS by prvky čekající na reveal zůstaly neviditelné. */}
        <noscript>
          <style>{`[data-reveal]:not(.is-in){opacity:1;translate:none}`}</style>
        </noscript>
        <a className="skip-link" href="#obsah">
          Přeskočit na obsah
        </a>
        <Header />
        <main id="obsah">{children}</main>
        <Footer />
        <MobileCta />
        <RevealInit />
        <CursorDot />
      </body>
    </html>
  );
}
