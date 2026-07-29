import Link from "next/link";
import { CookieSettingsLink } from "./CookieSettingsLink";
import {
  ADDRESS_FULL,
  EMAIL,
  EMAIL_HREF,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/site";

const sitemapLinks = [
  { label: "Realizace", href: "/realizace" },
  { label: "Technologie", href: "/technologie" },
  { label: "O nás", href: "/o-nas" },
  { label: "Průvodce", href: "/pruvodce" },
  { label: "Pro agentury", href: "/pro-agentury" },
  { label: "Reklamní plochy Opava", href: "/reklamni-plochy-opava" },
  { label: "Kontakt", href: "/kontakt" },
];

const pusobnostLinks = [
  { label: "Tiskárna Ostrava", href: "/tiskarna-ostrava" },
  { label: "Polepy Ostrava", href: "/polepy-ostrava" },
  { label: "Reklama Ostrava", href: "/reklama-ostrava" },
  { label: "Moravskoslezský kraj", href: "/moravskoslezsky-kraj" },
];

/** Minimální, tichá patička podle vzoru šablony. */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="footer-logo" aria-label="Visibly — úvodní stránka">
              <img src="/visibly-logo.svg" alt="Visibly" width={64} height={64} />
            </Link>
            <p>
              Reklama &amp; tisk se sídlem v srdci Slezska. Tisk, polepy a reklamní výroba pro firmy —
              vlastní výroba v Opavě, dodáváme po celém Moravskoslezském kraji i ČR.
            </p>
          </div>

          <nav aria-label="Mapa webu">
            <h3>Sitemap</h3>
            <ul>
              <li>
                <Link href="/tisk">Tisk</Link>
              </li>
              <li>
                <Link href="/polepy">Polepy</Link>
              </li>
              <li>
                <Link href="/reklama">Reklama</Link>
              </li>
              {sitemapLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Působnost">
            <h3>Působnost</h3>
            <ul>
              {pusobnostLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__contact">
            <h3>Kontakt</h3>
            <ul>
              <li>
                <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <a href={EMAIL_HREF}>{EMAIL}</a>
              </li>
              <li>
                <a href={MAPS_URL} target="_blank" rel="noopener">
                  {ADDRESS_FULL} ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__legal">
          <span>
            © {new Date().getFullYear()} studio visibly s.r.o. ·{" "}
            <Link href="/cookies">Cookies</Link> · <CookieSettingsLink /> ·{" "}
            <Link href="/mapa-webu">Mapa webu</Link>
          </span>
          {/* Web je sám ukázka práce — drobná nabídka v patě, ne velký blok. */}
          <Link href="/webdesign" className="footer__pitch">
            Líbí se vám web? Taky ho umíme vyrobit.{" "}
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
