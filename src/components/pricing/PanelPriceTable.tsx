import Link from "next/link";
import { LED_MODELS, modelPath } from "@/content/models";
import { CALC_EXTRAS, cabinetM2Usd, fmtUsd, panelLabel, priceNote, type PanelPrice } from "@/content/prices";

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
      <div className="max-w-full overflow-x-auto rounded-2xl glass-card">
        <table className="w-full text-left text-[13px] sm:text-sm">
          <caption className="px-3 pt-4 text-left font-display text-base font-bold text-ink sm:px-5">
            {caption}
            <span className="mt-1 block text-xs font-normal text-ink-muted">
              {en
                ? "Rental: portable cabinet, quick to assemble and dismantle. m² columns = module cost per m²."
                : "Rental: taşınabilir, sökülüp takılabilir kabin. m² sütunları modül bedelidir."}
            </span>
          </caption>
          <thead>
            <tr className="border-b border-border text-[11px] uppercase tracking-[0.06em] text-ink-muted sm:text-xs">
              <th scope="col" className="px-3 py-3 sm:px-5">
                {en ? "Module" : "Modül"}
              </th>
              {showUse ? (
                <th scope="col" className="hidden px-3 py-3 sm:table-cell">
                  {en ? "Use" : "Kullanım"}
                </th>
              ) : null}
              <th scope="col" className="px-2 py-3 text-right sm:px-3">
                {en ? "Panel (USD)" : "Panel (USD)"}
              </th>
              <th scope="col" className="px-2 py-3 text-right sm:px-3">
                {en ? "CNC cabinet (fixed installation) USD/m²" : "CNC kabin (sabit kurulum) USD/m²"}
              </th>
              <th scope="col" className="px-2 py-3 text-right sm:px-5">
                {en ? "Rental cabinet (+100 USD/m²) USD/m²" : "Rental kabin (+100 USD/m²) USD/m²"}
              </th>
            </tr>
          </thead>
          <tbody>
            {panels.map((p, i) => (
              <tr key={p.id} id={p.id} className={i % 2 ? "bg-band/60" : ""}>
                <th scope="row" className="px-3 py-2.5 font-semibold text-ink sm:px-5">
                  {(() => {
                    const m = LED_MODELS.find((x) => x.priceId === p.id);
                    const label = `${p.pitch}${p.surface ? ` ${p.surface}` : ""}${
                      p.frontService ? (en ? " (front service)" : " (önden servis)") : ""
                    }`;
                    return m ? (
                      <Link href={modelPath(m)} className="inline-flex min-h-11 min-w-11 items-center text-cyan hover:underline">
                        {label}
                      </Link>
                    ) : (
                      label
                    );
                  })()}
                </th>
                {showUse ? (
                  <td className="hidden px-3 py-2.5 text-ink-soft sm:table-cell">
                    {p.use === "ic" ? (en ? "Indoor" : "İç mekân") : en ? "Outdoor" : "Dış mekân"}
                  </td>
                ) : null}
                <td
                  className="px-2 py-2.5 text-right font-semibold tabular-nums text-ink sm:px-3"
                  aria-label={panelLabel(p, locale)}
                >
                  {en ? enNum(p.usd, 2) : fmtUsd(p.usd)}
                </td>
                {(() => {
                  const c = cabinetM2Usd(p);
                  const f = (n: number) => (en ? enNum(n, 0) : n.toLocaleString("tr-TR"));
                  return (
                    <>
                      <td className="px-2 py-2.5 text-right tabular-nums text-ink-soft sm:px-3">{f(c.cnc)}</td>
                      <td className="px-2 py-2.5 text-right tabular-nums text-ink-soft sm:px-5">{f(c.rental)}</td>
                    </>
                  );
                })()}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">
        {en ? (
          <>
            {priceNote("en")} The m² columns are module cost only, converted with each model&apos;s module size (≈ 19.53 panels/m² for 320 × 160 mm). Rental cabinet adds 100 USD/m². Calculator totals also add workshop labour ({CALC_EXTRAS.laborPerM2} USD/m²),
            control card ({CALC_EXTRAS.controlCard} USD per card; one extra card for each started 10 m² above 10 m²) and driver + software (
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
            {priceNote("tr")} m² sütunları yalnızca modül bedelidir ve modül ölçüsüyle hesaplanır (320 × 160 mm modülde 1 m² ≈ 19,53 panel). Rental kabin m² başına 100 USD ekler. Hesaplayıcı toplamına atölye işçiliği ({CALC_EXTRAS.laborPerM2} USD/m²), kontrol
            kartı (kart başı {CALC_EXTRAS.controlCard} USD; 10 m² üzerinde her başlayan 10 m² için ek kontrol kartı) ve sürücü + yazılım ({CALC_EXTRAS.driverSoftware}{" "}
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
