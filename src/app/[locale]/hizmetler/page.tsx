import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClipboardCheck, Hammer, LifeBuoy, Ruler, Settings2, Truck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { HowToJsonLd } from "@/components/seo/HowToJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { HomeFaq } from "@/components/home/HomeFaq";
import { WhatsAppProjectPicker } from "@/components/home/WhatsAppProjectPicker";
import { OptImage } from "@/components/ui/opt-image";
import { pricedPanelsDatasetJsonLd } from "@/content/prices";
import { getFaqs } from "@/content/faqs";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (raw === "en") {
    return buildPageMetadata({
      locale: "en" as Locale,
      path: "/hizmetler/",
      title: "LED Display Installation & Technical Service | ARLEDSCREEN",
      description:
        "LED display survey, install, commissioning, maintenance and technical service. ARLEDSCREEN — Gaziosmanpaşa, Istanbul; Turkey-wide projects.",
      hreflangLocales: ["tr", "en"],
    });
  }
  if (raw !== "tr") return {};
  return buildPageMetadata({
    locale: "tr" as Locale,
    path: "/hizmetler/",
    title: "LED Ekran Montaj ve Teknik Servis | ARLEDSCREEN İstanbul",
    description:
      "LED ekran keşfi, montaj, devreye alma, bakım ve teknik servis. İstanbul Gaziosmanpaşa merkezli ARLEDSCREEN — Türkiye geneli projeler.",
    hreflangLocales: ["tr", "en"],
  });
}

const SERVICES_TR = [
  { Icon: Ruler, title: "Keşif ve ölçüm", body: "Montaj yüzeyi, izleme mesafesi, elektrik ve sinyal altyapısının yerinde incelenmesi." },
  { Icon: ClipboardCheck, title: "Projelendirme", body: "Piksel aralığı, kabin yerleşimi, çözünürlük ve güç ihtiyacının belirlenmesi; malzeme listesinin hazırlanması." },
  { Icon: Truck, title: "Tedarik", body: "NXTIONSTAR ürünlerinin ve kontrol ekipmanlarının projeye göre tedariki." },
  { Icon: Hammer, title: "Montaj", body: "Taşıyıcı konstrüksiyon, kabin montajı, güç ve sinyal kablolaması." },
  { Icon: Settings2, title: "Devreye alma", body: "Kontrol sisteminin kurulumu, kalibrasyon, içerik testi ve kullanım eğitimi." },
  { Icon: LifeBuoy, title: "Bakım ve teknik servis", body: "Periyodik bakım, arıza tespiti, modül ve güç kaynağı değişimi; mevcut ekranlar için servis talebi." },
];

const SERVICES_EN = [
  { Icon: Ruler, title: "Survey and measure", body: "On-site review of mount surface, viewing distance, power and signal infrastructure." },
  { Icon: ClipboardCheck, title: "Engineering", body: "Pitch, cabinet layout, resolution and power needs; bill of materials." },
  { Icon: Truck, title: "Supply", body: "NXTIONSTAR panels and control gear sourced to the project." },
  { Icon: Hammer, title: "Install", body: "Supporting structure, cabinets, power and signal cabling." },
  { Icon: Settings2, title: "Commissioning", body: "Controller setup, calibration, content test and operator handover." },
  { Icon: LifeBuoy, title: "Maintenance & service", body: "Scheduled maintenance, fault finding, module/PSU swap; service for existing walls." },
];

const FAQS_TR = [
  {
    question: "Başka firmadan alınmış bir LED ekrana servis veriyor musunuz?",
    answer:
      "Ekranın markası, modeli ve kontrol sistemi bilgisini paylaşırsanız inceleyip servis ve yedek parça olanaklarını size iletiriz.",
  },
  {
    question: "Keşif için hangi bilgiler gerekiyor?",
    answer:
      "Yaklaşık ölçü, montaj yeri (duvar, cephe, zemin, tavan askı), kullanım amacı, izleme mesafesi ve elektrik altyapısı hakkında bilgi yeterlidir. Fotoğraf veya kısa video göndermeniz süreci hızlandırır.",
  },
  {
    question: "Dış mekân ekranlar için izin süreçleri gerekir mi?",
    answer:
      "Dış mekân reklam ve cephe ekranlarında ilgili belediyenin izin ve ruhsat koşulları geçerli olabilir. Süreç konuma göre değiştiği için başvuru öncesinde belediyeden bilgi alınmasını öneririz.",
  },
];

