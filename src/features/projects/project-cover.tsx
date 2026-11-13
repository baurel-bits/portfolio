import Image from "next/image";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type ProjectCoverProps = {
  project: Project;
  locale: Locale;
  labels: Dictionary["projects"];
  /** Format large de la page de détail. */
  large?: boolean;
  /** Précharge la couverture : réservé à la première carte de la liste. */
  preload?: boolean;
};

/**
 * Couverture de projet.
 * Sans capture fournie, l'emplacement reste visible et clairement annoncé :
 * il n'est jamais remplacé par une image d'illustration présentée comme réelle.
 */
export function ProjectCover({
  project,
  locale,
  labels,
  large = false,
  preload = false,
}: ProjectCoverProps) {
  const hasLink = project.links.length > 0;

  return (
    <div
      className={cn(
        // `overflow-clip` découpe le visuel sans créer de scrollport : la
        // timeline view() reste liée à la page, pas à la carte.
        "relative w-full overflow-clip border-console-line bg-console",
        large ? "aspect-[16/10]" : "h-56 border-b sm:h-64 lg:h-72",
      )}
    >
      <div className="cover-scroll h-full w-full">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt[locale]}
            width={project.cover.width}
            height={project.cover.height}
            preload={preload}
            sizes={large ? "(min-width: 1024px) 34vw, 100vw" : "(min-width: 1024px) 58vw, 100vw"}
            className="cover-in h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="cover-placeholder flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center">
            <span className="font-mono text-micro uppercase tracking-[0.14em] text-console-muted">
              {labels.coverPending}
            </span>
            <span className="max-w-[30ch] text-body-s text-console-muted/70">{labels.coverNote}</span>
          </div>
        )}
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-console via-console/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <span
        aria-hidden="true"
        className="absolute inset-x-5 bottom-4 flex items-center justify-between gap-3 font-mono text-micro uppercase tracking-[0.14em] text-console-text opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-1"
      >
        <span className="truncate">{project.title[locale]}</span>
        {hasLink ? <ArrowUpRightIcon width={14} height={14} className="shrink-0" /> : null}
      </span>
    </div>
  );
}
