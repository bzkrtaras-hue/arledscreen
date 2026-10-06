# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **240/480** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **360/480**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (160 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 160 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /480.

| Model | Tarih | Konum | Incognito | Skor /480 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /480 | |
| Gemini | | | | /480 | |
| Perplexity | | | | /480 | |
| Bing Copilot | | | | /480 | |
| **Ortalama** | | | | **/480** | Hedef ≥ 240 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /480 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /480 | | |
| Gemini | | /480 | | |
| Perplexity | | /480 | | |
| Bing Copilot | | /480 | | |
| **Ortalama** | | **/480** | | Hedef ≥ 360 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
