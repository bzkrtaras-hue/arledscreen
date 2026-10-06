# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **105/210** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **158/210**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (70 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 70 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /210.

| Model | Tarih | Konum | Incognito | Skor /210 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /210 | |
| Gemini | | | | /210 | |
| Perplexity | | | | /210 | |
| Bing Copilot | | | | /210 | |
| **Ortalama** | | | | **/210** | Hedef ≥ 105 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /210 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /210 | | |
| Gemini | | /210 | | |
| Perplexity | | /210 | | |
| Bing Copilot | | /210 | | |
| **Ortalama** | | **/210** | | Hedef ≥ 158 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
