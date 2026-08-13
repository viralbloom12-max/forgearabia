"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Send, CheckCircle2, MessageCircle, Loader2 } from "lucide-react";
import { services } from "@/config/services";
import { whatsappUrl } from "@/lib/whatsapp";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Fields {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const initial: Fields = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

type Status = "idle" | "sending" | "success" | "error";

export function LeadForm() {
  const t = useTranslations("contact.form");
  const ts = useTranslations("services");
  const locale = useLocale();
  const [fields, setFields] = useState<Fields>(initial);
  const [company, setCompany] = useState(""); // honeypot
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | "contact", string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function update(key: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof Fields | "contact", string>> = {};
    if (!fields.name.trim()) next.name = t("errorName");
    if (!fields.email.trim() && !fields.phone.trim()) next.email = t("errorContact");
    if (!fields.message.trim()) next.message = t("errorMessage");
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  /** Compose a prefilled WhatsApp message from the current fields. */
  function whatsappHref() {
    const serviceLabel = fields.service
      ? ts(`${fields.service}.title`)
      : t("serviceNotSure");
    const lines = [
      t("prefillIntro"),
      "",
      `${t("name")}: ${fields.name || "-"}`,
      fields.email ? `${t("email")}: ${fields.email}` : null,
      fields.phone ? `${t("phone")}: ${fields.phone}` : null,
      `${t("service")}: ${serviceLabel}`,
      fields.message ? `\n${t("message")}: ${fields.message}` : null,
    ].filter(Boolean) as string[];
    return whatsappUrl(lines.join("\n"));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, company, locale }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass flex flex-col items-center justify-center rounded-3xl p-10 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white">
          <CheckCircle2 size={28} />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-white">
          {t("successTitle")}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-silver-muted">
          {t("successBody")}
        </p>
        <button
          type="button"
          onClick={() => {
            setFields(initial);
            setStatus("idle");
          }}
          className={buttonVariants({ variant: "outline", size: "md", className: "mt-6" })}
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass rounded-3xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("name")} error={errors.name} className="sm:col-span-2">
          <input
            type="text"
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass(!!errors.name)}
            autoComplete="name"
          />
        </Field>

        <Field label={t("email")} error={errors.email}>
          <input
            type="email"
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass(!!errors.email)}
            autoComplete="email"
            dir="ltr"
          />
        </Field>

        <Field label={t("phone")}>
          <input
            type="tel"
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass(false)}
            autoComplete="tel"
            dir="ltr"
          />
        </Field>

        <Field label={t("service")} className="sm:col-span-2">
          <select
            value={fields.service}
            onChange={(e) => update("service", e.target.value)}
            className={cn(inputClass(false), "appearance-none")}
          >
            <option value="" className="bg-navy-900">
              {t("serviceDefault")}
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.key} className="bg-navy-900">
                {ts(`${s.key}.title`)}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t("message")} error={errors.message} className="sm:col-span-2">
          <textarea
            rows={4}
            value={fields.message}
            onChange={(e) => update("message", e.target.value)}
            className={cn(inputClass(!!errors.message), "resize-none")}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from users, catches bots. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Company
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
      </div>

      {status === "error" ? (
        <p className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/[0.06] px-4 py-3 text-sm text-amber-200">
          {t("errorBody")}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className={buttonVariants({ size: "lg", className: "mt-6 w-full" })}
      >
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            {t("sending")}
          </>
        ) : (
          <>
            <Send size={18} className="rtl:-scale-x-100" />
            {t("submit")}
          </>
        )}
      </button>

      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: "whatsapp", size: "lg", className: "mt-3 w-full" })}
      >
        <MessageCircle size={18} />
        {t("orWhatsapp")}
      </a>

      <p className="mt-3 text-center text-xs text-silver-faint">{t("note")}</p>
    </form>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-medium text-silver">{label}</span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-xs text-red-400">{error}</span>
      ) : null}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "h-11 w-full rounded-xl border bg-white/[0.03] px-4 text-sm text-white placeholder:text-silver-faint transition-colors focus:outline-none focus:ring-2 focus:ring-neon/40",
    hasError ? "border-red-400/60" : "border-silver/15 focus:border-neon/40",
    "min-h-11",
  );
}
