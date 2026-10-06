# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **221/441** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **331/441**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (147 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 147 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /441.

| Model | Tarih | Konum | Incognito | Skor /441 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /441 | |
| Gemini | | | | /441 | |
| Perplexity | | | | /441 | |
| Bing Copilot | | | | /441 | |
| **Ortalama** | | | | **/441** | Hedef ≥ 221 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /441 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /441 | | |
| Gemini | | /441 | | |
| Perplexity | | /441 | | |
| Bing Copilot | | /441 | | |
| **Ortalama** | | **/441** | | Hedef ≥ 331 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
