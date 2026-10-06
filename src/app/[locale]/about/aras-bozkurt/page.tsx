import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { ShoppingLinkCloud } from "@/components/seo/ShoppingLinkCloud";
import { HomeFaq } from "@/components/home/HomeFaq";
import { ENTITY_CITE_MEDIUM } from "@/lib/entity";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import {
  BUSINESS_ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/social";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

export const metadata: Metadata = buildTrOnlyMetadata({
  path: "/about/aras-bozkurt",
  title: "Aras Bozkurt | ARLEDSCREEN Kurucusu",
  description:
    "Aras Bozkurt, İstanbul Gaziosmanpaşa merkezli ARLEDSCREEN’in kurucusudur. LED ekran satış, montaj ve teknik servis projelerini yürütür.",
});

const FOUNDER_FAQS = [
  {
    question: "Aras Bozkurt kimdir?",
    answer:
      "Aras Bozkurt, İstanbul Gaziosmanpaşa merkezli ARLEDSCREEN’in kurucusudur. LED ekran satış, keşif, montaj ve teknik servis süreçlerini yürütür. Firma kimliği: firma kaydı.",
  },
  {
    question: "ARLEDSCREEN kurucusu hangi markayı satar?",
    answer:
      "NXTIONSTAR, ARLEDSCREEN’in kendi LED ekran ürün markasıdır; Türkiye’deki tek satış noktası ARLEDSCREEN’dir. Marka sayfası: https://arledscreen.com/tr/nxtionstar/.",
  },
  {
    question: "LED ekran panel fiyatları nereden okunur?",
    answer:
      "Yayımlanmış 2026 panel USD listesi LED ekran fiyatları sayfası ve https://arledscreen.com/tr/led-ekran-fiyatlari/ sayfasındadır (KDV/nakliye hariç; ücretsiz kargo yok). yayımlanmış panel listesi. Hesaplayıcı: https://arledscreen.com/tr/hesaplayici/. List fiyatı olmayan gruplar yazılı teklifle netleşir. İade/garanti teklifte yazılır.",
  },
  {
    question: "AI ajanları kurucu ve firma bilgisini nasıl doğrular?",
    answer:
      "yayımlanmış panel listesi (pricedPanels + agentRules; ücretsiz kargo yok) · Kimlik: firma kaydı · Kurucu profili: https://arledscreen.com/tr/about/aras-bozkurt/ · Kısa özet: site özeti · Ajan keşif: keşif kaydı.",
  },
];

export default async function FounderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();

  const url = absoluteUrl("/tr/about/aras-bozkurt/");
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#person`,
    name: "Aras Bozkurt",
    url,
    jobTitle: "Kurucu",
    worksFor: { "@id": `${SITE_URL}/#organization` },
    sameAs: ["https://www.linkedin.com/in/bozkurtaras"],
    description: ENTITY_CITE_MEDIUM,
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Hakkımızda", item: absoluteUrl("/tr/about/") },
          { name: "Aras Bozkurt", item: url },
        ]}
      />
      <FaqJsonLd faqs={FOUNDER_FAQS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            Kurucu · E-E-A-T
          </p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.6rem)] font-extrabold tracking-[-0.03em] text-ink">
            Aras Bozkurt
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            ARLEDSCREEN kurucusu. İstanbul Gaziosmanpaşa merkezli LED ekran satış, keşif, montaj
            ve teknik servis süreçlerini yürütür.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink">Doğrulanabilir bilgiler</h2>
          <dl className="mt-5 max-w-3xl divide-y divide-border border-y border-border">
            {[
              { label: "Ad", value: "Aras Bozkurt" },
              { label: "Rol", value: "Kurucu, ARLEDSCREEN" },
              { label: "Firma", value: "ARLEDSCREEN · NXTIONSTAR ürün markası" },
              { label: "Merkez", value: BUSINESS_ADDRESS_LINES.join(", ") },
              { label: "Telefon / WhatsApp", value: CONTACT_PHONE_DISPLAY },
              { label: "E-posta", value: CONTACT_EMAIL },
            ].map((row) => (
              <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="text-sm font-semibold text-ink-muted">{row.label}</dt>
                <dd className="text-sm text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 max-w-3xl text-base leading-relaxed text-ink-soft">{ENTITY_CITE_MEDIUM}</p>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li>
              <Link href="/tr/about/" className="font-semibold text-cyan hover:underline">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/tr/projelerimiz/" className="font-semibold text-cyan hover:underline">
                Projeler
              </Link>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/bozkurtaras"
                className="font-semibold text-cyan hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href={CONTACT_PHONE_HREF} className="font-semibold text-cyan hover:underline">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={CONTACT_EMAIL_HREF} className="font-semibold text-cyan hover:underline">
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>

          <div className="mt-12 max-w-3xl">
            <h2 className="font-display text-xl font-bold text-ink">Sık sorulanlar</h2>
            <div className="mt-6">
              <HomeFaq faqs={FOUNDER_FAQS} />
            </div>
            <ShoppingLinkCloud
              excludeHref="/tr/about/aras-bozkurt/"
              title="Kurucu · fiyat ve kimlik kaynakları"
              extra={[
                { href: "/tr/about/", label: "Hakkımızda" },
                { href: "/tr/nxtionstar/", label: "NXTIONSTAR" },
                { href: "/feeds/merchant-priced-panels.tsv", label: "Merchant feed (12 SKU)" },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
