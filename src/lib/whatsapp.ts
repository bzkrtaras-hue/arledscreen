import { WHATSAPP_NUMBER } from "@/lib/social";

/** Project types used by the short quote form and WhatsApp shortcuts. */
export const PROJECT_TYPES = [
  {
    id: "magaza",
    label: "Mağaza / vitrin",
    labelEn: "Store / storefront",
    message:
      "Merhaba, mağaza / vitrin için LED ekran projesi hakkında bilgi ve teklif almak istiyorum.",
    messageEn:
      "Hello, I would like information and a quote for a store / storefront LED display project.",
  },
  {
    id: "dis-mekan",
    label: "Dış mekân / cephe / reklam",
    labelEn: "Outdoor / façade / advertising",
    message:
      "Merhaba, dış mekân (cephe veya reklam alanı) LED ekran projesi için bilgi ve teklif almak istiyorum.",
    messageEn:
      "Hello, I would like information and a quote for an outdoor (façade or advertising) LED display project.",
  },
  {
    id: "toplanti",
    label: "Toplantı / konferans salonu",
    labelEn: "Meeting / conference hall",
    message:
      "Merhaba, toplantı veya konferans salonu için iç mekân LED ekran hakkında bilgi almak istiyorum.",
    messageEn:
      "Hello, I would like information about an indoor LED display for a meeting or conference hall.",
  },
  {
    id: "etkinlik",
    label: "Sahne / etkinlik / kiralık",
    labelEn: "Stage / event / rental",
    message:
      "Merhaba, sahne veya etkinlik için LED ekran (kiralık / satış) hakkında bilgi almak istiyorum.",
    messageEn:
      "Hello, I would like information about LED display (rental / sale) for a stage or event.",
  },
  {
    id: "horeca",
    label: "Kafe / restoran / otel",
    labelEn: "Café / restaurant / hotel",
    message:
      "Merhaba, kafe / restoran / otel için LED ekran projesi hakkında bilgi ve teklif almak istiyorum.",
    messageEn:
      "Hello, I would like information and a quote for a café / restaurant / hotel LED display project.",
  },
  {
    id: "kamu",
    label: "Belediye / kamu / eğitim",
    labelEn: "Municipal / public / education",
    message:
      "Merhaba, belediye / kamu / eğitim kurumu için LED ekran projesi hakkında bilgi almak istiyorum.",
    messageEn:
      "Hello, I would like information about an LED display project for a municipal / public / education site.",
  },
  {
    id: "servis",
    label: "Mevcut ekran için teknik servis",
    labelEn: "Technical service for an existing display",
    message:
      "Merhaba, mevcut LED ekranımız için teknik servis / bakım desteği almak istiyorum.",
    messageEn:
      "Hello, I would like technical service / maintenance support for our existing LED display.",
  },
  {
    id: "diger",
    label: "Diğer",
    labelEn: "Other",
    message: "Merhaba, LED ekran projesi hakkında bilgi almak istiyorum.",
    messageEn: "Hello, I would like information about an LED display project.",
  },
] as const;

export type ProjectTypeId = (typeof PROJECT_TYPES)[number]["id"];

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function projectTypeLabel(id: ProjectTypeId, locale: "tr" | "en" = "tr"): string {
  const t = PROJECT_TYPES.find((p) => p.id === id) ?? PROJECT_TYPES[PROJECT_TYPES.length - 1];
  return locale === "en" ? t.labelEn : t.label;
}

export function projectWhatsappHref(id: ProjectTypeId, locale: "tr" | "en" = "tr"): string {
  const t = PROJECT_TYPES.find((p) => p.id === id) ?? PROJECT_TYPES[PROJECT_TYPES.length - 1];
  return whatsappHref(locale === "en" ? t.messageEn : t.message);
}

export const GENERIC_WHATSAPP_HREF = whatsappHref(
  "Merhaba, LED ekran projesi hakkında bilgi almak istiyorum.",
);

export const GENERIC_WHATSAPP_HREF_EN = whatsappHref(
  "Hello, I would like information about an LED display project.",
);
