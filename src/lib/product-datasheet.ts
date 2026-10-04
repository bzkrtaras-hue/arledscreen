import type { Product } from "@/types/product";

/** Minimal single-page PDF (text only) — no external PDF library. */
export function buildProductDatasheetPdf(
  product: Product,
  opts?: { locale?: string; brandLine?: string },
): Blob {
  const locale = opts?.locale ?? "tr";
  const brand =
    opts?.brandLine ??
    "ARLEDSCREEN — NXTIONSTAR | arledscreen.com | +90 530 507 88 34";

  const lines = [
    "NXTIONSTAR — Ürün Teknik Föyü",
    brand,
    "",
    product.name,
    product.series,
    "",
    product.description,
    "",
    `Pitch: P${product.specs.pixelPitchMm} mm`,
    `Teknoloji: ${product.specs.technology}`,
    ...[
      product.specs.brightnessNits ? `Parlaklık: ${product.specs.brightnessNits} nits` : "",
      product.specs.refreshRateHz ? `Yenileme: ${product.specs.refreshRateHz} Hz` : "",
      product.specs.cabinetSizeMm ? `Kabin: ${product.specs.cabinetSizeMm} mm` : "",
      product.specs.ipRating ? `IP: ${product.specs.ipRating}` : "",
      product.specs.lifespanHours ? `Ömür: ${product.specs.lifespanHours} saat` : "",
      product.specs.viewingAngle ? `İzleme açısı: ${product.specs.viewingAngle}` : "",
    ].filter(Boolean),
    "",
    "Öne çıkanlar:",
    ...product.highlights.map((h) => `• ${h}`),
    "",
    locale === "tr"
      ? "Bu föy bilgilendirme amaçlıdır; proje teklifi için arled@arledscreen.com"
      : "Informational datasheet — contact arled@arledscreen.com for a project quote.",
  ];

  const escapePdf = (s: string) =>
    s
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      // PDF Latin core: strip unsupported chars lightly
      .replace(/[^\x20-\x7EğüşıöçĞÜŞİÖÇ]/g, "?");

  // Use Helvetica; Turkish chars may lose diacritics in core fonts — transliterate
  const ascii = (s: string) =>
    s
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/Ğ/g, "G")
      .replace(/Ü/g, "U")
      .replace(/Ş/g, "S")
      .replace(/İ/g, "I")
      .replace(/Ö/g, "O")
      .replace(/Ç/g, "C");

  const contentLines: string[] = [];
  let y = 800;
  for (const raw of lines) {
    const line = ascii(raw);
    // wrap ~90 chars
    const chunks: string[] = [];
    let rest = line;
    while (rest.length > 90) {
      chunks.push(rest.slice(0, 90));
      rest = rest.slice(90);
    }
    chunks.push(rest);
    for (const c of chunks) {
      if (y < 50) break;
      contentLines.push(`BT /F1 11 Tf 50 ${y} Td (${escapePdf(c)}) Tj ET`);
      y -= 16;
    }
  }

  const stream = contentLines.join("\n");
  const streamLen = new TextEncoder().encode(stream).length;

  const objects: string[] = [];
  objects.push("1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n");
  objects.push("2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n");
  objects.push(
    "3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources<< /Font<< /F1 5 0 R >> >> >>endobj\n",
  );
  objects.push(
    `4 0 obj<< /Length ${streamLen} >>stream\n${stream}\nendstream\nendobj\n`,
  );
  objects.push(
    "5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj\n",
  );

  const enc = new TextEncoder();
  const parts: Uint8Array[] = [enc.encode("%PDF-1.4\n")];
  const offsets: number[] = [0];
  let pos = parts[0].length;
  for (const obj of objects) {
    offsets.push(pos);
    const bytes = enc.encode(obj);
    parts.push(bytes);
    pos += bytes.length;
  }
  const xrefStart = pos;
  let xref = `xref\n0 ${objects.length + 1}\n`;
  xref += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i++) {
    xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  xref += `trailer<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  xref += `startxref\n${xrefStart}\n%%EOF`;
  parts.push(enc.encode(xref));

  const total = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(total);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return new Blob([out], { type: "application/pdf" });
}

export function downloadProductDatasheet(
  product: Product,
  locale: string = "tr",
): void {
  const blob = buildProductDatasheetPdf(product, { locale });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `NXTIONSTAR_${product.slug}_datasheet.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const QUOTE_CART_KEY = "nxtionstar-quote-cart";

export type QuoteCartItem = {
  id: string;
  slug: string;
  name: string;
  pitchMm: number;
  series: string;
};

export function addProductToQuoteCart(product: Product): QuoteCartItem[] {
  const item: QuoteCartItem = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    pitchMm: product.specs.pixelPitchMm,
    series: product.series,
  };
  let cart: QuoteCartItem[] = [];
  try {
    const raw = sessionStorage.getItem(QUOTE_CART_KEY);
    if (raw) cart = JSON.parse(raw) as QuoteCartItem[];
  } catch {
    cart = [];
  }
  if (!cart.some((c) => c.id === item.id)) cart.push(item);
  sessionStorage.setItem(QUOTE_CART_KEY, JSON.stringify(cart));
  return cart;
}

export function readQuoteCart(): QuoteCartItem[] {
  try {
    const raw = sessionStorage.getItem(QUOTE_CART_KEY);
    return raw ? (JSON.parse(raw) as QuoteCartItem[]) : [];
  } catch {
    return [];
  }
}
