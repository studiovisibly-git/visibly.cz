# Visibly — SEO sitemapa a architektura webu pro Codex (OPRAVENÁ VERZE)

Tento dokument nahrazuje původní `visibly-seo-sitemap.md`. Je to zdrojový podklad pro Codex
při úpravě exportované Webflow šablony Circle na web Visibly.

Cíl webu: postupně vybudovat nejsilnější lokální web v oblasti tisku a reklamní výroby
pro Opavu, Ostravu a Moravskoslezský kraj.

> **Co se v této verzi opravilo oproti původní:**
> 1. Odstraněna keyword kanibalizace mezi službovými a lokálními stránkami (identické title).
> 2. Service stránky mají title BEZ města, lokální stránky title S městem — každá cílí na jiný záměr.
> 3. Vyřešen konflikt homepage vs `/tiskarna-opava/`.
> 4. Vyjasněn rozdíl mezi rozcestníkem `/reklama/` a `/reklamni-vyroba/`.
> 5. `/reklamni-plochy-opava/` jen na jednom místě.
> 6. Doplněna pravidla pro kategorie realizací (vlastní text, ne prázdný filtr).
> 7. Doplněno tvrdé pravidlo: méně silných stránek > hodně tenkých.

---

## 1. Strategický cíl webu

Visibly se má prezentovat jako:

**Tiskárna a výrobní reklamní studio z Opavy.**

Ne jako obecná reklamní agentura.
Ne jako online marketingová agentura.
Ne jako grafické studio, které náhodou něco tiskne.

Hlavní positioning:

> Tiskneme a vyrábíme reklamu, která je vidět.

Hlavní výhoda:

> Vlastní tisk. Vlastní výroba. Vlastní technologie. Kontrola nad výsledkem.

Prioritní trhy:

1. Opava
2. Ostrava
3. Moravskoslezský kraj
4. celá ČR u obecných produktových/službových dotazů

---

## 2. KLÍČOVÉ PRAVIDLO ARCHITEKTURY — dvě vrstvy, dva záměry

Web má dvě oddělené vrstvy stránek. **Nikdy se nesmí překrývat v title ani v hlavním obsahu.**

### Vrstva A — Service stránky (co a jak)

- Cílí na obecný dotaz a celorepublikové hledání.
- Title BEZ názvu města.
- Obsah: co služba je, materiály, technologie, použití, pro koho, jak probíhá.
- Příklad: `/velkoformatovy-tisk/` → "Velkoformátový tisk pro firmy | Visibly"

### Vrstva B — Lokální stránky (kde)

- Cílí na dotaz s městem ("velkoformátový tisk Opava").
- Title S názvem města.
- Obsah MUSÍ být jiný než service stránka: lokální dostupnost, osobní předání,
  rychlá domluva, realizace z okolí, mapa, region.
- Příklad: `/velkoformatovy-tisk-opava/` → "Velkoformátový tisk Opava | Visibly"

### Test proti kanibalizaci (Codex musí ověřit u každé dvojice)

- Mají dvě stránky stejný nebo skoro stejný title? → CHYBA, přepsat.
- Říká service a lokální stránka v hlavním obsahu totéž? → CHYBA, lokální musí mít vlastní úhel.
- Každá lokální stránka MUSÍ interně odkazovat na svou service stránku.

---

## 3. Hlavní rozdělení služeb — tři pilíře

Služby nedělit jako jeden dlouhý seznam. Web stojí na třech pilířích, každý má rozcestník.

> **Rozcestník = krátká stránka:** hero, pár vět o pilíři, dlaždice odkazů na service stránky, CTA.
> Rozcestník NEMÁ hluboký obsah — ten patří na service stránky pod ním. Tím se rozcestník
> a první service stránka nebijí.

### Pilíř 1: Tisk — `/tisk/` (rozcestník)

Service podstránky:

- `/velkoformatovy-tisk/`
- `/bannery-a-reklamni-plachty/`
- `/samolepky-a-folie/`
- `/roll-upy/`
- `/plakaty/`
- `/billboardy-a-citylighty/`
- `/tiskoviny/`
- `/pos-materialy/`

### Pilíř 2: Polepy — `/polepy/` (rozcestník)

Service podstránky:

- `/polepy-aut/`
- `/celopolepy-aut/`
- `/polepy-dodavek/`
- `/polepy-vyloh/`
- `/interierove-polepy/`
- `/rezana-grafika/`

### Pilíř 3: Reklama / reklamní výroba — `/reklama/` (rozcestník)

