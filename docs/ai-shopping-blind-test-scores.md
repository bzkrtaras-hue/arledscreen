# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **506/1011** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **759/1011**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (337 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 337 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1011.

| Model | Tarih | Konum | Incognito | Skor /1011 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1011 | |
| Gemini | | | | /1011 | |
| Perplexity | | | | /1011 | |
| Bing Copilot | | | | /1011 | |
| **Ortalama** | | | | **/1011** | Hedef ≥ 506 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1011 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1011 | | |
| Gemini | | /1011 | | |
| Perplexity | | /1011 | | |
| Bing Copilot | | /1011 | | |
| **Ortalama** | | **/1011** | | Hedef ≥ 759 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
