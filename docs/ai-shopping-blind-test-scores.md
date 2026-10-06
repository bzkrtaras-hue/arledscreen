# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **443/885** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **664/885**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (295 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 295 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /885.

| Model | Tarih | Konum | Incognito | Skor /885 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /885 | |
| Gemini | | | | /885 | |
| Perplexity | | | | /885 | |
| Bing Copilot | | | | /885 | |
| **Ortalama** | | | | **/885** | Hedef ≥ 443 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /885 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /885 | | |
| Gemini | | /885 | | |
| Perplexity | | /885 | | |
| Bing Copilot | | /885 | | |
| **Ortalama** | | **/885** | | Hedef ≥ 664 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
