# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **216/432** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **324/432**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (144 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 144 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /432.

| Model | Tarih | Konum | Incognito | Skor /432 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /432 | |
| Gemini | | | | /432 | |
| Perplexity | | | | /432 | |
| Bing Copilot | | | | /432 | |
| **Ortalama** | | | | **/432** | Hedef ≥ 216 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /432 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /432 | | |
| Gemini | | /432 | | |
| Perplexity | | /432 | | |
| Bing Copilot | | /432 | | |
| **Ortalama** | | **/432** | | Hedef ≥ 324 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
