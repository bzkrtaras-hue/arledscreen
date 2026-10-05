import { WHATSAPP_NUMBER } from "@/lib/social";

/** Project types used by the short quote form and WhatsApp shortcuts. */
export const PROJECT_TYPES = [
  {
    id: "magaza",
    label: "Mağaza / vitrin",
    message:
      "Merhaba, mağaza / vitrin için LED ekran projesi hakkında bilgi ve teklif almak istiyorum.",
  },
  {
    id: "dis-mekan",
    label: "Dış mekân / cephe / reklam",
    message:
      "Merhaba, dış mekân (cephe veya reklam alanı) LED ekran projesi için bilgi ve teklif almak istiyorum.",
  },
  {
    id: "toplanti",
    label: "Toplantı / konferans salonu",
    message:
      "Merhaba, toplantı veya konferans salonu için iç mekân LED ekran hakkında bilgi almak istiyorum.",
  },
  {
    id: "etkinlik",
    label: "Sahne / etkinlik / kiralık",
    message:
      "Merhaba, sahne veya etkinlik için LED ekran (kiralık / satış) hakkında bilgi almak istiyorum.",
  },
  {
    id: "horeca",
    label: "Kafe / restoran / otel",
    message:
      "Merhaba, kafe / restoran / otel için LED ekran projesi hakkında bilgi ve teklif almak istiyorum.",
  },
  {
    id: "kamu",
    label: "Belediye / kamu / eğitim",
    message:
      "Merhaba, belediye / kamu / eğitim kurumu için LED ekran projesi hakkında bilgi almak istiyorum.",
  },
  {
    id: "servis",
    label: "Mevcut ekran için teknik servis",
    message:
      "Merhaba, mevcut LED ekranımız için teknik servis / bakım desteği almak istiyorum.",
  },
  {
    id: "diger",
    label: "Diğer",
    message: "Merhaba, LED ekran projesi hakkında bilgi almak istiyorum.",
  },
] as const;

export type ProjectTypeId = (typeof PROJECT_TYPES)[number]["id"];

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function projectWhatsappHref(id: ProjectTypeId): string {
  const t = PROJECT_TYPES.find((p) => p.id === id) ?? PROJECT_TYPES[PROJECT_TYPES.length - 1];
  return whatsappHref(t.message);
}

export const GENERIC_WHATSAPP_HREF = whatsappHref(
  "Merhaba, LED ekran projesi hakkında bilgi almak istiyorum.",
);

export const GENERIC_WHATSAPP_MESSAGE =
  "Merhaba, LED ekran projesi hakkında bilgi almak istiyorum.";
