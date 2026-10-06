# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **255/510** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **383/510**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (170 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 170 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /510.

| Model | Tarih | Konum | Incognito | Skor /510 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /510 | |
| Gemini | | | | /510 | |
| Perplexity | | | | /510 | |
| Bing Copilot | | | | /510 | |
| **Ortalama** | | | | **/510** | Hedef ≥ 255 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /510 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /510 | | |
| Gemini | | /510 | | |
| Perplexity | | /510 | | |
| Bing Copilot | | /510 | | |
| **Ortalama** | | **/510** | | Hedef ≥ 383 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
