import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { H2, HUB, IDENTITY, QaList, SupportJsonLd, SupportShell, WARRANTY, type QA } from "@/components/support/SupportKit";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "tr" }];
}

const PATH = "/teknik-destek/";
const H1 = "LED Ekran Teknik Destek Merkezi";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "tr") return {};
  return buildPageMetadata({
    locale: "tr",
    path: PATH,
    title: "LED Ekran Teknik Destek İstanbul | Kontrol Kartı, Yazılım | ARLEDSCREEN",
    description:
      "NovaStar, Huidu, Colorlight kart ayarı, piksel konfigürasyonu, bakım ve yazılım desteği. 2 yıl garanti + 5 yıl ücretsiz teknik servis. Servis yanıtı hemen.",
    hreflangLocales: [],
  });
}

const L = {
  novastar: { href: "/tr/rehber/novastar-led-ekran-kurulumu/", label: "NovaStar kurulum rehberi" },
  novastarP: { href: "/tr/products/novastar-kontrolculer/", label: "NovaStar kontrolcüler" },
  huidu: { href: "/tr/rehber/huidu-led-ekran-kurulumu/", label: "Huidu kurulum rehberi" },
  huiduP: { href: "/tr/products/huidu-kontrol-kartlari/", label: "Huidu kontrol kartları" },
  colorlight: { href: "/tr/rehber/colorlight-led-ekran-kurulumu/", label: "Colorlight kurulum rehberi" },
  colorlightP: { href: "/tr/products/colorlight-kontrolculer/", label: "Colorlight kontrolcüler" },
  piksel: { href: "/tr/teknik-destek/piksel-konfigurasyonu/", label: "Piksel konfigürasyonu" },
  bakim: { href: "/tr/rehber/led-ekran-omru-ve-bakim/", label: "LED ekran ömrü ve bakım" },
  servis: { href: "/tr/led-ekran-servis/", label: "LED ekran servis" },
  tamir: { href: "/tr/led-ekran-tamiri/", label: "LED ekran tamiri" },
  kurulum: { href: "/tr/rehber/led-ekran-kurulumu/", label: "LED ekran kurulum rehberi" },
  lcd: { href: "/tr/products/lcd-ekran/", label: "LCD ekran" },
  kiosk: { href: "/tr/products/kiosk/", label: "Kiosk" },
  menuboard: { href: "/tr/products/menuboard/", label: "Menuboard" },
};

