import { Section, SectionHeader } from "@/components/ui/section";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";

type AboutSectionProps = {
  locale: Locale;
  about: Dictionary["about"];
};

export function AboutSection({ locale, about }: AboutSectionProps) {
  const facts = [
    { label: about.facts.location, value: site.location[locale] },
    { label: about.facts.status, value: about.facts.statusValue },
  ];

  return (
    <Section id="a-propos" tone="sunken">
      <SectionHeader label={about.label} title={about.title} />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="font-display text-display-m font-semibold text-balance text-ink">
            {about.lead}
          </p>

          <div className="mt-6 space-y-4">
            {about.body.map((paragraph) => (
              <p key={paragraph} className="max-w-[62ch] text-body-m text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <dl className="divide-y divide-line border-y border-line">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="font-mono text-micro uppercase tracking-[0.12em] text-ink-muted">
                  {fact.label}
                </dt>
                <dd className="text-right text-body-s text-ink">{fact.value}</dd>
              </div>
            ))}

            <div className="flex items-baseline justify-between gap-6 py-4">
              <dt className="font-mono text-micro uppercase tracking-[0.12em] text-ink-muted">
                {about.facts.email}
              </dt>
              <dd className="text-right text-body-s">
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {site.email}
                </a>
              </dd>
            </div>

            <div className="flex items-baseline justify-between gap-6 py-4">
              <dt className="font-mono text-micro uppercase tracking-[0.12em] text-ink-muted">
                {about.facts.github}
              </dt>
              <dd className="text-right text-body-s">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {site.githubHandle}
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}
