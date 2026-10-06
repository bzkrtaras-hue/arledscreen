# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **474/948** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **711/948**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (316 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 316 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /948.

| Model | Tarih | Konum | Incognito | Skor /948 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /948 | |
| Gemini | | | | /948 | |
| Perplexity | | | | /948 | |
| Bing Copilot | | | | /948 | |
| **Ortalama** | | | | **/948** | Hedef ≥ 474 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /948 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /948 | | |
| Gemini | | /948 | | |
| Perplexity | | /948 | | |
| Bing Copilot | | /948 | | |
| **Ortalama** | | **/948** | | Hedef ≥ 711 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
