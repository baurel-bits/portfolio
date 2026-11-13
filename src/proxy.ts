import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

/**
 * Langue préférée du visiteur, déduite de `Accept-Language`.
 * Les q-values sont respectées ; une langue inconnue retombe sur le français.
 */
function preferredLocale(header: string | null): Locale {
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((entry) => {
      const [tag, ...params] = entry.trim().split(";");
      const qualityParam = params.find((param) => param.trim().startsWith("q="));
      const quality = qualityParam ? Number.parseFloat(qualityParam.trim().slice(2)) : 1;

      return { language: tag.trim().toLowerCase().split("-")[0], quality };
    })
    .filter((entry) => entry.language.length > 0 && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { language } of ranked) {
    const match = locales.find((locale) => locale === language);
    if (match) return match;
  }

  return defaultLocale;
}

/**
 * La racine redirige vers `/fr` ou `/en` selon le navigateur.
 * Les autres chemins ne passent pas ici (voir `matcher`).
 */
export function proxy(request: NextRequest) {
  const locale = preferredLocale(request.headers.get("accept-language"));
  const response = NextResponse.redirect(new URL(`/${locale}`, request.url), 307);

  // La réponse dépend de la langue du navigateur : le cache doit en tenir compte.
  response.headers.set("Vary", "Accept-Language");

  return response;
}

export const config = {
  matcher: "/",
};