> **OPRAVA:** Původně byla pod `/reklama/` ještě samostatná `/reklamni-vyroba/`, což
> je pro Google i návštěvníka prakticky totéž. `/reklamni-vyroba/` se RUŠÍ jako samostatná
> service stránka — její obsah (přehled výroby) se sloučí do rozcestníku `/reklama/`.
> Pilíř pak vede rovnou na konkrétní výrobky níže.

Service podstránky:

- `/reklamni-cedule/`
- `/svetelna-reklama/`
- `/3d-loga-a-napisy/`
- `/venkovni-reklama/`
- `/interierova-reklama/`
- `/orientacni-systemy/`
- `/reklamni-predmety-a-textil/`

---

## 4. Hlavní navigace

Horní menu drží minimalistickou strukturu:

```text
Tisk
Polepy
Reklama
Realizace
Technologie
O nás
Kontakt
```

Primární CTA vpravo + klikatelný telefon:

```text
☎ 603 750 631      Poptat výrobu
```

> **DOPLNĚNO:** telefon dát klikatelný do hlavičky (dnes je jen v patičce).
> Na mobilu `tel:` odkaz. Velká část poptávek u lokálního tisku přijde telefonem.

Footer je hlubší a nese SEO odkazy.

### Footer — doporučená struktura

#### Tisk
- Velkoformátový tisk / Bannery / Samolepky a fólie / Roll-upy / Plakáty / Tiskoviny

#### Polepy
- Polepy aut / Celopolepy aut / Polepy dodávek / Polepy výloh / Interiérové polepy

#### Reklama
- Reklamní cedule / Světelná reklama / 3D loga / Venkovní reklama / Interiérová reklama

#### Lokality
- Opava / Ostrava / Moravskoslezský kraj

#### Doplňkové (jen footer, ne menu)
- Grafika a vizuální identita / Webdesign / Reklamní plochy Opava / Průvodce

---

## 5. Mimo tři pilíře (existují, ale ne v hlavním menu)

```text
/grafika-a-vizualni-identita/
/logo-a-vizualni-identita/
/graficke-navrhy-pro-tisk/
/webdesign/
/reklamni-plochy-opava/
```

> **OPRAVA:** `/reklamni-plochy-opava/` je lokální SEO stránka a patří jen sem (jednou).
> V původním dokumentu byla uvedená na dvou místech.

Grafiku komunikovat jako podporu tisku a výroby:

> Připravíme grafiku tak, aby fungovala na banneru, autě, výloze, ceduli i světelné reklamě.

Webdesign ponechat jako doplňkovou službu, ne hlavní pilíř.

---

## 6. Realizace — kategorie i detail

```text
/realizace/
/realizace/polepy-aut/
/realizace/velkoformatovy-tisk/
/realizace/svetelna-reklama/
/realizace/3d-loga/
/realizace/reklamni-cedule/
/realizace/polepy-vyloh/
/realizace/[nazev-realizace]/
```

> **DOPLNĚNO — pravidlo proti tenkému obsahu:** Každá kategorie realizací (`/realizace/polepy-aut/`)
> MUSÍ mít vlastní úvodní odstavec (2–4 věty) a vlastní title. Když je to jen výpis fotek
> bez textu, Google ji bere jako tenký obsah a může ji ignorovat. Kategorii zakládat až
> ve chvíli, kdy do ní máš aspoň 2–3 reálné realizace.

---

## 7. Technologie

```text
/technologie/
/technologie/epson-surecolor-s80610/   (až později, nepovinné)
```

Zatím stačí `/technologie/`. Detail tiskárny přidat později.

---

## 8. KONFLIKT homepage vs /tiskarna-opava/ — řešení

> **OPRAVA — nejdůležitější lokální rozhodnutí:**
> Homepage má title "Visibly — tiskárna a reklamní studio Opava" a cílí na "tiskárna Opava".
> Samostatná `/tiskarna-opava/` by cílila na totéž → konflikt o nejdůležitější frázi města.
>
> **Doporučení: `/tiskarna-opava/` NEZAKLÁDAT jako samostatnou stránku.** Hlavní lokální
> frázi "tiskárna Opava" drží homepage. Lokální vrstva pak pokrývá konkrétní služby
> ("velkoformátový tisk Opava", "polepy aut Opava"), kde homepage necílí a kanibalizace nehrozí.
>
> Pokud bys `/tiskarna-opava/` přesto chtěl, musí mít jiný záměr než homepage
> (např. čistě lokální rozcestník s mapou, otevírací dobou, realizacemi z Opavy)
> a homepage by pak NEMĚLA mít "Opava" v title. Jedno z dvou, ne obojí.

