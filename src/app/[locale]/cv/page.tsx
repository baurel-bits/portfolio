import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { DownloadCVButton } from "@/components/ui/download-cv-button";
import { PrintButton } from "@/components/ui/print-button";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BriefcaseIcon,
  CheckIcon,
  CodeIcon,
  DatabaseIcon,
  GlobeIcon,
  GraduationCapIcon,
  LayersIcon,
  GitHubIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
  ServerIcon,
  SmartphoneIcon,
  SparkleIcon,
  TargetIcon,
  TerminalIcon,
} from "@/components/ui/icons";
import { educationEntries } from "@/data/education";
import { goals } from "@/data/goals";
import { projects } from "@/data/projects";
import { skillDomains } from "@/data/skills";
import { CvSection } from "@/features/cv/cv-section";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";

type CvPageProps = {
  params: Promise<{ locale: string }>;
};

function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/** Icône de chaque domaine de compétence, alignée sur les données de `src/data`. */
const domainIcons: Record<string, ReactNode> = {
  frontend: <CodeIcon width={13} height={13} />,
  mobile: <SmartphoneIcon width={13} height={13} />,
  backend: <ServerIcon width={13} height={13} />,
  data: <DatabaseIcon width={13} height={13} />,
  tools: <TerminalIcon width={13} height={13} />,
  architecture: <LayersIcon width={13} height={13} />,
};

