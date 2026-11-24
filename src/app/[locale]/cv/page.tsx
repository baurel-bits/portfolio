import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { DownloadCVButton } from "@/components/ui/download-cv-button";
import { PrintButton } from "@/components/ui/print-button";
import { Reveal } from "@/components/ui/reveal";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BriefcaseIcon,
  CheckIcon,
  CodeIcon,
  GraduationCapIcon,
  LayersIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
  SparkleIcon,
} from "@/components/ui/icons";
import { educationEntries } from "@/data/education";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillDomains } from "@/data/skills";
import { CvSection } from "@/features/cv/cv-section";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site, siteUrl } from "@/lib/site";

type CvPageProps = {
  params: Promise<{ locale: string }>;
};

function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/** Projets mis en avant dans le CV. */
const CV_PROJECT_IDS = ["bibiotheque", "gestistock", "depensepro"] as const;

export async function generateMetadata({ params }: CvPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(resolveLocale(locale));

  const active = resolveLocale(locale);
  // `dict.cv.title` contient déjà le nom du propriétaire : le suffixer une
  // seconde fois produisait « Curriculum vitae — Baurel Bemmo — Baurel Bemmo ».
  const title = dict.cv.title;

  return {
    title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${active}/cv`,
      languages: { fr: "/fr/cv", en: "/en/cv", "x-default": "/fr/cv" },
    },
    openGraph: {
      title,
      description: dict.meta.description,
      url: `/${active}/cv`,
      type: "profile",
      siteName: site.brand,
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
  const cvProjects = CV_PROJECT_IDS.map((id) =>
    projects.find((project) => project.id === id),
  ).filter((project): project is (typeof projects)[number] => project !== undefined);

  return (
    <div data-theme="light" className="bg-white">
      <Container className="py-10 lg:py-14 print:px-0 print:py-0">
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/${active}`}
            className="group inline-flex min-h-11 items-center gap-2 font-mono text-micro uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink print:min-h-0"
          >
            <ArrowRightIcon
              width={13}
              height={13}
              className="rotate-180 transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:transition-none"
            />
            {dict.cv.back}
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <DownloadCVButton label={dict.cv.download} variant="outline" />
            <PrintButton label={dict.cv.print} />
          </div>
        </div>

        <p className="no-print mb-10 max-w-[60ch] text-body-s text-ink-muted">{dict.cv.note}</p>

        <article className="cv-doc mx-auto max-w-208 text-ink">
          <header className="print-block cv-header border-b border-line pb-7">
            <h1 className="font-display text-display-m font-bold uppercase tracking-[-0.02em]">
              {site.owner}
            </h1>
            <p className="mt-2 text-body-l text-ink-soft">{site.role[active]}</p>

            <ul className="cv-contact mt-6 flex flex-wrap gap-x-6 gap-y-3 text-body-s text-ink-soft">
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
                <a href={mailto} className="inline-block py-1 transition-colors hover:text-accent print:py-0">
                  {site.email}
                </a>
              </li>
              <li className="cv-meta flex items-center gap-2">
                <PhoneIcon width={14} height={14} className="shrink-0 text-accent" />
                <a href={tel} className="inline-block py-1 transition-colors hover:text-accent print:py-0">
                  {site.phone}
                </a>
              </li>
              <li className="cv-meta flex items-center gap-2">
                <WhatsAppIcon width={14} height={14} className="shrink-0 text-accent" />
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 transition-colors hover:text-accent print:py-0"
                >
                  {site.whatsapp}
                </a>
              </li>
              <li className="cv-meta flex items-center gap-2">
                <GitHubIcon width={14} height={14} className="shrink-0 text-accent" />
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 transition-colors hover:text-accent print:py-0"
                >
                  {site.githubHandle}
                </a>
                {site.githubAlt ? (
                  <>
                    <span className="text-ink-muted">·</span>
                    <a
                      href={site.githubAlt}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-1 transition-colors hover:text-accent print:py-0"
                    >
                      {site.githubAltHandle}
                    </a>
                  </>
                ) : null}
              </li>
              <li className="cv-meta flex items-center gap-2">
                <LinkedInIcon width={14} height={14} className="shrink-0 text-accent" />
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 transition-colors hover:text-accent print:py-0"
                >
                  LinkedIn
                </a>
              </li>
              <li className="cv-meta flex items-center gap-2">
                <ArrowUpRightIcon width={14} height={14} className="shrink-0 text-accent" />
                <a
                  href={`${siteUrl}/${active}/cv`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 transition-colors hover:text-accent print:py-0"
                >
                  {siteUrl.replace(/^https?:\/\//, "")}/{active}/cv
                </a>
              </li>
            </ul>
          </header>

          <CvSection icon={<SparkleIcon width={14} height={14} />} title={dict.cv.profile} delay={60}>
            <p className="max-w-[70ch] text-body-m text-ink-soft">{dict.cv.profileBody}</p>
          </CvSection>

          <CvSection icon={<BriefcaseIcon width={14} height={14} />} title={dict.cv.experience} delay={85}>
            <ul className="space-y-5">
              {experiences.map((exp) => (
                <li key={exp.id} className="cv-entry print-block">
                  <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4">
                    <p className="text-body-m font-semibold text-ink">{exp.role[active]}</p>
                    <p className="whitespace-nowrap font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">
                      {exp.period[active]}
                    </p>
                  </div>
                  <p className="text-body-s text-ink-muted">
                    {exp.company[active]} · {exp.location[active]}
                  </p>
                  <p className="mt-1 text-body-s text-ink-soft print:hidden">{exp.description[active]}</p>
                  <ul className="mt-2 space-y-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="relative pl-3 text-body-s text-ink-soft">
                        <span aria-hidden="true" className="absolute left-0 top-0">
                          •
                        </span>
                        {h[active]}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-1.5 text-body-s text-ink-muted">
                    <span className="font-semibold text-ink">{dict.cv.techLabel} :</span>{" "}
                    {exp.stack.join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection
            icon={<GraduationCapIcon width={14} height={14} />}
            title={dict.cv.education}
            delay={130}
          >
            <ul className="space-y-5">
              {educationEntries.map((entry) => (
                <li key={entry.id} className="cv-entry print-block">
                  <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4">
                    <p className="text-body-m font-semibold text-ink">{entry.title[active]}</p>
                    <p className="whitespace-nowrap font-mono text-micro uppercase tracking-[0.1em] text-ink-muted">
                      {entry.period[active]}
                    </p>
                  </div>
                  <p className="text-body-s text-ink-muted print:hidden">{entry.place[active]}</p>
                  <p className="mt-1 text-body-s text-ink-soft print:hidden">{entry.description[active]}</p>
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection icon={<LayersIcon width={14} height={14} />} title={dict.cv.projects} delay={165}>
            <ul className="space-y-5">
              {cvProjects.map((project) => (
                <li key={project.id} className="cv-entry print-block">
                  <p className="text-body-m font-semibold text-ink">{project.title[active]}</p>
                  <p className="mt-1 text-body-s text-ink-soft">
                    {(project.cvSummary ?? project.summary)[active]}
                  </p>
                  <p className="mt-1.5 text-body-s text-ink-muted">
                    <span className="font-semibold text-ink">{dict.cv.techLabel} :</span>{" "}
                    {project.stack.join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection icon={<CodeIcon width={14} height={14} />} title={dict.cv.skills} delay={200}>
            <ul className="grid gap-x-8 gap-y-1.5 sm:grid-cols-2 print:grid-cols-2">
              {skillDomains.map((domain) => (
                <li key={domain.id} className="text-body-s text-ink-soft">
                  <span className="font-semibold text-ink">{domain.title[active]} :</span>{" "}
                  {domain.items.join(", ")}
                </li>
              ))}
            </ul>
          </CvSection>

          <footer className="cv-footer mt-7 flex flex-wrap gap-x-6 gap-y-1.5 border-t border-line pt-3 text-body-s text-ink-soft">
            <p>
              <span className="font-semibold text-ink">{dict.cv.footerLanguages} :</span>{" "}
              {site.languages[active]}
            </p>
            <p>
              <span className="font-semibold text-ink">{dict.cv.footerInterests} :</span>{" "}
              {dict.cv.footerInterestsValue}
            </p>
            <p>{dict.cv.footerReferences}</p>
          </footer>

          {/* Rappel des coordonnées en bas de page écran. En impression, il est
              masqué : l'en-tête du document les porte déjà. */}
          <Reveal
            as="section"
            delay={310}
            className="print-block mt-9 border-t border-line pt-6 print:hidden"
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
