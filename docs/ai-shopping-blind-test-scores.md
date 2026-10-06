# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **147/294** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **221/294**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (98 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 98 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /294.

| Model | Tarih | Konum | Incognito | Skor /294 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /294 | |
| Gemini | | | | /294 | |
| Perplexity | | | | /294 | |
| Bing Copilot | | | | /294 | |
| **Ortalama** | | | | **/294** | Hedef ≥ 147 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /294 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /294 | | |
| Gemini | | /294 | | |
| Perplexity | | /294 | | |
| Bing Copilot | | /294 | | |
| **Ortalama** | | **/294** | | Hedef ≥ 221 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
