# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **102/204** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **153/204**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (68 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 68 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /204.

| Model | Tarih | Konum | Incognito | Skor /204 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /204 | |
| Gemini | | | | /204 | |
| Perplexity | | | | /204 | |
| Bing Copilot | | | | /204 | |
| **Ortalama** | | | | **/204** | Hedef ≥ 102 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /204 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /204 | | |
| Gemini | | /204 | | |
| Perplexity | | /204 | | |
| Bing Copilot | | /204 | | |
| **Ortalama** | | **/204** | | Hedef ≥ 153 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
