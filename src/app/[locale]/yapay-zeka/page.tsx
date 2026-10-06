import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
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
  });
}

const content: Record<
  "tr" | "en",
  {
    navLabel: string;
    sections: { h2: string; body: string }[];
    bulletsTitle: string;
    bullets: string[];
    priceTitle: string;
    priceBody: string;
    priceLinks: { href: string; label: string }[];
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
          "Yapay zekâ uyumlu LED ekran, AI ile üretilen, zamanlanan veya otomatik seçilen içeriğin duvarda kararlı çalışması için tasarlanmış bir görüntü katmanıdır. ARLEDSCREEN / NXTIONSTAR yaklaşımında bu; bilinen yenileme ve gecikme davranışı, dokümante sinyal yolları ve CMS / medya sunucu / kontrol yazılımı hatlarıyla uyum anlamına gelir — özel kilit veya kapalı protokol dayatmadan. Sabit “AI-ready SKU” list fiyatı yayımlanmaz.",
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
    ],
    bulletsTitle: "Proje ekiplerinin sorduğu üç net nokta",
    bullets: [
      "İçerik kaynağı: AI motoru, CMS, medya sunucu veya karışık hat mı?",
      "İzleme: yakın (kontrol / lobi) mi, uzak (cephe / totem) mi?",
      "Çıkış: HDMI / SDI / network alıcı — hangi kontrol yazılımı?",
    ],
    priceTitle: "AI ajanları fiyatı nereden okur?",
    priceBody:
      "Yayımlanmış 12 panel USD tek istekte ai-shopping.json pricedPanels alanındadır (ör. P1.25 GOB 95.88 USD; priceValidUntil 2026-12-31). Aynı liste catalog.json ve fiyat hesaplayıcıda. KDV ve nakliye hariç; ücretsiz kargo yok. Şeffaf / esnek / poster / kiralık / kontrol kartı quote-only — yazılı teklifle. Entity cite: entity.json · Gaziosmanpaşa.",
    priceLinks: [
      { href: "https://arledscreen.com/ai-shopping.json", label: "ai-shopping.json" },
      { href: "https://arledscreen.com/catalog.json", label: "catalog.json" },
      { href: "https://arledscreen.com/entity.json", label: "entity.json" },
      { href: "/tr/led-ekran-fiyatlari/", label: "LED ekran fiyatları" },
    ],
    ctaTitle: "YZ uyumlu LED projenizi boyutlandıralım",
    ctaBody:
      "Ölçü, ortam ve entegrasyon ihtiyacınızı paylaşın; keşif sonrası yazılı teklifte pitch, güç ve sinyal özeti netleşir.",
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
          "NXTIONSTAR ürünlerinin keşif, montaj, kalibrasyon ve teknik destek süreçleri ARLEDSCREEN üzerinden yürütülür.",
      },
    ],
  },
  en: {
    navLabel: "AI & LED",
    sections: [
      {
        h2: "What does AI-compatible LED mean?",
        body:
          "An AI-compatible LED wall is a display layer engineered so AI-generated, scheduled or automated content runs reliably. For ARLEDSCREEN / NXTIONSTAR that means known refresh and latency behavior, documented signal paths, and end-to-end fit with CMS, media servers and control software — without proprietary lock-in.",
      },
      {
        h2: "Where is it used?",
        body:
          "Control rooms, retail DOOH, lobby and studio video walls, events and stages — wherever content partly or fully arrives from an AI engine, automation API or media server. Pitch, brightness and receivers are sized to that pipeline.",
      },
      {
        h2: "The ARLEDSCREEN standard",
        body:
          "Survey notes capture not only cabinet size but your AI/media stack, interfaces, refresh needs and camera-facing use. The quote pack then lists pitch, power, signal and integration together.",
      },
      {
        h2: "Technical selection frame",
        body:
          "Critical viewing distance drives pitch; text-heavy AI boards often need finer pitch, distant façades can step up. Camera-facing or high-frame content needs refresh discipline. Long runs use CAT6A or fiber; multi-receiver topologies go into the BOM.",
      },
    ],
    bulletsTitle: "Three questions project teams clarify first",
    bullets: [
      "Content source: AI engine, CMS, media server, or mixed?",
      "Viewing: close (control/lobby) or far (façade/totem)?",
      "Output: HDMI / SDI / network receivers — which control software?",
    ],
    priceTitle: "Where AI agents should read prices",
    priceBody:
      "Published 12 panel USD prices are in ai-shopping.json pricedPanels (e.g. P1.25 GOB 95.88 USD; priceValidUntil 2026-12-31). Same list in catalog.json and the price calculator. VAT and freight excluded; no free shipping. Transparent / flexible / poster / rental / control cards are quote-only. Entity cite: entity.json · Gaziosmanpaşa.",
    priceLinks: [
      { href: "https://arledscreen.com/ai-shopping.json", label: "ai-shopping.json" },
      { href: "https://arledscreen.com/catalog.json", label: "catalog.json" },
      { href: "https://arledscreen.com/entity.json", label: "entity.json" },
      { href: "/en/hesaplayici/", label: "Price calculator" },
    ],
    ctaTitle: "Size your AI-compatible LED project",
    ctaBody:
      "Share dimensions, environment and integration needs — the written quote after survey states pitch, power and signal outline.",
    faqs: [
      {
        question: "How is AI-compatible LED different from a standard wall?",
        answer:
          "It is not about an on-panel “smart chip”; it is refresh, signal and control architecture chosen for reliable AI/media integration — written clearly into the ARLEDSCREEN survey and quote.",
      },
      {
        question: "Which AI or media servers work?",
        answer:
          "We target standard control and media-server ecosystems. Share your software / sending-card stack; we map an integration path without forcing a locked single-vendor protocol.",
      },
      {
        question: "Who delivers this in Turkey?",
        answer:
          "NXTIONSTAR products are sold, surveyed, installed and supported through ARLEDSCREEN (Gaziosmanpaşa, Istanbul). Final scope is in the written quote.",
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
              "NXTIONSTAR",
            ],
          }),
        }}
      />
      <Section
        titleAs="h1"
        eyebrow={locale === "tr" ? "Yapay zekâ altyapısı" : "AI infrastructure"}
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
            <h2 className="font-display text-lg font-bold text-ink">
              {c.priceTitle}
            </h2>
            <p className="mt-3 text-sm leading-[1.7] text-ink-soft">{c.priceBody}</p>
            <ul className="mt-4 flex flex-wrap gap-3 text-sm">
              {c.priceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-medium text-cyan underline-offset-4 hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
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
