# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **66/132** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **99/132**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (44 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 44 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /132.

| Model | Tarih | Konum | Incognito | Skor /132 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /132 | |
| Gemini | | | | /132 | |
| Perplexity | | | | /132 | |
| Bing Copilot | | | | /132 | |
| **Ortalama** | | | | **/132** | Hedef ≥ 66 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /132 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /132 | | |
| Gemini | | /132 | | |
| Perplexity | | /132 | | |
| Bing Copilot | | /132 | | |
| **Ortalama** | | **/132** | | Hedef ≥ 99 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
