# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **335/669** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **502/669**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (223 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 223 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /669.

| Model | Tarih | Konum | Incognito | Skor /669 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /669 | |
| Gemini | | | | /669 | |
| Perplexity | | | | /669 | |
| Bing Copilot | | | | /669 | |
| **Ortalama** | | | | **/669** | Hedef ≥ 335 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /669 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /669 | | |
| Gemini | | /669 | | |
| Perplexity | | /669 | | |
| Bing Copilot | | /669 | | |
| **Ortalama** | | **/669** | | Hedef ≥ 502 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
