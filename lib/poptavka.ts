/**
 * Předvyplnění poptávkového formuláře podle stránky, ze které člověk přišel.
 *
 * Tenhle soubor musí zůstat lehký — sahá na něj i klientský kód (formulář,
 * sticky CTA, hlavička). Proto tu nejsou data služeb; mapu slug → oblast
 * skládá kontaktní stránka na serveru z `allServices` a předá ji formuláři.
 * Kdyby se sem `allServices` naimportovalo, přibalí se do JS bundle všech
 * pětadvacet stránek textu.
 */

/** Volby v selectu „Co řešíte?". Musí přesně sedět s <option> ve formuláři. */
export const OBLASTI = {
  tisk: "Tisk (banner, samolepky, plakáty, tiskoviny…)",
  polep: "Polep (auto, výloha, interiér…)",
  reklama: "Reklama (cedule, světelná reklama, 3D logo…)",
  textil: "Reklamní textil (potisk trik, mikin…)",
  studio: "Logo / identita / web",
  poradit: "Nevím — potřebuji poradit",
} as const;

export type Oblast = (typeof OBLASTI)[keyof typeof OBLASTI];

/** Co formulář předvyplní: oblast do selectu, název stránky do e-mailu. */
export type PoptavkaSluzba = { oblast: Oblast; label: string };

/**
 * Do které oblasti služba patří. Rozhoduje rozcestí, ke kterému stránka
 * patří — až na dvě služby, které svému rozcestí utekly:
 *
 *  · reklamní textil je pod /reklama, ale ve formuláři má vlastní volbu,
 *  · fotoobrazy jsou studiová služba, ale zákazník je vnímá jako tisk.
 */
export function oblastSluzby(slug: string, hub: string | null): Oblast {
  if (slug === "reklamni-textil") return OBLASTI.textil;
  if (slug === "tisk-fotoobrazu") return OBLASTI.tisk;
  if (hub === "tisk") return OBLASTI.tisk;
  if (hub === "polepy") return OBLASTI.polep;
  if (hub === "reklama") return OBLASTI.reklama;
  return OBLASTI.studio;
}

/**
 * Stránky bez záznamu ve službách: rozcestí a krajské varianty. Klíč je
 * poslední segment cesty, stejně jako u služeb — a s žádným slugem služby
 * se nekříží.
 */
export const OSTATNI_STRANKY: Record<string, PoptavkaSluzba> = {
  tisk: { oblast: OBLASTI.tisk, label: "Tisk" },
  polepy: { oblast: OBLASTI.polep, label: "Polepy" },
  reklama: { oblast: OBLASTI.reklama, label: "Reklama" },
  "tiskarna-ostrava": { oblast: OBLASTI.tisk, label: "Tisk — Ostrava" },
  "polepy-ostrava": { oblast: OBLASTI.polep, label: "Polepy — Ostrava" },
  "reklama-ostrava": { oblast: OBLASTI.reklama, label: "Reklama — Ostrava" },
  "reklamni-plochy-opava": { oblast: OBLASTI.reklama, label: "Reklamní plochy Opava" },
  "pro-agentury": { oblast: OBLASTI.tisk, label: "Tisk pro agentury" },
};

/**
 * Odkaz na formulář s předvyplněnou oblastí.
 *
 * Neznámý slug formulář jen ignoruje. Přesto ho sem nepouštíme: v adrese
 * by pak strašilo `?sluzba=cookies` a v měření by přibyl šum.
 */
export function poptavkaUrl(slug?: string): string {
  return slug ? `/kontakt?sluzba=${encodeURIComponent(slug)}#poptavka` : "/kontakt#poptavka";
}

/** Slug z cesty. Poslední segment, stejně jako klíče v mapě služeb. */
export function slugZCesty(pathname: string): string | undefined {
  return pathname.split("/").filter(Boolean).pop();
}

/**
 * Stránky s vlastním tématem: text tlačítka a slug pro předvyplnění.
 *
 * Pořadí rozhoduje — delší cesty musí být před kratšími (/tisk/… před /tisk).
 * Slug se bere z posledního segmentu cesty; `bezPredvyplneni` je pro stránky,
 * které téma mají, ale do žádné oblasti formuláře nepatří.
 *
 * Čte to sticky CTA i hlavička, tedy klientský kód. Proto tabulka a ne
 * odvození z dat služeb — ta by si do bundlu přitáhla obsah všech stránek.
 */
