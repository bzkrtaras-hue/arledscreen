import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, FileText } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { HomeFaq } from "@/components/home/HomeFaq";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { fmtUsd } from "@/content/prices";
import {
  MATERIALS_LIST_DATE,
  MATERIALS_PRICE_NOTE,
  MATERIAL_CATEGORIES,
  MATERIAL_MODELS,
  MATERIAL_TOTALS,
  categoryPath,
  categoryPriceRange,
  getMaterialItem,
  materialModelPath,
} from "@/content/materials";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

const TITLE = "LED Ekran Malzemeleri ve Fiyat Listesi | ARLEDSCREEN";
const DESCRIPTION =
  "LED ekran malzemeleri fiyat listesi: kontrol kartı, NovaStar alıcı/gönderici, video işlemci, trafo, CNC ve rental kasa, matrix, kablo ve panel varyantları. USD, KDV hariç.";

const FAQS = [
  {
    question: "Malzeme fiyatları neye göre değişir?",
    answer:
      "Fiyatlar USD cinsindendir ve KDV hariçtir; döviz kuruna göre değişebilir. Adet, stok durumu ve kurulum ihtiyacı yazılı teklifte netleşir. Ücretsiz kargo yoktur.",
  },
  {
    question: "Huidu ve NovaStar ürünlerini siz mi üretiyorsunuz?",
    answer:
      "Hayır. Huidu ve NovaStar ilgili üreticilerin ürünleridir; ARLEDSCREEN bu ürünleri satar, kurulum ve yapılandırmasını yapar. NXTIONSTAR ise ARLEDSCREEN'in kendi LED panel markasıdır.",
  },
  {
    question: "Doğru kontrol kartını nasıl seçerim?",
    answer:
      "Ekran ölçüsü, modül tipi ve içeriği nasıl güncelleyeceğiniz (USB, Wi‑Fi, bilgisayar) yeterlidir. Bu bilgileri WhatsApp'tan iletirseniz uygun kartı ve gerekirse alıcı kart sayısını öneriyoruz.",
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "tr") return {};
  return buildTrOnlyMetadata({ path: "/malzemeler/", title: TITLE, description: DESCRIPTION });
}

export default async function MaterialsHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();
  const url = absoluteUrl("/tr/malzemeler/");
  const totals = MATERIAL_TOTALS();
  const wa = whatsappHref("Merhaba, LED ekran malzemesi (ürün / model ve adet) için fiyat almak istiyorum:");
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: "LED ekran malzemeleri",
    description: DESCRIPTION,
    inLanguage: "tr-TR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    subjectOf: { "@type": "Dataset", "@id": `${SITE_URL}/materials.json`, url: `${SITE_URL}/materials.json` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: MATERIAL_CATEGORIES.length,
      itemListElement: MATERIAL_CATEGORIES.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        url: absoluteUrl(categoryPath(c.slug)),
      })),
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "LED ekran malzemeleri", item: url },
        ]}
      />
      <FaqJsonLd faqs={FAQS} pageUrl={url} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <nav aria-label="Sayfa yolu" className="flex flex-wrap items-center gap-1 text-[13px] text-ink-muted">
            <Link href="/tr/" className="hover:text-cyan">Ana Sayfa</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span className="text-ink-soft" aria-current="page">Malzemeler</span>
          </nav>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">Fiyat listesi · {MATERIALS_LIST_DATE}</p>
          <h1
            id="malzeme-h1"
            className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink"
          >
            LED ekran malzemeleri
          </h1>
          <p id="malzeme-lead" className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Kontrol kartından trafoya, CNC kasadan kabloya kadar LED ekran kurulumu ve bakımında kullanılan {totals.items} kalem
            ürün ve {totals.pricePoints} fiyat bu sayfadadır. Huidu ve NovaStar ürünleri üretici adıyla satılır; kurulum ve
            yapılandırma ARLEDSCREEN tarafından yapılır.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{MATERIALS_PRICE_NOTE}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0F7A41] px-6 text-white hover:bg-[#0B6435]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp&apos;tan fiyat sorun
            </a>
            <Link
              href="/tr/quote/?tip=servis"
              className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 border border-cyan/50 bg-white px-6 text-cyan hover:bg-cyan-50"
            >
              <FileText className="h-4 w-4" aria-hidden />
              Yazılı teklif iste
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Kategoriler</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MATERIAL_CATEGORIES.map((c) => {
              const r = categoryPriceRange(c.slug);
              return (
                <li key={c.slug} className="rounded-2xl p-5 glass-card">
                  <h3 className="font-display text-base font-bold text-ink">
                    <Link href={categoryPath(c.slug)} className="hover:text-cyan">
                      {c.name}
                    </Link>
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{c.short}</p>
                  <p className="mt-3 text-sm text-ink-soft">
                    {r.count} fiyat · {fmtUsd(r.min)} – {fmtUsd(r.max)} USD
                  </p>
                  <Link href={categoryPath(c.slug)} className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-cyan hover:text-cyan-700">
                    Fiyatları görün <ChevronRight className="h-4 w-4" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-band/30 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Çok aranan modeller</h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {MATERIAL_MODELS.map((m) => {
              const it = getMaterialItem(m.itemId);
              return (
                <li key={m.slug}>
                  <Link
                    href={materialModelPath(m)}
                    className="group flex h-full flex-col rounded-2xl bg-band p-2 transition hover:-translate-y-0.5 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
                  >
                    <span className="px-2 pb-2 pt-3">
                      <span className="block font-display text-[15px] font-bold text-ink group-hover:text-cyan">{it?.name}</span>
                      <span className="mt-1 block text-[13px] text-ink-muted">
                        {m.type}
                        {typeof it?.usd === "number" ? ` · ${fmtUsd(it.usd)} USD` : ""}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">LED ekran fiyatları (12 panel)</Link>
            <Link href="/tr/hesaplayici/" className="font-semibold text-cyan hover:underline">Fiyat hesaplayıcı</Link>
            <Link href="/tr/products/led-modul-ve-kontrol-sistemleri/" className="font-semibold text-cyan hover:underline">Modül ve kontrol sistemleri</Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Sık sorulanlar</h2>
          <div className="mt-6">
            <HomeFaq faqs={FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
