import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

type CvSectionProps = {
  icon: ReactNode;
  title: string;
  /** Décalage d'apparition, pour une entrée en cascade. */
  delay?: number;
  children: ReactNode;
};

/**
 * Bloc du CV : icône en repère, titre en petites capitales et filet d'accent
 * qui se déploie à l'entrée dans le viewport. Toutes les animations sont en
 * CSS et se désactivent en impression comme avec `prefers-reduced-motion`.
 */
export function CvSection({ icon, title, delay = 0, children }: CvSectionProps) {
  return (
    <Reveal as="section" delay={delay} className="print-block mt-9 print:mt-6">
      <div className="flex items-center gap-3 border-b border-line pb-2">
        <span className="cv-badge flex size-7 shrink-0 items-center justify-center rounded-sm border border-line bg-paper-raised text-accent">
          {icon}
        </span>
        <h2 className="font-mono text-micro uppercase tracking-[0.16em] text-ink-muted">{title}</h2>
        <span className="cv-rule ml-auto" aria-hidden="true" />
      </div>
      <div className="mt-4">{children}</div>
    </Reveal>
  );
}
