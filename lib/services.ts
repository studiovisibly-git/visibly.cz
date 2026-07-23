import { polepyServices } from "./services-polepy";
import { reklamaServices } from "./services-reklama";
import { studioServices } from "./services-studio";
import { tiskServices } from "./services-tisk";
import type { ServicePage } from "./types";

export { polepyServices, reklamaServices, studioServices, tiskServices };

export const allServices: ServicePage[] = [
  ...tiskServices,
  ...polepyServices,
  ...reklamaServices,
  ...studioServices,
];

export function getService(hub: "tisk" | "polepy" | "reklama", slug: string): ServicePage | undefined {
  return allServices.find((s) => s.hub === hub && s.slug === slug);
}

export function getStudioService(slug: string): ServicePage | undefined {
  return studioServices.find((s) => s.slug === slug);
}
