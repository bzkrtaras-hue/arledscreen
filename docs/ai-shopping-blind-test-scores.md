# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **311/621** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **466/621**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (207 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 207 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /621.

| Model | Tarih | Konum | Incognito | Skor /621 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /621 | |
| Gemini | | | | /621 | |
| Perplexity | | | | /621 | |
| Bing Copilot | | | | /621 | |
| **Ortalama** | | | | **/621** | Hedef ≥ 311 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /621 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /621 | | |
| Gemini | | /621 | | |
| Perplexity | | /621 | | |
| Bing Copilot | | /621 | | |
| **Ortalama** | | **/621** | | Hedef ≥ 466 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
