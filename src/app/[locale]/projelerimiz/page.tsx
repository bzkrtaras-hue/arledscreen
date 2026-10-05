import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ClipboardList, Hammer, Wrench } from "lucide-react";
import { FeaturedReferences } from "@/components/home/FeaturedReferences";
import { QuoteSplit } from "@/components/home/QuoteSplit";
import { OptImage } from "@/components/ui/opt-image";
import { AllReferencesNote } from "@/components/projects/AllReferencesNote";
import { ReferencesGrid } from "@/components/projects/ReferencesGrid";
import { CompletedProjectsGallery } from "@/components/projects/CompletedProjectsGallery";
import { ProjectVideos } from "@/components/projects/ProjectVideos";
import { buildTrOnlyMetadata } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { PROJECT_VIDEOS, videoObjectJsonLd } from "@/content/videos";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

export const metadata: Metadata = buildTrOnlyMetadata({
  path: "/projelerimiz",
  title: "LED Ekran Projeleri ve Referanslar | ARLEDSCREEN",
  description:
    "ARLEDSCREEN tarafından tamamlanan LED ekran projeleri: belediye, kafe, mağaza, etkinlik ve dış mekân kurulumları. Ölçü, piksel aralığı, konum ve tarih bilgileriyle.",
});

export default async function ProjelerimizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": PROJECT_VIDEOS.map((v) => videoObjectJsonLd(v, absoluteUrl("/tr/projelerimiz/"), absoluteUrl, `${SITE_URL}/#organization`)),
          }),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "Projeler", item: absoluteUrl("/tr/projelerimiz/") },
        ]}
      />
      {/* Full-bleed photo banner with centred title */}
      <section className="relative isolate overflow-hidden bg-navy">
        <OptImage
          src="/projects/outdoor-led-mapping.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-50"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0B1B33]/70 to-[#0B1B33]/90" aria-hidden />
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9CC0F5]">Projeler ve referanslar</p>
          <h1 className="mt-3 text-balance font-display text-[clamp(1.9rem,1.3rem+2.4vw,3rem)] font-extrabold tracking-[-0.03em] text-white">
            Yakın Süreçte Tamamlanan Projeler
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
            Yakın süreçte tamamladığımız projelerden bir seçki.
          </p>
        </div>
      </section>

      <Section
        id="videolar"
        eyebrow="Sahadan"
        title="Videolar"
        description="Kurulumlarımızdan kısa video kayıtları. İlk video görünür olduğunda sessiz oynar; diğerlerini oynatmak için dokunun."
        className="prose-seo"
      >
        <ProjectVideos />
      </Section>

      <Section eyebrow="Saha" title="Uygulama fotoğrafları" className="bg-band prose-seo">
        <CompletedProjectsGallery locale="tr" />
      </Section>

      <Section
        eyebrow="Yakın süreçte tamamlananlar"
        title="Öne çıkan projeler"
        description="Yakın süreçte tamamladığımız projelerden bir seçki."
        className="prose-seo"
      >
        <FeaturedReferences limit={7} showAllLink={false} ctaHref="#liste" ctaLabel="Diğer projeleri görün" />
      </Section>

      {/* Dark icon strip */}
      <section className="bg-foot py-10 text-white" aria-label="Proje sürecimiz">
        <ul className="mx-auto grid max-w-5xl gap-8 px-4 text-center sm:grid-cols-3 sm:px-6">
          {[
            { Icon: ClipboardList, t: "Keşif ve ön proje", d: "İzleme mesafesi, montaj yüzeyi ve altyapı incelemesi" },
            { Icon: Hammer, t: "Montaj ve devreye alma", d: "Taşıyıcı sistem, kablolama, kalibrasyon ve test" },
            { Icon: Wrench, t: "Teknik servis", d: "Bakım, arıza ve yedek parça talepleri" },
          ].map(({ Icon, t, d }) => (
            <li key={t}>
              <Icon className="mx-auto h-9 w-9 text-[#9CC0F5]" strokeWidth={1.7} aria-hidden />
              <p className="mt-3 font-display text-lg font-bold text-white">{t}</p>
              <p className="mt-1 text-sm text-white/70">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <Section id="liste" eyebrow="Seçki" title="Proje listesi" description="Yakın süreçte tamamladığımız projelerden bir seçki; tarih, firma veya proje adı, kapsam ve konum bilgisiyle." className="prose-seo">
        <ReferencesGrid locale="tr" />
        <AllReferencesNote />
      </Section>

      <section className="bg-band py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <QuoteSplit title="Benzer bir proje mi planlıyorsunuz?" />
        </div>
      </section>
    </>
  );
}
