"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import { PROJECT_TYPES, projectTypeLabel, whatsappHref, type ProjectTypeId } from "@/lib/whatsapp";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from "@/lib/social";
import { getProducts } from "@/content/products";
import { trackLead } from "@/lib/track";

type Env = "ic" | "dis" | "bilmiyorum";
type FormLocale = "tr" | "en" | "ar" | "ru";

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
  /** Optional explicit consent (açık rıza) for transfer abroad — never required. */
  abroadConsent: boolean;
}

const ENV_LABEL: Record<FormLocale, Record<Env, string>> = {
  tr: { ic: "İç mekân", dis: "Dış mekân", bilmiyorum: "Emin değilim" },
  en: { ic: "Indoor", dis: "Outdoor", bilmiyorum: "Not sure" },
  ar: { ic: "داخلي", dis: "خارجي", bilmiyorum: "لست متأكداً" },
  ru: { ic: "В помещении", dis: "На улице", bilmiyorum: "Не уверен(а)" },
};

const TIMELINES: Record<FormLocale, string[]> = {
  tr: ["En kısa sürede", "1 ay içinde", "1–3 ay", "3 aydan sonra", "Henüz belli değil"],
  en: ["As soon as possible", "Within 1 month", "1–3 months", "After 3 months", "Not decided yet"],
  ar: ["في أقرب وقت", "خلال شهر", "1–3 أشهر", "بعد 3 أشهر", "لم يُحدَّد بعد"],
  ru: ["Как можно скорее", "В течение месяца", "1–3 месяца", "Через 3 месяца и позже", "Пока не решено"],
};

