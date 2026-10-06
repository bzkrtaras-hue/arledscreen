# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **74/147** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **110/147**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (49 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 49 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /147.

| Model | Tarih | Konum | Incognito | Skor /147 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /147 | |
| Gemini | | | | /147 | |
| Perplexity | | | | /147 | |
| Bing Copilot | | | | /147 | |
| **Ortalama** | | | | **/147** | Hedef ≥ 74 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /147 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /147 | | |
| Gemini | | /147 | | |
| Perplexity | | /147 | | |
| Bing Copilot | | /147 | | |
| **Ortalama** | | **/147** | | Hedef ≥ 110 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
