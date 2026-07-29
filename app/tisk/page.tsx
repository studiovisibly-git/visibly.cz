import { HubPageTemplate, type HubPage } from "@/components/HubPageTemplate";
import { buildMetadata } from "@/lib/seo";

const metaDescription =
  "Tisk pro firmy v Opavě: bannery, samolepky, plakáty, roll-upy i firemní tiskoviny. Vlastní velkoformátový tisk, kontrola dat a dokončení podle použití.";

export const metadata = buildMetadata({
  title: "Tisk Opava — velkoformát, bannery, samolepky, tiskoviny | Visibly",
  description: metaDescription,
  path: "/tisk",
});

const hub: HubPage = {
  path: "/tisk",
  label: "Tisk",
  metaDescription,
  eyebrow: "Služba · Tisk",
  h1: "Tisk pro značky, prostory a kampaně.",
  intro:
    "Bannery, samolepky, plakáty i firemní tiskoviny. Materiál a dokončení podle skutečného použití.",
  heroCta: "Poptat tisk",
  heroMedia: {
    label: "Tiskoviny z výroby",
    variant: "circle",
    src: "/images/visibly-service-tisk-optimized.jpg",
    alt: "Velkoformátová tiskárna Epson SureColor při tisku v\u00a0dílně Visibly",
  },
  split: {
    title: "Dobrý tisk začíná dřív, než se spustí stroj.",
    text: "Materiál, formát i dokončení volíme podle toho, kde má výsledek fungovat.",
    media: { label: "Video · z tisku", variant: "circle" },
  },
  proof: [
    { title: "Použití před materiálem", text: "Nejdřív kde a proč, teprve pak na co." },
    { title: "Data pod kontrolou", text: "Každou zakázku kontrolujeme před výrobou." },
    { title: "Výstup připravený k použití", text: "Ořez, laminace, kompletace — hotovo k předání." },
  ],
  directoryTitle: "Co má tisk udělat?",
  directoryText: "Vyberte situaci — konkrétní řešení najdete na podstránkách.",
  directory: [
    {
      title: "Potřebuji být vidět venku",
      text: "Banner, billboard, plakát nebo venkovní fólie.",
      href: "/tisk/bannery-a-plachty",
      cta: "Projít venkovní tisk",
    },
    {
      title: "Vybavuji provozovnu",
      text: "Výloha, orientace, desky nebo POS materiály.",
      href: "/tisk/pos-materialy",
      cta: "Projít POS materiály",
    },
    {
      title: "Chci materiály do ruky",
      text: "Vizitky, letáky, brožury a firemní tiskoviny.",
      href: "/tisk/tiskoviny",
      cta: "Projít tiskoviny",
    },
    {
      title: "Dodávám hotová data",
      text: "Partnerský tisk pro agentury a grafická studia.",
      href: "/pro-agentury",
      cta: "Probrat spolupráci",
    },
  ],
  band: {
    eyebrow: "B2B cesta",
    title: "Vy dodáte data. My pohlídáme výrobu.",
    text: "Partnerský tisk pro agentury a grafická studia — diskrétně a za férové ceny.",
    cta: "Probrat spolupráci",
    href: "/pro-agentury",
  },
  worksTitle: "Vyrobeno pro skutečný provoz.",
  works: ["ps-green", "reformlab"],
  materialsTitle: "Materiál rozhoduje až v kontextu.",
  materials: [
    { title: "Papír a karton", text: "Tiskoviny a pevnější výstupy." },
    { title: "Fólie", text: "Výlohy, značení a samolepky." },
    { title: "Bannerové materiály", text: "Venkovní i interiérová komunikace." },
    { title: "Laminace, ořez a kompletace", text: "Dokončení podle použití." },
  ],
  materialsBand: {
    title: "Nevíte, co vybrat?",
    text: "Stačí popsat místo a účel.",
    cta: "Poradit s tiskem",
    href: "/kontakt#poptavka",
  },
  processTitle: "Od zadání po hotový tisk.",
  process: [
    { title: "Zadání", text: "Co, kam a v jakém počtu." },
    { title: "Doporučení", text: "Materiál, dokončení a cena." },
    { title: "Kontrola dat", text: "Rozlišení, spadávky, barevnost." },
    { title: "Výroba a předání", text: "Tisk, dokončení, doručení." },
  ],
  faqTitle: "Než pošlete tisk do výroby",
  faq: [
    {
      q: "Musím mít hotová tisková data?",
      a: "Nemusíte. Stačí logo, fotka nebo popis — grafiku připravíme přímo pro výrobu a data vám předáme pro další použití.",
    },
    {
      q: "Jaký formát souboru poslat?",
      a: "Ideálně PDF, pro loga a řezanou grafiku křivky (AI, EPS, SVG). Fotky v největší dostupné velikosti. Když si nejste jistí, pošlete, co máte — poradíme si.",
    },
    {
      q: "Jak vybrat správný materiál?",
      a: "Napište, kde bude tisk umístěný a jak dlouho má vydržet. Materiál je naše rozhodnutí, ne test vašich znalostí.",
    },
    {
      q: "Kdy dává smysl laminace a ořez?",
      a: "Laminace chrání tisky, na které se sahá nebo které visí venku. Řez do tvaru dává grafice tvar podle loga. Obojí doporučíme, jen když to dává smysl — máme o tom i článek v průvodci.",
    },
    {
      q: "Co potřebujete pro nacenění?",
      a: "Rozměr (klidně přibližný), počet kusů a kde bude výsledek fungovat. Nabídku vracíme obvykle do druhého pracovního dne.",
    },
  ],
  guidesTitle: "Připravte zadání bez tápání.",
  guides: [
    { label: "Jak připravit data pro tisk", href: "/pruvodce/jak-pripravit-data-pro-tisk" },
    { label: "Jak vybrat reklamní banner", href: "/pruvodce/jak-vybrat-reklamni-banner" },
  ],
  finalTitle: "Potřebujete něco vytisknout?",
  finalCta: "Poptat tisk",
};

export default function TiskPage() {
  return <HubPageTemplate hub={hub} />;
}
