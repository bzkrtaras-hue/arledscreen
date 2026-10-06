# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **224/447** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **336/447**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (149 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 149 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /447.

| Model | Tarih | Konum | Incognito | Skor /447 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /447 | |
| Gemini | | | | /447 | |
| Perplexity | | | | /447 | |
| Bing Copilot | | | | /447 | |
| **Ortalama** | | | | **/447** | Hedef ≥ 224 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /447 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /447 | | |
| Gemini | | /447 | | |
| Perplexity | | /447 | | |
| Bing Copilot | | /447 | | |
| **Ortalama** | | **/447** | | Hedef ≥ 336 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
