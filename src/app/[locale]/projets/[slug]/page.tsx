import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { projects } from "@/data/projects";
import { ProjectCover } from "@/features/projects/project-cover";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";

// Seuls les projets de `src/data/projects.ts` existent : tout autre slug est un 404.
type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

function findProject(slug: string) {
  return projects.find((project) => project.id === slug);
}

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.id })));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const active = resolveLocale(locale);
  const project = findProject(slug);

  // Validé avant le streaming de la page : un slug inconnu répond 404 dès la
  // première requête, sans page « 404 » servie en 200.
  if (!project) notFound();

  const title = `${project.title[active]} — ${site.owner}`;
  const description = project.summary[active];
  const url = `/${active}/projets/${project.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `/fr/projets/${project.id}`,
        en: `/en/projets/${project.id}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: site.brand,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const active = resolveLocale(locale);
  const project = findProject(slug);

  if (!project) notFound();

  const labels = getDictionary(active).projects;
  const index = projects.findIndex((entry) => entry.id === project.id);
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null;
  const kind = project.kind === "fullstack" ? labels.kindFullstack : labels.kindFrontend;

  return (
    <Section tone="console" size="wide">
      <Link
        href={`/${active}#projets`}
        className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-[0.12em] text-console-muted transition-colors hover:text-signal"
      >
        <ArrowRightIcon width={13} height={13} className="rotate-180" />
        {labels.backToProjects}
      </Link>

      <Reveal className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <p className="font-mono text-micro uppercase tracking-[0.14em] text-console-muted">
            {kind} · P.{String(index + 1).padStart(2, "0")}
          </p>

          <h1 className="mt-6 font-display text-display-l font-bold text-console-text">
            {project.title[active]}
          </h1>

          <p className="mt-6 max-w-[52ch] text-body-l text-console-muted">{project.summary[active]}</p>

          <div className="mt-8">
            <p className="font-mono text-micro uppercase tracking-[0.14em] text-console-muted">
              {labels.stackLabel}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li key={item}>
                  <Tag tone="console">{item}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5">
          <ProjectCover project={project} locale={active} labels={labels} large />
        </div>
      </Reveal>

      <div className="mt-16 grid gap-10 border-t border-console-line pt-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="font-mono text-micro uppercase tracking-[0.14em] text-console-muted">
            {labels.detailsLabel}
          </h2>
          <ul className="mt-5 space-y-3">
            {project.details.map((detail) => (
              <li key={detail.en} className="flex gap-3 text-body-m text-console-text/85">
                <CheckIcon className="mt-1 shrink-0 text-signal" />
                {detail[active]}
              </li>
            ))}
          </ul>
        </Reveal>

        {project.links.length > 0 ? (
          <Reveal className="lg:col-span-5" delay={90}>
            <h2 className="font-mono text-micro uppercase tracking-[0.14em] text-console-muted">
              {labels.linksLabel}
            </h2>
            <ul className="mt-5 space-y-3">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-2 border-b border-console-line pb-1 font-mono text-micro uppercase tracking-[0.12em] text-console-text transition-colors hover:border-signal hover:text-signal"
                  >
                    {link.label[active]}
                    <ArrowUpRightIcon
                      width={13}
                      height={13}
                      className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>

      {next ? (
        <Reveal className="mt-16 border-t border-console-line pt-8">
          <Link
            href={`/${active}/projets/${next.id}`}
            className="group/next flex items-center justify-between gap-6"
          >
            <span>
              <span className="block font-mono text-micro uppercase tracking-[0.14em] text-console-muted">
                {labels.nextProject}
              </span>
              <span className="mt-2 block font-display text-heading-l font-semibold text-console-text transition-colors group-hover/next:text-signal">
                {next.title[active]}
              </span>
            </span>
            <ArrowRightIcon
              width={22}
              height={22}
              className="shrink-0 text-console-text transition-transform duration-200 group-hover/next:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </Reveal>
      ) : null}
    </Section>
  );
}
