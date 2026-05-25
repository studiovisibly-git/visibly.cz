const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const siteUrl = "https://www.visibly.cz";
const business = require(path.join(rootDir, "data", "schema-business.json"));

const ignoredPathPatterns = [
  /^partials\//,
  /^home\//,
  /^pages\//,
  /^information\//,
  /^detail_.*\.html$/,
  /^checkout\.html$/,
  /^paypal-checkout\.html$/,
  /^order-confirmation\.html$/,
  /^401\.html$/,
  /^404\.html$/,
];

const breadcrumbLabelMap = {
  "": "Domů",
  tisk: "Tisk",
  polepy: "Polepy",
  reklama: "Reklama",
  realizace: "Realizace",
  technologie: "Technologie",
  "o-nas": "O nás",
  kontakt: "Kontakt",
  cookies: "Cookies",
  pruvodce: "Průvodce",
  "mapa-webu": "Mapa webu",
  "ps-green": "PS Green",
  linealux: "LineaLux",
  reformlab: "ReformLab",
  "rezani-betonu": "Řezání betonu",
};

const serviceCatalogs = {
  "/tisk/": {
    name: "Tiskové služby",
    serviceType: "Tisk",
    offers: [
      "Velkoformátový tisk",
      "Bannery a reklamní plachty",
      "Samolepky a fólie",
      "Fotoobrazy",
      "Plakáty",
      "Tiskoviny a POS materiály",
      "Roll-upy",
      "Etikety",
      "Tisk fotografií",
    ],
  },
  "/polepy/": {
    name: "Polepy aut, výloh a prostorů",
    serviceType: "Reklamní polepy",
    offers: [
      "Polepy aut",
      "Polepy dodávek",
      "Polepy výloh",
      "Polepy dveří a skel",
      "Interiérové polepy",
      "Řezaná grafika",
      "Samolepky a fólie",
      "Mléčné fólie",
      "Aplikace polepů",
    ],
  },
  "/reklama/": {
    name: "Reklamní výroba",
    serviceType: "Reklamní výroba",
    offers: [
      "Reklamní cedule",
      "Světelná reklama",
      "3D loga a nápisy",
      "Venkovní reklama",
      "Interiérová reklama",
      "Orientační systémy",
      "Reklamní předměty a textil",
    ],
  },
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "node_modules") {
        return [];
      }

      return walk(fullPath);
    }

    return entry.isFile() && entry.name.endsWith(".html") ? [fullPath] : [];
  });
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function isIgnored(relativePath) {
  return ignoredPathPatterns.some((pattern) => pattern.test(relativePath));
}

function hasCleanUrlCopy(relativePath) {
  if (!relativePath.endsWith(".html") || relativePath === "index.html") {
    return false;
  }

  const withoutExt = relativePath.replace(/\.html$/, "");
  return fs.existsSync(path.join(rootDir, withoutExt, "index.html"));
}

function toPublicPath(relativePath) {
  if (relativePath === "index.html") {
    return "/";
  }

  if (relativePath.endsWith("/index.html")) {
    return `/${relativePath.replace(/\/index\.html$/, "/")}`;
  }

  if (hasCleanUrlCopy(relativePath)) {
    return `/${relativePath.replace(/\.html$/, "/")}`;
  }

  return `/${relativePath.replace(/\.html$/, "/")}`;
}

function canonicalUrl(publicPath) {
  return `${siteUrl}${publicPath}`;
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function getMeta(html, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`<meta\\s+[^>]*${escaped}[^>]*content=["']([^"']*)["'][^>]*>`, "i");
  const reversePattern = new RegExp(`<meta\\s+[^>]*content=["']([^"']*)["'][^>]*${escaped}[^>]*>`, "i");
  const match = html.match(pattern) || html.match(reversePattern);
  return match ? match[1].trim() : "";
}

function getTitle(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match ? stripTags(match[1]) : business.name;
}

function getDescription(html) {
  return getMeta(html, 'name="description"') || getMeta(html, "name='description'");
}

function getImage(html) {
  return getMeta(html, 'property="og:image"') || getMeta(html, 'property="twitter:image"') || business.image || undefined;
}

function humanizeSegment(segment) {
  return breadcrumbLabelMap[segment] || segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getBreadcrumbItems(publicPath) {
  if (publicPath === "/") {
    return [{ name: "Domů", item: `${siteUrl}/` }];
  }

  const segments = publicPath.replace(/^\/|\/$/g, "").split("/");
  const items = [{ name: "Domů", item: `${siteUrl}/` }];
  let current = "";

  segments.forEach((segment) => {
    current += `/${segment}`;
    items.push({
      name: humanizeSegment(segment),
      item: `${siteUrl}${current}/`,
    });
  });

  return items;
}

function buildBusinessEntity() {
  const entity = {
    "@type": business.schemaTypes || ["LocalBusiness", "ProfessionalService", "PrintShop"],
    "@id": `${siteUrl}/#business`,
    name: business.name,
    legalName: business.legalName,
    alternateName: business.alternateName,
    description: business.description,
    url: business.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#logo`,
      url: business.logo,
    },
    email: business.email,
    telephone: business.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.telephone,
      email: business.email,
      contactType: "customer service",
      areaServed: "CZ",
      availableLanguage: ["cs"],
    },
    hasMap: business.hasMap,
    sameAs: business.sameAs,
    areaServed: business.areaServed.map((name) => ({ "@type": "Place", name })),
    knowsAbout: business.knowsAbout,
    makesOffer: business.services.map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        provider: { "@id": `${siteUrl}/#business` },
      },
    })),
  };

  if (business.image) {
    entity.image = business.image;
  }

  return entity;
}

