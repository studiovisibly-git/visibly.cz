"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CONSENT_OPEN,
  VSE_ANO,
  VSE_NE,
  readConsent,
  writeConsent,
  type Consent,
} from "@/lib/consent";

/**
 * Lišta souhlasu. Nemá křížek ani „zavřít" — zmizí až po volbě, protože
 * bez rozhodnutí nesmíme měřit ani načítat cizí obsah.
 */
export function CookieBar() {
  /* `undefined` = ještě nevíme (server i první vykreslení). Bez toho by se
     lišta na okamžik mihla i lidem, kteří už dávno rozhodli. */
  const [ptat, setPtat] = useState<boolean | undefined>(undefined);
  const [detail, setDetail] = useState(false);
  const [vyber, setVyber] = useState<Consent>(VSE_ANO);

  useEffect(() => {
    const ulozeno = readConsent();
    setPtat(ulozeno === null);
    if (ulozeno) setVyber(ulozeno);

    /* Znovuotevření z patičky — ať jde volbu kdykoli změnit. */
    const otevri = () => {
      setVyber(readConsent() ?? VSE_ANO);
      setDetail(true);
      setPtat(true);
    };
    window.addEventListener(CONSENT_OPEN, otevri);
    return () => window.removeEventListener(CONSENT_OPEN, otevri);
  }, []);

  if (ptat !== true) return null;

  function rozhodni(c: Consent) {
    writeConsent(c);
    setPtat(false);
    setDetail(false);
  }

  return (
    <div className="cookies" role="dialog" aria-modal="false" aria-labelledby="cookies-titulek">
      <div className="cookies__head">
        <span className="cookies__emoji" aria-hidden="true">
          🍪
        </span>
        <h2 className="cookies__title" id="cookies-titulek">
          Dáte si sušenku?
        </h2>
      </div>

      <p className="cookies__text">
        Ty nezbytné drží web pohromadě — bez nich to nejde. Ostatní nám anonymně ukážou, co tu
        funguje, a načtou mapu v kontaktech. Dokud si nevyberete, nekousneme.{" "}
        <Link href="/cookies">Co přesně pečeme</Link>
      </p>

      {detail && (
        <div className="cookies__detail">
          <label className="cookies__row">
            <input type="checkbox" checked disabled />
            <span>
              <strong>Nezbytné</strong>
              <small>Zapamatují si zvolený vzhled a tuhle hlášku. Vypnout nejdou.</small>
            </span>
          </label>

          <label className="cookies__row">
            <input
              type="checkbox"
              checked={vyber.analytics}
              onChange={(e) => setVyber({ ...vyber, analytics: e.target.checked })}
            />
            <span>
              <strong>Měření návštěvnosti</strong>
              <small>Anonymní čísla o tom, které stránky lidé čtou. Google Analytics.</small>
            </span>
          </label>

          <label className="cookies__row">
            <input
              type="checkbox"
              checked={vyber.embeds}
              onChange={(e) => setVyber({ ...vyber, embeds: e.target.checked })}
            />
            <span>
              <strong>Mapa a vložený obsah</strong>
              <small>Mapa v kontaktech. Bez svolení ji vůbec nenačteme.</small>
            </span>
          </label>
        </div>
      )}

      <div className="cookies__actions">
        {detail ? (
          <button type="button" className="cookies__link" onClick={() => rozhodni(vyber)}>
            Uložit výběr
          </button>
        ) : (
          <button type="button" className="cookies__link" onClick={() => setDetail(true)}>
            Vybrat si
          </button>
        )}

        <button type="button" className="cookies__link" onClick={() => rozhodni(VSE_NE)}>
          Ne, díky
        </button>

        <button type="button" className="cookies__yes" onClick={() => rozhodni(VSE_ANO)}>
          Ať mi
          <br />
          chutná
        </button>
      </div>
    </div>
  );
}
