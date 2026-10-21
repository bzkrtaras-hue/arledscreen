import { buyHref, buyLabel } from "@/lib/buy-cta";
import Link from "next/link";
import type { ReactNode } from "react";
import { FileText } from "lucide-react";
import { OptImage } from "@/components/ui/opt-image";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { whatsappHref } from "@/lib/whatsapp";
import { priceLabel, type Lang, type ShopModule, type ShopSystem } from "@/content/magaza";

const btnPrimary =
  "btn-soft inline-flex min-h-11 items-center justify-center gap-1.5 bg-cyan px-3 text-sm text-white hover:bg-cyan-600";
const btnGhost =
  "btn-soft inline-flex min-h-11 items-center justify-center gap-1.5 border border-border bg-white px-3 text-sm text-ink-soft hover:border-cyan/50 hover:text-cyan";

/** Neutral media block (no photo): used for reference systems and for SKUs without a real product shot. */
function NeutralMedia({ big, small, label }: { big: ReactNode; small: string; label: string }) {
  return (
    <div
      className="relative flex aspect-[16/10] flex-col items-center justify-center bg-gradient-to-br from-[#0B1B33] via-[#0B1B33] to-[#1E5BB8]"
      role="img"
      aria-label={label}
    >
      <span className="font-display text-5xl font-extrabold tracking-[-0.03em] text-white">{big}</span>
      <span className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/85">{small}</span>
    </div>
  );
}

export function ShopModuleCard({ item, locale }: { item: ShopModule; locale: Lang }) {
  const tr = locale === "tr";
  const name = tr ? item.nameTr : item.nameEn;
  const msg = tr
    ? `Merhaba, ${name} için teklif ve teknik föy rica ediyorum.`
    : `Hello, I would like a quote and datasheet for ${name}.`;
  const href = tr ? item.pathTr : item.pathEn;
  const use = item.use === "ic" ? (tr ? "İç mekân" : "Indoor") : tr ? "Dış mekân" : "Outdoor";
  return (
    <article
      id={item.id}
      className="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl glass-card"
    >
      {item.image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-surface">
          <OptImage
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-semibold text-cyan-700">
            {use}
          </span>
          <span className="absolute bottom-3 left-3 rounded-lg bg-[#0B1B33]/85 px-2.5 py-1 font-display text-sm font-bold text-white">
            {item.pitch}
          </span>
        </div>
      ) : (
        <NeutralMedia big={item.pitch} small={`${use} · ${tr ? "LED modül" : "LED module"}`} label={name} />
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-ink">
          <Link href={href} className="hover:text-cyan hover:underline">
            {name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{tr ? item.descTr : item.descEn}</p>
        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg bg-surface px-3 py-2">
            <dt className="text-ink-muted">{tr ? "Modül ölçüsü" : "Module size"}</dt>
            <dd className="mt-0.5 font-display text-sm font-semibold text-ink-soft">{item.moduleMm}</dd>
          </div>
          <div className="rounded-lg bg-surface px-3 py-2">
            <dt className="text-ink-muted">{tr ? "Fiyat (panel başına)" : "Price (per panel)"}</dt>
            <dd className="mt-0.5 font-display text-sm font-bold text-cyan">{priceLabel(item.usd, locale)}</dd>
          </div>
        </dl>
        <p className="mt-2 text-[11px] leading-snug text-ink-muted">
          {tr ? "KDV ve nakliye hariç." : "VAT and shipping excluded."}
        </p>
        <div className="mt-auto grid gap-2 pt-4 sm:grid-cols-2">
          <Link href={buyHref(locale)} className={btnPrimary}>
            <FileText className="h-4 w-4" aria-hidden />
            {buyLabel(locale)}
          </Link>
          <a href={whatsappHref(msg)} target="_blank" rel="noopener noreferrer" className={btnGhost}>
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

export function ShopSystemCard({ item, locale }: { item: ShopSystem; locale: Lang }) {
  const tr = locale === "tr";
  const name = tr ? item.nameTr : item.nameEn;
  const msg = tr
    ? `Merhaba, ${name} (${item.pitch} referans konfigürasyon) için keşif ve teklif rica ediyorum.`
    : `Hello, I would like a survey and quote for the ${name} (${item.pitch} reference configuration).`;
  return (
    <article
      id={item.id}
      className="flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl glass-card"
    >
      <NeutralMedia
        big={
          <>
            {item.areaM2} <span className="text-3xl font-bold text-white">m²</span>
          </>
        }
        small={`${item.use === "ic" ? (tr ? "İç mekân" : "Indoor") : tr ? "Dış mekân" : "Outdoor"} · ${item.pitch}`}
        label={name}
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-ink">{name}</h3>
        <p className="mt-1 text-xs font-semibold text-cyan-700">
          {tr ? `${item.pitch} referans konfigürasyon` : `${item.pitch} reference configuration`}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{tr ? item.descTr : item.descEn}</p>
        <dl className="mt-4 text-xs">
          <div className="rounded-lg bg-surface px-3 py-2">
            <dt className="text-ink-muted">{tr ? "Fiyat" : "Price"}</dt>
            <dd className="mt-0.5 font-display text-sm font-semibold text-ink-soft">
              {tr ? "Keşif sonrası yazılı teklifle" : "Written quote after survey"}
            </dd>
          </div>
        </dl>
        <div className="mt-auto grid gap-2 pt-4 sm:grid-cols-2">
          <Link href={buyHref(locale)} className={btnPrimary}>
            <FileText className="h-4 w-4" aria-hidden />
            {buyLabel(locale)}
          </Link>
          <a href={whatsappHref(msg)} target="_blank" rel="noopener noreferrer" className={btnGhost}>
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
