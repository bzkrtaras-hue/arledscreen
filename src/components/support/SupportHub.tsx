import Link from "next/link";
import { CONTROL_GROUPS } from "@/content/control-products";
import { LED_MODELS, modelPath } from "@/content/models";
import { productGroupPath } from "@/content/categories";

/** Teknik destek hub blocks on /tr/led-ekran-servis/ (skeleton; final copy from Desk brief). */
const SOFTWARE: Record<string, string> = {
  Huidu: "HDPlayer / LedArt",
  NovaStar: "NovaLCT / Unico",
  Colorlight: "iSet / web arayüzü",
};
const GUIDE: Record<string, { href: string; label: string }> = {
  Huidu: { href: "/tr/rehber/huidu-led-ekran-kurulumu/", label: "Huidu kurulum rehberi" },
  NovaStar: { href: "/tr/rehber/novastar-led-ekran-kurulumu/", label: "NovaStar kurulum rehberi" },
};

export function SupportHub() {
  const panels = LED_MODELS.filter((m) => !CONTROL_GROUPS.some((g) => g.slug === m.group));
  return (
    <section id="teknik-destek" className="border-t border-border bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-xl font-bold text-ink md:text-2xl">Teknik destek</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
          2 yıl garanti ve 5 yıl ücretsiz teknik servis. Kurulum adımları için{" "}
          <Link href="/tr/rehber/led-ekran-kurulumu/" className="font-semibold text-cyan hover:underline">
            LED ekran kurulum rehberi
          </Link>
          , arıza için{" "}
          <Link href="/tr/led-ekran-tamiri/" className="font-semibold text-cyan hover:underline">
            LED ekran tamiri
          </Link>
          .
        </p>

        <h3 id="kontrol-karti-destegi" className="mt-8 font-display text-lg font-bold text-ink">
          Kontrol kartı desteği
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {CONTROL_GROUPS.map((g) => {
            const brand = g.brandName ?? g.name;
            const guide = GUIDE[brand];
            return (
              <div key={g.slug} className="rounded-2xl border border-border bg-band/40 p-5 text-sm text-ink-soft">
                <p className="font-display text-base font-bold text-ink">{brand}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Kurulum ve yapılandırma</li>
                  <li>Gönderici ve alıcı kart</li>
                  {SOFTWARE[brand] ? <li>Yazılım: {SOFTWARE[brand]}</li> : null}
                </ul>
                <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                  <Link href={productGroupPath(g)} className="font-semibold text-cyan hover:underline">
                    {g.name}
                  </Link>
                  {guide ? (
                    <Link href={guide.href} className="font-semibold text-cyan hover:underline">
                      {guide.label}
                    </Link>
                  ) : null}
                </p>
              </div>
            );
          })}
        </div>

        <h3 id="piksel-araligina-gore" className="mt-10 font-display text-lg font-bold text-ink">
          Piksel aralığına göre destek
        </h3>
        <p className="mt-2 text-sm text-ink-soft">
          Her model için: yapılandırma (çözünürlük ve haritalama), kalibrasyon, bakım ve modül değişimi.
        </p>
        <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {panels.map((m) => (
            <li key={`${m.group}/${m.slug}`}>
              <Link href={modelPath(m)} className="font-semibold text-cyan hover:underline">
                {m.name}
              </Link>
            </li>
          ))}
        </ul>

        <h3 id="bakim-yazilim-uzaktan" className="mt-10 font-display text-lg font-bold text-ink">
          Bakım, yazılım ve uzaktan destek
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          <li>Periyodik bakım</li>
          <li>Yazılım desteği</li>
          <li>Uzaktan destek</li>
          <li>LED, LCD, kiosk ve menuboard tamiri</li>
        </ul>
      </div>
    </section>
  );
}
