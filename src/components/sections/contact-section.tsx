import { ContactForm } from "@/components/forms/contact-form";
import { Section, SectionHeader } from "@/components/ui/section";
import { ArrowUpRightIcon, GitHubIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";

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

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex max-w-full items-start gap-3 break-all font-display text-heading-l font-semibold text-console-text underline decoration-signal decoration-2 underline-offset-4 transition-colors hover:text-signal"
          >
            <MailIcon className="mt-1.5 shrink-0 text-signal" />
            {site.email}
          </a>

          <dl className="mt-10 divide-y divide-console-line border-y border-console-line">
            <div className="flex items-center gap-3 py-4">
              <dt className="sr-only">{contact.phoneLabel}</dt>
              <PhoneIcon className="shrink-0 text-console-muted" />
              <dd>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="text-body-m text-console-text transition-colors hover:text-signal"
                >
                  {site.phone}
                </a>
              </dd>
            </div>

            <div className="flex items-center gap-3 py-4">
              <dt className="sr-only">{contact.locationLabel}</dt>
              <MapPinIcon className="shrink-0 text-console-muted" />
              <dd className="text-body-m text-console-text">{site.location[locale]}</dd>
            </div>

            <div className="flex items-center gap-3 py-4">
              <dt className="sr-only">{contact.githubLabel}</dt>
              <GitHubIcon className="shrink-0 text-console-muted" />
              <dd>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-body-m text-console-text transition-colors hover:text-signal"
                >
                  {site.githubHandle}
                  <ArrowUpRightIcon width={13} height={13} />
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-md border border-console-line bg-console-raised p-6 sm:p-8">
            <p className="font-mono text-micro uppercase tracking-[0.14em] text-console-muted">
              {contact.formTitle}
            </p>
            <ContactForm labels={contact.form} subjectPrefix={`${site.brand} — ${site.owner}`} />
          </div>
        </div>
      </div>
    </Section>
  );
}
