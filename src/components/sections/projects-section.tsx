import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/features/projects/project-card";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type ProjectsSectionProps = {
  locale: Locale;
  projectsCopy: Dictionary["projects"];
};

/** Trois projets sur l'accueil ; la liste complète vit sur `/[locale]/projets`. */
const homeProjectCount = 3;

export function ProjectsSection({ locale, projectsCopy }: ProjectsSectionProps) {
  return (
    <Section id="projets" tone="console" size="wide">
      <SectionHeader
        label={projectsCopy.label}
        title={projectsCopy.title}
        description={projectsCopy.description}
        tone="console"
      />

      {/* Trois colonnes égales : l'ancienne alternance 7/5 laissait un trou
          quand la ligne n'était pas complète. */}
      <div className="grid gap-6 lg:grid-cols-3">
        {projects.slice(0, homeProjectCount).map((project, index) => (
          <Reveal key={project.id} delay={index * 90} className="h-full">
            <ProjectCard
              project={project}
              index={index + 1}
              locale={locale}
              labels={projectsCopy}
            />
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <Link href={`/${locale}/projets`} className={buttonStyles("signal", "md")}>
          {projectsCopy.viewAll}
          <ArrowRightIcon
            width={15}
            height={15}
            className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </Link>
      </div>
    </Section>
  );
}
