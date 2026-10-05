import Link from "next/link";
import { LED_MODELS, modelPath } from "@/content/models";
import { CALC_EXTRAS, PRICE_NOTE, fmtUsd, panelLabel, panelM2, type PanelPrice } from "@/content/prices";

interface Props {
  panels: PanelPrice[];
  caption: string;
  showUse?: boolean;
  showCalcLink?: boolean;
}

/** Server-rendered panel price table (crawlable HTML). */
export function PanelPriceTable({ panels, caption, showUse = true, showCalcLink = true }: Props) {
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl glass-card">
        <table className="w-full min-w-[420px] text-left text-sm">
          <caption className="px-4 pt-4 text-left font-display text-base font-bold text-ink sm:px-5">{caption}</caption>
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-[0.08em] text-ink-muted">
              <th scope="col" className="px-4 py-3 sm:px-5">Modül</th>
              {showUse ? <th scope="col" className="px-4 py-3">Kullanım</th> : null}
              <th scope="col" className="px-4 py-3 text-right">Panel fiyatı (USD)</th>
              <th scope="col" className="px-4 py-3 text-right sm:px-5">≈ m² modül bedeli (USD)</th>
            </tr>
          </thead>
          <tbody>
            {panels.map((p, i) => (
              <tr key={p.id} id={p.id} className={i % 2 ? "bg-band/60" : ""}>
                <th scope="row" className="px-4 py-2.5 font-semibold text-ink sm:px-5">
                  {(() => {
                    const m = LED_MODELS.find((x) => x.priceId === p.id);
                    const label = `${p.pitch}${p.surface ? ` ${p.surface}` : ""}${p.frontService ? " (önden servis)" : ""}`;
                    return m ? (
                      <Link href={modelPath(m)} className="text-cyan hover:underline">
                        {label}
                      </Link>
                    ) : (
                      label
                    );
                  })()}
                </th>
                {showUse ? <td className="px-4 py-2.5 text-ink-soft">{p.use === "ic" ? "İç mekân" : "Dış mekân"}</td> : null}
                <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-ink" aria-label={panelLabel(p)}>
                  {fmtUsd(p.usd)}
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums text-ink-soft sm:px-5">{panelM2(p) ?? "Teklifte"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
        {PRICE_NOTE} m² sütunu yalnızca modül bedelidir (320 × 160 mm modülde 1 m² ≈ 19,53 panel). Hesaplayıcı toplamına atölye işçiliği (
        {CALC_EXTRAS.laborPerM2} USD/m²), kontrol kartı ({CALC_EXTRAS.controlCard} USD) ve sürücü + yazılım (
        {CALC_EXTRAS.driverSoftware} USD) ayrıca eklenir — bu kontrol kalemi hesaplayıcı extrasUsd tahmini olup
        Huidu/NovaStar/Colorlight list SKU fiyatı değildir; marka/model yazılı teklifle netleşir.
        {showCalcLink ? (
          <>
            {" "}
            <Link href="/tr/hesaplayici/" className="font-semibold text-cyan hover:underline">
              Ölçünüze göre hesaplayın
            </Link>
            .
          </>
        ) : null}
      </p>
    </div>
  );
}
