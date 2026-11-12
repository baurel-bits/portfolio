import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/features/projects/project-card";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type ProjectsSectionProps = {
  locale: Locale;
  projectsCopy: Dictionary["projects"];
};

export function ProjectsSection({ locale, projectsCopy }: ProjectsSectionProps) {
  return (
    <Section id="projets" tone="console" size="wide">
      <SectionHeader
        label={projectsCopy.label}
        title={projectsCopy.title}
        description={projectsCopy.description}
        tone="console"
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {projects.map((project, index) => {
          // Les cartes se placent deux par ligne sur 12 colonnes : la grande
          // alterne de côté à chaque paire, sinon la grille laisse des trous
          // dès que le nombre de projets ne tombe pas juste.
          const pair = Math.floor(index / 2);
          const isLeft = index % 2 === 0;
          const wide = isLeft === (pair % 2 === 0);

          return (
            <Reveal
              key={project.id}
              delay={index * 90}
              className={cn("h-full", wide ? "lg:col-span-7" : "lg:col-span-5")}
            >
              <ProjectCard
                project={project}
                index={index + 1}
                locale={locale}
                labels={projectsCopy}
              />
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
