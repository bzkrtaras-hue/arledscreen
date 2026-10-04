"use client";

import { useEffect, useId, useState } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { PROJECT_TYPES, whatsappHref, type ProjectTypeId } from "@/lib/whatsapp";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from "@/lib/social";
import { getProducts } from "@/content/products";

type Env = "ic" | "dis" | "bilmiyorum";

interface FormState {
  name: string;
  phone: string;
  company: string;
  projectType: ProjectTypeId;
  environment: Env;
  width: string;
  height: string;
  location: string;
  timeline: string;
  notes: string;
  consent: boolean;
}

const ENV_LABEL: Record<Env, string> = {
  ic: "İç mekân",
  dis: "Dış mekân",
  bilmiyorum: "Emin değilim",
};

const TIMELINES = ["En kısa sürede", "1 ay içinde", "1–3 ay", "3 aydan sonra", "Henüz belli değil"];

/** Plain-text cleanup: drop control characters (except newlines in notes) and clamp length. */
const clean = (v: string, max: number, multiline = false) =>
  v.replace(multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max);

function buildMessage(raw: FormState): string {
  const f: FormState = {
    ...raw,
    name: clean(raw.name, 80),
    phone: clean(raw.phone, 30),
    company: clean(raw.company, 120),
    width: clean(raw.width, 8),
    height: clean(raw.height, 8),
    location: clean(raw.location, 80),
    notes: clean(raw.notes, 1000, true),
  };
  const type = PROJECT_TYPES.find((t) => t.id === f.projectType)?.label ?? "";
  const size = f.width && f.height ? `${f.width} m × ${f.height} m` : "Belirtilmedi";
  return [
    "Merhaba ARLEDSCREEN, LED ekran teklif talebim:",
    `• Ad Soyad: ${f.name}`,
    `• Telefon: ${f.phone}`,
    f.company ? `• Firma: ${f.company}` : null,
    `• Proje türü: ${type}`,
    `• Ortam: ${ENV_LABEL[f.environment]}`,
    `• Yaklaşık ölçü: ${size}`,
    `• Şehir / ilçe: ${f.location}`,
    f.timeline ? `• Zaman planı: ${f.timeline}` : null,
    f.notes ? `• Not: ${f.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Short, static-hosting-friendly quote form. No data is stored on the site:
 * on submit the visitor's own WhatsApp (or e-mail client) opens with the
 * request pre-filled, and they send it themselves.
 */
export function ShortQuoteForm({ bare = false }: { bare?: boolean } = {}) {
  const id = useId();
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sentVia, setSentVia] = useState<null | "whatsapp" | "email">(null);
  const [f, setF] = useState<FormState>({
    name: "",
    phone: "",
    company: "",
    projectType: "magaza",
    environment: "ic",
    width: "",
    height: "",
    location: "",
    timeline: "",
    notes: "",
    consent: false,
  });

  useEffect(() => {
    // Read query params on the client only, so the form itself is pre-rendered (no CLS).
    const searchParams = new URLSearchParams(window.location.search);
    const slug = searchParams.get("product");
    const type = searchParams.get("tip") as ProjectTypeId | null;
    if (slug) {
      const p = getProducts("tr").find((x) => x.slug === slug);
      if (p) setF((s) => ({ ...s, notes: `İlgilendiğim seri: ${p.name} (P${p.specs.pixelPitchMm})` }));
    }
    if (type && PROJECT_TYPES.some((t) => t.id === type)) {
      setF((s) => ({ ...s, projectType: type }));
    }
  }, []);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((s) => ({ ...s, [k]: v }));

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (f.name.trim().length < 2) e.name = "Lütfen adınızı ve soyadınızı yazın.";
    if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Lütfen geçerli bir telefon numarası yazın.";
    if (f.location.trim().length < 2) e.location = "Lütfen projenin şehir veya ilçesini yazın.";
    if (!f.consent) e.consent = "Devam etmek için onay kutusunu işaretleyin.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (via: "whatsapp" | "email") => {
    if (!validate()) return;
    const msg = buildMessage(f);
    if (via === "whatsapp") {
      window.open(whatsappHref(msg), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("LED ekran teklif talebi")}&body=${encodeURIComponent(msg)}`;
    }
    setSentVia(via);
  };

  const field = "mt-1.5 block w-full min-h-12 rounded-xl border border-border bg-white px-3.5 text-base text-ink shadow-sm focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/25";
  const label = "block text-sm font-semibold text-ink";
  const err = (k: keyof FormState) =>
    errors[k] ? (
      <p id={`${id}-${k}-err`} className="mt-1 text-sm text-[#B42318]" role="alert">
        {errors[k]}
      </p>
    ) : null;

  if (sentVia) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl p-8 text-center glass-card" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-cyan" aria-hidden />
        <h2 className="mt-4 font-display text-2xl font-bold text-ink">Talebiniz hazırlandı</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          {sentVia === "whatsapp"
            ? "WhatsApp yeni sekmede açıldı. Mesajı kontrol edip “Gönder”e dokunduğunuzda talebiniz bize ulaşır."
            : "E-posta uygulamanız açıldı. E-postayı gönderdiğinizde talebiniz bize ulaşır."}{" "}
          Ekibimiz ölçü ve konum bilgisine göre sizinle iletişime geçerek keşif ve teklif sürecini planlayacaktır.
        </p>
        <p className="mt-4 text-sm text-ink-muted">
          Uygulama açılmadıysa bizi doğrudan arayın:{" "}
          <a href={CONTACT_PHONE_HREF} className="font-semibold text-cyan">
            {CONTACT_PHONE_DISPLAY}
          </a>
        </p>
        <button
          type="button"
          onClick={() => setSentVia(null)}
          className="mt-6 text-sm font-semibold text-cyan underline underline-offset-4"
        >
          Formu düzenle
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit("whatsapp");
      }}
      className={bare ? "" : "rounded-2xl border border-border bg-white p-5 shadow-card sm:p-8"}
      aria-describedby={`${id}-info`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={label}>
            Ad Soyad <span aria-hidden className="text-[#B42318]">*</span>
          </label>
          <input id={`${id}-name`} autoComplete="name" maxLength={80} required aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-err` : undefined} className={field} value={f.name} onChange={(e) => set("name", e.target.value)} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={label}>
            Telefon <span aria-hidden className="text-[#B42318]">*</span>
          </label>
          <input id={`${id}-phone`} type="tel" inputMode="tel" autoComplete="tel" maxLength={30} required placeholder="05xx xxx xx xx" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id}-phone-err` : undefined} className={field} value={f.phone} onChange={(e) => set("phone", e.target.value)} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor={`${id}-company`} className={label}>Firma / kurum <span className="font-normal text-ink-muted">(isteğe bağlı)</span></label>
          <input id={`${id}-company`} autoComplete="organization" maxLength={120} className={field} value={f.company} onChange={(e) => set("company", e.target.value)} />
        </div>
        <div>
          <label htmlFor={`${id}-type`} className={label}>Proje türü</label>
          <select id={`${id}-type`} className={field} value={f.projectType} onChange={(e) => set("projectType", e.target.value as ProjectTypeId)}>
            {PROJECT_TYPES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>
        <fieldset className="sm:col-span-2">
          <legend className={label}>Kullanım ortamı</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(Object.keys(ENV_LABEL) as Env[]).map((k) => (
              <label key={k} className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-2 text-center text-sm font-semibold ${f.environment === k ? "border-cyan bg-cyan-50 text-cyan-700" : "border-border text-ink-soft"}`}>
                <input type="radio" name={`${id}-env`} value={k} checked={f.environment === k} onChange={() => set("environment", k)} className="sr-only" />
                {ENV_LABEL[k]}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:grid-cols-4">
          <div>
            <label htmlFor={`${id}-w`} className={label}>Genişlik (m)</label>
            <input id={`${id}-w`} inputMode="decimal" maxLength={8} placeholder="örn. 3" className={field} value={f.width} onChange={(e) => set("width", e.target.value)} />
          </div>
          <div>
            <label htmlFor={`${id}-h`} className={label}>Yükseklik (m)</label>
            <input id={`${id}-h`} inputMode="decimal" maxLength={8} placeholder="örn. 2" className={field} value={f.height} onChange={(e) => set("height", e.target.value)} />
          </div>
          <div className="col-span-2">
            <label htmlFor={`${id}-loc`} className={label}>
              Şehir / ilçe <span aria-hidden className="text-[#B42318]">*</span>
            </label>
            <input id={`${id}-loc`} autoComplete="address-level2" maxLength={80} placeholder="örn. İstanbul / Şişli" aria-invalid={!!errors.location} aria-describedby={errors.location ? `${id}-location-err` : undefined} className={field} value={f.location} onChange={(e) => set("location", e.target.value)} />
            {err("location")}
          </div>
        </div>
        <div>
          <label htmlFor={`${id}-time`} className={label}>Zaman planı</label>
          <select id={`${id}-time`} className={field} value={f.timeline} onChange={(e) => set("timeline", e.target.value)}>
            <option value="">Seçiniz</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-notes`} className={label}>Not <span className="font-normal text-ink-muted">(isteğe bağlı)</span></label>
          <textarea id={`${id}-notes`} rows={3} maxLength={1000} placeholder="Montaj yüzeyi, izleme mesafesi, içerik türü vb." className={`${field} py-3`} value={f.notes} onChange={(e) => set("notes", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-ink-soft">
            <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#1E5BB8]" checked={f.consent} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? `${id}-consent-err` : undefined} onChange={(e) => set("consent", e.target.checked)} />
            <span>Bilgilerimin yalnızca teklif hazırlanması ve benimle iletişime geçilmesi amacıyla kullanılmasını kabul ediyorum.</span>
          </label>
          {err("consent")}
        </div>
      </div>

      <p id={`${id}-info`} className="mt-5 rounded-xl bg-surface px-4 py-3 text-xs leading-relaxed text-ink-muted">
        Bu form bilgilerinizi sitede saklamaz. “WhatsApp ile gönder” dediğinizde talebiniz WhatsApp&apos;ta hazır mesaj olarak açılır; göndermek için onay sizdedir.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button type="submit" className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 bg-[#12813F] px-5 text-base text-white hover:bg-[#0E6B34]">
          <Send className="h-4 w-4" aria-hidden />
          WhatsApp ile gönder
        </button>
        <button type="button" onClick={() => submit("email")} className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 border border-cyan/50 bg-white px-5 text-base text-cyan hover:bg-cyan-50">
          <Mail className="h-4 w-4" aria-hidden />
          E-posta ile gönder
        </button>
      </div>
    </form>
  );
}
