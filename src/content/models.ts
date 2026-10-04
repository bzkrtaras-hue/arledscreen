/**
 * NXTIONSTAR module models (one detail page each under /tr/products/<group>/<slug>/).
 *
 * Technical values marked `src: "kaynak"` are copied exactly from the module
 * manufacturer's product pages (owner-authorised, 1 Oct 2026; source URLs are
 * kept privately in /workspace/reports/, not in this repo). Values marked
 * `src: "hesaplayici"` come from the company's own price calculator. Any field
 * without a value is not rendered.
 */
import { PANEL_PRICES, type PanelPrice } from "@/content/prices";

export const SPEC_PENDING = "Teklifle birlikte teknik föyde paylaşılır";

export type SpecSource = "kaynak" | "hesaplayici";
export interface SpecValue {
  value: string;
  src: SpecSource;
}
export type SpecKey =
  | "pitch"
  | "moduleSize"
  | "matrix"
  | "pixels"
  | "density"
  | "ledType"
  | "voltage"
  | "protection"
  | "service"
  | "control"
  | "media"
  | "brightness"
  | "refresh"
  | "scan"
  | "power"
  | "viewingAngle"
  | "current"
  | "viewDistance";

export const SPEC_LABELS: Record<SpecKey, string> = {
  pitch: "Piksel aralığı",
  moduleSize: "Modül ölçüsü",
  matrix: "Piksel matrisi (modül çözünürlüğü)",
  pixels: "Modül başına piksel",
  density: "Piksel yoğunluğu",
  ledType: "LED / yüzey tipi",
  voltage: "Çalışma gerilimi",
  protection: "Koruma sınıfı",
  service: "Montaj ve servis",
  control: "Kontrol sistemi",
  media: "Desteklenen medya formatları",
  brightness: "Parlaklık",
  refresh: "Yenileme hızı",
  scan: "Tarama (scan)",
  power: "Güç tüketimi",
  viewingAngle: "Görüş açısı",
  current: "Akım çekişi (5 V DC)",
  viewDistance: "Minimum izleme mesafesi",
};
export const SPEC_ORDER = Object.keys(SPEC_LABELS) as SpecKey[];

export type ModelKind = "ic" | "dis" | "gob" | "esnek";
export interface LedModel {
  slug: string;
  group: string;
  /** Extra groups whose chips link here (e.g. GOB models also listed under iç mekân) */
  alsoIn?: string[];
  chip: string;
  name: string;
  kind: ModelKind;
  image: string;
  imageAlt: string;
  priceId?: string;
  specs: Partial<Record<SpecKey, SpecValue>>;
  /** Extra own-words sentence specific to this model */
  note: string;
}

const k = (value: string): SpecValue => ({ value, src: "kaynak" });
const h = (value: string): SpecValue => ({ value, src: "hesaplayici" });
const DC5 = k("5 V DC");
const SR = k("Gönderici ve alıcı kart ile çalışan standart LED kontrol sistemleri");
const MEDIA = k("MP4, AVI, JPG, PNG, GIF");

