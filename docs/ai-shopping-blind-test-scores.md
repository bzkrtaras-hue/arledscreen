# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **360/720** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **540/720**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (240 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 240 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /720.

| Model | Tarih | Konum | Incognito | Skor /720 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /720 | |
| Gemini | | | | /720 | |
| Perplexity | | | | /720 | |
| Bing Copilot | | | | /720 | |
| **Ortalama** | | | | **/720** | Hedef ≥ 360 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /720 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /720 | | |
| Gemini | | /720 | | |
| Perplexity | | /720 | | |
| Bing Copilot | | /720 | | |
| **Ortalama** | | **/720** | | Hedef ≥ 540 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
