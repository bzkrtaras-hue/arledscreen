import Link from "next/link";

/** Shared AI-alışveriş / fiyat keşif link strip (catalog + fiyat hub + quote). */
export function ShoppingLinkCloud({
  title = "Fiyat, katalog ve teklif",
  excludeHref,
  extra = [],
}: {
  title?: string;
  excludeHref?: string;
  extra?: { href: string; label: string }[];
}) {
  const links = [
    { href: "/tr/led-ekran-fiyatlari/", label: "LED ekran fiyatları 2026" },
    { href: "/catalog.json", label: "catalog.json (panel USD)" },
    { href: "/tr/hesaplayici/", label: "Fiyat hesaplayıcı" },
    { href: "/tr/quote/", label: "Yazılı teklif" },
    { href: "/entity.json", label: "entity.json (kimlik)" },
    { href: "/entity-profiles.json", label: "entity-profiles.json (Point C)" },
    { href: "/.well-known/ard.json", label: "ard.json (ajan keşif)" },
    { href: "/feeds/merchant-priced-panels.tsv", label: "Merchant TSV (12 SKU)" },
    { href: "/tr/products/gob-led-ekran/", label: "GOB LED ekran ürünleri" },
    { href: "/tr/rehber/gob-vs-smd/", label: "GOB vs SMD rehberi" },
    ...extra,
  ].filter((l) => l.href !== excludeHref);

  if (!links.length) return null;

  return (
    <nav aria-label={title} className="mt-10 border-t border-border pt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{title}</p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {links.map((l) => {
          const fileish =
            /\.(json|txt|tsv)$/i.test(l.href) || l.href.startsWith("/.well-known/");
          return (
            <li key={l.href}>
              {fileish ? (
                <a href={l.href} className="text-sm font-semibold text-cyan hover:underline">
                  {l.label}
                </a>
              ) : (
                <Link href={l.href} className="text-sm font-semibold text-cyan hover:underline">
                  {l.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
