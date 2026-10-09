import { PROJECT_TYPES, projectTypeLabel, projectWhatsappHref } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

/** WhatsApp shortcuts with a pre-filled message per project type (no JS required). */
export function WhatsAppProjectPicker({
  compact = false,
  locale = "tr",
}: {
  compact?: boolean;
  locale?: "tr" | "en";
}) {
  const types = PROJECT_TYPES;
  return (
    <ul className={compact ? "flex flex-wrap gap-2" : "grid gap-2 sm:grid-cols-2 lg:grid-cols-4"}>
      {types.map((t) => (
        <li key={t.id}>
          <a
            href={projectWhatsappHref(t.id, locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full min-h-12 items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-ink-soft transition hover:border-[#0F7A41]/60 hover:text-[#12813F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            <WhatsAppIcon />
            <span className="flex-1">{projectTypeLabel(t.id, locale)}</span>
            <span className="text-ink-muted" aria-hidden>
              →
            </span>
            <span className="sr-only">
              {locale === "en"
                ? "(opens WhatsApp with a draft message)"
                : "(WhatsApp'ta hazır mesajla açılır)"}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
