# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **299/597** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **448/597**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (199 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 199 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /597.

| Model | Tarih | Konum | Incognito | Skor /597 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /597 | |
| Gemini | | | | /597 | |
| Perplexity | | | | /597 | |
| Bing Copilot | | | | /597 | |
| **Ortalama** | | | | **/597** | Hedef ≥ 299 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /597 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /597 | | |
| Gemini | | /597 | | |
| Perplexity | | /597 | | |
| Bing Copilot | | /597 | | |
| **Ortalama** | | **/597** | | Hedef ≥ 448 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
