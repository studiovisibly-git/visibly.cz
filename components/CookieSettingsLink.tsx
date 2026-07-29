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