---

## 9. Lokální SEO stránky

Lokální stránky nestavět jako duplicitní spam. Každá MUSÍ mít vlastní text, vlastní intro,
vlastní FAQ a ideálně vlastní realizace z okolí.

### Opava — priorita 1 (title VŽDY s městem)

```text
/velkoformatovy-tisk-opava/
/polepy-aut-opava/
/reklamni-vyroba-opava/
/svetelna-reklama-opava/
/3d-loga-opava/
/reklamni-cedule-opava/
/bannery-opava/
/tisk-samolepek-opava/
/polepy-vyloh-opava/
/reklamni-plochy-opava/
```

### Ostrava — priorita 2 (až budou realizace z okolí)

```text
/velkoformatovy-tisk-ostrava/
/polepy-aut-ostrava/
/reklamni-vyroba-ostrava/
/svetelna-reklama-ostrava/
/3d-loga-ostrava/
/reklamni-cedule-ostrava/
/bannery-ostrava/
/tisk-samolepek-ostrava/
/polepy-vyloh-ostrava/
```

### Moravskoslezský kraj — priorita 3

```text
/velkoformatovy-tisk-moravskoslezsky-kraj/
/polepy-aut-moravskoslezsky-kraj/
/reklamni-vyroba-moravskoslezsky-kraj/
/svetelna-reklama-moravskoslezsky-kraj/
/3d-loga-moravskoslezsky-kraj/
```

---

## 10. Doporučené pořadí tvorby — méně, ale silných stránek

> **DOPLNĚNO — tvrdé pravidlo:** NESTAVĚT všech 60+ stránek najednou. Deset silných stránek
> přinese víc zakázek než šedesát tenkých, které si berou pozice navzájem. Stránku zakládat
> jen když má reálný obsah a reálné realizace. Prázdné lokální stránky pro Ostravu škodí víc
> než pomáhají.

### Fáze 1 — základ webu

```text
/   /tisk/   /polepy/   /reklama/   /realizace/   /technologie/   /o-nas/   /kontakt/
```

### Fáze 2 — hlavní SEO služby (jen ty s realizacemi)

```text
/velkoformatovy-tisk/   /polepy-aut/   /svetelna-reklama/   /3d-loga-a-napisy/
/reklamni-cedule/   /bannery-a-reklamni-plachty/   /samolepky-a-folie/
/polepy-vyloh/   /tiskoviny/
```

### Fáze 3 — Opava dominance

```text
/velkoformatovy-tisk-opava/   /polepy-aut-opava/   /reklamni-vyroba-opava/
/svetelna-reklama-opava/   /3d-loga-opava/   /reklamni-cedule-opava/
/bannery-opava/   /tisk-samolepek-opava/   /polepy-vyloh-opava/   /reklamni-plochy-opava/
```

### Fáze 4 — Ostrava (až budou realizace z okolí)
### Fáze 5 — Moravskoslezský kraj

---

## 11. Struktura každé SERVICE stránky (Vrstva A)

1. Hero — H1 bez města, krátký perex, CTA
2. Co služba zahrnuje — karty/odrážky
3. Pro koho je — firmy, provozovny, řemeslníci, obchody, eventy
4. Jak probíhá realizace — zadání → návrh → tisk/výroba → instalace
5. Proč Visibly — vlastní výroba, technologie (Epson, syté barvy), kontrola kvality
6. Ukázky realizací
7. FAQ — 4–6 otázek
8. CTA — poptávka
9. Interní odkazy: na rozcestník pilíře + na lokální verzi ("Hledáte to v Opavě?")

## 12. Struktura každé LOKÁLNÍ stránky (Vrstva B)

1. Hero — H1 S MĚSTEM, perex se zmínkou lokality, CTA
2. Co nabízíme v [město] — krátce, odkaz na service stránku pro detail
3. Proč lokálně — osobní předání, rychlá domluva, vlastní výroba v regionu
4. Realizace z okolí — jakmile budou
5. FAQ specifické pro službu/lokalitu
6. Mapa / kontakt
7. CTA
8. Interní odkaz na service stránku (povinné)

> Opava zdůrazňuje: lokální dostupnost, rychlou domluvu, osobní předání, reklamní plochy v Opavě.
> Ostrava zdůrazňuje: firemní provozy, flotily, showroomy, výrobní a stavební firmy.

---

## 13. Meta titles a descriptions — OPRAVENÉ (bez kanibalizace)

### Hlavní stránky

