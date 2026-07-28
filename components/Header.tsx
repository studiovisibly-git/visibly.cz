"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LERP, onScrollFrame } from "@/lib/motion";
import { mainNav, studioLinks } from "@/lib/nav";
import { INQUIRY_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

/** Logo (černý kruh „visibly") + tagline, který se scrollem mizí a logo se zmenšuje.
    Řízeno CSS proměnnou --logo-progress (0 nahoře → 1 po odscrollování), stejně jako živý web. */
function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`logo${compact ? " logo--compact" : ""}`} aria-label="Visibly — úvodní stránka">
      <span className="logo__mark" aria-hidden="true">
        <img src="/visibly-logo.svg" alt="" width={80} height={80} />
      </span>
      {!compact && (
        <span className="logo__tag" aria-hidden="true">
          Reklama &amp; tisk se sídlem
          <br />v srdci Slezska.
        </span>
      )}
      <span className="sr-only">Visibly — reklama a tisk se sídlem v srdci Slezska</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  /* Scroll-linked progress: tagline fade + logo shrink (jako --visibly-logo-text-progress na živém webu).
     Běží na sdíleném tickeru. Progress se hýbe jen prvních 90 px scrollu, pak
     je konstantní — dál se už nic nepřepočítává. */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    let last = "";
    let cur: number | null = null;
    return onScrollFrame((scrollY) => {
      const target = Math.min(scrollY / 90, 1);
      // Dojíždění (smoothing) — plynulé i při zmeškaném snímku.
      if (cur === null) cur = target;
      cur += (target - cur) * LERP;
      if (Math.abs(target - cur) < 0.002) cur = target;
      const next = cur.toFixed(3);
      if (next !== last) {
        last = next;
        el.style.setProperty("--logo-progress", next);
      }
      return cur !== target;
    });
  }, []);

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <span className="topbar__note">
            Nový web právě dolaďujeme — omluvte drobné nedodělky. Vše podstatné už tu najdete.
          </span>
        </div>
      </div>

      <header className="header" ref={headerRef}>
        <div className="container header__inner">
          <div className="header__logo">
            <Logo />
          </div>

          <nav className="nav" aria-label="Hlavní navigace">
            {mainNav.map((item) => (
              <div className="nav__item" key={item.href}>
                <Link
                  href={item.href}
                  className="nav__link"
                  aria-current={
                    pathname === item.href || (item.children && pathname.startsWith(`${item.href}/`))
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mega">
                    <Link href={item.href} className="mega__hub">
                      Přehled: {item.label}
                    </Link>
                    <span className="mega__rule" aria-hidden="true" />
                    {item.children.map((child) => (
                      <Link href={child.href} key={child.href} className="mega__link">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="header__actions">
            <ThemeToggle />
            <Link href={INQUIRY_URL} className="btn header__cta">
              Poptat výrobu
            </Link>
          </div>

          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      <div className={`mobile-menu${open ? " is-open" : ""}`} id="mobile-menu" aria-hidden={!open}>
        <div className="mobile-menu__top">
          <Logo compact />
          <div className="mobile-menu__tools">
            <ThemeToggle className="theme-toggle--wide" />
            <button className="nav-toggle" onClick={() => setOpen(false)}>
              Zavřít
            </button>
          </div>
        </div>

        <nav aria-label="Mobilní navigace">
          {mainNav.map((item) => (
            <div key={item.href}>
              <Link href={item.href} className="mobile-menu__link">
                {item.label}
              </Link>
              {item.children && (
                <div className="mobile-menu__sub">
                  {item.children.map((child) => (
                    <Link href={child.href} key={child.href}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mobile-menu__sub" style={{ paddingTop: "1rem" }}>
            {studioLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/pruvodce">Průvodce</Link>
            <Link href="/pro-agentury">Pro agentury</Link>
          </div>
        </nav>

        <div className="mobile-menu__cta">
          <Link href={INQUIRY_URL} className="btn">
            Poptat výrobu
          </Link>
          <p className="hero__note" style={{ marginTop: "1rem" }}>
            Nebo rovnou zavolejte: <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          </p>
        </div>
      </div>
    </>
  );
}
