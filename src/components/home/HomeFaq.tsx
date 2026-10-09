import type { FaqItem } from "@/lib/schemas/cms";
import { visibleFaqs } from "@/lib/faq-visible";

/** Accessible, JS-free accordion (details/summary). Content matches FAQ JSON-LD. */
export function HomeFaq({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="max-w-4xl divide-y divide-border rounded-2xl glass-card">
      {visibleFaqs(faqs).map((faq) => (
        <details key={faq.question} className="group px-5 py-1 sm:px-6">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-3 font-display text-base font-semibold text-ink">
            <h3 className="text-base font-semibold">{faq.question}</h3>
            <span className="text-xl leading-none text-cyan transition group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-ink-muted sm:text-[15px]">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
