import type { LinkItem } from "./types";

export type NavItem = LinkItem & { children?: LinkItem[] };

/** Slugy odpovídají schválené sitemapě — jsou součástí SEO kontraktu. */
export const tiskLinks: LinkItem[] = [
  { label: "Velkoformátový tisk", href: "/tisk/velkoformatovy-tisk" },
  { label: "Bannery a plachty", href: "/tisk/bannery-a-plachty" },
  { label: "Samolepky a fólie", href: "/tisk/samolepky-a-folie" },
  { label: "Roll-upy", href: "/tisk/roll-upy" },
  { label: "Billboardy a citylighty", href: "/tisk/billboardy-a-citylighty" },
  { label: "Plakáty", href: "/tisk/plakaty" },
  { label: "Tiskoviny", href: "/tisk/tiskoviny" },
  { label: "POS materiály", href: "/tisk/pos-materialy" },
  { label: "Tisk fotoobrazů", href: "/tisk-fotoobrazu" },
];

export const polepyLinks: LinkItem[] = [
  { label: "Polepy aut", href: "/polepy/polepy-aut" },
  { label: "Polepy dodávek", href: "/polepy/polepy-dodavek" },
  { label: "Polepy výloh", href: "/polepy/polepy-vyloh" },
  { label: "Interiérové polepy", href: "/polepy/interierove-polepy" },
  { label: "Řezaná grafika", href: "/polepy/rezana-grafika" },
];

export const reklamaLinks: LinkItem[] = [
  { label: "Reklamní cedule", href: "/reklama/reklamni-cedule" },
  { label: "Světelná reklama", href: "/reklama/svetelna-reklama" },
  { label: "3D loga", href: "/reklama/3d-loga" },
  { label: "Venkovní reklama", href: "/reklama/venkovni-reklama" },
  { label: "Interiérová reklama", href: "/reklama/interierova-reklama" },
  { label: "Orientační systémy", href: "/reklama/orientacni-systemy" },
  { label: "Reklamní textil", href: "/reklama/reklamni-textil" },
  { label: "Reklamní předměty", href: "/reklama/reklamni-predmety" },
];

export const studioLinks: LinkItem[] = [
  { label: "Návrh loga a vizuální identity", href: "/navrh-loga-a-vizualni-identity" },
  { label: "Webdesign", href: "/webdesign" },
  { label: "Tisk fotoobrazů", href: "/tisk-fotoobrazu" },
];

export const mainNav: NavItem[] = [
  { label: "Tisk", href: "/tisk", children: tiskLinks },
  { label: "Polepy", href: "/polepy", children: polepyLinks },
  { label: "Reklama", href: "/reklama", children: reklamaLinks },
  { label: "Realizace", href: "/realizace" },
  { label: "Technologie", href: "/technologie" },
  { label: "O nás", href: "/o-nas" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerCompanyLinks: LinkItem[] = [
  { label: "Realizace", href: "/realizace" },
  { label: "Technologie", href: "/technologie" },
  { label: "O nás", href: "/o-nas" },
  { label: "Průvodce", href: "/pruvodce" },
  { label: "Pro agentury", href: "/pro-agentury" },
  { label: "Reklamní plochy Opava", href: "/reklamni-plochy-opava" },
  { label: "Kontakt", href: "/kontakt" },
];
