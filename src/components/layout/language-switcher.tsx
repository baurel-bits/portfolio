"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  tone?: "paper" | "console";
};

const tones: Record<NonNullable<LanguageSwitcherProps["tone"]>, { active: string; idle: string }> = {
  paper: { active: "border-accent text-ink", idle: "border-transparent text-ink-muted hover:text-ink" },
  console: {
    active: "border-signal text-console-text",
    idle: "border-transparent text-console-muted hover:text-console-text",
  },
};

export function LanguageSwitcher({ locale, label, tone = "paper" }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const segments = pathname.split("/").filter(Boolean);
  const rest = segments.slice(1).join("/");

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.12em]"
    >
      {locales.map((code) => (
        <Link
          key={code}
          href={`/${code}${rest ? `/${rest}` : ""}`}
          hrefLang={code}
          aria-current={code === locale ? "true" : undefined}
          className={cn(
            "border-b py-0.5 transition-colors",
            code === locale ? tones[tone].active : tones[tone].idle,
          )}
        >
          {code}
        </Link>
      ))}
    </div>
  );
}
