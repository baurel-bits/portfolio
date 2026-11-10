import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { educationEntries } from "@/data/education";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type EducationSectionProps = {
  locale: Locale;
  education: Dictionary["education"];
};

export function EducationSection({ locale, education }: EducationSectionProps) {
  return (
    <Section id="formation" tone="paper">
      <SectionHeader
        label={education.label}
        title={education.title}
        description={education.description}
      />

      <div className="border-t border-line">
        {educationEntries.map((entry, index) => (
          <Reveal
            key={entry.id}
            as="article"
            delay={index * 70}
            className="grid gap-4 border-b border-line py-8 sm:grid-cols-[10rem_1fr] sm:gap-8"
          >
            <p className="font-mono text-micro uppercase tracking-[0.12em] text-ink-muted">
              {entry.period[locale]}
            </p>

            <div>
              <h3 className="font-display text-heading-l font-semibold text-ink">
                {entry.title[locale]}
              </h3>
              <p className="mt-1 text-body-s text-ink-muted">{entry.place[locale]}</p>
              <p className="mt-3 max-w-[62ch] text-body-m text-ink-soft">
                {entry.description[locale]}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
