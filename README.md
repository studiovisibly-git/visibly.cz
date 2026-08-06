# visibly.cz

Nový web tiskárny a reklamního studia **Visibly** (Opava). Next.js (App Router) + React,
statické generování, Satoshi, vlastní design systém.

## Vývoj

```bash
npm install
npm run dev      # http://localhost:3000
```

## Produkční build

```bash
npm run build
npm run start
```

Build je statický (SSG) — 74 stránek. Výjimkou je katalog textilu: produktové adresy
(`/reklama/reklamni-textil/katalog-malfini/<kód>/<barva>`) se vykreslují na vyžádání a drží
se v cache 12 h, protože kombinací produkt × barva jsou přes tři tisíce. Vhodné pro Vercel,
Netlify i libovolný Node hosting; statický export (`output: "export"`) kvůli tomu nejde.

## Struktura

- `app/` — stránky (App Router), `sitemap.ts`, `robots.ts`
- `components/` — sdílené komponenty (Hero, FinalCta, ParallaxHeading, Sections, Header, Footer…)
- `lib/` — data a konfigurace
  - `site.ts` — kontakt, adresa, GPS
  - `schema.ts` — LocalBusiness / Service structured data (areaServed: celý MS kraj + Ostrava)
  - `nav.ts`, `services-*.ts`, `guides-*.ts`, `works.ts`, `clients.ts`
- `styles/` — `globals.css` (tokeny), `site.css` (komponenty)
- `public/` — obrázky (`/images`), loga klientů (`/logos`), video (`/video`), logo `visibly-logo.svg`
- `app/fonts/` — Satoshi (Medium 500, Bold 700)

## Odkazy do katalogu textilu

Výběr v katalogu je celý v adrese, takže se dá poslat mailem i do chatu.
Parametry se dají libovolně kombinovat a vynechávat:

| parametr | co znamená | příklady |
|---|---|---|
| `komu` | skupina | `panske`, `unisex`, `damske`, `detske` |
| `typ` | typ oblečení | `tricka`, `polokosile`, `mikiny`, `bundy-vesty` |
| `znacka` | značka | `malfini`, `malfini-premium`, `rimeck`, `puma` |
| `barva` | barva | `cervena`, `bila`, `namorni-modra` |
| `cena` | cena za kus bez DPH | `do-150`, `150-300`, `300-600`, `nad-600` |
| `hledat` | fulltext v názvu a kódu | `basic` |

```
/reklama/reklamni-textil/katalog-malfini?typ=tricka&barva=cervena
/reklama/reklamni-textil/katalog-malfini?typ=mikiny&znacka=rimeck&cena=300-600
```

Hodnoty se odvozují z názvů, které posílá dodavatel — nedrží se ručně. Kde je
název dvojznačný (tři různé „bílé"), dostane ho ta nejpočetnější volba a na
zbylé zbude kód dodavatele. Kód se dá napsat i ručně (`?barva=07`) a adresa se
sama přepíše do čitelného tvaru. Nesmysl se tiše zahodí.

Jednotlivý produkt má vlastní adresu `…/katalog-malfini/<kód>/<barva>`. Z mřížky
se otevírá v modálu (zachycená trasa), přímý odkaz vede na celou stránku.

## SEO

- Unikátní `title` + `description` + `canonical` na každé stránce
- OpenGraph + Twitter karty
- `sitemap.xml`, `robots.txt` generované z route mapy
- Structured data: `LocalBusiness` + `ProfessionalService` (homepage, kontakt),
  `Service` (podstránky), `FAQPage`, `BreadcrumbList`, `WebSite`, `Article` (průvodce)
- `areaServed` pokrývá celý Moravskoslezský kraj (Opava, **Ostrava**, Krnov, Havířov,
  Karviná, Frýdek-Místek, Nový Jičín, Bruntál a další) + ČR
- Kanonická doména `https://www.visibly.cz` (apex → www redirect v `next.config.ts`)
- Produktové stránky katalogu textilu mají `noindex` — existují kvůli sdílení odkazu,
  obsah je dodavatelův. Záměrně **ne** přes `robots.txt`: zákaz procházení by vyhledávači
  zabránil tu hlavičku vůbec uvidět.

## Co ještě doplnit

- Fotografie na podstránkách (kruhové hero fotky) — zatím placeholder „Fotografie připravujeme".
  Stačí doplnit `src` v příslušných datech (`lib/services-*.ts`, `lib/works.ts`).
- Otevírací doba do `lib/schema.ts` (`openingHoursSpecification`) — záměrně nevyplněno.
- Horní infolišta hlásí „web se dolaďuje"; text je v `components/Header.tsx`.
