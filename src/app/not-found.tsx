import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

/** Sans titre, la 404 s'affichait avec le titre de la page d'accueil. */
export const metadata: Metadata = {
  title: `Page introuvable — ${site.owner}`,
  robots: { index: false, follow: false },
};

/**
 * 404 déclenchée par `notFound()` dans un segment localisé. Elle est rendue
 * dans le layout `[locale]`, qui fournit déjà `<html>`, `<body>`, les styles
 * et le `<main id="contenu">` : ce composant ne doit produire que du contenu.
 */
export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-24 lg:py-32">
      <p className="font-mono text-micro uppercase tracking-[0.16em] text-ink-muted">404</p>

      <h1 className="mt-4 font-display text-display-m font-bold text-ink">Page introuvable</h1>
      <p className="mt-4 max-w-[46ch] text-body-l text-ink-soft">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>

      <p lang="en" className="mt-8 font-display text-heading-m font-semibold text-ink">
        Page not found
      </p>
      <p lang="en" className="mt-2 max-w-[46ch] text-body-m text-ink-soft">
        The page you are looking for does not exist or has been moved.
      </p>

      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-mono text-micro uppercase tracking-[0.12em]">
        <Link href="/fr" className="inline-flex min-h-6 items-center text-accent transition-colors hover:text-ink">
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/en"
          hrefLang="en"
          className="inline-flex min-h-6 items-center text-accent transition-colors hover:text-ink"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
