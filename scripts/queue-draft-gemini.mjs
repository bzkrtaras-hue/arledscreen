#!/usr/bin/env node
/**
 * Empty-queue fallback: ask Gemini (GEMINI_API_KEY) for ONE Turkish guide draft
 * in the article format and write it to content-queue/drafts/. Drafts carry
 * `status: draft` and are NEVER published automatically — a human reviews,
 * fixes ⚠️ items, removes `status: draft` and moves the file to content-queue/.
 * Usage: node scripts/queue-draft-gemini.mjs   → prints path to $GITHUB_OUTPUT (draft_file)
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const key = process.env.GEMINI_API_KEY;
if (!key) { console.log("GEMINI_API_KEY not set — skipping draft"); process.exit(0); }
const models = process.env.GEMINI_MODEL ? [process.env.GEMINI_MODEL] : ["gemini-flash-latest", "gemini-flash-lite-latest"];

const existing = fs.readdirSync(path.join(root, "src/content/articles")).map((f) => f.replace(/\.md$/, ""));
const routes = fs.readdirSync(path.join(root, "src/app/[locale]/rehber")).filter((f) => !f.includes(".") && !f.startsWith("["));
const draftsDir = path.join(root, "content-queue/drafts");
fs.mkdirSync(draftsDir, { recursive: true });
const drafts = fs.readdirSync(draftsDir).filter((f) => f.endsWith(".md"));
const example = fs.readFileSync(path.join(root, "src/content/articles/gob-vs-smd.md"), "utf8").slice(0, 3500);
const today = new Date().toISOString().slice(0, 10);

const prompt = `Sen ARLEDSCREEN (arledscreen.com, Türkiye, LED ekran satış ve kurulum) için Türkçe rehber yazarısın.
Mevcut rehber slug'ları (TEKRARLAMA): ${[...new Set([...existing, ...routes])].join(", ")}.
Bekleyen taslaklar: ${drafts.join(", ") || "yok"}.
Gerçek alıcıların ChatGPT/Google'a soracağı, yukarıdakilerle çakışmayan TEK bir LED ekran sorusu seç ve aşağıdaki örnekle AYNI biçimde bir rehber yaz.
Kurallar:
- Front matter alanları: slug (/tr/rehber/<ascii-kebab>/), title, meta_description (<=155 karakter), h1, target_queries, schema: [TechArticle, FAQPage, BreadcrumbList], last_reviewed: ${today}, status: draft
- Gövde: "# <h1>", "**Kısa cevap:**" paragrafı, numaralı "## N. ..." başlıkları, en az bir tablo, son bölüm "## N. Sık sorulan sorular" ve her soru "**Soru?**" satırı + altındaki tek satır cevap.
- Fiyat, garanti süresi, teknik değer, müşteri adı gibi doğrulanmamış her bilgiyi uydurmak yerine "⚠️ doğrulanacak" diye işaretle. Abartılı iddia yok.
- İç linkler yalnızca mevcut yollar: /tr/led-ekran-fiyatlari/, /tr/hesaplayici/, /tr/quote/, /tr/products/ic-mekan-led-ekran/, /tr/products/dis-mekan-led-ekran/.
- E-posta gerekiyorsa yalnızca arled@arledscreen.com.
- Sadece markdown dosyasını döndür, kod bloğu kullanma.

ÖRNEK:
${example}`;

let json = {}, model = "";
for (model of models) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { temperature: 0.6, maxOutputTokens: 8192 } }),
  });
  json = await res.json().catch(() => ({}));
  if (res.ok) break;
  console.error(`Gemini ${model} HTTP ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
  if (model === models.at(-1)) process.exit(1);
}
let text = (json.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? "").join("").trim();
text = text.replace(/^```(?:markdown|md)?\n/, "").replace(/\n```$/, "").trim() + "\n";
if (!text.startsWith("---")) { console.error("Gemini output has no front matter:\n" + text.slice(0, 400)); process.exit(1); }
if (!/^status:\s*draft/m.test(text)) text = text.replace(/^---\n/, "---\nstatus: draft\n");
const slug = (/^slug:\s*"?\/tr\/rehber\/([a-z0-9-]+)\/"?/m.exec(text) || [])[1] || `taslak-${Date.now()}`;
// Strip any non-company email the model may have produced.
text = text.replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, (e) => (e.toLowerCase() === "arled@arledscreen.com" ? e : "arled@arledscreen.com"));
const file = path.join(draftsDir, `${today}-${slug}.md`);
fs.writeFileSync(file, text);
console.log(`Draft written: ${path.relative(root, file)} (${text.length} chars, model ${model})`);
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `draft_file=${path.relative(root, file)}\nslug=${slug}\n`);
