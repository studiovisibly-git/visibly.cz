import { allServices } from "./services";
import {
  ADDRESS_CITY,
  ADDRESS_STREET,
  EMAIL,
  GEO_LAT,
  GEO_LNG,
  MAPS_URL,
  SITE_URL,
} from "./site";

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const POSTAL_CODE = "746 01";
export const PHONE_INTL = "+420603750631";

/** Obsluhovaná místa — celý Moravskoslezský kraj, Ostrava prominentně. */
export const AREA_SERVED_CITIES = [
  "Opava",
  "Ostrava",
  "Krnov",
  "Hlučín",
  "Kravaře",
  "Bohumín",
  "Havířov",
  "Karviná",
  "Orlová",
  "Frýdek-Místek",
  "Třinec",
  "Nový Jičín",
  "Kopřivnice",
  "Bílovec",
  "Studénka",
  "Odry",
  "Vítkov",
  "Fulnek",
  "Bruntál",
  "Rýmařov",
];

/** areaServed jako pole Place (města) + kraj + republika. */
export const areaServed = [
  ...AREA_SERVED_CITIES.map((name) => ({ "@type": "City", name })),
  { "@type": "AdministrativeArea", name: "Moravskoslezský kraj" },
  { "@type": "Country", name: "Česká republika" },
];

const knowsAbout = [
  "velkoformátový tisk",
  "reklamní výroba",
  "polepy aut",
  "polepy dodávek",
  "polepy výloh",
  "interiérové polepy",
  "řezaná grafika",
  "světelná reklama",
  "3D loga",
  "reklamní cedule",
  "venkovní reklama",
  "orientační systémy",
  "tisk samolepek",
  "bannery a plachty",
  "roll-upy",
  "plakáty",
  "tiskoviny",
  "POS materiály",
  "tisk fotoobrazů",
  "grafika pro tisk",
  "návrh loga a vizuální identity",
  "webdesign",
  "reklamní textil",
  "reklamní předměty",
];

const makesOffer = allServices.map((s) => ({
  "@type": "Offer",
  itemOffered: {
    "@type": "Service",
    name: s.navLabel,
    url: `${SITE_URL}${s.hub ? `/${s.hub}/${s.slug}` : `/${s.slug}`}`,
    provider: { "@id": BUSINESS_ID },
  },
}));

/** Hlavní entita firmy — LocalBusiness. Vkládá se na homepage a kontakt. */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": BUSINESS_ID,
  name: "Visibly",
  legalName: "studio visibly s.r.o.",
  alternateName: "visibly.cz",
  description:
    "Visibly je tiskárna a výrobní reklamní studio z Opavy. Tiskneme a vyrábíme reklamu, která je vidět — velkoformátový tisk, polepy, cedule a světelnou reklamu pro firmy z Opavy, Ostravy a celého Moravskoslezského kraje.",
  slogan: "Reklama, která je vidět.",
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: `${SITE_URL}/visibly-logo.svg`,
  },
  image: `${SITE_URL}/images/visibly-home-hero-colors.jpg`,
  email: EMAIL,
  telephone: PHONE_INTL,
  priceRange: "$$",
  currenciesAccepted: "CZK",
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS_STREET,
    addressLocality: ADDRESS_CITY,
    postalCode: POSTAL_CODE,
    addressRegion: "Moravskoslezský kraj",
    addressCountry: "CZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: GEO_LAT, longitude: GEO_LNG },
  hasMap: MAPS_URL,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_INTL,
    email: EMAIL,
    contactType: "customer service",
    areaServed: "CZ",
    availableLanguage: ["cs"],
  },
  sameAs: ["https://www.instagram.com/studiovisibly/"],
  areaServed,
  knowsAbout,
  makesOffer,
};

/** Service schema pro podstránku — s pokrytím celého kraje. */
export function serviceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType: name,
    areaServed,
    provider: { "@type": "LocalBusiness", name: "Visibly", "@id": BUSINESS_ID },
  };
}
