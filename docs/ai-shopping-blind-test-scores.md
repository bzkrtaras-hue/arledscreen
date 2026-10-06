# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **228/456** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **342/456**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (152 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 152 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /456.

| Model | Tarih | Konum | Incognito | Skor /456 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /456 | |
| Gemini | | | | /456 | |
| Perplexity | | | | /456 | |
| Bing Copilot | | | | /456 | |
| **Ortalama** | | | | **/456** | Hedef ≥ 228 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /456 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /456 | | |
| Gemini | | /456 | | |
| Perplexity | | /456 | | |
| Bing Copilot | | /456 | | |
| **Ortalama** | | **/456** | | Hedef ≥ 342 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
