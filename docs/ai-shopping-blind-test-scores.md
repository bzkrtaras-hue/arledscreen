# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **290/579** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **435/579**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (193 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 193 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /579.

| Model | Tarih | Konum | Incognito | Skor /579 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /579 | |
| Gemini | | | | /579 | |
| Perplexity | | | | /579 | |
| Bing Copilot | | | | /579 | |
| **Ortalama** | | | | **/579** | Hedef ≥ 290 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /579 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /579 | | |
| Gemini | | /579 | | |
| Perplexity | | /579 | | |
| Bing Copilot | | /579 | | |
| **Ortalama** | | **/579** | | Hedef ≥ 435 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
