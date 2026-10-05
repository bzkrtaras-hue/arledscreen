/**
 * Commercial SEO landing clusters (TR only).
 *
 * Rules:
 * - No programmatic city spam (81 il). Cities live under /tr/bolgeler/ with real refs only.
 * - No invented projects, prices, certificates, or “Türkiye’nin en büyüğü” claims.
 * - Product catalog stays canonical at /tr/products/<slug>/; this file adds money/use-case/pitch landings.
 */
import { references, type Reference } from "@/content/references";
import { displayCompany } from "@/content/trust";
import { modelPath, LED_MODELS } from "@/content/models";
import { productGroupPath, getProductGroup } from "@/content/categories";
import { SERVICE_REGIONS } from "@/content/service-regions";

export type CommercialCluster = "intent" | "product" | "pitch" | "use";

export interface CommercialProof {
  date: string;
  label: string;
  detail: string;
  location: string;
}

export interface CommercialImage {
  src: string;
  alt: string;
}

export interface CommercialLink {
  href: string;
  label: string;
}

export interface CommercialPage {
  slug: string;
  cluster: CommercialCluster;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  lead: string;
  intro: string[];
  bullets: string[];
  images: CommercialImage[];
  proofs: CommercialProof[];
  relatedProducts: CommercialLink[];
  relatedUses: CommercialLink[];
  relatedCities: CommercialLink[];
  relatedIntents: CommercialLink[];
  faqs: { question: string; answer: string }[];
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
}

function proofsFrom(filter: (r: Reference) => boolean, limit = 6): CommercialProof[] {
  return references
    .filter((r) => r.location && filter(r))
    .slice(0, limit)
    .map((r) => ({
      date: r.date,
      label: displayCompany(r),
      detail: r.detail,
      location: r.location,
    }));
}

function productLink(slug: string, label?: string): CommercialLink | null {
  const g = getProductGroup(slug);
  if (!g) return null;
  return { href: productGroupPath(g), label: label ?? g.name };
}

function modelLink(group: string, slug: string, label: string): CommercialLink | null {
  const m = LED_MODELS.find((x) => x.group === group && x.slug === slug);
  if (!m) return null;
  return { href: modelPath(m), label };
}

function cityLinks(slugs: string[]): CommercialLink[] {
  return slugs
    .map((slug) => SERVICE_REGIONS.find((r) => r.slug === slug))
    .filter(Boolean)
    .map((r) => ({ href: `/tr/bolgeler/${r!.slug}/`, label: `${r!.name} LED ekran` }));
}

const NAP =
  "Merkez: Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa / İstanbul · +90 530 507 88 34 · arled@arledscreen.com";

const CORE_CITIES = cityLinks(["istanbul", "antalya", "bursa", "izmir", "eskisehir", "manisa", "yalova"]);

function intentLinks(except?: string): CommercialLink[] {
  const all: CommercialLink[] = [
    { href: "/tr/led-ekran/", label: "LED ekran" },
    { href: "/tr/led-ekran-satisi/", label: "LED ekran satışı" },
    { href: "/tr/led-ekran-ureticisi/", label: "LED ekran üreticisi" },
    { href: "/tr/led-ekran-montaj/", label: "LED ekran montaj" },
    { href: "/tr/led-ekran-kiralama/", label: "LED ekran kiralama" },
    { href: "/tr/led-ekran-fiyatlari/", label: "LED ekran fiyatları" },
    { href: "/tr/led-ekran-servis/", label: "LED ekran servis" },
  ];
  return all.filter((l) => !except || !l.href.includes(`/${except}/`));
}

function usageLinks(except?: string): CommercialLink[] {
  const all: CommercialLink[] = [
    { href: "/tr/magaza-led-ekran/", label: "Mağaza LED ekran" },
    { href: "/tr/avm-led-ekran/", label: "AVM LED ekran" },
    { href: "/tr/cephe-led-ekran/", label: "Cephe LED ekran" },
    { href: "/tr/billboard-led-ekran/", label: "Billboard LED ekran" },
    { href: "/tr/vitrin-led-ekran/", label: "Vitrin LED ekran" },
    { href: "/tr/otel-led-ekran/", label: "Otel LED ekran" },
    { href: "/tr/restoran-led-ekran/", label: "Restoran LED ekran" },
    { href: "/tr/dugun-salonu-led-ekran/", label: "Düğün salonu LED ekran" },
    { href: "/tr/konferans-salonu-led-ekran/", label: "Konferans salonu LED ekran" },
    { href: "/tr/sahne-led-ekran/", label: "Sahne LED ekran" },
    { href: "/tr/fuar-led-ekran/", label: "Fuar LED ekran" },
    { href: "/tr/belediye-led-ekran/", label: "Belediye LED ekran" },
    { href: "/tr/fabrika-led-ekran/", label: "Fabrika LED ekran" },
    { href: "/tr/spor-salonu-led-ekran/", label: "Spor salonu LED ekran" },
    { href: "/tr/stadyum-led-ekran/", label: "Stadyum LED ekran" },
  ];
  return all.filter((l) => !except || !l.href.includes(`/${except}/`)).slice(0, 8);
}

function productClusterLinks(except?: string): CommercialLink[] {
  const slugs: [string, string][] = [
    ["ic-mekan-led-ekran", "İç mekan LED ekran"],
    ["dis-mekan-led-ekran", "Dış mekan LED ekran"],
    ["gob-led-ekran", "GOB LED"],
    ["seffaf-led-ekran", "Şeffaf LED"],
    ["esnek-led-ekran", "Esnek LED"],
    ["poster-led-ekran", "Poster / Totem LED"],
    ["kiralik-led-ekran", "Kiralık LED"],
  ];
  return slugs
    .filter(([s]) => s !== except)
    .map(([s, label]) => productLink(s, label))
    .filter((x): x is CommercialLink => Boolean(x));
}

function page(p: CommercialPage): CommercialPage {
  return p;
}

