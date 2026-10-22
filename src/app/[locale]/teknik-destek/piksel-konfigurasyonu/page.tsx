import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { LED_MODELS, modelPath } from "@/content/models";
import { H2, HUB, QaList, SupportJsonLd, SupportShell, WARRANTY, type QA } from "@/components/support/SupportKit";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

const PATH = "/teknik-destek/piksel-konfigurasyonu/";
const H1 = "Piksel aralığına göre LED ekran konfigürasyonu";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "tr") return {};
  return buildPageMetadata({
    locale: "tr",
    path: PATH,
    title: "LED Ekran Piksel Konfigürasyonu ve Kalibrasyonu | ARLEDSCREEN",
    description:
      "P1.25'ten P8'e her piksel aralığı için modül, kabin ve kontrol kartı konfigürasyonu. İstanbul'da kalibrasyon ve ayar desteği; servis yanıtı hemen.",
    hreflangLocales: [],
  });
}

// Only panels the site lists; values come from the model spec sheets in models.ts (no new numbers here).
const sheet = (v?: { value: string; src: string }) => (v && v.src === "kaynak" ? v.value : "—");
const PANELS = LED_MODELS.filter((m) => m.kind !== "kontrol");

const FAQS: QA[] = [
  {
    question: "Ekran çözünürlüğü nasıl hesaplanır?",
    answer: "Ekran genişliği ve yüksekliği (mm) piksel aralığına (mm) bölünür; sonuç yatay ve dikey piksel sayısıdır.",
  },
  {
    question: "Kaç m²'de ek kontrol kartı gerekir?",
    answer: "Fiyat hesabımızda 10 m² üzerinde her başlayan 10 m² için ek kontrol kartı öngörülür.",
    links: [{ href: "/tr/led-ekran-fiyatlari/", label: "LED ekran fiyatları" }],
  },
  {
    question: "Yeni modül takınca renk farkı neden olur?",
    answer: "Farklı üretim partisinden modül veya LED'lerin zamanla eşit olmayan yıpranması renk ve parlaklık farkı yaratır; renk ve parlaklık eşitleme ile giderilir.",
    links: [{ href: "/tr/led-ekran-tamiri/", label: "LED ekran tamiri" }],
  },
  {
    question: "Konfigürasyon desteği garanti kapsamında mı?",
    answer: `${WARRANTY}.`,
    links: [{ href: "/tr/led-ekran-servis/", label: "LED ekran servis" }],
  },
  {
    question: "LED ekran kalibrasyonu nedir?",
    answer: "Kalibrasyon, ekran yüzeyinde renk ve parlaklık eşitlemedir; modül değişimi sonrası da yapılır.",
  },
  // TODO(Uzman/föy): modül piksel matrisi, tarama oranı ve kart başı yük föyde olmayan modeller için doldurulmaz.
];

export default async function PikselKonfigurasyonuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();
  const crumbs = [
    { name: "Ana Sayfa", path: "/tr/" },
    { name: HUB.label, path: HUB.href },
    { name: "Piksel konfigürasyonu", path: `/tr${PATH}` },
  ];
  return (
    <>
      <SupportJsonLd
        url={absoluteUrl(`/tr${PATH}`)}
        crumbs={crumbs}
        faqs={FAQS}
        serviceType="LED ekran konfigürasyon ve kalibrasyon"
      />
      <SupportShell eyebrow="Teknik destek" h1={H1} crumbs={crumbs}>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Konfigürasyon; ekran çözünürlüğü, modül ve kabin haritalama, kontrol kartı ayarı ve renk ve parlaklık eşitlemeyi
          kapsar. Piksel aralığı seçimi için{" "}
          <Link href="/tr/rehber/piksel-araligi-secimi/" className="font-semibold text-cyan hover:underline">
            piksel aralığı seçimi rehberine
          </Link>{" "}
          bakın.
        </p>

        <H2 id="tablo">Sitede listelenen modeller</H2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm text-ink-soft">
            <thead className="text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="py-2 pr-3">Model</th>
                <th className="py-2 pr-3">Piksel aralığı</th>
                <th className="py-2 pr-3">Modül ölçüsü</th>
                <th className="py-2">Modül çözünürlüğü</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {PANELS.map((m) => (
                <tr key={`${m.group}/${m.slug}`}>
                  <td className="py-2 pr-3">
                    <Link href={modelPath(m)} className="font-semibold text-cyan hover:underline">
                      {m.name.replace(/^NXTIONSTAR /, "").replace(/ LED Modül$/, "")}
                    </Link>
                  </td>
                  <td className="py-2 pr-3">{sheet(m.specs.pitch)}</td>
                  <td className="py-2 pr-3">{sheet(m.specs.moduleSize)}</td>
                  <td className="py-2">{sheet(m.specs.matrix)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-ink-muted">
          Değerler ürün sayfalarındaki teknik föylerden alınmıştır. Daha ince seçenekler (ör. P0.9) teknik föy ve yazılı
          teklifle verilir.
        </p>

        <H2 id="sss">Sık sorulan sorular</H2>
        <QaList items={FAQS} />
      </SupportShell>
    </>
  );
}
