import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagProps = {
  children: ReactNode;
  tone?: "paper" | "console";
  className?: string;
};

export function Tag({ children, tone = "paper", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs border px-2 py-1 font-mono text-micro uppercase tracking-[0.1em]",
        tone === "console"
          ? "border-console-line bg-console text-console-muted"
          : "border-line bg-paper-raised text-ink-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}
