import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { goals } from "@/data/goals";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type GoalsSectionProps = {
  locale: Locale;
  goalsCopy: Dictionary["goals"];
};

export function GoalsSection({ locale, goalsCopy }: GoalsSectionProps) {
  return (
    <Section id="objectifs" tone="sunken">
      <SectionHeader
        label={goalsCopy.label}
        title={goalsCopy.title}
        description={goalsCopy.description}
      />

      <ol className="grid gap-8 md:grid-cols-3">
        {goals.map((goal, index) => (
          <Reveal
            key={goal.id}
            as="li"
            delay={index * 80}
            className="border-t border-line-strong pt-6"
          >
            <span className="font-mono text-micro uppercase tracking-[0.14em] text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-heading-l font-semibold text-balance text-ink">
              {goal.title[locale]}
            </h3>
            <p className="mt-3 text-body-m text-ink-soft">{goal.description[locale]}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
