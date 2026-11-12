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
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` : domaine de production fourni par Vercel.
 * 3. `VERCEL_URL` : URL du déploiement courant (previews).
 * 4. `http://localhost:3000` en développement.
 */
export function resolveSiteUrl(): string {
  return (
    normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalizeOrigin(process.env.VERCEL_URL) ??
    "http://localhost:3000"
  );
}

export const siteUrl = resolveSiteUrl();

export const site = {
  brand: "TEKER Codes",
  wordmark: "TEKER/Codes",
  owner: "Baurel",
  email: "baurelbemmo@gmail.com",
  phone: "+237 656 384 260",
  phoneHref: "+237656384260",
  github: "https://github.com/baurel-bits",
  githubHandle: "baurel-bits",
  githubAlt: "https://github.com/Baurel237",
  githubAltHandle: "Baurel237",
  gitlab: "https://gitlab.com/baurel",
  gitlabHandle: "baurel",
  copyrightYear: 2026,
  location: {
    fr: "Douala, Cameroun",
    en: "Douala, Cameroon",
  } satisfies LocalizedText,
  role: {
    fr: "Développeur junior frontend & logiciel",
    en: "Junior frontend & software developer",
  } satisfies LocalizedText,
  stackPreview: ["React", "Next.js", "Tailwind CSS", "Java", "Spring Boot", "PostgreSQL"],
} as const;
