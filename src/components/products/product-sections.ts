import { PRODUCT_GROUPS, type ProductGroup } from "@/content/categories";

/**
 * Ürünler sayfası ve menüsündeki üç ana başlık.
 * Bir kategoriyi başka başlığa taşımak için slug'ı ilgili listeye taşımanız yeterli
 * (ör. "kiralik-led-ekran" satırını "dis" listesine almak).
 */
export const PRODUCT_SECTIONS = [
  {
    id: "ic",
    tr: "İç Mekân",
    en: "Indoor",
    slugs: [
      "ic-mekan-led-ekran",
      "gob-led-ekran",
      "esnek-led-ekran",
      "seffaf-led-ekran",
      "transparan-led-ekran",
      "ince-pitch-led-ekran",
      "poster-led-ekran",
      "kiralik-led-ekran",
    ],
  },
  {
    id: "dis",
    tr: "Dış Mekân",
    en: "Outdoor",
    slugs: ["dis-mekan-led-ekran"],
  },
  {
    id: "kontrol",
    tr: "Kontrol Kartları",
    en: "Control cards",
    slugs: [
      "colorlight-kontrolculer",
      "huidu-kontrol-kartlari",
      "novastar-kontrolculer",
      "led-modul-ve-kontrol-sistemleri",
    ],
  },
  {
    id: "dijital",
    tr: "Dijital Ekran ve Kiosk",
    en: "Digital Displays & Kiosks",
    slugs: ["dijital-ekran", "menuboard", "kiosk", "lcd-ekran"],
  },
] as const;

/** Yukarıdaki başlıklara atanmamış yeni bir grup eklenirse güvenlik için bu başlıkta listelenir. */
export const OTHER_SECTION_LABEL = { tr: "Diğer ürünler", en: "More products" } as const;

export interface ProductSection {
  id: string;
  label: string;
  groups: ProductGroup[];
}

export function productSections(locale: "tr" | "en" = "tr"): ProductSection[] {
  const used = new Set<string>(PRODUCT_SECTIONS.flatMap((s) => [...s.slugs]));
  const sections: ProductSection[] = PRODUCT_SECTIONS.map((s) => ({
    id: s.id,
    label: s[locale],
    groups: s.slugs
      .map((slug) => PRODUCT_GROUPS.find((g) => g.slug === slug))
      .filter((g): g is ProductGroup => Boolean(g)),
  }));
  sections.push({
    id: "diger",
    label: OTHER_SECTION_LABEL[locale],
    groups: PRODUCT_GROUPS.filter((g) => !used.has(g.slug)),
  });
  return sections.filter((s) => s.groups.length);
}
