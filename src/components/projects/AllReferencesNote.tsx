import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";

const WA = "https://wa.me/905305078834?text=";
const COPY = {
  tr: { title: "Tüm referanslarımız için bizimle iletişime geçin.", msg: "Merhaba, referanslarınız hakkında bilgi almak istiyorum.", contact: "İletişim" },
  en: { title: "Contact us for our full reference list.", msg: "Hello, I would like information about your project references.", contact: "Contact" },
  ar: { title: "تواصل معنا للاطلاع على قائمة مراجعنا الكاملة.", msg: "مرحباً، أود الحصول على معلومات حول مراجع مشاريعكم.", contact: "تواصل معنا" },
  ru: { title: "Свяжитесь с нами, чтобы получить полный список наших объектов.", msg: "Здравствуйте, я хотел(а) бы получить информацию о ваших реализованных проектах.", contact: "Контакты" },
} as const;

/** Closing note under project selections: the list is a selection, full references on request. */
export function AllReferencesNote({ locale = "tr" }: { locale?: string } = {}) {
  const L = (locale in COPY ? locale : "en") as keyof typeof COPY;
  const c = COPY[L];
  return (
    <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-border bg-band px-6 py-7 text-center sm:flex-row sm:justify-between sm:text-left">
      <p className="font-display text-lg font-bold text-ink">{c.title}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <a
          href={WA + encodeURIComponent(c.msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-soft inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#0F7A41] px-5 text-sm font-semibold text-white hover:bg-[#0B6435]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
        </a>
        <Link
          href={`/${L}/quote/`}
          className="btn-soft inline-flex min-h-12 items-center gap-2 rounded-xl border border-navy/20 bg-white px-5 text-sm font-semibold text-navy hover:bg-cyan-50"
        >
          <Mail className="h-4 w-4" aria-hidden /> {c.contact}
        </Link>
      </div>
    </div>
  );
}
