"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useConsent } from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4. Načte se, až když k tomu dal návštěvník souhlas
 * v liště cookies — do té doby na něj nesahá žádný cizí skript.
 *
 * Pozor: `gaId` musí být měřicí ID datového proudu ve tvaru `G-XXXXXXXXXX`,
 * ne číslo služby. Číslo služby je jen interní identifikátor v účtu GA
 * a měření se s ním nespustí.
 */
export function Analytics({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const consent = useConsent();
  const prvni = useRef(true);
  const povoleno = consent?.analytics === true;

  useEffect(() => {
    /* První zobrazení odešle sám `config` níž. Tady dohlašujeme jen přechody
       mezi stránkami — ty se v App Routeru dějí bez nového načtení dokumentu,
       takže by o nich GA jinak nevědělo. */
    if (!povoleno) return;
    if (prvni.current) {
      prvni.current = false;
      return;
    }
    window.gtag?.("event", "page_view", { page_path: pathname });
  }, [pathname, povoleno]);

  if (!povoleno) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
window.gtag=gtag;
gtag('js',new Date());
gtag('config','${gaId}');`}
      </Script>
    </>
  );
}
