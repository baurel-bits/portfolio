import { ButtonLink, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { DownloadIcon } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";

type DownloadCVButtonProps = {
  locale: Locale;
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  compact?: boolean;
};

export function DownloadCVButton({
  locale,
  label,
  variant = "outline",
  size = "md",
  className,
  compact = false,
}: DownloadCVButtonProps) {
  return (
    <ButtonLink
      href={`/cv/baurel-cv-${locale}.pdf`}
      download={`CV-Baurel-${locale.toUpperCase()}.pdf`}
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
