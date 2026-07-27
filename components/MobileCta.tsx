"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { onScrollFrame } from "@/lib/motion";
import { INQUIRY_URL } from "@/lib/site";

/**
 * Text tlačítka podle tématu stránky — 4. pád, ať věta sedí.
 * Pořadí rozhoduje: delší cesty musí být před kratšími (/tisk/... před /tisk).
 */
const LABELS: [prefix: string, label: string][] = [
  // Tisk
  ["/tisk/velkoformatovy-tisk", "Poptat velkoformát"],
  ["/tisk/bannery-a-plachty", "Poptat banner"],
  ["/tisk/samolepky-a-folie", "Poptat samolepky"],
  ["/tisk/tapety", "Poptat tapetu"],
  ["/tisk/roll-upy", "Poptat roll-up"],
  ["/tisk/billboardy-a-citylighty", "Poptat billboard"],
  ["/tisk/plakaty", "Poptat plakáty"],
  ["/tisk/tiskoviny", "Poptat tiskoviny"],
  ["/tisk/pos-materialy", "Poptat POS materiály"],
  ["/tisk-fotoobrazu", "Poptat fotoobraz"],
  ["/tiskarna-ostrava", "Poptat tisk"],
  ["/tisk", "Poptat tisk"],

  // Polepy
  ["/polepy/polepy-aut", "Poptat polep auta"],
  ["/polepy/polepy-dodavek", "Poptat polep dodávky"],
  ["/polepy/polepy-vyloh", "Poptat polep výlohy"],
  ["/polepy/interierove-polepy", "Poptat interiérový polep"],
  ["/polepy/rezana-grafika", "Poptat řezanou grafiku"],
  ["/polepy-ostrava", "Poptat polep"],
  ["/polepy", "Poptat polep"],

  // Reklama
  ["/reklama/reklamni-cedule", "Poptat ceduli"],
  ["/reklama/svetelna-reklama", "Poptat světelnou reklamu"],
  ["/reklama/3d-loga", "Poptat 3D logo"],
  ["/reklama/venkovni-reklama", "Poptat venkovní reklamu"],
  ["/reklama/interierova-reklama", "Poptat interiérovou reklamu"],
  ["/reklama/orientacni-systemy", "Poptat orientační systém"],
  ["/reklama/reklamni-textil", "Poptat potisk textilu"],
  ["/reklama/reklamni-predmety", "Poptat reklamní předměty"],
  ["/reklamni-plochy-opava", "Poptat plochu"],
  ["/reklama-ostrava", "Poptat reklamu"],
  ["/reklama", "Poptat reklamu"],

  // Studio a ostatní
  ["/navrh-loga-a-vizualni-identity", "Poptat logo"],
  ["/webdesign", "Poptat web"],
  ["/pro-agentury", "Poptat partnerský tisk"],
  ["/technologie", "Probrat výrobu"],
  ["/moravskoslezsky-kraj", "Poslat poptávku"],
  ["/realizace", "Poptat podobnou zakázku"],
];

function labelFor(pathname: string): string {
  const hit = LABELS.find(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  return hit ? hit[1] : "Poptat výrobu";
}

/** Práh zobrazení; rozdílné hodnoty pro nájezd a schování = žádné blikání na hraně. */
const SHOW_AT = 320;
const HIDE_AT = 220;

/**
 * Sticky CTA na mobilu. Nezobrazuje se hned — plynule vyjede až po kousku
 * scrollu, ať nepřekrývá hero. Text se mění podle tématu stránky.
 */
export function MobileCta() {
  const pathname = usePathname();
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
      <Link href={INQUIRY_URL} className="btn">
        {labelFor(pathname)}
      </Link>
    </div>
  );
}
