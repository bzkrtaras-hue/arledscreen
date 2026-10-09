import Link from "next/link";
import { FileText, MapPin } from "lucide-react";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { ShortQuoteForm } from "@/components/quote/ShortQuoteForm";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from "@/lib/social";
import {
  GENERIC_WHATSAPP_HREF,
  GENERIC_WHATSAPP_HREF_EN,
  PROJECT_TYPES,
  projectTypeLabel,
  projectWhatsappHref,
} from "@/lib/whatsapp";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { FadeIn } from "@/components/motion/FadeIn";

/**
 * Split quote card: blue info panel (heading, contact, WhatsApp shortcuts with
 * pre-filled messages) + the short quote form on white.
 */
export function QuoteSplit({
  id = "teklif-formu",
  title = "Projenizi birlikte planlayalım",
  headingAs = "h2",
  locale = "tr",
}: {
  id?: string;
  title?: string;
  headingAs?: "h1" | "h2";
  locale?: "tr" | "en";
}) {
  const H = headingAs;
  const en = locale === "en";
  const quick = PROJECT_TYPES.filter((t) =>
    ["magaza", "dis-mekan", "toplanti", "etkinlik", "servis"].includes(t.id),
  );
  const quoteHref = en ? "/en/quote/" : "/tr/quote/";
  const waHref = en ? GENERIC_WHATSAPP_HREF_EN : GENERIC_WHATSAPP_HREF;
  return (
    <FadeIn
      className="grid overflow-hidden rounded-card border border-border bg-white shadow-hero lg:grid-cols-[0.85fr_1.15fr]"
      amount={0.1}
    >
      <div id={id} className="scroll-mt-28 bg-gradient-to-br from-cyan to-cyan-700 p-6 text-white sm:p-10">
        <H className="font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] font-extrabold leading-tight text-white">
          {title}
        </H>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/90">
          {en
            ? "Share size, location and use case — we will prepare a display recommendation, bill of materials and a written quote. The form turns your details into a ready WhatsApp or email message."
            : "Ölçü, konum ve kullanım amacını paylaşın; ekran önerisi, malzeme listesi ve yazılı teklif hazırlayalım. Form, bilgilerinizi WhatsApp veya e-posta ile göndermeniz için hazır bir mesaja dönüştürür."}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={quoteHref}
            className="btn-soft inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-[#ffffff] px-6 text-[16px] font-bold text-[#174a96] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)] hover:bg-[#EEF4FF]"
          >
            <FileText className="h-5 w-5" aria-hidden />
            {en ? "Request a quote" : "Teklif iste"}
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-soft inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-[#0F7A41] px-6 text-[16px] font-bold text-white ring-2 ring-white/70 hover:bg-[#0B6635]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
        </div>
        <ul className="mt-6 space-y-3 text-[15px]">
          <li>
            <a href={CONTACT_PHONE_HREF} className="inline-flex min-h-11 items-center gap-3 font-semibold hover:underline">
              <PhoneIcon className="h-5 w-5" />
              {CONTACT_PHONE_DISPLAY}
            </a>
          </li>
          <li>
            <a
              href={CONTACT_EMAIL_HREF}
              className="inline-flex min-h-11 items-center gap-3 break-all font-semibold hover:underline"
            >
              <MailIcon className="h-5 w-5 shrink-0" />
              {CONTACT_EMAIL}
            </a>
          </li>
          <li className="inline-flex items-center gap-3 text-white">
            <MapPin className="h-5 w-5" aria-hidden />
            {en ? "Gaziosmanpaşa / Istanbul" : "Gaziosmanpaşa / İstanbul"}
          </li>
        </ul>
        <SocialLinks
          className="mt-6"
          ids={["phone", "whatsapp", "instagram", "facebook", "email"]}
          locale={locale}
          onDark
          label={en ? "Social and contact" : "Sosyal medya ve iletişim"}
        />
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-white">
          {en ? "Message us on WhatsApp with a ready draft" : "WhatsApp'tan hazır mesajla yazın"}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {quick.map((t) => (
            <li key={t.id}>
              <a
                href={projectWhatsappHref(t.id, locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-3.5 text-[13px] font-semibold text-white ring-1 ring-white/30 transition hover:bg-white hover:text-cyan-700"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {projectTypeLabel(t.id, locale)}
                <span className="sr-only">
                  {en ? "(opens WhatsApp with a draft message)" : "(WhatsApp'ta hazır mesajla açılır)"}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-5 sm:p-8 lg:p-10">
        <ShortQuoteForm bare locale={locale} />
      </div>
    </FadeIn>
  );
}
