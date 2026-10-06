# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **578/1155** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **867/1155**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (385 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 385 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1155.

| Model | Tarih | Konum | Incognito | Skor /1155 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1155 | |
| Gemini | | | | /1155 | |
| Perplexity | | | | /1155 | |
| Bing Copilot | | | | /1155 | |
| **Ortalama** | | | | **/1155** | Hedef ≥ 578 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1155 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1155 | | |
| Gemini | | /1155 | | |
| Perplexity | | /1155 | | |
| Bing Copilot | | /1155 | | |
| **Ortalama** | | **/1155** | | Hedef ≥ 867 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
