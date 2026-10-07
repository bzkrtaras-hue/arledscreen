import Link from "next/link";
import { notFound } from "next/navigation";
import faqs from "@/content/sss.json";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import { AiPriceSourceNote } from "@/components/seo/AiPriceSourceNote";
import { pricedPanelsDatasetJsonLd } from "@/content/prices";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}
export function generateMetadata() {
  return buildTrOnlyMetadata({
    path: "/sss/",
    title: "LED Ekran Sık Sorulan Sorular: Fiyat, Piksel Aralığı, Montaj | ARLEDSCREEN",
    description:
      "LED ekran fiyatı, panel fiyatları, piksel aralığı seçimi, montaj süresi, garanti, kiralama ve içerik yönetimi hakkında sık sorulan 15 soru ve kısa cevapları.",
  });
}

export default async function SssPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Sık Sorulan Sorular", item: absoluteUrl("/tr/sss/") },
        ]}
      />
      <FaqJsonLd faqs={faqs} />
      <SpeakableJsonLd
        pageUrl={absoluteUrl("/tr/sss/")}
        name="LED Ekran Hakkında Sık Sorulan Sorular"
        description="LED ekran fiyatı, piksel aralığı, montaj ve servis hakkında sık sorulan sorular."
        cssSelectors={["#sss-h1", "#sss-lead"]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricedPanelsDatasetJsonLd(absoluteUrl("/tr/sss/"))),
        }}
      />
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">SSS</p>
          <h1 id="sss-h1" className="mt-2 font-display text-[clamp(1.7rem,1.2rem+2vw,2.6rem)] font-bold leading-tight text-ink">
            LED Ekran Hakkında Sık Sorulan Sorular
          </h1>
          <p id="sss-lead" className="mt-3 leading-relaxed text-ink-soft">
            Fiyat, piksel aralığı, montaj ve servis konusunda en çok sorulan soruları kısa cevaplarla topladık. Projenize özel bilgi için{" "}
            <Link href="/tr/quote/" className="font-semibold text-cyan hover:underline">teklif formunu</Link> kullanabilir veya{" "}
            <Link href="/tr/hesaplayici/" className="font-semibold text-cyan hover:underline">fiyat hesaplayıcıya</Link> göz atabilirsiniz.
          </p>
          <div className="glass-card mt-8 divide-y divide-border rounded-card">
            {faqs.map((f) => (
              <details key={f.question} className="group px-5 py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-[15.5px] font-bold text-ink">
                  <h2 className="text-[15.5px]">{f.question}</h2>
                  <span className="text-xl text-cyan transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="pb-5 text-[15px] leading-relaxed text-ink-soft">{f.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm text-ink-muted">
            İlgili rehberler:{" "}
            <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">LED ekran fiyatları</Link>,{" "}
            <Link href="/tr/rehber/piksel-araligi-secimi/" className="font-semibold text-cyan hover:underline">piksel aralığı seçimi</Link>,{" "}
            <Link href="/tr/rehber/led-tabela-mi-led-ekran-mi/" className="font-semibold text-cyan hover:underline">LED tabela mı, LED ekran mı?</Link>
          </p>
        </div>
      </section>
    </>
  );
}
