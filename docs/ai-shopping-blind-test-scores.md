# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **492/984** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **738/984**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (328 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 328 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /984.

| Model | Tarih | Konum | Incognito | Skor /984 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /984 | |
| Gemini | | | | /984 | |
| Perplexity | | | | /984 | |
| Bing Copilot | | | | /984 | |
| **Ortalama** | | | | **/984** | Hedef ≥ 492 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /984 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /984 | | |
| Gemini | | /984 | | |
| Perplexity | | /984 | | |
| Bing Copilot | | /984 | | |
| **Ortalama** | | **/984** | | Hedef ≥ 738 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
