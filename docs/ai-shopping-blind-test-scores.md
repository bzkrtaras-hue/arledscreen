# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **233/465** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **349/465**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (155 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 155 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /465.

| Model | Tarih | Konum | Incognito | Skor /465 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /465 | |
| Gemini | | | | /465 | |
| Perplexity | | | | /465 | |
| Bing Copilot | | | | /465 | |
| **Ortalama** | | | | **/465** | Hedef ≥ 233 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /465 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /465 | | |
| Gemini | | /465 | | |
| Perplexity | | /465 | | |
| Bing Copilot | | /465 | | |
| **Ortalama** | | **/465** | | Hedef ≥ 349 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
