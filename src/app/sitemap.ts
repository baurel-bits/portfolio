import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

/** Alternates hreflang pour une même page dans les deux langues. */
function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`]),
    ),
  };
}

/**
 * Pages publiques indexables uniquement.
 * `/cv` est exclu : la page porte `robots: { index: false }`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const home = locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: alternates(""),
  }));

  const projectPages = projects.flatMap((project) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}/projets/${project.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: alternates(`/projets/${project.id}`),
    })),
  );

  return [...home, ...projectPages];
}
