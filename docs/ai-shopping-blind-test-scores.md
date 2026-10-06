# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **152/303** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **228/303**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (101 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 101 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /303.

| Model | Tarih | Konum | Incognito | Skor /303 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /303 | |
| Gemini | | | | /303 | |
| Perplexity | | | | /303 | |
| Bing Copilot | | | | /303 | |
| **Ortalama** | | | | **/303** | Hedef ≥ 152 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /303 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /303 | | |
| Gemini | | /303 | | |
| Perplexity | | /303 | | |
| Bing Copilot | | /303 | | |
| **Ortalama** | | **/303** | | Hedef ≥ 228 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
