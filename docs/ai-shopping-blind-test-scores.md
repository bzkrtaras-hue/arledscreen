# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **440/879** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **660/879**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (293 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 293 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /879.

| Model | Tarih | Konum | Incognito | Skor /879 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /879 | |
| Gemini | | | | /879 | |
| Perplexity | | | | /879 | |
| Bing Copilot | | | | /879 | |
| **Ortalama** | | | | **/879** | Hedef ≥ 440 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /879 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /879 | | |
| Gemini | | /879 | | |
| Perplexity | | /879 | | |
| Bing Copilot | | /879 | | |
| **Ortalama** | | **/879** | | Hedef ≥ 660 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
