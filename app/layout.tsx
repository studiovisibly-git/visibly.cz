import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/Analytics";
import { CookieBar } from "@/components/CookieBar";
import { themeBootScript } from "@/components/ThemeToggle";
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
  /* Značka (obrácené „y" v kruhu) — čitelná i na 16 px, kde ji Google
     zobrazuje ve výsledcích. SVG pro moderní prohlížeče, ICO jako záloha,
     96 px PNG kvůli doporučení Googlu (násobek 48). */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

/* Barva lišty prohlížeče podle režimu zařízení. Ruční volbu v menu tady
   zohlednit nejde — metadata se generují na serveru — ale výchozí stav sedí. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0e" },
  ],
};

/* Měřicí ID datového proudu GA4. Není to tajemství — ve zdroji stránky ho
   vidí každý — proto může být v kódu. Proměnná prostředí ho přebije, kdyby
   bylo potřeba měřit jinam (nebo v náhledu neměřit vůbec). */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-CC6REV52KJ";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* data-theme dopisuje skript níž ještě před vykreslením — React o tom
       neví, proto se u <html> potlačuje hlášení o rozdílu proti serveru. */
    <html lang="cs" className={satoshi.variable} suppressHydrationWarning>
      <head>
        {/* Musí běžet dřív, než se cokoli vykreslí, jinak stránka blikne
            světlá a teprve pak ztmavne. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
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
        <CookieBar />
        {/* Skript se načte až po souhlasu v liště — viz Analytics. */}
        {GA_ID && <Analytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
