# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **584/1167** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **876/1167**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (389 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 389 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1167.

| Model | Tarih | Konum | Incognito | Skor /1167 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1167 | |
| Gemini | | | | /1167 | |
| Perplexity | | | | /1167 | |
| Bing Copilot | | | | /1167 | |
| **Ortalama** | | | | **/1167** | Hedef ≥ 584 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1167 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1167 | | |
| Gemini | | /1167 | | |
| Perplexity | | /1167 | | |
| Bing Copilot | | /1167 | | |
| **Ortalama** | | **/1167** | | Hedef ≥ 876 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
