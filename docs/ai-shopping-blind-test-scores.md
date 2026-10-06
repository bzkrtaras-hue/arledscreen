# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **540/1080** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **810/1080**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (360 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 360 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1080.

| Model | Tarih | Konum | Incognito | Skor /1080 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1080 | |
| Gemini | | | | /1080 | |
| Perplexity | | | | /1080 | |
| Bing Copilot | | | | /1080 | |
| **Ortalama** | | | | **/1080** | Hedef ≥ 540 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1080 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1080 | | |
| Gemini | | /1080 | | |
| Perplexity | | /1080 | | |
| Bing Copilot | | /1080 | | |
| **Ortalama** | | **/1080** | | Hedef ≥ 810 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
