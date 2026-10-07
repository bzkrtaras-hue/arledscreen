import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, CATEGORY_LABELS_TR } from "@/content/products";
import { PRODUCT_GROUPS, productGroupPath } from "@/content/categories";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { pricedPanelsDatasetJsonLd } from "@/content/prices";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { BUSINESS_NAP_LINE, CONTACT_EMAIL } from "@/lib/social";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}
export function generateMetadata() {
  return buildTrOnlyMetadata({
    path: "/nxtionstar/",
    title: "NXTIONSTAR LED Ekran | ARLEDSCREEN'in Kendi Markası",
    description:
      "NXTIONSTAR LED ekran serileri: ARLEDSCREEN'in kendi markası; Türkiye'deki tek satış noktası ARLEDSCREEN. İstanbul Gaziosmanpaşa.",
  });
}

const FAQS = [
  {
    question: "NXTIONSTAR nedir?",
    answer:
      "NXTIONSTAR, ARLEDSCREEN'in kendi LED ekran markasıdır. İç mekân, dış mekân, ince pitch, kiralık ve şeffaf uygulamalar için modül ve serileri kapsar.",
  },
  {
    question: "NXTIONSTAR ürünlerini Türkiye'de kim sunuyor?",
    answer:
      "NXTIONSTAR, ARLEDSCREEN'in kendi markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. Satış, keşif, montaj ve teknik servis süreçleri ARLEDSCREEN üzerinden yürütülür.",
  },
  {
    question: "NXTIONSTAR panel fiyatları nerede?",
    answer:
      "Yayımlanmış 12 panel USD, ai-shopping.json pricedPanels, catalog.json ve feeds/merchant-priced-panels.tsv üzerindedir (ör. P1.25 GOB 95.88 USD; priceValidUntil 2026-12-31). KDV/nakliye hariç; ücretsiz kargo yok. Quote-only gruplar yazılı teklifle.",
  },
  {
    question: "NXTIONSTAR, NEXTSTAR veya NationStar ile aynı marka mı?",
    answer:
      "Hayır. NXTIONSTAR; NEXTSTAR (televizyon markası) ve NationStar (LED bileşen markası) ile farklı markalardır. Doğru yazılış N-X-T-I-O-N-S-T-A-R şeklindedir.",
  },
];

