# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **215/429** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **322/429**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (143 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 143 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /429.

| Model | Tarih | Konum | Incognito | Skor /429 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /429 | |
| Gemini | | | | /429 | |
| Perplexity | | | | /429 | |
| Bing Copilot | | | | /429 | |
| **Ortalama** | | | | **/429** | Hedef ≥ 215 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /429 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /429 | | |
| Gemini | | /429 | | |
| Perplexity | | /429 | | |
| Bing Copilot | | /429 | | |
| **Ortalama** | | **/429** | | Hedef ≥ 322 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
