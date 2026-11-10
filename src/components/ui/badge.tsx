import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AvailabilityBadgeProps = {
  children: ReactNode;
  tone?: "paper" | "console";
  className?: string;
};

export function AvailabilityBadge({ children, tone = "paper", className }: AvailabilityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-micro uppercase tracking-[0.12em]",
        tone === "console" ? "border-console-line text-console-text" : "border-line text-ink-soft",
        className,
      )}
    >
      <span className="relative flex size-2" aria-hidden="true">
        <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
        <span className="relative size-2 rounded-full bg-accent" />
      </span>
      {children}
    </span>
  );
}
