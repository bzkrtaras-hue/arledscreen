# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **579/1158** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **869/1158**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (386 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 386 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1158.

| Model | Tarih | Konum | Incognito | Skor /1158 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1158 | |
| Gemini | | | | /1158 | |
| Perplexity | | | | /1158 | |
| Bing Copilot | | | | /1158 | |
| **Ortalama** | | | | **/1158** | Hedef ≥ 579 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1158 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1158 | | |
| Gemini | | /1158 | | |
| Perplexity | | /1158 | | |
| Bing Copilot | | /1158 | | |
| **Ortalama** | | **/1158** | | Hedef ≥ 869 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
