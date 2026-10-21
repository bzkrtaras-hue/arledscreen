import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

/**
 * /tr/kvkk/ — KVKK m. 10 aydınlatma metni (teklif ve keşif formları).
 * Kaynak: seo/briefs/2026-10-22-tr-kvkk-aydinlatma.md (Selin).
 * DOĞRULA işaretli noktalar uydurulmadı; HTML yorumu olarak bırakıldı.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "tr" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "tr") return {};
  const base = buildPageMetadata({
    locale: "tr" as Locale,
    path: "/kvkk/",
    title: "KVKK Aydınlatma Metni | ARLEDSCREEN",
    description:
      "ARLEDSCREEN teklif ve keşif formunda paylaştığınız kişisel verilerin nasıl işlendiğini ve 6698 sayılı Kanun kapsamındaki haklarınızı açıklar.",
    hreflangLocales: ["tr"],
  });
  // Geçici: DOĞRULA maddeleri kapanana kadar indekslenmesin.
  return { ...base, robots: { index: false, follow: true } };
}

/** Görünmez HTML yorumu: <!-- DOĞRULA: ... --> */
function Dogrula({ note }: { note: string }) {
  return <span hidden dangerouslySetInnerHTML={{ __html: `<!-- DOĞRULA: ${note} -->` }} />;
}

const h2 = "font-display text-lg font-bold text-ink";
const ul = "mt-2 list-disc space-y-1 pl-5";
const mail = "font-semibold text-cyan hover:underline";