const FAQS_EN = [
  {
    question: "Do you service LED walls bought elsewhere?",
    answer:
      "Share brand, model and controller details — we will confirm spare-part and service options in writing.",
  },
  {
    question: "What do you need for a survey?",
    answer:
      "Approx. size, mount location (wall, façade, floor, hung), use case, viewing distance and power notes. Photos or a short video speed things up.",
  },
  {
    question: "Do outdoor screens need permits?",
    answer:
      "Outdoor advertising and façade screens may need municipal permits. Rules vary by location — check the local authority before install.",
  },
];

const HOWTO_EN = [
  {
    name: "Need and size",
    text: "We collect use case, indoor/outdoor, approx. size, location and timeline.",
  },
  {
    name: "Survey and pre-design",
    text: "We review viewing distance, mount surface, power and signal, then propose pitch.",
  },
  {
    name: "Quote and tech sheet",
    text: "Screen size, cabinet count, materials and work plan go into a written quote.",
  },
  {
    name: "Install and commissioning",
    text: "Structure, cabinets, cabling, calibration and content test.",
  },
  {
    name: "Technical service",
    text: "After handover we support maintenance, faults and spare parts.",
  },
];

export default async function HizmetlerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== "tr" && raw !== "en") notFound();
  const locale = raw as "tr" | "en";
  const en = locale === "en";
  const base = `/${locale}`;
  const pageUrl = absoluteUrl(`${base}/hizmetler/`);
  const services = en ? SERVICES_EN : SERVICES_TR;
  const pageFaqs = en ? FAQS_EN : FAQS_TR;
  // Append entity disambiguation FAQs for AI scrapers (EN from getFaqs).
  const entityFaqs = en
    ? getFaqs("en").filter(
        (f) => f.question.includes("NationStar") || f.question.includes("arleds.com"),
      )
    : [];
  const faqs = [...pageFaqs, ...entityFaqs];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: en ? "Home" : "Ana Sayfa", item: absoluteUrl(`${base}/`) },
          { name: en ? "Services" : "Hizmetler", item: pageUrl },
        ]}
      />
      <ServiceJsonLd locale={locale} />
      <HowToJsonLd
        name={en ? "How does an LED display project run?" : "LED ekran projesi nasıl ilerler?"}
        description={
          en
            ? "ARLEDSCREEN LED projects from need through technical service in five steps."
            : "ARLEDSCREEN LED ekran projelerinde ihtiyaçtan teknik servise kadar beş adımlı süreç."
        }
        steps={
          en
            ? HOWTO_EN
            : [
                {
                  name: "İhtiyaç ve ölçü",
                  text: "Kullanım amacı, ortam (iç/dış), yaklaşık ölçü, konum ve zaman planını alıyoruz.",
                },
                {
                  name: "Keşif ve ön proje",
                  text: "İzleme mesafesi, montaj yüzeyi, elektrik ve sinyal altyapısını inceleyip piksel aralığını öneriyoruz.",
                },
                {
                  name: "Teklif ve teknik föy",
                  text: "Ekran ölçüsü, kabin adedi, malzeme listesi ve iş planını yazılı teklifte paylaşıyoruz.",
                },
                {
                  name: "Montaj ve devreye alma",
                  text: "Taşıyıcı sistem, kabin montajı, kablolama, kalibrasyon ve içerik testini tamamlıyoruz.",
                },
                {
                  name: "Teknik servis",
                  text: "Kullanım eğitimi sonrası bakım, arıza ve yedek parça taleplerinizde yanınızdayız.",
                },
              ]
        }
      />
      <FaqJsonLd faqs={faqs} />
      <SpeakableJsonLd
        pageUrl={pageUrl}
        name={
          en
            ? "LED display installation and technical service"
            : "LED ekran montaj ve teknik servis hizmetleri"
        }
        description={
          en
            ? "LED display survey, install, commissioning, maintenance and technical service. ARLEDSCREEN — Gaziosmanpaşa, Istanbul."
            : "LED ekran keşfi, montaj, devreye alma, bakım ve teknik servis. İstanbul Gaziosmanpaşa merkezli ARLEDSCREEN."
        }
        cssSelectors={["#hizmet-h1", "#hizmet-lead"]}
        mainEntity={{ "@id": `${pageUrl}#service` }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricedPanelsDatasetJsonLd(pageUrl)),
        }}
      />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
              {en ? "Services" : "Hizmetler"}
            </p>
            <h1
              id="hizmet-h1"
              className="mt-3 text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink"
            >
              {en
                ? "LED display installation and technical service"
                : "LED ekran montaj ve teknik servis hizmetleri"}
            </h1>
            <p id="hizmet-lead" className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              {en ? (
                <>
                  We plan every step of your LED project — from survey through commissioning and after-sales service.
                  HQ is Gaziosmanpaşa, Istanbul; we run projects Turkey-wide. For provinces with published records see the{" "}
                  <Link href="/tr/bolgeler/" className="font-semibold text-cyan hover:underline">
                    service regions
                  </Link>{" "}
                  hub (TR).
                </>
              ) : (
                <>
                  Keşiften devreye almaya ve kurulum sonrası servise kadar LED ekran projenizin tüm adımlarını planlıyoruz.
                  Merkezimiz İstanbul Gaziosmanpaşa&apos;dadır; Türkiye genelinde proje yürütüyoruz. Kayıtlı iller için{" "}
                  <Link href="/tr/bolgeler/" className="font-semibold text-cyan hover:underline">
                    hizmet bölgesi
                  </Link>{" "}
                  sayfasına bakın.
                </>
              )}
            </p>
            <AiPriceSourceNote locale={locale} />
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
              <Link
                href={`${base}/hesaplayici/`}
                className="font-semibold text-cyan hover:underline"
              >
                {en ? "Price calculator" : "Hesaplayıcı"}
              </Link>
              .
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`${base}/quote/`}
                className="btn-soft inline-flex min-h-12 items-center justify-center bg-cyan px-6 text-white hover:bg-cyan-600"
              >
                {en ? "Request survey & quote" : "Keşif ve teklif iste"}
              </Link>
              <Link
                href="/tr/projelerimiz/"
                className="btn-soft inline-flex min-h-12 items-center justify-center border border-cyan/50 bg-white px-6 text-cyan hover:bg-cyan-50"
              >
                {en ? "View projects (TR)" : "Projeleri inceleyin"}
              </Link>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
            <OptImage
              src="/projects/service-assembly.jpg"
              alt={
                en
                  ? "On-site module install on an indoor LED wall"
                  : "İç mekân LED duvarda sahada modül montajı"
              }
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <Section
        eyebrow={en ? "Scope" : "Kapsam"}
        title={en ? "What we do" : "Neler yapıyoruz?"}
        className="prose-seo"
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ Icon, title, body }) => (
            <li key={title} className="rounded-2xl p-6 glass-card">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-display text-base font-bold text-ink">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow={en ? "Process" : "Süreç"}
        title={en ? "Your project in five steps" : "Projeniz beş adımda ilerler"}
        className="bg-surface/60 prose-seo"
      >
        <ProcessSteps locale={locale} />
      </Section>

      <Section
        eyebrow={en ? "Technical service" : "Teknik servis"}
        title={en ? "Support for your existing wall" : "Mevcut ekranınız için destek"}
        description={
          en
            ? "Send fault, maintenance or spare-part requests as a ready WhatsApp message."
            : "Arıza, bakım veya yedek parça talebinizi WhatsApp'tan hazır mesajla iletebilirsiniz."
        }
        className="prose-seo"
      >
        <WhatsAppProjectPicker compact locale={en ? "en" : "tr"} />
      </Section>

      <Section
        eyebrow={en ? "FAQ" : "SSS"}
        title={en ? "Questions about services" : "Hizmetlerle ilgili sorular"}
        className="border-t border-border prose-seo"
      >
        <HomeFaq faqs={faqs} />
      </Section>
    </>
  );
}
