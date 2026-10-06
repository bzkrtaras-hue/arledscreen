# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **225/450** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **338/450**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (150 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 150 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /450.

| Model | Tarih | Konum | Incognito | Skor /450 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /450 | |
| Gemini | | | | /450 | |
| Perplexity | | | | /450 | |
| Bing Copilot | | | | /450 | |
| **Ortalama** | | | | **/450** | Hedef ≥ 225 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /450 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /450 | | |
| Gemini | | /450 | | |
| Perplexity | | /450 | | |
| Bing Copilot | | /450 | | |
| **Ortalama** | | **/450** | | Hedef ≥ 338 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
