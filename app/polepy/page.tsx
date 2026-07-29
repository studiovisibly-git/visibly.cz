import { HubPageTemplate, type HubPage } from "@/components/HubPageTemplate";
import { buildMetadata } from "@/lib/seo";

const metaDescription =
  "Polepy v Opavě: auta, dodávky, výlohy i interiéry. Návrh, výroba a čistá aplikace sladěné s konkrétní plochou a provozem. Vlastní tisk a ploter.";

export const metadata = buildMetadata({
  title: "Polepy Opava — auta, výlohy, interiéry | Visibly",
  description: metaDescription,
  path: "/polepy",
});

const hub: HubPage = {
  path: "/polepy",
  label: "Polepy",
  metaDescription,
  eyebrow: "Služba · Polepy",
  h1: "Polepy pro auta, výlohy a interiéry.",
  intro: "Návrh, výroba a aplikace sladěné s konkrétní plochou a provozem.",
  heroCta: "Poptat polep",
  heroMedia: {
    label: "Polep auta",
    variant: "circle",
    src: "/images/visibly-service-polepy-optimized.jpg",
    alt: "Polepená firemní dodávka Smart Phoenix před provozovnou",
  },
  split: {
    title: "Polep musí sedět značce, ploše i provozu.",
    text: "Proto řešíme návrh, materiál a čistou aplikaci společně.",
    media: { label: "Detail · aplikace fólie", variant: "circle" },
  },
  proof: [
    { title: "Návrh pro konkrétní plochu", text: "Grafika vzniká na fotce vašeho auta či skla." },
    { title: "Příprava podle provozu", text: "Fólie a laminace podle skutečné zátěže." },
    { title: "Aplikace s čistým detailem", text: "Bez bublin, s hranami, které drží." },
  ],
  directoryTitle: "Jakou plochu řešíte?",
  directory: [
    {
      title: "Osobní auto",
      text: "Od loga na dveřích po celopolep.",
      href: "/polepy/polepy-aut",
      cta: "Projít polepy aut",
    },
    {
      title: "Dodávka nebo firemní vůz",
      text: "Velké plochy a flotily v jednotném stylu.",
      href: "/polepy/polepy-dodavek",
      cta: "Projít polepy dodávek",
    },
    {
      title: "Výloha nebo sklo",
      text: "Řezaná grafika, tisk i mléčné fólie.",
      href: "/polepy/polepy-vyloh",
      cta: "Projít polepy výloh",
    },
    {
      title: "Interiér",
      text: "Stěny, skla a značení prostor.",
      href: "/polepy/interierove-polepy",
      cta: "Projít interiérové polepy",
    },
  ],
  band: {
    title: "Pošlete fotografii plochy.",
    text: "Doporučíme vhodný rozsah a provedení — nezávazně a obvykle do druhého dne.",
    cta: "Probrat polep",
    href: "/kontakt#poptavka",
  },
  worksTitle: "Jak polep navazujeme na značku.",
  works: ["ps-green", "reformlab"],
  materialsTitle: "Fólie podle plochy. Ne podle zkratky.",
  materials: [
    { title: "Řezaná fólie", text: "Čistá loga a nápisy bez pozadí." },
    { title: "Tištěná fólie", text: "Fotky, přechody a plnobarevná grafika." },
    { title: "Transparentní, plná nebo matná", text: "Podle světla a účelu plochy." },
    { title: "Laminace a dokončení", text: "Ochrana pro roky provozu." },
  ],
  materialsBand: {
    title: "Nevíte, jaká fólie je ta pravá?",
    text: "Stačí fotka plochy — typ fólie je naše starost.",
    cta: "Poslat fotku plochy",
    href: "/kontakt#poptavka",
  },
  processTitle: "Od fotografie plochy po čistou aplikaci.",
  process: [
    { title: "Zadání a zaměření", text: "Fotka plochy a co má polep sdělit." },
    { title: "Návrh řešení", text: "Grafika, materiál a rozsah." },
    { title: "Grafika a výroba", text: "Tisk, laminace a řez u nás." },
    { title: "Aplikace a předání", text: "Na místě nebo v naší dílně." },
  ],
  faqTitle: "Co je dobré vědět před polepem",
  faq: [
    {
      q: "Potřebuji vlastní návrh?",
      a: "Ne — stačí logo a představa, co má polep říct. Grafiku navrhneme na fotku vaší plochy, takže výsledek vidíte předem.",
    },
    {
      q: "Co ovlivňuje cenu polepu auta?",
      a: "Rozsah, typ fólie, členitost karoserie a příprava vozu. Podrobně jsme to rozepsali v průvodci — orientačně od 3 tisíc za logo s kontaktem.",
    },
    {
      q: "Řezaná nebo tištěná fólie?",
      a: "Řezaná pro čistá loga a nápisy, tištěná pro fotky a barevné přechody. Nejčastěji kombinujeme obojí — rozhodneme za vás podle grafiky.",
    },
    {
      q: "Jak dlouho trvá aplikace?",
      a: "Menší polepy hodiny, částečný polep auta den, celopolep či výloha 1–3 dny. Termín řekneme předem a držíme ho.",
    },
    {
      q: "Jak dlouho polep vydrží?",
      a: "Kvalitní fólie s laminací 5–8 let. Životnost nejvíc ovlivňuje péče — praktická pravidla předáváme s hotovou zakázkou.",
    },
  ],
  guidesTitle: "Připravte plochu i zadání.",
  guides: [
    { label: "Jak připravit auto před polepem", href: "/pruvodce/jak-pripravit-auto-pred-polepem" },
    { label: "Co dát na výlohu provozovny", href: "/pruvodce/co-dat-na-vylohu-provozovny" },
  ],
  finalTitle: "Chcete polep, který bude vidět?",
  finalCta: "Poptat polep",
};

export default function PolepyPage() {
  return <HubPageTemplate hub={hub} />;
}
