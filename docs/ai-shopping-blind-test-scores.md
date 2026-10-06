# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **363/726** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **545/726**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (242 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 242 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /726.

| Model | Tarih | Konum | Incognito | Skor /726 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /726 | |
| Gemini | | | | /726 | |
| Perplexity | | | | /726 | |
| Bing Copilot | | | | /726 | |
| **Ortalama** | | | | **/726** | Hedef ≥ 363 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /726 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /726 | | |
| Gemini | | /726 | | |
| Perplexity | | /726 | | |
| Bing Copilot | | /726 | | |
| **Ortalama** | | **/726** | | Hedef ≥ 545 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