function buildWebsiteEntity() {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: business.alternateName,
    alternateName: business.name,
    publisher: { "@id": `${siteUrl}/#business` },
    inLanguage: "cs-CZ",
  };
}

function buildBreadcrumbEntity(publicPath) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl(publicPath)}#breadcrumb`,
    itemListElement: getBreadcrumbItems(publicPath).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

function getPageType(publicPath) {
  if (publicPath === "/kontakt/") return "ContactPage";
  if (publicPath.startsWith("/pruvodce/") && publicPath !== "/pruvodce/") return "Article";
  if (publicPath.startsWith("/realizace/") && publicPath !== "/realizace/") return "CreativeWork";
  return "WebPage";
}

function buildWebPageEntity(publicPath, title, description, pageType, image) {
  const entity = {
    "@type": pageType === "ContactPage" ? "ContactPage" : "WebPage",
    "@id": `${canonicalUrl(publicPath)}#webpage`,
    url: canonicalUrl(publicPath),
    name: title,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#business` },
    breadcrumb: { "@id": `${canonicalUrl(publicPath)}#breadcrumb` },
    inLanguage: "cs-CZ",
  };

  if (image) {
    entity.primaryImageOfPage = {
      "@type": "ImageObject",
      url: image,
    };
  }

  return entity;
}

function buildServiceEntity(publicPath, title, description) {
  const catalog = serviceCatalogs[publicPath];
  if (!catalog) return null;

  return {
    "@type": "Service",
    "@id": `${canonicalUrl(publicPath)}#service`,
    name: catalog.name || title,
    description,
    serviceType: catalog.serviceType,
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: business.areaServed.map((name) => ({ "@type": "Place", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: catalog.name,
      itemListElement: catalog.offers.map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          provider: { "@id": `${siteUrl}/#business` },
        },
      })),
    },
  };
}

function getArticleDate(html, fallback) {
  const timeMatch = html.match(/<time[^>]*datetime=["']([^"']+)["'][^>]*>/i);
  if (timeMatch) return timeMatch[1];
  return fallback;
}

function buildArticleEntity(publicPath, html, title, description, image) {
  const date = getArticleDate(html, "2026-05-25");

  return {
    "@type": "Article",
    "@id": `${canonicalUrl(publicPath)}#article`,
    mainEntityOfPage: { "@id": `${canonicalUrl(publicPath)}#webpage` },
    headline: title.replace(/\s+\|\s+Visibly.*$/, ""),
    description,
    image,
    author: { "@id": `${siteUrl}/#business` },
    publisher: { "@id": `${siteUrl}/#business` },
    datePublished: date,
    dateModified: date,
    inLanguage: "cs-CZ",
  };
}

function buildCreativeWorkEntity(publicPath, title, description, image) {
  const entity = {
    "@type": "CreativeWork",
    "@id": `${canonicalUrl(publicPath)}#creativework`,
    name: title.replace(/\s+[—|]\s+.*$/, ""),
    description,
    url: canonicalUrl(publicPath),
    creator: { "@id": `${siteUrl}/#business` },
    provider: { "@id": `${siteUrl}/#business` },
    locationCreated: {
      "@type": "Place",
      name: "Opava",
    },
    inLanguage: "cs-CZ",
  };

  if (image) {
    entity.image = image;
  }

  return entity;
}

function buildSchema(relativePath, html) {
  const publicPath = toPublicPath(relativePath);
  const title = getTitle(html);
  const description = getDescription(html);
  const image = getImage(html);
  const pageType = getPageType(publicPath);
  const graph = [
    buildBusinessEntity(),
    buildWebsiteEntity(),
    buildWebPageEntity(publicPath, title, description, pageType, image),
    buildBreadcrumbEntity(publicPath),
  ];

  const serviceEntity = buildServiceEntity(publicPath, title, description);
  if (serviceEntity) {
    graph.push(serviceEntity);
    graph[2].mainEntity = { "@id": serviceEntity["@id"] };
  }

  if (pageType === "Article") {
    const article = buildArticleEntity(publicPath, html, title, description, image);
    graph.push(article);
    graph[2].mainEntity = { "@id": article["@id"] };
  }

  if (pageType === "CreativeWork") {
    const creativeWork = buildCreativeWorkEntity(publicPath, title, description, image);
    graph.push(creativeWork);
    graph[2].mainEntity = { "@id": creativeWork["@id"] };
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function schemaScript(schema) {
  return `  <script type="application/ld+json">\n${JSON.stringify(schema, null, 2)
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n")}\n  </script>`;
}

function replaceSchema(html, schema) {
  const script = schemaScript(schema);
  const withoutSchema = html.replace(/\n?\s*<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "");

  if (!/<\/head>/i.test(withoutSchema)) {
    return withoutSchema;
  }

  return withoutSchema.replace(/<\/head>/i, `${script}\n</head>`);
}

const files = walk(rootDir)
  .map((filePath) => ({
    filePath,
    relativePath: toPosix(path.relative(rootDir, filePath)),
  }))
  .filter(({ relativePath }) => !isIgnored(relativePath));

let updatedCount = 0;

files.forEach(({ filePath, relativePath }) => {
  const html = fs.readFileSync(filePath, "utf8");
  const schema = buildSchema(relativePath, html);
  const nextHtml = replaceSchema(html, schema);

  if (nextHtml !== html) {
    fs.writeFileSync(filePath, nextHtml);
    updatedCount += 1;
  }
});

console.log(`Generated schema.org JSON-LD for ${updatedCount} HTML files.`);