/** Main commercial intents */
const INTENT_PAGES: CommercialPage[] = [
  page({
    slug: "led-ekran",
    cluster: "intent",
    title: "LED Ekran | Satış, Montaj ve Servis | ARLEDSCREEN",
    description:
      "LED ekran satışı, montajı ve teknik servis. İstanbul Gaziosmanpaşa merkezli ARLEDSCREEN; iç/dış mekân, GOB, esnek ve kiralık çözümler. Keşif sonrası yazılı teklif.",
    h1: "LED ekran satışı, montajı ve teknik servis",
    eyebrow: "ARLEDSCREEN · LED Ekran Teknoloji Merkezi",
    lead: "İç mekân, dış mekân, GOB, esnek ve kiralık LED ekran projelerini keşiften satış sonrası servise kadar tek merkezden yönetiyoruz.",
    intro: [
      "ARLEDSCREEN, İstanbul Gaziosmanpaşa merkezli LED ekran teknoloji merkezidir. NXTIONSTAR ürün hattı ile mağaza, AVM, cephe, sahne, otel ve belediye uygulamalarında satış, montaj ve teknik servis sunar.",
      "Sabit m² fiyatı yoktur; panel listesi fiyat hesaplayıcıda yayımlanır, nihai tutar ölçü, piksel aralığı ve montaj koşullarına göre keşif sonrası yazılı teklifle kesinleşir.",
      NAP,
    ],
    bullets: [
      "Keşif → tasarım → üretim/tedarik → montaj → kalibrasyon → servis",
      "Kayıtlı illerde yayımlanmış proje örnekleri (81 il spam’i yok)",
      "İç/dış mekân, GOB, esnek, poster/totem ve kiralık seçenekler",
    ],
    images: [
      { src: "/projects/urun-ic-mekan.jpg", alt: "İç mekân LED ekran uygulaması" },
      { src: "/projects/urun-dis-mekan.jpg", alt: "Dış mekân LED ekran uygulaması" },
      { src: "/projects/factory-assembly.jpg", alt: "LED ekran montaj ve montaj hazırlığı" },
    ],
    proofs: proofsFrom(() => true, 8),
    relatedProducts: productClusterLinks(),
    relatedUses: usageLinks(),
    relatedCities: CORE_CITIES,
    relatedIntents: intentLinks("led-ekran"),
    faqs: [
      {
        question: "LED ekran fiyatı nasıl belirlenir?",
        answer:
          "Panel USD listesi fiyat hesaplayıcıda yayımlanır. Nihai tutar ölçü, piksel aralığı, iç/dış mekân, konstrüksiyon ve montaj koşullarına göre keşif sonrası yazılı teklifle kesinleşir.",
      },
      {
        question: "Hangi şehirlerde hizmet veriyorsunuz?",
        answer:
          "Merkez İstanbul Gaziosmanpaşa’dadır. Hizmet Türkiye geneli planlanır; sitede yalnızca yayımlanmış proje kaydı olan iller için ayrı sayfa açılır.",
      },
    ],
    primaryCta: { href: "/tr/quote/", label: "Teklif iste" },
    secondaryCta: { href: "/tr/hesaplayici/", label: "Fiyat hesapla" },
  }),
  page({
    slug: "led-ekran-satisi",
    cluster: "intent",
    title: "LED Ekran Satışı | ARLEDSCREEN İstanbul",
    description:
      "LED ekran satışı: iç/dış mekân, GOB ve esnek paneller. ARLEDSCREEN İstanbul merkezli satış, keşif ve yazılı teklif süreci.",
    h1: "LED ekran satışı",
    eyebrow: "Satış",
    lead: "Projeye uygun piksel aralığı ve panel tipini birlikte seçiyoruz; satış sürecini keşif ve yazılı teklifle şeffaf yürütüyoruz.",
    intro: [
      "LED ekran satışı yalnızca ürün listesi değil; kullanım amacı, izleme mesafesi ve montaj yüzeyine göre doğru piksel aralığının seçilmesidir.",
      "NXTIONSTAR iç mekân, dış mekân, GOB ve esnek serileri ile Huidu, NovaStar ve Colorlight kontrol hatlarını aynı süreçte sunuyoruz.",
      NAP,
    ],
    bullets: [
      "Satış öncesi keşif ve ihtiyaç analizi",
      "Panel + kontrol sistemi birlikte planlanır",
      "Yazılı teklif; gizli ek ücret yok",
    ],
    images: [
      { src: "/projects/panels-warehouse.jpg", alt: "LED ekran panel stok ve satış hazırlığı" },
      { src: "/projects/indoor-smd.jpg", alt: "İç mekân SMD LED ekran satışı" },
    ],
    proofs: proofsFrom((r) => /P\d|panel|Premium|Ultra/i.test(r.detail), 6),
    relatedProducts: productClusterLinks(),
    relatedUses: usageLinks(),
    relatedCities: CORE_CITIES,
    relatedIntents: intentLinks("led-ekran-satisi"),
    faqs: [
      {
        question: "Sadece panel satışı yapıyor musunuz?",
        answer:
          "Evet, panel ve kontrol ekipmanı satışı yapılabilir. Çoğu projede montaj ve devreye alma da aynı teklifte planlanır.",
      },
    ],
    primaryCta: { href: "/tr/quote/", label: "Satış teklifi iste" },
    secondaryCta: { href: "/tr/products/", label: "Ürün grupları" },
  }),
  page({
    slug: "led-ekran-ureticisi",
    cluster: "intent",
    title: "LED Ekran Üreticisi | ARLEDSCREEN NXTIONSTAR",
    description:
      "LED ekran üreticisi ve tedarikçi: NXTIONSTAR paneller, İstanbul merkezli montaj ve servis. ARLEDSCREEN üretim/tedarik sürecini uçtan uca yönetir.",
    h1: "LED ekran üreticisi ve teknoloji merkezi",
    eyebrow: "Üretim · Tedarik",
    lead: "İstanbul merkezli teknoloji merkezimizde NXTIONSTAR LED ekran sistemlerini projelendiriyor, tedarik ediyor ve sahada uyguluyoruz.",
    intro: [
      "ARLEDSCREEN, NXTIONSTAR markalı LED ekran çözümlerini Türkiye’de satış, montaj ve servisle buluşturan teknoloji merkezidir.",
      "Üretim/tedarik, kalite kontrol ve saha montajı aynı operasyon altında ilerler; proje ölçüsüne göre panel ve kontrol konfigürasyonu hazırlanır.",
      NAP,
    ],
    bullets: [
      "NXTIONSTAR ürün hattı",
      "Proje bazlı panel ve kontrol konfigürasyonu",
      "Fabrika/montaj görselleri ve saha kayıtları",
    ],
    images: [
      { src: "/projects/factory-assembly.jpg", alt: "LED ekran üretim ve montaj hazırlığı" },
      { src: "/projects/frame-workshop.jpg", alt: "LED ekran konstrüksiyon atölyesi" },
      { src: "/projects/service-assembly.jpg", alt: "LED ekran servis ve montaj istasyonu" },
    ],
    proofs: proofsFrom(() => true, 6),
    relatedProducts: productClusterLinks(),
    relatedUses: usageLinks(),
    relatedCities: CORE_CITIES,
    relatedIntents: intentLinks("led-ekran-ureticisi"),
    faqs: [
      {
        question: "Üretici misiniz, bayi misiniz?",
        answer:
          "ARLEDSCREEN, NXTIONSTAR LED ekran sistemlerini projelendiren, tedarik eden ve sahada uygulayan İstanbul merkezli teknoloji merkezidir. Marka ve operasyon ayrımı teklif sürecinde net yazılır.",
      },
    ],
    primaryCta: { href: "/tr/quote/", label: "Proje teklifi iste" },
    secondaryCta: { href: "/tr/nxtionstar/", label: "NXTIONSTAR" },
  }),
  page({
    slug: "led-ekran-montaj",
    cluster: "intent",
    title: "LED Ekran Montaj | ARLEDSCREEN",
    description:
      "LED ekran montajı: keşif, konstrüksiyon, kabin yerleşimi, kablolama ve kalibrasyon. İstanbul Gaziosmanpaşa merkezli ARLEDSCREEN saha ekibi.",
    h1: "LED ekran montajı",
    eyebrow: "Montaj",
    lead: "Taşıyıcı konstrüksiyondan kabin yerleşimine, güç/sinyal kablolamasından kalibrasyona kadar montajı sahada yönetiyoruz.",
    intro: [
      "LED ekran montajı; yüzey, rüzgâr/yük hesabı (dış mekân), elektrik ve sinyal hattı ile birlikte planlanır.",
      "Süreç: keşif → projelendirme → montaj → devreye alma → kullanım eğitimi. Detaylı adımlar Hizmetler sayfasında da yer alır.",
      NAP,
    ],
    bullets: [
      "İç ve dış mekân montajı",
      "Kabin, güç ve data hattı",
      "Kalibrasyon ve teslim tutanağı",
    ],
    images: [
      { src: "/projects/install-scaffold.jpg", alt: "LED ekran montaj iskelesi ve saha kurulumu" },
      { src: "/projects/install-wiring.jpg", alt: "LED ekran güç ve sinyal kablolaması" },
      { src: "/projects/modules/indoor-install.jpg", alt: "İç mekân LED ekran montajı" },
    ],
    proofs: proofsFrom((r) => /montaj|dış mekân|dış mekan|cm/i.test(`${r.detail} ${r.company}`), 6),
    relatedProducts: productClusterLinks(),
    relatedUses: usageLinks(),
    relatedCities: CORE_CITIES,
    relatedIntents: intentLinks("led-ekran-montaj"),
    faqs: [
      {
        question: "Montaj süresi ne kadar?",
        answer:
          "Ölçü, kat yüksekliği ve konstrüksiyon tipine göre değişir. Keşif sonrası teklifte gün planı yazılır.",
      },
    ],
    primaryCta: { href: "/tr/quote/", label: "Montaj keşfi iste" },
    secondaryCta: { href: "/tr/hizmetler/", label: "Hizmet süreci" },
  }),
  page({
    slug: "led-ekran-kiralama",
    cluster: "intent",
    title: "LED Ekran Kiralama | Sahne ve Etkinlik | ARLEDSCREEN",
    description:
      "LED ekran kiralama: sahne, fuar ve etkinlik için kiralık kabin çözümleri. ARLEDSCREEN kiralama ve kurulum desteği.",
    h1: "LED ekran kiralama",
    eyebrow: "Kiralama",
    lead: "Kısa süreli etkinlik, sahne ve fuarlar için kiralık LED ekran kurulumu planlıyoruz.",
    intro: [
      "Satın alma yerine kısa süreli ihtiyaçlarda kiralık LED ekran daha verimli olabilir. Ölçü, süre ve kurulum lokasyonu teklifi belirler.",
      "Kiralık ürün grubu ve kiralık mı satın alma rehberi ile karşılaştırma yapabilirsiniz.",
      NAP,
    ],
    bullets: [
      "Sahne ve etkinlik kurulumları",
      "Süreye göre teklif",
      "Kurulum + söküm planı",
    ],
    images: [
      { src: "/projects/modules/rental-kit.jpg", alt: "Kiralık LED ekran kabin seti" },
      { src: "/projects/modules/rental-cabinet-labeled.jpg", alt: "Kiralık LED kabin detayı" },
      { src: "/projects/custom-booth.jpg", alt: "Fuar standı LED ekran uygulaması" },
    ],
    proofs: proofsFrom((r) => /kiralama|sahne|fuar|Ordu Günleri|stand/i.test(`${r.detail} ${r.company}`), 6),
    relatedProducts: [productLink("kiralik-led-ekran", "Kiralık LED ekran")!].filter(Boolean),
    relatedUses: usageLinks().filter((u) => /sahne|fuar|dugun|konferans/.test(u.href)),
    relatedCities: CORE_CITIES,
    relatedIntents: intentLinks("led-ekran-kiralama"),
    faqs: [
      {
        question: "Kiralık mı, satın alma mı?",
        answer:
          "Tek seferlik etkinliklerde kiralama; sürekli kullanımda satın alma genelde daha ekonomiktir. Karşılaştırma için rehber sayfamıza bakın.",
      },
    ],
    primaryCta: { href: "/tr/quote/", label: "Kiralama teklifi" },
    secondaryCta: { href: "/tr/products/kiralik-led-ekran/", label: "Kiralık ürün grubu" },
  }),
  page({
    slug: "led-ekran-fiyatlari",
    cluster: "intent",
    title: "LED Ekran Fiyatları 2026 | ARLEDSCREEN",
    description:
      "LED ekran fiyatları: panel USD listesi fiyat hesaplayıcıda. m² fiyatı ölçü, piksel aralığı ve montaja göre değişir. ARLEDSCREEN yazılı teklif.",
    h1: "LED ekran fiyatları",
    eyebrow: "Fiyatlandırma",
    lead: "Sabit tek m² fiyatı yoktur. Yayımlanan panel listesini hesaplayıcıda görün; nihai tutar keşif sonrası yazılı teklifle kesinleşir.",
    intro: [
      "LED ekran fiyatını belirleyen başlıca kalemler: piksel aralığı, toplam m², iç/dış mekân, kabin tipi, kontrol sistemi, konstrüksiyon ve montaj koşullarıdır.",
      "Güncel panel USD bandı fiyat hesaplayıcıda listelenir. Detaylı fiyat faktörleri için eski rehber içeriği de bu sayfaya taşınmıştır; hesaplayıcı her zaman güncel listedir.",
      NAP,
    ],
    bullets: [
      "Panel listesi → /tr/hesaplayici/",
      "Keşif sonrası yazılı teklif",
      "KDV, nakliye ve montaj teklifte ayrı kalemlenebilir",
    ],
    images: [
      { src: "/projects/led-kit.jpg", alt: "LED ekran panel ve montaj kiti" },
      { src: "/projects/cabinet-50x100.jpg", alt: "LED ekran kabin örneği" },
    ],
    proofs: proofsFrom((r) => /\d+\s*m|cm|P\d/i.test(r.detail), 6),
    relatedProducts: productClusterLinks(),
    relatedUses: usageLinks(),
    relatedCities: CORE_CITIES,
    relatedIntents: intentLinks("led-ekran-fiyatlari"),
    faqs: [
      {
        question: "LED ekran m² fiyatı nedir?",
        answer:
          "Tek sabit m² fiyatı yoktur. Panel USD listesi hesaplayıcıda yayımlanır; montaj ve konstrüksiyon keşif sonrası eklenir.",
      },
      {
        question: "Fiyat teklifi için ne gerekli?",
        answer:
          "Yaklaşık ölçü, iç/dış mekân, kullanım amacı ve izleme mesafesi yeterlidir. Fotoğraf süreci hızlandırır.",
      },
    ],
    primaryCta: { href: "/tr/hesaplayici/", label: "Fiyat hesapla" },
    secondaryCta: { href: "/tr/quote/", label: "Yazılı teklif iste" },
  }),
  page({
    slug: "led-ekran-servis",
    cluster: "intent",
    title: "LED Ekran Servis ve Bakım | ARLEDSCREEN",
    description:
      "LED ekran teknik servis, bakım, modül ve güç kaynağı değişimi. İstanbul merkezli ARLEDSCREEN servis ekibi.",
    h1: "LED ekran teknik servis",
    eyebrow: "Servis · Bakım",
    lead: "Periyodik bakım, arıza tespiti, modül/güç kaynağı değişimi ve mevcut ekranlar için teknik servis desteği sunuyoruz.",
    intro: [
      "Satışını yaptığımız sistemlerde satış sonrası teknik destek planlanır. Başka marka ekranlarda model ve kontrol kartı bilgisiyle servis uygunluğu değerlendirilir.",
      "Servis kapsamı: yerinde inceleme, arıza tespiti, yedek parça ve kalibrasyon.",
      NAP,
    ],
    bullets: [
      "Modül ve PSU değişimi",
      "Kontrol sistemi kontrolü",
      "Periyodik bakım planı",
    ],
    images: [
      { src: "/projects/service-assembly.jpg", alt: "LED ekran teknik servis istasyonu" },
      { src: "/projects/modules/front-service-module.jpg", alt: "Önden servis LED modül" },
    ],
    proofs: proofsFrom(() => true, 4),
    relatedProducts: productClusterLinks(),
    relatedUses: usageLinks(),
    relatedCities: CORE_CITIES,
    relatedIntents: intentLinks("led-ekran-servis"),
    faqs: [
      {
        question: "Başka firmadan alınmış ekrana bakıyor musunuz?",
        answer:
          "Marka, model ve kontrol sistemi bilgisini paylaşırsanız inceleyip servis ve yedek parça olanaklarını iletiriz.",
      },
    ],
    primaryCta: { href: "/tr/quote/", label: "Servis talebi" },
    secondaryCta: { href: "/tr/hizmetler/", label: "Hizmetler" },
  }),
];

