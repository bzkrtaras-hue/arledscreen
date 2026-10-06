# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **132/264** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **198/264**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (88 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 88 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /264.

| Model | Tarih | Konum | Incognito | Skor /264 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /264 | |
| Gemini | | | | /264 | |
| Perplexity | | | | /264 | |
| Bing Copilot | | | | /264 | |
| **Ortalama** | | | | **/264** | Hedef ≥ 132 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /264 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /264 | | |
| Gemini | | /264 | | |
| Perplexity | | /264 | | |
| Bing Copilot | | /264 | | |
| **Ortalama** | | **/264** | | Hedef ≥ 198 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
