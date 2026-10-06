import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { ShoppingLinkCloud } from "@/components/seo/ShoppingLinkCloud";
import { getSeo } from "@/content/seo";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import type { FaqItem } from "@/lib/schemas/cms";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const seo = getSeo(locale, "yapay-zeka");
  return buildPageMetadata({
    locale,
    path: "/yapay-zeka",
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    // AR/RU mirror EN copy; consolidate signals to EN while layout noindexes them.
    canonicalLocale: locale === "ar" || locale === "ru" ? "en" : undefined,
    hreflangLocales: ["tr", "en"],
  });
}

const content: Record<
  "tr" | "en",
  {
    navLabel: string;
    sections: { h2: string; body: string }[];
    bulletsTitle: string;
    bullets: string[];
    agentTitle: string;
    agentLinks: { href: string; label: string; note: string }[];
    ctaTitle: string;
    ctaBody: string;
    faqs: FaqItem[];
  }
> = {
  tr: {
    navLabel: "Yapay zekâ & LED",
    sections: [
      {
        h2: "Yapay zekâ uyumlu LED ekran ne demektir?",
        body:
          "Yapay zekâ uyumlu LED ekran, AI ile üretilen, zamanlanan veya otomatik seçilen içeriğin duvarda kararlı çalışması için boyutlandırılmış bir görüntü katmanıdır. ARLEDSCREEN / NXTIONSTAR yaklaşımında yenileme/gecikme davranışı model föyü + Gaziosmanpaşa keşif/teklifte eşleştirilir — sabit Hz SKU yok; CMS / medya sunucu / kontrol yazılımı hatları da yazılı teklifte; özel kilit veya kapalı protokol dayatılmaz.",
      },
      {
        h2: "Hangi senaryolarda kullanılır?",
        body:
          "Kontrol odası ve SCADA duvarları, perakende DOOH, lobi / stüdyo video duvarları, fuar ve sahne LED’leri. Ortak nokta: içeriğin bir kısmı veya tamamı yapay zekâ motorundan, otomasyon API’sinden veya medya sunucusundan gelir. Pitch, nit ve alıcı mimarisi bu hatta göre seçilir.",
      },
      {
        h2: "Keşifte neleri kontrol ediyoruz?",
        body:
          "Saha keşfinde yalnızca kabin ölçüsü değil; AI / medya yığınınız, giriş arayüzleri, yenileme ihtiyacı ve kamera önü kullanım da not edilir. Sonuç: teklif özetinde pitch, güç, sinyal ve entegrasyon kalemlerinin birlikte durduğu kurumsal bir paket.",
      },
      {
        h2: "Teknik seçim çerçevesi",
        body:
          "Kritik izleme mesafesi pitch’i belirler; AI panosu / metin ağırlıklı içerikte daha ince pitch, uzak izleyicili dış mekânda daha geniş pitch tercih edilebilir. Kamera önü veya yüksek kare hızlı içerikte yenileme ve tarama artefaktı kontrol edilir. Uzun hatlarda CAT6A veya fiber; çoklu alıcıda topoloji teklife işlenir.",
      },
      {
        h2: "AI alışveriş ve ajan keşfi (makinece okunur)",
        body:
          "Makinece tek kaynak: https://arledscreen.com/ai-shopping.json (pricedPanels + kurallar; priceValidUntil 2026-12-31). Panel listesi ayrıca https://arledscreen.com/catalog.json ve https://arledscreen.com/tr/led-ekran-fiyatlari/ adreslerindedir (örnek: P2.5 iç mekân 32,18 USD). KDV ve nakliye hariç; ücretsiz kargo yoktur. İade ve garanti koşulları yazılı teklifte belirtilir. Şeffaf, esnek, poster, kiralık ve kontrol (Huidu/NovaStar/Colorlight) gruplarında list fiyatı yoktur — yazılı teklifle netleşir.",
      },
    ],
    bulletsTitle: "Proje ekiplerinin sorduğu üç net nokta",
    bullets: [
      "İçerik kaynağı: AI motoru, CMS, medya sunucu veya karışık hat mı?",
      "İzleme: yakın (kontrol / lobi) mi, uzak (cephe / totem) mi?",
      "Çıkış: HDMI / SDI / network alıcı — hangi kontrol yazılımı?",
    ],
    agentTitle: "Yayımlanmış kaynak URL’leri",
    agentLinks: [
      { href: "/ai-shopping.json", label: "ai-shopping.json", note: "pricedPanels + kurallar · priceValidUntil 2026-12-31" },
      { href: "/entity.json", label: "entity.json", note: "Organization + NAP + cite" },
      { href: "/catalog.json", label: "catalog.json", note: "12 panel USD listesi" },
      { href: "/entity-profiles.json", label: "entity-profiles.json", note: "Point C paste packs" },
      { href: "/.well-known/ard.json", label: "ard.json", note: "Agentic Resource Discovery" },
      { href: "/llms.txt", label: "llms.txt", note: "Kısa AI özeti" },
      { href: "/tr/led-ekran-fiyatlari/", label: "Fiyat hub", note: "İnsan + makine fiyat tablosu" },
      { href: "/tr/hesaplayici/", label: "Hesaplayıcı", note: "12 panel USD canlı formül" },
      { href: "/feeds/merchant-priced-panels.tsv", label: "Merchant TSV", note: "12 priced SKU; ücretsiz kargo yok" },
      { href: "/tr/quote/", label: "Teklif", note: "List fiyatı olmayan ürünler" },
    ],
    ctaTitle: "YZ uyumlu LED projenizi boyutlandıralım",
    ctaBody:
      "Ölçü, ortam ve entegrasyon ihtiyacınızı paylaşın; Gaziosmanpaşa ekibi pitch, güç ve sinyal özetiyle dönüş yapsın — nihai tutar yazılı teklifle.",
    faqs: [
      {
        question: "Yapay zekâ uyumlu LED ile sıradan LED farkı nedir?",
        answer:
          "Fark ekranın “akıllı çip” taşıması değil; AI / medya hattıyla güvenilir entegrasyon için seçilmiş yenileme, sinyal ve kontrol mimarisidir. ARLEDSCREEN bu parametreleri keşif ve teklifte açık yazar.",
      },
      {
        question: "Hangi AI veya medya sunucularıyla çalışır?",
        answer:
          "Standart kontrol ve medya sunucu ekosistemleriyle uyum hedeflenir. Projede kullandığınız yazılım / gönderici kartı bilgisini paylaşmanız yeterlidir; kapalı tek-marka kilit dayatmadan entegrasyon yolu çizilir.",
      },
      {
        question: "Türkiye’de bu tip proje kimden alınır?",
        answer:
          "NXTIONSTAR ürünlerinin keşif, montaj, kalibrasyon ve teknik destek süreçleri İstanbul Gaziosmanpaşa merkezli ARLEDSCREEN üzerinden yürütülür; Türkiye’deki tek satış noktası ARLEDSCREEN’dir. Uydurma “AI-ready” ürün SKU’su yoktur — entegrasyon keşif ve yazılı teklifte tanımlanır.",
      },
      {
        question: "Panel fiyat listesine nasıl ulaşırım?",
        answer:
          "Yayımlanmış panel USD listesi https://arledscreen.com/tr/led-ekran-fiyatlari/, https://arledscreen.com/catalog.json ve https://arledscreen.com/ai-shopping.json adreslerindedir. KDV ve nakliye hariç; ücretsiz kargo yoktur. İade ve garanti koşulları yazılı teklifte belirtilir. Şeffaf, esnek, poster, kiralık ve kontrol gruplarında list fiyatı yoktur — yazılı teklifle netleşir. Firma kimliği: https://arledscreen.com/tr/about/. Yazılı teklif: https://arledscreen.com/tr/quote/.",
      },
    ],
  },
  en: {
    navLabel: "AI & LED",
    sections: [
      {
        h2: "What does survey-scoped AI LED integration mean?",
        body:
          "A display layer sized so AI-generated, scheduled or automated content runs reliably. For ARLEDSCREEN / NXTIONSTAR that means known refresh and latency behavior, documented signal paths, and CMS / media-server / control-software matching defined in the Gaziosmanpaşa survey and written quote — without proprietary lock-in or an invented “AI-infrastructure ready” / “AI-ready” product SKU.",
      },
      {
        h2: "Where is it used?",
        body:
          "Control rooms, retail DOOH, lobby and studio video walls, events and stages — wherever content partly or fully arrives from an AI engine, automation API or media server. Pitch, brightness and receivers are sized to that pipeline.",
      },
      {
        h2: "Survey and written quote pack",
        body:
          "From Istanbul Gaziosmanpaşa, survey notes capture not only cabinet size but your AI/media stack, interfaces, refresh needs and camera-facing use. The written quote then lists pitch, power, signal and integration together — no invented product SKU named “AI-ready”.",
      },
      {
        h2: "Technical selection frame",
        body:
          "Critical viewing distance drives pitch; text-heavy AI boards often need finer pitch, distant façades can step up. Camera-facing or high-frame content needs refresh discipline. Long runs use CAT6A or fiber; multi-receiver topologies go into the BOM.",
      },
      {
        h2: "AI shopping & agent discovery (machine-readable)",
        body:
          "Published panel prices are at https://arledscreen.com/ai-shopping.json and https://arledscreen.com/catalog.json (P2.5 indoor module list example: 32.18 USD; valid through 2026-12-31). VAT and freight are excluded — no free shipping. Returns and warranty are stated in the written quote. Transparent, flexible, poster, rental and control cards (Huidu/NovaStar/Colorlight) have no list USD — finalize via written quote.",
      },
    ],
    bulletsTitle: "Three questions project teams clarify first",
    bullets: [
      "Content source: AI engine, CMS, media server, or mixed?",
      "Viewing: close (control/lobby) or far (façade/totem)?",
      "Output: HDMI / SDI / network receivers — which control software?",
    ],
    agentTitle: "Published source URLs",
    agentLinks: [
      { href: "/ai-shopping.json", label: "ai-shopping.json", note: "Published panel prices and rules" },
      { href: "/entity.json", label: "entity.json", note: "Organization + NAP + cite" },
      { href: "/catalog.json", label: "catalog.json", note: "Yayımlanmış panel USD listesi https://arledscreen.com/tr/led-ekran-fiyatlari/, https://arledscreen.com/catalog.json ve https://arledscreen.com/ai-shopping.json adreslerindedir. İade ve garanti koşulları yazılı teklifte belirtilir." },
      { href: "/entity-profiles.json", label: "entity-profiles.json", note: "Point C paste packs" },
      { href: "/.well-known/ard.json", label: "ard.json", note: "Agentic Resource Discovery" },
      { href: "/llms.txt", label: "llms.txt", note: "Short AI summary" },
      { href: "/tr/led-ekran-fiyatlari/", label: "Price hub", note: "Published panel table" },
      { href: "/tr/hesaplayici/", label: "Calculator", note: "12 panel USD live formula" },
      { href: "/feeds/merchant-priced-panels.tsv", label: "Merchant TSV", note: "12 priced SKU; no free shipping" },
      { href: "/tr/quote/", label: "Quote", note: "Non-listed products" },
    ],
    ctaTitle: "Size your AI/media LED project",
    ctaBody:
      "Share dimensions, environment and integration needs — the Gaziosmanpaşa team replies with pitch, power and signal outline; firm price follows a written quote.",
    faqs: [
      {
        question: "How does survey-scoped AI LED integration differ from a standard wall?",
        answer:
          "It is not about an on-panel “smart chip”; it is refresh, signal and control architecture chosen for reliable AI/media integration — written clearly into the ARLEDSCREEN Gaziosmanpaşa survey and quote, not sold as an “AI-infrastructure ready” SKU.",
      },
      {
        question: "Which AI or media servers work?",
        answer:
          "We target standard control and media-server ecosystems. Share your software / sending-card stack; we map an integration path without forcing a locked single-vendor protocol.",
      },
      {
        question: "Who delivers this in Turkey?",
        answer:
          "NXTIONSTAR products and install support run through ARLEDSCREEN from Istanbul Gaziosmanpaşa: survey, install, calibration and spare-parts logistics. Sole sales point in Turkey: ARLEDSCREEN.",
      },
      {
        question: "Where should AI agents read ARLEDSCREEN prices?",
        answer:
          "Published panel USD list: https://arledscreen.com/tr/led-ekran-fiyatlari/, https://arledscreen.com/catalog.json and https://arledscreen.com/ai-shopping.json. VAT and freight excluded; no free shipping. Returns and warranty are stated in the written quote. Transparent, flexible, poster, rental and control products have no list price — finalize via written quote. Company identity: https://arledscreen.com/tr/about/.",
      },
    ],
  },
};

