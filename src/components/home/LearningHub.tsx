import Link from "next/link";
import { BookOpen } from "lucide-react";
import { listSeoGuides } from "@/content/seo-guides";

/** "Öğrenme merkezi": surfaces the 8 rehber guides on the homepage. */
export function LearningHub() {
  const guides = listSeoGuides("tr");
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/tr/rehber/${g.slug}/`}
              className="flex h-full flex-col rounded-2xl p-4 sm:p-5 transition hover:-translate-y-0.5 hover:border-cyan/40 glass-card"
            >
              <BookOpen className="h-5 w-5 text-cyan" aria-hidden />
              <span className="mt-3 font-display text-[0.9375rem] font-bold leading-snug sm:text-base text-ink">{g.cardLabel}</span>
              <span className="mt-2 hidden text-sm leading-relaxed text-ink-muted sm:line-clamp-3">{g.cardTeaser}</span>
              <span className="mt-auto pt-3 text-sm font-semibold text-cyan">Okuyun →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
