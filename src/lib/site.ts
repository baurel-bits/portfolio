import type { LocalizedText } from "@/types";

/**
 * Normalise une URL ou un domaine en origine absolue.
 * Vercel fournit `VERCEL_URL` et `VERCEL_PROJECT_PRODUCTION_URL` sans protocole.
 */
function normalizeOrigin(value: string | undefined): string | null {
  const raw = (value ?? "").trim();

  if (!raw) return null;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

/**
 * URL publique du site (canonical, Open Graph, métadonnées).
 *
 * 1. `NEXT_PUBLIC_SITE_URL` : à définir en production (domaine final).
 * 2. `URL` / `DEPLOY_PRIME_URL` : domaine de production fourni par Netlify.
 * 3. `VERCEL_PROJECT_PRODUCTION_URL` : domaine de production fourni par Vercel.
 * 4. `VERCEL_URL` : URL du déploiement courant (previews).
 * 5. `https://porfoliodeteker.netlify.app` en fallback de production.
 */
export function resolveSiteUrl(): string {
  return (
    normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeOrigin(process.env.URL) ??
    normalizeOrigin(process.env.DEPLOY_PRIME_URL) ??
    normalizeOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalizeOrigin(process.env.VERCEL_URL) ??
    "https://porfoliodeteker.netlify.app"
  );
}

export const siteUrl = resolveSiteUrl();

export const site = {
  brand: "TEKER Codes",
  wordmark: "TEKER/Codes",
  owner: "Baurel Bemmo",
  email: "baurelbemmo@gmail.com",
  phone: "+237 656 384 260",
  phoneHref: "+237656384260",
  whatsapp: "+237 654 593 761",
  whatsappHref: "https://wa.me/237654593761",
  github: "https://github.com/baurel-bits",
  githubHandle: "baurel-bits",
  githubAlt: "https://github.com/Baurel237",
  githubAltHandle: "Baurel237",
  gitlab: "https://gitlab.com/baurel",
  gitlabHandle: "baurel",
  linkedin: "https://www.linkedin.com/in/baurel-bemmo-49a1b73a9",
  linkedinHandle: "baurel-bemmo-49a1b73a9",
  copyrightYear: 2026,
  location: {
    fr: "Yaoundé, Cameroun",
    en: "Yaoundé, Cameroon",
  } satisfies LocalizedText,
  role: {
    fr: "Développeur full-stack",
    en: "Full-stack developer",
  } satisfies LocalizedText,
  /** Repris tel quel du CV : ce sont des faits, pas des intentions. */
  availability: {
    fr: "Disponible : Cameroun ou à distance",
    en: "Available: Cameroon or remote",
  } satisfies LocalizedText,
  languages: {
    fr: "Français (courant) · Anglais (B1)",
    en: "French (fluent) · English (B1)",
  } satisfies LocalizedText,
  stackPreview: ["React", "Next.js", "Tailwind CSS", "Java", "Spring Boot", "PostgreSQL"],
} as const;
