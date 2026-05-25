# Visibly / Circle Webflow Export — Agent Instructions

## Required confirmation

Before editing any file, always write this exact line in your plan:

AGENTS.md přečten — pracuji podle pravidel Visibly.

Then summarize:
- whether header/footer are involved,
- whether partial sync is needed,
- which files will be edited.

## Project goal
This project is a static HTML/CSS/JS export of the Circle Webflow template. The goal is to adapt the template into a premium minimalist website for Visibly, a print shop and advertising production studio from Opava.

## Core rule
Do not rebuild the website from scratch. Reuse the existing Webflow export structure, CSS classes, layout system, animations, interactions, and components as much as possible.

## Brand positioning
Visibly is a print shop and advertising production studio, not a generic marketing agency.

Main message:
“Tiskneme a vyrábíme reklamu, která je vidět.”

## Design rules
- Preserve the Circle template visual style.
- Preserve minimalist spacing, typography, grids, animations, and transitions.
- Use existing Webflow classes whenever possible.
- Add custom CSS only when necessary.
- If custom CSS is needed, put it into `visibly-custom.css`.
- Do not introduce Tailwind, Bootstrap, React, or other frameworks.

## Content tone
Czech copy. Minimalist, confident, friendly, not pushy.

Avoid:
- mladý dynamický tým
- komplexní řešení na míru
- individuální přístup
- vaše sny proměníme ve skutečnost

Prefer:
- Vlastní tisk.
- Vlastní výroba.
- Výrazný výsledek.
- Od návrhu po hotovou reklamu.

## Required pages
- index.html
- tisk.html
- reklama.html
- polepy.html
- realizace.html
- technologie.html
- o-nas.html
- kontakt.html

## Navigation
Tisk
Reklama
Polepy
Realizace
Technologie
O nás
Kontakt

CTA:
Poptat výrobu

## SEO rules
Each page must have:
- one H1 only
- unique title
- unique meta description
- logical H2/H3 hierarchy
- meaningful alt text
- working internal links

## SEO sitemap source

Use `visibly-seo-sitemap.md` as the source of truth for the planned SEO structure, service hierarchy, URL priorities, and future page creation.

When creating or changing service, locality, realization category, technology, or SEO landing pages:
- check the intended page against `visibly-seo-sitemap.md`,
- keep copy and internal links aligned with that structure,
- update `mapa-webu.html` so newly created pages become links and planned pages remain clearly marked as not created yet,
- run `npm run generate:sitemap` so `sitemap.xml` automatically includes newly created public pages,
- if a clean URL directory exists for the page, update its `index.html` copy as well.

## XML sitemap

The XML sitemap is generated from public static HTML pages by `scripts/generate-sitemap.js`.

Do not edit `sitemap.xml` manually. Run:

```text
npm run generate:sitemap
```

The generator must exclude Webflow demo/template pages, checkout/payment pages, error pages, partials, and duplicate `.html` files when a clean URL directory version exists.

## Webflow export rules
- Preserve Webflow-generated class names where possible.
- Preserve `webflow.js` and existing interaction attributes.
- Do not delete Webflow assets unless clearly unused.
- Prefer duplicating existing sections over creating new layouts from scratch.
- Keep the original responsive behavior.
- Do not rewrite the global stylesheet.
- Add only minimal custom CSS overrides.

## Final QA checklist
After implementation, verify:
- The website still looks like the Circle template.
- Header and footer are consistent on all pages.
- All navigation links work.
- All pages are responsive.
- No page has more than one H1.
- CTA buttons work.
- Images have meaningful alt texts.
- Webflow interactions still work.
- No unnecessary frameworks were added.
- Custom CSS is minimal.
- The homepage clearly says Visibly is a print shop and advertising production studio.

## Shared layout rule: header and footer

Header and footer must be treated as shared components.

Do not edit header or footer separately on individual HTML pages.

The single source of truth must be:

- partials/header.html
- partials/footer.html

Every HTML page must contain these markers:

<!-- VISIBLY_HEADER_START -->
... header markup ...
<!-- VISIBLY_HEADER_END -->

<!-- VISIBLY_FOOTER_START -->
... footer markup ...
<!-- VISIBLY_FOOTER_END -->

If the header or footer needs to change:
1. update the matching partial file,
2. run the sync script,
3. verify that all pages received the same header/footer.

Never manually update only one page header/footer.

If a page has a different header/footer, normalize it to the shared partial unless there is a strong documented reason not to.

Do not add a framework.
Do not rewrite the Webflow export.
Do not remove Webflow JS.
Keep the site as static HTML/CSS/JS.  

## Breadcrumb rule

Breadcrumb navigation is not part of the shared header.

Every new HTML page must include:

<nav class="visibly-breadcrumbs" aria-label="Drobečková navigace" data-breadcrumb></nav>

The breadcrumb content must be generated or configured according to the page hierarchy.

When creating a new page, update js/visibly-breadcrumbs.js breadcrumbMap with the correct hierarchy.

Examples:
- tisk.html → Domů / Tisk
- velkoformatovy-tisk.html → Domů / Tisk / Velkoformátový tisk
- polepy-aut.html → Domů / Polepy / Polepy aut
- svetelna-reklama.html → Domů / Reklama / Světelná reklama