export async function generateMetadata({ params }: CvPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(resolveLocale(locale));

  const active = resolveLocale(locale);
  const title = `${dict.cv.title} — ${site.owner}`;

  return {
    title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${active}/cv`,
      languages: { fr: "/fr/cv", en: "/en/cv" },
    },
    openGraph: {
      title,
      description: dict.meta.description,
      url: `/${active}/cv`,
      type: "profile",
      images: [{ url: `/${active}/opengraph-image`, width: 1200, height: 630, alt: dict.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.meta.description,
      images: [`/${active}/opengraph-image`],
    },
    robots: { index: false, follow: true },
  };
}

export default async function CvPage({ params }: CvPageProps) {
  const { locale } = await params;
  const active = resolveLocale(locale);
  const dict = getDictionary(active);

  const mailto = `mailto:${site.email}`;
  const tel = `tel:${site.phoneHref}`;

  return (
    <div data-theme="light" className="bg-white">
      <Container className="py-10 lg:py-14 print:px-0 print:py-0">
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/${active}`}
            className="group inline-flex items-center gap-2 font-mono text-micro uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowRightIcon
              width={13}
              height={13}
              className="rotate-180 transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:transition-none"
            />
            {dict.cv.back}
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <DownloadCVButton label={dict.cv.download} variant="outline" size="sm" />
            <PrintButton label={dict.cv.print} />
          </div>
        </div>

        <p className="no-print mb-10 max-w-[60ch] text-body-s text-ink-muted">{dict.cv.note}</p>

        <article className="mx-auto max-w-208 text-ink">
          <header className="print-block cv-header relative overflow-hidden border-b border-line pb-7">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div className="flex items-start gap-4">
                <Image
                  src="/cv/teker.jpeg"
                  alt={dict.cv.photoAlt}
                  width={96}
                  height={96}
                  className="size-24 shrink-0 rounded-full mt-1 object-cover object-[center_18%] ring-2 ring-line-strong"
                  priority
                />
                <div>
                  <p className="font-mono text-micro uppercase tracking-[0.16em] text-ink-muted">
                    {site.wordmark}
                  </p>
                  <h1 className="mt-3 font-display text-display-l font-bold">{site.owner}</h1>
                  <p className="mt-2 text-body-l text-ink-soft">{site.role[active]}</p>
                </div>
              </div>
              <p className="cv-stamp font-mono text-micro uppercase tracking-[0.14em] text-ink-muted">
                {dict.cv.title}
              </p>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-body-s text-ink-soft">
              <li className="cv-meta flex items-center gap-2">
                <MapPinIcon width={14} height={14} className="shrink-0 text-accent" />
                {site.location[active]}
              </li>
              <li className="cv-meta flex items-center gap-2">
                <CheckIcon width={14} height={14} className="shrink-0 text-accent" />
                {site.availability[active]}
              </li>
              <li className="cv-meta flex items-center gap-2">
                <MailIcon width={14} height={14} className="shrink-0 text-accent" />
                <a href={mailto} className="transition-colors hover:text-accent">
                  {site.email}
                </a>
              </li>
              <li className="cv-meta flex items-center gap-2">
                <PhoneIcon width={14} height={14} className="shrink-0 text-accent" />
                <a href={tel} className="transition-colors hover:text-accent">
                  {site.phone}
                </a>
              </li>
              <li className="cv-meta flex items-center gap-2">
                <WhatsAppIcon width={14} height={14} className="shrink-0 text-accent" />
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {site.whatsapp}
                </a>
              </li>
              <li className="cv-meta flex items-center gap-2">
                <GitHubIcon width={14} height={14} className="shrink-0 text-accent" />
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {site.githubHandle}
                </a>
                {site.githubAlt ? (
                  <>
                    <span className="text-ink-muted">·</span>
                    <a
                      href={site.githubAlt}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      {site.githubAltHandle}
                    </a>
                  </>
                ) : null}
              </li>
              <li className="cv-meta flex items-center gap-2">
                <GlobeIcon width={14} height={14} className="shrink-0 text-accent" />
                {site.languages[active]}
              </li>
            </ul>
          </header>

          <CvSection icon={<SparkleIcon width={14} height={14} />} title={dict.cv.profile} delay={60}>
            <p className="max-w-[70ch] text-body-m text-ink-soft">{dict.cv.profileBody}</p>
          </CvSection>

          <CvSection icon={<CodeIcon width={14} height={14} />} title={dict.cv.skills} delay={110}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {skillDomains.map((domain) => (
                <li
                  key={domain.id}
                  className="cv-domain group/domain rounded-sm border border-line bg-paper-raised p-4 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong motion-reduce:hover:translate-y-0"
                >
                  <p className="flex items-center gap-2 text-body-m font-semibold text-ink">
                    <span className="text-accent transition-transform duration-200 group-hover/domain:scale-110 motion-reduce:transition-none">
                      {domainIcons[domain.id]}
                    </span>
                    {domain.title[active]}
                  </p>
                  <p className="mt-1 text-body-s text-ink-muted">{domain.description[active]}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {domain.items.map((item) => (
                      <li key={item}>
                        <Tag>{item}</Tag>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection icon={<BriefcaseIcon width={14} height={14} />} title={dict.cv.projects} delay={160}>
            <ul className="space-y-5">
              {projects.map((project) => (
                <li key={project.id} className="cv-entry group/entry print-block">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-body-m font-semibold text-ink">{project.title[active]}</p>
                    <Link
                      href={`/${active}/projets/${project.id}`}
                      className="no-print inline-flex items-center gap-1 font-mono text-micro uppercase tracking-[0.1em] text-ink-muted transition-colors hover:text-accent"
                    >
                      {project.year ?? dict.projects.viewProject}
                      <ArrowUpRightIcon
                        width={11}
                        height={11}
                        className="transition-transform duration-200 group-hover/entry:-translate-y-0.5 group-hover/entry:translate-x-0.5 motion-reduce:transition-none"
                      />
                    </Link>
                  </div>
                  <p className="mt-1 text-body-s text-ink-soft">{project.summary[active]}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <li key={item}>
                        <Tag>{item}</Tag>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection
            icon={<GraduationCapIcon width={14} height={14} />}
            title={dict.cv.education}
            delay={210}
          >
            <ol className="relative space-y-5 pl-6">
              <span
                aria-hidden="true"
                className="cv-timeline absolute inset-y-1 left-[3px] w-px bg-line"
              />
              {educationEntries.map((entry) => (
                <li key={entry.id} className="relative print-block">
                  <span
                    aria-hidden="true"
                    className="absolute -left-6 top-1.5 size-2 rounded-full border border-accent bg-paper-raised"
                  />
                  <p className="font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">
                    {entry.period[active]}
                  </p>
                  <p className="mt-1 text-body-m font-semibold text-ink">{entry.title[active]}</p>
                  <p className="text-body-s text-ink-muted">{entry.place[active]}</p>
                  <p className="mt-1 text-body-s text-ink-soft">{entry.description[active]}</p>
                </li>
              ))}
            </ol>
          </CvSection>

          <CvSection icon={<TargetIcon width={14} height={14} />} title={dict.cv.goals} delay={260}>
            <ul className="space-y-3">
              {goals.map((goal) => (
                <li key={goal.id} className="flex gap-3 text-body-s text-ink-soft">
                  <ArrowRightIcon
                    width={13}
                    height={13}
                    className="mt-1 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-semibold text-ink">{goal.title[active]} — </span>
                    {goal.description[active]}
                  </span>
                </li>
              ))}
            </ul>
          </CvSection>

          <Reveal
            as="section"
            delay={310}
            className="print-block mt-9 border-t border-line pt-6 print:mt-6 print:pt-4"
          >
            <h2 className="font-mono text-micro uppercase tracking-[0.16em] text-accent">
              {dict.cv.contact}
            </h2>
            <p className="mt-3 font-mono text-micro uppercase tracking-[0.1em] text-ink-soft">
              {site.email} · {site.phone} · {site.githubHandle}
            </p>
          </Reveal>
        </article>
      </Container>
    </div>
  );
}
