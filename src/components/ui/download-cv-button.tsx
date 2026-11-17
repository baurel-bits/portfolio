import { ButtonLink, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { DownloadIcon } from "@/components/ui/icons";

/**
 * Le CV téléchargeable est le document lui-même, servi tel quel depuis
 * `public/cv/` : modifier ce fichier suffit à mettre le site à jour, aucune
 * copie du contenu n'est maintenue dans le code.
 * Le PDF est le format servi ; le `.docx` du même nom reste la source éditable.
 */
const CV_FILE = "/cv/CV-Baurel-Bemmo-Fullstack.pdf";
const CV_DOWNLOAD_NAME = "CV-Baurel-Bemmo-Fullstack.pdf";

type DownloadCVButtonProps = {
  label: string;
  href?: string;
  download?: boolean | string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  compact?: boolean;
};

export function DownloadCVButton({
  label,
  href,
  download,
  variant = "outline",
  size = "md",
  className,
  compact = false,
}: DownloadCVButtonProps) {
  const targetHref = href ?? CV_FILE;
  const downloadAttr =
    download === true
      ? CV_DOWNLOAD_NAME
      : typeof download === "string"
        ? download
        : href
          ? undefined
          : CV_DOWNLOAD_NAME;

  return (
    <ButtonLink
      href={targetHref}
      download={downloadAttr}
      variant={variant}
      size={size}
      className={className}
      aria-label={compact ? label : undefined}
    >
      <DownloadIcon />
      {compact ? <span className="sr-only">{label}</span> : label}
    </ButtonLink>
  );
}
