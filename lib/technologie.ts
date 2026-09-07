import { VYROBCI } from "@/components/TechStrip";
import type { Faq, LinkItem, MediaSpec, ProcessStep } from "./types";

/**
 * Strojový park — jediný zdroj pravdy o technice na celém webu.
 *
 * Čte to /technologie (rozcestník), /technologie/<slug> (detaily) a přes
 * `lib/technika.ts` i devatenáct podstránek služeb. Kdo mění parametr,
 * mění ho tady a nikde jinde.
 *
 * Čísla jsou z listů výrobců, ne z paměti. Kde si nejsme jistí, řádek
 * radši chybí — jeden špatný údaj v tabulce zpochybní i těch dvacet
 * ostatních. Zdroj u každé technologie stojí pod tabulkou.
 */

/** Řádek tabulky parametrů. */
export type Parametr = { label: string; value: string };

/** Skupina řádků pod společným nadpisem — tabulka se čte po blocích. */
export type ParametrBlok = { title: string; radky: Parametr[] };

/**
 * Číslo, které o technologii rozhoduje. Čtyři kusy hned pod hero — kdo
 * přišel ověřit jeden parametr, nemusí kvůli němu číst celou stránku.
 */
export type KlicovyUdaj = { value: string; unit?: string; label: string };

/** Přednost: tvrzení v nadpisu, důkaz v textu. Nikdy jen tvrzení. */
export type Prednost = { title: string; text: string };

/** Skupina rozcestníku produktů — dělená podle rozcestí webu. */
export type ProduktSkupina = { title: string; text: string; items: LinkItem[] };

/**
 * Karta na /technologie. Mají ji i procesy bez vlastní stránky
 * (laminace, termolis, kompletace) — proto je `slug` nepovinný.
 */
export type TechKarta = {
  num: string;
  name: string;
  brand?: keyof typeof VYROBCI;
  points: { title: string; text: string }[];
  slug?: string;
};

/** Detail technologie na /technologie/<slug>. */
export type Technologie = TechKarta & {
  slug: string;
  /** Krátký název technologie do navigace, drobečků a rozcestníků. */
  navLabel: string;
  /**
   * Týž název ve tvaru pro vsazení doprostřed věty („Projít rolový UV
   * tisk"). Nejde odvodit strojově: toLowerCase() by ze zkratky UV udělal
   * „uv" a velké písmeno uprostřed věty zase řve.
   */
  nazevVeVete: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroMedia: MediaSpec;
  klic: KlicovyUdaj[];
  split: { title: string; text: string; media: MediaSpec };
  prednosti: Prednost[];
  /** Na co se na tom tiskne nebo řeže. Čipy, ne věty. */
  materialy: string[];
  /** Rozcestník: co se na téhle technologii dá vyrobit. */
  produkty: ProduktSkupina[];
  /** Produkty bez vlastní stránky — jedna věta, ne falešné odkazy. */
  produktyDal: string;
  /** Kam jít, když tahle technologie není správná odpověď. */
  jinak: { slug: string; kdyz: string }[];
  parametry: ParametrBlok[];
  /** Odkud čísla jsou. Patří pod tabulku, ne do hlavy čtenáře. */
  parametryZdroj: string;
  priprava: { title: string; steps: ProcessStep[] };
  faq: Faq[];
  finalTitle: string;
};

