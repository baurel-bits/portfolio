"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type RevealElement = "div" | "header" | "section" | "article" | "li" | "aside";

type RevealProps = {
  as?: RevealElement;
  delay?: number;
  className?: string;
  children: ReactNode;
};

export function Reveal({ as = "div", delay = 0, className, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const Tag = as as ElementType;

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
