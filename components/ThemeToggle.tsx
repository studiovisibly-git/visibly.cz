"use client";

import { useCallback, useEffect, useState } from "react";

type Appearance = "light" | "dark";

export const THEME_KEY = "visibly-theme";

/**
 * Skript, který běží v <head> ještě před vykreslením — jinak by stránka
 * bliknula světlou a teprve pak ztmavla. Nastaví data-theme na <html>
 * a nesmí spadnout, když je localStorage zakázané (režim bez cookies).
 */
export const themeBootScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t}}catch(e){}`;

/** Popisky pojmenovávají cíl kliknutí, ne současný stav — tlačítko je pokyn. */
const LABELS: Record<Appearance, string> = {
  light: "Světlý",
  dark: "Tmavý",
};

function deviceWantsDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * Přepínač vzhledu. Ikona i popisek ukazují režim, do kterého klik přepne —
 * ve světlém tedy měsíc, v tmavém slunce.
 *
 * Výchozí stav je „podle zařízení" a dá se do něj vrátit: když se volba trefí
 * do nastavení systému, přepínač si ji neuloží. Web se pak dál řídí zařízením
 * včetně jeho automatického přepínání přes den.
 */
export function ThemeToggle({ className }: { className?: string }) {
  /* null do prvního vykreslení na klientovi — na serveru nevíme ani uloženou
     volbu, ani nastavení zařízení, a rozdílné HTML by rozbilo hydrataci. */
  const [appearance, setAppearance] = useState<Appearance | null>(null);

  const read = useCallback((): Appearance => {
    const forced = document.documentElement.dataset.theme;
    if (forced === "dark" || forced === "light") return forced;
    return deviceWantsDark() ? "dark" : "light";
  }, []);

  useEffect(() => {
    setAppearance(read());
    /* Když uživatel přepne režim v systému a web se řídí zařízením,
       musí se popisek srovnat taky. */
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setAppearance(read());
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [read]);

  function flip() {
    const next: Appearance = (appearance ?? read()) === "dark" ? "light" : "dark";
    const root = document.documentElement;
    try {
      if ((next === "dark") === deviceWantsDark()) {
        delete root.dataset.theme;
        localStorage.removeItem(THEME_KEY);
      } else {
        root.dataset.theme = next;
        localStorage.setItem(THEME_KEY, next);
      }
    } catch {
      /* Bez úložiště volba vydrží jen do konce návštěvy — přepínač funguje dál. */
      if ((next === "dark") === deviceWantsDark()) delete root.dataset.theme;
      else root.dataset.theme = next;
    }
    setAppearance(next);
  }

  const target: Appearance | null = appearance === null ? null : appearance === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={`theme-toggle${className ? ` ${className}` : ""}`}
      onClick={flip}
      aria-label={target ? `Přepnout na ${LABELS[target].toLowerCase()} vzhled` : "Přepnout vzhled"}
      title={target ? `Přepnout na ${LABELS[target].toLowerCase()} vzhled` : undefined}
    >
      <span className="theme-toggle__icons" aria-hidden="true">
        {/* Slunce — nabízí se v tmavém režimu */}
        <svg className="theme-toggle__sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
        </svg>
        {/* Měsíc — nabízí se ve světlém režimu */}
        <svg className="theme-toggle__moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z" />
        </svg>
      </span>
      <span className="theme-toggle__label">{target ? LABELS[target] : "Vzhled"}</span>
    </button>
  );
}
