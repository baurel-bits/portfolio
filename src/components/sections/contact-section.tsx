import { ContactForm } from "@/components/forms/contact-form";
import { Section, SectionHeader } from "@/components/ui/section";
import {
  ArrowUpRightIcon,
  DownloadIcon,
  GitHubIcon,
  GitLabIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";

// Affichage des deux comptes GitHub si le second est configuré.
function hasSecondGitHub(): boolean {
  return Boolean(site.githubAlt && site.githubAlt.trim().length > 0);
}

type ContactSectionProps = {
  locale: Locale;
  contact: Dictionary["contact"];
};

export function ContactSection({ locale, contact }: ContactSectionProps) {
  return (
    <Section id="contact" tone="console" size="wide">
      <SectionHeader
        label={contact.label}
        title={contact.title}
        description={contact.lead}
        tone="console"
      />

      {/* Inspiration : mises en page de portfolio à la Simon-Ingelson / Readymag
          — contact visible sans formulaire, puis formulaire secondaire. */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <dl className="divide-y divide-console-line border-y border-console-line">
            <div className="flex items-start gap-4 py-4">
              <MailIcon className="mt-1 shrink-0 text-signal" />
              <div className="min-w-0">
                <dt className="font-mono text-micro uppercase tracking-[0.12em] text-console-muted">
                  {contact.emailLabel}
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="font-display text-heading-l font-semibold break-all text-console-text underline decoration-signal decoration-2 underline-offset-4 transition-colors hover:text-signal"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4 py-4">
              <PhoneIcon className="mt-1 shrink-0 text-console-muted" />
              <div className="min-w-0">
                <dt className="font-mono text-micro uppercase tracking-[0.12em] text-console-muted">
                  {contact.phoneLabel}
                </dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="text-body-m text-console-text transition-colors hover:text-signal"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4 py-4">
              <WhatsAppIcon className="mt-1 shrink-0 text-console-muted" />
              <div className="min-w-0">
                <dt className="font-mono text-micro uppercase tracking-[0.12em] text-console-muted">
                  {contact.whatsappLabel}
                </dt>
                <dd className="mt-1">
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-body-m text-console-text transition-colors hover:text-signal"
                  >
                    {site.whatsapp}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4 py-4">
              <MapPinIcon className="mt-1 shrink-0 text-console-muted" />
              <div className="min-w-0">
                <dt className="font-mono text-micro uppercase tracking-[0.12em] text-console-muted">
                  {contact.locationLabel}
                </dt>
                <dd className="mt-1 text-body-m text-console-text">{site.location[locale]}</dd>
              </div>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-body-m font-mono uppercase tracking-wider text-console-muted transition-colors hover:text-console-text hover:bg-console/40"
            >
              <GitHubIcon className="shrink-0" />
              {site.githubHandle}
              <ArrowUpRightIcon className="shrink-0" width={14} height={14} />
            </a>
            <a
              href={site.gitlab}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-body-m font-mono uppercase tracking-wider text-console-muted transition-colors hover:text-console-text hover:bg-console/40"
            >
              <GitLabIcon className="shrink-0" />
              {site.gitlabHandle}
              <ArrowUpRightIcon className="shrink-0" width={14} height={14} />
            </a>
            {hasSecondGitHub() && (
              <a
                href={site.githubAlt}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-body-m font-mono uppercase tracking-wider text-console-muted transition-colors hover:text-console-text hover:bg-console/40"
              >
                <GitHubIcon className="shrink-0" />
                {site.githubAltHandle}
                <ArrowUpRightIcon className="shrink-0" width={14} height={14} />
              </a>
            )}
            <a
              href={`/${locale}/cv`}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-body-m font-mono uppercase tracking-wider text-console-muted transition-colors hover:bg-console/40 hover:text-console-text"
            >
              <DownloadIcon className="shrink-0" />
              {contact.cvLabel}
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="flex flex-col gap-6">
            <div className="rounded-md border border-console-line bg-console-raised p-6 sm:p-8">
              <p className="font-mono text-micro uppercase tracking-[0.14em] text-console-muted">
                {contact.formTitle}
              </p>
              <ContactForm labels={contact.form} subjectPrefix={`${site.brand} — ${site.owner}`} />
            </div>

            <p className="text-body-s text-console-muted">{contact.form.note}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
