# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **552/1104** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **828/1104**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (368 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 368 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1104.

| Model | Tarih | Konum | Incognito | Skor /1104 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1104 | |
| Gemini | | | | /1104 | |
| Perplexity | | | | /1104 | |
| Bing Copilot | | | | /1104 | |
| **Ortalama** | | | | **/1104** | Hedef ≥ 552 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1104 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1104 | | |
| Gemini | | /1104 | | |
| Perplexity | | /1104 | | |
| Bing Copilot | | /1104 | | |
| **Ortalama** | | **/1104** | | Hedef ≥ 828 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
