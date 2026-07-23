import { guidesPolepyReklama } from "./guides-polepy-reklama";
import { guidesPripravaTisk } from "./guides-priprava-tisk";
import type { Guide } from "./types";

export const allGuides: Guide[] = [...guidesPripravaTisk, ...guidesPolepyReklama];

export function getGuide(slug: string): Guide | undefined {
  return allGuides.find((g) => g.slug === slug);
}

/** Kategorie v pořadí pro hub průvodce. */
export const guideCategories = [
  "Příprava dat",
  "Tisk",
  "Polepy",
  "Reklama",
  "Textil",
  "B2B tisk",
  "Důvěra",
] as const;
