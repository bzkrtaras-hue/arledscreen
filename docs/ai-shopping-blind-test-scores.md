# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **362/723** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **543/723**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (241 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 241 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /723.

| Model | Tarih | Konum | Incognito | Skor /723 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /723 | |
| Gemini | | | | /723 | |
| Perplexity | | | | /723 | |
| Bing Copilot | | | | /723 | |
| **Ortalama** | | | | **/723** | Hedef ≥ 362 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /723 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /723 | | |
| Gemini | | /723 | | |
| Perplexity | | /723 | | |
| Bing Copilot | | /723 | | |
| **Ortalama** | | **/723** | | Hedef ≥ 543 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
