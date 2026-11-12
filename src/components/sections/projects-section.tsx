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
          // Nombre impair de projets : la dernière carte est centrée plutôt que
          // laissée seule dans une colonne, ce qui laissait un grand vide.
          const isLoneLast = index === projects.length - 1 && projects.length % 2 === 1;

          return (
            <Reveal
              key={project.id}
              delay={index * 90}
              className={cn(
                "h-full",
                project.featured ? "lg:col-span-7" : "lg:col-span-5",
                isLoneLast && "lg:col-span-6 lg:col-start-4",
              )}
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
