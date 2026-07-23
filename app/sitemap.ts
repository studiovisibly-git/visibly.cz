import type { MetadataRoute } from "next";
import { allGuides } from "@/lib/guides";
import { allServices } from "@/lib/services";
import { SITE_URL } from "@/lib/site";
import { works } from "@/lib/works";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/tisk",
    "/polepy",
    "/reklama",
    "/realizace",
    "/technologie",
    "/o-nas",
    "/kontakt",
    "/pruvodce",
    "/pro-agentury",
    "/reklamni-plochy-opava",
    "/tiskarna-ostrava",
    "/polepy-ostrava",
    "/reklama-ostrava",
    "/moravskoslezsky-kraj",
    "/cookies",
    "/mapa-webu",
  ];

  const servicePaths = allServices.map((s) => (s.hub ? `/${s.hub}/${s.slug}` : `/${s.slug}`));
  const workPaths = works.map((w) => `/realizace/${w.slug}`);
  const guidePaths = allGuides.map((g) => `/pruvodce/${g.slug}`);

  const now = new Date();
  return [...staticPaths, ...servicePaths, ...workPaths, ...guidePaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
