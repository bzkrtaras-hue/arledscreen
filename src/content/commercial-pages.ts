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
import { modelPath, LED_MODELS, getModel } from "@/content/models";
import { productGroupPath, getProductGroup } from "@/content/categories";
import { getProductGroupEn } from "@/content/product-groups-en";
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
    { href: "/tr/led-ekran-tamiri/", label: "LED ekran tamiri" },
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
    ["transparan-led-ekran", "Transparan LED"],
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
      "Kayıtlı illerde yayımlanmış proje örnekleri",
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
      "Satın alma yerine kısa süreli ihtiyaçlarda kiralık LED ekran daha verimli olabilir. İç ve dış mekân kiralık LED ekran: günlük 50 USD/m². Kurulum ve nakliye ayrıca tekliflendirilir.",
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
          "Tek seferlik etkinliklerde kiralama; sürekli kullanımda satın alma genelde daha ekonomiktir. Ayrıntılı karşılaştırma için “Kiralık mı, satın alma mı?” rehberine bakın.",
      },
    ],
    primaryCta: { href: "/tr/quote/", label: "Kiralama teklifi" },
    secondaryCta: { href: "/tr/products/kiralik-led-ekran/", label: "Kiralık ürün grubu" },
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
  page({
    slug: "led-ekran-tamiri",
    cluster: "intent",
    title: "LED Ekran Tamiri ve Arıza Tespiti | ARLEDSCREEN",
    description:
      "LED ekran tamiri: ölü piksel, sönen modül, renk farkı, güç kaynağı ve kontrol kartı arızaları. İstanbul Gaziosmanpaşa merkezli servis; keşif sonrası teklif.",
    h1: "LED ekran tamiri",
    eyebrow: "Servis · Tamir",
    lead: "Sönen modül, renk farkı, kararan bölge ya da hiç açılmayan ekran: arızayı yerinde tespit edip modül, güç kaynağı, kart ve kablo düzeyinde onarıyoruz. Fiyatı keşif sonrası teklifle veriyoruz.",
    intro: [
      "LED ekran tamirinde en sık karşılaştığımız arızalar şunlardır: ölü piksel ya da tamamen sönen modül; bölgeler arasında renk ve parlaklık farkı; güç kaynağı (PSU) arızası yüzünden kararan kabin; alıcı (receiving) veya gönderici (sending) karttan kaynaklanan görüntü kayması, donma ve sinyal kaybı; gevşemiş ya da oksitlenmiş flat kablo ve konnektörler; dış mekânda conta yıpranması sonrası içeri su ve nem girmesi.",
      "Ekran tamir süreci beş adımda ilerler. Arızanın fotoğrafını veya kısa videosunu WhatsApp'tan gönderirsiniz ve uzaktan ön teşhis yaparız. Ardından yerinde keşif ve ölçümle arızanın kaynağını tespit ederiz. Onayınızla modül, güç kaynağı, kart ya da kablo değiştirilir veya onarılır. Son adımda ekran test edilir, gerekirse renk ve parlaklık ayarı yapılır.",
      "NovaStar, Colorlight ve Huidu kontrol sistemli ekranlarda kart ve yazılım kontrolü yapıyoruz. Başka firmadan alınmış ekranlarda marka, model ve kontrol kartı bilgisiyle servis ve yedek parça uygunluğunu değerlendiriyoruz. Merkezimiz İstanbul Gaziosmanpaşa'dadır; Türkiye genelinde servis veriyoruz.",
      NAP,
    ],
    bullets: [
      "Ölü piksel ve modül değişimi",
      "Güç kaynağı (PSU) değişimi",
      "Alıcı / gönderici kart ve yazılım kontrolü",
      "Kablo, konnektör ve nem kaynaklı arıza onarımı",
      "Renk ve parlaklık ayarı",
    ],
    images: [
      { src: "/projects/install-wiring.jpg", alt: "LED ekran arkasında alıcı kart, güç kaynağı ve kablo bağlantıları" },
      { src: "/projects/modules/front-service-module.jpg", alt: "Önden servis edilen LED modül" },
    ],
    proofs: proofsFrom(() => true, 4),
    relatedProducts: productClusterLinks(),
    relatedUses: usageLinks(),
    relatedCities: CORE_CITIES,
    relatedIntents: intentLinks("led-ekran-tamiri"),
    faqs: [
      {
        question: "LED ekran tamiri ne kadar tutar?",
        answer:
          "Tamir için sabit fiyat yayımlamıyoruz. Arızanın kaynağı, değişecek parça ve ekrana erişim koşulları her işte farklı olduğu için fiyatı keşif sonrası yazılı teklifle veriyoruz.",
      },
      {
        question: "Ekranın bir bölümü karardı; sebebi ne olabilir?",
        answer:
          "Kabin ya da bölge bazında kararma çoğunlukla güç kaynağı, alıcı kart veya bağlantı kablosundan kaynaklanır. Tek modül sönmüşse modül veya flat kablo arızası olasıdır. Kesin teşhisi yerinde ölçümle koyarız.",
      },
      {
        question: "Ekranda renk ve parlaklık farkı neden olur?",
        answer:
          "Farklı üretim partisinden modül takılması, LED'lerin zamanla eşit olmayan şekilde yıpranması veya kart ayarlarının bozulması renk ve parlaklık farkı yaratır. Doğru modül değişimi ve ayar ile giderilir.",
      },
      {
        question: "Başka firmadan alınmış ekranı tamir ediyor musunuz?",
        answer:
          "Ekranın markası, modeli ve kontrol sistemi bilgisini paylaşırsanız servis ve yedek parça uygunluğunu değerlendirip size iletiriz. NovaStar, Colorlight ve Huidu kontrol sistemlerinde kontrol yapıyoruz.",
      },
      {
        question: "Arızayı nasıl bildiririm?",
        answer:
          "Arızanın fotoğrafını veya kısa videosunu +90 530 507 88 34 WhatsApp hattına gönderin; uzaktan ön teşhis yapıp keşfi planlayalım.",
      },
    ],
    primaryCta: { href: "/tr/quote/", label: "Tamir talebi" },
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
    products: ["dis-mekan-led-ekran", "transparan-led-ekran"],
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
      { src: "/opt/blog/alanya-otel-led-ekran.jpg", alt: "Alanya otel LED ekran uygulaması" },
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
      { src: "/opt/blog/kafe-restoran-led-ekran.jpg", alt: "Restoran LED ekran yayını" },
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
      { src: "/opt/blog/unye-belediyesi-led-ekran.jpg", alt: "Ordu Günleri stand LED ekran" },
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

/**
 * Intent hubs with real EN copy (AI agents invent these TR path shapes under /en/).
 * `led-ekran` is served by the dedicated `[locale]/led-ekran/` route — not listed here.
 * Offer JSON-LD (≥12 SKUs) stays on intent hubs only — not use/pitch.
 */
export const COMMERCIAL_EN_INTENT_SLUGS = [
  "led-ekran-satisi",
  "led-ekran-ureticisi",
  "led-ekran-montaj",
  "led-ekran-kiralama",
  "led-ekran-servis",
  "led-ekran-tamiri",
] as const;

/** Use-case hubs AI agents invent under /en/<tr-slug>/ (full TR use cluster). */
export const COMMERCIAL_EN_USE_SLUGS = [
  "magaza-led-ekran",
  "avm-led-ekran",
  "cephe-led-ekran",
  "billboard-led-ekran",
  "vitrin-led-ekran",
  "otel-led-ekran",
  "restoran-led-ekran",
  "dugun-salonu-led-ekran",
  "konferans-salonu-led-ekran",
  "sahne-led-ekran",
  "fuar-led-ekran",
  "belediye-led-ekran",
  "fabrika-led-ekran",
  "spor-salonu-led-ekran",
  "stadyum-led-ekran",
] as const;

/** Pitch hubs under /en/ (full TR pitch cluster). */
export const COMMERCIAL_EN_PITCH_SLUGS = [
  "p1-25-led-ekran",
  "p1-86-led-ekran",
  "p2-5-led-ekran",
  "p2-9-led-ekran",
  "p3-07-led-ekran",
  "p4-led-ekran",
  "p5-led-ekran",
] as const;

/** Product-alias hubs inventable under /en/ (TR commercial product cluster). */
export const COMMERCIAL_EN_PRODUCT_SLUGS = ["totem-led-ekran"] as const;

export const COMMERCIAL_EN_SLUGS = [
  ...COMMERCIAL_EN_INTENT_SLUGS,
  ...COMMERCIAL_EN_USE_SLUGS,
  ...COMMERCIAL_EN_PITCH_SLUGS,
  ...COMMERCIAL_EN_PRODUCT_SLUGS,
] as const;

export type CommercialEnIntentSlug = (typeof COMMERCIAL_EN_INTENT_SLUGS)[number];
export type CommercialEnUseSlug = (typeof COMMERCIAL_EN_USE_SLUGS)[number];
export type CommercialEnPitchSlug = (typeof COMMERCIAL_EN_PITCH_SLUGS)[number];
export type CommercialEnProductSlug = (typeof COMMERCIAL_EN_PRODUCT_SLUGS)[number];
export type CommercialEnSlug = (typeof COMMERCIAL_EN_SLUGS)[number];

export function isCommercialEnSlug(slug: string): slug is CommercialEnSlug {
  return (COMMERCIAL_EN_SLUGS as readonly string[]).includes(slug);
}

/** Alias: any EN commercial slug (intent + use + pitch). */
export function isCommercialEnIntentSlug(slug: string): slug is CommercialEnSlug {
  return isCommercialEnSlug(slug);
}

export function getCommercialPage(slug: string): CommercialPage | undefined {
  return COMMERCIAL_PAGES.find((p) => p.slug === slug);
}

export function commercialPath(slug: string, locale: "tr" | "en" = "tr"): string {
  return `/${locale}/${slug}/`;
}

const NAP_EN =
  "HQ: Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa / Istanbul · +90 530 507 88 34 · arled@arledscreen.com";

const EN_PRODUCT_LINKS: CommercialLink[] = [
  { href: "/en/products/", label: "Product catalog" },
  { href: "/tr/products/ic-mekan-led-ekran/", label: "Indoor LED (TR catalog)" },
  { href: "/tr/products/dis-mekan-led-ekran/", label: "Outdoor LED (TR catalog)" },
  { href: "/tr/products/gob-led-ekran/", label: "GOB LED (TR catalog)" },
];

function enIntentLinks(except: string): CommercialLink[] {
  const all: CommercialLink[] = [
    { href: "/en/led-ekran/", label: "LED displays" },
    { href: "/en/led-ekran-satisi/", label: "LED display sales" },
    { href: "/en/led-ekran-ureticisi/", label: "LED display manufacturer" },
    { href: "/en/led-ekran-montaj/", label: "LED display install" },
    { href: "/en/led-ekran-kiralama/", label: "LED display rental" },
    { href: "/en/led-ekran-fiyatlari/", label: "LED display prices" },
    { href: "/en/led-ekran-servis/", label: "LED display service" },
    { href: "/en/led-ekran-tamiri/", label: "LED display repair" },
    { href: "/en/hizmetler/", label: "Services" },
    { href: "/en/quote/", label: "Request a quote" },
    { href: "/en/hesaplayici/", label: "Price calculator" },
    { href: "/en/nxtionstar/", label: "NXTIONSTAR brand" },
    { href: "/en/sss/", label: "FAQ" },
  ];
  return all.filter((l) => !l.href.includes(`/${except}/`));
}

const EN_USE_LABELS: Record<CommercialEnUseSlug, string> = {
  "magaza-led-ekran": "Store LED",
  "avm-led-ekran": "Mall LED",
  "cephe-led-ekran": "Façade LED",
  "billboard-led-ekran": "Billboard LED",
  "vitrin-led-ekran": "Window display LED",
  "otel-led-ekran": "Hotel LED",
  "restoran-led-ekran": "Restaurant LED",
  "dugun-salonu-led-ekran": "Wedding hall LED",
  "konferans-salonu-led-ekran": "Conference hall LED",
  "sahne-led-ekran": "Stage LED",
  "fuar-led-ekran": "Fair / booth LED",
  "belediye-led-ekran": "Municipal LED",
  "fabrika-led-ekran": "Factory LED",
  "spor-salonu-led-ekran": "Sports hall LED",
  "stadyum-led-ekran": "Stadium LED",
};

const EN_PITCH_LABELS: Record<CommercialEnPitchSlug, string> = {
  "p1-25-led-ekran": "P1.25 LED",
  "p1-86-led-ekran": "P1.86 LED",
  "p2-5-led-ekran": "P2.5 LED",
  "p2-9-led-ekran": "P2.9 LED",
  "p3-07-led-ekran": "P3.07 LED",
  "p4-led-ekran": "P4 LED",
  "p5-led-ekran": "P5 LED",
};

function enUseLinks(except?: string): CommercialLink[] {
  return COMMERCIAL_EN_USE_SLUGS.filter((s) => s !== except).map((s) => ({
    href: `/en/${s}/`,
    label: EN_USE_LABELS[s],
  }));
}

function enPitchLinks(except?: string): CommercialLink[] {
  return COMMERCIAL_EN_PITCH_SLUGS.filter((s) => s !== except).map((s) => ({
    href: `/en/${s}/`,
    label: EN_PITCH_LABELS[s],
  }));
}

/** EN label for a model link (chip + kind); keep proper product codes. */
function enModelLinkLabel(group: string, slug: string, fallback: string): string {
  const m = getModel(group, slug);
  if (!m) return fallback;
  const chip = m.chip.replace(/\s*esnek\s*/i, " ").trim();
  if (m.kind === "esnek") return `${chip} flexible`;
  if (m.kind === "gob") return /\bGOB\b/.test(m.chip) ? m.chip : `${m.chip} GOB`;
  if (m.kind === "ic") return `${m.chip} indoor`;
  if (m.kind === "dis") {
    return m.chip.includes("önden") || m.slug.includes("on-servis")
      ? `${m.chip.replace(" önden servis", "")} outdoor front service`
      : `${m.chip} outdoor`;
  }
  return m.chip;
}

function remapProductLinksToEn(links: CommercialLink[]): CommercialLink[] {
  return links.map((l) => {
    const modelMatch = l.href.match(/^\/(?:tr|en)\/products\/([^/]+)\/([^/]+)\/?$/);
    if (modelMatch) {
      const [, group, slug] = modelMatch;
      const m = getModel(group, slug);
      const label = enModelLinkLabel(group, slug, l.label);
      // EN model paths are noindex redirect bridges → link the EN group hub directly
      // (priced panels are listed there); unpriced models keep the TR PDP.
      if (m?.priceId) {
        return { href: `/en/products/${group}/`, label };
      }
      return { href: `/tr/products/${group}/${slug}/`, label };
    }
    const href = l.href.replace(/^\/tr\/products\//, "/en/products/");
    const slug = href.match(/\/en\/products\/([^/]+)\/?$/)?.[1];
    const enName = slug ? getProductGroupEn(slug)?.name : undefined;
    return { href, label: enName ?? l.label };
  });
}

type EnLeanOverlay = {
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  lead: string;
  intro: string[];
  bullets: string[];
  faqs: { question: string; answer: string }[];
  imageAlts: string[];
};

const EN_USE_OVERLAY: Record<CommercialEnUseSlug, EnLeanOverlay> = {
  "magaza-led-ekran": {
    title: "Store LED Display | Retail Walls | ARLEDSCREEN",
    description:
      "Store LED for windows, sales floors and brand walls. ARLEDSCREEN Istanbul — survey, pitch match and written quote.",
    h1: "Store LED display",
    eyebrow: "Use case · Retail",
    lead: "LED walls for storefronts, sales floors and brand feature walls — pitch matched to shopper distance.",
    intro: [
      "Store LED depends on window distance and product lighting. Published indoor/GOB panel USD is on our price list; final amount after survey.",
      "Retail-adjacent published records (e.g. Merter / Osmanbey) inform planning — every store still needs its own survey.",
      NAP_EN,
    ],
    bullets: ["Survey and measure", "Pitch for closest shopper", "Install + service"],
    imageAlts: ["Indoor LED wall in a retail store", "Store LED display sample"],
    faqs: [
      {
        question: "How much does a store LED cost?",
        answer:
          "No fixed m² price. Panel USD is published at /en/led-ekran-fiyatlari/; size, pitch and install set the written quote after survey. No free shipping.",
      },
    ],
  },
  "avm-led-ekran": {
    title: "Mall / AVM LED Display | Atrium & Façade | ARLEDSCREEN",
    description:
      "Mall LED for atrium, corridor and façade. ARLEDSCREEN Istanbul — survey, structure plan and written quote.",
    h1: "Mall (AVM) LED display",
    eyebrow: "Use case · Mall",
    lead: "Atrium, corridor and façade LED for shopping centres — indoor and outdoor pitches differ.",
    intro: [
      "Mall projects need wider viewing distances; indoor atrium and outdoor façade usually take different pitches.",
      "Circulation and mounting height are measured on survey. Panel USD published; structure and install are quote lines.",
      NAP_EN,
    ],
    bullets: ["Atrium vs façade pitch", "Height and load survey", "Install + calibration"],
    imageAlts: ["Mall façade LED display", "Indoor mall wayfinding LED"],
    faqs: [
      {
        question: "Indoor atrium or outdoor façade — same pitch?",
        answer:
          "Usually not. Closer atrium viewing wants finer pitch; façades often use coarser outdoor pitch. Confirm after survey via /en/quote/.",
      },
    ],
  },
  "cephe-led-ekran": {
    title: "Façade LED Display | Outdoor Building Screens | ARLEDSCREEN",
    description:
      "Building façade and plaza outdoor LED. ARLEDSCREEN Istanbul — structure, wind load and municipal permits in the survey plan.",
    h1: "Façade LED display",
    eyebrow: "Use case · Façade",
    lead: "Outdoor LED for building façades and plazas — structure and permits planned with the survey.",
    intro: [
      "Façade LED needs structure, wind load and local permit steps as part of the plan. Large outdoor published records (e.g. Manisa, Bursa) are scale examples — not templates.",
      "Outdoor panel USD is on our price list; structure/VAT/shipping are quote lines. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Outdoor structure survey", "Pitch for street distance", "Install + service"],
    imageAlts: ["Building façade LED display", "Outdoor façade LED wall"],
    faqs: [
      {
        question: "Do façade screens need permits?",
        answer:
          "Outdoor advertising/façade rules vary by municipality. We recommend checking the local authority before install; scope is written in the quote.",
      },
    ],
  },
  "billboard-led-ekran": {
    title: "Billboard LED Display | Roadside Outdoor | ARLEDSCREEN",
    description:
      "Roadside and open-area billboard LED. ARLEDSCREEN Istanbul — P4–P5 band often reviewed; quote after survey.",
    h1: "Billboard LED display",
    eyebrow: "Use case · Billboard",
    lead: "Outdoor billboard LED for roadside and open areas — coarser pitch for long viewing distance.",
    intro: [
      "Billboards often evaluate the P4–P5 outdoor band because viewers are farther away. Permits and structure clear on survey.",
      "Published outdoor panel USD helps material planning; final project price is written after survey.",
      NAP_EN,
    ],
    bullets: ["Long-distance pitch", "Structure + power survey", "Written outdoor quote"],
    imageAlts: ["Billboard LED display", "Open-area outdoor LED screen"],
    faqs: [
      {
        question: "Is billboard LED priced per m² online?",
        answer:
          "Panel USD is published; there is no fixed installed billboard m² rate. Use /en/led-ekran-fiyatlari/ then /en/quote/ after site details.",
      },
    ],
  },
  "otel-led-ekran": {
    title: "Hotel LED Display | Lobby & Façade | ARLEDSCREEN",
    description:
      "Hotel lobby, ballroom and outdoor LED. ARLEDSCREEN Istanbul — published Alanya resort record as context; quote after survey.",
    h1: "Hotel LED display",
    eyebrow: "Use case · Hotel",
    lead: "Lobby, ballroom and outdoor LED for hotels — fine pitch indoors; coarser outdoors.",
    intro: [
      "The published Alanya White City Resort Hotel record is a hotel-scale example. Lobby often wants fine pitch; outdoor areas coarser.",
      "Indoor/GOB panel USD published; install and structure after survey. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Lobby vs outdoor pitch", "Survey before order", "Install + handover"],
    imageAlts: ["Hotel LED display installation in Alanya", "Lobby / lounge LED display"],
    faqs: [
      {
        question: "Can you reuse the Alanya hotel design elsewhere?",
        answer:
          "No — that record is a published case, not a copy-paste design. Every hotel needs its own measure and written quote.",
      },
    ],
  },
  "sahne-led-ekran": {
    title: "Stage LED Display | Concert & Events | ARLEDSCREEN",
    description:
      "Stage LED for concerts, theatre and events. Rental or purchase — ARLEDSCREEN Istanbul quote by size and duration.",
    h1: "Stage LED display",
    eyebrow: "Use case · Stage",
    lead: "Stage and event LED — purchase walls or rental cabinets with install/strike support.",
    intro: [
      "The published Kadıköy Matiz Sahne record is a stage/outdoor example. Short runs often favour rental cabinets.",
      "Purchase panel USD is published. Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately.",
      NAP_EN,
    ],
    bullets: ["Rent or buy decision", "Size and days quote", "Install + strike plan"],
    imageAlts: ["Stage rental LED cabinet", "Event stage / booth LED"],
    faqs: [
      {
        question: "Is stage rental on the price list?",
        answer:
          "No. Our price list is purchase panel USD only. Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately. Compare purchase via /en/led-ekran-fiyatlari/.",
      },
    ],
  },
  "belediye-led-ekran": {
    title: "Municipal LED Display | City & Plaza Screens | ARLEDSCREEN",
    description:
      "Municipal plaza, info and event LED. ARLEDSCREEN Istanbul — published Manisa / Beylikdüzü records as context; quote after survey.",
    h1: "Municipal LED display",
    eyebrow: "Use case · Municipal",
    lead: "Plaza, information and event LED for municipalities — permits and structure planned on survey.",
    intro: [
      "Published Manisa Büyükşehir and Beylikdüzü municipal records are public-scale examples. Permit steps vary by location.",
      "Outdoor panel USD published; structure, freight and VAT are quote lines. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Public-space survey", "Permit-aware planning", "Install + service"],
    imageAlts: ["Municipal outdoor LED screen", "Municipal event LED display"],
    faqs: [
      {
        question: "Do you open a page for every city?",
        answer:
          "No. City pages exist only where we have completed projects. Turkey-wide service is planned from Istanbul HQ.",
      },
    ],
  },
  "vitrin-led-ekran": {
    title: "Window Display LED | Storefront & Column | ARLEDSCREEN",
    description:
      "Storefront window and column LED. ARLEDSCREEN Istanbul — published Aksaray vitrin record as context; quote after survey.",
    h1: "Window display LED",
    eyebrow: "Use case · Window",
    lead: "Storefront and column LED for close shopper viewing — transparent LED is an option for glass windows.",
    intro: [
      "The published Aksaray Beren Kırtasiye 192×176 cm window + column record is a storefront example — not a template.",
      "Indoor/GOB panel USD published; transparent LED for glass is quote-scoped after survey. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Close-view pitch", "Window vs column survey", "Transparent LED option"],
    imageAlts: ["Storefront window LED display", "Close-up storefront LED"],
    faqs: [
      {
        question: "Transparent LED or standard indoor for a window?",
        answer:
          "Glass that must stay see-through often favours transparent LED; solid brand walls use indoor/GOB. Confirm via /en/quote/ with photos.",
      },
    ],
  },
  "restoran-led-ekran": {
    title: "Restaurant & Café LED Display | ARLEDSCREEN",
    description:
      "Restaurant and café seating-area LED. ARLEDSCREEN Istanbul — published café records as context; quote after survey.",
    h1: "Restaurant LED display",
    eyebrow: "Use case · Restaurant",
    lead: "LED walls for restaurant and café seating — pitch matched to table distance.",
    intro: [
      "Published café records include Beylikdüzü Yaşam Cafe, Prestij Cafe, Ouka Kafe and a Yozgat campus café — planning context only.",
      "Indoor/GOB panel USD published; install after survey. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Seating-distance pitch", "Ambient light survey", "Install + service"],
    imageAlts: ["Restaurant / café LED display", "Restaurant LED broadcast wall", "Lounge match-day LED"],
    faqs: [
      {
        question: "Is there a fixed restaurant LED m² price?",
        answer:
          "No. Panel USD is at /en/led-ekran-fiyatlari/; size, pitch and install set the written quote after survey.",
      },
    ],
  },
  "dugun-salonu-led-ekran": {
    title: "Wedding Hall LED Display | Stage & Walls | ARLEDSCREEN",
    description:
      "Wedding and event-hall stage LED. Purchase or rental — ARLEDSCREEN Istanbul quote by size and duration.",
    h1: "Wedding hall LED display",
    eyebrow: "Use case · Wedding hall",
    lead: "Stage-backdrop and side-wall LED for wedding halls — rental for short runs, purchase for permanent installs.",
    intro: [
      "Stage and side-wall LED is common in wedding venues. Short events may favour rental cabinets.",
      "Purchase panel USD published. Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately.",
      NAP_EN,
    ],
    bullets: ["Rent or buy", "Stage size survey", "Install + strike plan"],
    imageAlts: ["Wedding hall LED display", "Rental stage LED"],
    faqs: [
      {
        question: "Is wedding-hall rental on the price list?",
        answer:
          "Our price list is purchase panel USD. Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately.",
      },
    ],
  },
  "konferans-salonu-led-ekran": {
    title: "Conference Hall LED Display | ARLEDSCREEN",
    description:
      "Conference and meeting-hall LED for readability. Fine-pitch GOB and indoor series — ARLEDSCREEN Istanbul survey + quote.",
    h1: "Conference hall LED display",
    eyebrow: "Use case · Conference",
    lead: "High-readability LED for conference and meeting halls — pitch from closest seated viewer.",
    intro: [
      "Viewing distance and presentation content set pitch. Fine-pitch GOB and indoor series are often reviewed.",
      "Published panel USD for planning; final size after survey. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Seated viewing distance", "Fine-pitch options", "Survey before order"],
    imageAlts: ["Conference / corporate LED display", "Hall LED wall"],
    faqs: [
      {
        question: "P1.25 or P2.5 for a conference hall?",
        answer:
          "Closest critical seats decide. Control-room closeness may need P1.25; larger halls can step up. Share photos via /en/quote/.",
      },
    ],
  },
  "fuar-led-ekran": {
    title: "Fair & Booth LED Display | ARLEDSCREEN",
    description:
      "Fair booth and temporary-area LED. Rent or buy — ARLEDSCREEN Istanbul; published Ünye stand record as context.",
    h1: "Fair / booth LED display",
    eyebrow: "Use case · Fair",
    lead: "Booth and temporary LED for fairs — rental or purchase by event duration.",
    intro: [
      "The published Ünye Belediyesi Ordu Günleri stand (Atatürk Airport Millet Bahçesi) is a booth example — not a template.",
      "Purchase panel USD published. Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Duration drives rent vs buy", "Booth size survey", "Install + strike"],
    imageAlts: ["Fair / booth LED — Ünye Belediyesi", "Fair booth LED", "Ordu Günleri stand LED"],
    faqs: [
      {
        question: "Rent or buy for a three-day fair?",
        answer:
          "Short fairs usually favour rental. Compare purchase panel USD at /en/led-ekran-fiyatlari/. Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately.",
      },
    ],
  },
  "fabrika-led-ekran": {
    title: "Factory LED Display | Industrial Sites | ARLEDSCREEN",
    description:
      "Factory floor, canteen and entrance LED. ARLEDSCREEN Istanbul — dust, distance and mount height reviewed on survey.",
    h1: "Factory LED display",
    eyebrow: "Use case · Factory",
    lead: "LED for production sites, canteens and factory entrances — environment notes drive panel choice.",
    intro: [
      "Dust, viewing distance and mount height affect selection. Site conditions are noted on survey; exaggerated IP/kW claims are not published — values appear in the written quote.",
      "Indoor/outdoor panel USD published; install after survey. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Environment survey", "Indoor vs outdoor choice", "Install + service"],
    imageAlts: ["Factory / industrial LED context", "Panel warehouse and factory prep"],
    faqs: [
      {
        question: "Do you publish fixed IP ratings for factory screens?",
        answer:
          "No blanket IP/kW claims on the site. Ratings and scope are written in the quote after survey.",
      },
    ],
  },
  "spor-salonu-led-ekran": {
    title: "Sports Hall LED Display | Arena Screens | ARLEDSCREEN",
    description:
      "Indoor sports-hall score/perimeter LED. ARLEDSCREEN Istanbul — viewing distance and impact risk reviewed on survey.",
    h1: "Sports hall LED display",
    eyebrow: "Use case · Sports hall",
    lead: "Score and perimeter LED for indoor sports halls — pitch and surface protection after survey.",
    intro: [
      "Indoor arenas need viewing distance and impact risk considered for pitch/surface. GOB protection can help close indoor use.",
      "Panel USD published; install and structure are quote lines. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Arena viewing distance", "Surface protection options", "Survey + quote"],
    imageAlts: ["Sports broadcast LED display", "Large-area LED screen"],
    faqs: [
      {
        question: "Is sports-hall LED priced per m² online?",
        answer:
          "Panel USD only. Installed arena m² rates are not published — use /en/quote/ after site details.",
      },
    ],
  },
  "stadyum-led-ekran": {
    title: "Stadium LED Display | Large Outdoor | ARLEDSCREEN",
    description:
      "Stadium and large outdoor LED. ARLEDSCREEN Istanbul — published Bursa P5 record as scale context; quote after survey.",
    h1: "Stadium LED display",
    eyebrow: "Use case · Stadium",
    lead: "Stadium-scale outdoor LED — structure and long viewing distance planned on survey.",
    intro: [
      "Stadium jobs need tall structure and long viewing distance. The published Bursa 576×480 cm P5 Premium outdoor record is a large-surface example — every stadium needs its own survey.",
      "Outdoor panel USD published; structure/VAT/shipping are quote lines. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Long-distance pitch", "Structure survey", "Written outdoor quote"],
    imageAlts: ["Large-surface / stadium-scale LED", "Open-area large LED screen"],
    faqs: [
      {
        question: "Can the Bursa P5 design be copied to another stadium?",
        answer:
          "No — that record is published scale context, not a copy-paste design. Every site needs measure and a written quote.",
      },
    ],
  },
};

const EN_PITCH_OVERLAY: Record<CommercialEnPitchSlug, EnLeanOverlay> = {
  "p1-25-led-ekran": {
    title: "P1.25 LED Display | Fine-Pitch GOB | ARLEDSCREEN",
    description:
      "P1.25 fine-pitch GOB LED for close viewing. Published panel USD on our price list (e.g. 95.88 USD). ARLEDSCREEN — Istanbul.",
    h1: "P1.25 LED display",
    eyebrow: "Pixel pitch · Fine",
    lead: "Very close viewing — fine-pitch GOB panels for control rooms, luxury retail and lobbies.",
    intro: [
      "P1.25 suits control rooms, luxury stores and close lobbies. See the GOB model page for the technical summary.",
      "Example: P1.25 GOB 95.88 USD per panel, prices valid until 31 Dec 2026. Full list: /en/led-ekran-fiyatlari/. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Close-view fine pitch", "Published GOB panel USD", "Survey before final size"],
    imageAlts: ["Fine-pitch LED panel", "Fine-pitch surface technologies"],
    faqs: [
      {
        question: "What is the P1.25 GOB panel USD?",
        answer:
          "95.88 USD per panel on our price list (excl. VAT/shipping; no free shipping). Price page: /en/led-ekran-fiyatlari/.",
      },
    ],
  },
  "p2-5-led-ekran": {
    title: "P2.5 LED Display | Indoor & Outdoor | ARLEDSCREEN",
    description:
      "P2.5 LED for indoor and outdoor mid-distance projects. Published panel USD on our price list. ARLEDSCREEN — Istanbul.",
    h1: "P2.5 LED display",
    eyebrow: "Pixel pitch · Mid",
    lead: "One of the most used pitch bands for indoor and outdoor mid-distance projects.",
    intro: [
      "P2.5 balances resolution for stores, cafés, near-stage and mid-distance outdoor use. It appears often in published project records.",
      "Indoor and outdoor P2.5 panel USD is published; install and structure are quote lines.",
      NAP_EN,
    ],
    bullets: ["Indoor and outdoor options", "Published panel USD", "Pitch vs viewing distance"],
    imageAlts: ["P2.5 indoor LED", "P2.5 outdoor cabinet"],
    faqs: [
      {
        question: "Is P2.5 right for a store?",
        answer:
          "If shoppers stand near ~2.5 m, start around P2.5. Closer critical viewers may need finer pitch. Confirm with photos via /en/quote/.",
      },
    ],
  },
  "p4-led-ekran": {
    title: "P4 LED Display | Façade & Outdoor | ARLEDSCREEN",
    description:
      "P4 LED for façades and open areas. Published outdoor panel USD; large Manisa outdoor record as scale context. ARLEDSCREEN — Istanbul.",
    h1: "P4 LED display",
    eyebrow: "Pixel pitch · Outdoor",
    lead: "A common band for façades and open areas — front-service variants available.",
    intro: [
      "P4 is used on large outdoor jobs such as the published Manisa Büyükşehir 1344×128 cm Ultra 2026 record — a scale example, not a template.",
      "Indoor/outdoor/front-service model pages hold the technical summary. Panel USD published; structure after survey.",
      NAP_EN,
    ],
    bullets: ["Façade-scale outdoor", "Front-service option", "Survey for structure"],
    imageAlts: ["P4 façade LED", "P4 front-service module"],
    faqs: [
      {
        question: "P4 or P5 for a façade?",
        answer:
          "Depends on closest viewer and content. Larger surfaces farther away may step to P5. Share site photos via /en/quote/ — do not invent an installed m² rate.",
      },
    ],
  },
  "p1-86-led-ekran": {
    title: "P1.86 LED Display | Fine Pitch | ARLEDSCREEN",
    description:
      "P1.86 fine-pitch LED — GOB and flexible options. Published panel USD on our price list. ARLEDSCREEN — Istanbul.",
    h1: "P1.86 LED display",
    eyebrow: "Pixel pitch · Fine",
    lead: "Fine pitch with a budget balance — GOB and flexible variants on model pages.",
    intro: [
      "P1.86 is a common fine-pitch band for corporate lobbies and stores. GOB and flexible variants have model pages.",
      "Panel USD published at /en/led-ekran-fiyatlari/; install after survey. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Lobby / store fine pitch", "GOB and flexible options", "Published panel USD"],
    imageAlts: ["P1.86 fine-pitch LED", "Indoor fine-pitch wall"],
    faqs: [
      {
        question: "P1.86 or P1.25?",
        answer:
          "Closer critical viewers push toward P1.25; slightly farther lobbies often use P1.86. Confirm with photos via /en/quote/.",
      },
    ],
  },
  "p2-9-led-ekran": {
    title: "P2.9 LED Display | Outdoor Mid-Distance | ARLEDSCREEN",
    description:
      "P2.9 / P2.97 outdoor mid-distance LED. Published outdoor panel USD. ARLEDSCREEN — Istanbul.",
    h1: "P2.9 LED display",
    eyebrow: "Pixel pitch · Outdoor mid",
    lead: "Outdoor mid-distance band — P2.9 / P2.97 for façades and plazas at moderate range.",
    intro: [
      "P2.9 suits outdoor mid viewing distance. Model page holds the technical summary.",
      "Outdoor panel USD published; structure after survey. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Outdoor mid distance", "Published panel USD", "Structure survey"],
    imageAlts: ["Outdoor public LED screen", "Outdoor LED display"],
    faqs: [
      {
        question: "P2.5 or P2.9 outdoors?",
        answer:
          "Closer street viewers may stay near P2.5; farther façades often step up. Share site photos via /en/quote/.",
      },
    ],
  },
  "p3-07-led-ekran": {
    title: "P3.07 LED Display | Indoor & Outdoor Mid | ARLEDSCREEN",
    description:
      "P3.07 mid-pitch for indoor and outdoor. Published panel USD. ARLEDSCREEN — Istanbul.",
    h1: "P3.07 LED display",
    eyebrow: "Pixel pitch · Mid",
    lead: "Mid-pitch option for indoor and outdoor mid-distance use.",
    intro: [
      "P3.07 appears in indoor and outdoor catalogs. Choose the series by environment after survey.",
      "Panel USD published; install and structure are quote lines. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Indoor and outdoor series", "Mid viewing distance", "Survey before order"],
    imageAlts: ["P3-class indoor surface", "P3-class outdoor cabinet"],
    faqs: [
      {
        question: "Where is P3.07 panel USD?",
        answer:
          "Published panel prices are on our price list at /en/led-ekran-fiyatlari/. VAT/freight excluded; no free shipping.",
      },
    ],
  },
  "p5-led-ekran": {
    title: "P5 LED Display | Long-Distance Outdoor | ARLEDSCREEN",
    description:
      "P5 outdoor LED for long distance and stadium/façade scale. Published Bursa large-surface record as context. ARLEDSCREEN — Istanbul.",
    h1: "P5 LED display",
    eyebrow: "Pixel pitch · Long outdoor",
    lead: "Long-distance outdoor and stadium/façade scale — coarser pitch for far viewers.",
    intro: [
      "P5 is used on large outdoor surfaces such as the published Bursa 576×480 cm Premium record — scale context, not a template.",
      "Outdoor panel USD published; structure after survey. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Long viewing distance", "Large outdoor surfaces", "Structure survey"],
    imageAlts: ["P5 billboard / large-surface LED", "Large outdoor LED screen"],
    faqs: [
      {
        question: "P4 or P5?",
        answer:
          "Farther critical viewers and very large surfaces often step to P5. Confirm on survey — do not invent an installed m² rate.",
      },
    ],
  },
};

const EN_PRODUCT_OVERLAY: Record<CommercialEnProductSlug, EnLeanOverlay> = {
  "totem-led-ekran": {
    title: "Totem LED Display | Digital Signage | ARLEDSCREEN",
    description:
      "Freestanding totem LED for wayfinding and advertising. ARLEDSCREEN Istanbul — survey, pitch and written quote.",
    h1: "Totem LED display",
    eyebrow: "Product · Totem",
    lead: "Freestanding digital information and advertising totems — size and pitch after survey.",
    intro: [
      "Totem LED is planned for foot traffic and viewing height. Poster/totem product group pages hold series options.",
      "Related panel USD may appear on our price list; freestanding structure is a quote line. No free shipping.",
      NAP_EN,
    ],
    bullets: ["Foot-traffic viewing height", "Indoor/outdoor totem options", "Survey + written quote"],
    imageAlts: ["Indoor totem LED display", "Totem LED wayfinding"],
    faqs: [
      {
        question: "Is a totem priced as a fixed item?",
        answer:
          "Poster/totem configurations are often quote-scoped. Published panel USD (when listed) is on our price list; structure and branding are quote lines. See /en/products/poster-led-ekran/.",
      },
    ],
  },
};

function buildEnUsePage(slug: CommercialEnUseSlug): CommercialPage {
  const tr = getCommercialPage(slug)!;
  const en = EN_USE_OVERLAY[slug];
  return {
    ...tr,
    title: en.title,
    description: en.description,
    h1: en.h1,
    eyebrow: en.eyebrow,
    lead: en.lead,
    intro: en.intro,
    bullets: en.bullets,
    images: tr.images.map((img, i) => ({
      src: img.src,
      alt: en.imageAlts[i] ?? img.alt,
    })),
    relatedProducts: remapProductLinksToEn(tr.relatedProducts),
    relatedUses: enUseLinks(slug),
    relatedCities: tr.relatedCities,
    relatedIntents: enIntentLinks(""),
    faqs: en.faqs,
    primaryCta: { href: "/en/quote/", label: "Request a quote" },
    secondaryCta: { href: "/en/hesaplayici/", label: "Price calculator" },
  };
}

function buildEnPitchPage(slug: CommercialEnPitchSlug): CommercialPage {
  const tr = getCommercialPage(slug)!;
  const en = EN_PITCH_OVERLAY[slug];
  return {
    ...tr,
    title: en.title,
    description: en.description,
    h1: en.h1,
    eyebrow: en.eyebrow,
    lead: en.lead,
    intro: en.intro,
    bullets: en.bullets,
    images: tr.images.map((img, i) => ({
      src: img.src,
      alt: en.imageAlts[i] ?? img.alt,
    })),
    relatedProducts: [
      ...remapProductLinksToEn(tr.relatedProducts),
      ...enPitchLinks(slug),
    ],
    relatedUses: enUseLinks(),
    relatedCities: tr.relatedCities,
    relatedIntents: enIntentLinks(""),
    faqs: en.faqs,
    primaryCta: { href: "/en/quote/", label: "Request a quote" },
    secondaryCta: { href: "/en/hesaplayici/", label: "Price calculator" },
  };
}

function buildEnProductPage(slug: CommercialEnProductSlug): CommercialPage {
  const tr = getCommercialPage(slug)!;
  const en = EN_PRODUCT_OVERLAY[slug];
  return {
    ...tr,
    title: en.title,
    description: en.description,
    h1: en.h1,
    eyebrow: en.eyebrow,
    lead: en.lead,
    intro: en.intro,
    bullets: en.bullets,
    images: tr.images.map((img, i) => ({
      src: img.src,
      alt: en.imageAlts[i] ?? img.alt,
    })),
    relatedProducts: [
      { href: "/en/products/poster-led-ekran/", label: "Poster / totem group" },
      ...remapProductLinksToEn(tr.relatedProducts),
    ],
    relatedUses: enUseLinks(),
    relatedCities: tr.relatedCities,
    relatedIntents: enIntentLinks(""),
    faqs: en.faqs,
    primaryCta: { href: "/en/quote/", label: "Request a quote" },
    secondaryCta: { href: "/en/products/", label: "Product catalog" },
  };
}

/** EN copy for the primary intent hub `/en/led-ekran/`. */
export function getLedEkranPageEn(): CommercialPage {
  const tr = getCommercialPage("led-ekran")!;
  return {
    ...tr,
    title: "LED Display | Sales, Install & Service | ARLEDSCREEN",
    description:
      "LED display sales, installation and technical service. ARLEDSCREEN is Gaziosmanpaşa, Istanbul–based; indoor/outdoor, GOB, flexible and rental. Written quote after survey.",
    h1: "LED display sales, installation and service",
    eyebrow: "ARLEDSCREEN · LED Display Technology Center",
    lead:
      "We run indoor, outdoor, GOB, flexible and rental LED projects from survey through after-sales service on one desk.",
    intro: [
      "ARLEDSCREEN is an Istanbul (Gaziosmanpaşa) LED display technology center. With the NXTIONSTAR product line we sell, install and support store, mall, façade, stage, hotel and municipal projects.",
      "There is no fixed m² price; the panel list is published in the price calculator and on our price list. Final amount is confirmed after survey in a written quote from size, pitch and install conditions.",
      NAP_EN,
    ],
    bullets: [
      "Survey → design → supply → install → calibration → service",
      "Project samples from provinces where we have completed work",
      "Indoor/outdoor, GOB, flexible, poster/totem and rental options",
    ],
    images: [
      { src: "/projects/urun-ic-mekan.jpg", alt: "Indoor LED display installation" },
      { src: "/projects/urun-dis-mekan.jpg", alt: "Outdoor LED display installation" },
      { src: "/projects/factory-assembly.jpg", alt: "LED display assembly preparation" },
    ],
    relatedProducts: EN_PRODUCT_LINKS,
    relatedUses: enUseLinks(),
    relatedCities: tr.relatedCities,
    relatedIntents: enIntentLinks("led-ekran"),
    faqs: [
      {
        question: "How is LED display price set?",
        answer:
          "Panel USD is published in the price calculator and https://arledscreen.com/en/led-ekran-fiyatlari/. Final amount depends on size, pitch, indoor/outdoor use, structure and install — confirmed after survey in a written quote. No free shipping.",
      },
      {
        question: "Where do you serve?",
        answer:
          "Headquarters is Gaziosmanpaşa, Istanbul. Service is planned Turkey-wide; separate city pages exist only where published project records exist.",
      },
      {
        question: "Where are published panel prices listed?",
        answer:
          "On our price list at /en/led-ekran-fiyatlari/ (12 NXTIONSTAR panel models, USD per panel, e.g. P1.25 GOB 95.88 USD). VAT and freight excluded; no free shipping.",
      },
    ],
    primaryCta: { href: "/en/quote/", label: "Request a quote" },
    secondaryCta: { href: "/en/hesaplayici/", label: "Price calculator" },
  };
}

const COMMERCIAL_EN_BY_SLUG: Record<CommercialEnIntentSlug, () => CommercialPage> = {
  "led-ekran-satisi": () => {
    const tr = getCommercialPage("led-ekran-satisi")!;
    return {
      ...tr,
      title: "LED Display Sales | ARLEDSCREEN Istanbul",
      description:
        "LED display sales: indoor/outdoor, GOB and flexible panels. ARLEDSCREEN Istanbul — survey, panel selection and written quote.",
      h1: "LED display sales",
      eyebrow: "Sales",
      lead:
        "We match pixel pitch and panel type to your use case; sales run through survey and a written quote.",
      intro: [
        "LED display sales is not a price list alone — it is choosing the right pitch for viewing distance, content and install surface.",
        "NXTIONSTAR indoor, outdoor, GOB and flexible series ship with Huidu, NovaStar or Colorlight control planned in the same quote.",
        NAP_EN,
      ],
      bullets: [
        "Pre-sale survey and needs analysis",
        "Panel + control system planned together",
        "Written quote — no hidden add-ons",
      ],
      images: [
        { src: "/projects/panels-warehouse.jpg", alt: "LED display panel stock ready for sale" },
        { src: "/projects/indoor-smd.jpg", alt: "Indoor SMD LED display sales sample" },
      ],
      relatedProducts: EN_PRODUCT_LINKS,
      relatedUses: enUseLinks(),
      relatedCities: tr.relatedCities,
      relatedIntents: enIntentLinks("led-ekran-satisi"),
      faqs: [
        {
          question: "Do you sell panels only?",
          answer:
            "Yes — panels and control gear can be sold alone. Most projects also include install and commissioning in the same written quote. Panel USD: /en/led-ekran-fiyatlari/.",
        },
        {
          question: "Where are published panel prices listed?",
          answer:
            "On our price list at /en/led-ekran-fiyatlari/ (12 NXTIONSTAR panel models, USD per panel, e.g. P1.25 GOB 95.88 USD). VAT and freight excluded; no free shipping.",
        },
      ],
      primaryCta: { href: "/en/quote/", label: "Request a sales quote" },
      secondaryCta: { href: "/en/products/", label: "Product catalog" },
    };
  },
  "led-ekran-ureticisi": () => {
    const tr = getCommercialPage("led-ekran-ureticisi")!;
    return {
      ...tr,
      title: "LED Display Manufacturer | ARLEDSCREEN NXTIONSTAR",
      description:
        "LED display manufacturer and supplier: NXTIONSTAR panels, Istanbul-based install and service. ARLEDSCREEN runs project supply end to end.",
      h1: "LED display manufacturer and technology center",
      eyebrow: "Supply · Technology center",
      lead:
        "From our Istanbul technology center we project, supply and install NXTIONSTAR LED display systems on site.",
      intro: [
        "ARLEDSCREEN is the Istanbul technology center that brings NXTIONSTAR LED systems to Turkey with sales, install and service.",
        "Supply, quality checks and field install run under one operation; panel and control config follow project size.",
        NAP_EN,
      ],
      bullets: [
        "NXTIONSTAR product line",
        "Project-based panel and control configuration",
        "Factory/assembly photos and published field records",
      ],
      images: [
        { src: "/projects/factory-assembly.jpg", alt: "LED display assembly preparation" },
        { src: "/projects/frame-workshop.jpg", alt: "LED display structure workshop" },
        { src: "/projects/service-assembly.jpg", alt: "LED display service and assembly station" },
      ],
      relatedProducts: EN_PRODUCT_LINKS,
      relatedUses: enUseLinks(),
      relatedCities: tr.relatedCities,
      relatedIntents: enIntentLinks("led-ekran-ureticisi"),
      faqs: [
        {
          question: "Are you a manufacturer or a reseller?",
          answer:
            "ARLEDSCREEN projects, supplies and installs NXTIONSTAR LED systems from Istanbul. Brand and role are written clearly in the quote. Brand page: /en/nxtionstar/.",
        },
        {
          question: "Is NXTIONSTAR the same as NationStar?",
          answer:
            "No. NXTIONSTAR (N-X-T-I-O-N-S-T-A-R) is ARLEDSCREEN’s LED display product brand. NationStar is an LED chip/component brand. Do not confuse them.",
        },
      ],
      primaryCta: { href: "/en/quote/", label: "Request a project quote" },
      secondaryCta: { href: "/en/nxtionstar/", label: "NXTIONSTAR" },
    };
  },
  "led-ekran-montaj": () => {
    const tr = getCommercialPage("led-ekran-montaj")!;
    return {
      ...tr,
      title: "LED Display Installation | ARLEDSCREEN",
      description:
        "LED display installation: survey, structure, cabinets, cabling and calibration. ARLEDSCREEN field team — Gaziosmanpaşa, Istanbul.",
      h1: "LED display installation",
      eyebrow: "Install",
      lead:
        "We manage install on site — from supporting structure and cabinets through power/signal cabling to calibration.",
      intro: [
        "LED install is planned with surface, wind/load (outdoor), electrical and signal runs together.",
        "Flow: survey → engineering → install → commissioning → operator handover. Final scope is written in the quote.",
        NAP_EN,
      ],
      bullets: [
        "Indoor and outdoor install",
        "Cabinets, power and data lines",
        "Calibration and handover record",
      ],
      images: [
        { src: "/projects/install-scaffold.jpg", alt: "LED display install scaffolding on site" },
        { src: "/projects/install-wiring.jpg", alt: "LED display power and signal cabling" },
        { src: "/projects/modules/indoor-install.jpg", alt: "Indoor LED display installation" },
      ],
      relatedProducts: EN_PRODUCT_LINKS,
      relatedUses: enUseLinks(),
      relatedCities: tr.relatedCities,
      relatedIntents: enIntentLinks("led-ekran-montaj"),
      faqs: [
        {
          question: "How long does install take?",
          answer:
            "It depends on size, floor height and structure type. The day plan is written in the quote after survey.",
        },
        {
          question: "Do you install only what you sell?",
          answer:
            "Most jobs are NXTIONSTAR systems we supply. Third-party screens need model and controller details before we confirm install scope.",
        },
      ],
      primaryCta: { href: "/en/quote/", label: "Request an install survey" },
      secondaryCta: { href: "/en/led-ekran/", label: "LED displays" },
    };
  },
  "led-ekran-kiralama": () => {
    const tr = getCommercialPage("led-ekran-kiralama")!;
    return {
      ...tr,
      title: "LED Display Rental | Stage & Events | ARLEDSCREEN",
      description:
        "LED display rental for stage, fair and events. ARLEDSCREEN rental cabinets: USD 50 per m² per day; installation and shipping quoted separately.",
      h1: "LED display rental",
      eyebrow: "Rental",
      lead: "We plan rental LED installs for short-run events, stages and fairs.",
      intro: [
        "For short needs, rental can beat purchase. Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately.",
        "Compare with purchase using our price list and calculator when ownership makes more sense.",
        NAP_EN,
      ],
      bullets: [
        "Stage and event installs",
        "Quote by duration",
        "Install + strike plan",
      ],
      images: [
        { src: "/projects/modules/rental-kit.jpg", alt: "Rental LED display cabinet kit" },
        { src: "/projects/modules/rental-cabinet-labeled.jpg", alt: "Rental LED cabinet detail" },
        { src: "/projects/custom-booth.jpg", alt: "Fair booth LED display application" },
      ],
      relatedProducts: [
        { href: "/en/products/", label: "Product catalog" },
        { href: "/tr/products/kiralik-led-ekran/", label: "Rental product group (TR)" },
      ],
      relatedUses: enUseLinks(),
      relatedCities: tr.relatedCities,
      relatedIntents: enIntentLinks("led-ekran-kiralama"),
      faqs: [
        {
          question: "Rent or buy?",
          answer:
            "One-off events usually favor rental; continuous use usually favors purchase. Panel purchase USD is published at /en/led-ekran-fiyatlari/. Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately.",
        },
        {
          question: "Is there a published fixed rental price?",
          answer:
            "Yes. Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately.",
        },
      ],
      primaryCta: { href: "/en/quote/", label: "Request a rental quote" },
      secondaryCta: { href: "/en/led-ekran-fiyatlari/", label: "Panel prices (purchase)" },
    };
  },
  "led-ekran-servis": () => {
    const tr = getCommercialPage("led-ekran-servis")!;
    return {
      ...tr,
      title: "LED Display Service & Maintenance | ARLEDSCREEN",
      description:
        "LED display technical service, maintenance, module and PSU swap. Istanbul-based ARLEDSCREEN service desk.",
      h1: "LED display technical service",
      eyebrow: "Service · Maintenance",
      lead:
        "We offer scheduled maintenance, fault finding, module/PSU swaps and technical support for existing walls.",
      intro: [
        "After-sales support is planned for systems we sell. For other brands we assess service fit from model and controller data.",
        "Scope: on-site inspection, diagnosis, spare parts and calibration.",
        NAP_EN,
      ],
      bullets: [
        "Module and PSU replacement",
        "Control system checks",
        "Scheduled maintenance plan",
      ],
      images: [
        { src: "/projects/service-assembly.jpg", alt: "LED display technical service station" },
        { src: "/projects/modules/front-service-module.jpg", alt: "Front-service LED module" },
      ],
      relatedProducts: EN_PRODUCT_LINKS,
      relatedUses: enUseLinks(),
      relatedCities: tr.relatedCities,
      relatedIntents: enIntentLinks("led-ekran-servis"),
      faqs: [
        {
          question: "Do you service screens bought elsewhere?",
          answer:
            "Share brand, model and controller details — we will confirm spare-part and service options in writing.",
        },
        {
          question: "Is service on the price list?",
          answer:
            "No. Our price list is purchase panel USD only. Service and maintenance are quote-only after diagnosis.",
        },
      ],
      primaryCta: { href: "/en/quote/", label: "Request service" },
      secondaryCta: { href: "/en/led-ekran/", label: "LED displays" },
    };
  },
  "led-ekran-tamiri": () => {
    const tr = getCommercialPage("led-ekran-tamiri")!;
    return {
      ...tr,
      title: "LED Display Repair & Fault Finding | ARLEDSCREEN",
      description:
        "LED display repair: dead pixels, dark modules, colour mismatch, power supply and control card faults. Istanbul-based service; priced on quote after survey.",
      h1: "LED display repair",
      eyebrow: "Service · Repair",
      lead:
        "Dead modules, colour mismatch, dark areas or a screen that won't start: we find the fault on site and repair it at module, power supply, card and cable level. Pricing is given in a quote after survey.",
      intro: [
        "The faults we see most often: dead pixels or a fully dark module; colour and brightness mismatch between areas; a dark cabinet caused by a failed power supply (PSU); image shift, freezing or signal loss from the receiving or sending card; loose or oxidised ribbon cables and connectors; and, outdoors, water and moisture getting in after gaskets wear.",
        "Repair runs in five steps. You send a photo or short video of the fault on WhatsApp and we make a remote pre-diagnosis. We then survey and measure on site to find the cause. With your approval the module, power supply, card or cable is replaced or repaired. Finally the screen is tested and, if needed, colour and brightness are adjusted.",
        "We check cards and software on screens running NovaStar, Colorlight and Huidu control systems. For screens bought elsewhere we assess service and spare-part fit from brand, model and control card data. Our HQ is in Gaziosmanpaşa, Istanbul; we provide service across Turkey.",
        NAP_EN,
      ],
      bullets: [
        "Dead pixel and module replacement",
        "Power supply (PSU) replacement",
        "Receiving / sending card and software checks",
        "Cable, connector and moisture fault repair",
        "Colour and brightness adjustment",
      ],
      images: [
        { src: "/projects/install-wiring.jpg", alt: "Receiving cards, power supplies and cabling behind an LED screen" },
        { src: "/projects/modules/front-service-module.jpg", alt: "Front-service LED module" },
      ],
      relatedProducts: EN_PRODUCT_LINKS,
      relatedUses: enUseLinks(),
      relatedCities: tr.relatedCities,
      relatedIntents: enIntentLinks("led-ekran-tamiri"),
      faqs: [
        {
          question: "How much does LED display repair cost?",
          answer:
            "We do not publish fixed repair prices. The cause, the parts to replace and access to the screen differ on every job, so we price in a written quote after survey.",
        },
        {
          question: "Part of the screen went dark. What could cause it?",
          answer:
            "A dark cabinet or area is usually a power supply, receiving card or connecting cable. If a single module is out, the module or its ribbon cable is the likely cause. We confirm on site by measurement.",
        },
        {
          question: "Why does a screen show colour and brightness differences?",
          answer:
            "Modules from a different production batch, uneven LED ageing or corrupted card settings cause colour and brightness mismatch. It is fixed with the right module replacement and adjustment.",
        },
        {
          question: "Do you repair screens bought elsewhere?",
          answer:
            "Share the brand, model and control system and we will assess service and spare-part fit. We check NovaStar, Colorlight and Huidu control systems.",
        },
        {
          question: "How do I report a fault?",
          answer:
            "Send a photo or short video of the fault to our WhatsApp line +90 530 507 88 34; we will make a remote pre-diagnosis and plan the survey.",
        },
      ],
      primaryCta: { href: "/en/quote/", label: "Request repair" },
      secondaryCta: { href: "/en/hizmetler/", label: "Services" },
    };
  },
};

/** EN commercial page (intent + use/pitch/product whitelist). */
export function getCommercialPageEn(slug: string): CommercialPage | undefined {
  if (slug === "led-ekran") return getLedEkranPageEn();
  if ((COMMERCIAL_EN_INTENT_SLUGS as readonly string[]).includes(slug)) {
    return COMMERCIAL_EN_BY_SLUG[slug as CommercialEnIntentSlug]();
  }
  if ((COMMERCIAL_EN_USE_SLUGS as readonly string[]).includes(slug)) {
    return buildEnUsePage(slug as CommercialEnUseSlug);
  }
  if ((COMMERCIAL_EN_PITCH_SLUGS as readonly string[]).includes(slug)) {
    return buildEnPitchPage(slug as CommercialEnPitchSlug);
  }
  if ((COMMERCIAL_EN_PRODUCT_SLUGS as readonly string[]).includes(slug)) {
    return buildEnProductPage(slug as CommercialEnProductSlug);
  }
  return undefined;
}

export function commercialPagesByCluster(cluster: CommercialCluster): CommercialPage[] {
  return COMMERCIAL_PAGES.filter((p) => p.cluster === cluster);
}
