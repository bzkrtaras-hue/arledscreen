# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **389/777** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **583/777**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (259 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 259 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /777.

| Model | Tarih | Konum | Incognito | Skor /777 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /777 | |
| Gemini | | | | /777 | |
| Perplexity | | | | /777 | |
| Bing Copilot | | | | /777 | |
| **Ortalama** | | | | **/777** | Hedef ≥ 389 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /777 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /777 | | |
| Gemini | | /777 | | |
| Perplexity | | /777 | | |
| Bing Copilot | | /777 | | |
| **Ortalama** | | **/777** | | Hedef ≥ 583 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