export const technologie: Technologie[] = [
  /* ---------------------------------------------------------------- 01 */
  {
    slug: "solventni-tisk",
    num: "01 · Velkoformátový tisk",
    name: "Epson SureColor SC-S80610",
    brand: "epson",
    navLabel: "Solventní tisk",
    nazevVeVete: "solventní tisk",
    metaTitle: "Solventní velkoformátový tisk Opava — Epson SureColor | Visibly",
    metaDescription:
      "Solventní velkoformátový tisk na Epson SureColor SC-S80610 v Opavě. Devět inkoustů, role do 1 626 mm, venku až tři roky bez laminace. Fólie, bannery, plakáty i tapety.",
    eyebrow: "Technologie · Solventní tisk",
    h1: "Solventní tisk, který trefí i barvu značky.",
    intro:
      "Devět inkoustů místo čtyř, role do 1 626 mm a povrch, který venku vydrží roky i bez laminace. Na Epsonu SureColor tiskneme všechno, co se dá odvinout z role.",
    heroMedia: {
      label: "Video z tisku",
      variant: "circle",
      src: "/video/epson-tisk-mini.mp4",
      alt: "Velkoformátový tisk na Epson SureColor SC-S80610",
    },
    points: [
      {
        title: "Devět barev, ne čtyři",
        text: "Ke CMYK přidává světlé odstíny, oranžovou a červenou. Fotka pak vypadá jako fotka, ne jako tisk.",
      },
      { title: "Materiál podle místa", text: "Fólie, bannery, papíry — povrch podle použití." },
      { title: "Více typů výstupu", text: "Od samolepky po backlit do světelného rámu." },
    ],
    klic: [
      { value: "1 626", unit: "mm", label: "Maximální šířka role" },
      { value: "9", unit: "barev", label: "Inkoustů UltraChrome GS3" },
      { value: "3", unit: "roky", label: "Venku i bez laminace" },
      { value: "1 440", unit: "dpi", label: "Rozlišení tisku" },
    ],
    split: {
      title: "Barvu značky nespasí ani nejlepší materiál.",
      text: "Firemní červená, oranžová v logu, pleť na fotce — přesně tam čtyřbarevný tisk kapituluje. Epson má na ta místa samostatné inkousty: oranžovou, červenou a tři světlé odstíny, které z přechodů odstraní zrno.",
      media: { label: "Detail · nátisk a vzorník barev", variant: "circle" },
    },
    prednosti: [
      {
        title: "Devět inkoustů, ne čtyři",
        text: "Ke CMYK přidává světlou azurovou, purpurovou a černou, k tomu oranžovou a červenou. Světlé odstíny rozpustí zrno v přechodech a pleti, oranžová s červenou dosáhnou tam, kam se čtyřbarva neroztáhne.",
      },
      {
        title: "Tři roky venku bez laminace",
        text: "Solventní inkoust se zataví do fólie, neleží na ní. Barevné inkousty proto podle výrobce vydrží venku tři roky i bez laminace — a laminace tu dobu dál posouvá.",
      },
      {
        title: "Role do 1 626 mm v jednom kuse",
        text: "Celá výška výlohy, bok osobního auta i tapeta v pruhu bez svaru. Co je širší, jede na rolovém UV do 3,2 metru.",
      },
      {
        title: "Nejmenší kapka 4,2 pikolitru",
        text: "S rozlišením až 1 440 × 1 440 dpi drží drobné písmo, tenké linky i QR kód. Tedy i tisk, na který se kouká z půl metru, ne jen z ulice.",
      },
      {
        title: "Materiál podle místa, ne podle ceníku",
        text: "Fólie monomerní, polymerní i litá, bannerovina, backlit, blockout, papír, tapeta. Který z nich zvolit, řešíme dřív než cenu — vydrží se tím rozhodne.",
      },
    ],
    materialy: [
      "Monomerní fólie",
      "Polymerní a litá fólie",
      "One-way vision",
      "Bannerovina",
      "Mesh",
      "Backlit fólie",
      "Blockout",
      "Plakátový papír",
      "Tapetový papír",
      "Magnetická fólie",
      "Podlahová fólie",
      "Plátno na fotoobrazy",
    ],
    produkty: [
      {
        title: "Tisk",
        text: "Všechno, co se odvíjí z role a nemusí být pevná deska.",
        items: [
          { label: "Velkoformátový tisk", href: "/tisk/velkoformatovy-tisk" },
          { label: "Samolepky a fólie", href: "/tisk/samolepky-a-folie" },
          { label: "Tisk tapet", href: "/tisk/tapety" },
          { label: "Roll-upy", href: "/tisk/roll-upy" },
          { label: "Plakáty", href: "/tisk/plakaty" },
          { label: "Tisk fotoobrazů", href: "/tisk-fotoobrazu" },
        ],
      },
      {
        title: "Polepy",
        text: "Tištěná fólie na auto, výlohu i stěnu. Řez a laminace navazují u nás.",
        items: [
          { label: "Polepy aut", href: "/polepy/polepy-aut" },
          { label: "Polepy dodávek", href: "/polepy/polepy-dodavek" },
          { label: "Polepy výloh", href: "/polepy/polepy-vyloh" },
          { label: "Interiérové polepy", href: "/polepy/interierove-polepy" },
        ],
      },
      {
        title: "Reklama",
        text: "Grafika, která se prosvěcuje — barvy nastavené na světlo za ní.",
        items: [{ label: "Světelná reklama", href: "/reklama/svetelna-reklama" }],
      },
    ],
    produktyDal:
      "Dál z něj jdou výstavní grafiky, polepy strojů a vitrín, podlahové samolepky, potisky do rámů, etikety na produkt i jednotlivé fotoobrazy od jednoho kusu.",
    jinak: [
      {
        slug: "uv-tisk-na-desky",
        kdyz: "Když má grafika ležet přímo na desce — Dibond, plexi, sklo — a ne na fólii, která se po letech odchlípne.",
      },
      {
        slug: "rolovy-uv-tisk",
        kdyz: "Když je plocha širší než 1 626 mm nebo jde o velkou sérii plachet a billboardů.",
      },
      {
        slug: "rezaci-ploter",
        kdyz: "Když má samolepka nebo nápis končit tvarem loga místo obdélníkem.",
      },
    ],
    parametry: [
      {
        title: "Tisk",
        radky: [
          { label: "Technologie", value: "Solventní (ekosolventní) inkoustový tisk" },
          { label: "Inkoust", value: "Epson UltraChrome GS3 with Red" },
          {
            label: "Barevnost",
            value:
              "9 barev — azurová, purpurová, žlutá, černá, světlá azurová, světlá purpurová, světlá černá, oranžová, červená",
          },
          {
            label: "Desátý kanál",
            value: "Bílá nebo metalická stříbrná, podle osazení stroje",
          },
          { label: "Rozlišení", value: "až 1 440 × 1 440 dpi" },
          { label: "Tisková hlava", value: "Epson MicroPiezo TFP, 360 trysek na barvu" },
          { label: "Nejmenší kapka", value: "4,2 pl" },
        ],
      },
      {
        title: "Materiál",
        radky: [
          { label: "Maximální šířka role", value: "1 626 mm (64″)" },
          { label: "Zpracování", value: "Role" },
          {
            label: "Materiály",
            value: "Samolepicí fólie, bannerovina, backlit, blockout, papír, tapeta, plátno",
          },
          { label: "Objem náplní", value: "700 ml barevné · 600 ml bílá · 350 ml metalická" },
        ],
      },
      {
        title: "Odolnost venku bez laminace",
        radky: [
          { label: "Barevné inkousty", value: "až 3 roky" },
          { label: "Bílá", value: "1 rok" },
          { label: "Metalická stříbrná", value: "3 týdny" },
        ],
      },
    ],
    parametryZdroj:
      "Údaje podle listu parametrů Epson pro SureColor SC-S80610 a inkoustovou řadu UltraChrome GS3. Životnost venku platí pro tisk bez laminace, v našich klimatických podmínkách.",
    priprava: {
      title: "Od dat po hotový tisk.",
      steps: [
        {
          title: "Data a rozměr",
          text: "Ve skutečné velikosti. Na banner z pěti metrů stačí 70–100 DPI, na pohledový tisk 150.",
        },
        {
          title: "Barevnost",
          text: "Firemní barvy pošlete jako Pantone nebo CMYK. Řekneme, co stroj trefí a co jen přiblíží.",
        },
        {
          title: "Materiál a laminace",
          text: "Vybereme podle místa a životnosti. Kde je laminace zbytečná, řekneme to.",
        },
        {
          title: "Tisk a dokončení",
          text: "Vytiskneme, necháme vyzrát, ořízneme nebo vyřežeme a předáme.",
        },
      ],
    },
    faq: [
      {
        q: "Vydrží solventní tisk venku bez laminace?",
        a: "Barevné inkousty UltraChrome GS3 mají podle výrobce tři roky venku i bez laminace. Laminaci proto nedoporučujeme plošně — má smysl tam, kde se tisku někdo dotýká, myje ho nebo o něj škrábe: polepy aut, výlohy, podlahy. Bílá a metalická stříbrná jsou jiný případ, ty laminaci potřebují vždy.",
      },
      {
        q: "Proč devět barev, když běžná tiskárna má čtyři?",
        a: "Kvůli přechodům a firemním barvám. Světlá azurová, purpurová a černá rozpustí zrno v jemných přechodech a v pleti; oranžová a červená rozšíří rozsah tam, kam se čtyřbarva nedostane — typicky sytě červené nebo oranžové logo, které z CMYK vyjde matně.",
      },
      {
        q: "Trefíte přesně naši firemní barvu?",
        a: "U většiny odstínů ano, u některých Pantonů se dostaneme velmi blízko. Pošlete kód barvy. Když víme dopředu, na čem záleží, vytiskneme před zakázkou vzorek na cílový materiál — stejná barva se totiž na lesklé fólii a na bannerovině chová jinak.",
      },
      {
        q: "Jak široký tisk zvládnete v jednom kuse?",
        a: "Na Epsonu do 1 626 mm. Širší plochy jedou na rolovém UV do 3,2 metru, takže ani velká plachta nemusí mít spoj. Do délky jsme omezení jen návinem role.",
      },
      {
        q: "Zapáchá solventní tisk v interiéru?",
        a: "Krátce po tisku ano, proto ho necháváme odvětrat a do interiéru pouštíme až vyzrálý. Do prostor, kde je citlivost na pachy vysoká — ordinace, školky, ložnice — volíme raději UV LED tisk, který je vytvrzený v okamžiku dopadu.",
      },
    ],
    finalTitle: "Potřebujete tisk z role?",
  },

  /* ---------------------------------------------------------------- 02 */
  {
    slug: "uv-tisk-na-desky",
    num: "02 · Hybridní UV tisk",
    name: "Agfa Anapurna M2050i",
    brand: "agfa",
    navLabel: "UV tisk na desky",
    nazevVeVete: "UV tisk na desky",
    metaTitle: "UV tisk na desky Opava — Dibond, plexi, sklo | Visibly",
    metaDescription:
      "UV tisk přímo na desku v Opavě: Dibond, forex, plexisklo, sklo i dřevo do tloušťky 45 mm. Tisková šířka 2 050 mm, krycí bílá, vytvrzení v okamžiku tisku. Cedule, POS i orientační systémy.",
    eyebrow: "Technologie · UV tisk na desky",
    h1: "UV tisk, který jde rovnou na materiál.",
    intro:
      "Bez podlepené fólie, která se po pár letech začne krčit. Anapurna tiskne přímo na Dibond, plexi, sklo i dřevo do tloušťky 45 milimetrů — a inkoust je vytvrzený dřív, než deska dojede ze stroje.",
    heroMedia: { label: "Fotografie · tisk na Dibond", variant: "circle" },
    points: [
      { title: "Deska i role", text: "Tiskne přímo na Dibond, sklo, hliník, keramiku i fólie." },
      { title: "Bílá barva", text: "Podklad pod barvy i tisk na průhledné materiály." },
      { title: "Ven i dovnitř", text: "UV odolnost pro výlohy, cedule i interiér." },
    ],
    klic: [
      { value: "2 050", unit: "mm", label: "Tisková šířka" },
      { value: "45", unit: "mm", label: "Maximální tloušťka desky" },
      { value: "6 + bílá", label: "Barevnost včetně krycí bílé" },
      { value: "1 440", unit: "dpi", label: "Rozlišení tisku" },
    ],
    split: {
      title: "Fólie nalepená na desku je jen mezikrok.",
      text: "Podlepená fólie se časem krčí, po hranách se odchlipuje a v mrazu praská. UV tisk jde přímo na desku — inkoust se vytvrdí světlem v okamžiku dopadu a stane se součástí povrchu. Není co odlepit.",
      media: { label: "Detail · UV tisk na desce", variant: "circle" },
    },
    prednosti: [
      {
        title: "Tisk bez mezivrstvy",
        text: "Grafika jde přímo na Dibond, forex, plexi, sklo i dřevo. Odpadá fólie, lepidlo a s nimi i místo, kde cedule po letech začne selhávat.",
      },
      {
        title: "Krycí bílá, pod barvou i nad ní",
        text: "Dvě hlavy s bílou. Pod barvou udělá podklad na průhledném a tmavém materiálu, nad ní vznikne tisk čitelný z druhé strany skla.",
      },
      {
        title: "Deska do 45 milimetrů",
        text: "Kompozit, plexi, překližka, keramika i kapa. Nemusíme hledat, na co se to nalepí — tiskneme rovnou na to, co má vzniknout.",
      },
      {
        title: "Vytvrzení v okamžiku tisku",
        text: "UV inkoust tuhne pod lampou hned. Deska může rovnou do rámu, na montáž nebo pod nůž — nečeká se, až zaschne.",
      },
      {
        title: "Deska i role z jednoho stroje",
        text: "Hybrid zvládne obojí. Série cedulí a banner ke stejné akci proto vyjdou ve stejné barvě, ne ve dvou odstínech.",
      },
    ],
    materialy: [
      "Dibond a kompozit",
      "Hliník",
      "Forex / PVC deska",
      "Plexisklo",
      "Polykarbonát",
      "Sklo",
      "Keramický obklad",
      "Dřevo a překližka",
      "Kapa deska",
      "Lepenka a kartón",
      "Samolepicí fólie",
      "Bannerovina",
    ],
    produkty: [
      {
        title: "Reklama",
        text: "Všechno, co má viset na fasádě, u vjezdu nebo na zdi a vydržet tam roky.",
        items: [
          { label: "Reklamní cedule", href: "/reklama/reklamni-cedule" },
          { label: "Venkovní reklama", href: "/reklama/venkovni-reklama" },
          { label: "Interiérová reklama", href: "/reklama/interierova-reklama" },
          { label: "Orientační systémy", href: "/reklama/orientacni-systemy" },
        ],
      },
      {
        title: "Tisk",
        text: "Pevné výstupy, které drží tvar samy — bez rámu a bez podlepení.",
        items: [
          { label: "POS materiály", href: "/tisk/pos-materialy" },
          { label: "Velkoformátový tisk", href: "/tisk/velkoformatovy-tisk" },
        ],
      },
    ],
    produktyDal:
      "Dál z něj jdou dveřní a jmenovky, tabulky na vrata, potištěné obklady a skleněné výplně, výstavní panely, menu tabule, plexi stojánky na stůl i jednotlivé kusy na zkoušku.",
    jinak: [
      {
        slug: "solventni-tisk",
        kdyz: "Když má grafika lepit na zakřivený povrch, auto nebo výlohu — tam patří fólie, ne deska.",
      },
      {
        slug: "rolovy-uv-tisk",
        kdyz: "Když je zakázka plachta nebo banner v desítkách metrů čtverečních.",
      },
      {
        slug: "rezaci-ploter",
        kdyz: "Když jde o řezanou fólii na hotovou desku nebo o samolepku vyříznutou do tvaru.",
      },
    ],
    parametry: [
      {
        title: "Tisk",
        radky: [
          { label: "Technologie", value: "UV inkoustový tisk s okamžitým vytvrzením, hybridní" },
          {
            label: "Barevnost",
            value:
              "CMYK + světlá azurová + světlá purpurová + bílá (dvě hlavy — bílá pod barvou i nad ní)",
          },
          { label: "Rozlišení", value: "až 1 440 dpi" },
          { label: "Tiskové hlavy", value: "4 × Konica Minolta KM1024i, 1 024 trysek" },
          { label: "Velikost kapky", value: "12 pl" },
          { label: "Vytvrzení", value: "UV lampy, vytvrzení v okamžiku dopadu inkoustu" },
        ],
      },
      {
        title: "Materiál",
        radky: [
          { label: "Tisková šířka", value: "až 2 050 mm" },
          { label: "Maximální šířka materiálu", value: "2 070 mm" },
          { label: "Maximální tloušťka desky", value: "45 mm" },
          { label: "Maximální plošná hmotnost", value: "10 kg/m²" },
          { label: "Zpracování", value: "Deska i role (hybrid)" },
        ],
      },
      {
        title: "Výkon",
        radky: [
          { label: "Standardní režim", value: "≈ 25 m²/h" },
          { label: "Režim vysokého rozlišení", value: "≈ 15 m²/h" },
        ],
      },
    ],
    parametryZdroj:
      "Údaje podle technického listu Agfa pro Anapurna M2050i. Rychlosti jsou výrobní hodnoty pro danou kvalitu, ne katalogové maximum.",
    priprava: {
      title: "Od dat po hotovou desku.",
      steps: [
        {
          title: "Rozměr a materiál",
          text: "Kde bude prvek viset a jak dlouho. Podle toho volíme desku i tloušťku.",
        },
        {
          title: "Data a bílá",
          text: "U průhledných materiálů řekneme, kde má být krycí bílá a ze které strany se kouká.",
        },
        { title: "Tisk", text: "Přímo na desku, s vytvrzením v okamžiku dopadu inkoustu." },
        {
          title: "Dokončení a montáž",
          text: "Ořez na rozměr, vrtání, distanční šrouby — nebo rovnou montáž na místě.",
        },
      ],
    },
    faq: [
      {
        q: "Vydrží UV tisk na desce venku?",
        a: "Ano, UV inkousty jsou na venek stavěné — cedule na fasádě, u vjezdu i na plotě. O životnosti pak rozhoduje spíš materiál než tisk: Dibond vydrží roky beze změny, forex se v přímém slunci časem prohýbá. Proto se ptejte na materiál dřív než na tisk; sami vám k tomu řekneme své.",
      },
      {
        q: "Můžete tisknout na sklo nebo plexisklo?",
        a: "Ano, včetně krycí bílé. Na průhledný materiál se bílá tiskne buď pod barvu, aby grafika kryla, nebo nad ni, aby byla čitelná z druhé strany. Řekněte, ze které strany se na to bude koukat — pořadí vrstev pak nastavíme podle toho.",
      },
      {
        q: "Jak velkou desku vytisknete?",
        a: "Do tiskové šířky 2 050 mm a délky přes tři metry. Běžné formáty Dibondu i forexu se tedy vejdou bez dělení a cedule nemá spoj uprostřed.",
      },
      {
        q: "Je UV tisk odolný proti poškrábání?",
        a: "Odolnější než grafika podlepená fólií, ale nezničitelný není. Tam, kde na prvek lidé sahají — pulty, POS stojany, tabulky u dveří — doporučíme přelaminovat. Kde se na něj jen dívají, je to zbytečný náklad.",
      },
      {
        q: "Zvládnete sérii stejných cedulí?",
        a: "Ano, a je to typická zakázka: orientační systém pro celou budovu, cedule na pobočky, tabulky na dveře. Tiskneme je najednou a ořezáváme na jeden rozměr, takže série drží pohromadě i po roce, kdy se dodělává poslední patro.",
      },
    ],
    finalTitle: "Potřebujete tisk na desku?",
  },

  /* ---------------------------------------------------------------- 03 */
  {
    slug: "rolovy-uv-tisk",
    num: "03 · Rolový UV tisk",
    name: "Agfa Anapurna RTR3200i LED",
    brand: "agfa",
    navLabel: "Rolový UV tisk",
    nazevVeVete: "rolový UV tisk",
    metaTitle: "Tisk plachet do 3,2 m — rolový UV LED tisk Opava | Visibly",
    metaDescription:
      "Rolový UV LED tisk v Opavě do šířky 3,2 metru bez spoje. Bannery, plachty na fasádu a lešení, billboardy i backlit. Dvě role zároveň, výkon až 127 m²/h.",
    eyebrow: "Technologie · Rolový UV tisk",
    h1: "Plachta na fasádu. V jednom kuse.",
    intro:
      "Spoj je na velké ploše první, co praskne — a taky první, čeho si člověk všimne. Rolová Anapurna tiskne do 3,2 metru, takže u většiny plachet nemusí spoj vůbec vzniknout.",
    heroMedia: { label: "Fotografie · plachta na fasádě", variant: "circle" },
    points: [
      { title: "Až 3,2 metru", text: "Bannery a plachty v jednom kuse, bez spojů." },
      { title: "Dvě role zároveň", text: "Vyšší průchodnost u velkých sérií a formátů." },
      { title: "Šetrné vytvrzení", text: "UV LED zvládne i teplem citlivé fólie a plachty." },
    ],
    klic: [
      { value: "3,2", unit: "m", label: "Šířka tisku bez spoje" },
      { value: "127", unit: "m²/h", label: "Nejvyšší tiskový výkon" },
      { value: "2", unit: "role", label: "Tisk dvou rolí zároveň" },
      { value: "6", unit: "barev", label: "CMYK a světlé odstíny" },
    ],
    split: {
      title: "Velká plocha odpouští nejmíň.",
      text: "Na plachtě přes celou fasádu je vidět každý spoj, každý posun barvy mezi pásy i každé zvlnění materiálu. Proto ji tiskneme z jedné role, na jeden zátah a v jedné barvě — a materiál volíme podle toho, jestli za ní fouká.",
      media: { label: "Detail · návin role 3,2 m", variant: "circle" },
    },
    prednosti: [
      {
        title: "Šířka 3,2 metru",
        text: "Plachta na lešení, síť na fasádu, billboardový plakát. Do 3,2 m jde grafika v jednom kuse — bez svaru, bez přechodu, bez místa, kde to začne pouštět.",
      },
      {
        title: "Studené UV LED vytvrzení",
        text: "LED lampy nesálají teplo, takže tenká fólie ani lehká plachta neuhne rozměrem. Barva je hotová v okamžiku dopadu, nemusí vyzrávat ani odvětrat.",
      },
      {
        title: "Dvě role najednou",
        text: "Užší zakázky jedou vedle sebe a projedou strojem naráz. U velkých sérií se to pozná na termínu i na ceně za metr.",
      },
      {
        title: "Až 127 m² za hodinu",
        text: "Kampaň na dvacet poboček nemusí trvat týden. A kde jde o kvalitu víc než o čas, sjedeme režim dolů — třeba na backlit, kde stroj nanáší podstatně víc inkoustu.",
      },
      {
        title: "Čitelnost do čtyř bodů",
        text: "I na velké plachtě drží drobný text: kontakt, podmínky soutěže, patička s adresou. Nemusíte je z grafiky vyhazovat jen proto, že je plocha velká.",
      },
    ],
    materialy: [
      "PVC bannerovina",
      "Mesh / průvětrná síťovina",
      "Blockout",
      "Backlit fólie",
      "Samolepicí fólie",
      "Plakátový papír",
      "Billboardový papír",
      "Polyesterové textilie",
    ],
    produkty: [
      {
        title: "Tisk",
        text: "Velké plochy, které se odvíjejí z role a jedou v sériích.",
        items: [
          { label: "Bannery a plachty", href: "/tisk/bannery-a-plachty" },
          { label: "Billboardy a citylighty", href: "/tisk/billboardy-a-citylighty" },
          { label: "Velkoformátový tisk", href: "/tisk/velkoformatovy-tisk" },
          { label: "Plakáty", href: "/tisk/plakaty" },
        ],
      },
      {
        title: "Reklama",
        text: "Plochy, které mají být vidět z ulice — ve dne i po setmění.",
        items: [
          { label: "Venkovní reklama", href: "/reklama/venkovni-reklama" },
          { label: "Světelná reklama", href: "/reklama/svetelna-reklama" },
        ],
      },
    ],
    produktyDal:
      "Dál z něj jdou plachty na lešení a stavební sítě, banery na sportoviště a mantinely, zástěny na ploty, textilní pozadí na akce, backlit do velkých světelných rámů i sady stejných plachet pro celou síť poboček.",
    jinak: [
      {
        slug: "solventni-tisk",
        kdyz: "Když je zakázka užší než 1,6 m a rozhoduje fotografická kvalita nebo přesná firemní barva.",
      },
      {
        slug: "uv-tisk-na-desky",
        kdyz: "Když má výsledek být pevná cedule nebo panel, ne plachta v rámu.",
      },
      {
        slug: "rezaci-ploter",
        kdyz: "Když má tisk končit tvarem — na plachtě to nedává smysl, na samolepce ano.",
      },
    ],
    parametry: [
      {
        title: "Tisk",
        radky: [
          { label: "Technologie", value: "Rolový UV LED inkoustový tisk" },
          {
            label: "Barevnost",
            value: "6 barev — CMYK + světlá azurová + světlá purpurová (varianta CMYK + bílá)",
          },
          { label: "Tiskové hlavy", value: "6 × Konica Minolta KM1024i, 1 024 trysek" },
          { label: "Velikost kapky", value: "12 pl" },
          { label: "Vytvrzení", value: "Vzduchem chlazené UV LED lampy 16 W/cm²" },
          { label: "Čitelnost textu", value: "od 4 b pozitiv, 6 b negativ" },
        ],
      },
      {
        title: "Materiál",
        radky: [
          { label: "Šířka materiálu", value: "610–3 200 mm" },
          { label: "Tisková šířka", value: "až 3 200 mm" },
          { label: "Dvě role zároveň", value: "2 × 1 524 mm" },
          { label: "Minimální tloušťka", value: "0,2 mm" },
          { label: "Hmotnost role", value: "až 100 kg (volitelně 150 kg)" },
        ],
      },
      {
        title: "Rychlost tisku",
        radky: [
          { label: "Draft", value: "127 m²/h" },
          { label: "Express", value: "76–85 m²/h" },
          { label: "Produkční", value: "37–65 m²/h" },
          { label: "Standard", value: "22–33 m²/h" },
          { label: "Vysoká kvalita", value: "16–18 m²/h" },
          { label: "Vysoké rozlišení", value: "9 m²/h" },
          { label: "Backlit", value: "4–9 m²/h" },
        ],
      },
    ],
    parametryZdroj: "Údaje podle technického listu Agfa pro Anapurna RTR3200i LED.",
    priprava: {
      title: "Od rozměru po pověšenou plachtu.",
      steps: [
        {
          title: "Místo a rozměr",
          text: "Fotka místa a přibližný rozměr stačí. Podle větru volíme plnou plachtu, nebo mesh.",
        },
        {
          title: "Materiál a konfekce",
          text: "Gramáž, lem, oka nebo tunýlek — podle toho, jak se to bude věšet.",
        },
        { title: "Tisk", text: "Z jedné role, v jednom zátahu. Nad 3,2 m řešíme spoj předem." },
        { title: "Dokončení", text: "Svaření lemů, oka po rozteči, zabalení na cestu." },
      ],
    },
    faq: [
      {
        q: "Jak velkou plachtu zvládnete bez spoje?",
        a: "Do šířky 3,2 metru, v libovolné délce. Nad 3,2 m spoj vzniknout musí — svařujeme ho pak tak, aby padl do klidného místa grafiky, ne přes logo nebo obličej.",
      },
      {
        q: "Vydrží plachta na fasádě vítr?",
        a: "Rozhoduje materiál a uchycení, ne tisk. Na volnou plochu, kde fouká, patří mesh, kterým vítr projde; na plot postačí klasická bannerovina s oky zhruba po metru. Pošlete fotku místa a doporučíme konkrétně.",
      },
      {
        q: "Umíte tisk pro pronajaté billboardové a citylight plochy?",
        a: "Ano, v přesných formátech, které pronajímatel plochy vyžaduje, včetně backlitu do citylightů. Stačí říct typ plochy a lokalitu, rozměry si dohledáme.",
      },
      {
        q: "Co znamená UV LED a proč na tom záleží?",
        a: "Inkoust tvrdne světlem, ne teplem a odparem rozpouštědla. Materiál tedy neprochází horkem, nemění rozměr a barva je hotová okamžitě. Tisk se navíc nemusí odvětrávat, takže může rovnou do interiéru nebo na cestu k zákazníkovi.",
      },
      {
        q: "Vyjde velká série levněji?",
        a: "Ano, a víc, než se čeká. Dvě role vedle sebe a produkční režim znamenají desítky metrů čtverečních za hodinu. U větších sérií se to promítne do ceny za metr — proto se vyplatí říct rovnou celkový počet, ne poptávat kus po kuse.",
      },
    ],
    finalTitle: "Potřebujete velkou plachtu?",
  },

  /* ---------------------------------------------------------------- 04 */
  {
    slug: "rezaci-ploter",
    num: "04 · Přesný řez",
    name: "Roland CAMM-1 GR2-640",
    brand: "roland",
    navLabel: "Řezací ploter",
    nazevVeVete: "řezací ploter",
    metaTitle: "Řezací ploter Opava — řezaná grafika a obrysový řez | Visibly",
    metaDescription:
      "Řezací ploter Roland CAMM-1 GR2-640 v Opavě. Řezná šířka 1 627 mm, přítlak do 600 gf, obrysový řez tištěné grafiky podle značek. Řezaná grafika, samolepky do tvaru i polepy.",
    eyebrow: "Technologie · Řezací ploter",
    h1: "Řez podle dat, ne podle nálady nože.",
    intro:
      "Nápis na výlohu, samolepka ve tvaru loga, obrysový řez tištěné grafiky. Roland řeže do šířky 1 627 mm s krokem šest tisícin milimetru — čtyřicátá samolepka v sérii proto vypadá jako první.",
    heroMedia: { label: "Fotografie · řezaná grafika na plotru", variant: "circle" },
    points: [
      { title: "Čisté hrany", text: "Detail odpovídá datům, ne náladě nože." },
      { title: "Tvar podle grafiky", text: "Logo nemusí končit obdélníkem." },
      { title: "Připraveno k aplikaci", text: "S aplikační fólií, části na sebe navazují." },
    ],
    klic: [
      { value: "1 627", unit: "mm", label: "Šířka řezu" },
      { value: "50", unit: "m", label: "Délka řezu v jednom kuse" },
      { value: "600", unit: "gf", label: "Maximální přítlak nože" },
      { value: "0,006", unit: "mm", label: "Mechanický krok" },
    ],
    split: {
      title: "Tvar loga nemá končit obdélníkem.",
      text: "Nálepka do tvaru, nápis bez podkladu, pruh přes celou výlohu. Ploter jede po vektoru, který jste nakreslili — a u tištěné grafiky si k ní podle značek najde cestu sám.",
      media: { label: "Detail · odplevelený nápis s aplikační fólií", variant: "circle" },
    },
    prednosti: [
      {
        title: "Řez podle vektoru",
        text: "Mechanický krok 0,006 mm a odchylka do 0,1 % dráhy. Na dvoumetrovém pruhu to dělá pár desetin milimetru — série proto zůstane jednotná od prvního kusu po poslední.",
      },
      {
        title: "Obrysový řez tištěné grafiky",
        text: "Optický snímač Roland AAS II najde na tisku značky a objede grafiku po hraně. Tisk a řez tak drží spolu i po několika metrech, ne jen na začátku archu.",
      },
      {
        title: "Přítlak 5 až 600 gramů",
        text: "Od tenké výlohové fólie po reflexní, pískovací a nažehlovací flex. Přítlak se nastavuje podle materiálu, ne podle zvyku — proto se tenká fólie neprořízne a tlustá nedotrhne.",
      },
      {
        title: "Pruh dlouhý až 50 metrů",
        text: "Linka přes celou chodbu, pás přes bok dodávky, orientační pruh po celém patře. Bez napojení, které by po roce bylo první vidět.",
      },
      {
        title: "Rychlost do 1 530 mm/s",
        text: "Sérii samolepek nebo sadu nápisů zvládneme mezi tiskem a montáží. Řez tak není samostatný týden v termínu zakázky.",
      },
    ],
    materialy: [
      "Řezací fólie monomerní",
      "Polymerní a litá fólie",
      "Tištěná samolepicí fólie",
      "Reflexní fólie",
      "Pískovaná (matná) fólie",
      "One-way vision",
      "Magnetická fólie",
      "Nažehlovací flex",
      "Flock",
      "Aplikační fólie",
      "Papír a karton do 0,8 mm",
    ],
    produkty: [
      {
        title: "Polepy",
        text: "Všude, kde má fólie končit tvarem a ne obdélníkem.",
        items: [
          { label: "Řezaná grafika", href: "/polepy/rezana-grafika" },
          { label: "Polepy aut", href: "/polepy/polepy-aut" },
          { label: "Polepy dodávek", href: "/polepy/polepy-dodavek" },
          { label: "Polepy výloh", href: "/polepy/polepy-vyloh" },
          { label: "Interiérové polepy", href: "/polepy/interierove-polepy" },
        ],
      },
      {
        title: "Tisk",
        text: "Tištěná grafika, kterou ploter objede přesně po hraně.",
        items: [
          { label: "Samolepky a fólie", href: "/tisk/samolepky-a-folie" },
          { label: "POS materiály", href: "/tisk/pos-materialy" },
        ],
      },
      {
        title: "Reklama",
        text: "Série, které mají držet jeden rozměr napříč budovou.",
        items: [
          { label: "Orientační systémy", href: "/reklama/orientacni-systemy" },
          { label: "Interiérová reklama", href: "/reklama/interierova-reklama" },
          { label: "Reklamní textil", href: "/reklama/reklamni-textil" },
        ],
      },
    ],
    produktyDal:
      "Dál z něj jdou otevírací doby a kontakty na dveře, čísla popisná, pískované fólie do zasedaček, značení strojů a rozvaděčů, startovní čísla, šablony na nástřik i jednotlivé nápisy na auto.",
    jinak: [
      {
        slug: "solventni-tisk",
        kdyz: "Když má grafika obsahovat fotku nebo přechod — ploter řeže jednobarevnou fólii.",
      },
      {
        slug: "uv-tisk-na-desky",
        kdyz: "Když má být výsledek pevná deska, ne fólie nalepená na cizí povrch.",
      },
      {
        slug: "rolovy-uv-tisk",
        kdyz: "Když je plocha širší než 1,6 metru nebo jde o plachtu.",
      },
    ],
    parametry: [
      {
        title: "Řez",
        radky: [
          { label: "Maximální řezná plocha", value: "1 627 × 50 000 mm" },
          { label: "Šířka materiálu", value: "50–1 782 mm" },
          { label: "Tloušťka materiálu", value: "do 0,8 mm" },
          { label: "Přítlak nože", value: "5–600 gf" },
          { label: "Rychlost řezu", value: "30–1 530 mm/s" },
        ],
      },
      {
        title: "Přesnost",
        radky: [
          { label: "Mechanické rozlišení", value: "0,006 mm/krok" },
          { label: "Programové rozlišení", value: "0,025 mm/krok" },
          { label: "Přesnost dráhy", value: "±0,1 % dráhy, nejhůř 0,254 mm" },
          { label: "Obrysový řez", value: "Optický snímač značek Roland AAS II" },
        ],
      },
      {
        title: "Připojení",
        radky: [{ label: "Rozhraní", value: "Ethernet, USB 2.0, RS-232C" }],
      },
    ],
    parametryZdroj: "Údaje podle listu parametrů Roland DG pro CAMM-1 GR2-640.",
    priprava: {
      title: "Od křivek po nalepený nápis.",
      steps: [
        {
          title: "Data v křivkách",
          text: "Vektor v PDF, AI, EPS nebo SVG, s písmem převedeným do křivek.",
        },
        {
          title: "Fólie a barva",
          text: "Vybereme podle povrchu a životnosti — jiná fólie na sklo, jiná na lak auta.",
        },
        { title: "Řez a odplevelení", text: "Vyřežeme, odstraníme přebytek, přetáhneme aplikační fólií." },
        {
          title: "Aplikace",
          text: "Nalepíte sami podle návodu, nebo přijedeme a nalepíme to my.",
        },
      ],
    },
    faq: [
      {
        q: "Jaká data potřebujete pro řezanou grafiku?",
        a: "Křivky, ne bitmapu. Ideálně vektor v PDF, AI, EPS nebo SVG, s písmem převedeným do křivek. Když máte logo jen v JPG nebo PNG, převedeme ho do křivek za vás — je to práce navíc, ale běžná.",
      },
      {
        q: "Jak malé písmo se dá vyřezat?",
        a: "Prakticky zhruba od 15 mm výšky verzálek, u jednoduchých bezpatkových písem i míň. Pod tou hranicí se tenké tahy při odplevelování a aplikaci trhají — tam je rozumnější tištěná samolepka s obrysovým řezem.",
      },
      {
        q: "Umíte vyřezat samolepku do tvaru loga?",
        a: "Ano, to je přesně obrysový řez. Grafika se nejdřív vytiskne, pak ji ploter podle značek objede po hraně. Samolepka tak nemusí končit obdélníkem a logo si udrží svůj tvar.",
      },
      {
        q: "Dostanu grafiku připravenou k nalepení?",
        a: "Ano. Nápisy odplevelíme a přetáhneme aplikační fólií, takže písmena drží rozestupy a nalepíte je jako jeden celek podle přiloženého návodu. U větších ploch a aut doporučujeme aplikaci nechat na nás.",
      },
      {
        q: "Řežete i nažehlovací fólii na textil?",
        a: "Ano, flex i flock. Vyřezaný motiv pak zažehlíme termolisem. Dává to smysl hlavně u malých sérií, kde by se příprava sítotisku nevyplatila — od jednoho kusu výš.",
      },
    ],
    finalTitle: "Potřebujete něco vyřezat?",
  },
];

