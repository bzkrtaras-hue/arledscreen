# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **603/1206** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **905/1206**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (402 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 402 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1206.

| Model | Tarih | Konum | Incognito | Skor /1206 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1206 | |
| Gemini | | | | /1206 | |
| Perplexity | | | | /1206 | |
| Bing Copilot | | | | /1206 | |
| **Ortalama** | | | | **/1206** | Hedef ≥ 603 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1206 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1206 | | |
| Gemini | | /1206 | | |
| Perplexity | | /1206 | | |
| Bing Copilot | | /1206 | | |
| **Ortalama** | | **/1206** | | Hedef ≥ 905 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
