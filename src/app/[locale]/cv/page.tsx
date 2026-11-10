import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PrintButton } from "@/components/ui/print-button";
import { educationEntries } from "@/data/education";
import { goals } from "@/data/goals";
import { projects } from "@/data/projects";
import { skillDomains } from "@/data/skills";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";

type CvPageProps = {
  params: Promise<{ locale: string }>;
};

function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export async function generateMetadata({ params }: CvPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(resolveLocale(locale));

  const active = resolveLocale(locale);

  return {
    title: `${dict.cv.title} — ${site.owner}`,
    description: dict.meta.description,
    alternates: { canonical: `/${active}/cv` },
    openGraph: {
      title: `${dict.cv.title} — ${site.owner}`,
      description: dict.meta.description,
      url: `/${active}/cv`,
      type: "profile",
    },
    robots: { index: false, follow: true },
  };
}

export default async function CvPage({ params }: CvPageProps) {
  const { locale } = await params;
  const active = resolveLocale(locale);
  const dict = getDictionary(active);

  return (
    <div data-theme="light" className="bg-white">
      <Container className="py-10 lg:py-14 print:px-0 print:py-0">
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/${active}`}
            className="font-mono text-micro uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
          >
            ← {dict.cv.back}
          </Link>
          <PrintButton label={dict.cv.print} />
        </div>

        <p className="no-print mb-10 max-w-[60ch] text-body-s text-ink-muted">{dict.cv.note}</p>

        <article className="mx-auto max-w-[52rem] text-ink">
          <header className="print-block border-b border-line pb-6">
            <p className="font-mono text-micro uppercase tracking-[0.16em] text-ink-muted">
              {site.wordmark}
            </p>
            <h1 className="mt-3 font-display text-display-l font-bold">{site.owner}</h1>
            <p className="mt-2 text-body-l text-ink-soft">{site.role[active]}</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">
              <li>{site.location[active]}</li>
              <li>{site.email}</li>
              <li>{site.phone}</li>
              <li>{site.github}</li>
            </ul>
          </header>

          <section className="print-block mt-8 print:mt-5">
            <h2 className="font-mono text-micro uppercase tracking-[0.16em] text-accent">
              {dict.cv.profile}
            </h2>
            <p className="mt-3 text-body-m text-ink-soft">{dict.about.body[0]}</p>
          </section>

          <section className="print-block mt-8 print:mt-5">
            <h2 className="font-mono text-micro uppercase tracking-[0.16em] text-accent">
              {dict.cv.skills}
            </h2>
            <ul className="mt-3 space-y-1.5">
              {skillDomains.map((domain) => (
                <li key={domain.id} className="text-body-m text-ink-soft">
                  <span className="font-semibold text-ink">{domain.title[active]} — </span>
                  {domain.items.join(", ")}
                </li>
              ))}
            </ul>
          </section>

          <section className="print-block mt-8 print:mt-5">
            <h2 className="font-mono text-micro uppercase tracking-[0.16em] text-accent">
              {dict.cv.projects}
            </h2>
            <ul className="mt-3 space-y-4">
              {projects.map((project) => (
                <li key={project.id}>
                  <p className="text-body-m font-semibold text-ink">
                    {project.title[active]}{" "}
                    {project.year ? <span className="text-ink-muted">· {project.year}</span> : null}
                  </p>
                  <p className="mt-1 text-body-s text-ink-soft">{project.summary[active]}</p>
                  <p className="mt-1 font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">
                    {project.stack.join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="print-block mt-8 print:mt-5">
            <h2 className="font-mono text-micro uppercase tracking-[0.16em] text-accent">
              {dict.cv.education}
            </h2>
            <ul className="mt-3 space-y-3">
              {educationEntries.map((entry) => (
                <li key={entry.id}>
                  <p className="text-body-m font-semibold text-ink">
                    {entry.title[active]}{" "}
                    <span className="text-ink-muted">· {entry.period[active]}</span>
                  </p>
                  <p className="mt-1 text-body-s text-ink-soft">{entry.description[active]}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="print-block mt-8 print:mt-5">
            <h2 className="font-mono text-micro uppercase tracking-[0.16em] text-accent">
              {dict.cv.goals}
            </h2>
            <ul className="mt-3 space-y-2">
              {goals.map((goal) => (
                <li key={goal.id} className="text-body-s text-ink-soft">
                  <span className="font-semibold text-ink">{goal.title[active]} — </span>
                  {goal.description[active]}
                </li>
              ))}
            </ul>
          </section>

          <section className="print-block mt-8 border-t border-line pt-6 print:mt-5 print:pt-4">
            <h2 className="font-mono text-micro uppercase tracking-[0.16em] text-accent">
              {dict.cv.contact}
            </h2>
            <p className="mt-3 font-mono text-micro uppercase tracking-[0.1em] text-ink-soft">
              {site.email} · {site.phone} · {site.github}
            </p>
          </section>
        </article>
      </Container>
    </div>
  );
}
