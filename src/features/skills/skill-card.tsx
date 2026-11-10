import type { ComponentType, SVGProps } from "react";
import { Tag } from "@/components/ui/tag";
import { CodeIcon, DatabaseIcon, ServerIcon, TerminalIcon } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";
import type { SkillDomain } from "@/types";

type SkillCardProps = {
  domain: SkillDomain;
  index: number;
  locale: Locale;
};

const domainIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  frontend: CodeIcon,
  backend: ServerIcon,
  data: DatabaseIcon,
  tools: TerminalIcon,
};

export function SkillCard({ domain, index, locale }: SkillCardProps) {
  const Icon = domainIcons[domain.id] ?? CodeIcon;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-paper-raised p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
      />

      <div className="flex items-center justify-between">
        <span className="font-mono text-micro uppercase tracking-[0.14em] text-ink-muted transition-colors duration-300 group-hover:text-accent">
          {String(index).padStart(2, "0")}
        </span>
        <Icon
          width={18}
          height={18}
          className="text-ink-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:text-accent"
        />
      </div>

      <h3 className="mt-5 font-display text-heading-l font-semibold text-ink">
        {domain.title[locale]}
      </h3>

      <p className="mt-2 text-body-s text-ink-soft">{domain.description[locale]}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {domain.items.map((item) => (
          <li key={item}>
            <Tag>{item}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}