/**
 * Product catalog landings stay canonical at /tr/products/<slug>/.
 * Only add a top-level product page when no products/ URL exists (totem).
 */
const PRODUCT_ALIAS_PAGES: CommercialPage[] = [
  {
    slug: "totem-led-ekran",
    cluster: "product",
    title: "Totem LED Ekran | ARLEDSCREEN",
    description: "Totem LED ekran: ayaklı dijital bilgilendirme ve reklam. ARLEDSCREEN satış ve montaj.",
    h1: "Totem LED ekran",
    eyebrow: "Ürün · Totem",
    lead: "AVM, otel ve kamu alanları için ayaklı totem LED çözümleri.",
    intro: [
      "Totem LED ekran, zemine oturan bağımsız bir bilgilendirme/reklam ünitesidir. Poster LED ürün grubuyla birlikte planlanır.",
      NAP,
    ],
    bullets: ["Ayaklı yapı", "İç / dış seçenek", "Tekli veya çift yüz"],
    images: [
      { src: "/projects/totem-indoor.jpg", alt: "İç mekan totem LED ekran" },
      { src: "/projects/totem-outdoor.jpg", alt: "Dış mekan totem LED ekran" },
    ],
    proofs: proofsFrom((r) => /vitrin|belediye|otel|resort/i.test(`${r.detail} ${r.company}`), 3),
    relatedProducts: productClusterLinks(),
    relatedUses: usageLinks().filter((u) => /avm|otel|belediye|magaza/.test(u.href)),
    relatedCities: CORE_CITIES,
    relatedIntents: intentLinks(),
    faqs: [
      {
        question: "Totem LED dış mekânda dayanıklı mı?",
        answer:
          "Dış mekan totemlerde koruma sınıfı ve konstrüksiyon keşifte seçilir; iç mekan üniteleri ayrı planlanır.",
      },
    ],
    primaryCta: { href: "/tr/products/poster-led-ekran/", label: "Poster / Totem grubu" },
    secondaryCta: { href: "/tr/quote/", label: "Teklif iste" },
  },
];
function pitchPage(opts: {
  slug: string;
  label: string;
  h1: string;
  lead: string;
  intro: string[];
  modelLinks: CommercialLink[];
  proof: (r: Reference) => boolean;
  images: CommercialImage[];
}): CommercialPage {
  return {
    slug: opts.slug,
    cluster: "pitch",
    title: `${opts.label} Ekran | ARLEDSCREEN`,
    description: `${opts.label} LED ekran çözümleri. ARLEDSCREEN satış, montaj ve teknik servis. Keşif sonrası yazılı teklif.`,
    h1: opts.h1,
    eyebrow: "Piksel aralığı",
    lead: opts.lead,
    intro: [...opts.intro, NAP],
    bullets: ["İzleme mesafesine göre seçim", "Model sayfalarında teknik özet", "Fiyat hesaplayıcı + yazılı teklif"],
    images: opts.images,
    proofs: proofsFrom(opts.proof, 5),
    relatedProducts: opts.modelLinks,
    relatedUses: usageLinks(),
    relatedCities: CORE_CITIES,
    relatedIntents: intentLinks(),
    faqs: [
      {
        question: `${opts.label} ne zaman seçilir?`,
        answer:
          "İzleme mesafesi, bütçe ve içerik tipi birlikte değerlendirilir. Yakın mesafede daha küçük pitch; uzak servis/cephede daha büyük pitch tercih edilir.",
      },
    ],
    primaryCta: { href: opts.modelLinks[0]?.href ?? "/tr/products/", label: "Modeli incele" },
    secondaryCta: { href: "/tr/hesaplayici/", label: "Fiyat hesapla" },
  };
}

