import Link from "next/link";
import { fmtUsd } from "@/content/prices";
import { itemHref, itemPrice, type MaterialSection } from "@/content/materials";
import { whatsappHref } from "@/lib/whatsapp";

/**
 * Server-rendered material price table — same markup/classes as PanelPriceTable
 * (no new styles). Panel rows resolve their price through prices.ts only.
 */
export function MaterialPriceTable({ section, id }: { section: MaterialSection; id?: string }) {
  const cnc = section.kind === "cnc";
  return (
    <div id={id} className="scroll-mt-24">
      <div className="overflow-x-auto rounded-2xl glass-card">
        <table className="w-full min-w-[420px] text-left text-sm">
          <caption className="px-4 pt-4 text-left font-display text-base font-bold text-ink sm:px-5">{section.title}</caption>
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-[0.08em] text-ink-muted">
              <th scope="col" className="px-4 py-3 sm:px-5">
                {section.cols[0]}
              </th>
              {cnc ? null : (
                <th scope="col" className="px-4 py-3">
                  {section.cols[1]}
                </th>
              )}
              <th scope="col" className="px-4 py-3 text-right">
                {cnc ? section.cols[1] : section.cols[2]}
              </th>
              {cnc ? (
                <th scope="col" className="px-4 py-3 text-right sm:px-5">
                  {section.cols[2]}
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {section.items.map((it, i) => {
              const href = itemHref(it);
              const price = itemPrice(it);
              const name = cnc ? it.name.replace(/^CNC kasa /, "") : it.name;
              return (
                <tr key={it.id} id={it.id} className={i % 2 ? "bg-band/60" : ""}>
                  <th scope="row" className="px-4 py-2.5 font-semibold text-ink sm:px-5">
                    {href ? (
                      <Link href={href} className="text-cyan hover:underline">
                        {name}
                      </Link>
                    ) : (
                      name
                    )}
                  </th>
                  {cnc ? null : <td className="px-4 py-2.5 text-ink-soft">{it.spec}</td>}
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-ink">
                    {price ? (
                      fmtUsd(price.usd)
                    ) : (
                      <a
                        href={whatsappHref(`Merhaba, ${it.name} için fiyat almak istiyorum.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-cyan hover:underline"
                      >
                        Fiyat için teklif alın
                      </a>
                    )}
                  </td>
                  {cnc ? (
                    <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-ink sm:px-5">
                      {typeof it.usd2 === "number" ? fmtUsd(it.usd2) : "—"}
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
