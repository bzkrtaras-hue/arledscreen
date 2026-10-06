# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **597/1194** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **896/1194**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (398 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 398 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1194.

| Model | Tarih | Konum | Incognito | Skor /1194 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1194 | |
| Gemini | | | | /1194 | |
| Perplexity | | | | /1194 | |
| Bing Copilot | | | | /1194 | |
| **Ortalama** | | | | **/1194** | Hedef ≥ 597 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1194 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1194 | | |
| Gemini | | /1194 | | |
| Perplexity | | /1194 | | |
| Bing Copilot | | /1194 | | |
| **Ortalama** | | **/1194** | | Hedef ≥ 896 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
