import { AvailabilityBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { CodeCard } from "@/components/ui/code-card";
import { Container } from "@/components/ui/container";
import { DownloadCVButton } from "@/components/ui/download-cv-button";
import { ArrowDownIcon } from "@/components/ui/icons";
import { Tag } from "@/components/ui/tag";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";

type HeroSectionProps = {
  locale: Locale;
  hero: Dictionary["hero"];
  nav: Dictionary["nav"];
};

const gridStyle = {
  backgroundImage:
    "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
  backgroundSize: "80px 80px",
};

export function HeroSection({ locale, hero, nav }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div
        aria-hidden="true"
        className="parallax-grid pointer-events-none absolute inset-0 hidden opacity-70 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_72%)] lg:block"
        style={gridStyle}
      />

      <Container className="relative py-[clamp(3.5rem,8vw,7rem)]">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p
              className="hero-fade font-mono text-micro uppercase tracking-[0.16em] text-ink-muted"
              style={{ animationDelay: "60ms" }}
            >
              {hero.eyebrow}
            </p>

            <h1 className="mt-6 font-display text-display-xl font-bold text-ink">
              <span className="block overflow-hidden">
                <span
                  className="hero-line block text-balance"
                  style={{ animationDelay: "120ms" }}
                >
                  {hero.titleFirst}
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="hero-line block text-balance text-accent"
                  style={{ animationDelay: "200ms" }}
                >
                  {hero.titleSecond}
                </span>
              </span>
            </h1>

            <p
              className="hero-fade mt-6 max-w-[46ch] text-body-l text-ink-soft"
              style={{ animationDelay: "320ms" }}
            >
              {hero.intro}
            </p>

            <div
              className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "400ms" }}
            >
              <ButtonLink href={`/${locale}#projets`} size="lg" variant="primary">
                {hero.primary}
                <ArrowDownIcon className="transition-transform duration-200 group-hover:translate-y-0.5" />
              </ButtonLink>
              <DownloadCVButton locale={locale} label={nav.cvLong} variant="outline" size="lg" />
            </div>

            <div
              className="hero-fade mt-10 flex flex-wrap items-center gap-2"
              style={{ animationDelay: "470ms" }}
            >
              <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-muted">
                {hero.stackLabel}
              </span>
              {site.stackPreview.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>

          <div className="hero-visual lg:col-span-5" style={{ animationDelay: "260ms" }}>
            <CodeCard caption={hero.codeCaption} meta={site.location[locale]} />
            <div className="mt-4 flex justify-start lg:justify-end">
              <AvailabilityBadge>{hero.availability}</AvailabilityBadge>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
