# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **81/162** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **122/162**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (54 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 54 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /162.

| Model | Tarih | Konum | Incognito | Skor /162 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /162 | |
| Gemini | | | | /162 | |
| Perplexity | | | | /162 | |
| Bing Copilot | | | | /162 | |
| **Ortalama** | | | | **/162** | Hedef ≥ 81 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /162 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /162 | | |
| Gemini | | /162 | | |
| Perplexity | | /162 | | |
| Bing Copilot | | /162 | | |
| **Ortalama** | | **/162** | | Hedef ≥ 122 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
