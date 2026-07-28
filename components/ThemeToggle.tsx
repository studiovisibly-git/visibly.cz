"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

export const THEME_KEY = "visibly-theme";

/**
 * Skript, který běží v <head> ještě před vykreslením — jinak by stránka
 * bliknula světlou a teprve pak ztmavla. Nastaví data-theme na <html>
 * a nesmí spadnout, když je localStorage zakázané (režim bez cookies).
 */
export const themeBootScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t}}catch(e){}`;

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") delete root.dataset.theme;
  else root.dataset.theme = theme;
  try {
    if (theme === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* Bez úložiště volba vydrží jen do konce návštěvy — přepínač funguje dál. */
  }
}

const LABELS: Record<Theme, string> = {
  light: "Světlý",
  dark: "Tmavý",
  system: "Podle zařízení",
};

/**
 * Přepínač režimu. Tři stavy: světlý, tmavý a „podle zařízení" (výchozí).
 * Do prvního vykreslení na klientovi nevíme, co je v localStorage, takže
 * se ovládání zapne až po připojení — jinak by se serverové HTML a klient
 * rozešly.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch {
      /* viz apply() */
    }
    setTheme(stored === "dark" || stored === "light" ? stored : "system");
    setReady(true);
  }, []);

  /* Cyklus podle zařízení → tmavý → světlý → podle zařízení. Nejčastější
     přání („chci tmavý") je hned první klik. */
  const next: Theme = theme === "system" ? "dark" : theme === "dark" ? "light" : "system";

  function choose(value: Theme) {
    setTheme(value);
    apply(value);
  }

  return (
    <button
      type="button"
      className={`theme-toggle${className ? ` ${className}` : ""}`}
      onClick={() => choose(next)}
      /* Do načtení volby popisek nelže o stavu. */
      aria-label={ready ? `Vzhled: ${LABELS[theme]}. Přepnout na: ${LABELS[next]}` : "Přepnout vzhled"}
      title={ready ? `Vzhled: ${LABELS[theme]}` : undefined}
    >
      <span className="theme-toggle__icons" aria-hidden="true">
        {/* Slunce */}
        <svg className="theme-toggle__sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
        </svg>
        {/* Měsíc */}
        <svg className="theme-toggle__moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z" />
        </svg>
      </span>
      <span className="theme-toggle__label">{ready ? LABELS[theme] : "Vzhled"}</span>
    </button>
  );
}
