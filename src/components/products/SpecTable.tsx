/**
 * Teknik özellik tablosu iskeleti. Varsayılan olarak KAPALI.
 * Değerler yalnızca tedarikçi föyünden gelir; burada hiçbir sayı uydurulmaz.
 * DOĞRULA: parlaklık, yenileme hızı, güç, sertifika — föy gelince doldurulacak.
 */
export const SPEC_TABLE_ENABLED = false;

export type SpecRow = { label: string; value?: string };

type Props = { rows?: SpecRow[]; caption?: string; enabled?: boolean };

export function SpecTable({ rows = [], caption, enabled = SPEC_TABLE_ENABLED }: Props) {
  if (!enabled) return null;
  const filled = rows.filter((r) => r.value && r.value.trim() !== "");
  if (filled.length === 0) return null;
  return (
    <table className="w-full border-collapse text-sm">
      {caption ? <caption className="text-left font-semibold">{caption}</caption> : null}
      <tbody>
        {filled.map((r) => (
          <tr key={r.label} className="border-b border-[#D8E2EE]">
            <th scope="row" className="py-2 pr-4 text-left font-medium">{r.label}</th>
            <td className="py-2">{r.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SpecTable;