/** Labels for ar/ru, keyed by the English string (TR/EN stay inline below). */
const I18N: Record<"ar" | "ru", Record<string, string>> = {
  ar: {
    "Please enter your full name.": "يرجى كتابة الاسم الكامل.",
    "Please enter a valid phone number.": "يرجى كتابة رقم هاتف صحيح.",
    "Please enter the project city or district.": "يرجى كتابة مدينة المشروع أو منطقته.",
    "LED display quote request": "طلب عرض سعر لشاشة LED",
    "Your request is ready": "طلبك جاهز",
    "WhatsApp opened in a new tab. Check the message and tap Send to reach us.": "فُتح واتساب في نافذة جديدة. راجع الرسالة ثم اضغط «إرسال» لتصلنا.",
    "Your email app opened. Send the email to reach us.": "فُتح تطبيق البريد. أرسل الرسالة لتصلنا.",
    "Our team will contact you using the size and location details to plan survey and quote.": "سيتواصل معك فريقنا بناءً على المقاس والموقع لتنظيم المعاينة وعرض السعر.",
    "If the app did not open, call us: ": "إذا لم يفتح التطبيق، اتصل بنا: ",
    "Edit form": "تعديل النموذج",
    "Full name": "الاسم الكامل",
    "Phone": "الهاتف",
    "Company": "الشركة",
    "(optional)": "(اختياري)",
    "Project type": "نوع المشروع",
    "Environment": "بيئة الاستخدام",
    "e.g. 3": "مثال: 3",
    "e.g. 2": "مثال: 2",
    "Width (m)": "العرض (م)",
    "Height (m)": "الارتفاع (م)",
    "City / district": "المدينة / المنطقة",
    "e.g. Istanbul / Şişli": "مثال: دبي",
    "Timeline": "الجدول الزمني",
    "Select": "اختر",
    "Notes": "ملاحظات",
    "Mount surface, viewing distance, content type, etc.": "سطح التركيب، مسافة المشاهدة، نوع المحتوى…",
    "Your details are sent to our team by email solely to prepare your quote. When you tap “Send via WhatsApp”, your request opens as a draft message; you choose whether to send it.": "تُرسَل بياناتك إلى فريقنا عبر البريد الإلكتروني فقط لإعداد عرض السعر. عند الضغط على «إرسال عبر واتساب» يُفتح طلبك كرسالة جاهزة، والقرار في إرسالها لك.",
    "Send via WhatsApp": "إرسال عبر واتساب",
    "Send via email": "إرسال عبر البريد الإلكتروني",
    "(Optional) I give explicit consent to my personal data being transferred to service providers with servers abroad for email and form infrastructure.": "(اختياري) أوافق صراحةً على نقل بياناتي الشخصية إلى مزوّدي خدمات لديهم خوادم خارج تركيا لأغراض البريد الإلكتروني والنموذج.",
  },
  ru: {
    "Please enter your full name.": "Пожалуйста, укажите имя и фамилию.",
    "Please enter a valid phone number.": "Пожалуйста, укажите корректный номер телефона.",
    "Please enter the project city or district.": "Пожалуйста, укажите город или район проекта.",
    "LED display quote request": "Запрос коммерческого предложения на LED-экран",
    "Your request is ready": "Ваш запрос готов",
    "WhatsApp opened in a new tab. Check the message and tap Send to reach us.": "WhatsApp открылся в новой вкладке. Проверьте сообщение и нажмите «Отправить».",
    "Your email app opened. Send the email to reach us.": "Открылось почтовое приложение. Отправьте письмо, и оно дойдёт до нас.",
    "Our team will contact you using the size and location details to plan survey and quote.": "Наша команда свяжется с вами по размеру и адресу, чтобы запланировать замер и предложение.",
    "If the app did not open, call us: ": "Если приложение не открылось, позвоните нам: ",
    "Edit form": "Изменить форму",
    "Full name": "Имя и фамилия",
    "Phone": "Телефон",
    "Company": "Компания",
    "(optional)": "(необязательно)",
    "Project type": "Тип проекта",
    "Environment": "Место установки",
    "e.g. 3": "напр. 3",
    "e.g. 2": "напр. 2",
    "Width (m)": "Ширина (м)",
    "Height (m)": "Высота (м)",
    "City / district": "Город / район",
    "e.g. Istanbul / Şişli": "напр. Стамбул",
    "Timeline": "Сроки",
    "Select": "Выберите",
    "Notes": "Комментарий",
    "Mount surface, viewing distance, content type, etc.": "Поверхность монтажа, расстояние просмотра, тип контента и т. п.",
    "Your details are sent to our team by email solely to prepare your quote. When you tap “Send via WhatsApp”, your request opens as a draft message; you choose whether to send it.": "Ваши данные передаются нашей команде по электронной почте только для подготовки предложения. При нажатии «Отправить в WhatsApp» запрос откроется как готовое сообщение — отправляете его вы.",
    "Send via WhatsApp": "Отправить в WhatsApp",
    "Send via email": "Отправить по e-mail",
    "(Optional) I give explicit consent to my personal data being transferred to service providers with servers abroad for email and form infrastructure.": "(Необязательно) Я даю явное согласие на передачу моих персональных данных поставщикам услуг с серверами за рубежом для работы почты и формы.",
  },
};

/** Plain-text cleanup: drop control characters (except newlines in notes) and clamp length. */
const clean = (v: string, max: number, multiline = false) =>
  v.replace(multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, " ").trim().slice(0, max);

