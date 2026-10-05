import Link from "next/link";
import { BadgeCheck, ClipboardList, MapPinned, MessagesSquare, Wrench, FileCheck2 } from "lucide-react";
import { getReferenceStats } from "@/content/trust";

/**
 * "Neden ARLEDSCREEN" — only facts that are owner-confirmed or derived from
 * the reference sheet. Warranty terms and certificates are NOT asserted; the
 * copy commits to sharing them in writing with each quote.
 */
export function getTrustItems() {
  const s = getReferenceStats();
  return [
    {
      Icon: BadgeCheck,
      title: "NXTIONSTAR, kendi markamız",
      body: "NXTIONSTAR LED ekranların Türkiye'deki satış, kurulum ve servis süreçleri ARLEDSCREEN üzerinden yürütülür.",
    },
    {
      Icon: MapPinned,
      title: "Türkiye genelinde ve yurt dışında projeler",
      body: `${s.firstDate} – ${s.lastDate} arasında ${s.provinces.slice(0, 5).join(", ")} ve diğer illerde; ayrıca ${s.countries.join(" ve ")}'da tamamlanan kurulumlar.`,
      href: "/tr/projelerimiz/",
      linkLabel: "Proje listesini inceleyin",
    },
    {
      Icon: ClipboardList,
      title: "Keşiften devreye alma aynı ekiple planlanır",
      body: "İhtiyaç analizi, keşif, ürün seçimi, montaj ve devreye alma Gaziosmanpaşa merkezli aynı proje ekibiyle planlanır; yazılı teklifle netleşir.",
    },
    {
      Icon: Wrench,
      title: "Kurulum sonrası teknik servis",
      body: "Bakım, arıza ve yedek parça talepleriniz için doğrudan telefon, WhatsApp ve e-posta kanallarından destek.",
    },
    {
      Icon: FileCheck2,
      title: "Yazılı teklif ve teknik föy",
      body: "Ekran ölçüsü, piksel aralığı, malzeme listesi, garanti kapsamı ve ürün belgeleri teklifle birlikte yazılı olarak paylaşılır.",
    },
    {
      Icon: MessagesSquare,
      title: "Şeffaf fiyatlandırma aracı",
      body: "Fiyat hesaplayıcıyla ölçü ve piksel aralığına göre yaklaşık maliyeti teklif istemeden önce görebilirsiniz. Kontrol kartı kalemi tahmindir — Huidu/NovaStar list SKU değildir; şeffaf/poster/kontrol yazılı teklifle netleşir.",
      href: "/tr/hesaplayici/",
      linkLabel: "Hesaplayıcıyı açın",
    },
  ];
}

export function TrustFacts() {
  const items = getTrustItems();
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ Icon, title, body, href, linkLabel }) => (
        <li key={title} className="flex flex-col rounded-2xl p-6 glass-card">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <h3 className="mt-4 font-display text-base font-bold text-ink">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
          {href ? (
            <Link href={href} className="mt-auto pt-4 text-sm font-semibold text-cyan hover:underline">
              {linkLabel} →
            </Link>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
