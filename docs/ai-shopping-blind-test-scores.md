# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **263/525** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **394/525**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (175 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 175 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /525.

| Model | Tarih | Konum | Incognito | Skor /525 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /525 | |
| Gemini | | | | /525 | |
| Perplexity | | | | /525 | |
| Bing Copilot | | | | /525 | |
| **Ortalama** | | | | **/525** | Hedef ≥ 263 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /525 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /525 | | |
| Gemini | | /525 | | |
| Perplexity | | /525 | | |
| Bing Copilot | | /525 | | |
| **Ortalama** | | **/525** | | Hedef ≥ 394 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
