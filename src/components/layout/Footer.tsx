import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/social";
import { GENERIC_WHATSAPP_HREF } from "@/lib/whatsapp";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { PRODUCT_GROUPS, productGroupPath } from "@/content/categories";
import { BUSINESS_ADDRESS_LINES, BUSINESS_HOURS_TEXT, BUSINESS_MAP_URL } from "@/lib/social";
import { ARTICLE_LINKS } from "@/content/article-links";

interface FooterProps {
  locale: Locale;
}

/**
 * Dark footer: centred quick-link row + outlined social icons (template rhythm),
 * followed by ARLEDSCREEN's information columns (products, guides, NAP).
 */
export function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();
  const tr = locale === "tr";

  const quickLinks = tr
    ? [
        { href: "/tr/led-ekran/", label: "LED ekran" },
        { href: "/tr/led-ekran-fiyatlari/", label: "LED ekran fiyatları" },
        { href: "/tr/products/", label: "Ürünler" },
        { href: "/tr/hizmetler/", label: "Hizmetler" },
        { href: "/tr/bolgeler/", label: "Hizmet bölgesi" },
        { href: "/tr/projelerimiz/", label: "Projeler" },
        { href: "/tr/rehber/", label: "Rehber" },
        { href: "/tr/about/", label: "Hakkımızda" },
        { href: "/tr/hesaplayici/", label: "Fiyat hesapla" },
        { href: "/tr/quote/", label: "Teklif iste" },
        { href: "/tr/sss/", label: "SSS" },
        { href: "/tr/nxtionstar/", label: "NXTIONSTAR" },
      ]
    : [
        { href: `/${locale}/products/`, label: dict.nav.products },
        { href: `/${locale}/rehber/`, label: "Guides" },
        { href: `/${locale}/about/`, label: dict.nav.about },
        { href: `/${locale}/hesaplayici/`, label: dict.nav.priceCalculator },
        { href: `/${locale}/quote/`, label: dict.nav.quote },
      ];

  const columns = tr
    ? [
        {
          title: "Ürün grupları",
          links: [
            ...PRODUCT_GROUPS.map((g) => ({ href: productGroupPath(g), label: g.name })),
          ],
        },
        {
          title: "Ticari sayfalar",
          links: [
            { href: "/tr/led-ekran/", label: "LED ekran" },
            { href: "/tr/led-ekran-satisi/", label: "LED ekran satışı" },
            { href: "/tr/led-ekran-montaj/", label: "LED ekran montaj" },
            { href: "/tr/led-ekran-kiralama/", label: "LED ekran kiralama" },
            { href: "/tr/led-ekran-fiyatlari/", label: "LED ekran fiyatları" },
            { href: "/tr/led-ekran-servis/", label: "LED ekran servis" },
            { href: "/tr/magaza-led-ekran/", label: "Mağaza LED ekran" },
            { href: "/tr/cephe-led-ekran/", label: "Cephe LED ekran" },
          ],
        },
        {
          title: "Rehber",
          links: [
            { href: "/tr/blog/", label: "Blog — proje yazıları" },
            ...ARTICLE_LINKS,
            { href: "/tr/rehber/led-ekran/", label: "LED ekran nedir?" },
            { href: "/tr/rehber/ic-mekan-led-ekran/", label: "İç mekân LED ekran" },
            { href: "/tr/rehber/dis-mekan-led-ekran/", label: "Dış mekân LED ekran" },
            { href: "/tr/yapay-zeka/", label: "Yapay zekâ ve LED ekran" },
          ],
        },
      ]
    : [];


  return (
    <footer className="bg-foot text-white">
      <div className="mx-auto max-w-7xl min-w-0 px-4 pt-12 sm:px-6 lg:px-8">
        <section aria-labelledby="bulten-baslik" className="mx-auto mb-10 max-w-2xl text-center">
          <h2 id="bulten-baslik" className="font-display text-xl font-bold text-white sm:text-2xl">
            {tr ? "Bültenimize abone olun" : "Subscribe to our newsletter"}
          </h2>
          <p className="mt-2 text-sm text-white/80">
            {tr
              ? "Yeni projeler, ürünler ve LED ekran rehberleri e-postanıza gelsin."
              : "New projects, products and LED display guides, straight to your inbox."}
          </p>
          <div className="ml-embedded mt-5 min-h-[120px]" data-form="CatDAx" />
        </section>
        <nav aria-label={tr ? "Alt menü" : "Footer"}>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] font-semibold">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center text-white/90 hover:text-[#9CC0F5]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <SocialLinks
          className="mt-5 justify-center"
          ids={["phone", "whatsapp", "instagram", "facebook", "email"]}
          onDark
          label={tr ? "Sosyal medya ve iletişim" : "Social and contact"}
        />
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl min-w-0 gap-10 border-t border-white/10 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="min-w-0">
          <div className="inline-flex flex-wrap items-center gap-3 rounded-2xl bg-white px-4 py-3">
            <Link href={`/${locale}/`} className="inline-flex items-center" aria-label="ARLEDSCREEN">
              <Image
                src="/brand/arledscreen-logo-header-514.webp"
                alt="ARLEDSCREEN"
                width={514}
                height={160}
                className="h-9 w-auto max-w-[170px] object-contain"
                unoptimized
              />
            </Link>
            <span className="h-7 w-px bg-ink/15" aria-hidden />
            <Image
              src="/brand/nxtionstar-wordmark-header-478.webp"
              alt="NXTIONSTAR"
              width={478}
              height={137}
              className="h-6 w-auto object-contain"
              unoptimized
            />
          </div>
          <p className="mt-4 max-w-sm text-sm font-semibold leading-snug text-[#9CC0F5]">{dict.brand.slogan}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">{dict.footer.tagline}</p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} className="min-w-0" aria-label={col.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">{col.title}</p>
            <ul className="mt-4 space-y-1 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-8 items-center text-white/85 hover:text-[#9CC0F5]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className={tr ? "min-w-0" : "min-w-0 lg:col-start-4"}>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">{tr ? "İletişim" : "Contact"}</p>
          <address className="mt-4 space-y-3 text-sm not-italic text-white/85">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#9CC0F5]" aria-hidden />
              <span>
                ARLEDSCREEN
                <br />
                {BUSINESS_ADDRESS_LINES[0]}
                <br />
                {BUSINESS_ADDRESS_LINES[1]}
                <br />
                <a href={BUSINESS_MAP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-[#9CC0F5] underline-offset-2 hover:underline">
                  {tr ? "Haritada görün" : "View on map"}
                </a>
              </span>
            </p>
            <p className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#9CC0F5]" aria-hidden />
              <span>
                {tr ? BUSINESS_HOURS_TEXT[0] : "Mon–Fri: 09:00–18:00"}
                <br />
                {tr ? BUSINESS_HOURS_TEXT[1] : "Sat: 10:00–15:00"}
              </span>
            </p>
            <p>
              <a href={CONTACT_PHONE_HREF} className="inline-flex min-h-11 items-center gap-2 hover:text-[#9CC0F5]">
                <PhoneIcon className="h-4 w-4 text-[#9CC0F5]" />
                {CONTACT_PHONE_DISPLAY}
              </a>
            </p>
            <p>
              <a href={CONTACT_EMAIL_HREF} className="inline-flex min-h-11 items-center gap-2 break-all hover:text-[#9CC0F5]">
                <MailIcon className="h-4 w-4 shrink-0 text-[#9CC0F5]" />
                {CONTACT_EMAIL}
              </a>
            </p>
            <p>
              <a
                href={GENERIC_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-white hover:text-[#9CC0F5]"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                {tr ? "WhatsApp ile yazın" : "Message on WhatsApp"}
              </a>
            </p>
            <p className="text-white/60">{dict.footer.engineering}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/55">
        <p>
          © {year} ARLEDSCREEN · NXTIONSTAR. {dict.footer.rights}
        </p>
        {tr ? (
          <p className="mt-2">
            <a href="/entity.json" className="text-white/70 underline-offset-2 hover:text-[#9CC0F5] hover:underline">
              entity.json
            </a>
            {" · "}
            <a href="/entity-profiles.json" className="text-white/70 underline-offset-2 hover:text-[#9CC0F5] hover:underline">
              entity-profiles.json
            </a>
            {" · "}
            <a href="/catalog.json" className="text-white/70 underline-offset-2 hover:text-[#9CC0F5] hover:underline">
              catalog.json
            </a>
            {" · "}
            <a href="/.well-known/ard.json" className="text-white/70 underline-offset-2 hover:text-[#9CC0F5] hover:underline">
              ard.json
            </a>
            {" · "}
            <a href="/llms.txt" className="text-white/70 underline-offset-2 hover:text-[#9CC0F5] hover:underline">
              llms.txt
            </a>
            {" · "}
            <a href="/llms-full.txt" className="text-white/70 underline-offset-2 hover:text-[#9CC0F5] hover:underline">
              llms-full.txt
            </a>
            {" · "}
            <a href="/sitemap.xml" className="text-white/70 underline-offset-2 hover:text-[#9CC0F5] hover:underline">
              sitemap.xml
            </a>
          </p>
        ) : null}
      </div>
    </footer>
  );
}
