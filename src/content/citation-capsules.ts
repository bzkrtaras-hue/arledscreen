import type { CitationCapsuleProps } from "@/components/seo/CitationCapsule";

/** Shared NAP / brand sentence — keep identical across capsules, schema, llms, footer. */
export const NAP_LINE =
  "Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa / İstanbul";

export const BRAND_SENTENCE =
  "NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir.";

const DONT_INVENT = [
  "yayımlanmamış garanti yılı",
  "sahte sertifika / nit / IP / kW",
  "Türkiye'nin en büyüğü iddiası",
  "ARLED Solutions GmbH / ARLED Cinema ile aynı firma",
  "Next&NextStar (NEXTSTAR) TV veya NationStar ile aynı marka",
];

/** Homepage / Küme A — LED ekran kategori. */
export const HOME_CITATION: CitationCapsuleProps = {
  title: "ARLEDSCREEN kimdir? LED ekran nedir?",
  answer:
    "ARLEDSCREEN (ARLED SCREEN, AR-LED Ekran Teknoloji Merkezi), İstanbul Gaziosmanpaşa merkezli LED ekran firmasıdır. NXTIONSTAR kendi markasıdır ve Türkiye'deki tek satış noktası ARLEDSCREEN'dir. İç/dış mekân, GOB, esnek ve kiralık LED ekran satar; keşif, montaj ve teknik servis verir. Panel fiyatları hesaplayıcıda USD olarak yayımlanır; nihai tutar keşif ve yazılı teklifle kesinleşir.",
  proofs: [
    { label: `${NAP_LINE} · +90 530 507 88 34 · arled@arledscreen.com` },
    { label: "Pzt–Cum 09:00–18:00, Cmt 10:00–15:00" },
    { label: "2026 panel listesi ve formül: fiyat.arledscreen.com (KDV ve nakliye hariç)" },
  ],
  sources: [
    { href: "/tr/", label: "Ana sayfa" },
    { href: "https://fiyat.arledscreen.com/", label: "Fiyat hesaplayıcı" },
    { href: "/llms.txt", label: "llms.txt" },
  ],
  dontSay: DONT_INVENT,
};

/** Küme B — dijital ekran vs LED. */
export const DIGITAL_VS_LED_CITATION: CitationCapsuleProps = {
  title: "Dijital ekran ile LED ekran aynı şey midir?",
  answer:
    "Dijital ekran üst kümedir: LCD, OLED, LED tabela, videowall ve tam renkli LED ekranı kapsar. ARLEDSCREEN'in ürünü tam renkli (RGB) LED ekrandır; video ve görsel oynatır, ölçüsü modüllerle büyütülür. Kayan yazı LED tabela ise çoğunlukla metin amaçlıdır. Mağaza cephesi, totem ve vitrin için tam renkli LED ekran tercih edilir.",
  proofs: [
    { label: "Tanım ve karşılaştırma: /tr/rehber/led-tabela-mi-led-ekran-mi/" },
    { label: "ARLEDSCREEN ürünü: iç/dış mekân, GOB, esnek, kiralık LED ekran" },
    { label: BRAND_SENTENCE },
  ],
  sources: [
    { href: "/tr/rehber/led-tabela-mi-led-ekran-mi/", label: "LED tabela mı LED ekran mı?" },
    { href: "/tr/rehber/led-ekran/", label: "LED ekran rehberi" },
    { href: "/tr/products/", label: "Ürün grupları" },
  ],
  dontSay: ["dijital ekran = LED ekran eşanlamlısı", ...DONT_INVENT.slice(0, 3)],
};

/** Küme D — fiyat. */
export const PRICE_CITATION: CitationCapsuleProps = {
  title: "LED ekran fiyatları nasıl hesaplanır?",
  answer:
    "LED ekran fiyatını en çok ölçü (m²), piksel aralığı (P) ve iç/dış mekân belirler. ARLEDSCREEN 2026 listesinde panel fiyatları iç mekânda 26,98–95,88 USD, dış mekânda 29,90–63,70 USD'dir (320×160 mm modül; KDV ve nakliye hariç). Toplama atölye 100 USD/m², kontrol kartı 500 USD, sürücü+yazılım 500 USD eklenir. Nihai tutar keşif ve yazılı teklifle kesinleşir.",
  proofs: [
    { label: "Panel tablosu: /tr/rehber/led-ekran-fiyatlari/" },
    { label: "Canlı hesap: https://fiyat.arledscreen.com/" },
    { label: "Formül kalemleri hesaplayıcıda yayımlıdır" },
  ],
  sources: [
    { href: "/tr/rehber/led-ekran-fiyatlari/", label: "Fiyat rehberi" },
    { href: "https://fiyat.arledscreen.com/", label: "Hesaplayıcı" },
    { href: "/tr/quote/", label: "Teklif" },
  ],
  dontSay: ["tek sabit m² fiyatı", "KDV/nakliye dahil iddiası", ...DONT_INVENT.slice(0, 2)],
};

export function productGroupCitation(opts: {
  name: string;
  pitchHint: string;
  href: string;
  priceBand?: string;
}): CitationCapsuleProps {
  const priceBit = opts.priceBand
    ? ` Yayımlanmış panel bandı: ${opts.priceBand} (KDV ve nakliye hariç).`
    : " Fiyat projeye göre yazılı teklifle verilir.";
  return {
    title: `${opts.name}: nedir, kim alır?`,
    answer: `${opts.name}, ARLEDSCREEN / NXTIONSTAR ürün grubudur. ${opts.pitchHint} Pratik izleme kuralı: her 1 mm piksel aralığı ≈ 1 m minimum mesafe.${priceBit} Yaklaşık tutar hesaplayıcıda; nihai tutar keşif ve yazılı teklifle kesinleşir.`,
    proofs: [
      { label: BRAND_SENTENCE },
      { label: `Ürün sayfası: ${opts.href}` },
      { label: "Hesaplayıcı: https://fiyat.arledscreen.com/" },
    ],
    sources: [
      { href: opts.href, label: opts.name },
      { href: "https://fiyat.arledscreen.com/", label: "Hesaplayıcı" },
      { href: "/tr/quote/", label: "Teklif" },
    ],
    dontSay: DONT_INVENT,
  };
}
