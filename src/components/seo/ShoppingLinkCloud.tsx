import Link from "next/link";

const MACHINE_FILE = /\.(json|txt|tsv)$/i;

function isCustomerLink(href: string) {
  return !MACHINE_FILE.test(href) && !href.includes("/.well-known/");
}

/** Customer link strip. Machine files stay on their URLs and are not listed here. */
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
    { href: "/tr/hesaplayici/", label: "Fiyat hesaplayıcı" },
    { href: "/tr/quote/", label: "Yazılı teklif" },
    { href: "/tr/products/gob-led-ekran/", label: "GOB LED ekran ürünleri" },
    { href: "/tr/rehber/gob-vs-smd/", label: "GOB vs SMD rehberi" },
    ...extra,
  ].filter((l) => l.href !== excludeHref && isCustomerLink(l.href));

  if (!links.length) return null;

  return (
    <nav aria-label={title} className="mt-10 border-t border-border pt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{title}</p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm font-semibold text-cyan hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
