import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";

/** Closing note under project selections: the list is a selection, full references on request. */
export function AllReferencesNote({ locale = "tr" }: { locale?: "tr" | "en" } = {}) {
  const en = locale === "en";
  return (
    <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-border bg-band px-6 py-7 text-center sm:flex-row sm:justify-between sm:text-left">
      <p className="font-display text-lg font-bold text-ink">
        {en
          ? "Contact us for our full reference list."
          : "Tüm referanslarımız için bizimle iletişime geçin."}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a
          href={
            en
              ? "https://wa.me/905305078834?text=Hello%2C%20I%20would%20like%20information%20about%20your%20project%20references."
              : "https://wa.me/905305078834?text=Merhaba%2C%20referanslar%C4%B1n%C4%B1z%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
          }
          target="_blank"
          rel="noopener noreferrer"
          className="btn-soft inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#0F7A41] px-5 text-sm font-semibold text-white hover:bg-[#0B6435]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
        </a>
        <Link
          href={en ? "/en/quote/" : "/tr/quote/"}
          className="btn-soft inline-flex min-h-12 items-center gap-2 rounded-xl border border-navy/20 bg-white px-5 text-sm font-semibold text-navy hover:bg-cyan-50"
        >
          <Mail className="h-4 w-4" aria-hidden /> {en ? "Contact" : "İletişim"}
        </Link>
      </div>
    </div>
  );
}
