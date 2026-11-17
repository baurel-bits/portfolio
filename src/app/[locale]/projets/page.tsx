import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { ProjectCard } from "@/features/projects/project-card";
import { projects } from "@/data/projects";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Index de tous les projets : l'accueil n'en présente que trois, cette page est
// la destination des liens « Voir tous les projets » et « Retour aux projets ».
type ProjectsIndexPageProps = {
  params: Promise<{ locale: string }>;
};

function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: ProjectsIndexPageProps): Promise<Metadata> {
  const { locale } = await params;
  const active = resolveLocale(locale);
  const dict = getDictionary(active);
  const title = `${dict.projects.indexTitle} — ${site.owner}`;

  return {
    title,
    description: dict.projects.description,
    alternates: {
      canonical: `/${active}/projets`,
      languages: { fr: "/fr/projets", en: "/en/projets" },
    },
    openGraph: {
      title,
      description: dict.projects.description,
      url: `/${active}/projets`,
      siteName: site.brand,
      images: [{ url: `/${active}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.projects.description,
      images: [`/${active}/opengraph-image`],
    },
  };
}

export default async function ProjectsIndexPage({ params }: ProjectsIndexPageProps) {
  const { locale } = await params;
  const active = resolveLocale(locale);
  const dict = getDictionary(active);
  const labels = dict.projects;

  return (
    <Section tone="console" size="wide">
      <Link
        href={`/${active}`}
        className="inline-flex min-h-11 items-center gap-2 font-mono text-micro uppercase tracking-[0.12em] text-console-muted transition-colors hover:text-signal"
      >
        <ArrowRightIcon width={13} height={13} className="rotate-180" />
        {labels.backHome}
      </Link>

      <div className="mt-12">
        <SectionHeader
          label={labels.label}
          title={labels.indexTitle}
          description={labels.description}
          tone="console"
          titleLevel="h1"
          immediate
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {projects.map((project, index) => {
          const pair = Math.floor(index / 2);
          const isLeft = index % 2 === 0;
          const wide = isLeft === (pair % 2 === 0);
          // Dernière carte d'une liste impaire : centrée plutôt que collée à
          // gauche avec cinq colonnes vides à sa droite.
          const isAlone = index === projects.length - 1 && projects.length % 2 === 1;

          return (
            <Reveal
              key={project.id}
              delay={index * 90}
              // Les deux premières cartes sont au-dessus de la ligne de
              // flottaison : animées, elles repousseraient le LCP après
              // l'hydratation.
              immediate={index < 2}
              className={cn(
                "h-full",
                isAlone ? "lg:col-span-8 lg:col-start-3" : wide ? "lg:col-span-7" : "lg:col-span-5",
              )}
            >
              <ProjectCard
                project={project}
                index={index + 1}
                locale={active}
                labels={labels}
                headingLevel="h2"
              />
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
