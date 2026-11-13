import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from "@/components/ui/icons";
import { Tag } from "@/components/ui/tag";
import { ProjectCover } from "@/features/projects/project-cover";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  index: number;
  locale: Locale;
  labels: Dictionary["projects"];
  className?: string;
};

export function ProjectCard({ project, index, locale, labels, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-clip rounded-md border border-console-line bg-console-raised transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-signal/70 hover:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.85)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100"
      />

      <ProjectCover project={project} locale={locale} labels={labels} />

      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <div className="flex items-center justify-between gap-4 font-mono text-micro uppercase tracking-[0.14em] text-console-muted transition-colors duration-300 group-hover:text-console-text">
          <span>P.{String(index).padStart(2, "0")}</span>
          {project.year ? (
            <span>
              {labels.yearLabel} {project.year}
            </span>
          ) : null}
        </div>

        <h3
          className={cn(
            "mt-5 font-display font-bold text-console-text",
            project.featured ? "text-display-m" : "text-heading-l",
          )}
        >
          {/* Lien étiré : toute la carte est cliquable, le titre reste le nom
              accessible du lien. Les liens externes repassent au-dessus. */}
          <Link
            href={`/${locale}/projets/${project.id}`}
            className="transition-colors duration-300 after:absolute after:inset-0 after:z-10 after:rounded-md after:content-[''] after:shadow-none hover:text-signal focus-visible:outline-none focus-visible:after:shadow-[inset_0_0_0_2px_var(--color-signal)]"
          >
            {project.title[locale]}
          </Link>
        </h3>

        <p className="mt-3 max-w-[54ch] text-body-m text-console-muted">{project.summary[locale]}</p>

        <div className="mt-6">
          <p className="font-mono text-micro uppercase tracking-[0.14em] text-console-muted">
            {labels.detailsLabel}
          </p>
          <ul className="mt-3 space-y-2">
            {project.details.map((detail) => (
              <li
                key={detail.en}
                className="flex gap-2.5 text-body-s text-console-text/85 transition-colors duration-300 group-hover:text-console-text"
              >
                <CheckIcon className="mt-1 shrink-0 text-signal" />
                {detail[locale]}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
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

        {project.links.length > 0 ? (
          <ul className="relative z-20 mt-6 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link inline-flex items-center gap-1.5 border-b border-console-line pb-1 font-mono text-micro uppercase tracking-[0.12em] text-console-text transition-colors duration-200 hover:border-signal hover:text-signal"
                >
                  {link.label[locale]}
                  <ArrowUpRightIcon
                    width={13}
                    height={13}
                    className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        <p
          aria-hidden="true"
          className="mt-auto flex items-center gap-2 pt-8 font-mono text-micro uppercase tracking-[0.14em] text-console-muted transition-colors duration-300 group-hover:text-signal"
        >
          {labels.viewProject}
          <ArrowRightIcon
            width={13}
            height={13}
            className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </p>
      </div>
    </article>
  );
}
