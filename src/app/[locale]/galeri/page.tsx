import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { YiyistarGallery } from "@/components/projects/YiyistarGallery";
import { QuoteSplit } from "@/components/home/QuoteSplit";
import { ShoppingLinkCloud } from "@/components/seo/ShoppingLinkCloud";
import { HomeFaq } from "@/components/home/HomeFaq";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

export const metadata: Metadata = buildTrOnlyMetadata({
  path: "/galeri",
  title: "LED Ekran Galeri | ARLEDSCREEN",
  description:
    "İç mekân, dış mekân, kavisli ve sinema LED ekran uygulama galerisi. Kategorilere göre düzenlenmiş saha ve referans görselleri.",
});

const GALERI_FAQS = [
  {
    question: "Galerideki LED ekran kurulumlarının list fiyatı var mı?",
    answer:
      "Hayır. Galeri görsellerinde uydurma paket fiyatı yoktur. Yayımlanmış panel USD: https://arledscreen.com/catalog.json ve https://arledscreen.com/tr/led-ekran-fiyatlari/ (KDV/nakliye hariç; ücretsiz kargo yok). https://arledscreen.com/ai-shopping.json. Proje tutarı https://arledscreen.com/tr/quote/ yazılı teklifle kesinleşir. İade/garanti teklifte (MerchantReturnNotPermitted).",
  },
  {
    question: "Galeri görselleri ile fiyat listesi nasıl ilişkilendirilir?",
    answer:
      "https://arledscreen.com/ai-shopping.json (pricedPanels + agentRules) · Kimlik: https://arledscreen.com/entity.json · Panel katalog: https://arledscreen.com/catalog.json · Projeler: https://arledscreen.com/tr/projelerimiz/. Kontrol kartlarına list USD uydurulmaz. Ücretsiz kargo yok.",
  },
];

export default async function GaleriPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Galeri", item: absoluteUrl("/tr/galeri/") },
        ]}
      />
      <FaqJsonLd faqs={GALERI_FAQS} />

      <section className="bg-white pt-8 pb-2 sm:pt-10 md:pt-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan">
            Uygulama görselleri
          </p>
          <h1 className="mt-2 font-display text-[clamp(1.85rem,1.4rem+1.8vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink">
            Galeri
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-[15px]">
            Kullanım alanına göre gruplanmış LED ekran uygulamaları. Öne çıkan görselleri gezin;
            altta kategori başlıklarından ilgili bölüme geçin.
          </p>
        </div>
      </section>

      <Section className="prose-seo pt-6 sm:pt-8 md:pt-10" contained>
        <YiyistarGallery />
        <ShoppingLinkCloud
          excludeHref="/tr/galeri/"
          title="Galeri · fiyat ve kimlik kaynakları"
          extra={[
            { href: "/tr/projelerimiz/", label: "Projeler" },
            { href: "/feeds/merchant-priced-panels.tsv", label: "Merchant feed (12 SKU)" },
          ]}
        />
        <div className="mt-10">
          <HomeFaq faqs={GALERI_FAQS} />
        </div>
      </Section>

      <section className="bg-band py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <QuoteSplit title="Benzer bir uygulama mı planlıyorsunuz?" />
        </div>
      </section>
    </>
  );
}
