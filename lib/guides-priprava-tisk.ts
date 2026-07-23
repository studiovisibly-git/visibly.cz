import type { Guide } from "./types";

/** Články průvodce: příprava dat, tisk a důvěra. Slugy zachovány z původního webu. */
export const guidesPripravaTisk: Guide[] = [
  {
    slug: "jak-pripravit-data-pro-tisk",
    category: "Příprava dat",
    title: "Jak připravit data pro tisk",
    metaTitle: "Jak připravit data pro tisk — formáty, spadávky, rozlišení | Visibly",
    metaDescription:
      "Praktický návod, jak připravit tisková data: správný formát, spadávka, rozlišení a barevnost. Bez pouček — jen to, co tiskárna skutečně potřebuje.",
    excerpt: "Formát, spadávka, rozlišení a kontrola před výrobou — srozumitelně a bez pouček.",
    featured: true,
    body: [
      {
        p: "Dobrá zpráva na začátek: nemusíte být grafik, abyste nám poslali použitelná data. Tenhle návod shrnuje, co skutečně potřebujeme — a co za vás rádi pohlídáme my.",
      },
      { h2: "Jaký formát souboru poslat" },
      {
        p: "Ideál je PDF. Zachová písma, barvy i rozměry a otevřeme ho bez překvapení. Posíláte-li z grafického programu, exportujte do PDF/X, ale i běžné PDF obvykle stačí.",
      },
      {
        ul: [
          "PDF — první volba pro všechno od vizitky po banner.",
          "AI, EPS, SVG — skvělé pro loga a řezanou grafiku (křivky).",
          "TIFF, JPG — v pořádku pro fotografie a velkoformát, pokud mají dost rozlišení.",
          "Word, PowerPoint, Canva — pošlete, poradíme si, ale počítejte s kontrolou navíc.",
        ],
      },
      { h2: "Spadávka: 3 milimetry, které zachrání okraje" },
      {
        p: "Spadávka je přesah grafiky za čistý formát — obvykle 3 mm, u velkoformátu víc. Díky ní po ořezu nevzniknou bílé okraje tam, kde má být barva až do kraje. Texty a loga naopak držte aspoň 3–5 mm od okraje dovnitř.",
      },
      { h2: "Rozlišení: méně, než si myslíte" },
      {
        p: "Pověra říká „všechno ve 300 DPI“. Pravda je pohodlnější: rozlišení se řídí vzdáleností, ze které se výsledek pozoruje.",
      },
      {
        table: {
          head: ["Co tisknete", "Doporučené rozlišení"],
          rows: [
            ["Vizitky, letáky, brožury", "300 DPI"],
            ["Plakáty A2–A0", "150–200 DPI"],
            ["Bannery, plachty", "72–150 DPI"],
            ["Billboardy", "25–70 DPI"],
          ],
        },
      },
      {
        p: "Údaje platí pro skutečnou velikost tisku. Fotka, která má na obrazovce „malé rozlišení“, může na billboard bohatě stačit.",
      },
      { h2: "Barevnost: CMYK vs. RGB" },
      {
        p: "Tiskne se v CMYK, obrazovky svítí v RGB. Pošlete-li RGB data, převedeme je my — jen počítejte s tím, že zářivé odstíny (neonová zelená, sytá modř) na papíře mírně zklidní. U barev, na kterých záleží (firemní barvy!), napište i kód Pantone nebo CMYK hodnoty.",
      },
      { h2: "Texty a písma" },
      {
        ul: [
          "Před exportem převeďte texty do křivek, nebo písma do PDF přibalte (embed).",
          "Zkontrolujte překlepy — po tisku už je neopravíme ani my.",
          "Minimální velikost písma pro čitelnost: 6 b na tiskovinách, výrazně víc na dálkové čtení.",
        ],
      },
      {
        tip: {
          title: "Nevíte si rady? Pošlete, co máte.",
          text: "Každá data před tiskem kontrolujeme — rozlišení, spadávky, barevnost. Když něco nesedí, ozveme se dřív, než se cokoli vytiskne. Poslat „nedokonalá“ data je vždycky lepší než neposlat nic.",
        },
      },
    ],
    service: { label: "Přejít na tisk", href: "/tisk" },
    related: [
      { label: "Jaký formát loga poslat do tiskárny", href: "/pruvodce/jaky-format-loga-poslat-do-tiskarny" },
      { label: "Matná nebo lesklá laminace", href: "/pruvodce/matna-nebo-leskla-laminace" },
    ],
  },
  {
    slug: "jaky-format-loga-poslat-do-tiskarny",
    category: "Příprava dat",
    title: "Jaký formát loga poslat do tiskárny",
    metaTitle: "Jaký formát loga poslat do tiskárny — křivky vs. JPG | Visibly",
    metaDescription:
      "Křivky, PDF, JPG nebo PNG? Vysvětlujeme, jaký formát loga tiskárna potřebuje, proč JPG z webu nestačí a co dělat, když nic lepšího nemáte.",
    excerpt: "Křivky vs. JPG: proč na formátu záleží a co dělat, když máte jen obrázek z webu.",
    body: [
      {
        p: "„Pošlete nám logo“ je věta, u které se zasekne kdekdo. V počítači je přece logo.jpg — tak v čem je problém? Krátce: v tom, co s ním potřebujeme udělat.",
      },
      { h2: "Dva světy: křivky a pixely" },
      {
        p: "Logo v křivkách (vektor) je matematický popis tvarů — zvětšíte ho na fasádu i zmenšíte na propisku a pořád bude ostré. Logo v pixelech (JPG, PNG) je mřížka barevných bodů — při zvětšení se rozpadne na kostičky.",
      },
      {
        ul: [
          "Křivky: PDF, AI, EPS, SVG — poznáte je tak, že se dají zvětšovat donekonečna.",
          "Pixely: JPG, PNG, ale i logo vložené ve Wordu — pro výrobu jen omezeně použitelné.",
        ],
      },
      { h2: "Proč řezaná grafika bez křivek nejde" },
      {
        p: "Řezací ploter jede po drahách — potřebuje křivku, po které povede nůž. Z JPG žádná dráha nevede. Proto polepy, řezaná loga a 3D písmena vyžadují vektor vždy.",
      },
      { h2: "Co dělat, když máte jen JPG" },
      {
        p: "Nezoufat. Logo překreslíme do křivek — u jednoduchých značek rychlá práce, u složitých kreseb chvíli potrvá. Jednou zaplatíte a data máte navždy, pro nás i každého dalšího dodavatele.",
      },
      {
        ol: [
          "Projděte staré e-maily — křivky často leží u grafika, který logo kdysi dělal.",
          "Zeptejte se tvůrce webu, ten křivky mívá (kvůli SVG na webu).",
          "Když nic nenajdete, pošlete největší verzi, jakou máte — zbytek zařídíme.",
        ],
      },
      {
        tip: {
          title: "Do budoucna: jedna složka, čtyři soubory",
          text: "Uložte si logo v PDF (křivky), SVG (web), PNG s průhledným pozadím a JPG. S touhle sadou vás už nikdy žádný dodavatel nezaskočí.",
        },
      },
    ],
    service: { label: "Návrh loga a identity", href: "/navrh-loga-a-vizualni-identity" },
    related: [
      { label: "Jak připravit data pro tisk", href: "/pruvodce/jak-pripravit-data-pro-tisk" },
      { label: "Řezaná grafika", href: "/polepy/rezana-grafika" },
    ],
  },
  {
    slug: "jak-vybrat-reklamni-banner",
    category: "Tisk",
    title: "Jak vybrat reklamní banner",
    metaTitle: "Jak vybrat reklamní banner — materiál, rozměr, konfekce | Visibly",
    metaDescription:
      "Plný banner, nebo síťovina? Jaká gramáž, oka a rozměr? Průvodce výběrem reklamního banneru podle místa, větru a délky nasazení.",
    excerpt: "Plný banner, nebo síťovina? Rozměr, gramáž a konfekce podle místa, kde bude viset.",
    body: [
      {
        p: "Banner je jednoduchá věc — dokud neřešíte, proč soused platil polovinu, nebo proč ten váš po měsíci visí v cárech. Rozdíl je skoro vždy ve třech volbách: materiál, konfekce a rozměr.",
      },
      { h2: "Plný banner, nebo síťovina?" },
      {
        p: "Plná bannerovina má syté barvy a je univerzální volbou na ploty, fasády a stánky. Síťovina (mesh) má drobné otvory, kterými profoukne vítr — na lešení, zábradlí balkonů a větrná místa je povinností, jinak se banner promění v plachtu lodi.",
      },
      { h2: "Gramáž: 510 vs. 440 vs. lehčí" },
      {
        ul: [
          "440–510 g/m² — standard pro venkovní dlouhodobé použití.",
          "Lehčí materiály — krátkodobé akce a interiér, kde nefouká.",
          "Oboustranný tisk — speciální blockout materiál, aby grafika neprosvítala.",
        ],
      },
      { h2: "Konfekce: detail, který rozhoduje o životnosti" },
      {
        p: "Nejčastější smrt banneru nezpůsobí tisk, ale uchycení. Standard jsou zavařené lemy a kovová oka po ~50 cm. Do většího větru hustší rozteč ok a plastové spony místo stahovacích pásek — rozloží tah a banner nepraská.",
      },
      { h2: "Rozměr a grafika: čitelnost z místa" },
      {
        p: "Pravidlo palce: 1 cm výšky písmene na každý 1 metr vzdálenosti čtení. Banner u silnice čtený z 30 metrů potřebuje písmo aspoň 30 cm — což znamená pár slov, ne odstavec. Nejlepší bannery mají tři informace: co, kdo, telefon.",
      },
      {
        tip: {
          title: "Pošlete fotku místa",
          text: "Z jedné fotky poznáme vítr, kotvení i vzdálenost čtení — a vrátíme vám doporučený rozměr, materiál a konfekci s cenou. Rychlejší cesta neexistuje.",
        },
      },
    ],
    service: { label: "Bannery a plachty", href: "/tisk/bannery-a-plachty" },
    related: [
      { label: "Jak připravit data pro tisk", href: "/pruvodce/jak-pripravit-data-pro-tisk" },
      { label: "Velkoformátový tisk", href: "/tisk/velkoformatovy-tisk" },
    ],
  },
  {
    slug: "matna-nebo-leskla-laminace",
    category: "Tisk",
    title: "Matná nebo lesklá laminace",
    metaTitle: "Matná nebo lesklá laminace — kdy jakou zvolit | Visibly",
    metaDescription:
      "Matná, lesklá, nebo žádná laminace? Kdy se laminace vyplatí, jak ovlivní barvy a odolnost tisku a jak vybrat pro polepy, tiskoviny i velkoformát.",
    excerpt: "Kdy laminaci potřebujete, kdy je zbytečná a jak mat a lesk mění barvy i odolnost.",
    body: [
      {
        p: "Laminace je tenká ochranná fólie nanesená na tisk. Chrání proti poškrábání, UV záření a vlhkosti — a zároveň mění, jak výsledek vypadá. Otázka „mat, nebo lesk?“ je proto napůl praktická a napůl estetická.",
      },
      { h2: "Kdy laminaci potřebujete" },
      {
        ul: [
          "Polepy aut — vždy. Bez laminace grafiku zničí mytí a kamínky.",
          "Venkovní samolepky a grafika — UV filtr výrazně prodlouží barvy.",
          "Podlahová grafika — speciální protiskluzová laminace je povinná.",
          "Tiskoviny, které jdou z ruky do ruky — vizitky, jídelní lístky, katalogy.",
        ],
      },
      { h2: "Kdy je zbytečná" },
      {
        p: "Krátkodobé akce, plakáty na výlep, interiérové tisky mimo dosah rukou. Tam laminace jen zvyšuje cenu — a my vám ji sami rozmluvíme.",
      },
      { h2: "Mat, nebo lesk?" },
      {
        p: "Lesk rozzáří barvy a dodá kontrast — sluší fotografiím a produktovým tiskům. Jenže se v něm zrcadlí okna a zářivky; na výstavě nebo pod bodovým světlem umí vadit. Mat působí prémiově a tlumeně, nezrcadlí, ale barvy mírně zklidní. Na dotykové tiskoviny je příjemnější.",
      },
      {
        table: {
          head: ["Situace", "Doporučení"],
          rows: [
            ["Polep auta", "Lesk (odpovídá laku), mat pro tlumený vzhled"],
            ["Vizitky, katalogy", "Mat, případně soft-touch"],
            ["Fotoobrazy, produktové tisky", "Podle světla v místnosti"],
            ["Tisky pod umělým osvětlením", "Mat — bez odlesků"],
          ],
        },
      },
      {
        tip: {
          title: "Nechte si ukázat vzorky",
          text: "Mat a lesk se špatně vybírá z monitoru. Ve studiu v Opavě máme vzorky obou — rozdíl pochopíte za deset vteřin v ruce.",
        },
      },
    ],
    service: { label: "Přejít na tisk", href: "/tisk" },
    related: [
      { label: "Samolepky a fólie", href: "/tisk/samolepky-a-folie" },
      { label: "Jak dlouho vydrží polep auta", href: "/pruvodce/jak-dlouho-vydrzi-polep-auta" },
    ],
  },
  {
    slug: "jak-kvalitni-fotku-na-fotoobraz",
    category: "Tisk",
    title: "Jak kvalitní fotku potřebuji na fotoobraz",
    metaTitle: "Jak kvalitní fotku potřebuji na fotoobraz | Visibly",
    metaDescription:
      "Stačí fotka z mobilu na fotoobraz? Kolik megapixelů na jaký formát a jak fotku poslat, aby se cestou nezmenšila. Praktický průvodce.",
    excerpt: "Stačí mobil? Kolik megapixelů na jaký formát a jak fotku poslat bez ztráty kvality.",
    body: [
      {
        p: "Nejčastější obava před tiskem fotoobrazu: „Nebude to rozmazané?“ Dobrá zpráva — moderní telefony fotí víc než dost. Zlá zpráva — většina fotek se zničí cestou k nám. Pojďme obojí vyřešit.",
      },
      { h2: "Kolik megapixelů na jaký formát" },
      {
        table: {
          head: ["Formát obrazu", "Doporučené rozlišení fotky"],
          rows: [
            ["do 30 × 40 cm", "od 5 Mpx — zvládne každý telefon"],
            ["do 60 × 80 cm", "od 8–12 Mpx — běžný novější telefon"],
            ["do 100 × 140 cm", "od 12–20 Mpx — dobré světlo, ostrý snímek"],
            ["větší formáty", "pošlete k posouzení — často to jde i tak"],
          ],
        },
      },
      {
        p: "Na velké formáty se navíc díváte z větší dálky, takže nároky rostou pomaleji, než byste čekali. Fotku vždy posoudíme před tiskem — zdarma a na rovinu.",
      },
      { h2: "Co kazí fotky víc než rozlišení" },
      {
        ul: [
          "Posílání přes chat — WhatsApp či Messenger fotky drasticky komprimují.",
          "Rozmazání pohybem — lehce neostrý snímek zvětšením jen utrpí.",
          "Digitální zoom — výřez z výřezu nemá s kvalitou nic společného.",
          "Screenshoty — nikdy netiskněte snímek obrazovky fotky.",
        ],
      },
      { h2: "Jak fotku poslat správně" },
      {
        ol: [
          "Najděte originál v galerii (největší velikost souboru).",
          "Pošlete e-mailem v příloze „ve skutečné velikosti“, přes úschovnu nebo cloud.",
          "Nepřejmenovávejte, neořezávejte, neupravujte — ořez doladíme společně.",
        ],
      },
      {
        tip: {
          title: "Nejste si jistí? Pošlete fotku k posouzení.",
          text: "Do druhého dne řekneme, do jakého formátu se dá vytisknout krásně, kde je hranice — a jestli má smysl zkusit jiný snímek.",
        },
      },
    ],
    service: { label: "Tisk fotoobrazů", href: "/tisk-fotoobrazu" },
    related: [{ label: "Jak připravit data pro tisk", href: "/pruvodce/jak-pripravit-data-pro-tisk" }],
  },
  {
    slug: "jak-poznat-dobrou-tiskarnu-reklamni-vyrobu",
    category: "Důvěra",
    title: "Jak poznat dobrou tiskárnu a reklamní výrobu",
    metaTitle: "Jak poznat dobrou tiskárnu a reklamní výrobu | Visibly",
    metaDescription:
      "Na co se ptát před zadáním zakázky tiskárně či reklamní výrobě: vlastní stroje, kontrola dat, reference a komunikace. Checklist před objednávkou.",
    excerpt: "Co si ověřit, než někomu svěříte zakázku — vlastní výroba, kontrola dat, reference.",
    featured: true,
    body: [
      {
        p: "Tiskáren a „reklamek“ je všude plno a z webů se tváří stejně. Rozdíly poznáte až na zakázce — nebo dřív, když víte, na co se ptát. Tenhle checklist píšeme z druhé strany pultu.",
      },
      { h2: "1. Vyrábí sami, nebo přeprodávají?" },
      {
        p: "Nic proti zprostředkovatelům — ale každé předání zakázky přidává čas, cenu a riziko tiché pošty. Zeptejte se, co dělají na vlastních strojích. Kdo vyrábí sám, umí říct přesně, co je reálné a do kdy.",
      },
      { h2: "2. Kontrolují data před výrobou?" },
      {
        p: "Dobrá výroba se na data podívá dřív, než spustí stroj — a ozve se, když je rozlišení nízké nebo barevnost riskantní. Špatná vytiskne cokoli a pak krčí rameny, že „taková byla data“.",
      },
      { h2: "3. Ptají se na použití?" },
      {
        p: "Když poptáte „banner 3 × 1 m“ a nikdo se nezeptá, kde bude viset, zbystřete. Materiál, konfekce i grafika se odvíjejí od místa — kdo se neptá, střílí naslepo.",
      },
      { h2: "4. Ukazují skutečné realizace?" },
      {
        p: "Fotky z vlastní dílny a konkrétní zakázky s příběhem znamenají víc než banka obrázků. Ptejte se na realizace podobné té vaší — a klidně si o firmě od reference řekněte.",
      },
      { h2: "5. Mluví srozumitelně?" },
      {
        p: "Kdo vám bez ptaní sype zkratky (solvent, mactac, blueback), možná zakrývá, že neumí poradit. Dobrý dodavatel překládá technologii do vašich rozhodnutí: vydrží to X let, bude to stát Y, doporučuji Z, protože…",
      },
      {
        tip: {
          title: "Rychlý test jednou větou",
          text: "Napište: „Potřebuji označit provozovnu, nevím jak — poradíte?“ Kdo odpoví protiotázkami o místě a zákaznících, stojí za to. Kdo pošle ceník, hledejte dál.",
        },
      },
    ],
    service: { label: "Naše technologie", href: "/technologie" },
    related: [
      { label: "Jak připravit data pro tisk", href: "/pruvodce/jak-pripravit-data-pro-tisk" },
      { label: "O nás", href: "/o-nas" },
    ],
  },
  {
    slug: "partnersky-tisk-pro-agentury",
    category: "B2B tisk",
    title: "Partnerský tisk pro agentury a grafiky",
    metaTitle: "Partnerský tisk pro agentury a grafická studia | Visibly",
    metaDescription:
      "Jak funguje partnerský tisk pro agentury a grafiky: dodáte data, my pohlídáme výrobu. Diskrétnost vůči koncovým klientům, férové ceny, spolehlivé termíny.",
    excerpt: "Vy dodáte data, my pohlídáme výrobu. Jak funguje spolupráce s agenturami a grafiky.",
    body: [
      {
        p: "Navrhujete pro klienty grafiku a potřebujete partnera, který ji spolehlivě vyrobí? Přesně pro vás máme režim partnerského tisku — spolupráci, kde vy držíte klienta a my výrobu.",
      },
      { h2: "Jak spolupráce funguje" },
      {
        ol: [
          "Pošlete data a specifikaci (nebo jen popis — poradíme s technickým řešením).",
          "Vrátíme cenu a termín. Bez keců, obvykle do druhého dne.",
          "Vyrobíme, zkontrolujeme a předáme vám, nebo doručíme přímo klientovi — s vaším jménem.",
        ],
      },
      { h2: "Co u nás vyrobíte" },
      {
        ul: [
          "Velkoformátový tisk: bannery, fólie, samolepky, plakáty (Epson SureColor).",
          "Řezanou grafiku a polepy (ploter Roland, laminace).",
          "Tiskoviny, POS materiály a kompletace.",
          "Textil termolisem — i malé série.",
        ],
      },
      { h2: "Pravidla, na kterých stavíme" },
      {
        p: "Diskrétnost: váš klient je váš. Nekontaktujeme ho, neznačkujeme dodávky, na místě vystupujeme pod vaší vlajkou, pokud si to přejete. Technická parita: mluvíme s vámi jako grafik s grafikem — profily, přesahy, bílá pod tiskem, žádné vysvětlování základů. Upřímnost: když jsou data riziková nebo termín nereálný, řekneme to předem, ne po výrobě.",
      },
      { h2: "Co potřebujeme od vás" },
      {
        p: "Data podle našich specifikací (pošleme šablony), představu o termínu a fakturační údaje. Klidně začněte jednorázovou zakázkou — partnerské ceny nabízíme od druhé spolupráce automaticky.",
      },
      {
        tip: {
          title: "Chcete partnerský ceník?",
          text: "Napište nám pár řádků o svém studiu a objemech, které řešíte. Vrátíme ceník a podmínky — bez závazků a obvolávání.",
        },
      },
    ],
    service: { label: "Pro agentury", href: "/pro-agentury" },
    related: [
      { label: "Jak připravit data pro tisk", href: "/pruvodce/jak-pripravit-data-pro-tisk" },
      { label: "Naše technologie", href: "/technologie" },
    ],
  },
];
