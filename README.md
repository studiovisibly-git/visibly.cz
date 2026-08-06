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
