import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { SkillCard } from "@/features/skills/skill-card";
import { skillDomains } from "@/data/skills";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type SkillsSectionProps = {
  locale: Locale;
  skills: Dictionary["skills"];
};

export function SkillsSection({ locale, skills }: SkillsSectionProps) {
  return (
    <Section id="competences" tone="paper">
      <SectionHeader
        label={skills.label}
        title={skills.title}
        description={skills.description}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillDomains.map((domain, index) => (
          <Reveal key={domain.id} delay={index * 70} className="h-full">
            <SkillCard domain={domain} index={index + 1} locale={locale} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
