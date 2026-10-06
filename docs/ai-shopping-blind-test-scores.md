# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **171/342** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **257/342**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (114 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 114 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /342.

| Model | Tarih | Konum | Incognito | Skor /342 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /342 | |
| Gemini | | | | /342 | |
| Perplexity | | | | /342 | |
| Bing Copilot | | | | /342 | |
| **Ortalama** | | | | **/342** | Hedef ≥ 171 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /342 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /342 | | |
| Gemini | | /342 | | |
| Perplexity | | /342 | | |
| Bing Copilot | | /342 | | |
| **Ortalama** | | **/342** | | Hedef ≥ 257 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
