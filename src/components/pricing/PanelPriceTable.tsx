import Link from "next/link";
import { LED_MODELS, modelPath } from "@/content/models";
import { CALC_EXTRAS, fmtUsd, panelLabel, panelM2, priceNote, PANELS_PER_M2, type PanelPrice } from "@/content/prices";

/** EN pages: English number format (95.88 / 1,873) so prices are not misread; TR output unchanged. */
const enNum = (n: number, d: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

interface Props {
  panels: PanelPrice[];
  caption: string;
  showUse?: boolean;
  showCalcLink?: boolean;
  /** Visible labels — Turkish byte-for-byte when "tr". */
  locale?: "tr" | "en";
}

/** Server-rendered panel price table (crawlable HTML). */
export function PanelPriceTable({
  panels,
  caption,
  showUse = true,
  showCalcLink = true,
  locale = "tr",
}: Props) {
  const en = locale === "en";
  const calcHref = en ? "/en/hesaplayici/" : "/tr/hesaplayici/";
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl glass-card">
        <table className="w-full min-w-[420px] text-left text-sm">
          <caption className="px-4 pt-4 text-left font-display text-base font-bold text-ink sm:px-5">{caption}</caption>
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-[0.08em] text-ink-muted">
              <th scope="col" className="px-4 py-3 sm:px-5">
                {en ? "Module" : "Modül"}
              </th>
              {showUse ? (
                <th scope="col" className="px-4 py-3">
                  {en ? "Use" : "Kullanım"}
                </th>
              ) : null}
              <th scope="col" className="px-4 py-3 text-right">
                {en ? "Panel price (USD)" : "Panel fiyatı (USD)"}
              </th>
              <th scope="col" className="px-4 py-3 text-right sm:px-5">
                {en ? "≈ m² module cost (USD)" : "≈ m² modül bedeli (USD)"}
              </th>
            </tr>
          </thead>
          <tbody>
            {panels.map((p, i) => (
              <tr key={p.id} id={p.id} className={i % 2 ? "bg-band/60" : ""}>
                <th scope="row" className="px-4 py-2.5 font-semibold text-ink sm:px-5">
                  {(() => {
                    const m = LED_MODELS.find((x) => x.priceId === p.id);
                    const label = `${p.pitch}${p.surface ? ` ${p.surface}` : ""}${
                      p.frontService ? (en ? " (front service)" : " (önden servis)") : ""
                    }`;
                    return m ? (
                      <Link href={modelPath(m)} className="text-cyan hover:underline">
                        {label}
                      </Link>
                    ) : (
                      label
                    );
                  })()}
                </th>
                {showUse ? (
                  <td className="px-4 py-2.5 text-ink-soft">
                    {p.use === "ic" ? (en ? "Indoor" : "İç mekân") : en ? "Outdoor" : "Dış mekân"}
                  </td>
                ) : null}
                <td
                  className="px-4 py-2.5 text-right font-semibold tabular-nums text-ink"
                  aria-label={panelLabel(p, locale)}
                >
                  {en ? enNum(p.usd, 2) : fmtUsd(p.usd)}
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums text-ink-soft sm:px-5">
                  {en
                    ? panelM2(p) !== undefined
                      ? enNum(Math.round(p.usd * PANELS_PER_M2), 0)
                      : "In quote"
                    : panelM2(p) ?? "Teklifte"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
        {en ? (
          <>
            {priceNote("en")} The m² column is module cost only (≈ 19.53 panels/m² for a 320 × 160 mm
            module). Calculator totals also add workshop labour ({CALC_EXTRAS.laborPerM2} USD/m²),
            control card ({CALC_EXTRAS.controlCard} USD) and driver + software (
            {CALC_EXTRAS.driverSoftware} USD).
            {showCalcLink ? (
              <>
                {" "}
                <Link href={calcHref} className="font-semibold text-cyan hover:underline">
                  Calculate for your size
                </Link>
                .
              </>
            ) : null}
          </>
        ) : (
          <>
            {priceNote("tr")} m² sütunu yalnızca modül bedelidir (320 × 160 mm modülde 1 m² ≈ 19,53
            panel). Hesaplayıcı toplamına atölye işçiliği ({CALC_EXTRAS.laborPerM2} USD/m²), kontrol
            kartı ({CALC_EXTRAS.controlCard} USD) ve sürücü + yazılım ({CALC_EXTRAS.driverSoftware}{" "}
            USD) ayrıca eklenir.
            {showCalcLink ? (
              <>
                {" "}
                <Link href={calcHref} className="font-semibold text-cyan hover:underline">
                  Ölçünüze göre hesaplayın
                </Link>
                .
              </>
            ) : null}
          </>
        )}
      </p>
    </div>
  );
}