const PITCH_PAGES: CommercialPage[] = [
  pitchPage({
    slug: "p1-25-led-ekran",
    label: "P1.25 LED",
    h1: "P1.25 LED ekran",
    lead: "Çok yakın izleme için ince pitch GOB paneller.",
    intro: [
      "P1.25, kontrol odası, lüks mağaza ve yakın mesafe lobilerde yüksek çözünürlük için tercih edilir. GOB korumalı model sayfasından teknik özete ulaşabilirsiniz.",
    ],
    modelLinks: [modelLink("gob-led-ekran", "p1-25-gob", "P1.25 GOB model")!].filter(Boolean),
    proof: (r) => /P1\.25|P1\.2/i.test(r.detail),
    images: [
      { src: "/projects/modules/fine-pitch-panel.jpg", alt: "İnce pitch LED panel" },
      { src: "/projects/modules/tech/cob-smd-gob-trio.jpg", alt: "İnce pitch yüzey teknolojileri" },
    ],
  }),
  pitchPage({
    slug: "p1-86-led-ekran",
    label: "P1.86 LED",
    h1: "P1.86 LED ekran",
    lead: "İnce pitch ile bütçe dengesi; GOB ve esnek seçenekler.",
    intro: [
      "P1.86, kurumsal lobi ve mağaza ekranlarında sık kullanılan ince pitch bandıdır. GOB ve esnek varyantları model sayfalarındadır.",
    ],
    modelLinks: [
      modelLink("gob-led-ekran", "p1-86-gob", "P1.86 GOB"),
      modelLink("esnek-led-ekran", "p1-86-esnek", "P1.86 esnek"),
    ].filter((x): x is CommercialLink => Boolean(x)),
    proof: (r) => /P1\.86/i.test(r.detail),
    images: [
      { src: "/projects/modules/fine-pitch-panel.jpg", alt: "P1.86 ince pitch LED" },
      { src: "/projects/modules/indoor-wall.jpg", alt: "İç mekan ince pitch duvar" },
    ],
  }),
  pitchPage({
    slug: "p2-5-led-ekran",
    label: "P2.5 LED",
    h1: "P2.5 LED ekran",
    lead: "İç ve dış mekân projelerinde en çok kullanılan pitch bandı.",
    intro: [
      "P2.5; mağaza, kafe, sahne yakını ve orta mesafe dış mekânlarda dengeli çözünürlük sunar. Kayıtlı projelerde sık geçer.",
    ],
    modelLinks: [
      modelLink("ic-mekan-led-ekran", "p2-5", "P2.5 iç mekan"),
      modelLink("dis-mekan-led-ekran", "p2-5", "P2.5 dış mekan"),
      modelLink("esnek-led-ekran", "p2-5-esnek", "P2.5 esnek"),
    ].filter((x): x is CommercialLink => Boolean(x)),
    proof: (r) => /P2\.5/i.test(r.detail),
    images: [
      { src: "/projects/indoor-smd.jpg", alt: "P2.5 iç mekan LED" },
      { src: "/projects/modules/outdoor-cab.jpg", alt: "P2.5 dış mekan kabin" },
    ],
  }),
  pitchPage({
    slug: "p2-9-led-ekran",
    label: "P2.9 LED",
    h1: "P2.9 LED ekran",
    lead: "Dış mekân orta mesafe için P2.9 / P2.97 bandı.",
    intro: ["P2.9 dış mekân ekranlarda orta izleme mesafesi için dengeli bir seçenektir. Model sayfasında teknik özet yer alır."],
    modelLinks: [modelLink("dis-mekan-led-ekran", "p2-9", "P2.9 dış mekan")!].filter(Boolean),
    proof: (r) => /P2\.9|P2\.97/i.test(r.detail),
    images: [
      { src: "/projects/modules/outdoor-public-screen.jpg", alt: "Dış mekan halka açık LED ekran" },
      { src: "/projects/urun-dis-mekan.jpg", alt: "Dış mekan LED ekran" },
    ],
  }),
  pitchPage({
    slug: "p3-07-led-ekran",
    label: "P3.07 LED",
    h1: "P3.07 LED ekran",
    lead: "İç ve dış mekân orta mesafe uygulamaları için P3.07.",
    intro: ["P3.07, iç ve dış mekân kataloglarında yer alan orta pitch seçeneğidir. Kullanım yerine göre iç veya dış seri seçilir."],
    modelLinks: [
      modelLink("ic-mekan-led-ekran", "p3-07", "P3.07 iç mekan"),
      modelLink("dis-mekan-led-ekran", "p3-07", "P3.07 dış mekan"),
    ].filter((x): x is CommercialLink => Boolean(x)),
    proof: (r) => /P3|P3\.0/i.test(r.detail),
    images: [
      { src: "/projects/modules/indoor-smd-surface.jpg", alt: "P3 sınıfı iç mekan yüzey" },
      { src: "/projects/modules/outdoor-cab.jpg", alt: "P3 sınıfı dış mekan kabin" },
    ],
  }),
  pitchPage({
    slug: "p4-led-ekran",
    label: "P4 LED",
    h1: "P4 LED ekran",
    lead: "Cephe ve açık alan için sık tercih edilen P4 bandı.",
    intro: [
      "P4, Manisa Büyükşehir Belediyesi kaydındaki 1344×128 cm Ultra 2026 uygulaması gibi geniş dış mekân işlerinde kullanılır. Önden servis varyantı da vardır.",
    ],
    modelLinks: [
      modelLink("ic-mekan-led-ekran", "p4", "P4 iç mekan"),
      modelLink("dis-mekan-led-ekran", "p4", "P4 dış mekan"),
      modelLink("dis-mekan-led-ekran", "p4-on-servis", "P4 önden servis"),
    ].filter((x): x is CommercialLink => Boolean(x)),
    proof: (r) => /P4/i.test(r.detail),
    images: [
      { src: "/projects/modules/outdoor-facade.jpg", alt: "P4 cephe LED" },
      { src: "/projects/modules/front-service-module.jpg", alt: "P4 önden servis modül" },
    ],
  }),
  pitchPage({
    slug: "p5-led-ekran",
    label: "P5 LED",
    h1: "P5 LED ekran",
    lead: "Uzak mesafeli dış mekân ve stadyum/cephe ölçeği için P5.",
    intro: ["P5, Bursa kaydındaki 576×480 cm Premium dış mekân gibi büyük yüzeylerde tercih edilir."],
    modelLinks: [modelLink("dis-mekan-led-ekran", "p5", "P5 dış mekan")!].filter(Boolean),
    proof: (r) => /P5/i.test(r.detail),
    images: [
      { src: "/projects/billboard-arled.jpg", alt: "P5 billboard / büyük yüzey LED" },
      { src: "/projects/modules/outdoor-public-screen.jpg", alt: "Büyük dış mekan LED ekran" },
    ],
  }),
];

