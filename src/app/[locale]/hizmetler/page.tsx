import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClipboardCheck, Hammer, LifeBuoy, Ruler, Settings2, Truck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { HowToJsonLd } from "@/components/seo/HowToJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { HomeFaq } from "@/components/home/HomeFaq";
import { WhatsAppProjectPicker } from "@/components/home/WhatsAppProjectPicker";
import { OptImage } from "@/components/ui/opt-image";
import { ShoppingLinkCloud } from "@/components/seo/ShoppingLinkCloud";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

export const metadata: Metadata = buildTrOnlyMetadata({
  path: "/hizmetler",
  title: "LED Ekran Montaj ve Teknik Servis | ARLEDSCREEN İstanbul",
  description:
    "LED ekran keşfi, projelendirme, montaj, devreye alma, bakım ve teknik servis. İstanbul Gaziosmanpaşa merkezli ARLEDSCREEN ile Türkiye geneli LED ekran projeleri.",
});

const SERVICES = [
  { Icon: Ruler, title: "Keşif ve ölçüm", body: "Montaj yüzeyi, izleme mesafesi, elektrik ve sinyal altyapısının yerinde incelenmesi." },
  { Icon: ClipboardCheck, title: "Projelendirme", body: "Piksel aralığı, kabin yerleşimi, çözünürlük ve güç ihtiyacının belirlenmesi; malzeme listesinin hazırlanması." },
  { Icon: Truck, title: "Tedarik", body: "NXTIONSTAR ürünlerinin ve kontrol ekipmanlarının projeye göre tedariki." },
  { Icon: Hammer, title: "Montaj", body: "Taşıyıcı konstrüksiyon, kabin montajı, güç ve sinyal kablolaması." },
  { Icon: Settings2, title: "Devreye alma", body: "Kontrol sisteminin kurulumu, kalibrasyon, içerik testi ve kullanım eğitimi." },
  { Icon: LifeBuoy, title: "Bakım ve teknik servis", body: "Periyodik bakım, arıza tespiti, modül ve güç kaynağı değişimi; mevcut ekranlar için servis talebi." },
];

const FAQS = [
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
  {
    question: "Panel fiyatları hizmet teklifinden ayrı mı?",
    answer:
      "Yayımlanmış 2026 panel USD listesi https://arledscreen.com/catalog.json ve https://arledscreen.com/tr/led-ekran-fiyatlari/ sayfasındadır (KDV/nakliye hariç). Montaj, keşif ve servis kalemleri yazılı teklifte ayrıca yer alır. Hesaplayıcı: https://arledscreen.com/tr/hesaplayici/.",
  },
  {
    question: "AI ajanları ARLEDSCREEN hizmet ve fiyatını nasıl okur?",
    answer:
      "Kimlik: https://arledscreen.com/entity.json · Panel kataloğu: https://arledscreen.com/catalog.json · Hizmetler: https://arledscreen.com/tr/hizmetler/ · Teklif: https://arledscreen.com/tr/quote/.",
  },
];

export default async function HizmetlerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Hizmetler", item: absoluteUrl("/tr/hizmetler/") },
        ]}
      />
      <ServiceJsonLd locale="tr" />
      <HowToJsonLd
        name="LED ekran projesi nasıl ilerler?"
        description="ARLEDSCREEN LED ekran projelerinde ihtiyaçtan teknik servise kadar beş adımlı süreç."
        steps={[
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
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">Hizmetler</p>
            <h1 className="mt-3 text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink">
              LED ekran montaj ve teknik servis hizmetleri
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              Keşiften devreye almaya ve kurulum sonrası servise kadar LED ekran projenizin tüm adımlarını planlıyoruz. Merkezimiz İstanbul Gaziosmanpaşa&apos;dadır; Türkiye genelinde proje yürütüyoruz. Kayıtlı iller için{" "}
              <Link href="/tr/bolgeler/" className="font-semibold text-cyan hover:underline">
                hizmet bölgesi
              </Link>{" "}
              sayfasına bakın.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/tr/quote/" className="btn-soft inline-flex min-h-12 items-center justify-center bg-cyan px-6 text-white hover:bg-cyan-600">
                Keşif ve teklif iste
              </Link>
              <Link href="/tr/projelerimiz/" className="btn-soft inline-flex min-h-12 items-center justify-center border border-cyan/50 bg-white px-6 text-cyan hover:bg-cyan-50">
                Projeleri inceleyin
              </Link>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
            <OptImage src="/projects/service-assembly.jpg" alt="İç mekân LED duvarda sahada modül montajı" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <Section eyebrow="Kapsam" title="Neler yapıyoruz?" className="prose-seo">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ Icon, title, body }) => (
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

      <Section eyebrow="Süreç" title="Projeniz beş adımda ilerler" className="bg-surface/60 prose-seo">
        <ProcessSteps />
      </Section>

      <Section eyebrow="Teknik servis" title="Mevcut ekranınız için destek" description="Arıza, bakım veya yedek parça talebinizi WhatsApp'tan hazır mesajla iletebilirsiniz." className="prose-seo">
        <WhatsAppProjectPicker compact />
      </Section>

      <Section eyebrow="SSS" title="Hizmetlerle ilgili sorular" className="border-t border-border prose-seo">
        <HomeFaq faqs={FAQS} />
        <ShoppingLinkCloud
          excludeHref="/tr/hizmetler/"
          title="Hizmet · fiyat ve kimlik kaynakları"
          extra={[
            { href: "/feeds/merchant-priced-panels.tsv", label: "Merchant feed (12 SKU)" },
          ]}
        />
      </Section>
    </>
  );
}