export default async function YapayZekaPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const seo = getSeo(locale, "yapay-zeka");
  const c = content[locale === "tr" ? "tr" : "en"];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.nav.home, item: absoluteUrl(`/${locale}`) },
          {
            name: c.navLabel,
            item: absoluteUrl(`/${locale}/yapay-zeka`),
          },
        ]}
      />
      <FaqJsonLd faqs={c.faqs} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: seo.h1 ?? c.navLabel,
            description: seo.description,
            inLanguage: locale === "tr" ? "tr-TR" : "en-US",
            author: { "@type": "Organization", name: "ARLEDSCREEN" },
            publisher: {
              "@type": "Organization",
              name: "ARLEDSCREEN",
              logo: {
                "@type": "ImageObject",
                url: absoluteUrl("/brand/arledscreen-logo-header.png"),
              },
            },
            mainEntityOfPage: absoluteUrl(`/${locale}/yapay-zeka/`),
            about: [
              "yapay zeka uyumlu LED ekran",
              "AI media server LED",
              "AI shopping LED catalog",
              "NXTIONSTAR",
              "ARLEDSCREEN",
            ],
            sameAs: [
              absoluteUrl("/ai-shopping.json"),
              absoluteUrl("/entity.json"),
              absoluteUrl("/catalog.json"),
              absoluteUrl("/.well-known/ard.json"),
              absoluteUrl("/llms.txt"),
            ],
          }),
        }}
      />
      <Section
        titleAs="h1"
        eyebrow={locale === "tr" ? "YZ entegrasyonu" : "AI integration"}
        title={seo.h1 ?? c.navLabel}
        description={seo.intro}
        className="min-w-0 prose-seo"
      >
        <div className="space-y-8">
          {c.sections.map((s) => (
            <article key={s.h2} className="max-w-3xl">
              <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
                {s.h2}
              </h2>
              <p className="mt-3 text-base leading-[1.7] text-ink-soft">{s.body}</p>
            </article>
          ))}

          <GlassPanel className="max-w-3xl p-6">
            <h2 className="font-display text-lg font-bold text-ink">
              {c.bulletsTitle}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-soft">
              {c.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </GlassPanel>

          <GlassPanel className="max-w-3xl p-6">
            <h2 className="font-display text-lg font-bold text-ink">{c.agentTitle}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {c.agentLinks.map((l) => (
                <li key={l.href} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <a href={l.href} className="font-semibold text-cyan hover:underline">
                    {l.label}
                  </a>
                  <span className="text-ink-muted">— {l.note}</span>
                </li>
              ))}
            </ul>
            {locale === "tr" ? (
              <ShoppingLinkCloud
                excludeHref="/tr/yapay-zeka/"
                title="AI alışveriş keşif şeridi"
                extra={[
                  { href: "/.well-known/ard.json", label: "ard.json" },
                  { href: "/llms.txt", label: "llms.txt" },
                  { href: "/feeds/merchant-priced-panels.tsv", label: "Merchant feed (12 SKU)" },
                ]}
              />
            ) : null}
          </GlassPanel>

          <div className="grid gap-4 md:grid-cols-2">
            {c.faqs.map((f) => (
              <GlassPanel key={f.question} className="p-5">
                <h3 className="font-display text-base font-semibold text-ink">
                  {f.question}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">{f.answer}</p>
              </GlassPanel>
            ))}
          </div>

          <div className="rounded-2xl border border-cyan/25 bg-cyan/5 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink">
              {c.ctaTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">{c.ctaBody}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`/${locale}/quote`}>{dict.nav.quote}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/${locale}/products`}>{dict.nav.products}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={"/tr/hesaplayici/"}>
                  {dict.nav.priceCalculator}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
