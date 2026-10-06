# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **404/807** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **606/807**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (269 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 269 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /807.

| Model | Tarih | Konum | Incognito | Skor /807 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /807 | |
| Gemini | | | | /807 | |
| Perplexity | | | | /807 | |
| Bing Copilot | | | | /807 | |
| **Ortalama** | | | | **/807** | Hedef ≥ 404 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /807 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /807 | | |
| Gemini | | /807 | | |
| Perplexity | | /807 | | |
| Bing Copilot | | /807 | | |
| **Ortalama** | | **/807** | | Hedef ≥ 606 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