function buildMessage(raw: FormState, locale: FormLocale): string {
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
  const type = projectTypeLabel(f.projectType, locale === "tr" ? "tr" : "en");
  const size =
    f.width && f.height
      ? `${f.width} m × ${f.height} m`
      : locale !== "tr"
        ? "Not specified"
        : "Belirtilmedi";
  if (locale !== "tr") {
    return [
      "Hello ARLEDSCREEN, LED display quote request:",
      `• Name: ${f.name}`,
      `• Phone: ${f.phone}`,
      f.company ? `• Company: ${f.company}` : null,
      `• Project type: ${type}`,
      `• Environment: ${ENV_LABEL.en[f.environment]}`,
      `• Approx. size: ${size}`,
      `• City / district: ${f.location}`,
      f.timeline ? `• Timeline: ${f.timeline}` : null,
      f.notes ? `• Notes: ${f.notes}` : null,
      `• Consent to transfer abroad: ${f.abroadConsent ? "Yes" : "No"}`,
    ]
      .filter(Boolean)
      .join("\n");
  }
  return [
    "Merhaba ARLEDSCREEN, LED ekran teklif talebim:",
    `• Ad Soyad: ${f.name}`,
    `• Telefon: ${f.phone}`,
    f.company ? `• Firma: ${f.company}` : null,
    `• Proje türü: ${type}`,
    `• Ortam: ${ENV_LABEL.tr[f.environment]}`,
    `• Yaklaşık ölçü: ${size}`,
    `• Şehir / ilçe: ${f.location}`,
    f.timeline ? `• Zaman planı: ${f.timeline}` : null,
    f.notes ? `• Not: ${f.notes}` : null,
    `• Yurt dışı aktarım açık rızası: ${f.abroadConsent ? "Evet" : "Hayır"}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Short, static-hosting-friendly quote form. No data is stored on the site:
 * on submit the visitor's own WhatsApp (or e-mail client) opens with the
 * request pre-filled, and they send it themselves.
 */
export function ShortQuoteForm({
  bare = false,
  locale = "tr",
}: {
  bare?: boolean;
  locale?: FormLocale;
} = {}) {
  const id = useId();
  const en = locale !== "tr";
  const tx = (trText: string, enText: string) =>
    locale === "tr" ? trText : locale === "en" ? enText : I18N[locale][enText] ?? enText;
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
    abroadConsent: false,
  });

  useEffect(() => {
    // Read query params on the client only, so the form itself is pre-rendered (no CLS).
    const searchParams = new URLSearchParams(window.location.search);
    const slug = searchParams.get("product");
    const type = searchParams.get("tip") as ProjectTypeId | null;
    if (slug) {
      const p = getProducts("tr").find((x) => x.slug === slug);
      if (p) {
        setF((s) => ({
          ...s,
          notes: en
            ? `Series of interest: ${p.name} (P${p.specs.pixelPitchMm})`
            : `İlgilendiğim seri: ${p.name} (P${p.specs.pixelPitchMm})`,
        }));
      }
    }
    if (type && PROJECT_TYPES.some((t) => t.id === type)) {
      setF((s) => ({ ...s, projectType: type }));
    }
  }, [en]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((s) => ({ ...s, [k]: v }));

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (f.name.trim().length < 2) {
      e.name = tx("Lütfen adınızı ve soyadınızı yazın.", "Please enter your full name.");
    }
    if (f.phone.replace(/\D/g, "").length < 10) {
      e.phone = tx("Lütfen geçerli bir telefon numarası yazın.", "Please enter a valid phone number.");
    }
    if (f.location.trim().length < 2) {
      e.location = tx("Lütfen projenin şehir veya ilçesini yazın.", "Please enter the project city or district.");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (via: "whatsapp" | "email") => {
    if (!validate()) return;
    const msg = buildMessage(f, locale);
    trackLead(via, locale);
    // Server-side copy to arled@arledscreen.com (Cloudflare Email Service, /api/lead).
    // Fire-and-forget: WhatsApp/mail must still open even if the endpoint is not configured.
    try {
      const body = JSON.stringify({ message: msg, locale, via, name: f.name, phone: f.phone, abroadConsent: f.abroadConsent, website: "" });
      if (!(navigator.sendBeacon && navigator.sendBeacon("/api/lead", new Blob([body], { type: "application/json" })))) {
        void fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
      }
    } catch {}
    if (via === "whatsapp") {
      window.open(whatsappHref(msg), "_blank", "noopener,noreferrer");
    } else {
      const subject = tx("LED ekran teklif talebi", "LED display quote request");
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`;
    }
    setSentVia(via);
  };

  const field =
    "mt-1.5 block w-full min-h-12 rounded-xl border border-border bg-white px-3.5 text-base text-ink shadow-sm focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/25";
  const labelCls = "block text-sm font-semibold text-ink";
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
        <h2 className="mt-4 font-display text-2xl font-bold text-ink">
          {tx("Talebiniz hazırlandı", "Your request is ready")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          {sentVia === "whatsapp"
            ? tx("WhatsApp yeni sekmede açıldı. Mesajı kontrol edip “Gönder”e dokunduğunuzda talebiniz bize ulaşır.", "WhatsApp opened in a new tab. Check the message and tap Send to reach us.")
            : tx("E-posta uygulamanız açıldı. E-postayı gönderdiğinizde talebiniz bize ulaşır.", "Your email app opened. Send the email to reach us.")}{" "}
          {tx("Ekibimiz ölçü ve konum bilgisine göre sizinle iletişime geçerek keşif ve teklif sürecini planlayacaktır.", "Our team will contact you using the size and location details to plan survey and quote.")}
        </p>
        <p className="mt-4 text-sm text-ink-muted">
          {tx("Uygulama açılmadıysa bizi doğrudan arayın: ", "If the app did not open, call us: ")}
          <a href={CONTACT_PHONE_HREF} className="font-semibold text-cyan">
            {CONTACT_PHONE_DISPLAY}
          </a>
        </p>
        <button
          type="button"
          onClick={() => setSentVia(null)}
          className="mt-6 text-sm font-semibold text-cyan underline underline-offset-4"
        >
          {tx("Formu düzenle", "Edit form")}
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
          <label htmlFor={`${id}-name`} className={labelCls}>
            {tx("Ad Soyad", "Full name")}{" "}
            <span aria-hidden className="text-[#B42318]">
              *
            </span>
          </label>
          <input
            id={`${id}-name`}
            autoComplete="name"
            maxLength={80}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            className={field}
            value={f.name}
            onChange={(e) => set("name", e.target.value)}
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={labelCls}>
            {tx("Telefon", "Phone")}{" "}
            <span aria-hidden className="text-[#B42318]">
              *
            </span>
          </label>
          <input
            id={`${id}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={30}
            required
            placeholder={tx("05xx xxx xx xx", "+90 …")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
            className={field}
            value={f.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
          {err("phone")}
        </div>
        <div>
          <label htmlFor={`${id}-company`} className={labelCls}>
            {tx("Firma / kurum", "Company")}{" "}
            <span className="font-normal text-ink-muted">
              {tx("(isteğe bağlı)", "(optional)")}
            </span>
          </label>
          <input
            id={`${id}-company`}
            autoComplete="organization"
            maxLength={120}
            className={field}
            value={f.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={`${id}-type`} className={labelCls}>
            {tx("Proje türü", "Project type")}
          </label>
          <select
            id={`${id}-type`}
            className={field}
            value={f.projectType}
            onChange={(e) => set("projectType", e.target.value as ProjectTypeId)}
          >
            {PROJECT_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {projectTypeLabel(t.id, locale === "tr" ? "tr" : "en")}
              </option>
            ))}
          </select>
        </div>
        <fieldset className="sm:col-span-2">
          <legend className={labelCls}>{tx("Kullanım ortamı", "Environment")}</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(Object.keys(ENV_LABEL[locale]) as Env[]).map((k) => (
              <label
                key={k}
                className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-2 text-center text-sm font-semibold ${f.environment === k ? "border-cyan bg-cyan-50 text-cyan-700" : "border-border text-ink-soft"}`}
              >
                <input
                  type="radio"
                  name={`${id}-env`}
                  value={k}
                  checked={f.environment === k}
                  onChange={() => set("environment", k)}
                  className="sr-only"
                />
                {ENV_LABEL[locale][k]}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:grid-cols-4">
          <div>
            <label htmlFor={`${id}-w`} className={labelCls}>
              {tx("Genişlik (m)", "Width (m)")}
            </label>
            <input
              id={`${id}-w`}
              inputMode="decimal"
              maxLength={8}
              placeholder={tx("örn. 3", "e.g. 3")}
              className={field}
              value={f.width}
              onChange={(e) => set("width", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${id}-h`} className={labelCls}>
              {tx("Yükseklik (m)", "Height (m)")}
            </label>
            <input
              id={`${id}-h`}
              inputMode="decimal"
              maxLength={8}
              placeholder={tx("örn. 2", "e.g. 2")}
              className={field}
              value={f.height}
              onChange={(e) => set("height", e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor={`${id}-loc`} className={labelCls}>
              {tx("Şehir / ilçe", "City / district")}{" "}
              <span aria-hidden className="text-[#B42318]">
                *
              </span>
            </label>
            <input
              id={`${id}-loc`}
              autoComplete="address-level2"
              maxLength={80}
              placeholder={tx("örn. İstanbul / Şişli", "e.g. Istanbul / Şişli")}
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? `${id}-location-err` : undefined}
              className={field}
              value={f.location}
              onChange={(e) => set("location", e.target.value)}
            />
            {err("location")}
          </div>
        </div>
        <div>
          <label htmlFor={`${id}-time`} className={labelCls}>
            {tx("Zaman planı", "Timeline")}
          </label>
          <select
            id={`${id}-time`}
            className={field}
            value={f.timeline}
            onChange={(e) => set("timeline", e.target.value)}
          >
            <option value="">{tx("Seçiniz", "Select")}</option>
            {TIMELINES[locale].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-notes`} className={labelCls}>
            {tx("Not", "Notes")}{" "}
            <span className="font-normal text-ink-muted">
              {tx("(isteğe bağlı)", "(optional)")}
            </span>
          </label>
          <textarea
            id={`${id}-notes`}
            rows={3}
            maxLength={1000}
            placeholder={
              tx("Montaj yüzeyi, izleme mesafesi, içerik türü vb.", "Mount surface, viewing distance, content type, etc.")
            }
            className={`${field} py-3`}
            value={f.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <p className="text-sm text-ink-soft">
            {locale === "tr" ? (
              <>
                Bilgileriniz{" "}
                <Link href="/tr/kvkk/" className="font-semibold text-cyan underline underline-offset-2">
                  KVKK Aydınlatma Metni
                </Link>{" "}
                kapsamında işlenir.
              </>
            ) : (
              <>
                {locale === "ar" ? "اطّلع على كيفية معالجة بياناتك الشخصية في " : locale === "ru" ? "Как мы обрабатываем персональные данные, описано в " : "Read how we process your personal data in our "}
                <Link href={locale === "ar" ? "/ar/privacy/" : "/en/privacy/"} className="font-semibold text-cyan underline underline-offset-2">
                  {locale === "ar" ? "إشعار الخصوصية" : locale === "ru" ? "уведомлении о конфиденциальности (EN)" : "Privacy Notice"}
                </Link>
                {locale === "ar" ? "." : "."}
              </>
            )}
          </p>
        </div>
        {(
          <div className="sm:col-span-2">
            {/* DOĞRULA: yurt dışı aktarım dayanağı açık rıza mı? Değilse bu kutu kaldırılabilir. Kutu zorunlu değildir. */}
            <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm text-ink-soft">
              <input
                type="checkbox"
                name="yurtdisi-aktarim-acik-riza"
                className="mt-1 h-5 w-5 shrink-0 accent-[#1E5BB8]"
                checked={f.abroadConsent}
                onChange={(e) => set("abroadConsent", e.target.checked)}
              />
              <span>
                {tx(
                  "(İsteğe bağlı) Kişisel verilerimin, e-posta ve form altyapısı için yurt dışında sunucu bulunduran hizmet sağlayıcılara aktarılmasına açık rıza veriyorum.",
                  "(Optional) I give explicit consent to my personal data being transferred to service providers with servers abroad for email and form infrastructure.",
                )}
              </span>
            </label>
          </div>
        )}
      </div>

      <p id={`${id}-info`} className="mt-5 rounded-xl bg-surface px-4 py-3 text-xs leading-relaxed text-ink-muted">
        {tx("Bilgileriniz yalnızca teklif hazırlamak için ekibimize e-postayla iletilir. “WhatsApp ile gönder” dediğinizde talebiniz WhatsApp'ta hazır mesaj olarak açılır; göndermek için onay sizdedir.", "Your details are sent to our team by email solely to prepare your quote. When you tap “Send via WhatsApp”, your request opens as a draft message; you choose whether to send it.")}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="submit"
          className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 bg-[#12813F] px-5 text-base text-white hover:bg-[#0E6B34]"
        >
          <Send className="h-4 w-4" aria-hidden />
          {tx("WhatsApp ile gönder", "Send via WhatsApp")}
        </button>
        <button
          type="button"
          onClick={() => submit("email")}
          className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 border border-cyan/50 bg-white px-5 text-base text-cyan hover:bg-cyan-50"
        >
          <Mail className="h-4 w-4" aria-hidden />
          {tx("E-posta ile gönder", "Send via email")}
        </button>
      </div>
    </form>
  );
}
