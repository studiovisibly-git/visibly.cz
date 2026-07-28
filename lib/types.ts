export type Faq = { q: string; a: string };

export type MediaVariant = "circle" | "wide" | "tall";

export type MediaSpec = {
  /** Popisek placeholderu — říká, jaká fotografie sem patří. */
  label: string;
  variant: MediaVariant;
  /** Cesta k finální fotografii nebo videu (.mp4) — jinak se zobrazí placeholder. */
  src?: string;
  /** Náhledový obrázek videa. */
  poster?: string;
  alt?: string;
  /** Produktová fotka na bílém — pozadí splyne s plochou (mix-blend-mode). */
  blend?: boolean;
};

export type DirItem = {
  num?: string;
  title: string;
  text?: string;
  href: string;
  cta: string;
};

export type ProcessStep = { title: string; text?: string };

export type LinkItem = { label: string; href: string };

/**
 * Výrazný blok pro jednu hlavní akci stránky — něco, co se nemá ztratit
 * mezi kartami rozcestníku (např. online katalog textilu).
 */
export type FeatureBlock = {
  /** Kotva, na kterou míří scroll CTA v heru. */
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  /** Co uvnitř najdu — krátké body, ne věty. */
  points: string[];
  cta: LinkItem;
  secondary?: LinkItem;
  /** Popisek rotujícího kruhového odznaku přes fotku. */
  badge?: string;
  media: MediaSpec;
  /** Text scroll CTA v heru — vede sem místo rozcestníku. */
  scrollLabel: string;
  /** Drobná poznámka pod tlačítky (zdroj dat, podmínky). */
  note?: string;
};

/** SEO podstránka služby (např. /polepy/polepy-aut). */
export type ServicePage = {
  slug: string;
  hub: "tisk" | "polepy" | "reklama" | null;
  /** Krátký název do navigace, footeru a rozcestníků. */
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroMedia: MediaSpec;
  /** Sekce s postojem — proč to děláme takhle. */
  split: { title: string; text: string; media: MediaSpec };
  proof: { title: string; text: string }[];
  /** Volitelný výrazný blok pod proof stripem — hlavní akce stránky. */
  feature?: FeatureBlock;
  /** „Jakou variantu / plochu řešíte?" — interní prolinkování. */
  variantsTitle: string;
  variantsText?: string;
  variants: DirItem[];
  band: { title: string; text: string; cta: string; href: string };
  process: { title: string; steps: ProcessStep[] };
  faqTitle: string;
  faq: Faq[];
  guides: LinkItem[];
  /** Slugy souvisejících realizací. */
  works: string[];
  finalTitle: string;
  finalCta: string;
};

export type GuideBlock =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { tip: { title: string; text: string } }
  | { table: { head: string[]; rows: string[][] } };

export type Guide = {
  slug: string;
  category: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  body: GuideBlock[];
  /** Služba, ke které článek vede. */
  service: LinkItem;
  related: LinkItem[];
  featured?: boolean;
};

export type Work = {
  slug: string;
  client: string;
  location: string;
  scopeLabel: string;
  title: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  hero: MediaSpec;
  intro: string;
  sections: { heading: string; text: string; media?: MediaSpec }[];
  deliverables: string[];
  services: LinkItem[];
};
