# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **602/1203** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **903/1203**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (401 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 401 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1203.

| Model | Tarih | Konum | Incognito | Skor /1203 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1203 | |
| Gemini | | | | /1203 | |
| Perplexity | | | | /1203 | |
| Bing Copilot | | | | /1203 | |
| **Ortalama** | | | | **/1203** | Hedef ≥ 602 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1203 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1203 | | |
| Gemini | | /1203 | | |
| Perplexity | | /1203 | | |
| Bing Copilot | | /1203 | | |
| **Ortalama** | | **/1203** | | Hedef ≥ 903 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
