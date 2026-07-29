"use client";

import { openConsent } from "@/lib/consent";

/** Odkaz v patičce — volbu jde kdykoli změnit, i po odsouhlasení. */
export function CookieSettingsLink() {
  return (
    <button type="button" className="footer__legal-link" onClick={openConsent}>
      Nastavení cookies
    </button>
  );
}

/** Totéž na stránce o cookies, kde má váhu tlačítka. */
export function CookieSettingsButton() {
  return (
    <button type="button" className="btn" onClick={openConsent}>
      Změnit nastavení cookies
    </button>
  );
}
