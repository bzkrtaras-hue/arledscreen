import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { HomeFaq } from "@/components/home/HomeFaq";
import {
  SERVICE_REGIONS,
  serviceRegionPath,
  serviceRegionsHubSummary,
} from "@/content/service-regions";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

export const metadata: Metadata = buildTrOnlyMetadata({
  path: "/bolgeler",
  title: "LED Ekran Hizmet Bölgesi: Türkiye İlleri | ARLEDSCREEN",
  description:
    "ARLEDSCREEN LED ekran keşif, montaj ve teknik servis hizmet bölgesi. İstanbul Gaziosmanpaşa merkez; Tem 2025–Tem 2026 kayıtlı iller ve proje örnekleri.",
});

const FAQS = [
  {
    question: "Hangi şehirlerde LED ekran kurulumu yapıyorsunuz?",
    answer:
      "Merkezimiz İstanbul Gaziosmanpaşa'dadır. Hizmetimiz Türkiye geneli; tamamlanan iş listemiz kayıtlı illerde yer alır (Tem 2025 – Tem 2026: 13 il ile Almanya ve Azerbaycan). Kayıdı olmayan il için kapı sayfası açılmaz.",
  },
  {
    question: "İstanbul dışına keşif için geliyor musunuz?",
    answer:
      "Evet. Ölçü, konum ve kullanım amacını paylaştığınızda keşif ve montaj planını projenize göre hazırlarız. Mesafe ve saha koşulları teklifte yazılır.",
  },
  {
    question: "Şehir sayfalarındaki proje sayıları neyi gösterir?",
    answer:
      "Yalnızca sitede yayımlanmış referans kayıtlarından türetilir. Her il sayfasında o ile ait konumlar ve örnek kayıtlar listelenir; kaydı olmayan il için sayfa üretilmez.",
  },
];

export default async function BolgelerHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "tr") notFound();
  const summary = serviceRegionsHubSummary();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Hizmet bölgesi", item: absoluteUrl("/tr/bolgeler/") },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            Hizmet bölgesi
          </p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink">
            Türkiye geneli LED ekran keşif, montaj ve teknik servis
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Hizmetimiz Türkiye geneli; tamamlanan iş listemiz kayıtlı illerde yer alır.
            Aşağıdaki {summary.provinceCount} il
            {summary.countries.length ? ` (ayrıca ${summary.countries.join(", ")})` : ""}, Tem
            2025 – Tem 2026 yayımlanmış proje kayıtlarından türetilir. Kaydı olmayan il için
            kapı sayfası açılmaz — programatik 81 il spam’i yoktur. Ankara veya Ordu gibi
            henüz yayımlanmış il kaydı olmayan şehirler için ayrı landing üretilmez; keşif
            talebi yine alınır.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-ink-muted">
            Ticari ihtiyaçlar için{" "}
            <Link href="/tr/led-ekran/" className="font-semibold text-cyan hover:underline">
              LED ekran
            </Link>
            ,{" "}
            <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
              fiyatlar
            </Link>{" "}
            ve ürün gruplarına bakın.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tr/quote/"
              className="btn-soft inline-flex min-h-12 items-center justify-center bg-cyan px-6 text-white hover:bg-cyan-600"
            >
              Keşif ve teklif iste
            </Link>
            <Link
              href="/tr/projelerimiz/"
              className="btn-soft inline-flex min-h-12 items-center justify-center border border-cyan/50 bg-white px-6 text-cyan hover:bg-cyan-50"
            >
              Tüm projeler
            </Link>
          </div>
        </div>
      </section>

      <Section eyebrow="İller" title="Kayıtlı hizmet illeri" className="bg-surface/60 prose-seo">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_REGIONS.map((region) => (
            <li key={region.slug}>
              <Link
                href={serviceRegionPath(region.slug)}
                className="glass-card block h-full rounded-2xl p-6 transition hover:border-cyan/40"
              >
                <h2 className="font-display text-lg font-bold text-ink">{region.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {region.projectCount} kayıtlı proje
                  {region.isHq ? " · merkez ofis" : ""}
                </p>
                <p className="mt-3 text-sm font-semibold text-cyan">İl sayfasına git →</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="SSS" title="Bölge hakkında sorular" className="border-t border-border prose-seo">
        <HomeFaq faqs={FAQS} />
      </Section>
    </>
  );
}