type Stranka = { prefix: string; label: string; bezPredvyplneni?: true };

const STRANKY: Stranka[] = [
  // Tisk — 4. pád, ať věta v tlačítku sedí.
  { prefix: "/tisk/velkoformatovy-tisk", label: "Poptat velkoformát" },
  { prefix: "/tisk/bannery-a-plachty", label: "Poptat banner" },
  { prefix: "/tisk/samolepky-a-folie", label: "Poptat samolepky" },
  { prefix: "/tisk/tapety", label: "Poptat tapetu" },
  { prefix: "/tisk/roll-upy", label: "Poptat roll-up" },
  { prefix: "/tisk/billboardy-a-citylighty", label: "Poptat billboard" },
  { prefix: "/tisk/plakaty", label: "Poptat plakáty" },
  { prefix: "/tisk/tiskoviny", label: "Poptat tiskoviny" },
  { prefix: "/tisk/pos-materialy", label: "Poptat POS materiály" },
  { prefix: "/tisk-fotoobrazu", label: "Poptat fotoobraz" },
  { prefix: "/tiskarna-ostrava", label: "Poptat tisk" },
  { prefix: "/tisk", label: "Poptat tisk" },

  // Polepy
  { prefix: "/polepy/polepy-aut", label: "Poptat polep auta" },
  { prefix: "/polepy/polepy-dodavek", label: "Poptat polep dodávky" },
  { prefix: "/polepy/polepy-vyloh", label: "Poptat polep výlohy" },
  { prefix: "/polepy/interierove-polepy", label: "Poptat interiérový polep" },
  { prefix: "/polepy/rezana-grafika", label: "Poptat řezanou grafiku" },
  { prefix: "/polepy-ostrava", label: "Poptat polep" },
  { prefix: "/polepy", label: "Poptat polep" },

  // Reklama
  { prefix: "/reklama/reklamni-cedule", label: "Poptat ceduli" },
  { prefix: "/reklama/svetelna-reklama", label: "Poptat světelnou reklamu" },
  { prefix: "/reklama/3d-loga", label: "Poptat 3D logo" },
  { prefix: "/reklama/venkovni-reklama", label: "Poptat venkovní reklamu" },
  { prefix: "/reklama/interierova-reklama", label: "Poptat interiérovou reklamu" },
  { prefix: "/reklama/orientacni-systemy", label: "Poptat orientační systém" },
  { prefix: "/reklama/reklamni-textil", label: "Poptat potisk textilu" },
  { prefix: "/reklama/reklamni-predmety", label: "Poptat reklamní předměty" },
  { prefix: "/reklamni-plochy-opava", label: "Poptat plochu" },
  { prefix: "/reklama-ostrava", label: "Poptat reklamu" },
  { prefix: "/reklama", label: "Poptat reklamu" },

  // Studio a ostatní
  { prefix: "/navrh-loga-a-vizualni-identity", label: "Poptat logo" },
  { prefix: "/webdesign", label: "Poptat web" },
  { prefix: "/pro-agentury", label: "Poptat partnerský tisk" },
  // Tyhle tři téma mají, ale ne oblast: technika není služba, realizace ani
  // kraj taky ne. Tlačítko textem sedí, formulář ať zůstane prázdný.
  { prefix: "/technologie", label: "Probrat výrobu", bezPredvyplneni: true },
  { prefix: "/moravskoslezsky-kraj", label: "Poslat poptávku", bezPredvyplneni: true },
  { prefix: "/realizace", label: "Poptat podobnou zakázku", bezPredvyplneni: true },
];

/** Téma stránky pro klientská CTA: text tlačítka a čím předvyplnit formulář. */
export function tematStranky(pathname: string): { label: string; slug?: string } {
  const hit = STRANKY.find(
    (s) => pathname === s.prefix || pathname.startsWith(`${s.prefix}/`),
  );
  if (!hit) return { label: "Poptat výrobu" };
  return {
    label: hit.label,
    slug: hit.bezPredvyplneni ? undefined : slugZCesty(hit.prefix),
  };
}
