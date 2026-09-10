import type { ServicePage } from "./types";

/** SEO podstránky sekce /reklama — finální copy. */
export const reklamaServices: ServicePage[] = [
  {
    slug: "reklamni-cedule",
    hub: "reklama",
    navLabel: "Reklamní cedule",
    metaTitle: "Reklamní cedule Opava — výroba a montáž | Visibly",
    metaDescription:
      "Výroba reklamních cedulí v Opavě: dibond, PVC, plexi. Návrh, tisk, řez i montáž na fasádu, plot nebo sloupek. Cedule čitelné z místa, odkud se skutečně dívá.",
    eyebrow: "Reklama · Cedule",
    h1: "Reklamní cedule, které ukazují cestu k vám.",
    intro:
      "Na fasádu, plot, sloupek i nad vchod. Vyrobíme ceduli ze správného materiálu, s grafikou čitelnou z ulice — a namontujeme ji tak, aby vydržela.",
    heroMedia: { label: "Kruhová fotografie · cedule na fasádě", variant: "circle" },
    split: {
      title: "Cedule se navrhuje od místa, ne od stolu.",
      text: "Rozhoduje vzdálenost, ze které lidé čtou, světlo v ulici a povrch, na který se kotví. Proto začínáme fotkou místa — a teprve pak řešíme materiál a grafiku.",
      media: { label: "Fotografie · provozovna s cedulí", variant: "circle" },
    },
    proof: [
      { title: "Materiál podle umístění", text: "Dibond na roky venku, PVC na sezónu, plexi na efekt." },
      { title: "Grafika na vzdálenost", text: "Velikost písma počítáme z místa čtení." },
      { title: "Montáž jako součást", text: "Kotvení a instalace patří k zakázce." },
    ],
    variantsTitle: "Jakou ceduli řešíte?",
    variants: [
      { title: "Označení provozovny", text: "Cedule nad vchod a na fasádu — základ viditelnosti.", href: "/kontakt#poptavka", cta: "Poptat ceduli" },
      { title: "Ceduli k silnici", text: "Navigační a naváděcí cedule na plot či sloupek.", href: "/reklama/venkovni-reklama", cta: "Projít venkovní reklamu" },
      { title: "Světelnou variantu", text: "Aby vás bylo vidět i po setmění.", href: "/reklama/svetelna-reklama", cta: "Projít světelnou reklamu" },
      { title: "Plastické logo", text: "3D písmena a loga místo ploché cedule.", href: "/reklama/3d-loga", cta: "Projít 3D loga" },
    ],
    band: {
      title: "Jaký materiál na ceduli?",
      text: "Dibond, PVC, plexi? Sepsali jsme průvodce, ať vybíráte podle místa a životnosti.",
      cta: "Jaký materiál zvolit",
      href: "/pruvodce/jaky-material-na-reklamni-ceduli",
    },
    process: {
      title: "Od fotky místa po namontovanou ceduli.",
      steps: [
        { title: "Místo a cíl", text: "Fotka místa a odkud mají lidé číst." },
        { title: "Návrh", text: "Vizualizace cedule přímo na vaší fasádě." },
        { title: "Výroba", text: "Tisk, řez a kompletace u nás." },
        { title: "Montáž", text: "Ukotvíme, vyrovnáme, uklidíme po sobě." },
      ],
    },
    faqTitle: "Než si necháte vyrobit ceduli",
    faq: [
      {
        q: "Jaký materiál na venkovní ceduli doporučujete?",
        a: "Pro dlouhodobé venkovní použití dibond — hliníkový sendvič, který se nekroutí a vydrží roky. PVC deska je levnější volba na kratší nasazení nebo do závětří. Poradíme podle místa.",
      },
      {
        q: "Zajistíte i montáž cedule?",
        a: "Ano, v Opavě a okolí montujeme vlastními silami včetně kotvení do různých povrchů. U výšek a specifických fasád domluvíme techniku předem.",
      },
      {
        q: "Potřebuji povolení na ceduli?",
        a: "Na vlastní fasádě obvykle ne, ale záleží na velikosti, obci a památkové zóně. Upozorníme, kdy se vyplatí ptát se úřadu, ať cedule nevisí načerno.",
      },
      {
        q: "Navrhnete i grafiku cedule?",
        a: "Ano — a pohlídáme čitelnost. Cedule s deseti informacemi neprodá žádnou; pomůžeme vybrat ty tři, které rozhodují.",
      },
      {
        q: "Kolik reklamní cedule stojí?",
        a: "Menší cedule od nižších tisíců včetně tisku, větší formáty s montáží podle rozsahu. Z fotky místa a rozměru naceníme přesně.",
      },
    ],
    guides: [
      { label: "Jaký materiál na reklamní ceduli", href: "/pruvodce/jaky-material-na-reklamni-ceduli" },
      { label: "Jak označit provozovnu", href: "/pruvodce/jak-oznacit-provozovnu" },
    ],
    works: ["rezani-betonu"],
    finalTitle: "Potřebujete ceduli, která navádí?",
    finalCta: "Poptat ceduli",
  },
  {
    slug: "svetelna-reklama",
    hub: "reklama",
    navLabel: "Světelná reklama",
    metaTitle: "Světelná reklama Opava — výroba a montáž | Visibly",
    metaDescription:
      "Světelná reklama v Opavě: prosvětlená loga, světelné boxy a LED nápisy. Návrh podle místa, úsporný LED provoz, montáž vlastními silami.",
    eyebrow: "Reklama · Světelná",
    h1: "Světelná reklama: ať jste vidět i po setmění.",
    intro:
      "Prosvětlené logo, světelný box nad vchodem nebo LED nápis ve výloze. Polovina dne se odehrává za tmy — světelná reklama pracuje i v ní.",
    heroMedia: { label: "Kruhová fotografie · světelné logo za tmy", variant: "circle" },
    split: {
      title: "Světlo je rozdíl mezi otevřeno a zavřeno.",
      text: "Provozovna, která po setmění zmizí, říká „máme zavřeno“ i když je otevřeno. Světelný prvek dimenzujeme podle okolí — aby zářil, ne oslňoval.",
      media: { label: "Detail · LED podsvit písmen", variant: "circle" },
    },
    proof: [
      { title: "LED s nízkou spotřebou", text: "Moderní zdroje s dlouhou životností a servisem." },
      { title: "Návrh podle okolí", text: "Jas a barva světla ladí s ulicí, ne proti ní." },
      { title: "Výroba i montáž", text: "Elektro připojení řešíme s odborníky." },
    ],
    variantsTitle: "Jaké světlo vaše značka potřebuje?",
    variants: [
      { title: "Prosvětlená 3D písmena", text: "Nejelegantnější varianta — logo svítí samo.", href: "/reklama/3d-loga", cta: "Projít 3D loga" },
      { title: "Světelný box", text: "Klasika nad vchod: oboustranný i jednostranný.", href: "/kontakt#poptavka", cta: "Poptat světelný box" },
      { title: "LED nápis do výlohy", text: "Svítící zpráva přímo ve skle provozovny.", href: "/kontakt#poptavka", cta: "Poptat LED nápis" },
      { title: "Nesvětelnou alternativu", text: "Někdy stačí dobrá cedule a nasvícení.", href: "/reklama/reklamni-cedule", cta: "Projít cedule" },
    ],
    band: {
      title: "Světelná, nebo nesvětelná?",
      text: "Rozdíl v ceně je znatelný — a ne vždy se světlo vyplatí. Sepsali jsme, jak se rozhodnout.",
      cta: "Číst průvodce",
      href: "/pruvodce/svetelna-reklama-nebo-cedule",
    },
    process: {
      title: "Od místa po rozsvícení.",
      steps: [
        { title: "Místo a cíl", text: "Fotka fasády, okolní osvětlení, přívod elektřiny." },
        { title: "Návrh", text: "Vizualizace ve dne i „za tmy“." },
        { title: "Výroba", text: "Konstrukce, LED osazení, testování." },
        { title: "Montáž a zapojení", text: "Instalace včetně elektro připojení." },
      ],
    },
    faqTitle: "Než investujete do světelné reklamy",
    faq: [
      {
        q: "Kolik světelná reklama spotřebuje elektřiny?",
        a: "Díky LED velmi málo — běžný světelný nápis se spotřebou blíží několika žárovkám. Provoz stojí řádově koruny denně a spínat ho může soumrakový senzor či časovač.",
      },
      {
        q: "Jak dlouho LED reklama vydrží?",
        a: "Kvalitní LED moduly desítky tisíc hodin — v praxi mnoho let provozu. Konstrukci navrhujeme tak, aby případná výměna zdrojů byla servisní úkon, ne nová výroba.",
      },
      {
        q: "Potřebuji na světelnou reklamu povolení?",
        a: "Častěji než u nesvětelné — zvlášť v centrech měst a památkových zónách. Poradíme, kdy je potřeba souhlas, a připravíme podklady pro žádost.",
      },
      {
        q: "Co když nemám u vchodu přívod elektřiny?",
        a: "Řešíme běžně — od přívodu po fasádě po variantu nasvícení stávající cedule reflektorem. Elektroinstalaci zajišťujeme s kvalifikovanými elektrikáři.",
      },
      {
        q: "Kolik světelná reklama stojí?",
        a: "Světelné boxy od vyšších jednotek tisíc, prosvětlená 3D písmena podle velikosti od desítek tisíc. Z fotky místa a návrhu rozsahu naceníme konkrétně.",
      },
    ],
    guides: [
      { label: "Světelná reklama nebo cedule", href: "/pruvodce/svetelna-reklama-nebo-cedule" },
      { label: "Jak označit provozovnu", href: "/pruvodce/jak-oznacit-provozovnu" },
    ],
    works: ["linealux"],
    finalTitle: "Ať vás najdou i po setmění.",
    finalCta: "Poptat světelnou reklamu",
  },
  {
    slug: "3d-loga",
    hub: "reklama",
    navLabel: "3D loga",
    metaTitle: "3D loga a plastická písmena Opava | Visibly",
    metaDescription:
      "3D loga a plastická písmena na fasády i do interiérů. Frézované a řezané nápisy, s podsvitem i bez, návrh, výroba a montáž z Opavy.",
    eyebrow: "Reklama · 3D loga",
    h1: "3D logo: značka, která vystoupí ze zdi.",
    intro:
      "Plastická písmena na fasádu, logo na recepci nebo nápis v showroomu. Třetí rozměr dodá značce váhu, kterou plochá cedule nenabídne.",
    heroMedia: { label: "Kruhová fotografie · 3D logo na recepci", variant: "circle" },
    split: {
      title: "Hloubka dělá dojem.",
      text: "3D písmena vrhají stín, mění se se světlem dne a působí hmotně — jako firma, která tu bude i za deset let. Vyrábíme je z plastů, hliníku i s LED podsvitem.",
      media: { label: "Detail · profil plastického písmene", variant: "circle" },
    },
    proof: [
      { title: "Materiál na míru", text: "PVC, plexi, hliník — podle prostředí a stylu značky." },
      { title: "Přesné provedení", text: "Ostré hrany a čistá montáž na distanční podložky." },
      { title: "Volitelný podsvit", text: "LED „halo“ efekt nebo prosvětlená líce písmen." },
    ],
    variantsTitle: "Kde má logo vystoupit?",
    variants: [
      { title: "Na fasádě", text: "Plastická písmena viditelná z ulice, s podsvitem i bez.", href: "/kontakt#poptavka", cta: "Poptat logo na fasádu" },
      { title: "Na recepci", text: "Logo za pultem — pozadí každého prvního dojmu.", href: "/kontakt#poptavka", cta: "Poptat logo na recepci" },
      { title: "V showroomu či prodejně", text: "Značka jako součást interiéru.", href: "/reklama/interierova-reklama", cta: "Projít interiér" },
      { title: "Se světlem", text: "Prosvětlené varianty řešíme u světelné reklamy.", href: "/reklama/svetelna-reklama", cta: "Projít světelnou reklamu" },
    ],
    band: {
      title: "Nemáte logo připravené pro 3D?",
      text: "Zkontrolujeme křivky a doporučíme úpravy, aby písmena držela tvar i pevnost.",
      cta: "Poslat logo k posouzení",
      href: "/kontakt#poptavka",
    },
    process: {
      title: "Od loga po montáž na stěnu.",
      steps: [
        { title: "Podklady", text: "Logo v křivkách a fotka místa." },
        { title: "Návrh", text: "Velikost, materiál, hloubka a kotvení." },
        { title: "Výroba", text: "Řez, frézování, lakování, případně LED." },
        { title: "Montáž", text: "Šablona, přesné kotvení, čisté předání." },
      ],
    },
    faqTitle: "Než si necháte vyrobit 3D logo",
    faq: [
      {
        q: "Z jakého materiálu se 3D písmena vyrábí?",
        a: "Nejčastěji z tvrzeného PVC a plexiskla, u prémiových realizací z hliníku. Volba závisí na velikosti, umístění (interiér vs. fasáda) a tom, zda mají svítit.",
      },
      {
        q: "Jak se 3D logo montuje?",
        a: "Na skryté kotvy podle vrtací šablony — písmena pak vypadají, že se vznáší kousek před stěnou. Montáž provádíme my, včetně zaměření a vyrovnání.",
      },
      {
        q: "Vydrží plastická písmena venku?",
        a: "Ano, materiály i lepené spoje volíme pro UV a povětrnost. Venkovní 3D loga běžně slouží 8–10 a více let.",
      },
      {
        q: "Může 3D logo svítit?",
        a: "Ano — buď prosvětlenou přední stranou, nebo elegantním „halo“ podsvitem, kdy světlo obtéká písmena zezadu. Obojí ukážeme na vizualizaci.",
      },
      {
        q: "Kolik 3D logo stojí?",
        a: "Interiérové logo na recepci od jednotek tisíc, fasádní sestavy podle velikosti a podsvitu od desítek tisíc. Cena vychází z velikosti, materiálu a počtu znaků.",
      },
    ],
    guides: [
      { label: "Jak označit provozovnu", href: "/pruvodce/jak-oznacit-provozovnu" },
      { label: "Jaký formát loga poslat do tiskárny", href: "/pruvodce/jaky-format-loga-poslat-do-tiskarny" },
    ],
    works: ["linealux"],
    finalTitle: "Ať vaše logo vystoupí ze zdi.",
    finalCta: "Poptat 3D logo",
  },
  {
    slug: "venkovni-reklama",
    hub: "reklama",
    navLabel: "Venkovní reklama",
    metaTitle: "Venkovní reklama Opava — od cedule po fasádu | Visibly",
    metaDescription:
      "Venkovní reklama v Opavě a MS kraji: cedule, bannery, áčka, vlajky, polepy a označení provozoven. Návrh podle místa, vlastní výroba, montáž.",
    eyebrow: "Reklama · Venkovní",
    h1: "Venkovní reklama, kterou nikdo nepřehlédne.",
    intro:
      "Ulice je největší mediální prostor, který máte k dispozici. Pomůžeme vám ho obsadit — od áčka před vchodem po kompletní fasádu.",
    heroMedia: { label: "Kruhová fotografie · označená provozovna z ulice", variant: "circle" },
    split: {
      title: "Venku vyhrává čitelnost, ne křik.",
      text: "Kolemjdoucí věnuje reklamě vteřinu, řidič půl. Venkovní reklamu proto skládáme z prvků, které se doplňují: značka na fasádě, navigace k vchodu, nabídka u dveří.",
      media: { label: "Fotografie · áčko a výloha", variant: "circle" },
    },
    proof: [
      { title: "Systém, ne jednotlivosti", text: "Prvky navrhujeme tak, aby spolupracovaly." },
      { title: "Materiály do počasí", text: "Slunce, déšť i vítr — venku není místo pro kompromis." },
      { title: "Výroba a montáž u nás", text: "Od návrhu po ukotvení jedna odpovědnost." },
    ],
    variantsTitle: "Co venku potřebujete vyřešit?",
    variants: [
      { title: "Označit budovu", text: "Cedule, 3D loga a světelné prvky na fasádu.", href: "/reklama/reklamni-cedule", cta: "Projít cedule" },
      { title: "Navést zákazníky", text: "Směrovky, áčka, vlajky a naváděcí systém.", href: "/reklama/orientacni-systemy", cta: "Projít orientaci" },
      { title: "Kampaň na plotě", text: "Bannery a plachty pro akce a nábory.", href: "/tisk/bannery-a-plachty", cta: "Projít bannery" },
      { title: "Pronajmout plochu", text: "Reklamní plochy přímo v Opavě.", href: "/reklamni-plochy-opava", cta: "Reklamní plochy Opava" },
    ],
    band: {
      title: "Nevíte, kde začít?",
      text: "Pošlete fotku provozovny z ulice. Vrátíme návrh, co označit nejdřív a co počká.",
      cta: "Poslat fotku z ulice",
      href: "/kontakt#poptavka",
    },
    process: {
      title: "Od obhlídky po hotovou ulici.",
      steps: [
        { title: "Místo a cíl", text: "Odkud přichází zákazník a co má uvidět." },
        { title: "Návrh systému", text: "Prvky, materiály a rozpočet v souvislostech." },
        { title: "Výroba", text: "Tisk, řez, konstrukce — u nás v Opavě." },
        { title: "Montáž", text: "Instalace a kontrola čitelnosti na místě." },
      ],
    },
    faqTitle: "Než pustíte značku do ulic",
    faq: [
      {
        q: "Co z venkovní reklamy má největší efekt?",
        a: "Pro kamennou provozovnu jednoznačně viditelné označení budovy a navigace ke vchodu. Kampaňové prvky (bannery, áčka) fungují nejlépe, když na trvalé označení navazují.",
      },
      {
        q: "Řešíte i povolení a souhlasy?",
        a: "Poradíme, kdy je potřeba souhlas majitele objektu, obce nebo památkářů, a připravíme vizualizace jako podklad k žádosti.",
      },
      {
        q: "Jak dlouho venkovní reklama vydrží?",
        a: "Trvalé prvky (dibondové cedule, 3D loga) roky až dekádu. Kampaňové materiály volíme levnější s kratší životností — každý prvek podle své role.",
      },
      {
        q: "Umíte sladit venkovní reklamu se stávající identitou?",
        a: "Ano, vycházíme z vašich barev a loga. A pokud identita chybí nebo se rozpadá, navrhneme ji — venkovní reklama je pak poloviční práce.",
      },
      {
        q: "Působíte jen v Opavě?",
        a: "Vyrábíme v Opavě, montujeme po celém Moravskoslezském kraji a po domluvě i dál. Tisk a výrobu zasíláme po celé ČR.",
      },
    ],
    guides: [
      { label: "Jak označit provozovnu", href: "/pruvodce/jak-oznacit-provozovnu" },
      { label: "Jak vybrat reklamní banner", href: "/pruvodce/jak-vybrat-reklamni-banner" },
    ],
    works: ["rezani-betonu"],
    finalTitle: "Ať vás ulice zná jménem.",
    finalCta: "Poptat venkovní reklamu",
  },
  {
    slug: "interierova-reklama",
    hub: "reklama",
    navLabel: "Interiérová reklama",
    metaTitle: "Interiérová reklama Opava — značka v prostoru | Visibly",
    metaDescription:
      "Interiérová reklama v Opavě: loga na recepce, grafika na stěny, navigace a značení prodejen, kanceláří i provozoven. Návrh, výroba, montáž.",
    eyebrow: "Reklama · Interiérová",
    h1: "Interiérová reklama: značka i za dveřmi.",
    intro:
      "Zákazník vešel — a značka by neměla zůstat venku. Recepce, prodejna, čekárna i zasedačka umí pracovat pro důvěru ve vaši firmu.",
    heroMedia: { label: "Kruhová fotografie · logo na stěně recepce", variant: "circle" },
    split: {
      title: "Interiér prodává důvěru.",
      text: "Prostor, kde je značka vidět promyšleně, říká: víme, co děláme. Kombinujeme 3D loga, polepy, tištěnou grafiku i navigaci tak, aby interiér mluvil jedním hlasem.",
      media: { label: "Detail · značení v interiéru", variant: "circle" },
    },
    proof: [
      { title: "Jeden vizuální jazyk", text: "Recepce, dveře i zasedačky v jednom systému." },
      { title: "Materiály do interiéru", text: "Čisté povrchy, které vydrží denní provoz." },
      { title: "Montáž po pracovní době", text: "Neomezíme váš provoz ani klienty." },
    ],
    variantsTitle: "Kterou část interiéru řešíte?",
    variants: [
      { title: "Recepci a vstup", text: "3D logo, grafika a první dojem hned za dveřmi.", href: "/reklama/3d-loga", cta: "Projít 3D loga" },
      { title: "Stěny a skla", text: "Polepy, mléčné fólie a grafika na míru.", href: "/polepy/interierove-polepy", cta: "Projít interiérové polepy" },
      { title: "Navigaci v budově", text: "Piktogramy, směrovky a značení dveří.", href: "/reklama/orientacni-systemy", cta: "Projít orientaci" },
      { title: "Prodejní plochu", text: "POS materiály a podpora prodeje u regálu.", href: "/tisk/pos-materialy", cta: "Projít POS" },
    ],
    band: {
      title: "Stěhujete se do nových prostor?",
      text: "Nejlepší chvíle vyřešit značku v interiéru najednou — návrh, výroba i montáž do termínu otevření.",
      cta: "Probrat nové prostory",
      href: "/kontakt#poptavka",
    },
    process: {
      title: "Od prohlídky po hotový interiér.",
      steps: [
        { title: "Prostor a cíl", text: "Projdeme prostor a cesty lidí v něm." },
        { title: "Návrh", text: "Vizualizace prvků na fotkách interiéru." },
        { title: "Výroba", text: "Tisk, řez a příprava kompletní sady." },
        { title: "Montáž", text: "Instalace mimo provoz, čisté předání." },
      ],
    },
    faqTitle: "Než oblečete interiér do značky",
    faq: [
      {
        q: "Kde v interiéru značka funguje nejvíc?",
        a: "Tam, kam se lidé dívají, když čekají: za recepcí, naproti vstupu, v čekací zóně. Návrh začínáme od cest a pohledů návštěvníka, ne od volných stěn.",
      },
      {
        q: "Umíte pracovat s pronajatými prostory?",
        a: "Ano, volíme řešení, která se dají beze stop odstranit — fólie, závěsné systémy a prvky kotvené do spár. Majitel objektu nepozná, že jste tam byli.",
      },
      {
        q: "Zvládnete návrh i bez architekta?",
        a: "Ano. U menších realizací navrhneme rozmístění sami, u větších rádi spolupracujeme s vaším architektem — grafika pak sedí do konceptu prostoru.",
      },
      {
        q: "Jak dlouho realizace trvá?",
        a: "Menší značení do týdne či dvou, kompletní interiéry podle rozsahu. Montáž samotná obvykle proběhne během jednoho až dvou dnů mimo váš provoz.",
      },
      {
        q: "Co potřebujete pro nabídku?",
        a: "Pár fotek prostoru mobilem a popis, co má interiér říkat. Přesné zaměření uděláme na místě.",
      },
    ],
    guides: [{ label: "Jak označit provozovnu", href: "/pruvodce/jak-oznacit-provozovnu" }],
    works: ["linealux", "reformlab"],
    finalTitle: "Ať interiér mluví za vás.",
    finalCta: "Poptat interiérovou reklamu",
  },
  {
    slug: "orientacni-systemy",
    hub: "reklama",
    navLabel: "Orientační systémy",
    metaTitle: "Orientační systémy a navigace v budovách Opava | Visibly",
    metaDescription:
      "Orientační systémy pro budovy, areály a provozovny. Směrovky, piktogramy, značení dveří a pater — navigace, se kterou se nikdo neztratí. Visibly Opava.",
    eyebrow: "Reklama · Orientační systémy",
    h1: "Orientační systém: ať se u vás nikdo neztratí.",
    intro:
      "Směrovky, čísla dveří, piktogramy a mapy areálu. Dobrá navigace šetří čas návštěvníkům i vašim lidem — a působí profesionálně od prvního kroku.",
    heroMedia: { label: "Kruhová fotografie · směrovky v budově", variant: "circle" },
    split: {
      title: "Nejlepší navigace je ta, které si nevšimnete.",
      text: "Prostě dojdete, kam potřebujete. Orientační systém stavíme od rozhodovacích bodů — míst, kde se člověk zastaví a hledá. Tam patří informace, nikde jinde.",
      media: { label: "Detail · piktogram na dveřích", variant: "circle" },
    },
    proof: [
      { title: "Logika před grafikou", text: "Nejdřív cesty a rozhodovací body, pak design." },
      { title: "Jednotný systém", text: "Písmo, barvy a piktogramy v jednom jazyce." },
      { title: "Snadná údržba", text: "Vyměnitelné jmenovky a doplnitelné prvky." },
    ],
    variantsTitle: "Co má navigace zvládnout?",
    variants: [
      { title: "Budovu s více patry", text: "Značení pater, směrovky a čísla dveří.", href: "/kontakt#poptavka", cta: "Poptat navigaci" },
      { title: "Areál s více objekty", text: "Mapy, venkovní směrovky a značení vjezdů.", href: "/kontakt#poptavka", cta: "Probrat areál" },
      { title: "Provozovnu či ordinaci", text: "Menší systém: dveře, čekárna, zázemí.", href: "/kontakt#poptavka", cta: "Poptat značení" },
      { title: "Navigaci k vchodu", text: "Venkovní navádění řešíme u venkovní reklamy.", href: "/reklama/venkovni-reklama", cta: "Projít venkovní reklamu" },
    ],
    band: {
      title: "Ptají se lidé na recepci pořád na totéž?",
      text: "To je přesně místo, kde chybí navigace. Projdeme budovu a najdeme slabá místa.",
      cta: "Domluvit obhlídku",
      href: "/kontakt#poptavka",
    },
    process: {
      title: "Od půdorysu po poslední jmenovku.",
      steps: [
        { title: "Analýza cest", text: "Kudy lidé chodí a kde se rozhodují." },
        { title: "Návrh systému", text: "Typy prvků, obsah a grafický jazyk." },
        { title: "Výroba", text: "Kompletní sada připravená k instalaci." },
        { title: "Instalace", text: "Montáž po budově podle plánu." },
      ],
    },
    faqTitle: "Než začnete značit budovu",
    faq: [
      {
        q: "Kdy má smysl řešit orientační systém?",
        a: "Jakmile se návštěvníci začnou ptát na cestu — nebo když otevíráte nový prostor. Navigace dodaná při otevření je levnější než dodatečné záplatování cedulkami z tiskárny.",
      },
      {
        q: "Umíte navázat na naši identitu?",
        a: "Ano, systém stavíme z vašich barev a písma. Výsledek pak nepůsobí jako úřední značení, ale jako přirozená součást značky.",
      },
      {
        q: "Co když se jména kanceláří mění?",
        a: "Počítáme s tím — jmenovky navrhujeme vyměnitelné, ať změnu zvládnete vlastními silami během minuty.",
      },
      {
        q: "Řešíte i bezbariérové a bezpečnostní značení?",
        a: "Ano, včetně piktogramů, únikových tras a kontrastu pro slabozraké. Povinné značení umíme začlenit tak, aby ladilo se zbytkem systému.",
      },
      {
        q: "Kolik orientační systém stojí?",
        a: "Menší provozovna se vejde do jednotek tisíc, budovy a areály podle počtu prvků. Po obhlídce dostanete položkový rozpočet.",
      },
    ],
    guides: [{ label: "Jak označit provozovnu", href: "/pruvodce/jak-oznacit-provozovnu" }],
    works: ["reformlab"],
    finalTitle: "Ať k vám trefí napoprvé.",
    finalCta: "Poptat orientační systém",
  },
  {
    slug: "reklamni-textil",
    hub: "reklama",
    navLabel: "Reklamní textil",
    metaTitle: "Potisk textilu Opava — firemní trička a mikiny | Visibly",
    metaDescription:
      "Potisk firemního textilu v Opavě: trička, mikiny a pracovní oblečení s logem. Termolis pro malé i větší série, kvalitní textil, rychlé termíny.",
    eyebrow: "Reklama · Textil",
    h1: "Firemní textil, který tým rád nosí.",
    intro:
      "Trička, mikiny a pracovní oblečení s vaším logem. Potiskneme textil, ve kterém tým vypadá k světu na provozovně, u zákazníka i na firemní akci.",
    heroMedia: {
      label: "Tričko s\u00a0potiskem",
      variant: "circle",
      src: "/images/visibly-service-textil-optimized.jpg",
      alt: "Potištěná trika a\u00a0mikina s\u00a0firemními logy na stole v\u00a0dílně",
    },
    split: {
      title: "Oblečený tým je chodící reklama.",
      text: "Sjednocené oblečení působí profesionálně a buduje sounáležitost. Tiskneme termolisem — technologií, která zvládne malé série, přesnou pozici i sytou barvu.",
      media: { label: "Detail · termolis při potisku", variant: "circle" },
    },
    proof: [
      { title: "Od pár kusů", text: "Termolis nemá minimální náklad — potiskneme i 5 triček." },
      { title: "Kvalitní textil", text: "Střihy a gramáže, které vydrží praní i práci." },
      { title: "Přesná pozice", text: "Logo tam, kde má být — na hrudi, zádech i rukávu." },
    ],
    feature: {
      id: "katalog",
      eyebrow: "Online katalog · MALFINI®",
      title: "Vyberte střih a barvu online.",
      text:
        "Trička, mikiny, polokošile i pracovní oblečení — všechno, co umíme potisknout, na jednom místě. Vy si vyberete střih a barvu, my doporučíme technologii potisku a naceníme.",
      points: [
        "390+ modelů",
        "Filtr podle typu, značky, barvy i ceny",
        "Velikosti a dostupnost u každého kusu",
      ],
      cta: { label: "Otevřít katalog", href: "/reklama/reklamni-textil/katalog-malfini" },
      secondary: { label: "Vím, co chci — rovnou poptat", href: "/kontakt#poptavka" },
      badge: "Otevřít katalog · 390+ modelů · ",
      scrollLabel: "Prohlédnout katalog",
      note:
        "Sortiment, fotografie i ceny jsou z katalogu značky MALFINI®, se kterou dlouhodobě pracujeme. Potisk, kalkulaci a předání zajišťuje Visibly.",
      media: {
        label: "Tričko z katalogu",
        variant: "circle",
        src: "https://onlinecatalog.malfini.com/image/product/819/819_96_C~w900.jpg",
        alt: "Tričko ze sortimentu MALFINI k potisku",
        blend: true,
      },
    },
    variantsTitle: "Pro koho textil chystáte?",
    variantsText:
      "Podle nasazení se liší střih, gramáž i způsob potisku. Napište, kde se bude textil nosit — doporučíme, co vydrží praní i provoz.",
    variants: [
      { title: "Pro tým na provozovně", text: "Trička a polokošile pro každodenní nošení.", href: "/kontakt#poptavka", cta: "Poptat trička" },
      { title: "Pro řemeslníky v terénu", text: "Pracovní oblečení, které vydrží zátěž.", href: "/kontakt#poptavka", cta: "Poptat pracovní textil" },
      { title: "Na akci či event", text: "Rychlá série pro jednorázovou příležitost.", href: "/kontakt#poptavka", cta: "Stihnout akci" },
      { title: "Jako dárek klientům", text: "Merch a reklamní předměty k tomu.", href: "/reklama/reklamni-predmety", cta: "Projít předměty" },
    ],
    band: {
      title: "Jak vybrat potisk textilu?",
      text: "Technologie, materiály, životnost — sepsali jsme průvodce, ať vybíráte s přehledem.",
      cta: "Číst průvodce",
      href: "/pruvodce/jak-vybrat-potisk-textilu-pro-firmu",
    },
    process: {
      title: "Od loga po oblečený tým.",
      steps: [
        { title: "Zadání", text: "Počty, velikosti a kde bude logo." },
        { title: "Výběr textilu", text: "Vzorky střihů a materiálů k osahání." },
        { title: "Potisk", text: "Termolis u nás v Opavě." },
        { title: "Předání", text: "Roztříděné podle velikostí, připravené k rozdání." },
      ],
    },
    faqTitle: "Než objednáte firemní textil",
    faq: [
      {
        q: "Jaký je minimální počet kusů?",
        a: "Žádný pevný — termolisem potiskneme i jednotky kusů. Právě proto je ideální pro menší firmy a doplňování velikostí u stávajících týmů.",
      },
      {
        q: "Vydrží potisk praní?",
        a: "Ano, kvalitní nažehlovací fólie vydrží desítky pracích cyklů při dodržení péče (praní naruby, nižší teplota). Zásady předáme s hotovou zakázkou.",
      },
      {
        q: "Můžu si vybrat vlastní značku textilu?",
        a: "Ano — buď vybereme z osvědčených řad, nebo potiskneme textil, který dodáte. U dodaného textilu jen předem ověříme vhodnost materiálu.",
      },
      {
        q: "Umíte i výšivku?",
        a: "Pro zakázky, kde dává výšivka smysl, ji zajistíme ve spolupráci s ověřeným partnerem — a pohlídáme, aby výsledek ladil s potiskem ostatních kusů.",
      },
      {
        q: "Kolik stojí potištěné tričko?",
        a: "Podle textilu a velikosti potisku — orientačně od nižších stovek korun za kus včetně trika. S počtem kusů cena klesá. Napište počty, vrátíme kalkulaci.",
      },
    ],
    guides: [{ label: "Jak vybrat potisk textilu pro firmu", href: "/pruvodce/jak-vybrat-potisk-textilu-pro-firmu" }],
    works: ["ps-green"],
    finalTitle: "Oblečte tým do vlastních barev.",
    finalCta: "Poptat potisk textilu",
  },
  {
    slug: "reklamni-predmety",
    hub: "reklama",
    navLabel: "Reklamní předměty",
    metaTitle: "Potisk reklamních předmětů Opava — vlastní výroba | Visibly",
    metaDescription:
      "Potisk reklamních předmětů v Opavě na vlastní UV tiskárně. Hrnky, lahve, dřevo, sklo i kov — už od jednoho kusu, i na tmavé a průhledné povrchy. Předměty umíme i dodat.",
    eyebrow: "Reklama · Předměty",
    h1: "Reklamní předměty potiskujeme u sebe. Od jednoho kusu.",
    intro:
      "Hrnek, ze kterého se pije každé ráno, dělá značce víc než tisíc letáků. Předměty teď potiskujeme přímo v Opavě na vlastní UV tiskárně — a nečekáme, až jich nasbíráte padesát.",
    heroMedia: { label: "Kruhová fotografie · reklamní předměty s logem", variant: "circle" },
    split: {
      title: "Kritérium je jediné: zůstane to na stole?",
      text: "Předmět, který skončí v šuplíku, jsou vyhozené peníze. Proto vybíráme věci, které se používají — a protože potisk děláme sami, můžeme nejdřív udělat jediný kus a podívat se, jestli na tom stole obstojí.",
      media: { label: "Detail · potisk hrnku", variant: "circle" },
    },
    proof: [
      { title: "Vlastní UV tiskárna", text: "Potisk děláme u sebe v Opavě, ne přes dodavatele." },
      { title: "Už od jednoho kusu", text: "Bez síta a bez formy. Minimální odběr neexistuje." },
      { title: "I na tmavé a průhledné", text: "Krycí bílá pod barvou, takže logo drží i na skle." },
    ],
    variantsTitle: "Co potřebujete potisknout?",
    variantsText: "Ať už předměty máte, nebo je teprve vybíráte — obojí umíme.",
    variants: [
      { title: "Vlastní předměty", text: "Přineste své kusy, potiskneme je u nás. I jeden.", href: "/kontakt#poptavka", cta: "Poslat fotku předmětu" },
      { title: "Dárky pro klienty", text: "Hodnotnější věci, kde se vyplatí i malá série.", href: "/kontakt#poptavka", cta: "Poptat dárky" },
      { title: "Rozdávačky na akce", text: "Propisky, bloky, tašky — velké série za dobré ceny.", href: "/kontakt#poptavka", cta: "Poptat na akci" },
      { title: "Merch pro fanoušky", text: "Samolepky, placky a potisk oblečení.", href: "/reklama/reklamni-textil", cta: "Projít textil" },
    ],
    band: {
      title: "Nevíte, jestli to na váš předmět půjde?",
      text: "Pošlete jeden kus na zkoušku. Vzorek uděláme dřív, než se pustíme do série — vyjde to levněji než reklamace.",
      cta: "Projít UV tisk na předměty",
      href: "/technologie/uv-tisk-na-predmety",
    },
    process: {
      title: "Od nápadu po krabici na stole.",
      steps: [
        { title: "Zadání", text: "Příležitost, počty a rozpočet na kus." },
        { title: "Výběr nebo vaše kusy", text: "Předměty doporučíme a dodáme, nebo potiskneme ty vaše." },
        { title: "Vzorek", text: "Na povrchu, který neznáme, tiskneme zkoušku dřív než sérii." },
        { title: "Potisk a předání", text: "UV inkoust tvrdne hned, zboží jde rovnou zabalit." },
      ],
    },
    faqTitle: "Než objednáte reklamní předměty",
    faq: [
      {
        q: "Jaké jsou minimální odběry?",
        a: "U potisku, který děláme sami, žádné — vytiskneme i jediný kus. Minimum má jen zboží, které nakupujeme: hrnky a lahve po desítkách, speciality podle dodavatele. Řekneme předem, ať se rozhodujete s čísly na stole.",
      },
      {
        q: "Můžu přinést vlastní předměty k potisku?",
        a: "Můžete a je to běžné. Řekněte počet kusů a jaký mají povrch, ať víme, jestli potřebují primer. Na materiálu, který jsme ještě neměli v ruce, uděláme napřed vzorek.",
      },
      {
        q: "Potisknete i tmavý nebo skleněný předmět?",
        a: "Ano. Tiskárna má krycí bílou, která jde pod barvu, takže logo drží i na černém pouzdře a na průhledném skle. Bez ní by se barvy do tmavého povrchu ztratily.",
      },
      {
        q: "Jaké reklamní předměty fungují nejlépe?",
        a: "Ty, které se používají denně: kvalitní propisky, hrnky, lahve, tašky. U dárků pro klienty rozhoduje užitečnost a zpracování — raději méně kusů, ale takových, co dělají radost.",
      },
      {
        q: "V jakém formátu dodat logo?",
        a: "Ideálně v křivkách (PDF, AI, SVG). Pokud máte jen obrázek, logo pro potisk připravíme — jednou, a pak už ho máte navždy.",
      },
      {
        q: "Kdy mám objednat vánoční dárky?",
        a: "Ideálně v říjnu. Konec roku je ve výrobě předmětů nejvytíženější období a včasná objednávka znamená lepší výběr i ceny. Potisk vlastních kusů zvládneme i na poslední chvíli, nákup zboží ale ne.",
      },
    ],
    guides: [{ label: "Jaký formát loga poslat do tiskárny", href: "/pruvodce/jaky-format-loga-poslat-do-tiskarny" }],
    works: ["ps-green"],
    finalTitle: "Dejte značku lidem do ruky.",
    finalCta: "Poptat reklamní předměty",
  },
];
