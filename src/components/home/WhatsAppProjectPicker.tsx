import { PROJECT_TYPES, projectWhatsappHref } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

/** WhatsApp shortcuts with a pre-filled message per project type (no JS required). */
export function WhatsAppProjectPicker({ compact = false }: { compact?: boolean }) {
  const types = PROJECT_TYPES;
  return (
    <ul
      className={
        compact
          ? "flex flex-wrap gap-2"
          : "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
      }
    >
      {types.map((t) => (
        <li key={t.id}>
          <a
            href={projectWhatsappHref(t.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center gap-2.5 rounded-xl border border-border bg-white px-3.5 py-2.5 text-[13px] font-semibold leading-snug text-ink-soft transition hover:border-[#0F7A41]/60 hover:text-[#12813F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan sm:gap-3 sm:px-4 sm:py-3 sm:text-sm"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#25D366]" aria-hidden />
            <span className="min-w-0 flex-1">{t.label}</span>
            <span className="shrink-0 text-ink-muted" aria-hidden>
              →
            </span>
            <span className="sr-only">(WhatsApp&apos;ta hazır mesajla açılır)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
