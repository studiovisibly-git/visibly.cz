import { CatalogStrip } from "@/components/CatalogStrip";
import { HubPageTemplate, type HubPage } from "@/components/HubPageTemplate";
import { buildMetadata } from "@/lib/seo";

const metaDescription =
  "Reklamní výroba v Opavě: cedule, světelná reklama, 3D loga a orientační systémy. Od návrhu v kontextu místa po výrobu a montáž.";

export const metadata = buildMetadata({
  title: "Reklama Opava — cedule, světelná reklama, 3D loga | Visibly",
  description: metaDescription,
  path: "/reklama",
});

const hub: HubPage = {
  path: "/reklama",
  label: "Reklama",
  metaDescription,
  eyebrow: "Služba · Reklamní výroba",
  h1: "Reklama pro značky, prostory a provozovny.",
  intro: "Cedule, světelná reklama, 3D loga a orientační systémy od návrhu po montáž.",
  heroCta: "Poptat reklamu",
  heroMedia: { label: "Kruhová fotografie · světelný 3D prvek", variant: "circle" },
  split: {
    title: "Dobrá reklama nezačíná výrobkem.",
    text: "Začíná místem, vzdáleností a prvním dojmem. Návrh, výrobu a montáž řešíme jako jeden celek.",
    media: { label: "Fotografie · provozovna", variant: "circle" },
  },
  proof: [
    { title: "Návrh v kontextu místa", text: "Začínáme fotkou fasády, ne katalogem." },
    { title: "Výroba podle použití", text: "Materiál a konstrukce pro roky služby." },
    { title: "Montáž jako součást řešení", text: "Kotvení, elektro i revize domluvíme my." },
  ],
  directoryTitle: "Čeho má reklama dosáhnout?",
  directory: [
    {
      title: "Označit provozovnu",
      text: "Cedule a označení, které navádí zákazníky.",
      href: "/reklama/reklamni-cedule",
      cta: "Projít cedule",
    },
    {
      title: "Být vidět i po setmění",
      text: "Světelné boxy, prosvětlená písmena, LED.",
      href: "/reklama/svetelna-reklama",
      cta: "Projít světelnou reklamu",
    },
    {
      title: "Dostat logo do prostoru",
      text: "3D loga a plastická písmena.",
      href: "/reklama/3d-loga",
      cta: "Projít 3D loga",
    },
    {
      title: "Zlepšit orientaci",
      text: "Směrovky, piktogramy a značení budov.",
      href: "/reklama/orientacni-systemy",
      cta: "Projít orientaci",
    },
    {
      title: "Obléknout tým",
      text: "Trička, mikiny a pracovní oblečení s logem.",
      href: "/reklama/reklamni-textil",
      cta: "Projít textil",
    },
    {
      title: "Dát něco do ruky",
      text: "Hrnky, propisky, tašky a merch s potiskem.",
      href: "/reklama/reklamni-predmety",
      cta: "Projít předměty",
    },
  ],
  band: {
    title: "Začněte fotografií místa.",
    text: "Posoudíme čitelnost, rozměr i způsob montáže — a navrhneme řešení.",
    cta: "Probrat místo",
    href: "/kontakt#poptavka",
  },
  worksTitle: "Značky usazené do prostoru.",
  works: ["rezani-betonu", "reformlab"],
  materialsTitle: "Konstrukce, povrch a světlo musí fungovat spolu.",
  materials: [
    { title: "Desky a polepy", text: "Dibond, PVC a fólie pro ploché značení." },
    { title: "Písmena a 3D loga", text: "Plastická značka s hloubkou." },
    { title: "Světelné prvky", text: "LED boxy a prosvětlené nápisy." },
    { title: "Kotvení a montáž", text: "Aby všechno drželo roky." },
  ],
  materialsBand: {
    title: "Nevíte, jaký typ reklamy zvolit?",
    text: "Pošlete fotku místa — navrhneme dvě varianty s cenami.",
    cta: "Poslat fotku místa",
    href: "/kontakt#poptavka",
  },
  processTitle: "Od místa po hotovou reklamu.",
  process: [
    { title: "Místo a cíl", text: "Odkud se lidé dívají a co mají udělat." },
    { title: "Návrh řešení", text: "Vizualizace na vaší fasádě." },
    { title: "Vizualizace a specifikace", text: "Materiály, rozměry, cena." },
    { title: "Výroba a montáž", text: "Vyrobíme, ukotvíme, předáme." },
  ],
  faqTitle: "Než začne reklamní výroba",
  faq: [
    {
      q: "Jak vybrat správný typ reklamy?",
      a: "Podle místa a provozu — vzdálenost čtení, večerní viditelnost a okolní konkurence rozhodují víc než vkus. Z fotky místa doporučíme konkrétní řešení.",
    },
    {
      q: "Připravíte i grafický návrh?",
      a: "Ano, včetně vizualizace přímo na fotce vaší fasády či prostoru. Rozhodujete se nad obrázkem, ne nad popisem.",
    },
    {
      q: "Kdy zvolit světelnou reklamu?",
      a: "Když máte otevřeno po setmění nebo svítí celá ulice kolem. Sepsali jsme o tom průvodce — a umíme i střední cestu: nasvícenou ceduli.",
    },
    {
      q: "Zajistíte montáž?",
      a: "Ano, v Opavě a okolí vlastními silami včetně kotvení a elektro připojení u světelných prvků. Po domluvě montujeme po celém MS kraji.",
    },
    {
      q: "Co potřebujete pro nacenění?",
      a: "Fotku místa, přibližný rozměr a co má reklama sdělit. Vrátíme návrh řešení s cenou — obvykle do pár dnů.",
    },
  ],
  guidesTitle: "Rozhodněte se podle místa, ne podle dojmu.",
  guides: [
    { label: "Jak označit provozovnu, aby byla vidět", href: "/pruvodce/jak-oznacit-provozovnu" },
    { label: "Jaký materiál zvolit na reklamní ceduli", href: "/pruvodce/jaky-material-na-reklamni-ceduli" },
  ],
  finalTitle: "Potřebujete reklamu, která bude vidět?",
  finalCta: "Poptat reklamu",
};

export default function ReklamaPage() {
  return <HubPageTemplate hub={hub} afterDirectory={<CatalogStrip />} />;
}
