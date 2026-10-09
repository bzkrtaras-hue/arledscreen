import Link from "next/link";
import { getTrustItems } from "@/components/home/TrustFacts";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeading } from "@/components/ui/section-heading";

/** Grey band of verified "why us" facts: centred icon, title, short text. */
export function ValuesBand() {
  const items = getTrustItems();
  return (
    <section id="neden-arledscreen" className="overflow-hidden bg-band py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Neden ARLEDSCREEN?"
          title="Kararınızı destekleyecek somut bilgiler"
          description="Doğru ürün kadar doğru keşif, temiz montaj ve kurulum sonrası destek de belirleyicidir. Bu sayfadaki proje bilgileri tamamladığımız işlere dayanır."
        />
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
          {items.map(({ Icon, title, body, href, linkLabel }, i) => (
            <FadeIn as="li" key={title} dir={i % 2 === 0 ? "left" : "right"} delay={(i % 3) * 0.12} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-cyan glass-card">
                <Icon className="h-7 w-7" strokeWidth={1.7} aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{title}</h3>
              <p className="mx-auto mt-2 max-w-[380px] text-[15px] leading-relaxed text-ink-muted">{body}</p>
              {href ? (
                <Link href={href} className="mt-3 inline-flex min-h-10 items-center text-sm font-semibold text-cyan hover:underline">
                  {linkLabel} →
                </Link>
              ) : null}
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