| URL | Title | Meta description |
|---|---|---|
| `/` | Visibly — tiskárna a reklamní studio Opava | Tiskneme a vyrábíme reklamu pro firmy. Velkoformátový tisk, polepy aut, světelná reklama, 3D loga a tiskoviny v Opavě. |
| `/tisk/` | Tisk pro firmy \| Visibly | Bannery, fólie, samolepky, plakáty, roll-upy i tiskoviny. Vlastní výroba, výrazné barvy a rychlé zpracování. |
| `/polepy/` | Reklamní polepy aut, výloh i interiérů \| Visibly | Navrhneme, vytiskneme a aplikujeme polepy aut, dodávek, výloh i interiérů. Vlastní tisk a precizní zpracování. |
| `/reklama/` | Reklamní výroba od návrhu po montáž \| Visibly | Cedule, světelné reklamy, 3D loga, orientační systémy a označení provozoven. Reklama pro interiér i exteriér. |
| `/realizace/` | Realizace reklamy a tisku \| Visibly | Prohlédněte si realizace: velkoformátový tisk, polepy aut, světelné reklamy, 3D loga, cedule a výlohy. |
| `/technologie/` | Technologie tisku a reklamní výroby \| Visibly | Vlastní velkoformátový tisk, řezací ploter, laminace. Díky vlastní výrobě držíme kvalitu pod kontrolou. |
| `/o-nas/` | O nás \| Visibly | Visibly je tiskárna a výrobní reklamní studio z Opavy. Spojujeme zkušenosti z tisku, reklamy a vlastní výroby. |
| `/kontakt/` | Kontakt \| Visibly Opava | Poptávka tisku a reklamní výroby v Opavě — velkoformátový tisk, polepy aut, 3D loga a světelná reklama. |

### Service stránky — title BEZ města (KLÍČOVÁ OPRAVA)

| URL | Title (NOVÝ, bez města) | Cílí na |
|---|---|---|
| `/velkoformatovy-tisk/` | Velkoformátový tisk pro firmy \| Visibly | velkoformátový tisk |
| `/bannery-a-reklamni-plachty/` | Bannery a reklamní plachty \| Visibly | bannery, reklamní plachty |
| `/samolepky-a-folie/` | Tisk samolepek a fólií \| Visibly | tisk samolepek |
| `/roll-upy/` | Roll-up bannery \| Visibly | roll-up |
| `/plakaty/` | Tisk plakátů \| Visibly | tisk plakátů |
| `/billboardy-a-citylighty/` | Tisk billboardů a citylightů \| Visibly | billboardy |
| `/tiskoviny/` | Tiskoviny pro firmy \| Visibly | tiskoviny |
| `/pos-materialy/` | POS materiály a reklama do prodejen \| Visibly | POS materiály |
| `/polepy-aut/` | Polepy aut a dodávek \| Visibly | polepy aut |
| `/svetelna-reklama/` | Světelná reklama a LED loga \| Visibly | světelná reklama |
| `/3d-loga-a-napisy/` | 3D loga a prostorové nápisy \| Visibly | 3D loga |
| `/reklamni-cedule/` | Reklamní cedule a firemní označení \| Visibly | reklamní cedule |

> **Pozor:** Původní dokument dával `/velkoformatovy-tisk/` title "Velkoformátový tisk Opava".
> To bylo IDENTICKÉ s `/velkoformatovy-tisk-opava/`. Proto je tu město odstraněno.

### Lokální stránky — title S MĚSTEM

| URL | Title (s městem) | Cílí na |
|---|---|---|
| `/velkoformatovy-tisk-opava/` | Velkoformátový tisk Opava \| Visibly | velkoformátový tisk Opava |
| `/polepy-aut-opava/` | Polepy aut Opava \| Visibly | polepy aut Opava |
| `/svetelna-reklama-opava/` | Světelná reklama Opava \| Visibly | světelná reklama Opava |
| `/3d-loga-opava/` | 3D loga Opava \| Visibly | 3D loga Opava |
| `/reklamni-cedule-opava/` | Reklamní cedule Opava \| Visibly | reklamní cedule Opava |
| `/bannery-opava/` | Bannery Opava \| Reklamní plachty Visibly | bannery Opava |
| `/tisk-samolepek-opava/` | Tisk samolepek Opava \| Visibly | tisk samolepek Opava |
| `/polepy-vyloh-opava/` | Polepy výloh Opava \| Visibly | polepy výloh Opava |
| `/reklamni-vyroba-opava/` | Reklamní výroba Opava \| Visibly | reklamní výroba Opava |
| `/reklamni-plochy-opava/` | Reklamní plochy k pronájmu v Opavě \| Visibly | reklamní plochy Opava |

