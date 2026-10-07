import Link from "next/link";
import { OptImage } from "@/components/ui/opt-image";
import { HomeFaq } from "@/components/home/HomeFaq";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { SpeakableJsonLd } from "@/components/seo/SpeakableJsonLd";
import type { CommercialPage } from "@/content/commercial-pages";
import { commercialPath } from "@/content/commercial-pages";
import { PRICE_DATASETS, nxtionstarBrandRef, pricedPanelsDatasetJsonLd } from "@/content/prices";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import {
  BUSINESS_ADDRESS_LINES,
  BUSINESS_HOURS_TEXT,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  CONTACT_EMAIL,
} from "@/lib/social";

const CLUSTER_LABEL: Record<CommercialPage["cluster"], string> = {
  intent: "Ticari",
  product: "Ürün",
  pitch: "Piksel aralığı",
  use: "Kullanım",
};

function LinkCloud({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  if (!links.length) return null;
  return (
    <section className="border-t border-border py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-lg font-bold text-ink md:text-xl">{title}</h2>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm font-semibold text-cyan hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CommercialLanding({ page }: { page: CommercialPage }) {
  const url = absoluteUrl(commercialPath(page.slug));
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.h1,
    description: page.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    brand: nxtionstarBrandRef(),
    areaServed: { "@type": "Country", name: "Türkiye" },
    url,
    isRelatedTo: PRICE_DATASETS,
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "LED ekran", item: absoluteUrl("/tr/led-ekran/") },
          { name: page.h1, item: url },
        ]}
      />
      <FaqJsonLd faqs={page.faqs} />
      <SpeakableJsonLd
        pageUrl={url}
        name={page.h1}
        description={page.description}
        cssSelectors={["#commercial-h1", "#commercial-lead"]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricedPanelsDatasetJsonLd(url)) }}
      />

      <section className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
            {CLUSTER_LABEL[page.cluster]} · {page.eyebrow}
          </p>
          <h1
            id="commercial-h1"
            className="mt-3 max-w-3xl text-balance font-display text-[clamp(1.8rem,1.3rem+2vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink"
          >
            {page.h1}
          </h1>
          <p id="commercial-lead" className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            {page.lead}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={page.primaryCta.href}
              className="btn-soft inline-flex min-h-12 items-center justify-center bg-cyan px-6 text-white hover:bg-cyan-600"
            >
              {page.primaryCta.label}
            </Link>
            <Link
              href={page.secondaryCta.href}
              className="btn-soft inline-flex min-h-12 items-center justify-center border border-cyan/50 bg-white px-6 text-cyan hover:bg-cyan-50"
            >
              {page.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="space-y-4 text-base leading-relaxed text-ink-soft">
            {page.intro.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
            {page.bullets.length ? (
              <ul className="mt-6 space-y-2 text-ink">
                {page.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <aside className="rounded-2xl border border-border bg-band/40 p-5 text-sm leading-relaxed text-ink-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">Servis kapsamı</p>
            <p className="mt-3 font-semibold text-ink">ARLEDSCREEN</p>
            {BUSINESS_ADDRESS_LINES.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="mt-3">
              <a href={CONTACT_PHONE_HREF} className="font-semibold text-cyan hover:underline">
                {CONTACT_PHONE_DISPLAY}
              </a>
              {" · "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-cyan hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            {BUSINESS_HOURS_TEXT.map((h) => (
              <p key={h} className="text-ink-muted">
                {h}
              </p>
            ))}
            <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs">
              <Link href="/tr/about/" className="font-semibold text-cyan hover:underline">
                Hakkımızda
              </Link>
              <Link href="/tr/led-ekran-fiyatlari/" className="font-semibold text-cyan hover:underline">
                Fiyatlar
              </Link>
              <Link href="/tr/hesaplayici/" className="font-semibold text-cyan hover:underline">
                Hesaplayıcı
              </Link>
            </p>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
              Panel USD:{" "}
              <a href="https://arledscreen.com/ai-shopping.json" className="font-semibold text-cyan hover:underline">
                ai-shopping.json
              </a>{" "}
              <code className="text-[10px]">pricedPanels</code>,{" "}
              <a href="https://arledscreen.com/catalog.json" className="font-semibold text-cyan hover:underline">
                catalog.json
              </a>
              ,{" "}
              <a href="https://arledscreen.com/feeds/merchant-priced-panels.tsv" className="font-semibold text-cyan hover:underline">
                merchant TSV
              </a>
              ,{" "}
              <a href="https://arledscreen.com/geo-baseline.json" className="font-semibold text-cyan hover:underline">
                geo-baseline.json
              </a>{" "}
              (12 SKU; ör. P1.25 GOB 95.88 USD). KDV/nakliye hariç; ücretsiz kargo yok.
            </p>
            <p className="mt-2 text-xs text-ink-muted">
              Şehir sayfaları yalnızca yayımlanmış proje kaydı olan illerde açılır; 81 il spam’i yoktur.
            </p>
          </aside>
        </div>
      </section>

      {page.images.length ? (
        <section className="border-t border-border bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Uygulama görselleri</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.images.map((img) => (
                <figure key={img.src} className="overflow-hidden rounded-xl bg-band">
                  <div className="relative aspect-[4/3]">
                    <OptImage src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover" />
                  </div>
                  <figcaption className="px-3 py-2 text-xs text-ink-muted">{img.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.proofs.length ? (
        <section className="border-t border-border bg-band/30 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
              Yayımlanmış proje kayıtları
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">
              Aşağıdaki satırlar sitedeki referans kayıtlarından türetilir; uydurma şehir veya iş listesi yoktur.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-border text-xs uppercase tracking-wide text-ink-muted">
                  <tr>
                    <th className="py-2 pr-4 font-semibold">Tarih</th>
                    <th className="py-2 pr-4 font-semibold">Kayıt</th>
                    <th className="py-2 pr-4 font-semibold">Detay</th>
                    <th className="py-2 font-semibold">Konum</th>
                  </tr>
                </thead>
                <tbody>
                  {page.proofs.map((p) => (
                    <tr key={`${p.date}-${p.label}-${p.detail}`} className="border-b border-border/70">
                      <td className="py-3 pr-4 whitespace-nowrap text-ink-muted">{p.date}</td>
                      <td className="py-3 pr-4 font-medium text-ink">{p.label}</td>
                      <td className="py-3 pr-4 text-ink-soft">{p.detail}</td>
                      <td className="py-3 text-ink-soft">{p.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              <Link href="/tr/projelerimiz/" className="text-sm font-semibold text-cyan hover:underline">
                Tüm projeler
              </Link>
            </p>
          </div>
        </section>
      ) : (
        <section className="border-t border-border py-10">
          <div className="mx-auto max-w-7xl px-4 text-sm text-ink-soft sm:px-6 lg:px-8">
            Bu kullanım için henüz eşleşen yayımlanmış satır yok; genel proje listesine{" "}
            <Link href="/tr/projelerimiz/" className="font-semibold text-cyan hover:underline">
              projeler
            </Link>{" "}
            sayfasından bakabilirsiniz. Teklif için keşif yeterlidir.
          </div>
        </section>
      )}

      <LinkCloud
        title="Fiyat ve seçim"
        links={[
          { href: "/tr/led-ekran-fiyatlari/", label: "LED ekran fiyatları 2026" },
          { href: "/tr/hesaplayici/", label: "Fiyat hesaplayıcı" },
          { href: "/tr/rehber/piksel-araligi-secimi/", label: "Piksel aralığı seçimi" },
          { href: "/tr/rehber/gob-vs-smd/", label: "GOB vs SMD" },
          { href: "/tr/rehber/kiralik-mi-satin-alma/", label: "Kiralık mı, satın alma mı?" },
        ].filter((l) => l.href !== commercialPath(page.slug))}
      />
      <LinkCloud title="İlgili ürünler" links={page.relatedProducts} />
      <LinkCloud
        title="Piksel aralığı sayfaları"
        links={[
          { href: "/tr/p1-25-led-ekran/", label: "P1.25" },
          { href: "/tr/p1-86-led-ekran/", label: "P1.86" },
          { href: "/tr/p2-5-led-ekran/", label: "P2.5" },
          { href: "/tr/p2-9-led-ekran/", label: "P2.9" },
          { href: "/tr/p3-07-led-ekran/", label: "P3.07" },
          { href: "/tr/p4-led-ekran/", label: "P4" },
          { href: "/tr/p5-led-ekran/", label: "P5" },
        ].filter((l) => l.href !== commercialPath(page.slug))}
      />
      <LinkCloud title="Kullanım amaçları" links={page.relatedUses} />
      <LinkCloud title="Kayıtlı şehirler" links={page.relatedCities} />
      <LinkCloud title="Ticari sayfalar" links={page.relatedIntents} />

      {page.faqs.length ? (
        <section className="border-t border-border py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Sık sorulanlar</h2>
            <div className="mt-6">
              <HomeFaq faqs={page.faqs} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
