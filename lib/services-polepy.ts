import type { ServicePage } from "./types";

/** SEO podstránky sekce /polepy — finální copy. */
export const polepyServices: ServicePage[] = [
  {
    slug: "polepy-aut",
    hub: "polepy",
    navLabel: "Polepy aut",
    metaTitle: "Polepy aut Opava — návrh, výroba i aplikace | Visibly",
    metaDescription:
      "Polepy aut v Opavě od návrhu po čistou aplikaci. Řezaná grafika i tištěné fólie, částečný i celopolep. Auto, které dělá reklamu, kdykoli stojí i jede.",
    eyebrow: "Polepy · Auta",
    h1: "Polep auta, který jezdí za zákazníky.",
    intro:
      "Vaše auto denně vidí stovky lidí. Navrhneme, vytiskneme a nalepíme polep, který z něj udělá nejlevnější reklamní plochu, jakou kdy budete mít.",
    heroMedia: { label: "Kruhová fotografie · polep osobního auta", variant: "circle" },
    split: {
      title: "Polep musí sedět značce, autu i provozu.",
      text: "Jiná grafika funguje na řemeslnickém kombíku a jiná na autě obchodního zástupce. Návrh stavíme na tom, kdo auto vidí a co si má zapamatovat — obvykle jméno, obor a telefon.",
      media: { label: "Detail · aplikace fólie na kapotu", variant: "circle" },
    },
    proof: [
      { title: "Návrh na fotku vašeho auta", text: "Vidíte výsledek dřív, než se cokoli lepí." },
      { title: "Fólie podle karoserie", text: "Kvalitní lité i řezané fólie, které drží i v prolisech." },
      { title: "Čistá aplikace", text: "Lepíme u nás v Opavě, bez bublin a odchlípnutých hran." },
    ],
    variantsTitle: "Jaký polep auta řešíte?",
    variants: [
      { title: "Logo a kontakt", text: "Řezaná grafika na dveře a záď. Rychlé a účinné.", href: "/polepy/rezana-grafika", cta: "Projít řezanou grafiku" },
      { title: "Částečný polep", text: "Výrazná grafika na části vozu — nejlepší poměr cena/výkon.", href: "/kontakt#poptavka", cta: "Poptat částečný polep" },
      { title: "Celopolep", text: "Auto jako jedna velká grafika. Maximální viditelnost.", href: "/kontakt#poptavka", cta: "Poptat celopolep" },
      { title: "Dodávku nebo flotilu", text: "Polepy dodávek řešíme jako samostatnou disciplínu.", href: "/polepy/polepy-dodavek", cta: "Projít polepy dodávek" },
    ],
    band: {
      title: "Kolik polep auta stojí?",
      text: "Záleží na rozsahu a typu fólie. V průvodci jsme sepsali, co cenu skutečně ovlivňuje.",
      cta: "Kolik stojí polep auta",
      href: "/pruvodce/kolik-stoji-polep-auta",
    },
    process: {
      title: "Od fotky auta po výjezd z dílny.",
      steps: [
        { title: "Zadání", text: "Fotka auta, logo a co má polep říct." },
        { title: "Návrh", text: "Grafika nasazená na fotku vašeho vozu." },
        { title: "Výroba", text: "Tisk, laminace a řez fólií u nás." },
        { title: "Aplikace", text: "Čisté nalepení, obvykle během jednoho dne." },
      ],
    },
    faqTitle: "Co je dobré vědět před polepem auta",
    faq: [
      {
        q: "Kolik stojí polep auta?",
        a: "Logo s kontaktem na dveřích pořídíte od nižších tisíců, částečný polep od cca 10 tisíc, celopolep dodávky podle rozsahu výš. Přesnou cenu řekneme z fotky auta a návrhu rozsahu — nezávazně a rychle.",
      },
      {
        q: "Poškodí polep lak auta?",
        a: "Kvalitní fólie správně aplikovaná i odstraněná lak nepoškodí — naopak ho chrání před oděrkami a sluncem. Při odstraňování starých či nekvalitních fólií je riziko vyšší, proto se vyplatí nešetřit na materiálu.",
      },
      {
        q: "Jak dlouho polep vydrží?",
        a: "Řezaná grafika z kvalitní fólie 5–8 let, tištěný polep s laminací obvykle 3–7 let podle namáhání a garážování. Podrobně to rozebíráme v průvodci.",
      },
      {
        q: "Jak dlouho trvá polepení auta?",
        a: "Logo a nápisy zvládneme za pár hodin, částečný polep za den, celopolep 1–3 dny. Auto potřebujeme čisté a v den aplikace nemyté voskem.",
      },
      {
        q: "Musím mít vlastní návrh?",
        a: "Nemusíte. Stačí logo (ideálně v křivkách) a kontakt — grafiku navrhneme na fotku vašeho auta, takže výsledek uvidíte předem.",
      },
    ],
    guides: [
      { label: "Kolik stojí polep auta", href: "/pruvodce/kolik-stoji-polep-auta" },
      { label: "Jak dlouho vydrží polep auta", href: "/pruvodce/jak-dlouho-vydrzi-polep-auta" },
      { label: "Jak připravit auto před polepem", href: "/pruvodce/jak-pripravit-auto-pred-polepem" },
    ],
    works: ["ps-green", "witwit"],
    finalTitle: "Chcete auto, které dělá reklamu?",
    finalCta: "Poptat polep auta",
  },
  {
    slug: "polepy-dodavek",
    hub: "polepy",
    navLabel: "Polepy dodávek",
    metaTitle: "Polepy dodávek a firemních vozů Opava | Visibly",
    metaDescription:
      "Polepy dodávek a užitkových vozů v Opavě. Velké plochy, které prodávají — návrh, tisk i aplikace vlastními silami. Jednotný styl pro celou flotilu.",
    eyebrow: "Polepy · Dodávky a flotily",
    h1: "Polepy dodávek: velká plocha, velká příležitost.",
    intro:
      "Bok dodávky je billboard, za který neplatíte nájem. Polepíme jeden vůz i celou flotilu — jednotně, čitelně a tak, aby polep vydržel pracovní provoz.",
    heroMedia: { label: "Kruhová fotografie · polep dodávky", variant: "circle" },
    split: {
      title: "Dodávka pracuje, i když stojí.",
      text: "Na stavbě, před domem klienta, v koloně. Dobrý polep dodávky říká za vás, kdo jste, co děláte a jak se vám dovolat — čitelně z dvaceti metrů.",
      media: { label: "Detail · boční plocha dodávky", variant: "circle" },
    },
    proof: [
      { title: "Návrh na konkrétní vůz", text: "Grafika počítá s lištami, výztuhami a dveřmi." },
      { title: "Fólie do provozu", text: "Materiály, které snesou myčku i pracovní nasazení." },
      { title: "Flotila v jednom stylu", text: "Různé modely vozů, jeden vizuální systém." },
    ],
    variantsTitle: "Co polepujeme?",
    variants: [
      { title: "Jednu dodávku", text: "Od loga s kontaktem po celopolep boků a zádi.", href: "/kontakt#poptavka", cta: "Poptat polep dodávky" },
      { title: "Celou flotilu", text: "Jednotný design pro všechny vozy, postupná realizace.", href: "/kontakt#poptavka", cta: "Probrat flotilu" },
      { title: "Osobní auto", text: "Polepy osobních vozů mají vlastní stránku.", href: "/polepy/polepy-aut", cta: "Projít polepy aut" },
      { title: "Jen řezané logo", text: "Nejrychlejší cesta k označenému vozu.", href: "/polepy/rezana-grafika", cta: "Projít řezanou grafiku" },
    ],
    band: {
      title: "Nevíte, jaký rozsah zvolit?",
      text: "Pošlete fotku dodávky. Navrhneme rozsah, který dává smysl pro váš rozpočet i viditelnost.",
      cta: "Poslat fotku dodávky",
      href: "/kontakt#poptavka",
    },
    process: {
      title: "Od fotky vozu po flotilu v ulicích.",
      steps: [
        { title: "Zadání", text: "Fotky vozu, logo, co má polep sdělit." },
        { title: "Návrh", text: "Vizualizace na váš model dodávky." },
        { title: "Výroba", text: "Tisk, laminace, řez — vše u nás." },
        { title: "Aplikace", text: "Vůz po vozu, ať flotila nestojí." },
      ],
    },
    faqTitle: "Co je dobré vědět před polepem dodávky",
    faq: [
      {
        q: "Jak dlouho bude dodávka mimo provoz?",
        a: "Částečný polep obvykle jeden den, celopolep 2–3 dny. U flotil plánujeme aplikace postupně, aby vám vozy nechyběly v provozu.",
      },
      {
        q: "Vydrží polep mytí v myčce?",
        a: "Kvalitní fólie s laminací ano — doporučujeme ale bezkontaktní mytí a vyhnout se vysokotlaké trysce přímo na hranách polepu. Praktická pravidla předáme při předání vozu.",
      },
      {
        q: "Máme vozy různých značek. Bude polep jednotný?",
        a: "Ano. Navrhneme systém, který se přizpůsobí různým rozměrům a tvarům vozů, ale zachová jednotnou tvář — barvy, logo i rozmístění informací.",
      },
      {
        q: "Co s polepem při prodeji vozu?",
        a: "Fólii odborně odstraníme. Kvalitní materiál se sundává čistě a lak pod ním bývá v lepším stavu než zbytek vozu.",
      },
      {
        q: "Kolik stojí polep dodávky?",
        a: "Řezané logo s kontaktem od nižších tisíců, výrazný částečný polep od 15–25 tisíc, celopolep výš podle vozu a fólie. Z fotky vozu naceníme přesně a nezávazně.",
      },
    ],
    guides: [
      { label: "Kolik stojí polep auta", href: "/pruvodce/kolik-stoji-polep-auta" },
      { label: "Jak připravit auto před polepem", href: "/pruvodce/jak-pripravit-auto-pred-polepem" },
    ],
    works: ["ps-green"],
    finalTitle: "Ať vaše dodávky vydělávají i cestou.",
    finalCta: "Poptat polep dodávky",
  },
  {
    slug: "polepy-vyloh",
    hub: "polepy",
    navLabel: "Polepy výloh",
    metaTitle: "Polepy výloh Opava — grafika na sklo provozovny | Visibly",
    metaDescription:
      "Polepy výloh v Opavě: řezaná grafika, tištěné fólie, mléčné i pískované efekty. Výloha, která prodává kolemjdoucím — návrh, výroba a čistá aplikace.",
    eyebrow: "Polepy · Výlohy",
    h1: "Výloha, která prodává i zavřená.",
    intro:
      "Kolem vaší výlohy denně projdou stovky lidí. Polepíme ji tak, aby na první pohled řekla, co uvnitř najdou — a proč mají vejít právě k vám.",
    heroMedia: { label: "Kruhová fotografie · polep výlohy", variant: "circle" },
    split: {
      title: "Výloha je vaše největší vizitka v ulici.",
      text: "Dobrý polep výlohy vyvažuje tři věci: viditelnost značky, výhled ven a světlo uvnitř. Proto kombinujeme řezanou grafiku, tištěné fólie i mléčné efekty podle konkrétního skla.",
      media: { label: "Detail · řezaná grafika na skle", variant: "circle" },
    },
    proof: [
      { title: "Návrh na fotku výlohy", text: "Vidíte výsledek na svém skle, ne v katalogu." },
      { title: "Správný typ fólie", text: "Řezaná, tištěná, mléčná — podle účelu a světla." },
      { title: "Aplikace bez bublin", text: "Čistá práce na místě, obvykle mimo otevírací dobu." },
    ],
    variantsTitle: "Co má výloha udělat?",
    variants: [
      { title: "Označit provozovnu", text: "Logo, název a otevírací doba — základ, který nesmí chybět.", href: "/kontakt#poptavka", cta: "Poptat označení" },
      { title: "Prodat aktuální nabídku", text: "Sezónní kampaně a akce s možností snadné výměny.", href: "/kontakt#poptavka", cta: "Probrat kampaň" },
      { title: "Zajistit soukromí", text: "Mléčné a pískované fólie pro kanceláře a služby.", href: "/polepy/interierove-polepy", cta: "Projít interiéry" },
      { title: "Sladit celou provozovnu", text: "Výloha jako součást značení celé provozovny.", href: "/reklama/reklamni-cedule", cta: "Projít označení firmy" },
    ],
    band: {
      title: "Co dát na výlohu?",
      text: "Sepsali jsme průvodce, co na sklo patří — a co výlohu naopak zabije.",
      cta: "Co dát na výlohu",
      href: "/pruvodce/co-dat-na-vylohu-provozovny",
    },
    process: {
      title: "Od fotky výlohy po hotové sklo.",
      steps: [
        { title: "Zadání", text: "Fotka výlohy a co má sdělit." },
        { title: "Návrh", text: "Grafika na míru vašemu sklu a světlu." },
        { title: "Výroba", text: "Tisk a řez fólií u nás." },
        { title: "Aplikace", text: "Na místě, rychle a čistě." },
      ],
    },
    faqTitle: "Co je dobré vědět před polepem výlohy",
    faq: [
      {
        q: "Zatemní polep interiér provozovny?",
        a: "Nemusí. Řezaná grafika zabírá jen plochu písma a loga, tištěné fólie umíme kombinovat s průhlednými partiemi a perforovaná fólie propouští pohled zevnitř ven. Návrh vždy počítá se světlem.",
      },
      {
        q: "Jak dlouho polep výlohy vydrží?",
        a: "Řezaná grafika na skle běžně 5 a více let. Sezónní kampaně lepíme z fólií, které se po akci čistě sundají.",
      },
      {
        q: "Můžu polep měnit podle sezóny?",
        a: "Ano — základní označení (logo, otevírací doba) necháme trvalé a kampaňovou část navrhneme tak, aby se dala rychle a levně obměňovat.",
      },
      {
        q: "Polepíte výlohu i mimo otevírací dobu?",
        a: "Ano, aplikaci běžně plánujeme brzy ráno nebo po zavíračce, aby provoz nebyl omezen.",
      },
      {
        q: "Co potřebujete pro nacenění?",
        a: "Fotku výlohy zvenku, přibližné rozměry skel a co má polep sdělit. Nabídku vrátíme s návrhem typu fólie.",
      },
    ],
    guides: [
      { label: "Co dát na výlohu provozovny", href: "/pruvodce/co-dat-na-vylohu-provozovny" },
      { label: "Jak označit provozovnu", href: "/pruvodce/jak-oznacit-provozovnu" },
    ],
    works: ["reformlab"],
    finalTitle: "Ať vaše výloha zve dovnitř.",
    finalCta: "Poptat polep výlohy",
  },
  {
    slug: "interierove-polepy",
    hub: "polepy",
    navLabel: "Interiérové polepy",
    metaTitle: "Interiérové polepy Opava — stěny, sklo, orientace | Visibly",
    metaDescription:
      "Interiérové polepy v Opavě: grafika na stěny, mléčné fólie na sklo, značení kanceláří a provozoven. Prostor, který mluví vaší značkou.",
    eyebrow: "Polepy · Interiéry",
    h1: "Interiér, který mluví vaší značkou.",
    intro:
      "Stěny, skla, dveře a recepce. Polepy v interiéru dělají z obyčejného prostoru místo, kde je značka vidět — a kde se klienti i tým cítí, že jsou správně.",
    heroMedia: { label: "Kruhová fotografie · grafika na stěně kanceláře", variant: "circle" },
    split: {
      title: "Prostor je médium, které máte zadarmo.",
      text: "Recepce bez značky je jen chodba. Grafika na stěně, hodnoty na skle zasedačky nebo mapa provozu u vstupu — interiér umí pracovat pro firmu každý den.",
      media: { label: "Detail · mléčná fólie na skle zasedačky", variant: "circle" },
    },
    proof: [
      { title: "Materiál podle povrchu", text: "Jiná fólie na sklo, jiná na zeď, jiná na nábytek." },
      { title: "Od návrhu po aplikaci", text: "Návrh, tisk, řez i lepení — jedna parta." },
      { title: "Bez omezení provozu", text: "Aplikace o víkendu nebo po pracovní době." },
    ],
    variantsTitle: "Kterou část interiéru řešíte?",
    variants: [
      { title: "Stěny a recepce", text: "Loga, grafika a nápisy, které dělají první dojem.", href: "/kontakt#poptavka", cta: "Poptat polep stěn" },
      { title: "Skla a příčky", text: "Mléčné fólie pro soukromí i bezpečnostní značení skel.", href: "/kontakt#poptavka", cta: "Poptat fólie na sklo" },
      { title: "Orientace v budově", text: "Kompletní orientační systémy řešíme samostatně.", href: "/reklama/orientacni-systemy", cta: "Projít orientaci" },
      { title: "Výlohu zvenku", text: "Polep výlohy má vlastní pravidla i stránku.", href: "/polepy/polepy-vyloh", cta: "Projít výlohy" },
    ],
    band: {
      title: "Otevíráte novou pobočku?",
      text: "Vybavíme ji od výlohy přes recepci po orientační značení — v jednom stylu a termínu.",
      cta: "Probrat pobočku",
      href: "/kontakt#poptavka",
    },
    process: {
      title: "Od půdorysu po hotový prostor.",
      steps: [
        { title: "Zadání", text: "Fotky prostoru a co v něm má značka dělat." },
        { title: "Návrh", text: "Grafika na fotky vašich stěn a skel." },
        { title: "Výroba", text: "Tisk a řez na materiály pro daný povrch." },
        { title: "Aplikace", text: "Čistě, rychle, mimo váš provoz." },
      ],
    },
    faqTitle: "Co je dobré vědět před polepem interiéru",
    faq: [
      {
        q: "Drží fólie i na strukturované zdi?",
        a: "Na hladké a mírně strukturované zdi ano — používáme fólie určené přímo na stěny. U hrubých omítek doporučíme alternativu, třeba desku s grafikou. Posoudíme z fotky.",
      },
      {
        q: "Jde polep později odstranit bez poškození?",
        a: "Ano, interiérové fólie volíme tak, aby se daly odstranit čistě. V pronájmech je to častý požadavek — počítáme s ním od začátku.",
      },
      {
        q: "Umíte i bezpečnostní značení skel?",
        a: "Ano, pruhy či motivy na prosklené příčky, aby do nich nikdo nenarazil. Umíme je udělat tak, že vypadají jako záměrná grafika, ne jako nutné zlo.",
      },
      {
        q: "Kolik stojí polep interiéru?",
        a: "Od stovek korun za značení dveří po desítky tisíc za grafiku celé recepce. Pošlete fotky prostoru a představu — vrátíme konkrétní nabídku.",
      },
      {
        q: "Poradíte, co do prostoru dát?",
        a: "Rádi. Přijdeme, projdeme prostor a navrhneme, kde grafika dává smysl — a kde je silnější nechat zeď prázdnou.",
      },
    ],
    guides: [{ label: "Jak označit provozovnu", href: "/pruvodce/jak-oznacit-provozovnu" }],
    works: ["reformlab", "linealux"],
    finalTitle: "Ať váš prostor pracuje pro značku.",
    finalCta: "Poptat interiérový polep",
  },
  {
    slug: "rezana-grafika",
    hub: "polepy",
    navLabel: "Řezaná grafika",
    metaTitle: "Řezaná grafika z fólie Opava — loga a nápisy | Visibly",
    metaDescription:
      "Řezaná grafika z fólie v Opavě: loga, nápisy a piktogramy na auta, výlohy, stěny i cedule. Přesný řez na ploteru Roland, dlouhá životnost.",
    eyebrow: "Polepy · Řezaná grafika",
    h1: "Řezaná grafika: čisté logo bez pozadí.",
    intro:
      "Logo, nápis nebo piktogram vyříznutý přesně po obrysu. Žádný rámeček, žádné pozadí — jen vaše značka na skle, autě, stěně nebo ceduli.",
    heroMedia: { label: "Kruhová fotografie · řezané logo na skle", variant: "circle" },
    split: {
      title: "Nejjednodušší řešení bývá nejelegantnější.",
      text: "Řezaná fólie je disciplína přesnosti: ostrý řez, správné předlepení a čistá aplikace. Odmění se vzhledem, který vypadá jako malovaný — a vydrží roky.",
      media: { label: "Detail · ploter Roland při řezu", variant: "circle" },
    },
    proof: [
      { title: "Přesný řez po křivce", text: "Roland CAMM-1 řeže přesně to, co je v datech." },
      { title: "Stovky barev fólií", text: "Matné, lesklé, metalické i speciální povrchy." },
      { title: "Životnost 5–8 let", text: "Kvalitní lité fólie i pro venkovní použití." },
    ],
    variantsTitle: "Kam řezanou grafiku umístíme?",
    variants: [
      { title: "Na auto", text: "Logo a kontakt — nejrychlejší polep vozu.", href: "/polepy/polepy-aut", cta: "Projít polepy aut" },
      { title: "Na výlohu", text: "Název, otevírací doba, piktogramy.", href: "/polepy/polepy-vyloh", cta: "Projít výlohy" },
      { title: "Do interiéru", text: "Loga na stěny, značení dveří a skel.", href: "/polepy/interierove-polepy", cta: "Projít interiéry" },
      { title: "Na ceduli či desku", text: "Řezaná grafika jako součást venkovního značení.", href: "/reklama/reklamni-cedule", cta: "Projít cedule" },
    ],
    band: {
      title: "Máte logo jen v JPG?",
      text: "Nevadí — logo překreslíme do křivek, aby šlo řezat. A příště už budete mít data navždy.",
      cta: "Jaký formát loga poslat",
      href: "/pruvodce/jaky-format-loga-poslat-do-tiskarny",
    },
    process: {
      title: "Od loga po nalepený řez.",
      steps: [
        { title: "Data", text: "Logo v křivkách, nebo ho převedeme." },
        { title: "Fólie", text: "Barva a povrch podle podkladu." },
        { title: "Řez a předlep", text: "Vyřežeme, vylepíme, připravíme k aplikaci." },
        { title: "Aplikace", text: "Nalepíme my, nebo předáme s návodem." },
      ],
    },
    faqTitle: "Co je dobré vědět o řezané grafice",
    faq: [
      {
        q: "Čím se liší řezaná grafika od tištěné samolepky?",
        a: "Řezaná grafika je vyříznutá z jednobarevné fólie — nemá pozadí ani okraje, jen čistý tvar. Tisk zvolíme, když grafika obsahuje přechody nebo fotografie. Často obojí kombinujeme.",
      },
      {
        q: "Zvládnete i drobné texty?",
        a: "Ano, s rozumem — příliš malé písmo se špatně aplikuje a zdálky ho nikdo nepřečte. Minimální velikosti doporučíme podle materiálu a umístění.",
      },
      {
        q: "Můžu si řezanou grafiku nalepit sám?",
        a: "Menší motivy ano — předáme je s aplikační fólií a návodem. Větší plochy a oblé povrchy raději svěřte nám, oprava pokažené aplikace bývá dražší než aplikace samotná.",
      },
      {
        q: "Jaké barvy fólií máte?",
        a: "Standardní paleta má desítky odstínů včetně metalických a matných povrchů. Barvu vybíráme podle loga — a když přesný odstín neexistuje, navrhneme nejbližší, nebo tisk.",
      },
      {
        q: "Kolik řezaná grafika stojí?",
        a: "Od stokorun za nápis na dveře po tisíce za velké logo na fasádu. Cena roste s plochou a složitostí řezu — z dat naceníme na korunu.",
      },
    ],
    guides: [
      { label: "Jaký formát loga poslat do tiskárny", href: "/pruvodce/jaky-format-loga-poslat-do-tiskarny" },
    ],
    works: ["reformlab", "rezani-betonu"],
    finalTitle: "Potřebujete čisté logo na plochu?",
    finalCta: "Poptat řezanou grafiku",
  },
];
