import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { GitHubIcon, MailIcon } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";

type FooterProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  footer: Dictionary["footer"];
};

export function Footer({ locale, nav, footer }: FooterProps) {
  const links = [
    { hash: "#a-propos", label: nav.about },
    { hash: "#competences", label: nav.skills },
    { hash: "#projets", label: nav.projects },
    { hash: "#formation", label: nav.education },
    { hash: "#objectifs", label: nav.goals },
    { hash: "#contact", label: nav.contact },
  ];

  return (
    <footer className="no-print border-t border-console-line bg-console text-console-text">
      <Container size="wide" className="py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-heading-l font-bold tracking-[-0.03em]">
              TEKER<span className="text-signal">/</span>Codes
            </p>
            <p className="mt-4 max-w-xs text-body-s text-console-muted">{footer.tagline}</p>
            <div className="mt-6">
              <LanguageSwitcher locale={locale} label={nav.language} tone="console" />
            </div>
          </div>

          <nav aria-label={footer.navigation}>
            <p className="font-mono text-micro uppercase tracking-[0.16em] text-console-muted">
              {footer.navigation}
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-3">
              {links.map((link) => (
                <li key={link.hash}>
                  <Link
                    href={`/${locale}${link.hash}`}
                    className="text-body-s text-console-text transition-colors hover:text-signal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-micro uppercase tracking-[0.16em] text-console-muted">
              {footer.connect}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-body-s text-console-text transition-colors hover:text-signal"
                >
                  <MailIcon />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-body-s text-console-text transition-colors hover:text-signal"
                >
                  <GitHubIcon />
                  {site.githubHandle}
                </a>
              </li>
              {site.githubAlt ? (
                <li>
                  <a
                    href={site.githubAlt}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-body-s text-console-text transition-colors hover:text-signal"
                  >
                    <GitHubIcon />
                    {site.githubAltHandle}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-console-line pt-6 font-mono text-micro uppercase tracking-[0.12em] text-console-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {site.owner} · {footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span>{footer.built}</span>
            <a href="#top" className="transition-colors hover:text-signal">
              {footer.backToTop}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
