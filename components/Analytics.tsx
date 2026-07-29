"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4. Vykreslí se jen tehdy, když je vyplněné měřicí ID —
 * bez něj se nenačte nic a na návštěvníka nesahá žádný cizí skript.
 *
 * Pozor: `gaId` musí být měřicí ID datového proudu ve tvaru `G-XXXXXXXXXX`,
 * ne číslo služby. Číslo služby je jen interní identifikátor v účtu GA
 * a měření se s ním nespustí.
 */
export function Analytics({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const prvni = useRef(true);

  useEffect(() => {
    /* První zobrazení odešle sám `config` níž. Tady dohlašujeme jen přechody
       mezi stránkami — ty se v App Routeru dějí bez nového načtení dokumentu,
       takže by o nich GA jinak nevědělo. */
    if (prvni.current) {
      prvni.current = false;
      return;
    }
    window.gtag?.("event", "page_view", { page_path: pathname });
  }, [pathname]);

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