function usagePage(opts: {
  slug: string;
  name: string;
  lead: string;
  intro: string[];
  proof: (r: Reference) => boolean;
  images: CommercialImage[];
  products: string[];
}): CommercialPage {
  return {
    slug: opts.slug,
    cluster: "use",
    title: `${opts.name} | ARLEDSCREEN`,
    description: `${opts.name}: satış, montaj ve servis. ARLEDSCREEN İstanbul merkezli; kayıtlı proje örnekleri ve keşif sonrası yazılı teklif.`,
    h1: opts.name,
    eyebrow: "Kullanım amacı",
    lead: opts.lead,
    intro: [...opts.intro, NAP],
    bullets: ["Keşif ve ölçü", "Doğru pitch seçimi", "Montaj + servis"],
    images: opts.images,
    proofs: proofsFrom(opts.proof, 5),
    relatedProducts: opts.products
      .map((s) => productLink(s))
      .filter((x): x is CommercialLink => Boolean(x)),
    relatedUses: usageLinks(opts.slug),
    relatedCities: CORE_CITIES,
    relatedIntents: intentLinks(),
    faqs: [
      {
        question: `${opts.name} fiyatı ne kadar?`,
        answer:
          "Sabit fiyat yoktur. Ölçü, pitch ve montaj koşullarına göre hesaplayıcı + keşif sonrası yazılı teklif hazırlanır.",
      },
    ],
    primaryCta: { href: "/tr/quote/", label: "Bu kullanım için teklif" },
    secondaryCta: { href: "/tr/hesaplayici/", label: "Fiyat hesapla" },
  };
}

