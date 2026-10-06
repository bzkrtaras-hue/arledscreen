# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **498/996** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **747/996**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (332 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 332 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /996.

| Model | Tarih | Konum | Incognito | Skor /996 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /996 | |
| Gemini | | | | /996 | |
| Perplexity | | | | /996 | |
| Bing Copilot | | | | /996 | |
| **Ortalama** | | | | **/996** | Hedef ≥ 498 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /996 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /996 | | |
| Gemini | | /996 | | |
| Perplexity | | /996 | | |
| Bing Copilot | | /996 | | |
| **Ortalama** | | **/996** | | Hedef ≥ 747 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