/**
 * Zbytek strojového parku. Vlastní stránku nemá schválně: laminace,
 * termolis ani kompletace nemají značkový stroj, který by o výsledku
 * rozhodoval, a samostatná stránka by z nich byla tenká vata. Na
 * rozcestníku ale patří — bez nich by výčet výroby lhal.
 */
export const doplnky: TechKarta[] = [
  {
    num: "05 · Ochrana povrchu",
    name: "Velkoplošná laminace",
    points: [
      { title: "Odolnější povrch", text: "UV, oděr i mytí bez ztráty barev." },
      { title: "Mat nebo lesk", text: "Vzhled podle použití a světla." },
      { title: "Součást řešení", text: "Doporučíme, jen kde dává smysl." },
    ],
  },
  {
    num: "06 · Firemní textil",
    name: "Termolis",
    points: [
      { title: "Správná pozice", text: "Logo přesně tam, kde má být." },
      { title: "Menší série", text: "Od jednoho kusu, bez příplatků za málo." },
      { title: "Jednotná značka", text: "Textil ladí s autem i tiskovinami." },
    ],
  },
  {
    num: "07 · Dokončení na místě",
    name: "Kompletace a aplikace",
    points: [
      { title: "Složení zakázky", text: "Kampaně balíme po pobočkách." },
      { title: "Čistá aplikace", text: "Polepy bez bublin, montáž bez děr navíc." },
      { title: "Kontrola v kontextu", text: "Výsledek posuzujeme na místě, ne od stolu." },
    ],
  },
];

/** Pořadí 01–07 na rozcestníku. Detaily napřed, dokončení za nimi. */
export const strojovyPark: TechKarta[] = [...technologie, ...doplnky];

export function getTechnologie(slug: string): Technologie | undefined {
  return technologie.find((t) => t.slug === slug);
}

/** Všechny slugy služeb, které na téhle technologii vznikají. */
export function sluzbyTechnologie(t: Technologie): string[] {
  return t.produkty.flatMap((skupina) =>
    skupina.items.map((item) => item.href.split("/").filter(Boolean).pop() as string),
  );
}
