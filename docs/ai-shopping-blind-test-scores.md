# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **587/1173** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **880/1173**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (391 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 391 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1173.

| Model | Tarih | Konum | Incognito | Skor /1173 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1173 | |
| Gemini | | | | /1173 | |
| Perplexity | | | | /1173 | |
| Bing Copilot | | | | /1173 | |
| **Ortalama** | | | | **/1173** | Hedef ≥ 587 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1173 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1173 | | |
| Gemini | | /1173 | | |
| Perplexity | | /1173 | | |
| Bing Copilot | | /1173 | | |
| **Ortalama** | | **/1173** | | Hedef ≥ 880 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
