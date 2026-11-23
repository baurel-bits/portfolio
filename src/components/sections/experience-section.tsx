import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { CheckIcon } from "@/components/ui/icons";
import { experiences } from "@/data/experience";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type ExperienceSectionProps = {
  locale: Locale;
  experienceCopy: Dictionary["experience"];
};

export function ExperienceSection({ locale, experienceCopy }: ExperienceSectionProps) {
  return (
    <Section id="experience" tone="paper">
      <SectionHeader
        label={experienceCopy.label}
        title={experienceCopy.title}
        description={experienceCopy.description}
      />

      <div className="border-t border-line">
        {experiences.map((exp, index) => (
          <Reveal
            key={exp.id}
            as="article"
            delay={index * 70}
            className="grid gap-4 border-b border-line py-8 sm:grid-cols-[10rem_1fr] sm:gap-8"
          >
            <p className="font-mono text-micro uppercase tracking-[0.12em] text-ink-muted">
              {exp.period[locale]}
            </p>

            <div>
              <h3 className="font-display text-heading-l font-semibold text-ink">
                {exp.role[locale]}
              </h3>
              <p className="mt-1 text-body-s text-ink-muted">
                {exp.company[locale]} · {exp.location[locale]}
              </p>
              <p className="mt-3 max-w-[62ch] text-body-m text-ink-soft">
                {exp.description[locale]}
              </p>

              <ul className="mt-3 space-y-1.5">
                {exp.highlights.map((h) => (
                  <li key={h[locale]} className="flex gap-2 text-body-s text-ink-soft">
                    <CheckIcon
                      width={12}
                      height={12}
                      className="mt-1 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    {h[locale]}
                  </li>
                ))}
              </ul>

              <ul className="mt-3 flex flex-wrap gap-1.5">
                {exp.stack.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
