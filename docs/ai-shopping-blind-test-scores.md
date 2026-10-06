# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **119/237** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **178/237**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (79 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 79 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /237.

| Model | Tarih | Konum | Incognito | Skor /237 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /237 | |
| Gemini | | | | /237 | |
| Perplexity | | | | /237 | |
| Bing Copilot | | | | /237 | |
| **Ortalama** | | | | **/237** | Hedef ≥ 119 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /237 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /237 | | |
| Gemini | | /237 | | |
| Perplexity | | /237 | | |
| Bing Copilot | | /237 | | |
| **Ortalama** | | **/237** | | Hedef ≥ 178 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
