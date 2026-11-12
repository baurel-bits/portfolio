import { ButtonLink, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { DownloadIcon } from "@/components/ui/icons";

/**
 * Le CV téléchargeable est le document lui-même, servi tel quel depuis
 * `public/cv/` : modifier ce fichier suffit à mettre le site à jour, aucune
 * copie du contenu n'est maintenue dans le code.
 */
const CV_FILE = "/cv/CV-Baurel-Bemmo-Fullstack.docx";
const CV_DOWNLOAD_NAME = "CV-Baurel-Bemmo-Fullstack.docx";

type DownloadCVButtonProps = {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  compact?: boolean;
};

export function DownloadCVButton({
  label,
  variant = "outline",
  size = "md",
  className,
  compact = false,
}: DownloadCVButtonProps) {
  return (
    <ButtonLink
      href={CV_FILE}
      download={CV_DOWNLOAD_NAME}
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