export default async function KvkkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();
  const pageUrl = absoluteUrl("/tr/kvkk/");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Ana Sayfa", item: absoluteUrl("/tr/") },
          { name: "KVKK Aydınlatma Metni", item: pageUrl },
        ]}
      />
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Sayfa yolu" className="text-[13px] text-ink-muted">
            <Link href="/tr/" className="inline-flex min-h-11 items-center hover:text-cyan">
              Ana Sayfa
            </Link>{" "}
            / <span className="text-ink-soft">KVKK Aydınlatma Metni</span>
          </nav>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">KVKK</p>
          <h1
            id="kvkk-h1"
            className="mt-2 font-display text-[clamp(1.7rem,1.2rem+2vw,2.6rem)] font-bold leading-tight text-ink"
          >
            Kişisel Verilerin Korunması Aydınlatma Metni
          </h1>
          <p id="kvkk-lead" className="mt-3 leading-relaxed text-ink-soft">
            Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu&apos;nun (&quot;KVKK&quot;) 10.
            maddesi uyarınca, teklif ve keşif formlarımız aracılığıyla paylaştığınız kişisel verilerin
            nasıl işlendiği konusunda sizi bilgilendirmek amacıyla hazırlanmıştır.
          </p>

          <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-ink-soft">
            <section>
              <h2 className={h2}>1. Veri sorumlusu</h2>
              <p className="mt-2">
                <strong className="text-ink">ARLEDSCREEN</strong>
                <Dogrula note="DOĞRULA-1: ticari unvan / şahıs şirketiyse ad soyad, MERSİS veya vergi no" />
                <br />
                Adres: Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa/İstanbul
                <br />
                E-posta:{" "}
                <a href="mailto:arled@arledscreen.com" className={mail}>
                  arled@arledscreen.com
                </a>
              </p>
            </section>

            <section>
              <h2 className={h2}>2. İşlenen kişisel veriler</h2>
              <ul className={ul}>
                <li><strong className="text-ink">Kimlik:</strong> ad soyad</li>
                <li><strong className="text-ink">İletişim:</strong> iş e-posta adresi, telefon numarası</li>
                <li><strong className="text-ink">Mesleki bilgi:</strong> otel adı, görev/unvan</li>
                <li>
                  <strong className="text-ink">İşlem güvenliği:</strong> form gönderim tarihi ve saati (IP adresiniz kaydedilmez)
                  {/* IP: form (ShortQuoteForm) talebi WhatsApp/e-posta taslağı olarak açar, sitede saklamaz; IP kaydı yok. */}
                </li>
              </ul>
            </section>

            <section>
              <h2 className={h2}>3. İşleme amaçları</h2>
              <ul className={ul}>
                <li>Talebinize uygun LED ekran teklifinin hazırlanması ve iletilmesi,</li>
                <li>Ücretsiz keşif randevusunun planlanması ve yürütülmesi,</li>
                <li>Talebinizle ilgili sizinle iletişime geçilmesi,</li>
                <li>Yasal yükümlülüklerimizin yerine getirilmesi ve olası uyuşmazlıklarda hakların korunması.</li>
              </ul>
              <p className="mt-2">
                Verileriniz, açık rızanız olmadan pazarlama veya bülten amacıyla kullanılmaz.
              </p>
            </section>

            <section>
              <h2 className={h2}>4. Hukuki sebep ve toplama yöntemi</h2>
              <p className="mt-2">
                Verileriniz, internet sitemizdeki form aracılığıyla elektronik ortamda, otomatik yollarla
                toplanır. Verileriniz, KVKK m. 5/2 kapsamında şu hukuki sebeplere dayanılarak işlenir:
              </p>
              <ul className={ul}>
                <li>(c) bir sözleşmenin kurulmasıyla doğrudan ilgili olması (teklif ve keşif),</li>
                <li>(ç) veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi,</li>
                <li>(e) bir hakkın tesisi, kullanılması veya korunması,</li>
                <li>
                  (f) temel hak ve özgürlüklerinize zarar vermemek kaydıyla meşru menfaatimiz (talebinize
                  dönüş yapılması).
                </li>
              </ul>
            </section>

            <section>
              <h2 className={h2}>5. Aktarım</h2>
              <p className="mt-2">
                Verileriniz yalnızca yukarıdaki amaçlarla ve gerektiği ölçüde; keşif ve kurulumu yürüten
                çalışanlarımızla ve kanunen yetkili kamu kurumlarıyla paylaşılabilir.
              </p>
              <p className="mt-2">
                E-posta ve form altyapısı için yurt dışında sunucu bulunduran hizmet sağlayıcılar
                kullanılmaktadır (barındırma: Cloudflare; bildirim e-postaları: Cloudflare Email Service). Bu
                aktarım, KVKK m. 9&apos;a uygun olarak gerçekleştirilir.
                <Dogrula note="DOĞRULA-4: dayanak — açık rıza mı, standart sözleşme mi? Açık rıza ise formda ayrı ve zorunlu olmayan bir onay kutusu gerekir" />
              </p>
            </section>

            <section>
              <h2 className={h2}>6. Saklama süresi</h2>
              <p className="mt-2">
                Verileriniz, teklif ve keşif süreci için gerekli olan süre boyunca ve ilgili mevzuatın
                öngördüğü süreler kadar saklanır. Bu süreler dolduğunda silinir, yok edilir veya anonim
                hale getirilir.
                <Dogrula note="DOĞRULA-5: somut süre, ör. sözleşme kurulmazsa 2 yıl" />
              </p>
            </section>

            <section>
              <h2 className={h2}>7. Haklarınız (KVKK m. 11)</h2>
              <p className="mt-2">Veri sorumlusuna başvurarak şu haklarınızı kullanabilirsiniz:</p>
              <ul className={ul}>
                <li>kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                <li>işlenmişse buna ilişkin bilgi talep etme,</li>
                <li>işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                <li>yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
                <li>eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
                <li>KVKK m. 7 çerçevesinde silinmesini veya yok edilmesini isteme,</li>
                <li>düzeltme ve silme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme,</li>
                <li>
                  münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına
                  itiraz etme,
                </li>
                <li>
                  kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep
                  etme.
                </li>
              </ul>
            </section>

            <section>
              <h2 className={h2}>8. Başvuru</h2>
              <p className="mt-2">
                Başvurularınızı Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ&apos;e uygun
                olarak yazılı şekilde yukarıdaki adresimize veya kayıtlı e-posta adresiniz üzerinden{" "}
                <a href="mailto:arled@arledscreen.com" className={mail}>
                  arled@arledscreen.com
                </a>{" "}
                adresine iletebilirsiniz. Talebiniz en geç 30 gün içinde ücretsiz olarak sonuçlandırılır.
              </p>
            </section>

            <Dogrula note="Son güncelleme: yayın tarihi girilecek" />
          </div>
        </div>
      </section>
    </>
  );
}
