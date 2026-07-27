import type { ServicePage } from "./types";

/**
 * SEO podstránky sekce /tisk — finální copy.
 * Tón podle wireframu: konverzační, vedený situací zákazníka, ne katalogem.
 */
export const tiskServices: ServicePage[] = [
  {
    slug: "velkoformatovy-tisk",
    hub: "tisk",
    navLabel: "Velkoformátový tisk",
    metaTitle: "Velkoformátový tisk Opava — bannery, fólie, plakáty | Visibly",
    metaDescription:
      "Velkoformátový tisk v Opavě na vlastním stroji Epson SureColor. Bannery, fólie, samolepky i plakáty s kontrolou dat před tiskem. Dodáváme po celém MS kraji.",
    eyebrow: "Tisk · Velkoformát",
    h1: "Velkoformátový tisk, který je vidět z ulice.",
    intro:
      "Bannery, fólie, plakáty i samolepky tiskneme v Opavě na vlastním Epsonu. Materiál doporučíme podle toho, kde má výsledek viset — ne podle ceníku.",
    heroMedia: { label: "Kruhová fotografie · velkoformátový tisk", variant: "circle" },
    split: {
      title: "Velký formát odpouští málo.",
      text: "Co na obrazovce vypadá dobře, může mít na třech metrech rozmazané logo a jinou barvu. Proto data před tiskem kontrolujeme a barevnost hlídáme na kalibrovaném stroji.",
      media: { label: "Video · tisk na Epson SureColor", variant: "circle" },
    },
    proof: [
      { title: "Vlastní stroj Epson SureColor", text: "Tiskneme u sebe v Opavě, ne přes prostředníka." },
      { title: "Kontrola dat před tiskem", text: "Rozlišení, spadávky i barevnost projdou kontrolou." },
      { title: "Materiál podle použití", text: "Interiér, exteriér, měsíc nebo pět let — pokaždé jiná volba." },
    ],
    variantsTitle: "Co potřebujete vytisknout?",
    variantsText: "Velkoformát je široký pojem. Vyberte, co je nejblíž vaší situaci.",
    variants: [
      { title: "Banner nebo plachtu", text: "Na plot, fasádu nebo akci. S oky, tunýlkem i lemem.", href: "/tisk/bannery-a-plachty", cta: "Projít bannery" },
      { title: "Samolepky a fólie", text: "Řezané i tištěné, na výlohu, auto nebo produkt.", href: "/tisk/samolepky-a-folie", cta: "Projít samolepky" },
      { title: "Plakáty", text: "Do výloh, na výstavy i do interiéru. Od jednoho kusu.", href: "/tisk/plakaty", cta: "Projít plakáty" },
      { title: "Billboard nebo citylight", text: "Tisk pro pronajaté plochy v přesných formátech.", href: "/tisk/billboardy-a-citylighty", cta: "Projít billboardy" },
    ],
    band: {
      title: "Nevíte, jaký materiál zvolit?",
      text: "Napište, kde bude tisk viset a jak dlouho má vydržet. Materiál doporučíme my.",
      cta: "Poradit s materiálem",
      href: "/kontakt#poptavka",
    },
    process: {
      title: "Od dat po hotový tisk.",
      steps: [
        { title: "Zadání", text: "Rozměr, místo použití a podklady — stačí orientačně." },
        { title: "Doporučení", text: "Navrhneme materiál, dokončení a cenu." },
        { title: "Kontrola dat", text: "Zkontrolujeme rozlišení, spadávky a barevnost." },
        { title: "Tisk a předání", text: "Vytiskneme, dokončíme a předáme či doručíme." },
      ],
    },
    faqTitle: "Než pošlete velkoformát do výroby",
    faq: [
      {
        q: "Jaké rozlišení musí mít data pro velkoformátový tisk?",
        a: "Méně, než si většina lidí myslí. Na banner pozorovaný z pěti metrů stačí 70–100 DPI ve skutečné velikosti, u pohledových tisků doporučujeme 150 DPI. Data před tiskem vždy kontrolujeme a ozveme se, kdyby rozlišení nestačilo.",
      },
      {
        q: "Co když nemám tisková data?",
        a: "Nevadí. Pošlete logo, fotku nebo jen popis a grafiku připravíme přímo pro tisk — správný formát, spadávky i barevnost. Grafické práce účtujeme transparentně podle rozsahu.",
      },
      {
        q: "Jak rychle umíte vytisknout zakázku?",
        a: "Běžné zakázky tiskneme v řádu dnů. Protože tiskneme u sebe v Opavě, umíme v urgentních případech reagovat i rychleji — napište termín do poptávky a řekneme na rovinu, co je reálné.",
      },
      {
        q: "Tisknete i pro grafiky a agentury z hotových dat?",
        a: "Ano, partnerský tisk je naše běžná praxe. Vy dodáte data, my pohlídáme výrobu a mlčíme o koncovém klientovi. Podrobnosti najdete na stránce Pro agentury.",
      },
      {
        q: "Co potřebujete pro nacenění?",
        a: "Rozměr (stačí přibližný), počet kusů, kde bude tisk umístěný a jak dlouho má vydržet. Cena je pak otázkou jedné odpovědi.",
      },
    ],
    guides: [
      { label: "Jak připravit data pro tisk", href: "/pruvodce/jak-pripravit-data-pro-tisk" },
      { label: "Matná nebo lesklá laminace", href: "/pruvodce/matna-nebo-leskla-laminace" },
    ],
    works: ["rezani-betonu", "ps-green"],
    finalTitle: "Potřebujete velkoformátový tisk?",
    finalCta: "Poptat tisk",
  },
  {
    slug: "bannery-a-plachty",
    hub: "tisk",
    navLabel: "Bannery a plachty",
    metaTitle: "Tisk bannerů a reklamních plachet Opava | Visibly",
    metaDescription:
      "Tisk bannerů a reklamních plachet v Opavě — na plot, fasádu, lešení i akce. Oka, lemy a konfekce podle místa instalace. Vlastní výroba, rychlé termíny.",
    eyebrow: "Tisk · Bannery",
    h1: "Bannery a plachty, které vydrží venku.",
    intro:
      "Na plot, fasádu, lešení nebo sportovní akci. Vytiskneme, olemujeme, doplníme oka — a poradíme, jak banner pověsit, aby vydržel vítr i počasí.",
    heroMedia: { label: "Kruhová fotografie · banner na plotě", variant: "circle" },
    split: {
      title: "Banner je nejrychlejší reklama na světě.",
      text: "Za pár dní visí a dělá práci. Aby ji dělal dobře, musí sedět gramáž materiálu, konfekce i způsob uchycení — jinak se první vichřicí rozloučí.",
      media: { label: "Detail · oko a lem banneru", variant: "circle" },
    },
    proof: [
      { title: "Materiál podle umístění", text: "Plot, fasáda, průvětrná síťovina — pokaždé jiná volba." },
      { title: "Konfekce v ceně úvahy", text: "Oka, lemy, tunýlky. Doporučíme podle instalace." },
      { title: "Tisk u nás v Opavě", text: "Krátké termíny bez prostředníků." },
    ],
    variantsTitle: "Kam banner povede?",
    variants: [
      { title: "Na plot nebo zábradlí", text: "Klasický banner s oky, případně síťovina do větru.", href: "/kontakt#poptavka", cta: "Poptat banner" },
      { title: "Na fasádu nebo lešení", text: "Velké formáty, spojované pásy, odolné materiály.", href: "/kontakt#poptavka", cta: "Probrat zadání" },
      { title: "Na akci či sportoviště", text: "Rychlá výroba, opakované použití, snadná montáž.", href: "/kontakt#poptavka", cta: "Poptat banner" },
      { title: "Ještě nevím — chci poradit", text: "Pošlete fotku místa a rozměr. Navrhneme řešení.", href: "/kontakt#poptavka", cta: "Poslat fotku místa" },
    ],
    band: {
      title: "Nevíte, jak velký banner zvolit?",
      text: "Přečtěte si našeho průvodce výběrem banneru — nebo pošlete fotku místa.",
      cta: "Jak vybrat banner",
      href: "/pruvodce/jak-vybrat-reklamni-banner",
    },
    process: {
      title: "Od rozměru po pověšený banner.",
      steps: [
        { title: "Zadání", text: "Rozměr a fotka místa, kde bude banner viset." },
        { title: "Doporučení", text: "Materiál, konfekce a grafika podle vzdálenosti čtení." },
        { title: "Tisk a konfekce", text: "Tisk, lemy, oka — vše u nás." },
        { title: "Předání", text: "Osobně v Opavě, doručením, případně s montáží." },
      ],
    },
    faqTitle: "Než si objednáte banner",
    faq: [
      {
        q: "Jaký je rozdíl mezi bannerem a síťovinou?",
        a: "Plný banner má sytější barvy a je běžnou volbou na plot či fasádu. Síťovina propouští vítr — hodí se na lešení, zábradlí a všude, kde fouká. Když nám pošlete fotku místa, doporučíme sami.",
      },
      {
        q: "Vydrží banner venku celý rok?",
        a: "Kvalitní bannerovina s dobrým ukotvením vydrží venku roky. Životnost nejvíc zkracuje špatné vypnutí a vítr — proto řešíme konfekci a způsob uchycení už při návrhu.",
      },
      {
        q: "Kolik stojí tisk banneru?",
        a: "Cena se odvíjí od plochy, materiálu a konfekce. Orientačně ji spočítáme z rozměru obratem — pošlete šířku a výšku a do druhého dne máte nabídku.",
      },
      {
        q: "Uděláte i grafiku banneru?",
        a: "Ano. Banner je disciplína čitelnosti — málo slov, velké písmo, jasný kontakt. Grafiku navrhneme tak, aby fungovala na vzdálenost, ze které ji lidé uvidí.",
      },
      {
        q: "Zajistíte i montáž banneru?",
        a: "Podle zakázky ano — v Opavě a okolí banner i pověsíme, případně dodáme úchyty a návod, jak jej vypnout správně.",
      },
    ],
    guides: [
      { label: "Jak vybrat reklamní banner", href: "/pruvodce/jak-vybrat-reklamni-banner" },
      { label: "Jak připravit data pro tisk", href: "/pruvodce/jak-pripravit-data-pro-tisk" },
    ],
    works: ["rezani-betonu"],
    finalTitle: "Potřebujete banner, který vydrží?",
    finalCta: "Poptat banner",
  },
  {
    slug: "samolepky-a-folie",
    hub: "tisk",
    navLabel: "Samolepky a fólie",
    metaTitle: "Tisk samolepek a fólií Opava — řezané i tištěné | Visibly",
    metaDescription:
      "Samolepky a fólie na míru v Opavě. Tištěné i řezané, s laminací pro delší životnost. Na produkty, výlohy, auta i interiér. Vlastní tisk a ploter.",
    eyebrow: "Tisk · Samolepky a fólie",
    h1: "Samolepky a fólie přesně na míru.",
    intro:
      "Od etikety na produkt po fólii na celou výlohu. Tiskneme a řežeme u sebe — takže tvar, barva i odolnost sedí tomu, kam budete lepit.",
    heroMedia: { label: "Kruhová fotografie · archy samolepek", variant: "circle" },
    split: {
      title: "Samolepka je malá plocha s velkou službou.",
      text: "Označí produkt, přelepí starý údaj, polepí auto nebo vyzdobí výlohu. Rozhoduje materiál a laminace — správná kombinace vydrží déšť, slunce i mytí.",
      media: { label: "Detail · řezání fólie na ploteru", variant: "circle" },
    },
    proof: [
      { title: "Tisk i řez u nás", text: "Epson tiskne, Roland řeže. Vše pod jednou střechou." },
      { title: "Libovolný tvar", text: "Řez po obrysu grafiky — logo nemusí končit obdélníkem." },
      { title: "Laminace podle použití", text: "Odolnost proti oděru, UV i vlhkosti." },
    ],
    variantsTitle: "Kam budete lepit?",
    variants: [
      { title: "Na produkty a obaly", text: "Etikety a samolepky v malých i větších sériích.", href: "/kontakt#poptavka", cta: "Poptat samolepky" },
      { title: "Na výlohu nebo sklo", text: "Polep výlohy řešíme jako samostatnou disciplínu.", href: "/polepy/polepy-vyloh", cta: "Projít polepy výloh" },
      { title: "Na auto", text: "Od loga na dveře po polep celého vozu.", href: "/polepy/polepy-aut", cta: "Projít polepy aut" },
      { title: "Na stěny a interiér", text: "Řezaná grafika a fólie do kanceláří i provozoven.", href: "/polepy/interierove-polepy", cta: "Projít interiéry" },
    ],
    band: {
      title: "Potřebujete jen pár kusů?",
      text: "Tiskneme i malé série — od jednoho archu. Cena roste s plochou, ne s výmluvami.",
      cta: "Poptat samolepky",
      href: "/kontakt#poptavka",
    },
    process: {
      title: "Od grafiky po nalepení.",
      steps: [
        { title: "Zadání", text: "Co, kam a v jakém počtu budete lepit." },
        { title: "Materiál a laminace", text: "Doporučíme fólii podle povrchu a prostředí." },
        { title: "Tisk a řez", text: "Vytiskneme, zalaminujeme a vyřežeme do tvaru." },
        { title: "Předání", text: "Připravené k lepení, s aplikační fólií, kde dává smysl." },
      ],
    },
    faqTitle: "Než si objednáte samolepky",
    faq: [
      {
        q: "Jaký je rozdíl mezi řezanou a tištěnou samolepkou?",
        a: "Řezaná grafika je vyříznutá z barevné fólie — ideální pro loga a nápisy, vypadá čistě a vydrží roky. Tištěná samolepka zvládne fotky a barevné přechody. Často je nejlepší kombinace obojího.",
      },
      {
        q: "Vydrží samolepky venku?",
        a: "Ano, s vhodnou fólií a laminací vydrží exteriérové samolepky 3–7 let podle materiálu. Pro krátkodobé akce naopak zvolíme levnější variantu — zbytečně nepřeplácíte.",
      },
      {
        q: "Umíte samolepky v libovolném tvaru?",
        a: "Ano, ploter vyřeže samolepku přesně po obrysu grafiky. Stačí dodat logo v křivkách, nebo jej převedeme my.",
      },
      {
        q: "Jaká je minimální objednávka?",
        a: "Žádná pevná hranice — vytiskneme i jeden arch. U menších sérií je cena za kus vyšší, ale nemusíte objednávat stovky kusů do šuplíku.",
      },
      {
        q: "Pomůžete s grafikou etikety?",
        a: "Ano. Připravíme etiketu, která splní i povinné náležitosti (složení, symboly), a dodáme tisková data pro případný dotisk.",
      },
    ],
    guides: [
      { label: "Jak připravit data pro tisk", href: "/pruvodce/jak-pripravit-data-pro-tisk" },
      { label: "Matná nebo lesklá laminace", href: "/pruvodce/matna-nebo-leskla-laminace" },
    ],
    works: ["ps-green", "reformlab"],
    finalTitle: "Potřebujete samolepky nebo fólie?",
    finalCta: "Poptat samolepky",
  },
  {
    slug: "tapety",
    hub: "tisk",
    navLabel: "Tisk tapet",
    metaTitle: "Tisk tapet a fototapet na míru Opava | Visibly",
    metaDescription:
      "Tisk tapet a fototapet na míru v Opavě. Vliesové i samolepicí, omyvatelné, na přesný rozměr stěny. Zaměření, tisk i lepení — kanceláře, provozovny i byty.",
    eyebrow: "Tisk · Tapety",
    h1: "Tapety na míru vaší stěně.",
    intro:
      "Fototapeta do kanceláře, grafika na stěnu provozovny nebo motiv domů. Tiskneme na přesný rozměr — včetně vyřezání kolem dveří, oken a zásuvek.",
    heroMedia: { label: "Kruhová fotografie · tapeta na stěně kanceláře", variant: "circle" },
    split: {
      title: "Stěnu už máte. Zbývá ji využít.",
      text: "Největší plocha v místnosti obvykle nedělá nic. Tapeta na míru z ní udělá kus značky, klidné pozadí k práci nebo místo, které si lidé vyfotí — podle toho, co od prostoru čekáte.",
      media: { label: "Detail · tisk tapety na velkoformátu", variant: "circle" },
    },
    proof: [
      { title: "Na přesný rozměr", text: "Tiskneme podle zaměřené stěny, ne na standardní role." },
      { title: "Do interiéru bez zápachu", text: "Inkousty po vytvrzení nezapáchají — prostor můžete hned používat." },
      { title: "Nalepíme, nebo poradíme", text: "Lepení zvládneme u vás. Kutilům předáme popsané pruhy a postup." },
    ],
    variantsTitle: "Kam tapetu chystáte?",
    variants: [
      { title: "Do kanceláře a na recepci", text: "Značka na stěně za recepcí nebo klidný motiv do zasedačky.", href: "/kontakt#poptavka", cta: "Poptat tapetu" },
      { title: "Do provozovny a prodejny", text: "Stěna, která ladí s označením i výlohou.", href: "/reklama/interierova-reklama", cta: "Projít interiérovou reklamu" },
      { title: "Domů a do dětského pokoje", text: "Vlastní fotka nebo motiv na míru v interiérové kvalitě.", href: "/tisk-fotoobrazu", cta: "Projít fotoobrazy" },
      { title: "Na sklo a příčky", text: "Kde má prosvítat světlo, řešíme mléčné a děrované fólie.", href: "/polepy/interierove-polepy", cta: "Projít interiérové polepy" },
    ],
    band: {
      title: "Máte jen fotku a rozměr?",
      text: "Stačí. Ověříme, jestli fotka na tu velikost stačí — a řekneme to dřív, než se tiskne.",
      cta: "Poslat podklady",
      href: "/kontakt#poptavka",
    },
    process: {
      title: "Od zaměření po hotovou stěnu.",
      steps: [
        { title: "Zaměření", text: "Změříme šířku, výšku i překážky — zásuvky, vypínače, dveře." },
        { title: "Podklad a kontrola", text: "Prověříme rozlišení na skutečný rozměr, ne na náhled." },
        { title: "Tisk a nařezání", text: "Vytiskneme s přesahem a nařežeme na pruhy podle stěny." },
        { title: "Lepení", text: "Nalepíme u vás, nebo předáme popsané pruhy s postupem." },
      ],
    },
    faqTitle: "Než si objednáte tapetu",
    faq: [
      {
        q: "Jaká fotka stačí na tapetu přes celou stěnu?",
        a: "Na tapetu se díváte z metru, ne z dálky jako na billboard — potřebuje tedy víc detailu. Orientačně na stěnu 3 × 2,5 m chcete fotku aspoň kolem 20 Mpx. Pošlete originál, přepočítáme rozlišení na skutečný rozměr a řekneme to dřív, než se tiskne.",
      },
      {
        q: "Musí být stěna dokonale rovná?",
        a: "Nemusí. Vliesová tapeta drobné nerovnosti a vlasové praskliny schová. Co neschová: sypající se omítku, čerstvou vlhkost nebo mastnotu — tam je potřeba stěnu nejdřív opravit, jinak se tapeta časem pustí.",
      },
      {
        q: "Dá se tapeta umýt?",
        a: "Podle materiálu. Do chodeb, kuchyněk a provozoven volíme omyvatelný povrch nebo laminaci — otřete hadrem a nic se nestane. Do klidné kanceláře je to příplatek navíc, tak ho sami nedoporučíme.",
      },
      {
        q: "Jak se tapeta jednou sundá?",
        a: "Vliesová jde po pruzích odtáhnout nasucho a zeď většinou zůstane v pořádku. Samolepicí varianta se sundává hůř, proto ji používáme hlavně na hladké povrchy a tam, kde se s výměnou počítá.",
      },
      {
        q: "Kolik tisk tapety stojí?",
        a: "Účtuje se za metr čtvereční — cenu určuje materiál, povrchová úprava a jestli lepíme my. Pošlete rozměr stěny a fotku prostoru, vrátíme konkrétní číslo včetně lepení.",
      },
    ],
    guides: [
      { label: "Jak připravit data pro tisk", href: "/pruvodce/jak-pripravit-data-pro-tisk" },
      { label: "Jak kvalitní fotku potřebuji na fotoobraz", href: "/pruvodce/jak-kvalitni-fotku-na-fotoobraz" },
    ],
    works: ["reformlab", "linealux"],
    finalTitle: "Chcete tapetu na míru?",
    finalCta: "Poptat tapetu",
  },
  {
    slug: "roll-upy",
    hub: "tisk",
    navLabel: "Roll-upy",
    metaTitle: "Roll-upy s tiskem Opava — výroba a výměna bannerů | Visibly",
    metaDescription:
      "Roll-upy s tiskem na míru v Opavě. Kvalitní konstrukce, ostrý tisk a grafika, která prodává i z tří metrů. Výměna banneru ve stávající konstrukci.",
    eyebrow: "Tisk · Roll-upy",
    h1: "Roll-upy, které se rozbalí za deset vteřin.",
    intro:
      "Na veletrh, prezentaci, do prodejny i na recepci. Dodáme kompletní roll-up s tiskem, nebo vyměníme banner ve vaší stávající konstrukci.",
    heroMedia: { label: "Kruhová fotografie · roll-up na stánku", variant: "circle" },
    split: {
      title: "Roll-up čtou lidé v pohybu.",
      text: "Máte dvě vteřiny pozornosti a tři metry vzdálenosti. Proto grafiku roll-upu stavíme odshora: silný titulek, jedna myšlenka, jasný kontakt.",
      media: { label: "Detail · mechanika roll-upu", variant: "circle" },
    },
    proof: [
      { title: "Konstrukce, co vydrží", text: "Mechanika, kterou rozbalíte i po sté bez nadávání." },
      { title: "Grafika stavěná na dálku", text: "Čitelné z místa, kde lidé skutečně stojí." },
      { title: "Výměna banneru", text: "Konstrukci máte? Vyměníme jen tisk." },
    ],
    variantsTitle: "Jakou situaci řešíte?",
    variants: [
      { title: "Potřebuji nový roll-up", text: "Kompletní sestava s tiskem a přepravní taškou.", href: "/kontakt#poptavka", cta: "Poptat roll-up" },
      { title: "Chci vyměnit grafiku", text: "Nový banner do vaší stávající konstrukce.", href: "/kontakt#poptavka", cta: "Poptat výměnu" },
      { title: "Vybavuji celý stánek", text: "Roll-upy, stěny, pulty a tiskoviny v jednom vizuálu.", href: "/tisk/pos-materialy", cta: "Projít POS materiály" },
      { title: "Potřebuji i grafiku", text: "Navrhneme roll-up, který prodává, ne jen informuje.", href: "/kontakt#poptavka", cta: "Probrat návrh" },
    ],
    band: {
      title: "Veletrh za dva týdny?",
      text: "Roll-upy patří k nejrychlejším zakázkám. Napište termín a domluvíme se na rovinu.",
      cta: "Stihnout termín",
      href: "/kontakt#poptavka",
    },
    process: {
      title: "Od podkladů po rozbalení.",
      steps: [
        { title: "Zadání", text: "Kolik roll-upů, kde budou stát a co mají říct." },
        { title: "Grafika", text: "Návrh nebo kontrola vašich dat." },
        { title: "Tisk a kompletace", text: "Tisk, ořez a osazení do konstrukce." },
        { title: "Předání", text: "Hotové, sbalené v tašce, připravené na cestu." },
      ],
    },
    faqTitle: "Než si objednáte roll-up",
    faq: [
      {
        q: "Jaký rozměr roll-upu je nejběžnější?",
        a: "Klasika je 85 × 200 cm — ideální poměr ceny, skladnosti a viditelnosti. Pro větší prostory dodáme i širší formáty (100, 120 cm) nebo oboustranné konstrukce.",
      },
      {
        q: "Jak dlouho roll-up vydrží?",
        a: "Kvalitní konstrukce roky. Nejčastěji se mění grafika, ne mechanika — proto nabízíme výměnu banneru ve stávající konstrukci za zlomek ceny nového setu.",
      },
      {
        q: "Můžu dodat vlastní grafiku?",
        a: "Určitě. Pošleme vám přesnou šablonu s ořezovými značkami a bezpečnou zónou u paty roll-upu, kde grafika mizí v konstrukci. Data před tiskem zkontrolujeme.",
      },
      {
        q: "Co má být na roll-upu, aby fungoval?",
        a: "Jedna hlavní zpráva nahoře, podpůrný text uprostřed, kontakt dole. Logo velké, textu málo. Rádi grafiku navrhneme — je to malá investice s velkým dopadem.",
      },
      {
        q: "Kolik roll-up stojí?",
        a: "Podle konstrukce a formátu. Napište počet kusů a účel, vrátíme konkrétní nabídku — bez skrytých položek.",
      },
    ],
    guides: [{ label: "Jak připravit data pro tisk", href: "/pruvodce/jak-pripravit-data-pro-tisk" }],
    works: ["reformlab"],
    finalTitle: "Potřebujete roll-up na akci?",
    finalCta: "Poptat roll-up",
  },
  {
    slug: "billboardy-a-citylighty",
    hub: "tisk",
    navLabel: "Billboardy a citylighty",
    metaTitle: "Tisk billboardů a citylightů Opava | Visibly",
    metaDescription:
      "Tisk billboardů a citylight plakátů v přesných formátech pro pronajaté plochy. Papír blueback i backlit materiály. Rychlé termíny, Opava a MS kraj.",
    eyebrow: "Tisk · Billboardy a citylighty",
    h1: "Billboardy a citylighty v přesném formátu.",
    intro:
      "Pronajali jste plochu — my dodáme tisk, který na ni přesně sedne. Billboard 510 × 240, citylight 118,5 × 175, nebo cokoli, co provozovatel předepíše.",
    heroMedia: { label: "Kruhová fotografie · billboard u silnice", variant: "circle" },
    split: {
      title: "Billboard čtou řidiči. Máte šest slov.",
      text: "Kolem billboardu se jezdí osmdesátkou. Grafika proto potřebuje obří písmo, jednu myšlenku a kontrast — všechno ostatní je dekorace, kterou nikdo nestihne přečíst.",
      media: { label: "Fotografie · citylight večer", variant: "circle" },
    },
    proof: [
      { title: "Přesné formáty ploch", text: "Tiskneme podle specifikace provozovatele plochy." },
      { title: "Správný materiál", text: "Blueback papír na výlep, backlit pro prosvětlení." },
      { title: "Grafika pro rychlé čtení", text: "Poradíme, co na plochu patří — a co už ne." },
    ],
    variantsTitle: "Jakou plochu jste si pronajali?",
    variants: [
      { title: "Billboard", text: "Klasika 510 × 240 cm, papír blueback pro výlep.", href: "/kontakt#poptavka", cta: "Poptat billboard" },
      { title: "Citylight", text: "Prosvětlená vitrína 118,5 × 175 cm, backlit materiál.", href: "/kontakt#poptavka", cta: "Poptat citylight" },
      { title: "Jiný formát plochy", text: "Bigboard, mostní pás, štít domu — podle specifikace.", href: "/kontakt#poptavka", cta: "Probrat formát" },
      { title: "Hledám vlastní plochu", text: "Nabízíme reklamní plochy přímo v Opavě.", href: "/reklamni-plochy-opava", cta: "Reklamní plochy Opava" },
    ],
    band: {
      title: "Kampaň startuje prvního?",
      text: "Výlepové termíny neposouváme my, ale kalendář. Ozvěte se s předstihem a tisk stihneme.",
      cta: "Stihnout výlep",
      href: "/kontakt#poptavka",
    },
    process: {
      title: "Od specifikace po výlep.",
      steps: [
        { title: "Specifikace plochy", text: "Formát a materiál podle provozovatele." },
        { title: "Grafika", text: "Návrh nebo kontrola dat pro čtení z dálky." },
        { title: "Tisk", text: "Blueback či backlit v přesném rozměru." },
        { title: "Předání", text: "Vám, nebo přímo výlepové firmě." },
      ],
    },
    faqTitle: "Než pošlete billboard do tisku",
    faq: [
      {
        q: "Jaká data potřebujete pro billboard?",
        a: "Ideálně PDF ve skutečné velikosti (nebo 1:10) s rozlišením kolem 70–100 DPI. Zní to málo, ale na billboard z odstupu bohatě stačí. Data vždy zkontrolujeme.",
      },
      {
        q: "Co je backlit a kdy ho potřebuji?",
        a: "Backlit je materiál pro prosvětlené plochy — citylighty a světelné vitríny. Propouští světlo rovnoměrně, takže grafika večer nezšedne. Pro klasický billboard stačí papír blueback.",
      },
      {
        q: "Dodáte tisk přímo výlepové firmě?",
        a: "Ano, běžná praxe. Tisk zabalíme a pošleme podle pokynů provozovatele plochy — vy řešíte jen kampaň.",
      },
      {
        q: "Navrhnete i grafiku kampaně?",
        a: "Ano — a upřímně vám řekneme, když bude na ploše moc textu. Billboard prodává jedna silná myšlenka, ne odstavec.",
      },
      {
        q: "Tisknete i jednotlivé kusy?",
        a: "Ano, od jednoho kusu. Pro série na více ploch platí množstevní ceny.",
      },
    ],
    guides: [{ label: "Jak připravit data pro tisk", href: "/pruvodce/jak-pripravit-data-pro-tisk" }],
    works: [],
    finalTitle: "Máte plochu? Dodáme tisk.",
    finalCta: "Poptat tisk plochy",
  },
  {
    slug: "plakaty",
    hub: "tisk",
    navLabel: "Plakáty",
    metaTitle: "Tisk plakátů Opava — od jednoho kusu | Visibly",
    metaDescription:
      "Tisk plakátů v Opavě od jednoho kusu. Formáty A3 až B0 i atypické rozměry, fotografická kvalita, rychlé termíny. Pro kulturu, akce i výlohy.",
    eyebrow: "Tisk · Plakáty",
    h1: "Plakáty od jednoho kusu po celou kampaň.",
    intro:
      "Koncert, výstava, nábor nebo akční nabídka do výlohy. Tiskneme plakáty ve fotografické kvalitě — od A3 po B0, klidně ještě větší.",
    heroMedia: { label: "Kruhová fotografie · plakáty ve výloze", variant: "circle" },
    split: {
      title: "Papír pořád funguje.",
      text: "Plakát na správném místě osloví lidi, které internetová reklama nikdy nenajde. A když je vytištěný pořádně, dělá značce čest i zblízka.",
      media: { label: "Detail · tisk plakátu", variant: "circle" },
    },
    proof: [
      { title: "Od jednoho kusu", text: "Žádné minimální náklady — vytiskneme i jediný plakát." },
      { title: "Fotografická kvalita", text: "Sytá barva a ostrý detail na správném papíru." },
      { title: "Libovolný formát", text: "A3, A0, B1 i atypické rozměry na míru." },
    ],
    variantsTitle: "K čemu plakát potřebujete?",
    variants: [
      { title: "Kultura a akce", text: "Koncerty, festivaly, divadlo — série na výlepy.", href: "/kontakt#poptavka", cta: "Poptat plakáty" },
      { title: "Do výlohy provozovny", text: "Akční nabídky a sezónní komunikace.", href: "/polepy/polepy-vyloh", cta: "Projít výlohy" },
      { title: "Do interiéru", text: "Dekorační tisky a fotoobrazy řešíme samostatně.", href: "/tisk-fotoobrazu", cta: "Projít fotoobrazy" },
      { title: "Na pronajaté plochy", text: "Billboardy a citylighty v přesných formátech.", href: "/tisk/billboardy-a-citylighty", cta: "Projít billboardy" },
    ],
    band: {
      title: "Potřebujete plakáty do zítřka?",
      text: "Tiskneme u sebe — u plakátů umíme být opravdu rychlí. Zavolejte, domluvíme se hned.",
      cta: "Zavolat 603 750 631",
      href: "tel:+420603750631",
    },
    process: {
      title: "Od podkladů po výlep.",
      steps: [
        { title: "Zadání", text: "Formát, počet kusů a termín." },
        { title: "Data", text: "Kontrola vašich, nebo návrh od nás." },
        { title: "Tisk", text: "Správný papír a barevnost." },
        { title: "Předání", text: "Osobně v Opavě nebo doručením." },
      ],
    },
    faqTitle: "Než pošlete plakát do tisku",
    faq: [
      {
        q: "Jaké formáty plakátů tisknete?",
        a: "Běžně A3 až B0 a k tomu jakýkoli atypický rozměr do šíře tiskového stroje. Formát rádi doporučíme podle místa, kde bude plakát viset.",
      },
      {
        q: "Na jaký papír plakáty tisknete?",
        a: "Podle použití — klasický plakátový papír na výlep, silnější a matné papíry pro interiér a prezentace, backlit pro prosvětlené rámy. Vzorky ukážeme u nás ve studiu.",
      },
      {
        q: "Kolik stojí tisk jednoho plakátu?",
        a: "Podle formátu a papíru — jednotky až nižší stovky korun za kus. U sérií cena za kus rychle klesá. Napište formát a počet, spočítáme obratem.",
      },
      {
        q: "Zvládnete i grafiku plakátu?",
        a: "Ano, navrhujeme plakáty, které fungují na dálku i zblízka. Dobrý plakát je hierarchie: co, kdy, kde — v tomhle pořadí.",
      },
      {
        q: "Jak mám připravit data?",
        a: "PDF se spadávkou 3–5 mm a rozlišením 150 DPI ve skutečné velikosti bohatě stačí. Podrobnosti najdete v našem průvodci přípravou dat.",
      },
    ],
    guides: [{ label: "Jak připravit data pro tisk", href: "/pruvodce/jak-pripravit-data-pro-tisk" }],
    works: [],
    finalTitle: "Potřebujete vytisknout plakáty?",
    finalCta: "Poptat plakáty",
  },
  {
    slug: "tiskoviny",
    hub: "tisk",
    navLabel: "Tiskoviny",
    metaTitle: "Firemní tiskoviny Opava — vizitky, letáky, brožury | Visibly",
    metaDescription:
      "Vizitky, letáky, brožury a firemní tiskoviny z Opavy. Grafika, tisk a dokončení na jednom místě — tiskoviny, které ladí se zbytkem vaší značky.",
    eyebrow: "Tisk · Tiskoviny",
    h1: "Tiskoviny, které se neztratí v šuplíku.",
    intro:
      "Vizitky, letáky, brožury, desky i poukázky. Navrhneme a vytiskneme tiskoviny, které ladí s vaší značkou — a které lidé neodloží po první vteřině.",
    heroMedia: { label: "Kruhová fotografie · firemní tiskoviny", variant: "circle" },
    split: {
      title: "Vizitka je nejmenší nosič důvěry.",
      text: "Papír, který dáváte z ruky do ruky, o vás řekne víc než web. Proto u tiskovin hlídáme gramáž, povrch i barevnost proti zbytku vaší identity.",
      media: { label: "Detail · vizitky a brožura", variant: "circle" },
    },
    proof: [
      { title: "Grafika + tisk v jednom", text: "Od návrhu po dokončení bez předávání mezi dodavateli." },
      { title: "Konzistentní barva", text: "Tiskoviny ladí s polepem auta i cedulí na fasádě." },
      { title: "Malé i větší série", text: "Od sta vizitek po tisíce letáků." },
    ],
    variantsTitle: "Co dáváte lidem do ruky?",
    variants: [
      { title: "Vizitky", text: "Klasické i s povrchovou úpravou, která je poznat hmatem.", href: "/kontakt#poptavka", cta: "Poptat vizitky" },
      { title: "Letáky a akční nabídky", text: "Do schránek, na pulty i k objednávkám.", href: "/kontakt#poptavka", cta: "Poptat letáky" },
      { title: "Brožury a katalogy", text: "Vázané prezentace produktů a služeb.", href: "/kontakt#poptavka", cta: "Poptat brožury" },
      { title: "Poukázky a pozvánky", text: "Tiskoviny, které se darují — s papírem, který to unese.", href: "/kontakt#poptavka", cta: "Poptat poukázky" },
    ],
    band: {
      title: "Nemáte logo v tiskové kvalitě?",
      text: "Stává se. Logo překreslíme do křivek, nebo rovnou navrhneme identitu, ze které tiskoviny vyplynou samy.",
      cta: "Návrh loga a identity",
      href: "/navrh-loga-a-vizualni-identity",
    },
    process: {
      title: "Od textu po hotovou tiskovinu.",
      steps: [
        { title: "Zadání", text: "Co tiskovina má říct a komu poputuje." },
        { title: "Návrh", text: "Grafika, papír a dokončení." },
        { title: "Korektura", text: "Odsouhlasíte náhled — žádná překvapení." },
        { title: "Tisk a předání", text: "Vytištěno, ořezáno, připraveno k rozdávání." },
      ],
    },
    faqTitle: "Než si objednáte tiskoviny",
    faq: [
      {
        q: "Kolik vizitek má smysl tisknout?",
        a: "Obvykle 100–500 kusů na osobu. Menší náklad znamená, že při změně telefonu nevyhazujete krabici papíru. Dotisk u nás zvládneme rychle.",
      },
      {
        q: "Pomůžete s textem letáku?",
        a: "Ano. Dobrý leták má jednu nabídku, jeden důvod jednat hned a jeden kontakt. Pomůžeme text zestručnit tak, aby ho někdo skutečně přečetl.",
      },
      {
        q: "Jaký papír na vizitky doporučujete?",
        a: "Minimálně 300 g/m², příjemně matný povrch. Pro výraznější dojem přidáme laminaci soft-touch nebo parciální lak. Vzorky si můžete osahat u nás ve studiu.",
      },
      {
        q: "Tisknete i z dodaných dat?",
        a: "Samozřejmě — data zkontrolujeme (spadávky, barevnost, rozlišení) a upozorníme na rizika ještě před tiskem.",
      },
      {
        q: "Co potřebujete pro nacenění?",
        a: "Typ tiskoviny, formát, počet kusů a představu o papíru. Když si nejste jistí, popište účel — zbytek doporučíme.",
      },
    ],
    guides: [
      { label: "Jak připravit data pro tisk", href: "/pruvodce/jak-pripravit-data-pro-tisk" },
      { label: "Jaký formát loga poslat do tiskárny", href: "/pruvodce/jaky-format-loga-poslat-do-tiskarny" },
    ],
    works: ["ps-green", "reformlab"],
    finalTitle: "Potřebujete vizitky nebo letáky?",
    finalCta: "Poptat tiskoviny",
  },
  {
    slug: "pos-materialy",
    hub: "tisk",
    navLabel: "POS materiály",
    metaTitle: "POS materiály a podpora prodeje Opava | Visibly",
    metaDescription:
      "POS a POP materiály z Opavy — stojky, wobblery, regálové lišty, pultové displeje a označení prodejní plochy. Návrh, tisk a kompletace u nás.",
    eyebrow: "Tisk · POS materiály",
    h1: "POS materiály, které prodávají u regálu.",
    intro:
      "Stojky, wobblery, pultové displeje, regálové lišty i plakáty do prodejny. Vyrobíme podporu prodeje, která zákazníka zastaví v místě, kde se rozhoduje.",
    heroMedia: { label: "Kruhová fotografie · POS stojka v prodejně", variant: "circle" },
    split: {
      title: "O nákupu se rozhoduje metr od regálu.",
      text: "POS materiál je poslední slovo, které ke značce zákazník dostane před rozhodnutím. Musí být vidět, vydržet provoz prodejny a dát se rychle instalovat.",
      media: { label: "Detail · pultový displej", variant: "circle" },
    },
    proof: [
      { title: "Návrh i výroba", text: "Grafika, tisk, řez a kompletace na jednom místě." },
      { title: "Materiály do provozu", text: "Kartony, desky a fólie, které přežijí prodejnu." },
      { title: "Série pro více poboček", text: "Stejný vizuál, spolehlivá opakovatelnost." },
    ],
    variantsTitle: "Co má u regálu pracovat?",
    variants: [
      { title: "Stojky a displeje", text: "Podlahové a pultové poutače z desek a kartonu.", href: "/kontakt#poptavka", cta: "Poptat stojky" },
      { title: "Drobné POS prvky", text: "Wobblery, regálové lišty, cenovkové systémy.", href: "/kontakt#poptavka", cta: "Poptat POS prvky" },
      { title: "Označení prodejní plochy", text: "Navigace a značení uvnitř prodejny.", href: "/reklama/interierova-reklama", cta: "Projít interiér" },
      { title: "Výlohu k tomu", text: "Kampaň dotáhneme i na sklo výlohy.", href: "/polepy/polepy-vyloh", cta: "Projít výlohy" },
    ],
    band: {
      title: "Chystáte kampaň do více prodejen?",
      text: "Připravíme sadu POS materiálů včetně balení po pobočkách — rozvezete a jen instalujete.",
      cta: "Probrat kampaň",
      href: "/kontakt#poptavka",
    },
    process: {
      title: "Od kampaně po regál.",
      steps: [
        { title: "Zadání", text: "Produkt, prodejní místo a cíl kampaně." },
        { title: "Návrh", text: "Grafika a konstrukce prvků." },
        { title: "Výroba", text: "Tisk, řez, kompletace, balení." },
        { title: "Distribuce", text: "Předání po pobočkách nebo na centrálu." },
      ],
    },
    faqTitle: "Než objednáte POS materiály",
    faq: [
      {
        q: "Co všechno patří mezi POS materiály?",
        a: "Vše, co podporuje prodej v místě prodeje: stojky, displeje, wobblery, regálové lišty, plakáty, cenovky, samolepky na podlahu i označení akčních zón.",
      },
      {
        q: "Vyrobíte POS na míru produktu?",
        a: "Ano — konstrukci navrhneme podle rozměrů a váhy produktu, aby displej unesl, co má, a dal se složit bez nářadí.",
      },
      {
        q: "Jak dlouho POS materiály vydrží?",
        a: "Kartonové prvky jsou stavěné na týdny až měsíce kampaně, deskové a fóliové prvky na roky. Materiál volíme podle délky nasazení — zbytečně nepřeplácíte.",
      },
      {
        q: "Zvládnete i malé série?",
        a: "Ano, vyrobíme POS i pro jednu prodejnu. Díky vlastní výrobě nejsme vázaní na velké náklady.",
      },
      {
        q: "Co potřebujete pro nabídku?",
        a: "Co chcete komunikovat, kde bude prvek stát a kolik prodejen vybavujete. Fotka prodejního místa pomůže s návrhem konstrukce.",
      },
    ],
    guides: [{ label: "Jak připravit data pro tisk", href: "/pruvodce/jak-pripravit-data-pro-tisk" }],
    works: ["reformlab"],
    finalTitle: "Potřebujete podporu prodeje?",
    finalCta: "Poptat POS materiály",
  },
];
