import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import "@/styles/globals.css";

/** Sans titre, la 404 s'affichait avec le titre de la page d'accueil. */
export const metadata: Metadata = {
  title: `Page introuvable — ${site.owner}`,
  robots: { index: false, follow: false },
};

/**
 * 404 des URL qui ne correspondent à aucune route. Le layout racine est sous
 * `[locale]` : `global-not-found` est le seul endroit où le document HTML
 * complet peut être rendu sans dépendre de la locale.
 */
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-dvh bg-paper text-ink antialiased">
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              '(function(){var t;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t})();',
          }}
        />
        <main id="contenu" className="mx-auto w-full max-w-3xl px-6 py-24 lg:py-32">
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
        </main>
      </body>
    </html>
  );
}
