import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export type SectionTone = "paper" | "sunken" | "console";

// Sur fond `console`, l'anneau de focus passe au signal (15:1) : l'accent
// n'y atteint pas les 3:1 exigés pour un indicateur de focus.
const tones: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  sunken: "bg-paper-sunken text-ink",
  console: "bg-console text-console-text [--focus-ring:var(--color-signal)]",
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
  /** `h1` quand cet en-tête est le titre principal de la page (index). */
  titleLevel?: "h1" | "h2";
  /** Ne pas animer l'en-tête : contenu au-dessus de la ligne de flottaison. */
  immediate?: boolean;
};

export function SectionHeader({
  label,
  title,
  description,
  tone = "paper",
  titleLevel = "h2",
  immediate = false,
}: SectionHeaderProps) {
  const isConsole = tone === "console";
  const Title = titleLevel;

  return (
    <Reveal
      as="header"
      immediate={immediate}
      className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end"
    >
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
        <Title
          className={cn(
            "mt-4 font-display text-display-l font-bold",
            isConsole ? "text-console-text" : "text-ink",
          )}
        >
          {title}
        </Title>
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
