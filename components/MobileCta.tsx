"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { onScrollFrame } from "@/lib/motion";
import { poptavkaUrl, tematStranky } from "@/lib/poptavka";

/** Práh zobrazení; rozdílné hodnoty pro nájezd a schování = žádné blikání na hraně. */
const SHOW_AT = 320;
const HIDE_AT = 220;

/**
 * Sticky CTA na mobilu. Nezobrazuje se hned — plynule vyjede až po kousku
 * scrollu, ať nepřekrývá hero. Text se mění podle tématu stránky.
 */
export function MobileCta() {
  const pathname = usePathname();
  /* Text i cíl podle tématu stránky: tlačítko říká, co se poptává,
     a formulář to pak nemusí nechat vybírat znovu. */
  const tema = tematStranky(pathname);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let shown = false;
    return onScrollFrame((scrollY) => {
      // Třídu přepínáme přímo, ať scroll nespouští překreslení Reactu.
      const next = shown ? scrollY > HIDE_AT : scrollY > SHOW_AT;
      if (next !== shown) {
        shown = next;
        el.classList.toggle("is-shown", next);
      }
    });
  }, []);

  // Na kontaktu je formulář rovnou na stránce — tam by CTA jen překáželo.
  if (pathname === "/kontakt") return null;

  return (
    <div className="mobile-cta" ref={ref}>
      <Link href={poptavkaUrl(tema.slug)} className="btn">
        {tema.label}
      </Link>
    </div>
  );
}
