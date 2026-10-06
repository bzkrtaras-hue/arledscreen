# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **135/270** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **203/270**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (90 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 90 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /270.

| Model | Tarih | Konum | Incognito | Skor /270 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /270 | |
| Gemini | | | | /270 | |
| Perplexity | | | | /270 | |
| Bing Copilot | | | | /270 | |
| **Ortalama** | | | | **/270** | Hedef ≥ 135 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /270 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /270 | | |
| Gemini | | /270 | | |
| Perplexity | | /270 | | |
| Bing Copilot | | /270 | | |
| **Ortalama** | | **/270** | | Hedef ≥ 203 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
