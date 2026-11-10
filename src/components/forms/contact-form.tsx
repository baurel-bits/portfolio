"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { MailIcon } from "@/components/ui/icons";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";
import { isWeb3FormsConfigured, sendContactMessage } from "@/lib/web3forms";

type ContactFormLabels = Dictionary["contact"]["form"];
type FieldName = "name" | "email" | "subject" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";
type ErrorKind = "network" | "rejected" | "rate-limited";

const emptyValues: Values = { name: "", email: "", subject: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labelClassName = "font-mono text-micro uppercase tracking-[0.12em] text-console-muted";
const fieldClassName =
  "mt-2 w-full rounded-sm border border-console-line-strong bg-console px-3 py-2.5 text-body-m text-console-text transition-colors placeholder:text-console-muted/60 focus:border-signal aria-invalid:border-danger-on-dark";

type ContactFormProps = {
  labels: ContactFormLabels;
  subjectPrefix: string;
};

export function ContactForm({ labels, subjectPrefix }: ContactFormProps) {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorKind, setErrorKind] = useState<ErrorKind | null>(null);
  const [honeypot, setHoneypot] = useState(false);

  const pending = useRef(false);
  const messageRef = useRef<HTMLDivElement>(null);

  const isSubmitting = status === "submitting";

  useEffect(() => {
    if (status === "success" || status === "error") {
      messageRef.current?.focus({ preventScroll: true });
    }
  }, [status]);

  function validateField(field: FieldName, current: Values): string | undefined {
    const value = current[field].trim();

    if (!value) return labels.required;
    if (field === "email" && !emailPattern.test(value)) return labels.invalidEmail;

    return undefined;
  }

  function validate(current: Values): Errors {
    const next: Errors = {};

    for (const field of Object.keys(current) as FieldName[]) {
      const error = validateField(field, current);
      if (error) next[field] = error;
    }

    return next;
  }

  function handleChange(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
    setErrorKind(null);
  }

  function handleBlur(field: FieldName) {
    const error = validateField(field, values);
    setErrors((current) => ({ ...current, [field]: error }));
  }

  function showSuccess() {
    setValues(emptyValues);
    setErrors({});
    setErrorKind(null);
    setStatus("success");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Garde synchrone : un double clic ne déclenche jamais deux envois.
    if (pending.current) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    // Honeypot : un robot qui coche le champ n'obtient aucune information.
    if (honeypot) {
      showSuccess();
      return;
    }

    pending.current = true;
    setStatus("submitting");
    setErrorKind(null);

    try {
      const outcome = await sendContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: `${subjectPrefix} — ${values.subject.trim()}`,
        message: values.message.trim(),
      });

      if (outcome.status === "success") {
        showSuccess();
      } else {
        setErrorKind(outcome.status);
        setStatus("error");
      }
    } catch {
      setErrorKind("network");
      setStatus("error");
    } finally {
      pending.current = false;
    }
  }

  if (!isWeb3FormsConfigured) {
    return (
      <div className="mt-6 rounded-sm border border-console-line bg-console p-5">
        <p className="text-body-s text-console-muted">{labels.notConfigured}</p>
        <ButtonLink
          href={`mailto:${site.email}`}
          variant="signal"
          size="md"
          className="mt-4 max-w-full break-all"
        >
          <MailIcon />
          {site.email}
        </ButtonLink>
      </div>
    );
  }

  const errorMessage =
    errorKind === "network"
      ? labels.networkError
      : errorKind === "rate-limited"
        ? labels.rateLimited
        : labels.error;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
      className="mt-6 flex flex-col gap-5"
    >
      <p className="text-micro text-console-muted">{labels.requiredHint}</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClassName}>
            {labels.name} <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            disabled={isSubmitting}
            value={values.name}
            onChange={(event) => handleChange("name", event.target.value)}
            onBlur={() => handleBlur("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldClassName}
          />
          {errors.name ? (
            <p id="contact-name-error" role="alert" className="mt-2 text-micro text-danger-on-dark">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClassName}>
            {labels.email} <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            disabled={isSubmitting}
            value={values.email}
            onChange={(event) => handleChange("email", event.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClassName}
          />
          {errors.email ? (
            <p id="contact-email-error" role="alert" className="mt-2 text-micro text-danger-on-dark">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClassName}>
          {labels.subject} <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          disabled={isSubmitting}
          value={values.subject}
          onChange={(event) => handleChange("subject", event.target.value)}
          onBlur={() => handleBlur("subject")}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          className={fieldClassName}
        />
        {errors.subject ? (
          <p id="contact-subject-error" role="alert" className="mt-2 text-micro text-danger-on-dark">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClassName}>
          {labels.message} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          disabled={isSubmitting}
          value={values.message}
          onChange={(event) => handleChange("message", event.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={fieldClassName}
        />
        {errors.message ? (
          <p id="contact-message-error" role="alert" className="mt-2 text-micro text-danger-on-dark">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-botcheck">{labels.honeypot}</label>
        <input
          id="contact-botcheck"
          name="botcheck"
          type="checkbox"
          tabIndex={-1}
          autoComplete="off"
          checked={honeypot}
          onChange={(event) => setHoneypot(event.target.checked)}
        />
      </div>

      <Button
        type="submit"
        variant="signal"
        disabled={isSubmitting}
        className="self-start"
        aria-label={isSubmitting ? labels.submitting : labels.submit}
      >
        {isSubmitting ? (
          <>
            <span
              aria-hidden="true"
              className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
            />
            {labels.submitting}
          </>
        ) : (
          labels.submit
        )}
      </Button>

      <div
        ref={messageRef}
        tabIndex={-1}
        aria-live="polite"
        className="empty:hidden focus-visible:outline-none"
      >
        {status === "success" ? (
          <p className="rounded-sm border border-signal/40 bg-signal/10 p-4 text-body-s text-signal">
            <span className="font-semibold">{labels.success}</span> {labels.successDetail}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="rounded-sm border border-danger-on-dark/40 bg-danger/15 p-4 text-body-s text-danger-on-dark">
            {errorMessage}
          </p>
        ) : null}
      </div>

      <p className="text-micro text-console-muted">{labels.note}</p>
    </form>
  );
}
