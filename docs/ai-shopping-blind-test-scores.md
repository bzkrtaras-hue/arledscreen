# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **450/900** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **675/900**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (300 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 300 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /900.

| Model | Tarih | Konum | Incognito | Skor /900 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /900 | |
| Gemini | | | | /900 | |
| Perplexity | | | | /900 | |
| Bing Copilot | | | | /900 | |
| **Ortalama** | | | | **/900** | Hedef ≥ 450 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /900 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /900 | | |
| Gemini | | /900 | | |
| Perplexity | | /900 | | |
| Bing Copilot | | /900 | | |
| **Ortalama** | | **/900** | | Hedef ≥ 675 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
