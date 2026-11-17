"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type RevealElement = "div" | "header" | "section" | "article" | "li" | "aside";

type RevealProps = {
  as?: RevealElement;
  delay?: number;
  className?: string;
  /**
   * Rendu visible dès le premier paint, sans animation.
   * À utiliser pour le contenu déjà au-dessus de la ligne de flottaison : masqué,
   * il ne devient le LCP qu'après l'hydratation (3 s sur mobile bridé).
   */
  immediate?: boolean;
  children: ReactNode;
};

export function Reveal({ as = "div", delay = 0, className, immediate = false, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const Tag = as as ElementType;

  if (immediate) {
    return (
      <Tag ref={ref} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
