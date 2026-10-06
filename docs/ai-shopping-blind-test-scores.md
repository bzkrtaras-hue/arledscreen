# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **203/405** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **304/405**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (135 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 135 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /405.

| Model | Tarih | Konum | Incognito | Skor /405 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /405 | |
| Gemini | | | | /405 | |
| Perplexity | | | | /405 | |
| Bing Copilot | | | | /405 | |
| **Ortalama** | | | | **/405** | Hedef ≥ 203 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /405 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /405 | | |
| Gemini | | /405 | | |
| Perplexity | | /405 | | |
| Bing Copilot | | /405 | | |
| **Ortalama** | | **/405** | | Hedef ≥ 304 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
