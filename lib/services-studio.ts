import type { ServicePage } from "./types";

/** Samostatné služby studia — nové SEO stránky mimo tři hlavní huby. */
export const studioServices: ServicePage[] = [
  {
    slug: "navrh-loga-a-vizualni-identity",
    hub: null,
    navLabel: "Logo a vizuální identita",
    metaTitle: "Návrh loga a vizuální identity Opava | Visibly",
    metaDescription:
      "Návrh loga a vizuální identity v Opavě. Značka připravená pro tisk, polepy, reklamu i web — od studia, které ji pak skutečně vyrábí.",
    eyebrow: "Studio · Logo a identita",
    h1: "Logo a identita, které přežijí i tiskárnu.",
    intro:
      "Navrhujeme značky s vědomím, kde budou žít: na autě, fasádě, tričku i webu. Jsme studio, které identitu nejen nakreslí, ale pak ji i vyrábí.",
    heroMedia: { label: "Kruhová fotografie · logo manuál a vzorky", variant: "circle" },
    split: {
      title: "Nejlepší test loga je výroba.",
      text: "Spousta log vypadá dobře v prezentaci a rozpadne se na řezané fólii nebo malé vizitce. My značky stavíme rovnou pro reálné nosiče — protože je sami tiskneme, řežeme a montujeme.",
      media: { label: "Detail · logo v křivkách na monitoru", variant: "circle" },
    },
    proof: [
      { title: "Značka ověřená výrobou", text: "Návrh počítá s fólií, tiskem i světelným provedením." },
      { title: "Kompletní předání", text: "Logo manuál a data, se kterými obstojíte kdekoli." },
      { title: "Návaznost na výrobu", text: "Od loga rovnou k polepu, ceduli a tiskovinám." },
    ],
    variantsTitle: "V jaké situaci jste?",
    variants: [
      { title: "Začínám podnikat", text: "Logo a základní identita, která poroste s vámi.", href: "/kontakt#poptavka", cta: "Probrat novou značku" },
      { title: "Značka mi zestárla", text: "Redesign, který zachová, co funguje, a opraví zbytek.", href: "/kontakt#poptavka", cta: "Probrat redesign" },
      { title: "Logo mám jen v JPG", text: "Překreslení do křivek a příprava dat pro výrobu.", href: "/kontakt#poptavka", cta: "Zachránit logo" },
      { title: "Potřebuji i grafiku pro tisk", text: "Letáky, bannery a podklady navazující na identitu.", href: "/tisk/tiskoviny", cta: "Projít tiskoviny" },
    ],
    band: {
      title: "Identita je začátek, ne cíl.",
      text: "Z hotové značky u nás rovnou vyrobíte polep auta, ceduli, textil i tiskoviny — bez ztráty v překladu.",
      cta: "Prohlédnout realizace",
      href: "/realizace",
    },
    process: {
      title: "Od zadání po logo manuál.",
      steps: [
        { title: "Poznání", text: "Co děláte, pro koho a čím se lišíte." },
        { title: "Návrh", text: "Koncepty loga s ukázkou na reálných nosičích." },
        { title: "Dotažení", text: "Barvy, písmo a pravidla používání." },
        { title: "Předání", text: "Logo manuál a kompletní datová sada." },
      ],
    },
    faqTitle: "Než si necháte navrhnout značku",
    faq: [
      {
        q: "Co všechno dostanu s hotovým logem?",
        a: "Logo ve všech potřebných formátech (křivky, PNG, varianty pro světlé i tmavé pozadí), definované barvy a písma a stručný manuál používání. Zkrátka vše, co po vás kdy bude chtít tiskárna, výrobce nebo tvůrce webu.",
      },
      {
        q: "Kolik stojí návrh loga?",
        a: "Samotné logo od nižších desítek tisíc, kompletní identita podle rozsahu. Přesnou nabídku připravíme po krátkém rozhovoru o tom, co značka potřebuje.",
      },
      {
        q: "Jak dlouho návrh trvá?",
        a: "Logo obvykle 3–5 týdnů včetně iterací, kompletní identita déle. Termín si řekneme na začátku a držíme ho.",
      },
      {
        q: "Máme logo, ale rozpadá se nám komunikace. Pomůžete?",
        a: "Ano — často stačí systematizace: doplnit pravidla, sladit barvy a písma a připravit šablony. Logo měnit nemusíte.",
      },
      {
        q: "Navrhnete i grafiku pro konkrétní tiskoviny?",
        a: "Ano, grafické návrhy pro tisk — letáky, bannery, vizitky, katalogy — děláme denně. S identitou od nás na sebe všechno navazuje samo.",
      },
    ],
    guides: [{ label: "Jaký formát loga poslat do tiskárny", href: "/pruvodce/jaky-format-loga-poslat-do-tiskarny" }],
    works: ["linealux", "rezani-betonu"],
    finalTitle: "Postavme značku, která obstojí.",
    finalCta: "Probrat značku",
  },
  {
    slug: "webdesign",
    hub: null,
    navLabel: "Webdesign",
    metaTitle: "Webdesign Opava — weby pro firmy a živnostníky | Visibly",
    metaDescription:
      "Tvorba webů v Opavě: webové vizitky a firemní weby, které ladí s vaší značkou na cedulích, autech i tiskovinách. Návrh a realizace od Visibly.",
    eyebrow: "Studio · Webdesign",
    h1: "Web, který ladí s cedulí na vaší fasádě.",
    intro:
      "Firemní web a webová vizitka od studia, které zná vaši značku z výroby. Zákazník, který vás našel v ulici, u vás pozná i web — a naopak.",
    heroMedia: { label: "Kruhová fotografie · web na notebooku", variant: "circle" },
    split: {
      title: "Web je vaše provozovna, která nikdy nezavírá.",
      text: "Většina zákazníků si vás před návštěvou či telefonátem prohlédne online. Stavíme weby, které řeknou podstatné za pár vteřin: co děláte, pro koho a jak vás kontaktovat.",
      media: { label: "Detail · responzivní náhledy webu", variant: "circle" },
    },
    proof: [
      { title: "Jednotná značka", text: "Web navazuje na logo, polepy i tiskoviny." },
      { title: "Rychlost a SEO", text: "Weby, které se načtou hned a Google je má rád." },
      { title: "Bez starostí", text: "Doména, hosting a drobné úpravy vyřešíme za vás." },
    ],
    variantsTitle: "Jaký web potřebujete?",
    variants: [
      { title: "Webovou vizitku", text: "Jedna stránka: kdo jste, co děláte, kontakt.", href: "/kontakt#poptavka", cta: "Poptat vizitku" },
      { title: "Firemní web", text: "Více stránek se službami a referencemi.", href: "/kontakt#poptavka", cta: "Poptat firemní web" },
      { title: "Web k nové identitě", text: "Značka a web v jednom projektu — ideální start.", href: "/navrh-loga-a-vizualni-identity", cta: "Projít identitu" },
      { title: "Oživit zastaralý web", text: "Redesign, který zachová adresu i pozice.", href: "/kontakt#poptavka", cta: "Probrat redesign" },
    ],
    band: {
      title: "Značka, web i výroba z jedné ruky.",
      text: "LineaLux nebo ReformLab jsme dělali přesně takhle — podívejte se na výsledek.",
      cta: "Prohlédnout realizace",
      href: "/realizace",
    },
    process: {
      title: "Od obsahu po spuštění.",
      steps: [
        { title: "Zadání", text: "Co má web říct a co má návštěvník udělat." },
        { title: "Struktura a texty", text: "Obsah dřív než barvičky." },
        { title: "Design a stavba", text: "Web ladící s vaší identitou." },
        { title: "Spuštění", text: "Doména, měření a předání přístupů." },
      ],
    },
    faqTitle: "Než se pustíte do webu",
    faq: [
      {
        q: "Kolik stojí firemní web?",
        a: "Webová vizitka od nižších desítek tisíc, větší firemní web podle rozsahu. Po úvodním rozhovoru dostanete nabídku s pevnou cenou — bez hodinových překvapení.",
      },
      {
        q: "Pomůžete i s texty na web?",
        a: "Ano, texty považujeme za polovinu webu. Vytáhneme z vás, co je podstatné, a napíšeme to jazykem zákazníka, ne katalogu.",
      },
      {
        q: "Budu si moct web upravovat sám?",
        a: "Podle domluvy — buď postavíme web s administrací, nebo drobné úpravy řešíme my obratem. Pro menší firmy je druhá cesta často levnější i rychlejší.",
      },
      {
        q: "Zajistíte doménu a hosting?",
        a: "Ano, kompletně — doména zůstává psaná na vás, takže o nic nepřijdete, ani kdybychom se jednou rozešli.",
      },
      {
        q: "Uděláte web, i když jste mi nedělali logo?",
        a: "Samozřejmě. Vyjdeme z vaší stávající identity — a když v ní něco chybí, doplníme jen nezbytné minimum.",
      },
    ],
    guides: [],
    works: ["linealux", "reformlab"],
    finalTitle: "Ať vás najdou i na internetu.",
    finalCta: "Poptat web",
  },
  {
    slug: "tisk-fotoobrazu",
    hub: null,
    navLabel: "Tisk fotoobrazů",
    metaTitle: "Tisk fotoobrazů Opava — fotky na stěnu | Visibly",
    metaDescription:
      "Tisk fotoobrazů v Opavě: vaše fotografie jako obraz do interiéru. Fotografická kvalita tisku, poradíme s výběrem fotky i formátu.",
    eyebrow: "Studio · Fotoobrazy",
    h1: "Fotoobrazy: vaše fotky si zaslouží stěnu.",
    intro:
      "Fotka z dovolené, rodinný portrét nebo záběr z dronu nad vaší firmou. Vytiskneme ji ve fotografické kvalitě jako obraz, který dělá interiéru radost.",
    heroMedia: { label: "Kruhová fotografie · fotoobraz v interiéru", variant: "circle" },
    split: {
      title: "Z galerie v mobilu na stěnu v obýváku.",
      text: "Nejlepší fotky si nezaslouží zůstat v telefonu. Poradíme s výběrem snímku, ověříme kvalitu dat a doporučíme formát podle stěny, na kterou obraz míří.",
      media: { label: "Detail · tisk fotografie", variant: "circle" },
    },
    proof: [
      { title: "Fotografická kvalita", text: "Tisk s věrnými barvami a jemným detailem." },
      { title: "Kontrola snímku", text: "Ověříme, že fotka na daný formát stačí." },
      { title: "Formát na míru stěně", text: "Od malých formátů po metrové kusy." },
    ],
    variantsTitle: "Jaký obraz chystáte?",
    variants: [
      { title: "Do domácnosti", text: "Rodinné fotky, svatba, cestování.", href: "/kontakt#poptavka", cta: "Poptat fotoobraz" },
      { title: "Do firmy či ordinace", text: "Atmosféra prostoru, které si klienti všimnou.", href: "/kontakt#poptavka", cta: "Poptat do firmy" },
      { title: "Jako dárek", text: "Obraz z fotky je dárek, který se nevrací.", href: "/kontakt#poptavka", cta: "Stihnout dárek" },
      { title: "Sérii do interiéru", text: "Více obrazů v jednotném stylu a rozměrech.", href: "/polepy/interierove-polepy", cta: "Projít interiéry" },
    ],
    band: {
      title: "Nevíte, jestli fotka stačí?",
      text: "Pošlete ji nám — posoudíme rozlišení a řekneme, do jakého formátu se dá tisknout.",
      cta: "Jak kvalitní fotku potřebuji",
      href: "/pruvodce/jak-kvalitni-fotku-na-fotoobraz",
    },
    process: {
      title: "Od fotky po obraz na stěně.",
      steps: [
        { title: "Fotka", text: "Pošlete snímek v plné kvalitě." },
        { title: "Kontrola a formát", text: "Ověříme data a doporučíme rozměr." },
        { title: "Tisk", text: "Fotografická kvalita na správném materiálu." },
        { title: "Předání", text: "Připravený k pověšení, bezpečně zabalený." },
      ],
    },
    faqTitle: "Než necháte fotku vytisknout",
    faq: [
      {
        q: "Jak kvalitní fotku potřebuji?",
        a: "Záleží na formátu — na menší obraz stačí běžná fotka z novějšího telefonu, na metrové formáty je potřeba víc. Fotku posoudíme zdarma a na rovinu řekneme, kam až se dá zvětšit.",
      },
      {
        q: "Jaké formáty fotoobrazů děláte?",
        a: "Standardní řady i rozměry přesně na míru vaší stěně. S výběrem poradíme podle místa — pošlete fotku stěny a rozměr sedne napoprvé.",
      },
      {
        q: "Pošlu fotku mobilem. Stačí to?",
        a: "Většinou ano — jen ji posílejte v originální velikosti (ne přes chat, který ji zmenší). Nejlépe úschovnou, e-mailem v příloze nebo přes cloud.",
      },
      {
        q: "Jak dlouho výroba trvá?",
        a: "Běžně do týdne. Před svátky doporučujeme objednat s předstihem — fotoobrazy jsou oblíbený dárek.",
      },
      {
        q: "Vydrží barvy roky?",
        a: "Ano, tiskneme pigmentovými inkousty s vysokou stálostí. Obraz nevystavujte přímému slunci celý den a vydrží věrný mnoho let.",
      },
    ],
    guides: [{ label: "Jak kvalitní fotku na fotoobraz", href: "/pruvodce/jak-kvalitni-fotku-na-fotoobraz" }],
    works: [],
    finalTitle: "Dostaňte fotky z telefonu na stěnu.",
    finalCta: "Poptat fotoobraz",
  },
];