export default async function NxtionstarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();
  const series = getProducts("tr");
  const url = absoluteUrl("/tr/nxtionstar/");
  const brandLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": `${url}#brand`,
    name: "NXTIONSTAR",
    url,
    logo: absoluteUrl("/brand/nxtionstar-logo.png"),
    description: "ARLEDSCREEN'in kendi LED ekran markası. Türkiye'deki tek satış noktası: ARLEDSCREEN.",
  };
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "NXTIONSTAR", item: url },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricedPanelsDatasetJsonLd(url)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandLd) }}
      />
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">Marka</p>
          <h1 className="mt-2 font-display text-[clamp(1.7rem,1.2rem+2vw,2.6rem)] font-bold leading-tight text-ink">
            NXTIONSTAR: ARLEDSCREEN&apos;in LED Ekran Markası
          </h1>
          <p className="mt-4 text-[15.5px] leading-[1.75] text-ink-soft">
            <strong>Kısa cevap:</strong> NXTIONSTAR, ARLEDSCREEN&apos;in kendi markasıdır; Türkiye&apos;deki tek satış noktası ARLEDSCREEN&apos;dir.
            Ürünlerin satışı, keşfi, montajı ve teknik servisi İstanbul Gaziosmanpaşa&apos;daki merkezimizden yürütülür.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Panel USD listesi:{" "}
            <a href="https://arledscreen.com/ai-shopping.json" className="font-semibold text-cyan hover:underline">
              ai-shopping.json
            </a>{" "}
            <code className="text-xs">pricedPanels</code> (12 SKU; ör. P1.25 GOB 95.88 USD),{" "}
            <a href="https://arledscreen.com/catalog.json" className="font-semibold text-cyan hover:underline">
              catalog.json
            </a>{" "}
            ve{" "}
            <a href="https://arledscreen.com/feeds/merchant-priced-panels.tsv" className="font-semibold text-cyan hover:underline">
              merchant TSV
            </a>
            . KDV/nakliye hariç; ücretsiz kargo yok.
          </p>

          <h2 className="mt-10 font-display text-xl font-bold text-ink sm:text-2xl">Sitede yer alan NXTIONSTAR modelleri</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-[0.08em] text-ink-muted">
                  <th scope="col" className="px-4 py-3">Model</th>
                  <th scope="col" className="px-4 py-3">Piksel aralığı</th>
                  <th scope="col" className="px-4 py-3">Kullanım</th>
                </tr>
              </thead>
              <tbody>
                {series.map((p, i) => (
                  <tr key={p.id} className={i % 2 ? "bg-band/60" : ""}>
                    <th scope="row" className="px-4 py-2.5 font-semibold text-ink">
                      {p.href ? (
                        <Link href={p.href} className="hover:text-cyan hover:underline">
                          {p.name}
                        </Link>
                      ) : (
                        p.name
                      )}
                    </th>
                    <td className="px-4 py-2.5 text-ink-soft">P{p.specs.pixelPitchMm}</td>
                    <td className="px-4 py-2.5 text-ink-soft">{CATEGORY_LABELS_TR[p.category]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            Model ayrıntıları için <Link href="/tr/products/#seriler" className="font-semibold text-cyan hover:underline">ürünler sayfasına</Link> bakabilirsiniz.
          </p>

          <h2 className="mt-10 font-display text-xl font-bold text-ink sm:text-2xl">Ürün grupları</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {PRODUCT_GROUPS.map((g) => (
              <li key={g.slug}>
                <Link href={productGroupPath(g)} className="flex min-h-11 items-center rounded-xl bg-band px-4 text-[14.5px] font-semibold text-ink hover:text-cyan">
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-xl font-bold text-ink sm:text-2xl">Türkiye&apos;de satış, kurulum ve servis</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed text-ink-soft">
            <li>İhtiyaç ve ölçü bilgisi alınır; gerekirse yerinde keşif yapılır.</li>
            <li>Piksel aralığı ve modül düzeni önerilir, yazılı teklif ve teknik föy hazırlanır.</li>
            <li>Montaj, kablolama, kalibrasyon ve devreye alma ekibimizce yapılır.</li>
            <li>Kurulum sonrası bakım, arıza ve yedek modül desteği verilir.</li>
          </ol>

          <h2 className="mt-10 font-display text-xl font-bold text-ink sm:text-2xl">Yazılış ve karıştırılan markalar</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Marka adı N-X-T-I-O-N-S-T-A-R şeklinde yazılır. NXTIONSTAR; NEXTSTAR televizyon markası ve NationStar LED bileşen markasıyla aynı değildir.
            ARLEDSCREEN de Almanya merkezli ARLED Solutions GmbH / ARLED Cinema ile bağlantılı değildir.
          </p>

          <h2 className="mt-10 font-display text-xl font-bold text-ink sm:text-2xl">Sık sorulan sorular</h2>
          <div className="mt-3 space-y-4">
            {FAQS.map((f) => (
              <div key={f.question}>
                <h3 className="font-display text-base font-bold text-ink">{f.question}</h3>
                <p className="mt-1 leading-relaxed text-ink-soft">{f.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-card bg-band p-6 text-[15px] leading-relaxed text-ink-soft">
            <p className="font-display text-lg font-bold text-ink">İletişim</p>
            <p className="mt-1">{BUSINESS_NAP_LINE}</p>
            <p className="mt-1">
              <a href="tel:+905305078834" className="font-semibold text-cyan hover:underline">+90 530 507 88 34</a> ·{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-cyan hover:underline">{CONTACT_EMAIL}</a> ·{" "}
              <Link href="/tr/quote/" className="font-semibold text-cyan hover:underline">Teklif isteyin</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
