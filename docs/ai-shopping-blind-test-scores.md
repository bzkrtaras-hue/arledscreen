# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **468/936** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **702/936**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (312 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 312 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /936.

| Model | Tarih | Konum | Incognito | Skor /936 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /936 | |
| Gemini | | | | /936 | |
| Perplexity | | | | /936 | |
| Bing Copilot | | | | /936 | |
| **Ortalama** | | | | **/936** | Hedef ≥ 468 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /936 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /936 | | |
| Gemini | | /936 | | |
| Perplexity | | /936 | | |
| Bing Copilot | | /936 | | |
| **Ortalama** | | **/936** | | Hedef ≥ 702 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
