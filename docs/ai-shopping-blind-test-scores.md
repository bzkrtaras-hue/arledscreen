# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **326/651** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **489/651**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (217 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 217 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /651.

| Model | Tarih | Konum | Incognito | Skor /651 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /651 | |
| Gemini | | | | /651 | |
| Perplexity | | | | /651 | |
| Bing Copilot | | | | /651 | |
| **Ortalama** | | | | **/651** | Hedef ≥ 326 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /651 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /651 | | |
| Gemini | | /651 | | |
| Perplexity | | /651 | | |
| Bing Copilot | | /651 | | |
| **Ortalama** | | **/651** | | Hedef ≥ 489 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