export const LED_MODELS: LedModel[] = [
  {
    slug: "p1-25-gob",
    group: "gob-led-ekran",
    alsoIn: ["ic-mekan-led-ekran"],
    chip: "P1.25 GOB",
    name: "NXTIONSTAR P1.25 GOB İç Mekân LED Modül",
    kind: "gob",
    image: "/modules/nxtionstar-p1-25-ic-mekan-modul.webp",
    imageAlt: "NXTIONSTAR P1.25 iç mekân LED modülün ön ve arka yüzü",
    priceId: "p1-25-ic-gob",
    specs: {
      pitch: k("1,25 mm"),
      moduleSize: k("320 × 160 mm"),
      matrix: k("128 × 256 piksel"),
      pixels: k("32.768"),
      density: k("640.000 piksel/m² üzeri"),
      ledType: k("RGB; isteğe bağlı GOB (yüzeye koruyucu reçine) kaplama"),
      voltage: DC5,
      control: SR,
    },
    note: "Serinin en küçük piksel aralığıdır; kontrol odası, stüdyo ve toplantı salonu gibi ekranın birkaç metreden izlendiği alanlar için planlanır.",
  },
  {
    slug: "p1-53-gob",
    group: "gob-led-ekran",
    alsoIn: ["ic-mekan-led-ekran"],
    chip: "P1.53 GOB",
    name: "NXTIONSTAR P1.53 GOB İç Mekân LED Modül",
    kind: "gob",
    image: "/modules/nxtionstar-p1-53-ic-mekan-modul.webp",
    imageAlt: "NXTIONSTAR P1.53 iç mekân LED modül",
    priceId: "p1-53-ic-gob",
    specs: {
      pitch: k("1,53 mm"),
      moduleSize: k("320 × 160 mm"),
      matrix: k("104 × 208 piksel"),
      pixels: k("21.632"),
      ledType: k("RGB; isteğe bağlı GOB (şeffaf reçine) kaplama"),
      voltage: DC5,
      control: SR,
    },
    note: "Görüntü ayrıntısı ile bütçe arasında dengeli bir ince pitch seçeneğidir; kurumsal lobi, mağaza ve izleme odalarında tercih edilir.",
  },
  {
    slug: "p1-86-gob",
    group: "gob-led-ekran",
    alsoIn: ["ic-mekan-led-ekran"],
    chip: "P1.86 GOB",
    name: "NXTIONSTAR P1.86 GOB İç Mekân LED Modül",
    kind: "gob",
    image: "/modules/nxtionstar-p1-86-ic-mekan-modul.webp",
    imageAlt: "NXTIONSTAR P1.86 GOB iç mekân LED modül",
    priceId: "p1-86-ic-gob",
    specs: {
      pitch: k("1,86 mm"),
      moduleSize: k("320 × 160 mm"),
      matrix: k("172 × 86 piksel"),
      pixels: k("14.792"),
      ledType: k("RGB, GOB (Glue on Board) kaplama"),
      voltage: DC5,
      service: k("Önden bakım ve mıknatıslı montaj"),
      control: k("Gönderici/alıcı kartlı sistemler (ör. Novastar, Huidu); HDR desteği"),
    },
    note: "Önden bakım yapılabildiği için duvara yakın kurulumlarda servis alanı gerektirmez; toplantı, sergi ve izleme merkezlerinde kullanılır.",
  },
  {
    slug: "p2-5",
    group: "ic-mekan-led-ekran",
    chip: "P2.5",
    name: "NXTIONSTAR P2.5 İç Mekân LED Modül",
    kind: "ic",
    image: "/modules/nxtionstar-p2-5-ic-mekan-modul.webp",
    imageAlt: "NXTIONSTAR P2.5 iç mekân LED modül",
    priceId: "p2-5-ic",
    specs: {
      pitch: k("2,5 mm"),
      moduleSize: k("320 × 160 mm"),
      matrix: k("64 × 128 piksel"),
      pixels: k("8.192"),
      voltage: DC5,
      control: SR,
    },
    note: "İç mekânda en sık seçilen piksel aralıklarından biridir; mağaza, kafe, showroom ve toplantı salonlarında orta mesafeden izleme için uygundur.",
  },
  {
    slug: "p3-07",
    group: "ic-mekan-led-ekran",
    chip: "P3.07",
    name: "NXTIONSTAR P3.07 İç Mekân LED Modül",
    kind: "ic",
    image: "/projects/modules/indoor-smd-surface.jpg",
    imageAlt: "İç mekân SMD LED modül yüzeyi",
    priceId: "p3-07-ic",
    specs: {
      pitch: h("3,07 mm"),
      moduleSize: h("320 × 160 mm"),
      matrix: h("104 × 52 piksel (modül ölçüsü ÷ piksel aralığı)"),
      pixels: h("5.408 (hesaplanan)"),
    },
    note: "Ekranın biraz daha uzaktan izlendiği salon, restoran ve geniş mağaza alanlarında bütçeyi dengelemek için değerlendirilir.",
  },
  {
    slug: "p4",
    group: "ic-mekan-led-ekran",
    chip: "P4",
    name: "NXTIONSTAR P4 İç Mekân LED Modül",
    kind: "ic",
    image: "/projects/modules/indoor-wall.jpg",
    imageAlt: "İç mekân LED ekran duvarı",
    priceId: "p4-ic",
    specs: {
      pitch: h("4 mm"),
      moduleSize: h("320 × 160 mm"),
      matrix: h("80 × 40 piksel (modül ölçüsü ÷ piksel aralığı)"),
      pixels: h("3.200 (hesaplanan)"),
    },
    note: "Yüksek tavanlı salonlar, spor alanları ve izleyicinin uzakta durduğu geniş iç mekânlar için ekonomik bir seçenektir.",
  },
  {
    slug: "p2-5",
    group: "dis-mekan-led-ekran",
    chip: "P2.5",
    name: "NXTIONSTAR P2.5 Dış Mekân LED Modül",
    kind: "dis",
    image: "/modules/nxtionstar-p2-5-dis-mekan-modul.webp",
    imageAlt: "NXTIONSTAR P2.5 dış mekân LED modül",
    priceId: "p2-5-dis",
    specs: {
      pitch: k("2,5 mm"),
      moduleSize: k("320 × 160 mm"),
      matrix: k("64 × 128 piksel"),
      pixels: k("8.192"),
      protection: k("Su ve toza karşı korumalı gövde"),
      voltage: DC5,
      control: SR,
      media: k("MP4, JPG, PNG, GIF, AVI, MOV"),
    },
    note: "Dış mekân modüller arasında en ince piksel aralığıdır; yakından izlenen vitrin, giriş ve yaya bölgesi ekranları için planlanır.",
  },
  {
    slug: "p2-9",
    group: "dis-mekan-led-ekran",
    chip: "P2.9",
    name: "NXTIONSTAR P2.9 Dış Mekân LED Modül",
    kind: "dis",
    image: "/modules/nxtionstar-p2-97-dis-mekan-modul.webp",
    imageAlt: "NXTIONSTAR P2.9 dış mekân LED modül",
    priceId: "p2-9-dis",
    specs: {
      pitch: k("2,97 mm"),
      moduleSize: k("250 × 250 mm"),
      matrix: k("84 × 84 piksel"),
      pixels: k("7.056"),
      density: k("112.896 piksel/m²"),
      protection: k("IP65"),
      voltage: DC5,
      control: SR,
    },
    note: "Kare modül yapısı sayesinde sahne, etkinlik ve sabit dış mekân kurulumlarında esnek ölçülendirme sağlar. Ekran ölçüsü bu modül düzenine göre teklifte netleştirilir.",
  },
  {
    slug: "p3-07",
    group: "dis-mekan-led-ekran",
    chip: "P3.07",
    name: "NXTIONSTAR P3.07 Dış Mekân LED Modül",
    kind: "dis",
    image: "/modules/nxtionstar-p3-076-dis-mekan-modul.webp",
    imageAlt: "NXTIONSTAR P3.07 dış mekân LED modül",
    priceId: "p3-07-dis",
    specs: {
      pitch: k("3,076 mm"),
      moduleSize: k("320 × 160 mm"),
      matrix: k("52 × 104 piksel"),
      pixels: k("5.408"),
      ledType: k("Yüksek parlaklıklı RGB LED"),
      protection: k("IP65"),
      voltage: DC5,
      control: SR,
      media: MEDIA,
    },
    note: "Cephe, reklam alanı ve etkinlik tabelalarında netlik ile maliyet arasında dengeli bir dış mekân seçeneğidir.",
  },
  {
    slug: "p4",
    group: "dis-mekan-led-ekran",
    chip: "P4",
    name: "NXTIONSTAR P4 Dış Mekân LED Modül",
    kind: "dis",
    image: "/modules/nxtionstar-p4-dis-mekan-modul.webp",
    imageAlt: "NXTIONSTAR P4 dış mekân LED modül",
    priceId: "p4-dis",
    specs: {
      pitch: k("4 mm"),
      moduleSize: k("320 × 160 mm"),
      matrix: k("80 × 40 piksel"),
      pixels: k("3.200"),
      protection: k("IP65"),
      voltage: DC5,
      control: SR,
      media: MEDIA,
      current: k("Ortalama 5–10 A"),
      viewDistance: k("4 m"),
    },
    note: "Orta ve büyük ölçekli cephe, totem ve meydan ekranlarında yaygın kullanılan bir piksel aralığıdır.",
  },
  {
    slug: "p4-on-servis",
    group: "dis-mekan-led-ekran",
    chip: "P4 önden servis",
    name: "NXTIONSTAR P4 Önden Servisli Dış Mekân LED Modül",
    kind: "dis",
    image: "/projects/modules/front-service-module.jpg",
    imageAlt: "Önden servis edilebilen LED modül",
    priceId: "p4-dis-front",
    specs: {
      pitch: h("4 mm"),
      moduleSize: h("320 × 160 mm"),
      service: h("Önden servis (front service)"),
      matrix: h("80 × 40 piksel (modül ölçüsü ÷ piksel aralığı)"),
      pixels: h("3.200 (hesaplanan)"),
    },
    note: "Arkasında servis boşluğu bırakılamayan duvara sıfır cephe ve totem kurulumları için önden bakım yapılabilen versiyondur.",
  },
  {
    slug: "p5",
    group: "dis-mekan-led-ekran",
    chip: "P5",
    name: "NXTIONSTAR P5 Dış Mekân LED Modül",
    kind: "dis",
    image: "/modules/nxtionstar-p5-dis-mekan-modul.webp",
    imageAlt: "NXTIONSTAR P5 dış mekân LED modül",
    priceId: "p5-dis",
    specs: {
      pitch: k("5 mm"),
      moduleSize: k("320 × 160 mm"),
      matrix: k("64 × 32 piksel"),
      pixels: k("2.048"),
      protection: k("IP65"),
      voltage: DC5,
      control: SR,
      media: MEDIA,
      current: k("5–10 A (parlaklık ayarı ve ortam koşullarına göre)"),
      viewDistance: k("5 m ve üzeri"),
    },
    note: "Orta ve uzak mesafeden izlenen reklam panoları, belediye bilgilendirme ekranları ve etkinlik alanları için uygundur.",
  },
  {
    slug: "p8",
    group: "dis-mekan-led-ekran",
    chip: "P8",
    name: "NXTIONSTAR P8 Dış Mekân LED Modül",
    kind: "dis",
    image: "/modules/nxtionstar-p8-dis-mekan-modul.webp",
    imageAlt: "NXTIONSTAR P8 dış mekân LED modül",
    specs: {
      pitch: k("8 mm"),
      moduleSize: k("256 × 128 mm"),
      matrix: k("32 × 16 piksel"),
      pixels: k("512"),
      protection: k("IP65"),
      voltage: DC5,
      control: SR,
      media: MEDIA,
    },
    note: "Bina cepheleri ve büyük reklam panoları gibi uzaktan izlenen geniş yüzeylerde maliyeti düşük tutmak için tercih edilir.",
  },
  {
    slug: "p1-86-esnek",
    group: "esnek-led-ekran",
    chip: "P1.86 esnek",
    name: "NXTIONSTAR P1.86 Esnek İç Mekân LED Modül",
    kind: "esnek",
    image: "/modules/nxtionstar-esnek-modul.webp",
    imageAlt: "Bükülmüş NXTIONSTAR esnek LED modül",
    specs: {
      pitch: k("1,86 mm"),
      moduleSize: k("320 × 160 mm"),
      matrix: k("172 × 86 piksel"),
      pixels: k("14.792"),
      ledType: k("RGB, esnek (yumuşak) PCB"),
      service: k("Mıknatıslı montaj"),
      voltage: DC5,
      control: SR,
    },
    note: "Kolon kaplama, kavisli duvar ve silindir gibi formlarda yakın izleme için ince piksel aralıklı esnek çözümdür.",
  },
  {
    slug: "p2-5-esnek",
    group: "esnek-led-ekran",
    chip: "P2.5 esnek",
    name: "NXTIONSTAR P2.5 Esnek İç Mekân LED Modül",
    kind: "esnek",
    image: "/projects/modules/flex-module-bend.jpg",
    imageAlt: "Kavisli forma getirilmiş esnek LED modül",
    specs: {
      pitch: k("2,5 mm"),
      moduleSize: k("320 × 160 mm"),
      matrix: k("128 × 64 piksel"),
      pixels: k("8.192"),
      ledType: k("RGB, esnek yapı"),
      voltage: DC5,
      control: SR,
    },
    note: "Orta mesafeden izlenen kavisli yüzeylerde, kemer ve kolon gibi düz olmayan alanlarda kullanılan esnek modüldür.",
  },
];

export const modelPath = (m: Pick<LedModel, "group" | "slug">) => `/tr/products/${m.group}/${m.slug}/`;
export const modelsForGroup = (group: string) =>
  LED_MODELS.filter((m) => m.group === group || m.alsoIn?.includes(group));
export const getModel = (group: string, slug: string) => LED_MODELS.find((m) => m.group === group && m.slug === slug);
export const modelPrice = (m: LedModel): PanelPrice | undefined =>
  m.priceId ? PANEL_PRICES.find((p) => p.id === m.priceId) : undefined;

export const modelUrlForPrice = (absolute: (path: string) => string) => (p: PanelPrice) => {
  const m = LED_MODELS.find((x) => x.priceId === p.id);
  return m ? absolute(modelPath(m)) : undefined;
};
