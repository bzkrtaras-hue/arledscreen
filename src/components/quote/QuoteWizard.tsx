"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import {
  quoteFormSchema,
  type QuoteFormValues,
} from "@/lib/schemas/quote";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { getProductBySlug, getProducts } from "@/content/products";
import { readQuoteCart, type QuoteCartItem } from "@/lib/product-datasheet";

interface QuoteWizardProps {
  locale?: Locale;
}

export function QuoteWizard({ locale = "en" }: QuoteWizardProps) {
  const dict = getDictionary(locale).quote;
  const steps = [dict.steps.contact, dict.steps.project, dict.steps.details] as const;
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [cart, setCart] = useState<QuoteCartItem[]>([]);
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      company: "",
      contactName: "",
      email: "",
      phone: "",
      country: "",
      projectType: "corporate",
      environment: "indoor",
      widthM: 8,
      heightM: 4.5,
      pitchPreference: "P1.5",
      timeline: "1-3m",
      budgetBand: "tbd",
      notes: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    const items = readQuoteCart();
    let next = items;
    if (productSlug) {
      const fromCatalog = getProducts(locale).find((p) => p.slug === productSlug)
        ?? getProductBySlug(productSlug);
      if (fromCatalog && !items.some((i) => i.slug === productSlug)) {
        next = [
          ...items,
          {
            id: fromCatalog.id,
            slug: fromCatalog.slug,
            name: fromCatalog.name,
            pitchMm: fromCatalog.specs.pixelPitchMm,
            series: fromCatalog.series,
          },
        ];
        sessionStorage.setItem("nxtionstar-quote-cart", JSON.stringify(next));
      }
    }
    setCart(next);
    if (next.length > 0) {
      const primary = next[next.length - 1];
      setValue("pitchPreference", `P${primary.pitchMm}`);
      const noteLine =
        locale === "tr"
          ? `\u0130lgilenilen \u00fcr\u00fcn(ler): ${next.map((i) => i.name).join("; ")}`
          : `Interested product(s): ${next.map((i) => i.name).join("; ")}`;
      setValue("notes", noteLine);
    }
  }, [productSlug, locale, setValue]);

  const fieldGroups: (keyof QuoteFormValues)[][] = [
    ["company", "contactName", "email", "phone", "country"],
    ["projectType", "environment", "widthM", "heightM", "pitchPreference"],
    ["timeline", "budgetBand", "notes"],
  ];

  const next = async () => {
    const ok = await trigger(fieldGroups[step]);
    if (ok) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const onSubmit = async (data: QuoteFormValues) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("nxtionstar-quote", JSON.stringify(data));
    }
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <GlassPanel className="mx-auto max-w-xl p-10 text-center" glow>
        <CheckCircle2 className="mx-auto h-12 w-12 text-cyan" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
          {dict.successTitle}
        </h3>
        <p className="mt-3 text-sm text-ink-muted">{dict.successBody}</p>
        <Button asChild className="mt-6" variant="outline">
          <Link href={`/${locale}`}>{dict.backHome}</Link>
        </Button>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="mx-auto max-w-2xl p-6 md:p-8">
      <ol className="mb-8 flex gap-2" aria-label="Progress">
        {steps.map((label, i) => (
          <li
            key={label}
            className={`flex-1 rounded-full px-3 py-2 text-center text-xs font-medium ${
              i === step
                ? "bg-cyan text-white shadow-sm transition-all duration-300"
                : i < step
                  ? "bg-cyan/20 text-cyan"
                  : "bg-border text-ink-muted"
            }`}
            aria-current={i === step ? "step" : undefined}
          >
            {i + 1}. {label}
          </li>
        ))}
      </ol>

      {cart.length > 0 ? (
        <div className="mb-6 rounded-xl border border-cyan/25 bg-cyan/5 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan">
            {locale === "tr" ? "Teklif sepeti" : "Quote cart"}
          </p>
          <ul className="mt-2 space-y-1 text-sm text-ink">
            {cart.map((item) => (
              <li key={item.id}>
                <span className="font-medium">{item.name}</span>
                <span className="text-ink-muted"> \u2014 P{item.pitchMm} \u00b7 {item.series}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {step === 0 && (
          <>
            <Field label={dict.fields.company} error={errors.company?.message}>
              <input
                {...register("company")}
                className={inputClass}
                autoComplete="organization"
              />
            </Field>
            <Field label={dict.fields.name} error={errors.contactName?.message}>
              <input
                {...register("contactName")}
                className={inputClass}
                autoComplete="name"
              />
            </Field>
            <Field label={dict.fields.email} error={errors.email?.message}>
              <input
                type="email"
                {...register("email")}
                className={inputClass}
                autoComplete="email"
              />
            </Field>
            <Field label={dict.fields.phone} error={errors.phone?.message}>
              <input
                type="tel"
                {...register("phone")}
                className={inputClass}
                autoComplete="tel"
              />
            </Field>
            <Field label={locale === "tr" ? "\u015eehir" : "City"} error={errors.country?.message}>
              <input
                {...register("country")}
                className={inputClass}
                autoComplete="address-level2"
                placeholder={locale === "tr" ? "\u0130stanbul / Gaziosmanpa\u015fa" : "City"}
              />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <Field label={dict.fields.projectType} error={errors.projectType?.message}>
              <select {...register("projectType")} className={inputClass}>
                <option value="control-room">{dict.projectTypes.controlRoom}</option>
                <option value="retail">{dict.projectTypes.retail}</option>
                <option value="broadcast">{dict.projectTypes.broadcast}</option>
                <option value="stadium">{dict.projectTypes.stadium}</option>
                <option value="corporate">{dict.projectTypes.corporate}</option>
                <option value="other">{dict.projectTypes.other}</option>
              </select>
            </Field>
            <Field label={dict.fields.environment} error={errors.environment?.message}>
              <select {...register("environment")} className={inputClass}>
                <option value="indoor">{dict.environments.indoor}</option>
                <option value="outdoor">{dict.environments.outdoor}</option>
                <option value="mixed">{dict.environments.mixed}</option>
              </select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={dict.fields.width} error={errors.widthM?.message}>
                <input
                  type="number"
                  step="0.1"
                  {...register("widthM")}
                  className={inputClass}
                />
              </Field>
              <Field label={dict.fields.height} error={errors.heightM?.message}>
                <input
                  type="number"
                  step="0.1"
                  {...register("heightM")}
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label={dict.fields.pitch} error={errors.pitchPreference?.message}>
              <input {...register("pitchPreference")} className={inputClass} />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field label={dict.fields.timeline} error={errors.timeline?.message}>
              <select {...register("timeline")} className={inputClass}>
                <option value="asap">{dict.timelines.asap}</option>
                <option value="1-3m">{dict.timelines.m1to3}</option>
                <option value="3-6m">{dict.timelines.m3to6}</option>
                <option value="6m+">{dict.timelines.m6plus}</option>
              </select>
            </Field>
            <Field label={dict.fields.budget} error={errors.budgetBand?.message}>
              <select {...register("budgetBand")} className={inputClass}>
                <option value="under-50k">{dict.budgets.under50k}</option>
                <option value="50-150k">{dict.budgets.k50to150}</option>
                <option value="150-500k">{dict.budgets.k150to500}</option>
                <option value="500k+">{dict.budgets.k500plus}</option>
                <option value="tbd">{dict.budgets.tbd}</option>
              </select>
            </Field>
            <Field label={dict.fields.notes} error={errors.notes?.message}>
              <textarea
                {...register("notes")}
                rows={4}
                className={inputClass}
              />
            </Field>
          </>
        )}

        <div className="flex justify-between gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            {dict.back}
          </Button>
          {step < steps.length - 1 ? (
            <Button type="button" onClick={next}>
              {dict.continue}
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? dict.sending : dict.submit}
            </Button>
          )}
        </div>
      </form>
    </GlassPanel>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink transition-all duration-300 focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-ink-soft">{label}</label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
