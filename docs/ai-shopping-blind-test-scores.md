# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **486/972** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **729/972**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (324 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 324 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /972.

| Model | Tarih | Konum | Incognito | Skor /972 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /972 | |
| Gemini | | | | /972 | |
| Perplexity | | | | /972 | |
| Bing Copilot | | | | /972 | |
| **Ortalama** | | | | **/972** | Hedef ≥ 486 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /972 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /972 | | |
| Gemini | | /972 | | |
| Perplexity | | /972 | | |
| Bing Copilot | | /972 | | |
| **Ortalama** | | **/972** | | Hedef ≥ 729 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