const SECTIONS: { id: string; title: string; items: QA[] }[] = [
  {
    id: "kontrol-karti",
    title: "Kontrol kartı desteği: NovaStar · Huidu · Colorlight",
    items: [
      {
        question: "NovaStar kart ayarı için nereden başlamalıyım?",
        answer: "Gönderici ve alıcı kart bağlantısı, NovaLCT ile ekran ayarı ve ayar dosyası NovaStar rehberinde adım adım anlatılır.",
        links: [L.novastar, L.novastarP],
      },
      {
        question: "Huidu kartımı nasıl yapılandırırım?",
        answer: "HDPlayer ve LedArt ile kart bağlantısı, tarama dosyası ve içerik gönderme Huidu rehberindedir.",
        links: [L.huidu, L.huiduP],
      },
      {
        question: "Colorlight kontrolcü desteği veriyor musunuz?",
        answer: "Evet. Sitede satılan Colorlight X20, X40m, VX20 ve S20 için kurulum ve yapılandırma desteği veriyoruz.",
        links: [L.colorlight, L.colorlightP],
      },
    ],
  },
  {
    id: "piksel",
    title: "Piksel aralığına göre konfigürasyon",
    items: [
      {
        question: "Ekranımın piksel aralığına göre konfigürasyon desteği alabilir miyim?",
        answer: "Evet. Sitede listelenen her piksel aralığı için çözünürlük, haritalama, renk ve parlaklık eşitleme ve modül değişimi sonrası ayar desteği veriyoruz.",
        links: [L.piksel],
      },
    ],
  },
  {
    id: "yazilim",
    title: "Yazılım desteği",
    items: [
      {
        question: "Hangi yazılımlarda destek veriyorsunuz?",
        answer: "NovaStar için NovaLCT, ViPlex ve VNNOX; Huidu için HDPlayer ve LedArt; Colorlight için LEDVISION.",
        links: [L.novastar, L.huidu, L.colorlight],
      },
      {
        question: "Yazılım sorunlarında nasıl destek alırım?",
        answer: "Telefon ve WhatsApp üzerinden hızlı destek veriyoruz; servis yanıtı hemen.",
      },
    ],
  },
  {
    id: "bakim",
    title: "Bakım ve periyodik kontrol",
    items: [
      {
        question: "LED ekran bakımı nasıl yapılır?",
        answer: "Periyodik kontrol listesi, ölü piksel ve ömür bilgisi bakım rehberindedir; servis hizmeti için servis sayfasına bakın.",
        links: [L.bakim, L.servis],
      },
      {
        question: "Bakım sözleşmesi var mı?",
        answer: "Ayrı bir bakım sözleşmesi yoktur; 2 yıl garanti ve 5 yıl ücretsiz teknik servis sunuyoruz.",
        links: [L.servis],
      },
    ],
  },
  {
    id: "ariza",
    title: "Arıza ve servis talebi",
    items: [
      {
        question: "Arıza bildirirken neleri paylaşmalıyım?",
        answer: "Ekran tipi, piksel aralığı, kontrol kartı markası ve modeli, arızanın fotoğrafı veya videosu ve ilçe bilgisi. Talebi e-posta veya telefonla iletebilirsiniz.",
        links: [L.tamir],
      },
      {
        question: "Başka firmanın kurduğu ekrana destek veriyor musunuz?",
        answer: "Evet. Başka firmaların kurduğu ekranlara ve yaygın kontrol kartı markalarına da destek veriyoruz; tamir hizmetimiz LCD, kiosk ve menuboard dahil her ekran tipini kapsar.",
        links: [L.tamir],
      },
    ],
  },
  {
    id: "lcd-kiosk",
    title: "LCD, kiosk ve menuboard desteği",
    items: [
      {
        question: "LCD, kiosk ve menuboard tamiri yapıyor musunuz?",
        answer: "Evet. LED ekranın yanında LCD, kiosk ve menuboard tamiri de yapıyoruz; fiyat keşif sonrası yazılı teklifle verilir.",
        links: [L.tamir, L.lcd, L.kiosk, L.menuboard],
      },
    ],
  },
  {
    id: "garanti",
    title: "Garanti ve servis kapsamı",
    items: [
      {
        question: "Garanti ve ücretsiz teknik servis süresi nedir?",
        answer: `${WARRANTY}.`,
        links: [L.servis],
      },
      {
        question: "Teknik destek talebine ne kadar sürede dönüyorsunuz?",
        answer: "Servis yanıtı hemen.",
      },
      {
        question: "Garanti dışı destek ücreti nasıl belirlenir?",
        answer: "Keşif sonrası yazılı teklifle belirlenir.",
        links: [L.tamir],
      },
    ],
  },
];

const ALL = SECTIONS.flatMap((s) => s.items);

export default async function TeknikDestekPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();
  const crumbs = [
    { name: "Ana Sayfa", path: "/tr/" },
    { name: HUB.label, path: HUB.href },
  ];
  return (
    <>
      <SupportJsonLd url={absoluteUrl(`/tr${PATH}`)} crumbs={crumbs} faqs={ALL} serviceType="LED ekran teknik destek" />
      <SupportShell eyebrow="Teknik destek" h1={H1} crumbs={crumbs}>
        <p className="mt-3 leading-relaxed text-ink-soft">
          {IDENTITY} Kontrol kartı ayarı, piksel konfigürasyonu, bakım ve yazılım desteğini kendi ekibimiz verir; servis
          yanıtı hemen. 15 yıllık sektör deneyimi ve 1000&apos;den fazla proje.
        </p>
        {SECTIONS.map((s) => (
          <div key={s.id}>
            <H2 id={s.id}>{s.title}</H2>
            <QaList items={s.items} />
          </div>
        ))}
      </SupportShell>
    </>
  );
}