Never hardcode the same breadcrumb from index.html across all pages.

## Top Info Bar

Top info bar is a shared component.

Do not create or edit the top info bar separately on individual pages.

Use:
- partials/top-info-bar.html
- markers VISIBLY_TOP_INFO_BAR_START / VISIBLY_TOP_INFO_BAR_END
- shared CSS in css/visibly-custom.css
- shared JS in js/visibly-top-info-bar.js

When changing top info bar content, update only partials/top-info-bar.html and run npm run sync:partials.

The top info bar must sit above the shared header.
On scroll it hides upward and the shared header remains visible at the top.

## Large screen layout rule

Header and all hero sections must use the global Visibly width system.

Use the existing global CSS variables:
- `--visibly-header-max`
- `--visibly-hero-max`
- `--visibly-container-wide-max`
- `--visibly-container-padding-desktop`
- `--visibly-container-padding-tablet`
- `--visibly-container-padding-mobile`

Do not create full-width hero inner content on large monitors.
New pages must use the same header/hero container structure as existing pages.

When creating a new page, reuse existing hero classes and wrappers so the global 4K width limits apply automatically:
- `.navigation` inside `.navigation-wrapper` for header content,
- `.hero` / `.hero.inner` / `.hero._3` for page hero sections,
- direct `.container`, `.container._2`, or `.container._3` children inside hero sections.

If a future hero needs a wider image-led layout, use `--visibly-container-wide-max`; do not bypass the global width system.

## Realization detail template

Project detail pages are based on the shared realization detail template.

Use realizace/ps-green.html as the master structure for future realization detail pages.
Do not create a new layout for every realization.
Only change:
- title
- category
- location
- year/date
- description
- scope
- images
- alt texts
- SEO title
- meta description
- schema
- breadcrumb map entry
- final CTA text if needed

For a new realization:
1. Duplicate realizace/ps-green.html.
2. Rename it to realizace/nazev-realizace.html.
3. Change only the project-specific content listed above.
4. Do not create a new layout.
5. Do not change shared CSS.
6. Do not change global project structure.

## Sticky CTA

Sticky CTA is a shared component.

Do not create custom sticky CTA HTML separately on each page.

Use the shared sticky CTA system:
- data-sticky-cta wrapper
- js/visibly-sticky-cta.js
- shared CSS in visibly-custom.css

Only page-specific values may change:
- data-sticky-text
- data-sticky-phone-label
- data-sticky-phone-url
- data-sticky-button-label
- data-sticky-button-url

When creating a new page, add the sticky CTA wrapper and set page-specific data attributes.
Do not create new sticky CTA layout or page-specific CSS.

## Button animation rule

Every Circle-style CTA button must use the existing `button-circle` structure and include `<div class="button-overlay active"></div>` as the last child inside the link.

Do not create custom button layouts for article CTAs, sticky CTAs, final CTAs, service CTAs, or future pages unless there is a strong documented reason.

The shared circle hover animation is defined globally in `css/visibly-custom.css`; future buttons should inherit it by reusing the existing Circle button classes.

## Git workflow

Do not automatically create commits.
Do not automatically push changes to GitHub.

Commits and pushes are allowed only after an explicit user request, for example:
- "commitni to"
- "pošli to do gitu"
- "pushni na GitHub"

During normal implementation work, leave changes as local uncommitted modifications.

## Realization Detail Sticky CTA

Every realization detail page must include the shared sticky CTA wrapper.

Default values for realization detail pages:
- data-sticky-text="Líbí se vám tahle realizace?"
- data-sticky-phone-label="Zavolat"
- data-sticky-phone-url="tel:+420603750631"
- data-sticky-button-label="Poptat podobné"
- data-sticky-button-url="/kontakt.html"

Do not create custom sticky CTA HTML for individual realization detail pages.
Use only the shared data-sticky-cta system.

When creating a new realization detail:
1. Duplicate realizace/ps-green.html.
2. Keep the shared sticky CTA wrapper.
3. Change only data attribute text if the specific realization truly needs it.
4. Do not change sticky CTA design, CSS, or JS for individual details.

## Article detail template

Use pruvodce/jak-pripravit-data-pro-tisk.html as the master article detail template.

For each new article:
1. Duplicate the master article file.
2. Rename it to pruvodce/nazev-clanku.html.
3. Change only:
   - title
   - category
   - date
   - intro
   - article body
   - CTA blocks
   - image paths
   - alt texts
   - SEO title
   - meta description
   - Open Graph tags
   - schema.org JSON-LD
   - breadcrumbMap entry
4. Do not create a new layout.
5. Do not change shared CSS.
6. Do not change the post template structure.
7. Every article must include clear contextual CTA buttons using existing Circle button styles.
8. Every article must include the shared sticky CTA wrapper using data-sticky-cta.

## Page hero component

Page hero is a shared component.

Use the hero from tisk.html as the master visual reference.

Do not create custom page hero HTML separately on individual pages.

Every service/page hero must use the shared data-page-hero system.

Allowed page-specific values:
- data-hero-title
- data-hero-kicker
- data-hero-scroll-text
- data-hero-text
- data-hero-button-label
- data-hero-button-url

Use | in data-hero-title to control line breaks.

When creating a new service page, always use the shared page hero component.
