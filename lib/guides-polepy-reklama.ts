import type { Guide } from "./types";

/** Články průvodce: polepy, reklama a textil. Slugy zachovány z původního webu. */
export const guidesPolepyReklama: Guide[] = [
  {
    slug: "kolik-stoji-polep-auta",
    category: "Polepy",
    title: "Kolik stojí polep auta",
    metaTitle: "Kolik stojí polep auta — ceny a co je ovlivňuje | Visibly",
    metaDescription:
      "Kolik stojí polep auta? Orientační ceny od loga na dveře po celopolep a hlavně: co cenu skutečně ovlivňuje. Rozsah, fólie, tvar karoserie a příprava.",
    excerpt: "Orientační ceny od loga na dveřích po celopolep — a co cenu skutečně ovlivňuje.",
    featured: true,
    body: [
      {
        p: "Otázka číslo jedna — a odpověď „to záleží“ nikoho neuspokojí. Tak konkrétně: polep auta pořídíte od pár tisíc za logo s kontaktem po vyšší desítky tisíc za celopolep dodávky prémiovou fólií. Kde přesně skončíte vy, určují čtyři věci.",
      },
      { h2: "1. Rozsah polepu" },
      {
        table: {
          head: ["Rozsah", "Orientační cena"],
          rows: [
            ["Logo + kontakt (dveře, záď)", "od 3 000 Kč"],
            ["Částečný polep (boky, záď, kapota)", "10 000 – 25 000 Kč"],
            ["Celopolep osobního vozu", "od 30 000 Kč"],
            ["Celopolep dodávky", "od 40 000 Kč"],
          ],
        },
      },
      {
        p: "Ceny jsou orientační včetně aplikace; návrh grafiky se liší podle složitosti. Nejlepší poměr viditelnost/cena má obvykle výrazný částečný polep — proto ho doporučujeme nejčastěji.",
      },
      { h2: "2. Typ fólie" },
      {
        p: "Kalandrované fólie jsou levnější a stačí na rovné plochy s kratší životností. Lité fólie se přizpůsobí prolisům, drží roky a bez problémů se sundávají — na auta je standardně doporučujeme. Rozdíl v ceně materiálu se vrátí v životnosti.",
      },
      { h2: "3. Tvar karoserie" },
      {
        p: "Rovný bok dodávky je rychlá práce. Prolisy, kliky, zrcátka a nárazníky znamenají hodiny práce navíc — proto může být polep menšího, ale členitého vozu dražší než polep většího rovného.",
      },
      { h2: "4. Stav a příprava vozu" },
      {
        p: "Fólie drží jen na čistém, odmaštěném laku bez vosku. Zbytky starých polepů, opravované laky nebo koroze práci prodlužují či komplikují — počítejte s tím v ceně i termínu. Jak vůz připravit, popisujeme v samostatném průvodci.",
      },
      {
        tip: {
          title: "Přesnou cenu řekneme z fotky",
          text: "Pošlete 2–3 fotky vozu, logo a představu o rozsahu. Vrátíme konkrétní nabídku s návrhem — nezávazně a obvykle do dvou pracovních dnů.",
        },
      },
    ],
    service: { label: "Polepy aut", href: "/polepy/polepy-aut" },
    related: [
      { label: "Jak dlouho vydrží polep auta", href: "/pruvodce/jak-dlouho-vydrzi-polep-auta" },
      { label: "Jak připravit auto před polepem", href: "/pruvodce/jak-pripravit-auto-pred-polepem" },
    ],
  },
  {
    slug: "jak-dlouho-vydrzi-polep-auta",
    category: "Polepy",
    title: "Jak dlouho vydrží polep auta",
    metaTitle: "Jak dlouho vydrží polep auta — životnost fólií | Visibly",
    metaDescription:
      "Životnost polepu auta: 3–8 let podle typu fólie, laminace a péče. Co polep ničí, jak o něj pečovat a kdy je čas na výměnu.",
    excerpt: "3–8 let podle fólie a péče. Co polep ničí a jak mu prodloužit život.",
    body: [
      {
        p: "Krátká odpověď: kvalitní polep s laminací vydrží 5–8 let, levné řešení 2–3 roky. Dlouhá odpověď je zajímavější, protože životnost máte z velké části ve svých rukou.",
      },
      { h2: "Co životnost určuje" },
      {
        ul: [
          "Typ fólie — lité fólie stárnou pomaleji než kalandrované a nekroutí se na prolisech.",
          "Laminace — ochranná vrstva proti UV, mikropoškrábání z mytí a chemii. U tištěných polepů nutnost.",
          "Garážování — auto spící venku na slunci stárne rychleji, polep s ním.",
          "Strany světové — jižní bok vozu vybledne dřív než severní. Fyzika, nic osobního.",
        ],
      },
      { h2: "Co polep zabíjí" },
      {
        ol: [
          "Vysokotlaká tryska nastříkaná zblízka na hranu polepu — nejčastější příčina odlepených rohů.",
          "Automyčky s tvrdými kartáči — mikropoškrábání, které matní barvy.",
          "Agresivní chemie a rozpouštědla.",
          "Mechanické poškození — škrábance klíči, větvemi, nákladem.",
        ],
      },
      { h2: "Péče, která prodlouží život" },
      {
        p: "Ruční mytí nebo bezkontaktní myčka s odstupem trysky, žádný vosk přes tištěnou grafiku a občasná kontrola hran. Drobné odlepení rohu umíme opravit za pár minut — přijedete, přelepíme, jedete.",
      },
      { h2: "Kdy je čas na výměnu" },
      {
        p: "Vybledlé barvy, popraskaná fólie nebo změna kontaktů. Dobrá zpráva: kvalitní fólie se sundává čistě a lak pod ní bývá zachovalejší než zbytek vozu. Výměna polepu je proto i příležitost k rebrandu bez rizika.",
      },
      {
        tip: {
          title: "Nejste si jistí stavem polepu?",
          text: "Zastavte se u nás v Opavě — hrany a stav fólie posoudíme na počkání a řekneme, jestli má smysl opravovat, nebo plánovat výměnu.",
        },
      },
    ],
    service: { label: "Polepy aut", href: "/polepy/polepy-aut" },
    related: [
      { label: "Kolik stojí polep auta", href: "/pruvodce/kolik-stoji-polep-auta" },
      { label: "Matná nebo lesklá laminace", href: "/pruvodce/matna-nebo-leskla-laminace" },
    ],
  },
  {
    slug: "jak-pripravit-auto-pred-polepem",
    category: "Polepy",
    title: "Jak připravit auto před polepem",
    metaTitle: "Jak připravit auto před polepem — checklist | Visibly",
    metaDescription:
      "Checklist přípravy auta na polep: mytí bez vosku, čisté hrany, suchý vůz a co nahlásit předem. Dobře připravené auto = rychlejší aplikace a delší životnost.",
    excerpt: "Mytí bez vosku, suchý vůz, čisté hrany — checklist, který zrychlí aplikaci.",
    body: [
      {
        p: "Fólie je náročná spolubydlící: drží jen na dokonale čistém a odmaštěném laku. Deset minut čtení tohoto checklistu ušetří hodinu práce při aplikaci — a prodlouží život celému polepu.",
      },
      { h2: "Den až dva předem" },
      {
        ul: [
          "Umyjte auto — ideálně ručně nebo bezkontaktně, bez vosku a leštěnek. Program „s voskem“ je před polepem zakázané slovo.",
          "Vynechte konzervace a tekuté stěrky — vytvářejí film, na kterém fólie nedrží.",
          "Nechte auto vyschnout, hlavně lišty, spáry a gumy — voda z nich vytéká ještě hodiny.",
        ],
      },
      { h2: "Co nahlásit předem" },
      {
        ol: [
          "Opravované nebo přelakované díly — čerstvý lak potřebuje vytvrdnout, jinak fólii nesnese.",
          "Zbytky starého polepu — odstranění je práce navíc, ale zvládneme ji.",
          "Korozi či odloupaný lak — fólie na nich nedrží a při sundání může lak vzít s sebou.",
          "Nedávné mytí s voskem — raději přijeďte o den později, než aplikovat na vosk.",
        ],
      },
      { h2: "V den aplikace" },
      {
        p: "Přijeďte s čistým suchým vozem, vyklizeným prostorem kolem polepovaných ploch (nosiče, reklamní magnety, samolepky dolů) a s trochou časové rezervy. Aplikujeme v temperované dílně — počasí venku roli nehraje.",
      },
      { h2: "Po aplikaci: prvních 48 hodin" },
      {
        ul: [
          "Nemýt vůz minimálně týden, ať lepidlo dosedne.",
          "Vyhnout se vysokotlakému mytí hran minimálně měsíc.",
          "Drobné bublinky? Nemačkat — většina zmizí sama, zbytek doladíme my.",
        ],
      },
      {
        tip: {
          title: "Nestíháte přípravu?",
          text: "Domluvíme mytí před aplikací u nás. Auto převezmeme, připravíme a vrátíme polepené — vy řešíte jen předání klíčů.",
        },
      },
    ],
    service: { label: "Polepy aut", href: "/polepy/polepy-aut" },
    related: [
      { label: "Kolik stojí polep auta", href: "/pruvodce/kolik-stoji-polep-auta" },
      { label: "Jak dlouho vydrží polep auta", href: "/pruvodce/jak-dlouho-vydrzi-polep-auta" },
    ],
  },
  {
    slug: "co-dat-na-vylohu-provozovny",
    category: "Polepy",
    title: "Co dát na výlohu provozovny",
    metaTitle: "Co dát na výlohu provozovny — a co na ni nepatří | Visibly",
    metaDescription:
      "Co patří na výlohu: název, co děláte, otevírací doba, kontakt. Co výlohu zabíjí: přeplnění a vybledlé plakáty. Praktický průvodce polepem výlohy.",
    excerpt: "Co na sklo patří, co ho zabíjí a jak výlohu rozdělit na trvalé a sezónní vrstvy.",
    body: [
      {
        p: "Výloha má jedinou práci: aby kolemjdoucí za dvě vteřiny pochopil, co uvnitř najde, a dostal důvod vejít. Většina výloh selhává ve dvou extrémech — prázdné sklo bez informací, nebo koláž deseti vybledlých plakátů.",
      },
      { h2: "Základní vrstva: co na skle nesmí chybět" },
      {
        ul: [
          "Název a logo — čitelné z protějšího chodníku.",
          "Co děláte — jedním souslovím. „Kadeřnictví“, ne „péče o vaši krásu“.",
          "Otevírací doba — nejhledanější informace na dveřích vůbec.",
          "Kontakt — telefon a web pro ty, kdo jdou kolem po zavíračce.",
        ],
      },
      { h2: "Druhá vrstva: nabídka a sezóna" },
      {
        p: "Akce, novinky a sezónní komunikace patří do vyměnitelné vrstvy — tištěné fólie nebo plakátové kapsy, které obměníte bez škrabání celého skla. Zlaté pravidlo: jedna kampaň v jednu chvíli. Tři akce vedle sebe se navzájem vyruší.",
      },
      { h2: "Co výlohu zabíjí" },
      {
        ol: [
          "Vybledlé plakáty — nic neříká „tady to umírá“ hlasitěji.",
          "Přeplnění — když je sdělení pět, kolemjdoucí nepřečte žádné.",
          "Papíry lepené izolepou zevnitř — vizitka, kterou si nezasloužíte.",
          "Zalepené celé sklo — provozovna bez výhledu působí zavřeně a temně.",
        ],
      },
      { h2: "Světlo a soukromí" },
      {
        p: "Potřebujete-li clonit (ordinace, kancelář, služby), sáhněte po mléčné fólii — propustí světlo, zastaví pohledy a působí čistě. Perforovaná fólie zase umožní potisknout celé sklo a zevnitř vidět ven.",
      },
      {
        tip: {
          title: "Pošlete fotku výlohy",
          text: "Vyfoťte sklo z chodníku a pošlete nám ji. Vrátíme návrh rozvržení — co na sklo, co do kapes a co vynechat — i s cenou realizace.",
        },
      },
    ],
    service: { label: "Polepy výloh", href: "/polepy/polepy-vyloh" },
    related: [
      { label: "Jak označit provozovnu", href: "/pruvodce/jak-oznacit-provozovnu" },
      { label: "Interiérové polepy", href: "/polepy/interierove-polepy" },
    ],
  },
  {
    slug: "jak-oznacit-provozovnu",
    category: "Reklama",
    title: "Jak označit provozovnu, aby byla vidět",
    metaTitle: "Jak označit provozovnu, aby byla vidět | Visibly",
    metaDescription:
      "Jak označit provozovnu: cedule, výloha, navigace ke vchodu a světlo. V jakém pořadí investovat a jaké chyby dělají provozovny nejčastěji.",
    excerpt: "Cedule, výloha, navádění a světlo — v jakém pořadí investovat a proč.",
    featured: true,
    body: [
      {
        p: "Zákazník, který vás nenajde, je zákazník konkurence. Označení provozovny přitom není o jedné velké ceduli — je to řetěz drobných rozhodnutí podél cesty zákazníka. Projděme ho v pořadí, v jakém se vyplatí investovat.",
      },
      { h2: "1. Hlavní označení: kdo tu je" },
      {
        p: "Cedule nebo 3D logo na fasádě, čitelné z hlavního směru příchodu — což nemusí být kolmo od vchodu! Postavte se tam, odkud lidé reálně přicházejí, a zkontrolujte, co vidí. Časté překvapení: z boční ulice není vidět nic.",
      },
      { h2: "2. Výloha a vchod: co tu najdu" },
      {
        p: "Výloha doplní hlavní označení o nabídku a otevírací dobu. Dveře jasně označte — návštěvník nesmí váhat, kudy se vchází. Detailně to rozebíráme v průvodci o výlohách.",
      },
      { h2: "3. Navádění: kudy k vám" },
      {
        p: "Sídlíte ve dvoře, patře nebo pasáži? Pak je navádění důležitější než hlavní cedule: směrovka u vjezdu, značka na zvoncích, šipka na schodišti. Každý rozhodovací bod cesty potřebuje jednu jasnou informaci.",
      },
      { h2: "4. Světlo: večer a zima" },
      {
        p: "Od října do března je po zavírací době tma. Světelný prvek — box, prosvětlená písmena nebo aspoň nasvícená cedule — prodlouží viditelnost o půl dne. Kdy se vyplatí, řešíme v samostatném průvodci.",
      },
      { h2: "Nejčastější chyby" },
      {
        ul: [
          "Písmo zvolené podle vkusu, ne podle vzdálenosti čtení.",
          "Cedule kolmo k fasádě chybí — z chodníku podél zdi vás nikdo nevidí.",
          "Deset informací na jedné ceduli.",
          "Označení se řeší až po otevření, z rozpočtu „co zbylo“.",
        ],
      },
      {
        tip: {
          title: "Obhlídka zdarma v Opavě a okolí",
          text: "Projdeme cestu vašeho zákazníka od parkoviště ke dveřím a navrhneme označení po krocích — od nejdůležitějšího prvku po detaily.",
        },
      },
    ],
    service: { label: "Reklamní cedule", href: "/reklama/reklamni-cedule" },
    related: [
      { label: "Co dát na výlohu provozovny", href: "/pruvodce/co-dat-na-vylohu-provozovny" },
      { label: "Světelná reklama nebo cedule", href: "/pruvodce/svetelna-reklama-nebo-cedule" },
    ],
  },
  {
    slug: "jaky-material-na-reklamni-ceduli",
    category: "Reklama",
    title: "Jaký materiál zvolit na reklamní ceduli",
    metaTitle: "Jaký materiál na reklamní ceduli — dibond, PVC, plexi | Visibly",
    metaDescription:
      "Dibond, PVC deska, plexisklo nebo banner? Srovnání materiálů pro reklamní cedule podle životnosti, umístění a ceny. Vyberte podle místa, ne dojmu.",
    excerpt: "Dibond, PVC, plexi, nebo banner? Srovnání podle životnosti, místa a ceny.",
    body: [
      {
        p: "„Chci ceduli“ může znamenat desítku různých materiálů — a rozdíly nejsou kosmetické. Špatná volba znamená zkroucenou desku po prvním létě nebo zbytečně předraženou výrobu. Tady je přehled bez balastu.",
      },
      { h2: "Dibond: standard pro roky venku" },
      {
        p: "Hliníkový sendvič s plastovým jádrem. Nekroutí se, nerezaví, vypadá prémiově a vydrží venku 10+ let. Pro trvalé označení provozovny je to naše první doporučení — vyšší cena se rozpočítá do let služby.",
      },
      { h2: "PVC deska: ekonomická volba" },
      {
        p: "Lehká pěněná deska, snadná výroba, nižší cena. Ideální do interiéru a na kratší venkovní nasazení (sezóna, stavba, akce). Na jižní fasádě se časem může zvlnit — proto na trvalé venkovní použití doporučujeme spíš dibond.",
      },
      { h2: "Plexisklo: efekt a hloubka" },
      {
        p: "Čiré nebo mléčné, často s distančníky od zdi nebo podsvitem. Působí luxusně — recepce, ordinace, butiky. Venku funguje také, ale za vyšší cenu; vybíráme ho tam, kde má vzhled prioritu.",
      },
      { h2: "Banner: cedule na dobu určitou" },
      {
        p: "Potřebujete-li „ceduli“ na měsíc nebo na plot stavby, netiskněte desku — banner splní stejnou službu za zlomek ceny. Podrobně v průvodci výběrem banneru.",
      },
      {
        table: {
          head: ["Materiál", "Životnost venku", "Kdy zvolit"],
          rows: [
            ["Dibond", "10+ let", "trvalé označení, fasády"],
            ["PVC deska", "2–5 let", "interiér, sezónní použití"],
            ["Plexisklo", "10+ let", "prémiový vzhled, podsvit"],
            ["Banner", "1–3 roky", "dočasné a kampaňové plochy"],
          ],
        },
      },
      {
        tip: {
          title: "Rozhoduje místo, ne katalog",
          text: "Pošlete fotku místa, kam cedule míří. Doporučíme materiál, tloušťku i kotvení — a naceníme rovnou dvě varianty k porovnání.",
        },
      },
    ],
    service: { label: "Reklamní cedule", href: "/reklama/reklamni-cedule" },
    related: [
      { label: "Jak označit provozovnu", href: "/pruvodce/jak-oznacit-provozovnu" },
      { label: "Jak vybrat reklamní banner", href: "/pruvodce/jak-vybrat-reklamni-banner" },
    ],
  },
  {
    slug: "svetelna-reklama-nebo-cedule",
    category: "Reklama",
    title: "Světelná reklama, nebo nesvětelná cedule",
    metaTitle: "Světelná reklama, nebo cedule? Jak se rozhodnout | Visibly",
    metaDescription:
      "Kdy se vyplatí světelná reklama a kdy stačí cedule s nasvícením? Srovnání podle otevírací doby, okolí, rozpočtu a povolení.",
    excerpt: "Kdy se světlo vyplatí, kdy stačí nasvícená cedule a jak rozhodnout podle provozu.",
    body: [
      {
        p: "Světelná reklama stojí násobek obyčejné cedule. Někdy je to nejlepší investice do viditelnosti, jindy vyhozené peníze. Rozhodnutí naštěstí není otázka vkusu, ale tří otázek o vašem provozu.",
      },
      { h2: "Otázka 1: Kdy máte otevřeno?" },
      {
        p: "Provozovny se zavíračkou v pět mají v zimě polovinu otevírací doby po setmění. Restaurace, bary, večerky, fitka a služby s večerní klientelou — pro ně světlo pracuje každý den. Kancelář otevřená 8–16 ho využije minimálně.",
      },
      { h2: "Otázka 2: Jak svítí vaše okolí?" },
      {
        p: "Na tmavé ulici zazáří i menší světelný prvek. Na třídě plné svítících výloh naopak nesvítící cedule zmizí — světlo tu není luxus, ale vstupenka do hry. Projděte si ulici večer a spočítejte, kolik konkurentů svítí.",
      },
      { h2: "Otázka 3: Jaký je rozpočet — včetně provozu?" },
      {
        ul: [
          "Nesvětelná cedule (dibond): nejnižší pořizovací cena, nulový provoz.",
          "Nasvícená cedule reflektorem: střední cesta — světlo za zlomek ceny světelného prvku.",
          "Světelný box: klasika s dobrým poměrem cena/výkon.",
          "Prosvětlená 3D písmena: nejvyšší liga vzhledu i ceny.",
        ],
      },
      {
        p: "Provozní náklady LED jsou dnes zanedbatelné (koruny denně). Skutečný rozdíl je v pořízení a případném povolování — světelná reklama častěji zajímá úřady, zvlášť v památkových zónách.",
      },
      { h2: "Zlatá střední cesta, na kterou se zapomíná" },
      {
        p: "Kvalitní nesvětelná cedule + dobře mířený reflektor. Za výrazně méně peněz získáte 80 % efektu — a kdykoli později můžete upgradovat na prosvětlená písmena, aniž byste měnili koncept označení.",
      },
      {
        tip: {
          title: "Ukážeme vám obě varianty",
          text: "Připravíme vizualizaci vaší fasády se světelnou i nesvětelnou variantou — večer i ve dne — a k tomu ceny. Rozhodnete se s obrázky na stole.",
        },
      },
    ],
    service: { label: "Světelná reklama", href: "/reklama/svetelna-reklama" },
    related: [
      { label: "Jak označit provozovnu", href: "/pruvodce/jak-oznacit-provozovnu" },
      { label: "Jaký materiál na reklamní ceduli", href: "/pruvodce/jaky-material-na-reklamni-ceduli" },
    ],
  },
  {
    slug: "jak-vybrat-potisk-textilu-pro-firmu",
    category: "Textil",
    title: "Jak vybrat potisk textilu pro firmu",
    metaTitle: "Jak vybrat potisk textilu pro firmu | Visibly",
    metaDescription:
      "Termolis, sítotisk, DTF nebo výšivka? Jak vybrat potisk firemního textilu podle počtu kusů, motivu a nasazení — a jaký textil zvolit.",
    excerpt: "Termolis, sítotisk, nebo výšivka? Rozhodněte podle počtu kusů, motivu a nasazení.",
    body: [
      {
        p: "Firemní trička se dají pokazit dvěma způsoby: špatným textilem, který se po třech vypráních zkroutí, a špatnou technologií potisku, která se sloupne. Obojí se dá vybrat správně za pět minut — pojďme na to.",
      },
      { h2: "Technologie podle situace" },
      {
        table: {
          head: ["Technologie", "Nejlepší pro", "Poznámka"],
          rows: [
            ["Termolis (nažehlovací fólie)", "malé série, jména, čísla", "naše hlavní technologie — od 1 kusu"],
            ["DTF tisk", "barevné motivy, střední série", "fotografické motivy bez omezení barev"],
            ["Sítotisk", "velké série (100+)", "nejnižší cena za kus ve velkém"],
            ["Výšivka", "polokošile, čepice, prémiový vzhled", "nejtrvanlivější, cena dle stehů"],
          ],
        },
      },
      {
        p: "Pro většinu menších firem vychází nejlépe termolis nebo DTF: žádné minimální náklady, přesná pozice, snadné doobjednání velikostí. Velké kampaně a stovky kusů posouvají výhodu k sítotisku.",
      },
      { h2: "Textil: nešetřete na gramáži" },
      {
        ul: [
          "Trička na denní nošení: 160–190 g/m², česaná bavlna — drží tvar i barvu.",
          "Pracovní textil: směsové materiály, které vydrží prádelnu.",
          "Nejlevnější trika z e-shopů: po pár praních vytahaná — logo na nich firmu spíš poškodí.",
        ],
      },
      { h2: "Motiv: méně je víc" },
      {
        p: "Logo na prsou (srdce nebo střed), případně větší motiv na zádech — klasika, která funguje. Web a telefon na záda dává smysl u řemesel (reklama v terénu), u „kancelářských“ triček působí lépe čistota.",
      },
      { h2: "Na co se ptát dodavatele" },
      {
        ol: [
          "Vydrží potisk 50 pracích cyklů? Jak o něj pečovat?",
          "Můžu si objednat vzorový kus před celou sérií?",
          "Jak řešíte doobjednávky velikostí za půl roku?",
        ],
      },
      {
        tip: {
          title: "Vzorky střihů máme ve studiu",
          text: "Přijďte si textil osahat — gramáž a střih se z e-shopu poznat nedá. A vzorové tričko s vaším logem uděláme před sérií rádi.",
        },
      },
    ],
    service: { label: "Reklamní textil", href: "/reklama/reklamni-textil" },
    related: [
      { label: "Jaký formát loga poslat do tiskárny", href: "/pruvodce/jaky-format-loga-poslat-do-tiskarny" },
      { label: "Reklamní předměty", href: "/reklama/reklamni-predmety" },
    ],
  },
];
