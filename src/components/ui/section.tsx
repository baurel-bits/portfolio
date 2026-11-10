import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export type SectionTone = "paper" | "sunken" | "console";

const tones: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  sunken: "bg-paper-sunken text-ink",
  console: "bg-console text-console-text",
};

type SectionProps = ComponentProps<"section"> & {
  tone?: SectionTone;
  container?: boolean;
  size?: "page" | "wide";
  children: ReactNode;
};

export function Section({
  tone = "paper",
  container = true,
  size = "page",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("scroll-mt-20 py-[clamp(4rem,9vw,7.5rem)]", tones[tone], className)}
      {...props}
    >
      {container ? <Container size={size}>{children}</Container> : children}
    </section>
  );
}

type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  tone?: SectionTone;
};

export function SectionHeader({
  label,
  title,
  description,
  tone = "paper",
}: SectionHeaderProps) {
  const isConsole = tone === "console";

  return (
    <Reveal as="header" className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <p
          className={cn(
            "font-mono text-micro uppercase tracking-[0.16em]",
            isConsole ? "text-console-muted" : "text-ink-muted",
          )}
        >
          {label}
        </p>
        <span aria-hidden="true" className="section-rule" />
        <h2
          className={cn(
            "mt-4 font-display text-display-l font-bold",
            isConsole ? "text-console-text" : "text-ink",
          )}
        >
          {title}
        </h2>
      </div>
      {description ? (
        <p
          className={cn(
            "max-w-[46ch] text-body-m lg:col-span-5 lg:justify-self-end",
            isConsole ? "text-console-muted" : "text-ink-soft",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
