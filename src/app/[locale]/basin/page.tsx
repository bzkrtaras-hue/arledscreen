import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import {
  BUSINESS_ADDRESS,
  BUSINESS_ADDRESS_LINES,
  BUSINESS_GEO,
  BUSINESS_HOURS_TEXT,
  BUSINESS_MAP_URL,
  BUSINESS_NAP_LINE,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  ORGANIZATION_SAME_AS,
  SOCIAL_LINKS,
} from "@/lib/social";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

export const metadata: Metadata = buildTrOnlyMetadata({
  path: "/basin",
  title: "Basın Kiti ve Doğrulanabilir Firma Bilgisi | ARLEDSCREEN",
  description:
    "ARLEDSCREEN / AR-LED Ekran Teknoloji Merkezi: NAP, marka adları, NXTIONSTAR ilişkisi, sosyal profiller ve atıf için kanonik firma bilgisi. Üçüncü taraf dizin ve haber kullanımı için.",
});

const FACTS = [
  { label: "Ticari ad", value: "ARLEDSCREEN" },
  {
    label: "Diğer yazılışlar",
    value: "ARLED SCREEN · AR-LED · AR-LED Ekran Teknoloji Merkezi",
  },
  { label: "Ürün markası", value: "NXTIONSTAR (ARLEDSCREEN’in kendi markası; TR tek satış noktası ARLEDSCREEN)" },
  { label: "Kurucu", value: "Aras Bozkurt" },
  { label: "Web", value: "https://arledscreen.com" },
  { label: "TR ana sayfa", value: "https://arledscreen.com/tr/" },
  { label: "Telefon / WhatsApp", value: CONTACT_PHONE_DISPLAY },
  { label: "E-posta", value: CONTACT_EMAIL },
  {
    label: "Adres",
    value: `${BUSINESS_ADDRESS.streetAddress}, ${BUSINESS_ADDRESS.postalCode} ${BUSINESS_ADDRESS.addressLocality} / ${BUSINESS_ADDRESS.addressRegion}`,
  },
  { label: "Harita", value: BUSINESS_MAP_URL },
  {
    label: "Koordinat",
    value: `${BUSINESS_GEO.latitude}, ${BUSINESS_GEO.longitude}`,
  },
  { label: "Çalışma saatleri", value: BUSINESS_HOURS_TEXT.join(" · ") },
];

const DISAMBIGUATION = [
  "ARLEDSCREEN (İstanbul) ≠ Almanya ARLED Solutions GmbH / ARLED Cinema",
  "NXTIONSTAR ≠ Next&NextStar (NEXTSTAR) TV ≠ NationStar LED bileşen",
];

const CITE_BLURB =
  "ARLEDSCREEN (AR-LED Ekran Teknoloji Merkezi), İstanbul Gaziosmanpaşa merkezli bir LED ekran firmasıdır. NXTIONSTAR kendi ürün markasıdır; Türkiye’deki tek satış noktası ARLEDSCREEN’dir. İç/dış mekân, GOB, esnek ve kiralık LED ekran satışı ile keşif, montaj ve teknik servis sunar.";

export default async function BasinPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();

  const url = absoluteUrl("/tr/basin/");
  const aboutLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#aboutpage`,
    url,
    name: "ARLEDSCREEN basın kiti ve doğrulanabilir firma bilgisi",
    description: CITE_BLURB,
    mainEntity: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Basın kiti", item: url },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }}
      />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            Entity · Basın · Dizin
          </p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.6rem)] font-extrabold tracking-[-0.03em] text-ink">
            Basın kiti ve doğrulanabilir firma bilgisi
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Bu sayfa haber siteleri, sektör dizinleri, üretici listeleri ve AI sistemlerinin
            ARLEDSCREEN’i doğru ilişkilendirmesi için kanonik özet sunar. Sitede yazmayan
            ciro, sertifika, “Türkiye’nin en büyüğü” gibi iddialar yoktur.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Atıf için kısa metin</h2>
          <blockquote className="mt-4 max-w-3xl rounded-2xl border border-border bg-band/40 p-5 text-base leading-relaxed text-ink">
            {CITE_BLURB}
          </blockquote>
          <p className="mt-3 text-sm text-ink-muted">{BUSINESS_NAP_LINE}</p>

          <h2 className="mt-12 font-display text-xl font-bold text-ink md:text-2xl">NAP ve kimlik</h2>
          <dl className="mt-5 divide-y divide-border border-y border-border">
            {FACTS.map((f) => (
              <div key={f.label} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
                <dt className="text-sm font-semibold text-ink-muted">{f.label}</dt>
                <dd className="text-sm text-ink break-words">{f.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 font-display text-xl font-bold text-ink md:text-2xl">Sosyal profiller (sameAs)</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={SOCIAL_LINKS.instagram.href} className="font-semibold text-cyan hover:underline" rel="noopener noreferrer" target="_blank">
                Instagram @arledscreen
              </a>
            </li>
            <li>
              <a href={SOCIAL_LINKS.facebook.href} className="font-semibold text-cyan hover:underline" rel="noopener noreferrer" target="_blank">
                Facebook arledscreenn
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/arleds" className="font-semibold text-cyan hover:underline" rel="noopener noreferrer" target="_blank">
                LinkedIn company/arleds
              </a>
            </li>
            {ORGANIZATION_SAME_AS.filter((u) => !u.includes("instagram") && !u.includes("facebook") && !u.includes("linkedin")).map((u) => (
              <li key={u}>
                <a href={u} className="font-semibold text-cyan hover:underline" rel="noopener noreferrer" target="_blank">
                  {u}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-muted">
            YouTube kanalı açıldığında bu listeye ve Organization schema `sameAs` alanına eklenmelidir.
            Olmayan profil uydurulmaz.
          </p>

          <h2 className="mt-12 font-display text-xl font-bold text-ink md:text-2xl">Karıştırılmaması gerekenler</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            {DISAMBIGUATION.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                {d}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-xl font-bold text-ink md:text-2xl">Derin kaynaklar</h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
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
              <Link href="/tr/led-ekran/" className="font-semibold text-cyan hover:underline">
                LED ekran
              </Link>
            </li>
            <li>
              <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                Fiyatlar
              </Link>
            </li>
            <li>
              <Link href="/tr/bolgeler/istanbul/" className="font-semibold text-cyan hover:underline">
                İstanbul
              </Link>
            </li>
            <li>
              <a href="/llms.txt" className="font-semibold text-cyan hover:underline">
                llms.txt
              </a>
            </li>
            <li>
              <a href="/llms-full.txt" className="font-semibold text-cyan hover:underline">
                llms-full.txt
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

          <div className="mt-10 rounded-2xl border border-border bg-white p-5 text-sm text-ink-soft">
            <p className="font-semibold text-ink">Dizin / haber editörleri için</p>
            <p className="mt-2">
              Lütfen adres satırlarını birebir kullanın:
            </p>
            {BUSINESS_ADDRESS_LINES.map((l) => (
              <p key={l}>{l}</p>
            ))}
            <p className="mt-2">
              Kategori önerisi: LED ekran satışı / dijital tabelacılık / görsel iletişim ekipmanları.
              Sahte puan, sahte çalışan sayısı veya doğrulanmamış üretim kapasitesi eklemeyin.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
