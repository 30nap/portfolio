"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { buttonClasses } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";
import type { UiDictionary } from "@/types/content";

type Field = "name" | "email" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_LENGTH: Record<Field, number> = { name: 100, email: 254, message: 5000 };
const MIN_MESSAGE_LENGTH = 10;

interface ContactFormProps {
  /** JSON endpoint. When null, the form opens a prefilled email instead. */
  endpoint: string | null;
  /** Recipient for the mailto fallback. */
  email: string | null;
  labels: UiDictionary["contact"];
}

function validate(values: Values, errors: UiDictionary["contact"]["errors"]): Errors {
  const result: Errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) result.name = errors.nameRequired;
  if (!email) result.email = errors.emailRequired;
  else if (!EMAIL_PATTERN.test(email)) result.email = errors.emailInvalid;
  if (!message) result.message = errors.messageRequired;
  else if (message.length < MIN_MESSAGE_LENGTH) result.message = errors.messageTooShort;

  return result;
}

export function ContactForm({ endpoint, email, labels }: ContactFormProps) {
  const formId = useId();
  const [values, setValues] = useState<Values>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const fieldRefs = useRef<Partial<Record<Field, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  function update(field: Field, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    // Re-validate live only after the first submit attempt, so visitors are not scolded while typing.
    if (submitted) setErrors(validate(next, labels.errors));
    if (status !== "idle" && status !== "sending") setStatus("idle");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const nextErrors = validate(values, labels.errors);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Field[])[0];
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };

    // Honeypot: real visitors never see or fill this field.
    const honeypot = new FormData(event.currentTarget).get("company");
    if (honeypot) {
      setStatus("sent");
      return;
    }

    if (endpoint) {
      setStatus("sending");
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        setStatus("sent");
        setValues({ name: "", email: "", message: "" });
        setSubmitted(false);
      } catch {
        setStatus("error");
      }
      return;
    }

    if (email) {
      const subject = labels.mailSubject.replace("{name}", payload.name);
      const body = `${payload.message}\n\n— ${payload.name} (${payload.email})`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
    }
  }

  const hasErrors = submitted && Object.keys(errors).length > 0;

  function fieldProps(field: Field) {
    const errorId = `${formId}-${field}-error`;
    return {
      id: `${formId}-${field}`,
      name: field,
      value: values[field],
      maxLength: MAX_LENGTH[field],
      "aria-invalid": errors[field] ? true : undefined,
      "aria-describedby": errors[field] ? errorId : undefined,
      className: cn(
        "w-full rounded-xl border bg-surface/70 px-4 py-3 text-[15px] text-foreground placeholder:text-subtle transition-all",
        "focus:bg-card focus:outline-none focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/15",
        errors[field] ? "border-red-500/70" : "border-border hover:border-border-strong",
      ),
    };
  }

  function errorFor(field: Field) {
    return errors[field] ? (
      <p id={`${formId}-${field}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
        {errors[field]}
      </p>
    ) : null;
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby={`${formId}-title`} className="space-y-5">
      <h3 id={`${formId}-title`} className="text-base font-semibold tracking-tight">
        {labels.formTitle}
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="mb-1.5 block text-sm font-medium">
            {labels.name}
          </label>
          <input
            ref={(node) => {
              fieldRefs.current.name = node;
            }}
            type="text"
            autoComplete="name"
            placeholder={labels.namePlaceholder}
            // Follows the typed text: Persian or Latin names both display correctly.
            dir="auto"
            required
            onChange={(event) => update("name", event.target.value)}
            {...fieldProps("name")}
          />
          {errorFor("name")}
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-medium">
            {labels.emailField}
          </label>
          <input
            ref={(node) => {
              fieldRefs.current.email = node;
            }}
            type="email"
            autoComplete="email"
            inputMode="email"
            // Email addresses are always LTR, also in an RTL form.
            dir="ltr"
            placeholder={labels.emailPlaceholder}
            required
            onChange={(event) => update("email", event.target.value)}
            {...fieldProps("email")}
          />
          {errorFor("email")}
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="mb-1.5 block text-sm font-medium">
          {labels.message}
        </label>
        <textarea
          ref={(node) => {
            fieldRefs.current.message = node;
          }}
          rows={5}
          placeholder={labels.messagePlaceholder}
          dir="auto"
          required
          onChange={(event) => update("message", event.target.value)}
          {...fieldProps("message")}
        />
        {errorFor("message")}
      </div>

      {/* Honeypot field, hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending"} className={buttonClasses("primary", "disabled:opacity-60")}>
          {status === "sending" ? labels.sending : labels.submit}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-muted">
          {hasErrors ? labels.errors.summary : null}
          {status === "sent" ? labels.success : null}
          {status === "mailto" ? labels.successMailto : null}
          {status === "error" ? <span className="text-red-600 dark:text-red-400">{labels.failure}</span> : null}
        </p>
      </div>
    </form>
  );
}