const USE_PAGES: CommercialPage[] = [
  usagePage({
    slug: "magaza-led-ekran",
    name: "Mağaza LED ekran",
    lead: "Vitrin, satış alanı ve marka duvarı için mağaza LED ekran çözümleri.",
    intro: [
      "Mağaza LED ekranında vitrin mesafesi ve ürün aydınlatması önemlidir. Merter ve Osmanbey gibi perakende kayıtlarımız bu kullanıma yakındır.",
    ],
    proof: (r) => /triko|vitrin|mağaza|Prestij|Gnd/i.test(`${r.company} ${r.detail}`),
    images: [
      { src: "/projects/modules/indoor-wall.jpg", alt: "Mağaza iç mekan LED duvar" },
      { src: "/projects/indoor-smd.jpg", alt: "Mağaza LED ekran" },
    ],
    products: ["ic-mekan-led-ekran", "gob-led-ekran", "poster-led-ekran"],
  }),
  usagePage({
    slug: "avm-led-ekran",
    name: "AVM LED ekran",
    lead: "AVM atrium, koridor ve cephe LED ekran uygulamaları.",
    intro: ["AVM projelerinde izleme mesafesi genişler; iç atrium ile dış cephe farklı pitch ister. Keşifte sirkülasyon ve montaj yüksekliği ölçülür."],
    proof: (r) => /Yaşam Cafe|Belediyesi|dev|640|576/i.test(`${r.company} ${r.detail}`),
    images: [
      { src: "/projects/modules/outdoor-facade.jpg", alt: "AVM cephe LED" },
      { src: "/projects/totem-indoor.jpg", alt: "AVM iç yönlendirme LED" },
    ],
    products: ["dis-mekan-led-ekran", "ic-mekan-led-ekran", "poster-led-ekran"],
  }),
  usagePage({
    slug: "cephe-led-ekran",
    name: "Cephe LED ekran",
    lead: "Bina cephesi ve meydan için dış mekan LED ekran.",
    intro: ["Cephe LED ekranda konstrüksiyon, rüzgâr yükü ve belediye izin süreçleri planın parçasıdır. Manisa ve Bursa kayıtları geniş dış yüzey örnekleridir."],
    proof: (r) => /dış mekân|dış mekan|P4|P5|1344|576/i.test(r.detail),
    images: [
      { src: "/projects/modules/outdoor-facade.jpg", alt: "Cephe LED ekran" },
      { src: "/projects/urun-dis-mekan.jpg", alt: "Dış mekan cephe LED" },
    ],
    products: ["dis-mekan-led-ekran"],
  }),
  usagePage({
    slug: "billboard-led-ekran",
    name: "Billboard LED ekran",
    lead: "Yol kenarı ve açık alan billboard LED ekranları.",
    intro: ["Billboard uygulamalarında uzak izleme mesafesi nedeniyle P4–P5 bandı sık değerlendirilir. İzin ve konstrüksiyon keşifle netleşir."],
    proof: (r) => /dış mekân|dış mekan|P5|P4|Outdoor/i.test(r.detail),
    images: [
      { src: "/projects/billboard-arled.jpg", alt: "Billboard LED ekran" },
      { src: "/projects/modules/outdoor-public-screen.jpg", alt: "Açık alan LED ekran" },
    ],
    products: ["dis-mekan-led-ekran"],
  }),
  usagePage({
    slug: "vitrin-led-ekran",
    name: "Vitrin LED ekran",
    lead: "Mağaza vitrini ve kolon uygulamaları için LED ekran.",
    intro: [
      "Aksaray Beren Kırtasiye kaydındaki 192×176 cm vitrin + kolon uygulaması bu kullanıma örnektir. Şeffaf LED alternatifi cam vitrinlerde değerlendirilir.",
    ],
    proof: (r) => /vitrin|kolon/i.test(r.detail),
    images: [
      { src: "/projects/modules/indoor-wall.jpg", alt: "Vitrin LED ekran" },
      { src: "/projects/indoor-led-lion.jpg", alt: "Vitrin yakın çekim LED" },
    ],
    products: ["ic-mekan-led-ekran", "seffaf-led-ekran", "gob-led-ekran"],
  }),
  usagePage({
    slug: "otel-led-ekran",
    name: "Otel LED ekran",
    lead: "Otel lobi, ballroom ve dış cephe LED ekran çözümleri.",
    intro: ["Alanya White City Resort Hotel kaydı otel ölçeğinde bir uygulamadır. Lobi ince pitch; dış alan daha büyük pitch ister."],
    proof: (r) => /Hotel|Resort|otel/i.test(`${r.company} ${r.detail}`),
    images: [
      { src: "/blog/alanya-otel-led-ekran.jpg", alt: "Alanya otel LED ekran uygulaması" },
      { src: "/projects/lounge-football.jpg", alt: "Lobi / lounge LED ekran" },
    ],
    products: ["ic-mekan-led-ekran", "dis-mekan-led-ekran", "gob-led-ekran"],
  }),
  usagePage({
    slug: "restoran-led-ekran",
    name: "Restoran LED ekran",
    lead: "Restoran ve kafe oturma alanları için LED ekran.",
    intro: [
      "Kafe/restoran kayıtlarımız arasında Beylikdüzü Yaşam Cafe, Prestij Cafe, Ouka Kafe ve Yozgat kampüs cafe uygulamaları bulunur.",
    ],
    proof: (r) => /Cafe|Kafe|cafe|kafe|Malt|Lounge/i.test(`${r.company} ${r.detail}`),
    images: [
      { src: "/projects/kafe.jpg", alt: "Restoran / kafe LED ekran" },
      { src: "/blog/kafe-restoran-led-ekran.jpg", alt: "Restoran LED ekran yayını" },
      { src: "/projects/lounge-football.jpg", alt: "Lounge maç yayını LED" },
    ],
    products: ["ic-mekan-led-ekran", "gob-led-ekran"],
  }),
  usagePage({
    slug: "dugun-salonu-led-ekran",
    name: "Düğün salonu LED ekran",
    lead: "Düğün ve olay salonu sahne LED ekranları.",
    intro: ["Sahne arkası ve salon yan duvar LED uygulamaları düğün organizasyonlarında sık kullanılır. Kiralık seçenek kısa süreli işler için değerlendirilebilir."],
    proof: (r) => /Düğün|düğün|sahne|Sahne/i.test(`${r.company} ${r.detail}`),
    images: [
      { src: "/projects/dugun.jpg", alt: "Düğün salonu LED ekran" },
      { src: "/projects/modules/rental-kit.jpg", alt: "Kiralık sahne LED" },
    ],
    products: ["ic-mekan-led-ekran", "kiralik-led-ekran"],
  }),
  usagePage({
    slug: "konferans-salonu-led-ekran",
    name: "Konferans salonu LED ekran",
    lead: "Konferans ve toplantı salonları için yüksek okunabilirlikli LED.",
    intro: ["Konferans salonunda izleme mesafesi ve sunum içeriği pitch seçimini belirler. İnce pitch GOB ve iç mekan serileri sık değerlendirilir."],
    proof: (r) => /P1\.|P2\.5|konferans|lobi/i.test(`${r.detail} ${r.company}`),
    images: [
      { src: "/projects/neu-kutuphane.jpg", alt: "Konferans / kurumsal LED ekran" },
      { src: "/projects/modules/indoor-wall.jpg", alt: "Salon LED duvar" },
    ],
    products: ["ic-mekan-led-ekran", "gob-led-ekran", "ince-pitch-led-ekran"],
  }),
  usagePage({
    slug: "sahne-led-ekran",
    name: "Sahne LED ekran",
    lead: "Konser, tiyatro ve etkinlik sahnesi LED ekranları.",
    intro: ["Kadıköy Matiz Sahne kaydı sahne/dış yüzey uygulamasına örnektir. Kısa süreli işlerde kiralık kabin de planlanabilir."],
    proof: (r) => /Sahne|sahne|kiralama|stand/i.test(`${r.company} ${r.detail}`),
    images: [
      { src: "/projects/modules/rental-cabinet-labeled.jpg", alt: "Sahne kiralık LED kabin" },
      { src: "/projects/custom-booth.jpg", alt: "Etkinlik sahne/stand LED" },
    ],
    products: ["kiralik-led-ekran", "dis-mekan-led-ekran", "ic-mekan-led-ekran"],
  }),
  usagePage({
    slug: "fuar-led-ekran",
    name: "Fuar LED ekran",
    lead: "Fuar standı ve geçici alan LED ekran kurulumları.",
    intro: [
      "Ünye Belediyesi’nin Ordu Günleri standı (Atatürk Havalimanı Millet Bahçesi) fuar/stand kullanımına örnektir. Kiralık veya satış seçenekleri süreye göre konuşulur.",
    ],
    proof: (r) => /Belediyesi|stand|Ordu|kiralama|fuar/i.test(`${r.company} ${r.detail}`),
    images: [
      { src: "/projects/unye.jpg", alt: "Fuar / stand LED ekran — Ünye Belediyesi" },
      { src: "/projects/custom-booth.jpg", alt: "Fuar standı LED" },
      { src: "/blog/unye-belediyesi-led-ekran.jpg", alt: "Ordu Günleri stand LED ekran" },
    ],
    products: ["kiralik-led-ekran", "ic-mekan-led-ekran", "poster-led-ekran"],
  }),
  usagePage({
    slug: "belediye-led-ekran",
    name: "Belediye LED ekran",
    lead: "Belediye meydan, bilgilendirme ve etkinlik LED ekranları.",
    intro: [
      "Manisa Büyükşehir Belediyesi ve Beylikdüzü Belediyesi kayıtları kamu/belediye ölçeğinde uygulamalardır. İzin süreçleri konuma göre değişir.",
    ],
    proof: (r) => /Belediye/i.test(r.company),
    images: [
      { src: "/projects/modules/outdoor-public-screen.jpg", alt: "Belediye açık alan LED" },
      { src: "/projects/unye.jpg", alt: "Belediye etkinlik LED ekran" },
    ],
    products: ["dis-mekan-led-ekran", "ic-mekan-led-ekran"],
  }),
  usagePage({
    slug: "fabrika-led-ekran",
    name: "Fabrika LED ekran",
    lead: "Üretim sahası, kantin ve fabrika girişi LED ekranları.",
    intro: ["Fabrika ortamında toz, mesafe ve montaj yüksekliği seçimi etkiler. Keşifte ortam koşulları not edilir; abartılı IP/kW iddiası yapılmaz, değerler teklifte yazılır."],
    proof: (r) => /P2\.5|P3|P4|montaj/i.test(r.detail),
    images: [
      { src: "/projects/factory-assembly.jpg", alt: "Fabrika / endüstriyel LED bağlamı" },
      { src: "/projects/panels-warehouse.jpg", alt: "Panel depo ve fabrika hazırlık" },
    ],
    products: ["dis-mekan-led-ekran", "ic-mekan-led-ekran"],
  }),
  usagePage({
    slug: "spor-salonu-led-ekran",
    name: "Spor salonu LED ekran",
    lead: "Spor salonu ve kapalı arena skor/perimetre LED çözümleri.",
    intro: ["Kapalı spor salonlarında izleme mesafesi ve darbe riski pitch/yüzey seçimini etkiler. GOB koruma iç mekanlarda değerlendirilebilir."],
    proof: (r) => /P2\.5|P3|P4|Premium/i.test(r.detail),
    images: [
      { src: "/projects/lounge-football.jpg", alt: "Spor yayını LED ekran" },
      { src: "/projects/modules/outdoor-public-screen.jpg", alt: "Geniş alan LED ekran" },
    ],
    products: ["ic-mekan-led-ekran", "dis-mekan-led-ekran", "gob-led-ekran"],
  }),
  usagePage({
    slug: "stadyum-led-ekran",
    name: "Stadyum LED ekran",
    lead: "Stadyum ve büyük açık alan LED ekranları.",
    intro: [
      "Stadyum ölçeği yüksek konstrüksiyon ve uzak izleme mesafesi ister. Bursa’daki 576×480 cm P5 Premium dış mekân kaydı büyük yüzey örneğidir; her stadyum için ayrı keşif gerekir.",
    ],
    proof: (r) => /P5|576|1344|dış mekân|dış mekan/i.test(r.detail),
    images: [
      { src: "/projects/billboard-arled.jpg", alt: "Büyük yüzey / stadyum ölçeği LED" },
      { src: "/projects/modules/outdoor-public-screen.jpg", alt: "Açık alan büyük LED ekran" },
    ],
    products: ["dis-mekan-led-ekran"],
  }),
];

export const COMMERCIAL_PAGES: CommercialPage[] = [
  ...INTENT_PAGES,
  ...PRODUCT_ALIAS_PAGES,
  ...PITCH_PAGES,
  ...USE_PAGES,
];

export const COMMERCIAL_SLUGS = COMMERCIAL_PAGES.map((p) => p.slug);

export function getCommercialPage(slug: string): CommercialPage | undefined {
  return COMMERCIAL_PAGES.find((p) => p.slug === slug);
}

export function commercialPath(slug: string): string {
  return `/tr/${slug}/`;
}

export function commercialPagesByCluster(cluster: CommercialCluster): CommercialPage[] {
  return COMMERCIAL_PAGES.filter((p) => p.cluster === cluster);
}
