import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { fontVariables } from "@/lib/fonts";
import { site, siteUrl } from "@/lib/site";

// Analytics Umami Cloud : aucune requête n'est faite tant que l'identifiant
// du site n'est pas fourni, la balise n'étant alors pas rendue.
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleParams = {
  params: Promise<{ locale: string }>;
};

function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(resolveLocale(locale));

  const active = resolveLocale(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: site.brand,
    authors: [{ name: site.owner }],
    creator: site.owner,
    category: "technology",
    alternates: {
      canonical: `/${active}`,
      languages: { fr: "/fr", en: "/en", "x-default": "/fr" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      url: `/${active}`,
      locale: active === "fr" ? "fr_FR" : "en_US",
      alternateLocale: active === "fr" ? "en_US" : "fr_FR",
      siteName: site.brand,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.owner,
    jobTitle: site.role[locale],
    email: site.email,
    telephone: site.phone,
    url: site.github,
    sameAs: [site.github],
    address: { "@type": "PostalAddress", addressLocality: site.location[locale] },
  };

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <body id="top" className="min-h-dvh bg-paper text-ink antialiased">
        {/* Thème appliqué avant le premier rendu : aucun flash de palette. */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              '(function(){var t;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t})();',
          }}
        />

        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              'if ("IntersectionObserver" in window) { document.documentElement.classList.add("js"); }',
          }}
        />

        {umamiWebsiteId ? (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        ) : null}

        <a href="#contenu" className="skip-link">
          {dict.nav.skip}
        </a>

        <Navbar locale={locale} nav={dict.nav} />

        <main id="contenu">{children}</main>

        <Footer locale={locale} nav={dict.nav} footer={dict.footer} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
