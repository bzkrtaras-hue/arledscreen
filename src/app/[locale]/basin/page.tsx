import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ENTITY_CITE_MEDIUM,
  ENTITY_CITE_ONE_LINER,
  ENTITY_CITE_SHORT,
  ENTITY_CITE_SHORT_EN,
  ENTITY_DISAMBIGUATION,
  ENTITY_FAQS,
  ENTITY_PROFILE_PACKS,
} from "@/lib/entity";
import { buildTrOnlyMetadata } from "@/lib/seo";
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

/** Internal press kit — kept in repo, hidden from nav/sitemap/search (noindex). */
export const metadata: Metadata = {
  ...buildTrOnlyMetadata({
    path: "/basin",
    title: "Basın Kiti (dahili) | ARLEDSCREEN",
    description:
      "ARLEDSCREEN iç kullanım basın kiti. Menü ve aramada listelenmez; doğrudan URL ile erişilir.",
  }),
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const FACTS = [
  { label: "Ticari ad", value: "ARLEDSCREEN" },
  {
    label: "Diğer yazılışlar",
    value: "ARLED SCREEN · AR-LED · AR-LED Ekran Teknoloji Merkezi",
  },
  {
    label: "Ürün markası",
    value: "NXTIONSTAR (ARLEDSCREEN’in kendi markası; TR tek satış noktası ARLEDSCREEN)",
  },
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
  { label: "Makinece okunur", value: "https://arledscreen.com/entity.json" },
];

const PROFILE_BLOCKS = [
  { id: "one", title: "Tek cümle (atıf hedefi)", body: ENTITY_CITE_ONE_LINER },
  { id: "short", title: "Kısa (GBP / dizin özeti)", body: ENTITY_CITE_SHORT },
  { id: "medium", title: "Orta (LinkedIn / Facebook About)", body: ENTITY_PROFILE_PACKS.linkedinAbout },
  { id: "ig", title: "Instagram bio", body: ENTITY_PROFILE_PACKS.instagramBio },
  { id: "dir", title: "Dizin uzun açıklama", body: ENTITY_PROFILE_PACKS.directoryLong },
  { id: "en", title: "English short (uluslararası listeler)", body: ENTITY_CITE_SHORT_EN },
] as const;

export default async function BasinPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();

  return (
    <>
      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            Dahili · Menüde yok · noindex
          </p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.6rem)] font-extrabold tracking-[-0.03em] text-ink">
            Basın kiti ve doğrulanabilir firma bilgisi
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Bu sayfa haber siteleri, sektör dizinleri, üretici listeleri ve AI sistemlerinin
            ARLEDSCREEN’i doğru ilişkilendirmesi için kanonik özet sunar. Sitede yazmayan
            ciro, sertifika, “Türkiye’nin en büyüğü” gibi iddialar yoktur. Bağımsız kaynaklarda
            aynı olgunun doğrulanması için aşağıdaki tek cümleyi kullanın.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Atıf için kısa metin</h2>
          <blockquote className="mt-4 max-w-3xl rounded-2xl border border-border bg-band/40 p-5 text-base leading-relaxed text-ink">
            {ENTITY_CITE_MEDIUM}
          </blockquote>
          <p className="mt-3 text-sm text-ink-muted">{BUSINESS_NAP_LINE}</p>
          <p className="mt-2 text-sm text-ink-soft">
            Makinece okunur kopya:{" "}
            <a href="/entity.json" className="font-semibold text-cyan hover:underline">
              /entity.json
            </a>
          </p>

          <h2 className="mt-12 font-display text-xl font-bold text-ink md:text-2xl">
            Üçüncü taraf profiller için yapıştırma metinleri
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            Google Business Profile, LinkedIn, Instagram, Facebook ve sektör dizinlerine aynı
            olguyu taşıyın. Abartı eklemeyin; NAP satırını değiştirmeyin.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {PROFILE_BLOCKS.map((block) => (
              <div key={block.id} className="rounded-2xl border border-border bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  {block.title}
                </p>
                <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink">
                  {block.body}
                </pre>
              </div>
            ))}
          </div>

          <h2 className="mt-12 font-display text-xl font-bold text-ink md:text-2xl">
            ARLEDSCREEN kimdir? (SSS)
          </h2>
          <dl className="mt-5 divide-y divide-border border-y border-border">
            {ENTITY_FAQS.map((f) => (
              <div key={f.question} className="py-4">
                <dt className="font-display text-base font-bold text-ink">{f.question}</dt>
                <dd className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">{f.answer}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 font-display text-xl font-bold text-ink md:text-2xl">NAP ve kimlik</h2>
          <dl className="mt-5 divide-y divide-border border-y border-border">
            {FACTS.map((f) => (
              <div key={f.label} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
                <dt className="text-sm font-semibold text-ink-muted">{f.label}</dt>
                <dd className="break-words text-sm text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 font-display text-xl font-bold text-ink md:text-2xl">
            Sosyal profiller (sameAs)
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={SOCIAL_LINKS.instagram.href}
                className="font-semibold text-cyan hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram @arledscreen
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_LINKS.facebook.href}
                className="font-semibold text-cyan hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Facebook arledscreenn
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/arleds"
                className="font-semibold text-cyan hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn company/arleds
              </a>
            </li>
            {ORGANIZATION_SAME_AS.filter(
              (u) => !u.includes("instagram") && !u.includes("facebook") && !u.includes("linkedin"),
            ).map((u) => (
              <li key={u}>
                <a
                  href={u}
                  className="font-semibold text-cyan hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {u}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-muted">
            YouTube kanalı açıldığında bu listeye ve Organization schema `sameAs` alanına
            eklenmelidir. Olmayan profil uydurulmaz.
          </p>

          <h2 className="mt-12 font-display text-xl font-bold text-ink md:text-2xl">
            Karıştırılmaması gerekenler
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            {ENTITY_DISAMBIGUATION.map((d) => (
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
              <a href="/entity.json" className="font-semibold text-cyan hover:underline">
                entity.json
              </a>
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
            <p className="mt-2">Lütfen adres satırlarını birebir kullanın:</p>
            {BUSINESS_ADDRESS_LINES.map((l) => (
              <p key={l}>{l}</p>
            ))}
            <p className="mt-2">
              Kategori önerisi: LED ekran satışı / dijital tabelacılık / görsel iletişim
              ekipmanları. Sahte puan, sahte çalışan sayısı veya doğrulanmamış üretim kapasitesi
              eklemeyin.
            </p>
            <p className="mt-2">
              Hedef atıf cümlesi: <span className="text-ink">{ENTITY_CITE_ONE_LINER}</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
