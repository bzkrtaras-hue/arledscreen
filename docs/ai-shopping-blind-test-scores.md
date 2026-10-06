# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **524/1047** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **786/1047**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (349 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 349 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1047.

| Model | Tarih | Konum | Incognito | Skor /1047 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1047 | |
| Gemini | | | | /1047 | |
| Perplexity | | | | /1047 | |
| Bing Copilot | | | | /1047 | |
| **Ortalama** | | | | **/1047** | Hedef ≥ 524 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1047 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1047 | | |
| Gemini | | /1047 | | |
| Perplexity | | /1047 | | |
| Bing Copilot | | /1047 | | |
| **Ortalama** | | **/1047** | | Hedef ≥ 786 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
