"use client";

import { useEffect, useState } from "react";

/** Volitelné kategorie. Nezbytné se neptáme — bez nich web nefunguje. */
export type Consent = {
  /** Měření návštěvnosti (GA4). */
  analytics: boolean;
  /** Vložený obsah třetích stran — dnes mapa v kontaktech. */
  embeds: boolean;
};

export const CONSENT_KEY = "visibly-cookies";
/** Volba se změnila — komponenty se podle toho překreslí. */
export const CONSENT_CHANGED = "visibly:consent-changed";
/** Někdo chce lištu otevřít znovu (odkaz v patičce). */
export const CONSENT_OPEN = "visibly:consent-open";

/* Když přibude kategorie, zvedneme verzi a zeptáme se znovu — jinak by
   nová věc jela na starý souhlas, který o ní nevěděl. */
const VERSION = 1;

export const VSE_ANO: Consent = { analytics: true, embeds: true };
export const VSE_NE: Consent = { analytics: false, embeds: false };

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<Consent> & { v?: number };
    if (p.v !== VERSION) return null;
    return { analytics: p.analytics === true, embeds: p.embeds === true };
  } catch {
    return null;
  }
}

export function writeConsent(c: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...c, v: VERSION, ts: Date.now() }));
  } catch {
    /* Bez úložiště platí volba do konce návštěvy — lišta se příště zeptá znovu. */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED, { detail: c }));
}

export function openConsent() {
  window.dispatchEvent(new Event(CONSENT_OPEN));
}

/**
 * Aktuální souhlas. `undefined` znamená „ještě nevíme" — na serveru a do
 * prvního vykreslení na klientovi. `null` znamená „uživatel se nerozhodl".
 * Rozlišujeme to schválně: dokud nevíme, nesmí se nic načíst ani nabídnout.
 */
export function useConsent(): Consent | null | undefined {
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);

  useEffect(() => {
    setConsent(readConsent());
    const sync = (e: Event) => setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_CHANGED, sync);
    return () => window.removeEventListener(CONSENT_CHANGED, sync);
  }, []);

  return consent;
}
