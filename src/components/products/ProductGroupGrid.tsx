import Link from "next/link";
import { modelPath, modelsForGroup } from "@/content/models";
import { ArrowRight } from "lucide-react";
import { OptImage } from "@/components/ui/opt-image";
import { FadeIn } from "@/components/motion/FadeIn";
import { PRODUCT_GROUPS, productGroupPath, type ProductGroup } from "@/content/categories";
import { getProductGroupEn } from "@/content/product-groups-en";

/** Category tiles: rounded photo on a grey card with a centred caption bar. */
export function ProductGroupGrid({
  groups = PRODUCT_GROUPS,
  headingLevel = "h3",
  showService = true,
  locale = "tr",
}: {
  groups?: ProductGroup[];
  headingLevel?: "h2" | "h3" | "h4";
  showService?: boolean;
  locale?: "tr" | "en";
}) {
  const H = headingLevel;
  const en = locale === "en";
  const items = [
    ...groups.map((g) => {
      const overlay = en ? getProductGroupEn(g.slug) : undefined;
      return {
        href: productGroupPath(g, locale),
        name: overlay?.name ?? g.name,
        short: overlay?.short ?? g.short,
        tag: overlay?.tag ?? g.tag,
        img: g.cardImage ?? g.image,
        alt: overlay?.imageAlt ?? g.imageAlt,
        // Model PDPs stay TR-canonical; EN agents use group page + pricedPanels.
        models: en
          ? []
          : modelsForGroup(g.slug).map((m) => ({
              href: modelPath(m),
              label: m.chip,
              name: m.name,
            })),
      };
    }),
    ...(showService
      ? [
          {
            href: en ? "/en/hizmetler/" : "/tr/hizmetler/",
            name: en ? "Install and technical service" : "Montaj ve Teknik Servis",
            short: en
              ? "Survey, install, commissioning, maintenance and spare-part requests."
              : "Keşif, montaj, devreye alma, bakım ve yedek parça talepleri.",
            tag: en ? "Survey · Install · Service" : "Keşif · Montaj · Servis",
            img: "/projects/service-assembly.jpg",
            alt: en
              ? "Technicians installing modules on an indoor LED wall"
              : "Teknik ekip iç mekân LED duvarda modül montajı yapıyor",
            models: [] as { href: string; label: string; name: string }[],
          },
        ]
      : []),
  ];

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c, i) => (
        <FadeIn
          as="li"
          key={c.href}
          delay={(i % 3) * 0.12}
          className="flex h-full flex-col rounded-3xl bg-band transition duration-300 hover:-translate-y-1 hover:shadow-card"
        >
          <Link href={c.href} className="group flex flex-1 flex-col rounded-3xl p-2">
            <span className="relative block aspect-[4/3] overflow-hidden rounded-[1.1rem] bg-surface">
              <OptImage
                src={c.img}
                alt={c.alt}
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw"
                className="object-cover transition duration-700 group-hover:scale-[1.05]"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink shadow-sm">
                {c.tag}
              </span>
            </span>
            <span className="flex flex-1 flex-col items-center px-4 pb-4 pt-4 text-center">
              <H className="font-display text-lg font-bold text-ink">{c.name}</H>
              <span className="mt-1.5 text-sm leading-relaxed text-ink-muted">{c.short}</span>
              <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-cyan group-hover:text-cyan-700">
                {en ? "View group" : "İnceleyin"} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </span>
          </Link>
          {c.models.length ? (
            <ul className="flex flex-wrap justify-center gap-1.5 px-4 pb-5" aria-label={`${c.name} modelleri`}>
              {c.models.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    title={m.name}
                    className="inline-flex min-h-11 items-center rounded-xl bg-white px-3 text-[12.5px] font-semibold text-ink-soft ring-1 ring-border transition hover:bg-cyan hover:text-white hover:ring-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan sm:min-h-9"
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </FadeIn>
      ))}
    </ul>
  );
}
