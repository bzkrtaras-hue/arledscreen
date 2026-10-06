# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **591/1182** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **887/1182**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (394 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 394 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1182.

| Model | Tarih | Konum | Incognito | Skor /1182 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1182 | |
| Gemini | | | | /1182 | |
| Perplexity | | | | /1182 | |
| Bing Copilot | | | | /1182 | |
| **Ortalama** | | | | **/1182** | Hedef ≥ 591 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1182 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1182 | | |
| Gemini | | /1182 | | |
| Perplexity | | /1182 | | |
| Bing Copilot | | /1182 | | |
| **Ortalama** | | **/1182** | | Hedef ≥ 887 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
