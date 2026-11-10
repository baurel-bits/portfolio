import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "signal" | "quiet";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-medium transition-[background-color,color,border-color,transform] duration-200 hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "rounded-full bg-ink text-paper hover:bg-accent",
  outline:
    "rounded-sm border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-paper",
  signal: "rounded-full bg-signal text-console hover:bg-accent-on-dark",
  quiet: "rounded-sm text-ink-muted hover:text-accent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-body-s",
  md: "h-11 px-5 text-body-m",
  lg: "h-12 px-6 text-body-m",
};

export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <a className={buttonStyles(variant, size, className)} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonStyles(variant, size, className)} {...props} />;
}