(Ostrava a kraj: stejný vzor "Služba Město | Visibly", obsah vždy lokálně jiný.)

---

## 14. SEO a technické požadavky pro Codex

Každá stránka musí mít:

- jeden H1
- unikátní title (ověř proti tabulce výše — žádné dva stejné)
- unikátní meta description
- logickou strukturu H2/H3
- interní odkazy na relevantní stránky (service ↔ lokální, vždy)
- CTA v hero sekci i na konci
- relevantní alt texty obrázků
- čistou URL
- obsah v češtině
- minimalistický, suverénní, přátelský tón

CTA používat:

```text
Poptat výrobu / Poptat tisk / Poptat polep / Poptat reklamu
Chci podobné řešení / Prohlédnout realizace / Poznat technologii
```

CTA nepoužívat: "Více informací", "Klikněte zde".

---

## 15. Tři nejčastější chyby, kterým se vyhnout

1. **Jedna stránka `/sluzby/` na všechno.** → Místo toho rozcestník + service landing pages.
2. **Service a lokální stránka se stejným title.** → Service bez města, lokální s městem.
3. **Hodně tenkých stránek místo mála silných.** → Zakládat jen stránky s reálným obsahem.

Správná architektura:

```text
/tisk/ = rozcestník
/velkoformatovy-tisk/ = service landing (bez města, celá ČR)
/velkoformatovy-tisk-opava/ = lokální landing (s městem, Opava)
```

---

## 16. Práce s Circle Webflow exportem

- nezakládat web od nuly, maximálně využít existující sekce, classy, gridy, animace
- CMS prvky a Collection listy přepsat na statické HTML karty
- zachovat minimalistický styl Circle (hodně bílého prostoru, krátké úderné texty)
- služby a realizace jako statické HTML bloky
- později lze přidat JSON/CMS, teď cíl = rychlý a funkční statický web

---

## 17. Finální opravená sitemapa v jednom bloku

```text
/                                  (homepage, drží "tiskárna Opava")

/tisk/                             (rozcestník)
/velkoformatovy-tisk/
/bannery-a-reklamni-plachty/
/samolepky-a-folie/
/roll-upy/
/plakaty/
/billboardy-a-citylighty/
/tiskoviny/
/pos-materialy/

/polepy/                           (rozcestník)
/polepy-aut/
/celopolepy-aut/
/polepy-dodavek/
/polepy-vyloh/
/interierove-polepy/
/rezana-grafika/

/reklama/                          (rozcestník, pohltil /reklamni-vyroba/)
/reklamni-cedule/
/svetelna-reklama/
/3d-loga-a-napisy/
/venkovni-reklama/
/interierova-reklama/
/orientacni-systemy/
/reklamni-predmety-a-textil/

/grafika-a-vizualni-identita/      (footer, ne menu)
/logo-a-vizualni-identita/
/graficke-navrhy-pro-tisk/
/webdesign/

/realizace/                        (kategorie jen s vlastním textem)
/realizace/polepy-aut/
/realizace/velkoformatovy-tisk/
/realizace/svetelna-reklama/
/realizace/3d-loga/
/realizace/reklamni-cedule/
/realizace/polepy-vyloh/

/technologie/
/o-nas/
/kontakt/

# Lokální vrstva — title vždy s městem, vlastní obsah
/velkoformatovy-tisk-opava/
/polepy-aut-opava/
/reklamni-vyroba-opava/
/svetelna-reklama-opava/
/3d-loga-opava/
/reklamni-cedule-opava/
/bannery-opava/
/tisk-samolepek-opava/
/polepy-vyloh-opava/
/reklamni-plochy-opava/

# Ostrava + kraj: až budou realizace z okolí (fáze 4–5)
/velkoformatovy-tisk-ostrava/  /polepy-aut-ostrava/  /reklamni-vyroba-ostrava/
/svetelna-reklama-ostrava/  /3d-loga-ostrava/  /reklamni-cedule-ostrava/
/bannery-ostrava/  /tisk-samolepek-ostrava/  /polepy-vyloh-ostrava/
/velkoformatovy-tisk-moravskoslezsky-kraj/  /polepy-aut-moravskoslezsky-kraj/
/reklamni-vyroba-moravskoslezsky-kraj/  /svetelna-reklama-moravskoslezsky-kraj/
/3d-loga-moravskoslezsky-kraj/

# NEZAKLÁDAT: /tiskarna-opava/ (kanibalizuje homepage — viz sekce 8)
# NEZAKLÁDAT: /reklamni-vyroba/ (sloučeno do /reklama/ — viz sekce 3)
```
