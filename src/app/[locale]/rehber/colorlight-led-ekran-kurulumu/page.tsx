import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { LED_MODELS, SPEC_LABELS, modelPath, type SpecKey } from "@/content/models";
import { H2, HUB, QaList, SupportJsonLd, SupportShell, type QA } from "@/components/support/SupportKit";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

const PATH = "/rehber/colorlight-led-ekran-kurulumu/";
const H1 = "Colorlight ile LED ekran kurulumu ve yönetimi";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "tr") return {};
  return buildPageMetadata({
    locale: "tr",
    path: PATH,
    title: "Colorlight LED Ekran Kurulumu: LEDVISION ve Kart Ayarı | ARLEDSCREEN",
    description:
      "Colorlight gönderici ve alıcı kart bağlantısı, LEDVISION ile ekran ayarı, sık arızalar. ARLEDSCREEN İstanbul teknik destek: hemen yanıt.",
    hreflangLocales: [],
  });
}

// Values are the datasheet-sourced ("kaynak") specs already on the Colorlight product pages.
const MODELS = LED_MODELS.filter((m) => m.group === "colorlight-kontrolculer");
const KEYS: SpecKey[] = ["ledType", "loadCapacity", "ethernetPorts", "videoInputs"];

/*
 * TODO(SWE/Uzman — Colorlight resmi dokümanından doğrulanmadan yayımlanmaz):
 * - Kısaca kurulum sırası, Bilgisayarı kontrolcüye bağlamak, Alıcı kart ayar dosyası (uzantı),
 *   Ekran bağlantısı ve kayıt, İçerik gönderme → HowTo şeması adımlar doğrulanınca eklenecek.
 * - LEDVISION dışındaki yazılım adları (mobil/bulut) → Uzman'a sorulacak.
 * - SSS: "Colorlight kart ayarı nasıl yapılır?", "Ekran bağlantısı görünmüyor", "Alıcı kart dosyası nasıl kaydedilir?",
 *   "Colorlight kartı NovaStar ile değiştirilebilir mi?" → doğrulanmış metin gelince.
 */
const FAQS: QA[] = [
  {
    question: "LEDVISION ne işe yarar?",
    answer: "LEDVISION, Colorlight gönderici ve alıcı kartlı ekranlarda ekran ayarı ve yayın için kullanılan Colorlight yazılımıdır.",
  },
  {
    question: "X20 ile S20 farkı nedir?",
    answer: "X20 çoklu girişli bir multimedya LED işlemcidir; S20 ise üst işlemci veya bilgisayardan gelen sinyali ekrana taşıyan kompakt bir gönderici karttır.",
    links: [
      { href: "/tr/products/colorlight-kontrolculer/x20/", label: "X20" },
      { href: "/tr/products/colorlight-kontrolculer/s20/", label: "S20" },
    ],
  },
  {
    question: "Colorlight desteği için kime ulaşılır?",
    answer: "ARLEDSCREEN teknik ekibine e-posta veya telefonla ulaşabilirsiniz; servis yanıtı hemen.",
    links: [{ href: HUB.href, label: HUB.label }],
  },
];

export default async function ColorlightGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();
  const crumbs = [
    { name: "Ana Sayfa", path: "/tr/" },
    { name: HUB.label, path: HUB.href },
    { name: "Colorlight", path: `/tr${PATH}` },
  ];
  return (
    <>
      <SupportJsonLd url={absoluteUrl(`/tr${PATH}`)} crumbs={crumbs} faqs={FAQS} />
      <SupportShell eyebrow="Rehber · Colorlight" h1={H1} crumbs={crumbs}>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Colorlight sistemlerde gönderici kart veya işlemci, alıcı kartlara Gigabit Ethernet ile bağlanır; ekran ayarı
          LEDVISION ile yapılır. Diğer kart markaları için{" "}
          <Link href="/tr/rehber/novastar-led-ekran-kurulumu/" className="font-semibold text-cyan hover:underline">
            NovaStar
          </Link>{" "}
          ve{" "}
          <Link href="/tr/rehber/huidu-led-ekran-kurulumu/" className="font-semibold text-cyan hover:underline">
            Huidu
          </Link>{" "}
          rehberlerine, genel adımlar için{" "}
          <Link href="/tr/rehber/led-ekran-kurulumu/" className="font-semibold text-cyan hover:underline">
            LED ekran kurulum rehberine
          </Link>{" "}
          bakın.
        </p>

        <H2 id="modeller">Sitede satılan Colorlight modelleri</H2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {MODELS.map((m) => (
            <div key={m.slug} className="rounded-2xl border border-border p-4 text-sm text-ink-soft">
              <Link href={modelPath(m)} className="font-display font-bold text-cyan hover:underline">
                {m.name}
              </Link>
              <dl className="mt-2 space-y-1">
                {KEYS.filter((key) => m.specs[key]?.src === "kaynak").map((key) => (
                  <div key={key}>
                    <dt className="inline font-semibold text-ink">{SPEC_LABELS[key]}: </dt>
                    <dd className="inline">{m.specs[key]!.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <H2 id="sss">Sık sorulan sorular</H2>
        <QaList items={FAQS} />
      </SupportShell>
    </>
  );
}
