"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { INQUIRY_URL } from "@/lib/site";

/** Text tlačítka podle tématu stránky. Delší cesty musí být před kratšími. */
const LABELS: [prefix: string, label: string][] = [
  ["/tisk-fotoobrazu", "Poptat fotoobraz"],
  ["/tiskarna-ostrava", "Poptat tisk"],
  ["/tisk", "Poptat tisk"],
  ["/polepy-ostrava", "Poptat polep"],
  ["/polepy", "Poptat polep"],
  ["/reklamni-plochy-opava", "Poptat plochu"],
  ["/reklama-ostrava", "Poptat reklamu"],
  ["/reklama", "Poptat reklamu"],
  ["/navrh-loga-a-vizualni-identity", "Poptat logo"],
  ["/webdesign", "Poptat web"],
  ["/pro-agentury", "Poptat partnerský tisk"],
  ["/technologie", "Probrat výrobu"],
  ["/moravskoslezsky-kraj", "Poslat poptávku"],
];

function labelFor(pathname: string): string {
  const hit = LABELS.find(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  return hit ? hit[1] : "Poptat výrobu";
}

/**
 * Sticky CTA na mobilu. Nezobrazuje se hned — naskočí až po kousku scrollu,
 * ať nepřekrývá hero. Text se mění podle tématu stránky.
 */
export function MobileCta() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const update = () => setShown(window.scrollY > 260);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Na kontaktu je formulář rovnou na stránce — tam by CTA jen překáželo.
  if (pathname === "/kontakt") return null;

  return (
    <div className={`mobile-cta${shown ? " is-shown" : ""}`}>
      <Link href={INQUIRY_URL} className="btn">
        {labelFor(pathname)}
      </Link>
    </div>
  );
}
